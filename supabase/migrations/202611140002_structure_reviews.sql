-- Keep existing order RPC and permissions; allow precisely the published evaluation topics.
DO $migration$
DECLARE
  definition text := pg_catalog.pg_get_functiondef(
    'public.ciaomind_submit_service_order(text,jsonb,text)'::regprocedure
  );
  original_services constant text := $old$'partner-services', 'ai-assistant'$old$;
  published_services constant text := $new$'partner-services', 'ai-assistant', 'structure-review'$new$;
  original_variants constant text := $old$OR order_data ->> 'variant' !~ '^[a-z0-9-]{0,48}$'$old$;
  published_variants constant text := $new$OR order_data ->> 'variant' !~ '^[a-z0-9-]{0,48}$'
     OR (v_service = 'structure-review' AND (order_data ->> 'variant') NOT IN (
       'fr-formation', 'fr-operations', 'de-formation', 'de-operations', 'es-formation', 'es-operations', 'uk-formation', 'uk-operations', 'nl-formation', 'nl-operations', 'cn-formation', 'cn-operations', 'hk-limited', 'hk-secretary', 'hk-annual', 'us-llc', 'us-corp', 'us-multi-state', 'bvi-company', 'cayman-exempted', 'trust-succession', 'trust-governance', 'trust-holding'
     ))$new$;
BEGIN
  IF strpos(definition, original_services) = 0 OR strpos(definition, original_variants) = 0 THEN
    RAISE EXCEPTION 'Expected the original service order guards';
  END IF;
  EXECUTE replace(replace(definition, original_services, published_services), original_variants, published_variants);
END
$migration$;
