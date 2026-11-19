import { getEcosystemCopy } from '@/data/heritage-value';
import IndustryVideos from '@/components/IndustryVideos';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { videoText } from '@/data/service-videos';
import VideoShelf from './VideoShelf';
import styles from './videos.module.css';

type PageProps = { params: Promise<{ lang: string }>; searchParams: Promise<{ stage?: string | string[] }> };

function getLocale(lang: string) {
  if (!locales.includes(lang as Locale)) notFound();
  return lang as Locale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = getLocale((await params).lang);
  const { title } = videoText[lang];
  const { intro } = getEcosystemCopy(lang);
  const shared = pageMetadata(lang, 'videos');
  return {
    title, description: intro, alternates: shared.alternates,
    openGraph: { title, description: intro, type: 'website', url: shared.alternates?.canonical?.toString(), siteName: 'CIAOMIND', locale: lang },
    twitter: { card: 'summary', title, description: intro },
  };
}

export default async function VideosPage({ params, searchParams }: PageProps) {
  const lang = getLocale((await params).lang);
  const copy = videoText[lang];
  const ecosystem = getEcosystemCopy(lang);
  const { stage } = await searchParams;
  const initialStage = typeof stage === 'string' && /^[0-5]$/.test(stage) ? Number(stage) : null;
  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <h1>{copy.title}</h1>
        <p>{ecosystem.intro}</p>
      </header>
      <nav className={styles.topicNav} aria-label={ecosystem.explore}>
        <Link href="#formation">{ecosystem.cards[0][0]}</Link>
        <Link href="#industry">{ecosystem.libraryTitle}</Link>
      </nav>
      <VideoShelf locale={lang} copy={copy} />
      <IndustryVideos key={initialStage ?? 'all'} lang={lang} copy={ecosystem} sourceLabel={copy.source} initialStage={initialStage} />
    </div>
  );
}
