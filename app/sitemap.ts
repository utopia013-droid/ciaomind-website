import type { MetadataRoute } from 'next';
import { company } from '@/data/company';
import { pageNames } from '@/lib/seo';
import { locales } from '@/lib/i18n';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.keys(pageNames), 'network', 'videos', 'news/milan-roundtable-2026'];
  const url = (locale: string, path: string) => company.website + '/' + locale + '/' + (path ? path + '/' : '');
  return paths.flatMap(path => locales.map(locale => ({
    url: url(locale, path),
    alternates: { languages: Object.fromEntries(locales.map(lang => [lang, url(lang, path)])) },
  })));
}
