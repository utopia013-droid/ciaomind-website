-- Business OS additive migration. Apply only after review; no data is seeded.
-- Authenticated requests use the publishable key and their own JWT, never service_role.
create schema if not exists ciaomind_bos_private;
revoke all on schema ciaomind_bos_private from public, anon;
grant usage on schema ciaomind_bos_private to authenticated;

create table public.bos_tenants (
  id uuid primary key default gen_random_uuid(), name text not null check (length(btrim(name)) between 1 and 160)
);
create table public.bos_tenant_members (
  tenant_id uuid not null references public.bos_tenants(id), user_id uuid not null references auth.users(id),
  role text not null check (role in ('owner','manager','contributor','viewer')), primary key (tenant_id,user_id)
);
create table public.bos_projects (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.bos_tenants(id),
  title text not null check (length(btrim(title)) between 1 and 160),
  client_name text not null check (length(btrim(client_name)) between 1 and 160),
  owner_id uuid not null references auth.users(id), due_on date,
  stage text not null default 'prospect' check (stage in ('prospect','discovery','quote','sample','contract','delivery','acceptance','collected','closed')),
  version integer not null default 1, created_at timestamptz not null default now(), unique(id,tenant_id)
);
create table public.bos_project_members (
  project_id uuid not null, tenant_id uuid not null, user_id uuid not null,
  role text not null check (role in ('manager','contributor','viewer')),
  primary key (project_id,user_id),
  foreign key (project_id,tenant_id) references public.bos_projects(id,tenant_id),
  foreign key (tenant_id,user_id) references public.bos_tenant_members(tenant_id,user_id)
);
create table public.bos_tasks (
  id uuid primary key default gen_random_uuid(), project_id uuid not null, tenant_id uuid not null,
  title text not null check (length(btrim(title)) between 1 and 400), owner_id uuid not null references auth.users(id),
  due_on date not null, dependency_id uuid, status text not null default 'open' check (status in ('open','done')),
  created_by uuid not null default auth.uid() references auth.users(id), created_at timestamptz not null default now(),
  unique(id,project_id), foreign key(project_id,tenant_id) references public.bos_projects(id,tenant_id),
  foreign key(dependency_id,project_id) references public.bos_tasks(id,project_id), check (dependency_id is distinct from id)
);
create table public.bos_records (
  id uuid primary key default gen_random_uuid(), project_id uuid not null, tenant_id uuid not null,
  kind text not null check (kind in ('rights','compliance','quote','sample','contract','acceptance','receipt','candidate')),
  title text not null check (length(btrim(title)) between 1 and 400), notes text not null check (length(btrim(notes)) between 1 and 4000),
  evidence_url text not null check (length(evidence_url) between 9 and 2000 and evidence_url ~ '^https://[^/@[:space:]]+(\.[^/@[:space:]]+|:[0-9]+)(/|$)' and evidence_url !~ '@'),
  amount_minor bigint not null default 0 check (amount_minor between 0 and 999999999999), currency text not null default 'EUR' check (currency = 'EUR'),
  criteria jsonb, status text not null default 'submitted' check (status in ('submitted','approved','rejected')),
  created_by uuid not null default auth.uid() references auth.users(id), created_at timestamptz not null default now(),
  reviewed_by uuid references auth.users(id), reviewed_at timestamptz,
  foreign key(project_id,tenant_id) references public.bos_projects(id,tenant_id),
  check ((kind in ('quote','contract','receipt') and amount_minor > 0) or (kind not in ('quote','contract','receipt') and amount_minor = 0)),
  check ((status = 'submitted' and reviewed_by is null and reviewed_at is null) or (status <> 'submitted' and reviewed_by is not null and reviewed_at is not null and reviewed_by <> created_by)),
  check ((kind = 'candidate' and criteria is not null and jsonb_typeof(criteria) = 'object'
    and jsonb_typeof(criteria->'sector') = 'boolean' and jsonb_typeof(criteria->'region') = 'boolean'
    and jsonb_typeof(criteria->'capability') = 'boolean' and jsonb_typeof(criteria->'officialSource') = 'boolean') or (kind <> 'candidate' and criteria is null))
);
create table public.bos_audit (
  id bigint generated always as identity primary key, tenant_id uuid not null, project_id uuid not null,
  actor_id uuid not null, entity_id uuid not null, action text not null, created_at timestamptz not null default now(),
  before_data jsonb, after_data jsonb
);
create index bos_projects_tenant_idx on public.bos_projects(tenant_id);
create index bos_project_members_user_idx on public.bos_project_members(user_id,tenant_id);
create index bos_tasks_project_idx on public.bos_tasks(project_id,due_on);
create index bos_records_project_idx on public.bos_records(project_id,kind,status);
create index bos_audit_project_idx on public.bos_audit(project_id,created_at desc);

