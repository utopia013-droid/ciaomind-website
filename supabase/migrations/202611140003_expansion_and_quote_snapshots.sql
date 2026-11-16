-- Extend the existing RPC for published expansion topics and validated quote snapshots.
DO $migration$
DECLARE
  definition text := pg_catalog.pg_get_functiondef(
    'public.ciaomind_submit_service_order(text,jsonb,text)'::regprocedure
  );
  topics_tail constant text := $old$'trust-governance', 'trust-holding'$old$;
  updated_topics constant text := $new$'trust-governance', 'trust-holding',
       'sg-formation', 'sg-foreign-company', 'sg-compliance',
       'cn-outbound', 'into-cn', 'other-expansion',
       'wealth-planning', 'family-office', 'licensed-referral'$new$;
  fields_tail constant text := $old$'email', 'brief', 'variant', 'source')$old$;
  updated_fields constant text := $new$'email', 'brief', 'variant', 'source', 'quote')$new$;
  source_guard constant text := $old$OR order_data ->> 'source' !~ '^[A-Za-z0-9_.-]{0,80}$'$old$;
  updated_guard constant text := $new$OR order_data ->> 'source' !~ '^[A-Za-z0-9_.-]{0,80}$'
     OR (order_data ? 'quote' AND NOT COALESCE(
       (v_service = 'incorporation' AND order_data ->> 'variant' = 'srl' AND
         order_data -> 'quote' = '{"version":"2026-11-14-01","currency":"EUR","amountCents":9900,"period":"once","tax":"excluded"}'::jsonb)
       OR
       (v_service = 'accounting' AND order_data ->> 'variant' = 'company' AND
         order_data -> 'quote' = '{"version":"2026-11-14-01","currency":"EUR","amountCents":49900,"period":"four_months","tax":"excluded"}'::jsonb),
       false
     ))$new$;
BEGIN
  IF strpos(definition, topics_tail) = 0 OR strpos(definition, fields_tail) = 0
      OR strpos(definition, source_guard) = 0 THEN
    RAISE EXCEPTION 'Expected existing intake guards';
  END IF;
  EXECUTE replace(replace(replace(definition, topics_tail, updated_topics), fields_tail, updated_fields), source_guard, updated_guard);
END
$migration$;
