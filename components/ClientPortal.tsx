'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight, BookOpen, ClipboardList, CreditCard, FileDown, FolderOpen,
  LayoutDashboard, Layers3, ScanSearch, Settings, UserRound,
} from 'lucide-react';
import { portalCopy } from '@/data/portal-copy';
import styles from './Portal.module.css';

const serviceIds = ['market', 'sourcing', 'heritage'] as const;
const serviceIcons = [ScanSearch, ClipboardList, Layers3];
const navigation = [
  { id: 'overview', icon: LayoutDashboard },
  { id: 'services', icon: Layers3 },
  { id: 'projects', icon: FolderOpen },
  { id: 'billing', icon: CreditCard },
  { id: 'profile', icon: UserRound },
  { id: 'guides', icon: BookOpen },
  { id: 'operations', icon: Settings },
] as const;

type Locale = keyof typeof portalCopy;
type ServiceId = typeof serviceIds[number];
type View = typeof navigation[number]['id'];
type Stage = 0 | 1 | 2 | 3 | 4;

interface Project {
  id: string;
  service: ServiceId;
  company: string;
  brief: string;
  stage: Stage;
  amount?: number;
  accepted?: string;
  paid?: string;
  delivery?: string;
}

const storageKey = 'ciaomind-demo-v1';

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== 'object') return false;
  const project = value as Partial<Project>;
  return (
    typeof project.id === 'string' && serviceIds.includes(project.service as ServiceId) &&
    typeof project.company === 'string' && typeof project.brief === 'string' &&
    typeof project.stage === 'number' && [0, 1, 2, 3, 4].includes(project.stage) &&
    (project.amount == null ? project.stage === 0 : Number.isSafeInteger(project.amount) && project.amount > 0) &&
    (project.delivery == null || typeof project.delivery === 'string')
  );
}

function parseProjects(raw: string | null): Project[] {
  const value: unknown = JSON.parse(raw ?? '[]');
  return Array.isArray(value) ? value.filter(isProject) : [];
}

