-- Optional administrator-provisioned labels only. Existing grants and RLS remain unchanged.
alter table public.bos_tenant_members
  add column display_name text
  check (display_name is null or char_length(display_name) <= 160);

-- A path/query may contain an email address. Credentials remain forbidden in the authority.
alter table public.bos_records
  drop constraint bos_records_evidence_url_check;
alter table public.bos_records
  add constraint bos_records_evidence_url_check check (
    length(evidence_url) between 9 and 2000
    and evidence_url !~ '[[:space:]]'
    and evidence_url ~ '^https://[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.?(:[0-9]{1,5})?([/?#]|$)'
    and evidence_url !~ '^https://[^/?#]*@'
  );