-- Narrow private membership lookup avoids recursive membership RLS. No writes, no user-supplied identity.
create function ciaomind_bos_private.member_role(team uuid, project uuid default null)
returns text language sql stable security definer set search_path = '' as $$
  select case when tm.role in ('owner','manager') then tm.role
    when project is null then tm.role else pm.role end
  from public.bos_tenant_members tm
  left join public.bos_project_members pm on pm.tenant_id = tm.tenant_id and pm.user_id = tm.user_id and pm.project_id = project
  where tm.tenant_id = team and tm.user_id = (select auth.uid()) and (select auth.uid()) is not null
$$;
create function ciaomind_bos_private.assignee_allowed(team uuid, project uuid, target uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select auth.uid() is not null and ciaomind_bos_private.member_role(team,project) in ('owner','manager','contributor')
    and exists (select 1 from public.bos_tenant_members tm
      where tm.tenant_id = team and tm.user_id = target and (tm.role in ('owner','manager')
        or exists (select 1 from public.bos_project_members pm where pm.project_id = project and pm.tenant_id = team and pm.user_id = target)))
$$;
revoke all on function ciaomind_bos_private.member_role(uuid,uuid), ciaomind_bos_private.assignee_allowed(uuid,uuid,uuid) from public, anon;
grant execute on function ciaomind_bos_private.member_role(uuid,uuid), ciaomind_bos_private.assignee_allowed(uuid,uuid,uuid) to authenticated;

alter table public.bos_tenants enable row level security;
alter table public.bos_tenant_members enable row level security;
alter table public.bos_project_members enable row level security;
alter table public.bos_projects enable row level security;
alter table public.bos_tasks enable row level security;
alter table public.bos_records enable row level security;
alter table public.bos_audit enable row level security;
revoke all on public.bos_tenants, public.bos_tenant_members, public.bos_project_members, public.bos_projects, public.bos_tasks, public.bos_records, public.bos_audit from public, anon, authenticated;
grant select on public.bos_tenants, public.bos_tenant_members, public.bos_project_members, public.bos_audit to authenticated;
grant select,insert,update on public.bos_projects, public.bos_tasks, public.bos_records to authenticated;
create policy bos_team_read on public.bos_tenants for select to authenticated using (ciaomind_bos_private.member_role(id) is not null);
create policy bos_team_member_read on public.bos_tenant_members for select to authenticated using (user_id = (select auth.uid()) or ciaomind_bos_private.member_role(tenant_id) in ('owner','manager'));
create policy bos_project_member_read on public.bos_project_members for select to authenticated using (ciaomind_bos_private.member_role(tenant_id,project_id) is not null);
create policy bos_project_read on public.bos_projects for select to authenticated using (ciaomind_bos_private.member_role(tenant_id,id) is not null);
create policy bos_project_create on public.bos_projects for insert to authenticated with check (ciaomind_bos_private.member_role(tenant_id) in ('owner','manager'));
create policy bos_project_update on public.bos_projects for update to authenticated using (ciaomind_bos_private.member_role(tenant_id,id) in ('owner','manager')) with check (ciaomind_bos_private.member_role(tenant_id,id) in ('owner','manager'));
create policy bos_task_read on public.bos_tasks for select to authenticated using (ciaomind_bos_private.member_role(tenant_id,project_id) is not null);
create policy bos_task_create on public.bos_tasks for insert to authenticated with check (ciaomind_bos_private.member_role(tenant_id,project_id) in ('owner','manager','contributor'));
create policy bos_task_update on public.bos_tasks for update to authenticated using (ciaomind_bos_private.member_role(tenant_id,project_id) in ('owner','manager','contributor')) with check (ciaomind_bos_private.member_role(tenant_id,project_id) in ('owner','manager','contributor'));
create policy bos_record_read on public.bos_records for select to authenticated using (ciaomind_bos_private.member_role(tenant_id,project_id) is not null);
create policy bos_record_create on public.bos_records for insert to authenticated with check (ciaomind_bos_private.member_role(tenant_id,project_id) in ('owner','manager','contributor'));
create policy bos_record_review on public.bos_records for update to authenticated using (ciaomind_bos_private.member_role(tenant_id,project_id) in ('owner','manager')) with check (ciaomind_bos_private.member_role(tenant_id,project_id) in ('owner','manager'));
create policy bos_audit_read on public.bos_audit for select to authenticated using (ciaomind_bos_private.member_role(tenant_id,project_id) is not null);

create function ciaomind_bos_private.guard_project() returns trigger language plpgsql security invoker set search_path = '' as $$
declare stages text[] := array['prospect','discovery','quote','sample','contract','delivery','acceptance','collected','closed']; required_kind text; contract_total bigint; receipt_total bigint;
begin
  if auth.uid() is null then raise insufficient_privilege; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.id::text,0));
  if tg_op = 'INSERT' then
    if new.stage <> 'prospect' or new.version <> 1 then raise exception 'initial_stage'; end if;
    new.created_at := now();
  else
    if new.id <> old.id or new.tenant_id <> old.tenant_id or new.created_at <> old.created_at then raise exception 'immutable_identity'; end if;
    if old.stage = 'closed' then raise exception 'closed_project'; end if;
    new.version := old.version + 1;
  end if;
  if not ciaomind_bos_private.assignee_allowed(new.tenant_id,new.id,new.owner_id) then raise exception 'invalid_assignee'; end if;
  if tg_op = 'UPDATE' and new.stage <> old.stage then
    if array_position(stages,new.stage) <> array_position(stages,old.stage) + 1 then raise exception 'invalid_stage_transition'; end if;
    if new.stage = 'quote' and (not exists(select 1 from public.bos_records where project_id=new.id and kind='rights' and status='approved')
      or not exists(select 1 from public.bos_records where project_id=new.id and kind='compliance' and status='approved')) then raise exception 'rights_and_compliance_required'; end if;
    required_kind := case new.stage when 'sample' then 'quote' when 'contract' then 'sample' when 'delivery' then 'contract' when 'acceptance' then 'acceptance' else null end;
    if required_kind is not null and not exists(select 1 from public.bos_records where project_id=new.id and kind=required_kind and status='approved') then raise exception 'approved_evidence_required'; end if;
    if new.stage = 'collected' then
      select coalesce(sum(amount_minor) filter (where kind='contract'),0), coalesce(sum(amount_minor) filter (where kind='receipt'),0)
      into contract_total,receipt_total from public.bos_records where project_id=new.id and status='approved';
      if contract_total <= 0 or receipt_total < contract_total then raise exception 'verified_receipts_required'; end if;
    end if;
    if new.stage = 'closed' and exists(select 1 from public.bos_tasks where project_id=new.id and status <> 'done') then raise exception 'unfinished_tasks'; end if;
  end if;
  return new;
