import Link from 'next/link';
import { getEcosystemCopy } from '@/data/heritage-value';
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
          <li key={title}>
            <Link href={`/${lang}/videos/?stage=${index}#industry`}>
              <h3>{title}<span aria-hidden="true">↗</span></h3>
              <p>{detail}</p>
            </Link>
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
  return <section className={styles.section} id="collaboration" aria-labelledby="collaboration-title">
    <div className={styles.sectionHeading}><h2 id="collaboration-title">{c.rolesTitle}</h2><p>{c.rolesIntro}</p></div>
    <div className={styles.roles}>{c.roles.map((role, index) => (
      <Link key={role} href={`/${lang}/contact/?topic=${index === 0 ? 'heritage' : 'industry'}`}>
        <h3>{role}</h3><span>{c.contact} <span aria-hidden="true">↗</span></span>
      </Link>
    ))}</div>
    <div className={styles.capital}><p>{c.capital}</p><Link className={styles.link} href={`/${lang}/contact/?topic=capital`}>{c.stages[4][0]} <span aria-hidden="true">→</span></Link></div>
    <p className={styles.note}>{c.status}</p>
  </section>;
}
