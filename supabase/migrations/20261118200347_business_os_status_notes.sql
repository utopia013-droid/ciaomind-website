-- Add non-financial status notes. Existing amount, review, audit and stage guards remain in force.
alter table public.bos_records
  drop constraint bos_records_kind_check;
alter table public.bos_records
  add constraint bos_records_kind_check
  check (kind in ('rights','compliance','quote','sample','contract','acceptance','receipt','candidate','note'));