end $$;
create trigger bos_project_guard before insert or update on public.bos_projects for each row execute function ciaomind_bos_private.guard_project();

create function ciaomind_bos_private.guard_child() returns trigger language plpgsql security invoker set search_path = '' as $$
declare parent_stage text;
begin
  if auth.uid() is null then raise insufficient_privilege; end if;
  -- Serialize child changes with stage transitions so a closing project cannot receive new pending work.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.project_id::text,0));
  select stage into parent_stage from public.bos_projects where id=new.project_id and tenant_id=new.tenant_id;
  if parent_stage is null or parent_stage in ('collected','closed') then raise exception 'project_locked'; end if;
  if tg_op = 'INSERT' then
    if new.created_by <> auth.uid() then raise insufficient_privilege; end if;
    new.created_at := now();
  elsif new.id <> old.id or new.project_id <> old.project_id or new.tenant_id <> old.tenant_id or new.created_by <> old.created_by or new.created_at <> old.created_at then raise exception 'immutable_identity'; end if;
  if tg_table_name = 'bos_tasks' then
    if not ciaomind_bos_private.assignee_allowed(new.tenant_id,new.project_id,new.owner_id) then raise exception 'invalid_assignee'; end if;
    if tg_op = 'INSERT' and new.status <> 'open' then raise exception 'initial_status'; end if;
    if tg_op = 'UPDATE' and (old.status <> 'open' or new.status <> 'done' or new.title <> old.title or new.owner_id <> old.owner_id or new.due_on <> old.due_on or new.dependency_id is distinct from old.dependency_id) then raise exception 'task_transition_only'; end if;
    -- Dependencies must predate a new task; updates cannot change edges, preventing cycles.
    if new.dependency_id is not null and not exists(select 1 from public.bos_tasks where id=new.dependency_id and project_id=new.project_id and (new.status='open' or status='done')) then raise exception 'dependency_incomplete'; end if;
  else
    if tg_op = 'INSERT' then
      if new.status <> 'submitted' or new.reviewed_by is not null or new.reviewed_at is not null then raise exception 'initial_review'; end if;
    else
      if old.status <> 'submitted' or new.status not in ('approved','rejected') or new.created_by = auth.uid()
        or ciaomind_bos_private.member_role(new.tenant_id,new.project_id) not in ('owner','manager') then raise insufficient_privilege; end if;
      if (to_jsonb(new) - array['status','reviewed_by','reviewed_at']) is distinct from (to_jsonb(old) - array['status','reviewed_by','reviewed_at']) then raise exception 'review_only'; end if;
      new.reviewed_by := auth.uid(); new.reviewed_at := now();
    end if;
    if new.kind = 'receipt' and not exists(select 1 from public.bos_records where project_id=new.project_id and kind='contract' and status='approved') then raise exception 'approved_contract_required'; end if;
    if new.kind = 'candidate' and (new.criteria is null or not (new.criteria ?& array['sector','region','capability','officialSource'])) then raise exception 'candidate_criteria_required'; end if;
    if new.kind = 'candidate' and new.status = 'approved' and new.criteria->>'officialSource' <> 'true' then raise exception 'official_source_required'; end if;
  end if;
  return new;
