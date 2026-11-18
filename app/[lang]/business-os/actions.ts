'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { accountClient, accountLocale } from '@/lib/account';
import { canApprove, canEdit, moneyMinor, projectStages, recordKinds, sourceUrl, type Role } from '@/lib/business-os';

const uuid = (value: string) => {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) throw new Error('invalid_id');
  return value;
};
const bounded = (value: string, max: number) => {
  if (!value || value.length > max) throw new Error('invalid_text');
  return value;
};
const date = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) throw new Error('invalid_date');
  return value;
};

export async function changeBusinessOs(rawLang: string, operation: string, form: FormData) {
  const lang = accountLocale(rawLang);
  const client = await accountClient(true);
  if (!client) redirect(`/${lang}/business-os/?status=unavailable`);
  const { data: identity } = await client.auth.getUser();
  const user = identity.user;
  if (!user?.email_confirmed_at) redirect(`/${lang}/account/`);
  const input = (key: string) => String(form.get(key) ?? '').trim();
  let projectId = '';
  let saved = false;
  try {
    const tenant = uuid(input('tenant_id'));
    const { data: membership, error: membershipError } = await client.from('bos_tenant_members').select('role').eq('tenant_id', tenant).eq('user_id', user.id).single();
    if (membershipError || !membership) throw new Error('membership_required');
    let role = membership.role as Role;
    if (operation !== 'create_project' && operation !== 'review_intake') {
      projectId = uuid(input('project_id'));
      const { data: project, error } = await client.from('bos_projects').select('id').eq('id', projectId).eq('tenant_id', tenant).single();
      if (error || !project) throw new Error('project_access_required');
      if (!canApprove(role)) {
        const { data: projectMembership } = await client.from('bos_project_members').select('role').eq('tenant_id', tenant).eq('project_id', projectId).eq('user_id', user.id).single();
        role = projectMembership?.role as Role;
      }
    }
    if (!canEdit(role)) throw new Error('write_access_required');
    if (operation === 'review_intake') {
      if (!canApprove(role) || !['accepted', 'rejected'].includes(input('decision')) || form.get('review_checked') !== 'on') throw new Error('manager_required');
      const { data: intake, error: intakeError } = await client.from('bos_intakes').select('id').eq('id', uuid(input('id'))).eq('tenant_id', tenant).eq('status', 'pending').single();
      if (intakeError || !intake) throw new Error('intake_required');
      const { data, error } = await client.rpc('bos_review_intake', { item: intake.id, decision: input('decision') });
      if (error) throw new Error('review_failed');
      projectId = typeof data === 'string' ? data : '';
    } else if (operation === 'create_project') {
      if (!canApprove(role)) throw new Error('manager_required');
      const { data, error } = await client.from('bos_projects').insert({ tenant_id: tenant, title: bounded(input('title'), 160), client_name: bounded(input('client_name'), 160), owner_id: uuid(input('owner_id')), due_on: input('due_on') ? date(input('due_on')) : null }).select('id').single();
      if (error || !data) throw new Error('create_failed');
      projectId = data.id;
    } else if (operation === 'create_task') {
      const { error } = await client.from('bos_tasks').insert({ tenant_id: tenant, project_id: projectId, title: bounded(input('title'), 400), owner_id: uuid(input('owner_id')), due_on: date(input('due_on')), dependency_id: input('dependency_id') ? uuid(input('dependency_id')) : null, created_by: user.id });
      if (error) throw new Error('task_failed');
    } else if (operation === 'complete_task') {
      const { data, error } = await client.from('bos_tasks').update({ status: 'done' }).eq('id', uuid(input('id'))).eq('project_id', projectId).eq('tenant_id', tenant).eq('status', 'open').select('id').single();
      if (error || !data) throw new Error('task_failed');
    } else if (operation === 'create_record') {
      const kind = input('kind');
      if (!recordKinds.includes(kind as typeof recordKinds[number])) throw new Error('invalid_kind');
      const financial = ['quote', 'contract', 'receipt'].includes(kind);
      const amount = financial ? moneyMinor(input('amount')) : 0;
      if (financial && amount <= 0) throw new Error('positive_amount_required');
      const criteria = kind === 'candidate' ? { sector: form.get('sector') === 'on', region: form.get('region') === 'on', capability: form.get('capability') === 'on', officialSource: form.get('officialSource') === 'on' } : null;
      const { error } = await client.from('bos_records').insert({ tenant_id: tenant, project_id: projectId, kind, title: bounded(input('title'), 400), notes: bounded(input('notes'), 4000), evidence_url: sourceUrl(input('evidence_url')), amount_minor: amount, currency: 'EUR', criteria, created_by: user.id });
      if (error) throw new Error('record_failed');
    } else if (operation === 'review_record') {
      if (!canApprove(role) || form.get('source_checked') !== 'on' || !['approved', 'rejected'].includes(input('decision'))) throw new Error('review_required');
      const { data, error } = await client.from('bos_records').update({ status: input('decision') }).eq('id', uuid(input('id'))).eq('project_id', projectId).eq('tenant_id', tenant).eq('status', 'submitted').neq('created_by', user.id).select('id').single();
      if (error || !data) throw new Error('review_failed');
    } else if (operation === 'advance') {
      if (!canApprove(role)) throw new Error('manager_required');
      const stage = input('stage');
      const version = Number(input('version'));
      if (!projectStages.includes(stage as typeof projectStages[number]) || !Number.isSafeInteger(version) || version < 1) throw new Error('invalid_transition');
      const { data, error } = await client.from('bos_projects').update({ stage }).eq('id', projectId).eq('tenant_id', tenant).eq('version', version).select('id').single();
      if (error || !data) throw new Error('stage_failed');
    } else throw new Error('invalid_operation');
    saved = true;
  } catch {
    // Never expose database internals, document URLs or user input through redirect parameters.
  }
  revalidatePath(`/${lang}/business-os/`);
  redirect(`/${lang}/business-os/?status=${saved ? 'saved' : 'failed'}${projectId ? `&project=${encodeURIComponent(projectId)}` : ''}`);
}
