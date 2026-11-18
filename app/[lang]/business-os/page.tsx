import Link from 'next/link';
import type { Metadata } from 'next';
import { accountClient, accountLocale } from '@/lib/account';
import { businessOsCopy, businessOsLabels } from '@/lib/business-os-copy';
import { canApprove, canEdit, candidateScore, projectStages, recordKinds, stageAllowed, type Tenant, type Membership, type Project, type Task, type BusinessRecord, type Audit, type Role, type Intake } from '@/lib/business-os';
import { changeBusinessOs } from './actions';
import { signOut } from '../account/actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Business OS | CIAOMIND', robots: { index: false, follow: false } };
const card = 'rounded-2xl border border-slate-200 bg-white p-5 sm:p-6';
const field = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900';
const button = 'rounded-lg bg-[#173d35] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40';
type DirectoryMember = { tenant_id: string; user_id: string; display_name: string | null };

export default async function BusinessOs({ params: paramsPromise, searchParams: searchParamsPromise }: { params: Promise<{ lang: string }>; searchParams: Promise<{ project?: string; status?: string }> }) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;

  const lang = accountLocale(params.lang);
  const language = lang === 'zh' || lang === 'it' ? lang : 'en';
  const c = businessOsCopy[language];
  const labels = businessOsLabels[language];
  const label = (key: string) => labels[key as keyof typeof labels] ?? key;
  const shell = (content: React.ReactNode) => <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4"><div><p className="mb-2 text-sm font-semibold text-emerald-800">CIAOMIND</p><h1 className="text-3xl font-semibold text-slate-950">{c.title}</h1><p className="mt-3 text-slate-600">{c.intro}</p></div><div className="flex gap-5"><Link className="underline" href={`/${lang}/`}>CIAOMIND</Link><form action={signOut.bind(null,lang)}><button className="underline">{language==='zh'?'退出':language==='it'?'Esci':'Sign out'}</button></form></div></div>{content}
  </section>;
  const client = await accountClient(false);
  if (!client) return shell(<p role="alert" className={card}>{c.unavailable}</p>);
  const { data: identity, error: authError } = await client.auth.getUser();
  if (authError || !identity.user?.email_confirmed_at || !identity.user.email) return shell(<Link href={`/${lang}/account/`} className={button}>{c.login}</Link>);
  const userId = identity.user.id;
  const userEmail = identity.user.email;
  const [teamsResult, membershipsResult, projectsResult, accessResult, directoryResult, managementDirectoryResult] = await Promise.all([
    client.from('bos_tenants').select('id,name').order('name').limit(100),
    client.from('bos_tenant_members').select('tenant_id,role').eq('user_id', userId).limit(100),
    client.from('bos_projects').select('id,tenant_id,title,client_name,owner_id,due_on,stage,version').order('created_at', { ascending: false }).limit(100),
    client.from('bos_project_members').select('project_id,role').eq('user_id', userId).limit(100),
    client.from('bos_tenant_members').select('tenant_id,user_id,display_name').order('display_name').limit(1000),
    client.from('bos_tenant_members').select('tenant_id,user_id').in('role', ['owner', 'manager']).limit(1000),
  ]);
  if ([teamsResult, membershipsResult, projectsResult, accessResult, directoryResult, managementDirectoryResult].some(result => result.error)) return shell(<p role="alert" className={card}>{c.unavailable}</p>);
  const teams = (teamsResult.data ?? []) as Tenant[];
  const memberships = (membershipsResult.data ?? []) as Membership[];
  if (!memberships.length) return shell(<p className={card}>{c.noTeam}</p>);
  const projects = (projectsResult.data ?? []) as Project[];
  const project = projects.find(item => item.id === searchParams.project) ?? projects[0];
  const teamRole = (tenant: string) => memberships.find(item => item.tenant_id === tenant)?.role;
  const directory = (directoryResult.data ?? []) as DirectoryMember[];
  const managers = new Set((managementDirectoryResult.data ?? []).map(member => `${member.tenant_id}:${member.user_id}`));
  const memberName = (memberId: string, tenantId: string) => memberId === userId ? userEmail
    : directory.find(member => member.tenant_id === tenantId && member.user_id === memberId)?.display_name?.trim() || c.authorizedMember;
  const ownerOptions = (tenantId: string, projectMembers?: Set<string>) => <>
    <option value={userId}>{userEmail}</option>
    {directory.filter(member => member.tenant_id === tenantId && member.user_id !== userId && member.display_name?.trim()
      && (managers.has(`${tenantId}:${member.user_id}`) || projectMembers?.has(member.user_id)))
      .map(member => <option key={member.user_id} value={member.user_id}>{member.display_name!.trim()}</option>)}
  </>;
  const managedTeams = memberships.filter(item => canApprove(item.role)).map(item => item.tenant_id);
  const intakesResult = managedTeams.length ? await client.from('bos_intakes').select('id,tenant_id,company_name,contact_email,kind,brief,status,created_at,project_id').in('tenant_id', managedTeams).eq('status', 'pending').order('created_at').limit(100) : null;
  if (intakesResult?.error) return shell(<p role="alert" className={card}>{c.unavailable}</p>);
  const intakes = (intakesResult?.data ?? []) as Intake[];
  const effectiveRole = project && (canApprove(teamRole(project.tenant_id)) ? teamRole(project.tenant_id) : accessResult.data?.find(item => item.project_id === project.id)?.role) as Role | undefined;
  const editable = canEdit(effectiveRole) && project?.stage !== 'collected' && project?.stage !== 'closed';
  let tasks: Task[] = [], records: BusinessRecord[] = [], audit: Audit[] = [];
  let projectMembers = new Set<string>();
  if (project) {
    const [tasksResult, recordsResult, auditResult, projectMembersResult] = await Promise.all([
      client.from('bos_tasks').select('id,project_id,title,owner_id,due_on,dependency_id,status').eq('project_id', project.id).order('due_on').limit(200),
      client.from('bos_records').select('id,project_id,kind,title,notes,evidence_url,amount_minor,status,created_by,reviewed_by,created_at,criteria').eq('project_id', project.id).order('created_at', { ascending: false }).limit(500),
      client.from('bos_audit').select('id,project_id,actor_id,entity_id,action,created_at').eq('project_id', project.id).order('created_at', { ascending: false }).limit(100),
      client.from('bos_project_members').select('user_id').eq('project_id', project.id).eq('tenant_id', project.tenant_id).limit(1000),
    ]);
    if ([tasksResult, recordsResult, auditResult, projectMembersResult].some(result => result.error)) return shell(<p role="alert" className={card}>{c.unavailable}</p>);
    tasks = (tasksResult.data ?? []) as Task[];
    records = (recordsResult.data ?? []) as BusinessRecord[];
    audit = (auditResult.data ?? []) as Audit[];
    projectMembers = new Set((projectMembersResult.data ?? []).map(member => member.user_id as string));
  }
  const action = (operation: string) => changeBusinessOs.bind(null, lang, operation);
  const hidden = () => <><input type="hidden" name="tenant_id" value={project!.tenant_id} /><input type="hidden" name="project_id" value={project!.id} /></>;
  const formatMoney = (amount: number) => new Intl.NumberFormat(language === 'zh' ? 'zh-CN' : language, { style: 'currency', currency: 'EUR' }).format(amount / 100);
  const counts = records.filter(record => record.status === 'approved');
  const contract = counts.filter(record => record.kind === 'contract').reduce((sum, record) => sum + record.amount_minor, 0);
  const receipts = counts.filter(record => record.kind === 'receipt').reduce((sum, record) => sum + record.amount_minor, 0);
  const nextStage = project && projectStages[projectStages.indexOf(project.stage) + 1];
  return shell(<>
    {searchParams.status === 'saved' && <p role="status" className="mb-5 rounded-lg bg-emerald-50 p-4 text-emerald-900">{c.saved}</p>}
    {searchParams.status === 'failed' && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-red-900">{c.failed}</p>}
    <p className="mb-5 break-all text-sm text-slate-600">{c.identity}: {userEmail}</p>
    <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="grid gap-5">
        <section className={card}><h2 className="mb-4 text-xl font-semibold">{c.projects}</h2>
          {!projects.length && <p className="text-sm text-slate-600">{c.empty}</p>}
          <nav aria-label={c.projects} className="grid gap-2">{projects.map(item => <Link aria-current={project?.id === item.id ? 'page' : undefined} className={`rounded-lg border p-3 ${project?.id === item.id ? 'border-emerald-700 bg-emerald-50' : 'border-slate-200'}`} key={item.id} href={`/${lang}/business-os/?project=${item.id}`}><span className="block font-semibold">{item.title}</span><span className="mt-1 block text-xs text-slate-600">{item.client_name} · {label(item.stage)}</span></Link>)}</nav>
        </section>
        {teams.filter(team => canApprove(teamRole(team.id))).map(team => <section className={card} key={team.id}><h2 className="mb-2 text-lg font-semibold">{c.newProject}</h2><p className="mb-4 text-sm text-slate-600">{team.name}</p><form action={action('create_project')} className="grid gap-3">
          <input type="hidden" name="tenant_id" value={team.id} />
          <label className="grid gap-1 text-sm">{c.titleField}<input className={field} name="title" maxLength={160} required /></label>
          <label className="grid gap-1 text-sm">{c.client}<input className={field} name="client_name" maxLength={160} required /></label>
          <label className="grid gap-1 text-sm">{c.owner}<select className={field} name="owner_id" defaultValue={userId} required>{ownerOptions(team.id)}</select></label>
          <label className="grid gap-1 text-sm">{c.due}<input className={field} type="date" name="due_on" /></label><button className={button}>{c.save}</button>
        </form></section>)}
      </aside>
      <div className="grid min-w-0 gap-6">
        {managedTeams.length > 0 && <section className={card}><h2 className="text-xl font-semibold">{language === 'zh' ? '企业需求与合作方入驻审核' : language === 'it' ? 'Verifica richieste e candidature partner' : 'Business requests and partner review'}</h2><Link href={`/${lang}/business-os/request/`} className="mt-3 inline-block text-sm text-emerald-800 underline">{language === 'zh' ? '公开需求入口' : language === 'it' ? 'Modulo pubblico' : 'Public request form'}</Link>
          {!intakes.length && <p className="mt-4 text-sm text-slate-500">{c.empty}</p>}
          <div className="mt-5 grid gap-4">{intakes.map(intake => <article key={intake.id} className="rounded-xl border border-slate-200 p-4"><h3 className="font-semibold">{intake.company_name} · {intake.kind === 'partner' ? (language === 'zh' ? '合作方意向' : language === 'it' ? 'Candidato partner' : 'Partner application') : c.client}</h3><p className="mt-2 break-all text-sm">{intake.contact_email}</p><p className="mt-2 whitespace-pre-wrap break-words text-sm">{intake.brief}</p><p className="mt-2 text-xs text-amber-800">{language === 'zh' ? '邮箱与申报内容未经验证。受理将创建线索项目，不授予账号、成员或合作资格。' : language === 'it' ? 'Email e contenuti non verificati. L’accettazione crea un progetto iniziale, senza concedere account, ruoli o qualifiche.' : 'Email and claims are unverified. Acceptance creates a prospect project; it grants no account, membership or partner qualification.'}</p>
            <form action={action('review_intake')} className="mt-4 flex flex-wrap items-center gap-3"><input name="tenant_id" type="hidden" value={intake.tenant_id} /><input name="id" type="hidden" value={intake.id} /><label className="flex gap-2 text-sm"><input type="checkbox" name="review_checked" required />{language === 'zh' ? '已人工核对并决定后续处理' : language === 'it' ? 'Valutazione umana effettuata' : 'Human assessment completed'}</label><button className={button} name="decision" value="accepted">{language === 'zh' ? '受理并创建项目' : language === 'it' ? 'Accetta e crea progetto' : 'Accept and create project'}</button><button name="decision" value="rejected" className="rounded-lg border border-slate-300 px-4 py-2 text-sm">{c.reject}</button></form>
          </article>)}</div>
        </section>}
        {project && <>
        <section className={card}><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-slate-500">{c.project} · {teams.find(team => team.id === project.tenant_id)?.name}</p><h2 className="mt-1 text-2xl font-semibold">{project.title}</h2><p className="mt-2">{project.client_name}</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-900">{label(project.stage)}</span></div>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-slate-500">{c.owner}</dt><dd className="break-all">{memberName(project.owner_id, project.tenant_id)}</dd></div><div><dt className="text-slate-500">{c.due}</dt><dd>{project.due_on ?? '—'}</dd></div><div><dt className="text-slate-500">{c.role}</dt><dd>{effectiveRole ? label(effectiveRole) : c.locked}</dd></div><div><dt className="text-slate-500">{label('contract')} / {label('receipt')}</dt><dd>{formatMoney(contract)} / {formatMoney(receipts)}</dd></div></dl>
          <ol className="mt-6 flex flex-wrap gap-2 text-xs" aria-label={c.stage}>{projectStages.map(stage => <li key={stage} className={`rounded px-2 py-1 ${stage === project.stage ? 'bg-[#173d35] text-white' : 'bg-slate-100 text-slate-600'}`}>{label(stage)}</li>)}</ol>
          <p className="mt-5 text-sm text-slate-600">{c.gate}</p>
          {canApprove(effectiveRole) && nextStage && <form action={action('advance')} className="mt-4">{hidden()}<input type="hidden" name="stage" value={nextStage} /><input type="hidden" name="version" value={project.version} /><button className={button} disabled={!stageAllowed(project.stage, nextStage, records) || (nextStage === 'closed' && tasks.some(task => task.status !== 'done'))}>{c.advance}: {label(nextStage)}</button></form>}
        </section>
        <section className={card}><h2 className="text-xl font-semibold">{c.tasks}</h2><p className="mt-2 text-sm text-slate-600">{c.members}</p>
          <ul className="mt-4 grid gap-3">{tasks.map(task => <li className="rounded-lg border border-slate-200 p-3" key={task.id}><div className="flex flex-wrap justify-between gap-2"><div><p className="font-semibold">{task.title} · {label(task.status)}</p><p className="mt-1 break-all text-xs text-slate-600">{c.owner}: {memberName(task.owner_id, project.tenant_id)} · {c.due}: {task.due_on}</p>{task.dependency_id && <p className="mt-1 text-xs">{c.dependency}: {tasks.find(item => item.id === task.dependency_id)?.title ?? c.otherTask}</p>}</div>{editable && task.status === 'open' && <form action={action('complete_task')}>{hidden()}<input type="hidden" name="id" value={task.id} /><button className={button} disabled={!!task.dependency_id && !tasks.some(item => item.id === task.dependency_id && item.status === 'done')}>{c.complete}</button></form>}</div></li>)}</ul>
          {!tasks.length && <p className="mt-4 text-sm text-slate-500">{c.empty}</p>}
          {editable && <form action={action('create_task')} className="mt-5 grid gap-3 border-t pt-5 sm:grid-cols-2">{hidden()}
            <label className="grid gap-1 text-sm sm:col-span-2">{c.titleField}<input className={field} name="title" maxLength={400} required /></label>
            <label className="grid gap-1 text-sm">{c.owner}<select className={field} name="owner_id" defaultValue={userId} required>{ownerOptions(project.tenant_id, projectMembers)}</select></label>
            <label className="grid gap-1 text-sm">{c.due}<input className={field} type="date" name="due_on" required /></label>
            <label className="grid gap-1 text-sm">{c.dependency}<select name="dependency_id" className={field}><option value="">{c.none}</option>{tasks.map(task => <option key={task.id} value={task.id}>{task.title}</option>)}</select></label><button className={`${button} self-end`}>{c.save}</button>
          </form>}
        </section>
        <section className={card}><h2 className="text-xl font-semibold">{c.records}</h2><p className="mt-3 text-sm text-slate-600">{c.receiptHint}</p>
          <div className="mt-5 grid gap-4">{records.map(record => <article className="rounded-xl border border-slate-200 p-4" key={record.id}><div className="flex flex-wrap justify-between gap-3"><h3 className="font-semibold">{record.title}</h3><span className="text-sm">{label(record.kind)} · {label(record.status)}</span></div><p className="mt-2 whitespace-pre-wrap break-words text-sm">{record.notes}</p><a href={record.evidence_url} target="_blank" rel="noreferrer noopener" className="mt-2 block break-all text-sm text-emerald-800 underline">{c.source}</a>
            {record.amount_minor > 0 && <p className="mt-2 font-semibold">{formatMoney(record.amount_minor)}</p>}
            {record.kind === 'candidate' && record.criteria && <p className="mt-2 text-sm">{c.score}: {candidateScore(record.criteria)} / 100 · {c.reviewed}: {record.reviewed_by ? memberName(record.reviewed_by, project.tenant_id) : '—'}</p>}
            {record.reviewed_by && <p className="mt-2 break-all text-xs text-slate-500">{c.approvedBy}: {memberName(record.reviewed_by, project.tenant_id)}</p>}
            {editable && canApprove(effectiveRole) && record.status === 'submitted' && record.created_by !== userId && <form action={action('review_record')} className="mt-4 flex flex-wrap items-center gap-3">{hidden()}<input type="hidden" name="id" value={record.id} /><label className="flex gap-2 text-sm"><input type="checkbox" name="source_checked" required />{c.reviewed}</label><button name="decision" value="approved" className={button}>{c.approve}</button><button name="decision" value="rejected" className="rounded-lg border border-slate-300 px-4 py-2 text-sm">{c.reject}</button></form>}
          </article>)}</div>
          {!records.length && <p className="mt-4 text-sm text-slate-500">{c.empty}</p>}
          {editable && <form action={action('create_record')} className="mt-6 grid gap-3 border-t pt-5 sm:grid-cols-2">{hidden()}
            <label className="grid gap-1 text-sm">{c.kind}<select className={field} name="kind">{recordKinds.map(kind => <option key={kind} value={kind}>{label(kind)}</option>)}</select></label>
            <label className="grid gap-1 text-sm">{c.titleField}<input className={field} name="title" maxLength={400} required /></label>
            <label className="grid gap-1 text-sm sm:col-span-2">{c.source}<input className={field} name="evidence_url" type="url" pattern="https://.*" maxLength={2000} required /></label>
            <label className="grid gap-1 text-sm sm:col-span-2">{c.notes}<textarea className={field} name="notes" maxLength={4000} rows={3} required /></label>
            <label className="grid gap-1 text-sm sm:col-span-2">{c.amount}<input className={field} name="amount" inputMode="decimal" pattern="(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?" defaultValue="0" /></label>
            <fieldset className="rounded-xl bg-slate-50 p-4 sm:col-span-2"><legend className="px-1 font-semibold">{c.candidate}</legend><p className="mb-4 text-sm text-slate-600">{c.rules}</p><div className="grid gap-3 sm:grid-cols-2">{(['sector', 'region', 'capability', 'officialSource'] as const).map(key => <label className="flex gap-2 text-sm" key={key}><input type="checkbox" name={key} />{c[key]}</label>)}</div></fieldset>
            <button className={`${button} sm:col-span-2`}>{c.addRecord}</button>
          </form>}
        </section>
        <section className={card}><h2 className="text-xl font-semibold">{c.audit}</h2><ol className="mt-4 grid gap-3 text-xs">{audit.map(event => <li className="break-all border-b border-slate-100 pb-3" key={event.id}><time>{new Date(event.created_at).toISOString()}</time><p className="mt-1 text-slate-600">{memberName(event.actor_id, project.tenant_id)}</p><details className="mt-2"><summary className="cursor-pointer text-slate-500">{c.references}</summary><p className="mt-2">{event.action} · {event.id} · {event.entity_id}</p></details></li>)}</ol></section>
      </>}</div>
    </div>
    <p className="mt-6 text-xs text-slate-500">{language === 'zh' ? '最多显示 100 个项目、200 项任务、500 条凭证与最近 100 条审计。阶段校验使用数据库完整记录。金额汇总为当前显示凭证的合计。' : language === 'it' ? 'Mostrati fino a 100 progetti, 200 attività, 500 documenti e 100 eventi recenti. Le verifiche usano tutti i dati; i totali qui riguardano i documenti visualizzati.' : 'Showing up to 100 projects, 200 tasks, 500 records and 100 recent audit events. Database stage checks use all records; displayed totals cover the records shown.'}</p>
  </>);
}