end $$;
create trigger bos_task_guard before insert or update on public.bos_tasks for each row execute function ciaomind_bos_private.guard_child();
create trigger bos_record_guard before insert or update on public.bos_records for each row execute function ciaomind_bos_private.guard_child();

-- Only this trigger can insert audit events. No client INSERT/UPDATE/DELETE grant or policy exists.
create function ciaomind_bos_private.audit_change() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise insufficient_privilege; end if;
  insert into public.bos_audit(tenant_id,project_id,actor_id,entity_id,action,before_data,after_data)
    values(new.tenant_id,coalesce((to_jsonb(new)->>'project_id')::uuid,new.id),auth.uid(),new.id,
      tg_table_name || ':' || lower(tg_op),case when tg_op='UPDATE' then to_jsonb(old) else null end,to_jsonb(new));
  return new;
end $$;
create trigger bos_project_audit after insert or update on public.bos_projects for each row execute function ciaomind_bos_private.audit_change();
create trigger bos_task_audit after insert or update on public.bos_tasks for each row execute function ciaomind_bos_private.audit_change();
create trigger bos_record_audit after insert or update on public.bos_records for each row execute function ciaomind_bos_private.audit_change();
revoke all on function ciaomind_bos_private.guard_project(), ciaomind_bos_private.guard_child(), ciaomind_bos_private.audit_change() from public,anon,authenticated;

