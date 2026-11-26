import type { MetadataRoute } from 'next';
import { pageNames, localizedSeo } from '@/lib/seo';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only public, final localized routes. Do not include redirecting aliases,
  // archived news routes, account/workspace routes, or query-string variants.
  const paths = [...Object.keys(pageNames), 'network', 'videos', 'brand', 'news/milan-roundtable-2026'];
  return paths.flatMap(path => locales.map(locale => ({
    url: localizedSeo.url(locale, path),
    alternates: { languages: localizedSeo.languages(path) },
  })));
}
