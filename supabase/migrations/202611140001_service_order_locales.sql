-- Extend checkout locales without altering order data or RPC permissions.
DO $migration$
DECLARE
  definition text := pg_catalog.pg_get_functiondef(
    'public.ciaomind_submit_service_order(text,jsonb,text)'::regprocedure
  );
  original_guard constant text := 'v_locale NOT IN (''it'', ''zh'')';
  new_guard constant text := 'v_locale NOT IN (''it'', ''zh'', ''en'', ''fr'', ''de'', ''es'')';
BEGIN
  IF strpos(definition, original_guard) = 0 THEN
    RAISE EXCEPTION 'Expected the original order locale guard';
  END IF;
  EXECUTE replace(definition, original_guard, new_guard);
END
$migration$;