-- Public intake is OFF until a database administrator provisions exactly one receiving tenant.
create table ciaomind_bos_private.intake_config (
  singleton boolean primary key default true check(singleton), tenant_id uuid not null references public.bos_tenants(id),
  enabled boolean not null default false
);
alter table ciaomind_bos_private.intake_config enable row level security;
revoke all on ciaomind_bos_private.intake_config from public,anon,authenticated;
create table public.bos_intakes (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.bos_tenants(id),
  company_name text not null check(length(btrim(company_name)) between 1 and 160),
  contact_email text not null check(length(contact_email) <= 254 and contact_email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  kind text not null check(kind in ('buyer','partner')), brief text not null check(length(btrim(brief)) between 20 and 2400),
  language text not null check(language in ('zh','it','en')), consent_version text not null default 'business-intake-v1-20261118',
  consent_at timestamptz not null default now(), created_at timestamptz not null default now(),
  status text not null default 'pending' check(status in ('pending','accepted','rejected')),
  reviewed_by uuid references auth.users(id), reviewed_at timestamptz, project_id uuid references public.bos_projects(id),
  check ((status='pending' and reviewed_by is null and reviewed_at is null and project_id is null)
    or (status='accepted' and reviewed_by is not null and reviewed_at is not null and project_id is not null)
    or (status='rejected' and reviewed_by is not null and reviewed_at is not null and project_id is null))
);
create index bos_intakes_team_idx on public.bos_intakes(tenant_id,status,created_at desc);
create index bos_intakes_rate_idx on public.bos_intakes(contact_email,created_at desc);
create table public.bos_intake_audit (
  id bigint generated always as identity primary key, tenant_id uuid not null, intake_id uuid not null references public.bos_intakes(id),
  actor_id uuid not null references auth.users(id), decision text not null check(decision in ('accepted','rejected')),
  project_id uuid references public.bos_projects(id), created_at timestamptz not null default now()
);
create index bos_intake_audit_team_idx on public.bos_intake_audit(tenant_id,created_at desc);
alter table public.bos_intakes enable row level security;
alter table public.bos_intake_audit enable row level security;
revoke all on public.bos_intakes,public.bos_intake_audit from public,anon,authenticated;
grant select,update on public.bos_intakes to authenticated;
grant select on public.bos_intake_audit to authenticated;
create policy bos_intake_manager_read on public.bos_intakes for select to authenticated using(ciaomind_bos_private.member_role(tenant_id) in ('owner','manager'));
create policy bos_intake_manager_review on public.bos_intakes for update to authenticated using(ciaomind_bos_private.member_role(tenant_id) in ('owner','manager')) with check(ciaomind_bos_private.member_role(tenant_id) in ('owner','manager'));
create policy bos_intake_audit_manager_read on public.bos_intake_audit for select to authenticated using(ciaomind_bos_private.member_role(tenant_id) in ('owner','manager'));

-- Narrow private definer permits an anonymous insert without granting anonymous table access.
-- It returns no stored personal data, derives receiving tenant from private config, and enforces persistent quotas.
create function ciaomind_bos_private.intake_available() returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from ciaomind_bos_private.intake_config where singleton and enabled)
$$;
create function ciaomind_bos_private.submit_intake(company_name text,contact_email text,request_kind text,request_brief text,request_language text,consent_given boolean)
returns uuid language plpgsql security definer set search_path='' as $$
declare receiving_team uuid; item uuid; email_normalized text := lower(btrim(contact_email));
begin
  select tenant_id into receiving_team from ciaomind_bos_private.intake_config where singleton and enabled;
  if receiving_team is null or consent_given is distinct from true then raise exception 'intake_unavailable'; end if;
  if company_name is null or contact_email is null or request_brief is null or request_kind not in ('buyer','partner') or request_language not in ('zh','it','en') then raise exception 'invalid_request'; end if;
  if length(btrim(company_name)) not between 1 and 160 or length(email_normalized)>254 or email_normalized !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or length(btrim(request_brief)) not between 20 and 2400 then raise exception 'invalid_request'; end if;
  -- Team-wide lock makes daily volume and per-email limits atomic; no caller-controlled tenant or role.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('bos-intake:' || receiving_team::text,0));
  if (select count(*) from public.bos_intakes where tenant_id=receiving_team and created_at > now()-interval '1 day') >= 200
    or (select count(*) from public.bos_intakes where tenant_id=receiving_team and public.bos_intakes.contact_email=email_normalized and created_at > now()-interval '1 day') >= 3
    then raise exception 'intake_capacity_reached'; end if;
  insert into public.bos_intakes(tenant_id,company_name,contact_email,kind,brief,language)
    values(receiving_team,btrim(company_name),email_normalized,request_kind,btrim(request_brief),request_language) returning id into item;
  return item;
