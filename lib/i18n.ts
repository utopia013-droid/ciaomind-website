export const locales = ['zh', 'it', 'en', 'fr', 'de', 'es'] as const;
export type Locale = (typeof locales)[number];
export const localeTags: Record<Locale, string> = {
  zh: 'zh-CN', it: 'it', en: 'en', fr: 'fr', de: 'de', es: 'es',
};
