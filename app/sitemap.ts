import type { MetadataRoute } from 'next';
import { company } from '@/data/company';
import { pageNames } from '@/lib/seo';
import { locales, localeTags } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.keys(pageNames), 'pilot', 'business', 'global', 'news/milan-roundtable-2026'];
  return paths.flatMap(path => {
    const available = ['', 'business', 'global', 'pilot', 'privacy'].includes(path) ? locales : ['zh', 'it'] as const;
    const url = (locale: string) => `${company.website}/${locale}/${path ? `${path}/` : ''}`;
    const languages = Object.fromEntries(available.map(locale => [localeTags[locale], url(locale)]));
    return available.map(locale => ({ url: url(locale), alternates: { languages } }));
  });
}
