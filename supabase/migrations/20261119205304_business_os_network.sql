-- The public network form uses the existing private review queue. It is independently opt-in.
alter table ciaomind_bos_private.intake_config add column network_enabled boolean not null default false;

alter table public.bos_intakes add column network_area text
  check (network_area in ('project','culture','design','making','market','regional','finance','technology'));
alter table public.bos_intakes drop constraint bos_intakes_language_check;
alter table public.bos_intakes add constraint bos_intakes_language_check
  check (language in ('zh','it','en') or (network_area is not null and language in ('fr','de','es','pt','ja')));

create table public.bos_network_nodes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.bos_tenants(id),
  intake_id uuid not null unique references public.bos_intakes(id),
  name text not null check (length(btrim(name)) between 1 and 160),
  area text not null check (area in ('culture','design','making','market','regional','finance','technology')),
  verification_note text not null check (length(btrim(verification_note)) between 12 and 300),
  active boolean not null default true,
  verified_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create index bos_network_nodes_team_idx on public.bos_network_nodes(tenant_id,active,created_at desc);
alter table public.bos_network_nodes enable row level security;
revoke all on public.bos_network_nodes from public, anon, authenticated;
grant select on public.bos_network_nodes to authenticated;
create policy bos_network_nodes_manager_read on public.bos_network_nodes for select to authenticated
  using (ciaomind_bos_private.member_role(tenant_id) in ('owner','manager'));

alter table public.bos_intakes add column network_referrer_id uuid references public.bos_network_nodes(id);
create index bos_intakes_network_idx on public.bos_intakes(tenant_id,status,created_at desc) where network_area is not null;
create index bos_intakes_referrer_idx on public.bos_intakes(network_referrer_id) where network_referrer_id is not null;

create function ciaomind_bos_private.network_available()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from ciaomind_bos_private.intake_config where singleton and network_enabled)
$$;

create function ciaomind_bos_private.submit_network_intake(request_id uuid, company_name text, contact_email text,
  node_area text, request_brief text, request_language text, referral_code uuid, consent_given boolean)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  receiving_team uuid;
  existing public.bos_intakes%rowtype;
  verified_referrer uuid;
  email_normalized text := lower(btrim(contact_email));
begin
  select tenant_id into receiving_team from ciaomind_bos_private.intake_config where singleton and network_enabled;
  if receiving_team is null then raise exception 'intake_unavailable'; end if;
  if request_id is null or consent_given is distinct from true
    or coalesce(node_area,'') not in ('project','culture','design','making','market','regional','finance','technology')
    or coalesce(request_language,'') not in ('zh','it','en','fr','de','es','pt','ja')
    or length(btrim(coalesce(company_name,''))) not between 1 and 160
    or coalesce(email_normalized,'') !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or length(email_normalized) > 254
    or length(btrim(coalesce(request_brief,''))) not between 20 and 1600
    then raise exception 'invalid_request'; end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('bos-intake:' || receiving_team::text,0));
  select * into existing from public.bos_intakes where id=request_id and tenant_id=receiving_team;
  if found then
    if existing.network_area=node_area and existing.company_name=btrim(company_name)
      and existing.contact_email=email_normalized and existing.brief=btrim(request_brief) and existing.language=request_language
      then return request_id; end if;
    raise exception 'conflicting_request';
  end if;

  if (select count(*) from public.bos_intakes where tenant_id=receiving_team and network_area is not null and created_at > now()-interval '1 day') >= 80
    or (select count(*) from public.bos_intakes i where i.tenant_id=receiving_team and i.contact_email=email_normalized and i.created_at > now()-interval '1 day') >= 3
    then raise exception 'intake_capacity_reached'; end if;

  -- A public code labels an introduction. It grants neither project access nor a financial entitlement.
  select id into verified_referrer from public.bos_network_nodes where id=referral_code and tenant_id=receiving_team and active for share;
  insert into public.bos_intakes(id,tenant_id,company_name,contact_email,kind,brief,language,consent_version,network_area,network_referrer_id)
    values(request_id,receiving_team,btrim(company_name),email_normalized,
      case when node_area='project' then 'buyer' else 'partner' end, btrim(request_brief),request_language,
      'network-intake-v1-20261119',node_area,verified_referrer);
  return request_id;
end $$;

