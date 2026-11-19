import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import styles from './HomeVideoEntry.module.css';

const copy: Record<Locale, { formation: string; heritage: string; watch: string }> = {
  zh: { formation: '欧洲企业设立', heritage: '世界文化遗产', watch: '视频指南' },
  it: { formation: 'Costituire un’impresa in Europa', heritage: 'Patrimonio culturale mondiale', watch: 'Guide video' },
  en: { formation: 'Company formation in Europe', heritage: 'World cultural heritage', watch: 'Video guides' },
  fr: { formation: 'Créer une entreprise en Europe', heritage: 'Patrimoine culturel mondial', watch: 'Guides vidéo' },
  de: { formation: 'Unternehmensgründung in Europa', heritage: 'Weltkulturerbe', watch: 'Video-Ratgeber' },
  es: { formation: 'Crear una empresa en Europa', heritage: 'Patrimonio cultural mundial', watch: 'Guías en vídeo' },
  pt: { formation: 'Constituir uma empresa na Europa', heritage: 'Património cultural mundial', watch: 'Guias em vídeo' },
  ja: { formation: '欧州での会社設立', heritage: '世界文化遺産', watch: '動画ガイド' },
};

export default function HomeVideoEntry({ locale }: { locale: string }) {
  const c = copy[locale as Locale] ?? copy.en;
  return <section className={styles.entry} aria-label={c.watch}>
    <p className={styles.topics}><span>{c.formation}</span><span>{c.heritage}</span></p>
    <Link className={styles.link} href={`/${locale}/videos/`}>{c.watch}<span aria-hidden="true">↗</span></Link>
  </section>;
}
