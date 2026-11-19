import Link from 'next/link';
import { getEcosystemCopy } from '@/data/heritage-value';
import { roleIds, stageIds } from '@/data/project-brief';
import { networkCopy } from '@/data/partner-network';
import type { Locale } from '@/lib/i18n';
import styles from './HeritageValue.module.css';

export function ValuePath({ lang, overview = false }: { lang: string; overview?: boolean }) {
  const c = getEcosystemCopy(lang);
  return (
    <section className={styles.section} id="value-chain" aria-labelledby="value-chain-title">
      <div className={styles.sectionHeading}>
        <h2 id="value-chain-title">{c.pathTitle}</h2>
        <p>{c.pathIntro}</p>
      </div>
      <ol className={styles.path}>
        {c.stages.map(([title, detail], index) => (
          <li key={stageIds[index]}>
            <span className={styles.stageNumber} aria-hidden="true">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
            <div className={styles.stageActions}>
              <Link className={styles.stageBrief} href={`/${lang}/contact/?topic=${index === 0 || index === 5 ? 'heritage' : index === 4 ? 'capital' : 'industry'}&stage=${stageIds[index]}#brief`} aria-label={`${title}: ${c.brief}`}>
                {c.brief}<span aria-hidden="true"> →</span>
              </Link>
              <Link className={styles.stageVideo} href={`/${lang}/videos/?stage=${index}#industry`} aria-label={`${title}: ${c.videos}`}>
                {c.videos}<span aria-hidden="true"> ↗</span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
      <p className={styles.loop}>{c.loop}</p>
      {overview ? <Link className={styles.link} href={`/${lang}/services/#heritage`}>{c.explore}<span aria-hidden="true"> →</span></Link> : null}
    </section>
  );
}

export function TechnologySection({ lang }: { lang: string }) {
  const c = getEcosystemCopy(lang);
  return <section className={styles.technology} aria-labelledby="technology-title">
    <h2 id="technology-title">{c.technologyTitle}</h2>
    <div className={styles.twoColumns}>{c.technology.map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div>
  </section>;
}

export function CollaborationSection({ lang }: { lang: string }) {
  const c = getEcosystemCopy(lang);
  const network = networkCopy[lang as Locale] ?? networkCopy.en;
  return <section className={styles.section} id="collaboration" aria-labelledby="collaboration-title">
    <div className={styles.sectionHeading}><h2 id="collaboration-title">{c.rolesTitle}</h2><p>{c.rolesIntro}</p></div>
    <div className={styles.roles}>{c.roles.map((role, index) => (
      <Link key={role} href={`/${lang}/contact/?topic=${index === 0 ? 'heritage' : index === 5 ? 'capital' : 'industry'}&role=${roleIds[index]}#brief`}>
        <h3>{role}</h3><span>{c.contact} <span aria-hidden="true">↗</span></span>
      </Link>
    ))}</div>
    <div className={styles.capital}><p>{c.capital}</p><Link className={styles.link} href={`/${lang}/contact/?topic=capital&role=capital&stage=scale#brief`}>{c.stages[4][0]} <span aria-hidden="true">→</span></Link></div>
    <p className={styles.note}>{c.status}</p>
    <Link className={styles.link} href={'/' + lang + '/network/'}>{network.title}<span aria-hidden="true"> →</span></Link>
  </section>;
}
