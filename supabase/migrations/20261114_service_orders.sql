-- CIAOMIND LexDo intake: private order storage behind one narrowly scoped RPC.
-- The app-specific shared secret digest must be provisioned out of band.

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE SCHEMA ciaomind_private;
REVOKE ALL ON SCHEMA ciaomind_private FROM PUBLIC, anon, authenticated;

CREATE TABLE ciaomind_private.service_order_secret (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  secret_sha256 bytea NOT NULL CHECK (octet_length(secret_sha256) = 32),
  provisioned_at timestamptz NOT NULL DEFAULT pg_catalog.now()
);

CREATE TABLE ciaomind_private.service_orders (
  id uuid PRIMARY KEY DEFAULT pg_catalog.gen_random_uuid(),
  request_id uuid NOT NULL UNIQUE,
  order_number text NOT NULL UNIQUE,
  payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at timestamptz NOT NULL DEFAULT pg_catalog.now()
);

CREATE TABLE ciaomind_private.service_order_rate_events (
  traffic_bucket bytea NOT NULL CHECK (octet_length(traffic_bucket) = 32),
  created_at timestamptz NOT NULL DEFAULT pg_catalog.now()
);
CREATE INDEX service_order_rate_events_bucket_time_idx
  ON ciaomind_private.service_order_rate_events (traffic_bucket, created_at DESC);

CREATE INDEX service_orders_pending_idx ON ciaomind_private.service_orders (created_at DESC) WHERE status = 'pending';

