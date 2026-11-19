import type { Metadata } from 'next';
import Link from 'next/link';
import { accountClient, accountLocale } from '@/lib/account';
import { networkCopy } from '@/data/partner-network';
import { company } from '@/data/company';
import { networkArea } from '@/lib/partner-network';
import { changeNetworkNode } from './actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

const copy = {
  zh: {
    title: '产业节点管理', intro: '审核通过的合作方，经核验后可登记为节点。引荐记录用于复核来源和贡献。',
    queue: '回工作台处理申请', view: '查看关联项目', signIn: '验证邮箱并登录', denied: '此页面仅对团队管理员开放。',
    error: '暂时无法读取节点，或操作未完成。请稍后重试。', saved: '节点记录已更新。',
    pending: '待核验的合作方', nodes: '已登记节点', empty: '暂无记录', note: '核验依据（12–300 字符）',
    confirm: '已核对机构和联系人，确认合作范围及使用引荐链接的意愿。', verify: '核验并登记节点',
    active: '有效', paused: '暂停', resume: '恢复引荐', pause: '暂停引荐', link: '专属引荐链接',
  },
  it: {
    title: 'Gestione della rete industriale', intro: 'I partner accettati diventano nodi dopo la verifica. I riferimenti consentono di controllare l’origine e il contributo.',
    queue: 'Torna alle richieste', view: 'Apri il progetto collegato', signIn: 'Verifica la tua email e accedi', denied: 'Area riservata agli amministratori del team.',
    error: 'Dati non disponibili o modifica non completata. Riprova più tardi.', saved: 'Nodo aggiornato.',
    pending: 'Partner da verificare', nodes: 'Nodi registrati', empty: 'Nessun risultato', note: 'Esito della verifica (12–300 caratteri)',
    confirm: 'Ho verificato organizzazione, contatto, ambito e disponibilità a usare il link.', verify: 'Verifica e registra il nodo',
    active: 'Attivo', paused: 'Sospeso', resume: 'Riattiva i riferimenti', pause: 'Sospendi i riferimenti', link: 'Link di riferimento',
  },
  en: {
    title: 'Manage industry nodes', intro: 'Accepted partners can be registered as nodes after verification. Referrals provide a record for checking origin and contribution.',
    queue: 'Return to the application queue', view: 'Open linked project', signIn: 'Verify your email and sign in', denied: 'This page is for authorised team managers.',
    error: 'The network is temporarily unavailable or the change did not complete. Try again later.', saved: 'Node updated.',
    pending: 'Partners to verify', nodes: 'Registered nodes', empty: 'No entries yet', note: 'Verification note (12–300 characters)',
    confirm: 'I have checked the organisation, contact, scope and willingness to use the referral link.', verify: 'Verify and register node',
    active: 'Active', paused: 'Paused', resume: 'Resume referrals', pause: 'Pause referrals', link: 'Referral link',
  },
};

const button = 'rounded-lg bg-[#173d35] px-4 py-3 text-sm font-semibold text-white';
const panel = 'rounded-xl border border-slate-200 bg-white p-5';

