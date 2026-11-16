-- Keep the existing intake rules and add the industrial restructuring assessment.
DO $migration$
DECLARE
  definition text := pg_catalog.pg_get_functiondef(
    'public.ciaomind_submit_service_order(text,jsonb,text)'::regprocedure
  );
  prior_topics constant text := $old$'cn-outbound', 'into-cn', 'other-expansion'$old$;
  current_topics constant text := $new$'cn-outbound', 'into-cn', 'other-expansion', 'industrial-restructuring'$new$;
BEGIN
  IF strpos(definition, prior_topics) = 0 OR strpos(definition, $match$'industrial-restructuring'$match$) > 0 THEN
    RAISE EXCEPTION 'Expected the prior expansion topic list';
  END IF;
  EXECUTE replace(definition, prior_topics, current_topics);
END
$migration$;
