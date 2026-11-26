import { randomUUID } from 'node:crypto';
import type { Metadata } from 'next';
import { localizedSeo } from '@/lib/seo';
import Link from 'next/link';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Link2, Landmark, PenTool, Factory, Store, Globe2, ClipboardCheck, Blocks, Wallet } from 'lucide-react';
import NetworkApplication from '@/components/NetworkApplication';
import { networkCopy } from '@/data/partner-network';
import { accountClient, accountLocale } from '@/lib/account';
import { networkAreas, networkArea, networkId, type NetworkArea } from '@/lib/partner-network';
import { submitNetworkApplication } from './actions';
import styles from './network.module.css';

export const dynamic = 'force-dynamic';

type RouteProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ area?: string | string[]; ref?: string | string[] }>;
};

const icons = { project: ClipboardCheck, culture: Landmark, design: PenTool, making: Factory, market: Store, regional: Globe2, finance: Wallet, technology: Blocks };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const locale = accountLocale((await params).lang);
  const copy = networkCopy[locale];
  return {
    title: copy.title,
    description: copy.summary,
    alternates: localizedSeo.alternates(locale, 'network'),
  };
}

async function intakeAvailable() {
  try {
    const client = await accountClient(false);
    const response = client && await client.rpc('bos_network_available');
    return response?.data === true && !response.error;
  } catch {
    return false;
  }
}

export default async function NetworkPage({ params, searchParams }: RouteProps) {
  const [route, query, ready] = await Promise.all([params, searchParams, intakeAvailable()]);
  const lang = accountLocale(route.lang);
  const c = networkCopy[lang];
  const selected = networkArea(query.area) ?? 'project';
  const referral = networkId(query.ref);
  const base = '/' + lang + '/';
  const applyLink = (area: NetworkArea) => base + 'network/?area=' + area + (referral ? '&ref=' + referral : '') + '#apply';

  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.wrap + ' ' + styles.heroGrid}>
        <div>
          <p className={styles.eyebrow}>{c.title}</p>
          <h1>{c.headline}</h1>
          <p className={styles.intro}>{c.summary}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#apply">{c.start}<ArrowDown aria-hidden="true" size={18} /></a>
            <Link className={styles.secondary} href={base + 'business-os/'}>{c.workspace}<ArrowUpRight aria-hidden="true" size={17} /></Link>
          </div>
        </div>
        <ol className={styles.flow} aria-label={c.rulesTitle}>
          {c.steps.map((step, index) => <li key={step}>
            {index === 1 ? <Link2 size={22} aria-hidden="true" /> : <ArrowDownRight size={22} aria-hidden="true" />}
            <span>{step}</span>
          </li>)}
        </ol>
      </div>
    </section>

    <section className={styles.wrap + ' ' + styles.section} aria-labelledby="network-areas">
      <h2 id="network-areas">{c.areasTitle}</h2>
      <div className={styles.areaGrid}>
        {networkAreas.map(area => {
          const Icon = icons[area];
          const [name, desc] = c.areas[area];
          return <Link href={applyLink(area)} key={area} className={styles.area} aria-label={c.select + ' · ' + name}>
            <Icon size={23} aria-hidden="true" />
            <h3>{name}</h3>
            <p>{desc}</p>
            <ArrowDownRight aria-hidden="true" size={18} className={styles.areaArrow} />
          </Link>;
        })}
      </div>
    </section>

    <section className={styles.rules} aria-labelledby="network-rules">
      <div className={styles.wrap + ' ' + styles.section}>
        <h2 id="network-rules">{c.rulesTitle}</h2>
        <div className={styles.ruleGrid}>
          {c.rules.map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}
        </div>
      </div>
    </section>

    <section className={styles.wrap + ' ' + styles.apply} id="apply" aria-labelledby="network-apply">
      <div>
        <h2 id="network-apply">{c.formTitle}</h2>
        <p>{c.formIntro}</p>
      </div>
      <div className={styles.form}>
        {ready ? <NetworkApplication key={selected + ':' + (referral ?? '')} lang={lang} defaultArea={selected} copy={c}
          action={submitNetworkApplication.bind(null, lang, randomUUID(), referral ?? null)} />
          : <p role="status">{c.unavailable} <Link className="underline" href={base + 'contact/'}>{c.contact}</Link></p>}
      </div>
    </section>
  </div>;
}
