// One canonical URL and hreflang policy for every public language variant.
export function createLocalizedSeo(origin: string, locales: readonly string[]) {
  const site = origin.replace(/\/+$/, '');
  const url = (lang: string, path: string) => {
    const clean = path.replace(/^\/+|\/+$/g, '');
    return `${site}/${lang}/${clean ? `${clean}/` : ''}`;
  };
  const languages = (path: string): Record<string, string> => ({
    ...Object.fromEntries(locales.map(lang => [lang === 'zh' ? 'zh-CN' : lang, url(lang, path)])),
    'x-default': url('en', path),
  });
  return { url, languages, alternates: (lang: string, path: string) => ({ canonical: url(lang, path), languages: languages(path) }) };
}