export default async function NetworkWorkspace({ params, searchParams }: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const [route, query, client] = await Promise.all([params, searchParams, accountClient(false)]);
  const lang = accountLocale(route.lang);
  const c = copy[lang === 'zh' || lang === 'it' ? lang : 'en'];
  const base = '/' + lang + '/';
  const areaLabel = (value: string) => {
    const area = networkArea(value);
    return area ? networkCopy[lang].areas[area][0] : value;
  };
  const shell = (body: React.ReactNode) => <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
    <h1 className="text-3xl font-semibold text-[#173d35]">{c.title}</h1>
    <p className="mt-3 max-w-2xl text-slate-700">{c.intro}</p>
    <Link className="my-5 inline-block underline" href={base + 'business-os/#intake-queue'}>{c.queue}</Link>
    {body}
  </section>;

  if (!client) return shell(<p role="alert" className={panel}>{c.error}</p>);
  const { data: identity } = await client.auth.getUser();
  if (!identity.user?.email_confirmed_at) return shell(<Link className={button + ' block w-fit'} href={base + 'account/'}>{c.signIn}</Link>);
  const membership = await client.from('bos_tenant_members').select('tenant_id')
    .eq('user_id', identity.user.id).in('role', ['owner', 'manager']);
  if (membership.error) return shell(<p role="alert" className={panel}>{c.error}</p>);
  const teams = (membership.data ?? []).map(row => row.tenant_id as string);
  if (!teams.length) return shell(<p className={panel}>{c.denied}</p>);
  const [nodes, accepted] = await Promise.all([
    client.from('bos_network_nodes').select('id,intake_id,name,area,active,verification_note').in('tenant_id', teams).order('created_at', { ascending: false }),
    client.from('bos_intakes').select('id,project_id,company_name,network_area').in('tenant_id', teams)
      .eq('status', 'accepted').eq('kind', 'partner').not('network_area', 'is', null).order('reviewed_at', { ascending: false }),
  ]);
  if (nodes.error || accepted.error) return shell(<p role="alert" className={panel}>{c.error}</p>);
  const nodeList = nodes.data ?? [];
  const acceptedList = accepted.data ?? [];
  const admitted = new Set(nodeList.map(node => node.intake_id));
  const pending = acceptedList.filter(item => !admitted.has(item.id));
  const projectsByIntake = new Map(acceptedList.map(item => [item.id, item.project_id]));
  const projectLink = (id: string) => base + 'business-os/?project=' + encodeURIComponent(id);

  return shell(<>
    {query.status === 'saved' && <p role="status" className="mb-5 rounded-lg bg-emerald-50 p-4">{c.saved}</p>}
    {query.status === 'failed' && <p role="alert" className="mb-5 rounded-lg bg-amber-50 p-4">{c.error}</p>}
    <div className="grid items-start gap-6 md:grid-cols-2">
      <section aria-labelledby="node-review">
        <h2 id="node-review" className="mb-4 text-xl font-semibold">{c.pending}</h2>
        <div className="grid gap-4">
          {!pending.length && <p className={panel}>{c.empty}</p>}
          {pending.map(item => <article className={panel} key={item.id}>
            <h3 className="break-words font-semibold">{item.company_name} · {areaLabel(item.network_area)}</h3>
            {item.project_id && <Link className="mt-2 inline-block text-sm underline" href={projectLink(item.project_id)}>{c.view}</Link>}
            <form action={changeNetworkNode.bind(null, lang, 'verify')} className="mt-4 grid gap-3">
              <input type="hidden" name="id" value={item.id} />
              <label className="grid gap-2 text-sm">{c.note}
                <textarea className="rounded-lg border border-slate-400 px-3 py-2" name="verification" minLength={12} maxLength={300} rows={2} required />
              </label>
              <label className="flex items-start gap-2 text-sm"><input className="mt-1" type="checkbox" name="confirmed" required />{c.confirm}</label>
              <button className={button + ' w-fit'}>{c.verify}</button>
            </form>
          </article>)}
        </div>
      </section>
      <section aria-labelledby="node-directory">
        <h2 id="node-directory" className="mb-4 text-xl font-semibold">{c.nodes}</h2>
        <div className="grid gap-4">
          {!nodeList.length && <p className={panel}>{c.empty}</p>}
          {nodeList.map(node => {
            const projectId = projectsByIntake.get(node.intake_id);
            return <article className={panel + ' min-w-0'} key={node.id}>
              <p className="text-sm text-emerald-800">{node.active ? c.active : c.paused} · {areaLabel(node.area)}</p>
              <h3 className="mt-1 break-words font-semibold">{node.name}</h3>
              <p className="mt-2 break-words text-sm text-slate-700">{node.verification_note}</p>
              {projectId && <Link className="mt-2 inline-block text-sm underline" href={projectLink(projectId)}>{c.view}</Link>}
              {node.active && <label className="mt-4 grid gap-1 text-sm">{c.link}
                <input readOnly className="w-full rounded-lg border border-slate-400 px-2 py-2 text-sm"
                  value={company.website + base + 'network/?ref=' + node.id + '#apply'} />
              </label>}
              <form action={changeNetworkNode.bind(null, lang, 'state')} className="mt-4">
                <input type="hidden" name="id" value={node.id} />
                <button className="rounded-lg border border-slate-400 px-4 py-2 text-sm" name="active" value={String(!node.active)}>
                  {node.active ? c.pause : c.resume}
                </button>
              </form>
            </article>;
          })}
        </div>
      </section>
    </div>
  </>);
}
