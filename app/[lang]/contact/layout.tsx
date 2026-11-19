import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'contact' });
  const shared = pageMetadata(lang, 'contact');
  const title = t('title');
  const description = t('hero_description');
  return {
    ...shared, title, description,
    openGraph: { ...shared.openGraph, title, description, url: shared.alternates?.canonical?.toString(), locale: lang },
    twitter: { ...shared.twitter, title, description },
  };
}

export default function PageLayout({ children }: { children: React.ReactNode }) { return children; }
