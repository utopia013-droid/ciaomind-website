import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { videoText } from '@/data/service-videos';
import { narrationCopy } from '@/data/video-narration';
import VideoShelf from './VideoShelf';
import styles from './videos.module.css';

type PageProps = { params: Promise<{ lang: string }> };

function getLocale(lang: string) {
  if (!locales.includes(lang as Locale)) notFound();
  return lang as Locale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = getLocale((await params).lang);
  const { title } = videoText[lang];
  const { intro } = narrationCopy[lang];
  const shared = pageMetadata(lang, 'videos');
  const cover = `/media/guides/v1/formation-${lang === 'zh' ? 'zh' : 'en'}.webp`;
  return {
    title, description: intro, alternates: shared.alternates,
    openGraph: { title, description: intro, type: 'website', url: shared.alternates?.canonical?.toString(), siteName: 'CIAOMIND', locale: lang, images: [cover] },
    twitter: { card: 'summary_large_image', title, description: intro, images: [cover] },
  };
}

export default async function VideosPage({ params }: PageProps) {
  const lang = getLocale((await params).lang);
  const copy = videoText[lang];
  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <h1>{copy.title}</h1>
        <p>{narrationCopy[lang].intro}</p>
      </header>
      <VideoShelf locale={lang} copy={copy} narration={narrationCopy[lang]} />
    </div>
  );
}