export default function ClientPortal({ locale }: { locale: Locale }) {
  const copy = portalCopy[locale];
  const [view, setView] = useState<View>('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [ready, setReady] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const [notice, setNotice] = useState('');
  const [chosen, setChosen] = useState<ServiceId>('market');
  const [formOpen, setFormOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const newRequestForm = useRef<HTMLFormElement>(null);
  const marketLocale = locale === 'zh' ? 'zh-CN' : 'it-IT';

  useEffect(() => {
    try {
      setProjects(parseProjects(window.localStorage.getItem(storageKey)));
    } catch {
      setStorageFailed(true);
    }
    setReady(true);
    function synchronize(event: StorageEvent) {
      if (event.key !== storageKey && event.key !== null) return;
      try {
        setProjects(parseProjects(event.newValue));
      } catch {
        setStorageFailed(true);
      }
    }
    window.addEventListener('storage', synchronize);
    return () => window.removeEventListener('storage', synchronize);
  }, []);

  useEffect(() => {
    if (formOpen) newRequestForm.current?.querySelector('input')?.focus();
  }, [formOpen]);

  const money = (cents: number) =>
    new Intl.NumberFormat(marketLocale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
  const date = (iso?: string) => iso && Number.isFinite(Date.parse(iso))
    ? new Intl.DateTimeFormat(marketLocale, { dateStyle: 'medium', timeZone: 'Europe/Rome' }).format(new Date(iso))
    : '—';
  const offering = (id: ServiceId) => copy.offerings[serviceIds.indexOf(id)];
  const latest = projects.at(-1);
  const openProjects = projects.filter(p => p.stage < 4).length;
  const pendingQuotes = projects.filter(p => p.stage === 1).length;

  function navigate(next: View) {
    setView(next);
    setFormOpen(false);
    setNotice('');
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }

  function save(next: Project[], message: string) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setStorageFailed(false);
    } catch {
      setStorageFailed(true);
    }
    setProjects(next);
    setNotice(message);
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) return;
    const data = new FormData(event.currentTarget);
    const company = String(data.get('company') ?? '').trim();
    const brief = String(data.get('brief') ?? '').trim();
    if (!company || !brief) {
      setNotice(copy.validation);
      return;
    }
    const id = 'CM-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    navigate('projects');
    save([...projects, { id, service: chosen, company, brief, stage: 0 }], copy.notices.request);
  }

  function advance(
    id: string, before: Stage, stage: Stage,
    fields: Partial<Pick<Project, 'amount' | 'accepted' | 'paid' | 'delivery'>>, message: string,
  ) {
    const current = projects.find(project => project.id === id);
    if (current?.stage !== before) return;
    save(projects.map(project => project.id === id ? { ...project, ...fields, stage } : project), message);
  }

  function submitQuote(event: FormEvent<HTMLFormElement>, project: Project) {
    event.preventDefault();
    const euros = Number(new FormData(event.currentTarget).get('amount'));
    if (!Number.isFinite(euros) || euros < 1 || euros > 100000) return;
    advance(project.id, 0, 1, { amount: Math.round(euros * 100) }, copy.notices.quote);
  }

  function submitDelivery(event: FormEvent<HTMLFormElement>, project: Project) {
    event.preventDefault();
    const delivery = String(new FormData(event.currentTarget).get('delivery') ?? '').trim();
    if (!delivery) {
      setNotice(copy.validation);
      return;
    }
    advance(project.id, 3, 4, { delivery }, copy.notices.delivery);
  }

  function downloadBill(project: Project) {
    const text = [
      'CIAOMIND', copy.billTitle, project.id, project.company, offering(project.service).name,
      money(project.amount ?? 0), date(project.accepted), project.paid ? copy.paid : copy.stages[2],
    ].join('\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = project.id.replace(/[^A-Za-z0-9_-]/g, '') + '-DEMO.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function serviceCards() {
    return <div className={styles.grid}>
      {serviceIds.map((id, index) => {
        const service = offering(id);
        const Icon = serviceIcons[index];
        return <article className={styles.card} key={id}>
          <div className={styles.icon}><Icon aria-hidden size={22} /></div>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <p className={styles.muted}>{service.deliverable}</p>
          <button className={styles.secondary} type="button" disabled={!ready} onClick={() => {
            setView('services');
            setNotice('');
            setChosen(id);
            setFormOpen(true);
            newRequestForm.current?.querySelector('input')?.focus();
          }}>
            {copy.newRequest}<span className="sr-only"> {service.name}</span><ArrowRight aria-hidden size={16} />
          </button>
        </article>;
      })}
    </div>;
  }

  function projectCards(items: Project[], team: boolean) {
    return <div className={styles.list}>
      {items.slice().reverse().map(project => <article className={styles.card} key={project.id}>
        <div className={styles.row}>
          <div><h3>{offering(project.service).name}</h3><p className={styles.muted}>{project.company} · {project.id}</p></div>
          <span className={styles.chip}>{copy.stages[project.stage]}</span>
        </div>
        <ol className={styles.steps}>
          {copy.stages.map((label, i) =>
            <li key={label} data-complete={i <= project.stage} aria-current={i === project.stage ? 'step' : undefined}>{label}</li>,
          )}
        </ol>
        <p>{project.brief}</p>
        {project.amount !== undefined && <p className={styles.amount}>{money(project.amount)}</p>}
        {project.delivery && <p><strong>{copy.deliveryLabel}：</strong>{project.delivery}</p>}
        {!team && project.stage === 0 &&
          <button className={styles.secondary} onClick={() => navigate('operations')}>{copy.readyForQuote}</button>}
        {!team && project.stage === 1 &&
          <button className={styles.primary} onClick={() => {
            navigate('billing');
            advance(project.id, 1, 2, { accepted: new Date().toISOString() }, copy.notices.accept);
          }}>{copy.confirmQuote}</button>}
        {!team && project.stage >= 2 &&
          <button className={styles.secondary} onClick={() => navigate('billing')}>{copy.billing}</button>}
        {team && project.stage === 0 && <form className={styles.form} onSubmit={event => submitQuote(event, project)}>
          <label className={styles.field}>{copy.quotePrice}
            <input name="amount" type="number" min="1" max="100000" step=".01" required />
          </label>
          <button className={styles.primary}>{copy.submitQuote}</button>
        </form>}
        {team && project.stage === 3 && <form className={styles.form} onSubmit={event => submitDelivery(event, project)}>
          <label className={styles.field}>{copy.deliveryLabel}
            <textarea name="delivery" rows={3} required maxLength={500} />
          </label>
          <button className={styles.primary}>{copy.addDelivery}</button>
        </form>}
      </article>)}
    </div>;
  }

  const billProjects = projects.filter(project => project.stage >= 2);
  const teamProjects = projects.filter(project => project.stage === 0 || project.stage === 3);

  return <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <div className={styles.identity}><strong>{copy.workspace}</strong></div>
      <nav className={styles.nav} aria-label={copy.workspace}>
        {navigation.map(({ id, icon: Icon }) =>
          <button key={id} type="button" className={styles.navButton + (id === view ? ' ' + styles.active : '')}
            aria-current={id === view ? 'page' : undefined} onClick={() => navigate(id)}>
            <Icon size={19} aria-hidden />{copy[id]}
          </button>,
        )}
      </nav>
      <Link href={`/${locale}/pilot/`} className={styles.heroLink}>{copy.reviewLink}<ArrowRight size={15} aria-hidden /></Link>
    </aside>

    <div className={styles.content}>
      <div className={styles.heading}>
        <div><h1 className="scroll-mt-24" ref={heading} tabIndex={-1}>{view === 'overview' ? copy.title : copy[view]}</h1>
        {view === 'overview' && <p>{copy.subtitle}</p>}</div>
        <span className={styles.demo}>{copy.demoLabel}</span>
      </div>
      <p className={styles.note}>{copy.demoNote}</p>
      <div role="status">{notice}{storageFailed && <p>{copy.storageError}</p>}</div>

      {view === 'overview' && <>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h2>{copy.heroTitle}</h2><p>{copy.heroBody}</p>
            <button className={styles.primary} onClick={() => navigate('services')}>{copy.heroButton}<ArrowRight size={18} aria-hidden /></button>
          </div>
          <div className={styles.heroVisual}>
            <p>{copy.activeProjects}</p>
            <strong>{openProjects}</strong>
            <div><span>{copy.pendingQuotes}</span><strong>{pendingQuotes}</strong></div>
            <div><span>{copy.deliveredProjects}</span><strong>{projects.length - openProjects}</strong></div>
          </div>
        </section>
        <section className={styles.section}>
          <h2>{copy.services}</h2>{serviceCards()}
        </section>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>{copy.projects}</h2>
            {latest && <button className={styles.secondary} onClick={() => navigate('projects')}>{copy.project}<ArrowRight size={16} aria-hidden /></button>}
          </div>
          {latest ? projectCards([latest], false) : <p className={styles.note}>{copy.emptyProjects}</p>}
        </section>
      </>}

      {view === 'services' && <>
        {serviceCards()}
        {formOpen && <section className={styles.section}>
          <h2>{copy.newRequest} · {offering(chosen).name}</h2>
          <form ref={newRequestForm} className={styles.form + ' ' + styles.card} onSubmit={submitRequest}>
            <label className={styles.field}>{copy.companyLabel}<input name="company" required maxLength={80} /></label>
            <label className={styles.field}>{copy.briefLabel}<textarea name="brief" rows={4} required maxLength={500} /></label>
            <div className={styles.actions}>
              <button className={styles.primary}>{copy.submitRequest}</button>
              <button className={styles.secondary} type="button" onClick={() => navigate('services')}>{copy.cancel}</button>
            </div>
          </form>
        </section>}
      </>}

      {view === 'projects' && (projects.length > 0 ? projectCards(projects, false) :
        <div className={styles.card}><p>{copy.emptyProjects}</p>
          <button className={styles.primary} onClick={() => navigate('services')}>{copy.heroButton}</button>
        </div>)}

      {view === 'operations' && (teamProjects.length > 0 ? projectCards(teamProjects, true) : <p className={styles.note}>{copy.noWork}</p>)}

      {view === 'billing' && <>
        <div className={styles.grid}>
          <section className={styles.card}><h2>{copy.paymentMethod}</h2><p>{copy.demoPayment}</p></section>
          <section className={styles.card}><h2>{copy.billingDetails}</h2><p>{copy.billingHelp}</p></section>
        </div>
        {billProjects.length === 0 ? <p className={styles.note}>{copy.emptyBills}</p> :
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr>{[copy.project, copy.total, copy.date, copy.status, copy.document].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
              <tbody>{billProjects.slice().reverse().map(project => <tr key={project.id}>
                <th scope="row">{offering(project.service).name}<br /><small>{project.id}</small></th>
                <td>{money(project.amount ?? 0)}</td>
                <td>{date(project.accepted)}</td>
                <td>{project.stage === 2 ?
                  <button className={styles.primary} onClick={() => advance(project.id, 2, 3, { paid: new Date().toISOString() }, copy.notices.pay)}>{copy.simulatePayment}</button>
                  : <span className={styles.chip}>{copy.paid}</span>}</td>
                <td><button className={styles.secondary} onClick={() => downloadBill(project)}><FileDown size={16} aria-hidden />{copy.downloadBill}</button></td>
              </tr>)}</tbody>
            </table>
          </div>}
      </>}

      {view === 'profile' && <section className={styles.card}>
        <h2>{copy.billingDetails}</h2>
        {latest && <p>{copy.companyLabel}：{latest.company}</p>}
        <p>{copy.billingHelp}</p>
      </section>}

      {view === 'guides' && <div className={styles.list}>{copy.questions.map(entry =>
        <details className={styles.card} key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>,
      )}</div>}
    </div>
  </div>;
}
