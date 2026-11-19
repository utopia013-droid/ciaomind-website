import Link from 'next/link';
import { getEcosystemCopy } from '@/data/heritage-value';
import { CollaborationSection, TechnologySection, ValuePath } from '@/components/HeritageValue';
import styles from '@/components/HeritageValue.module.css';

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = getEcosystemCopy(lang);
  return <div className={styles.page}>
    <header className={styles.hero}><h1>{c.title}</h1><p>{c.mission}</p></header>
    <section className={styles.services} aria-label={c.explore}>
      {c.cards.slice(0, 2).map(([title, body], index) => {
        const topic = index === 0 ? 'formation' : 'heritage';
        return <article id={topic} key={topic}>
          <h2>{title}</h2><p>{body}</p>
          <div className={styles.actions}>
            <Link className={styles.button} href={`/${lang}/contact/?topic=${topic}`}>{index === 0 ? c.formation : c.heritage} <span aria-hidden="true">→</span></Link>
            <Link className={styles.link} href={`/${lang}/videos/#${index === 0 ? 'formation' : 'industry'}`}>{c.videos} <span aria-hidden="true">↗</span></Link>
          </div>
        </article>;
      })}
    </section>
    <ValuePath lang={lang} />
    <TechnologySection lang={lang} />
    <CollaborationSection lang={lang} />
  </div>;
}
