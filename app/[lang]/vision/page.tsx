import Link from 'next/link';
import { getEcosystemCopy } from '@/data/heritage-value';
import { pageMetadata } from '@/lib/seo';
import { CollaborationSection, TechnologySection, ValuePath } from '@/components/HeritageValue';
import styles from '@/components/HeritageValue.module.css';

type PageProps = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: PageProps) {
  return pageMetadata((await params).lang, 'vision');
}
export default async function VisionPage({ params }: PageProps) {
  const { lang } = await params;
  const c = getEcosystemCopy(lang);
  return <div className={styles.page}>
    <header className={styles.hero}><h1>{c.title}</h1><p>{c.mission}</p>
      <Link className={styles.link} href={`/${lang}/videos/#industry`}>{c.videos} <span aria-hidden="true">↗</span></Link>
    </header>
    <ValuePath lang={lang} />
    <TechnologySection lang={lang} />
    <CollaborationSection lang={lang} />
  </div>;
}