end $$;
revoke all on function ciaomind_bos_private.intake_available(),ciaomind_bos_private.submit_intake(text,text,text,text,text,boolean) from public;
grant usage on schema ciaomind_bos_private to anon;
grant execute on function ciaomind_bos_private.intake_available(),ciaomind_bos_private.submit_intake(text,text,text,text,text,boolean) to anon,authenticated;
create function public.bos_intake_available() returns boolean language sql stable security invoker set search_path='' as $$ select ciaomind_bos_private.intake_available() $$;
create function public.bos_submit_intake(company_name text,contact_email text,request_kind text,request_brief text,request_language text,consent_given boolean)
returns uuid language sql security invoker set search_path='' as $$ select ciaomind_bos_private.submit_intake(company_name,contact_email,request_kind,request_brief,request_language,consent_given) $$;
revoke all on function public.bos_intake_available(),public.bos_submit_intake(text,text,text,text,text,boolean) from public;
grant execute on function public.bos_intake_available(),public.bos_submit_intake(text,text,text,text,text,boolean) to anon,authenticated;

create function ciaomind_bos_private.guard_intake_review() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if auth.uid() is null or ciaomind_bos_private.member_role(old.tenant_id) not in ('owner','manager') then raise insufficient_privilege; end if;
  if old.status <> 'pending' or new.status not in ('accepted','rejected') then raise exception 'review_transition_only'; end if;
  if (to_jsonb(new)-array['status','reviewed_by','reviewed_at','project_id']) is distinct from (to_jsonb(old)-array['status','reviewed_by','reviewed_at','project_id']) then raise exception 'intake_immutable'; end if;
  if new.status='accepted' and not exists(select 1 from public.bos_projects where id=new.project_id and tenant_id=new.tenant_id) then raise exception 'linked_project_required'; end if;
  new.reviewed_by := auth.uid(); new.reviewed_at := now();
  return new;
end $$;
create function ciaomind_bos_private.audit_intake_review() returns trigger language plpgsql security definer set search_path='' as $$
begin
  if auth.uid() is null then raise insufficient_privilege; end if;
  insert into public.bos_intake_audit(tenant_id,intake_id,actor_id,decision,project_id) values(new.tenant_id,new.id,auth.uid(),new.status,new.project_id);
  return new;
end $$;
create trigger bos_intake_review_guard before update on public.bos_intakes for each row execute function ciaomind_bos_private.guard_intake_review();
create trigger bos_intake_review_audit after update on public.bos_intakes for each row execute function ciaomind_bos_private.audit_intake_review();
revoke all on function ciaomind_bos_private.guard_intake_review(),ciaomind_bos_private.audit_intake_review() from public,anon,authenticated;

-- Atomic human acceptance + project creation, all through the caller's RLS privileges.
create function public.bos_review_intake(item uuid,decision text) returns uuid language plpgsql security invoker set search_path='' as $$
declare intake public.bos_intakes; project uuid;
begin
  select * into intake from public.bos_intakes where id=item and status='pending' for update;
  if intake.id is null or auth.uid() is null or ciaomind_bos_private.member_role(intake.tenant_id) not in ('owner','manager') then raise insufficient_privilege; end if;
  if decision not in ('accepted','rejected') then raise exception 'invalid_decision'; end if;
  if decision='accepted' then
    insert into public.bos_projects(tenant_id,title,client_name,owner_id) values(intake.tenant_id,intake.company_name,intake.company_name,auth.uid()) returning id into project;
  end if;
  update public.bos_intakes set status=decision,project_id=project where id=item;
  return project;
end $$;
revoke all on function public.bos_review_intake(uuid,text) from public,anon;
grant execute on function public.bos_review_intake(uuid,text) to authenticated;