create function ciaomind_bos_private.verify_network_node(item uuid, verification text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  intake public.bos_intakes%rowtype;
  node uuid;
begin
  select * into intake from public.bos_intakes where id=item;
  if not found or auth.uid() is null or
    coalesce(ciaomind_bos_private.member_role(intake.tenant_id),'') not in ('owner','manager')
    then raise insufficient_privilege; end if;
  if intake.status <> 'accepted' or intake.kind <> 'partner' or intake.project_id is null
    or intake.network_area is null or intake.network_area='project'
    or length(btrim(coalesce(verification,''))) not between 12 and 300
    then raise exception 'node_review_required'; end if;

  insert into public.bos_network_nodes(tenant_id,intake_id,name,area,verification_note,verified_by)
    values(intake.tenant_id,item,intake.company_name,intake.network_area,btrim(verification),auth.uid())
    on conflict (intake_id) do nothing returning id into node;
  if node is not null then
    insert into public.bos_audit(tenant_id,project_id,actor_id,entity_id,action,after_data)
      values(intake.tenant_id,intake.project_id,auth.uid(),node,'network_node_verified','{"active":true}'::jsonb);
    return node;
  end if;
  select id into node from public.bos_network_nodes where intake_id=item;
  return node;
end $$;

create function ciaomind_bos_private.set_network_node_active(node_id uuid, make_active boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare
  node public.bos_network_nodes%rowtype;
  linked_project uuid;
begin
  select * into node from public.bos_network_nodes where id=node_id;
  if not found or auth.uid() is null or
    coalesce(ciaomind_bos_private.member_role(node.tenant_id),'') not in ('owner','manager')
    then raise insufficient_privilege; end if;
  if make_active is null then raise exception 'invalid_node_state'; end if;

  -- Update and audit in one transaction. A repeated request creates no extra event.
  update public.bos_network_nodes set active=make_active where id=node_id and active<>make_active;
  if found then
    select project_id into linked_project from public.bos_intakes where id=node.intake_id;
    insert into public.bos_audit(tenant_id,project_id,actor_id,entity_id,action,after_data)
      values(node.tenant_id,linked_project,auth.uid(),node_id,'network_node_state',pg_catalog.jsonb_build_object('active',make_active));
  end if;
end $$;

revoke all on function ciaomind_bos_private.network_available(),
  ciaomind_bos_private.submit_network_intake(uuid,text,text,text,text,text,uuid,boolean),
  ciaomind_bos_private.verify_network_node(uuid,text),
  ciaomind_bos_private.set_network_node_active(uuid,boolean) from public,anon,authenticated;
grant execute on function ciaomind_bos_private.network_available(),
  ciaomind_bos_private.submit_network_intake(uuid,text,text,text,text,text,uuid,boolean) to anon,authenticated;
grant execute on function ciaomind_bos_private.verify_network_node(uuid,text),
  ciaomind_bos_private.set_network_node_active(uuid,boolean) to authenticated;

create function public.bos_network_available()
returns boolean language sql stable security invoker set search_path = '' as $$
  select ciaomind_bos_private.network_available()
$$;
create function public.bos_submit_network_intake(request_id uuid, company_name text, contact_email text,
  node_area text, request_brief text, request_language text, referral_code uuid, consent_given boolean)
returns uuid language sql security invoker set search_path = '' as $$
  select ciaomind_bos_private.submit_network_intake(request_id,company_name,contact_email,node_area,request_brief,request_language,referral_code,consent_given)
$$;
create function public.bos_verify_network_node(item uuid, verification text)
returns uuid language sql security invoker set search_path = '' as $$
  select ciaomind_bos_private.verify_network_node(item,verification)
$$;
create function public.bos_set_network_node_active(node_id uuid, make_active boolean)
returns void language sql security invoker set search_path = '' as $$
  select ciaomind_bos_private.set_network_node_active(node_id,make_active)
$$;

revoke all on function public.bos_network_available(),
  public.bos_submit_network_intake(uuid,text,text,text,text,text,uuid,boolean),
  public.bos_verify_network_node(uuid,text), public.bos_set_network_node_active(uuid,boolean) from public,anon,authenticated;
grant execute on function public.bos_network_available(),
  public.bos_submit_network_intake(uuid,text,text,text,text,text,uuid,boolean) to anon,authenticated;
grant execute on function public.bos_verify_network_node(uuid,text), public.bos_set_network_node_active(uuid,boolean) to authenticated;
