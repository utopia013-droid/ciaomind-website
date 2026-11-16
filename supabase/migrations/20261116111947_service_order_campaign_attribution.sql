-- Allow bounded campaign tags alongside the existing source field.
DO $migration$
DECLARE
  definition text := pg_catalog.pg_get_functiondef(
    'public.ciaomind_submit_service_order(text,jsonb,text)'::regprocedure
  );
  old_fields constant text := $old$'email', 'brief', 'variant', 'source', 'quote')$old$;
  new_fields constant text := $new$'email', 'brief', 'variant', 'source', 'quote', 'campaign')$new$;
  old_guard constant text := $old$OR order_data ->> 'source' !~ '^[A-Za-z0-9_.-]{0,80}$'$old$;
  new_guard constant text := $new$OR order_data ->> 'source' !~ '^[A-Za-z0-9_.-]{0,80}$'
     OR (CASE
       WHEN NOT (order_data ? 'campaign') THEN false
       WHEN pg_catalog.jsonb_typeof(order_data -> 'campaign') <> 'object' THEN true
       ELSE EXISTS (
         SELECT 1
         FROM pg_catalog.jsonb_each(order_data -> 'campaign') AS tag(key, value)
         WHERE tag.key NOT IN ('utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term')
            OR pg_catalog.jsonb_typeof(tag.value) <> 'string'
            OR tag.value #>> '{}' !~ '^[A-Za-z0-9_.-]{1,80}$'
            OR (tag.key = 'utm_source' AND (tag.value #>> '{}') <> (order_data ->> 'source'))
       )
     END)$new$;
BEGIN
  IF strpos(definition, old_fields) = 0 OR strpos(definition, old_guard) = 0 THEN
    RAISE EXCEPTION 'Expected existing intake guards';
  END IF;
  EXECUTE replace(replace(definition, old_fields, new_fields), old_guard, new_guard);
END
$migration$;
