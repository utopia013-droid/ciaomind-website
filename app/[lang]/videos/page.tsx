import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { videoText } from '@/data/service-videos';
import VideoShelf from './VideoShelf';
import styles from './videos.module.css';

type PageProps = { params: Promise<{ lang: string }> };

function getLocale(lang: string) {
  if (!locales.includes(lang as Locale)) notFound();
  return lang as Locale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = getLocale((await params).lang);
  const { title, intro } = videoText[lang];
  const shared = pageMetadata(lang, 'videos');
  return {
    title, description: intro, alternates: shared.alternates,
    openGraph: { title, description: intro, type: 'website', url: shared.alternates?.canonical?.toString(), siteName: 'CIAOMIND', locale: lang },
    twitter: { card: 'summary', title, description: intro },
  };
}

export default async function VideosPage({ params }: PageProps) {
  const lang = getLocale((await params).lang);
  const copy = videoText[lang];
  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </header>
      <VideoShelf locale={lang} copy={copy} />
    </div>
  );
}