ALTER TABLE ciaomind_private.service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ciaomind_private.service_order_secret ENABLE ROW LEVEL SECURITY;
ALTER TABLE ciaomind_private.service_order_rate_events ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE ciaomind_private.service_orders FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE ciaomind_private.service_order_secret FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE ciaomind_private.service_order_rate_events FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.ciaomind_submit_service_order(
  secret text,
  order_data jsonb,
  ip_hash text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_expected_hash bytea;
  v_request_id uuid;
  v_service text;
  v_locale text;
  v_bucket bytea;
  v_existing ciaomind_private.service_orders%ROWTYPE;
  v_order_number text;
  v_recent_count bigint;
BEGIN
  -- Generic rejection avoids disclosing which credential or input check failed.
  IF secret IS NULL OR pg_catalog.length(secret) < 32 OR pg_catalog.length(secret) > 512
     OR order_data IS NULL OR pg_catalog.jsonb_typeof(order_data) <> 'object'
     OR pg_catalog.pg_column_size(order_data) > 8192
     OR ip_hash IS NULL OR ip_hash !~ '^[0-9A-Fa-f]{64}$' THEN
    RETURN pg_catalog.jsonb_build_object('status', 'conflict');
  END IF;

  SELECT s.secret_sha256 INTO v_expected_hash
  FROM ciaomind_private.service_order_secret AS s
  WHERE s.singleton = true;

  IF v_expected_hash IS NULL
     OR extensions.digest(pg_catalog.convert_to(secret, 'UTF8'), 'sha256') <> v_expected_hash THEN
    RETURN pg_catalog.jsonb_build_object('status', 'unavailable');
  END IF;

  -- Accept only the documented payload fields; this also bounds stored PII.
  IF EXISTS (
    SELECT 1
    FROM pg_catalog.jsonb_object_keys(order_data) AS k(key)
    WHERE k.key NOT IN ('requestId', 'service', 'locale', 'company', 'name', 'email', 'brief', 'variant', 'source')
  ) OR NOT (order_data ?& ARRAY['requestId', 'service', 'locale', 'company', 'name', 'email', 'brief', 'variant', 'source']) THEN
    RETURN pg_catalog.jsonb_build_object('status', 'conflict');
  END IF;

  BEGIN
    v_request_id := (order_data ->> 'requestId')::uuid;
  EXCEPTION WHEN invalid_text_representation THEN
    RETURN pg_catalog.jsonb_build_object('status', 'conflict');
  END;

  v_service := order_data ->> 'service';
  v_locale := order_data ->> 'locale';

  IF v_request_id IS NULL
     OR pg_catalog.jsonb_typeof(order_data -> 'service') <> 'string'
     OR v_service NOT IN (
       'incorporation', 'vat-opening', 'association', 'accounting', 'contracts',
       'consultation', 'payroll', 'registered-office', 'partner-services', 'ai-assistant'
     )
     OR pg_catalog.jsonb_typeof(order_data -> 'locale') <> 'string'
     OR v_locale NOT IN ('it', 'zh')
     OR pg_catalog.jsonb_typeof(order_data -> 'name') <> 'string'
     OR pg_catalog.length(order_data ->> 'name') NOT BETWEEN 1 AND 100
     OR pg_catalog.jsonb_typeof(order_data -> 'email') <> 'string'
     OR pg_catalog.length(order_data ->> 'email') NOT BETWEEN 3 AND 254
     OR pg_catalog.jsonb_typeof(order_data -> 'company') <> 'string'
     OR pg_catalog.length(order_data ->> 'company') NOT BETWEEN 1 AND 120
     OR pg_catalog.jsonb_typeof(order_data -> 'brief') <> 'string'
     OR pg_catalog.length(order_data ->> 'brief') NOT BETWEEN 1 AND 1200
     OR pg_catalog.jsonb_typeof(order_data -> 'variant') <> 'string'
     OR order_data ->> 'variant' !~ '^[a-z0-9-]{0,48}$'
     OR pg_catalog.jsonb_typeof(order_data -> 'source') <> 'string'
     OR order_data ->> 'source' !~ '^[A-Za-z0-9_.-]{0,80}$' THEN
    RETURN pg_catalog.jsonb_build_object('status', 'conflict');
  END IF;

  v_bucket := extensions.digest(pg_catalog.convert_to(pg_catalog.lower(ip_hash), 'UTF8'), 'sha256');

  -- Serialize retries by request id, then serialize traffic from this bucket.
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('ciaomind-order-request:' || v_request_id::text, 0)
  );

  SELECT o.* INTO v_existing
  FROM ciaomind_private.service_orders AS o
  WHERE o.request_id = v_request_id;

  IF FOUND THEN
    IF v_existing.payload = order_data THEN
      RETURN pg_catalog.jsonb_build_object(
        'status', 'existing', 'orderNumber', v_existing.order_number
      );
    END IF;
    RETURN pg_catalog.jsonb_build_object('status', 'conflict');
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('ciaomind-order-bucket:' || pg_catalog.encode(v_bucket, 'hex'), 0)
  );

  DELETE FROM ciaomind_private.service_order_rate_events AS e
  WHERE e.created_at < pg_catalog.now() - interval '24 hours';

  SELECT pg_catalog.count(*) INTO v_recent_count
  FROM ciaomind_private.service_order_rate_events AS e
  WHERE e.traffic_bucket = v_bucket
    AND e.created_at >= pg_catalog.now() - interval '1 hour';

  IF v_recent_count >= 5 THEN
    RETURN pg_catalog.jsonb_build_object('status', 'rate_limited');
  END IF;

  v_order_number := 'CMO-' || pg_catalog.upper(pg_catalog.replace(pg_catalog.gen_random_uuid()::text, '-', ''));

  INSERT INTO ciaomind_private.service_orders (request_id, order_number, payload)
  VALUES (v_request_id, v_order_number, order_data);

  INSERT INTO ciaomind_private.service_order_rate_events (traffic_bucket)
  VALUES (v_bucket);

  RETURN pg_catalog.jsonb_build_object(
    'status', 'created', 'orderNumber', v_order_number
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.ciaomind_submit_service_order(text, jsonb, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ciaomind_submit_service_order(text, jsonb, text) FROM authenticated;
REVOKE ALL ON FUNCTION public.ciaomind_submit_service_order(text, jsonb, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.ciaomind_submit_service_order(text, jsonb, text) TO anon;
