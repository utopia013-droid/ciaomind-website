import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';

const socialLocales: Record<Locale, string> = {
  zh: 'zh_CN', it: 'it_IT', en: 'en_GB', fr: 'fr_FR', de: 'de_DE', es: 'es_ES',
};

export function marketingMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const image = { url: '/brand/ciaomind-social.png', width: 1200, height: 630, alt: 'CIAOMIND' };
  const brandedTitle = `${title} | CIAOMIND`;
  return {
    openGraph: {
      type: 'website',
      siteName: 'CIAOMIND',
      locale: socialLocales[locale],
      alternateLocale: Object.values(socialLocales).filter(value => value !== socialLocales[locale]),
      url: path,
      title: brandedTitle,
      description,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: brandedTitle, description, images: [image] },
  };
}
