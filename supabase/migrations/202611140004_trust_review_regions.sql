-- Add trust-region review topics while leaving existing order and quote rules intact.
DO $migration$
DECLARE
  definition text := pg_catalog.pg_get_functiondef(
    'public.ciaomind_submit_service_order(text,jsonb,text)'::regprocedure
  );
  prior_topics constant text := $old$'wealth-planning', 'family-office', 'licensed-referral'$old$;
  current_topics constant text := $new$'wealth-planning', 'family-office', 'licensed-referral',
       'trust-ky', 'trust-sg', 'trust-hk', 'trust-bvi', 'trust-uk', 'trust-record-review'$new$;
BEGIN
  IF strpos(definition, prior_topics) = 0 OR strpos(definition, $match$'trust-record-review'$match$) > 0 THEN
    RAISE EXCEPTION 'Expected the prior trust topic list';
  END IF;
  EXECUTE replace(definition, prior_topics, current_topics);
END
$migration$;
