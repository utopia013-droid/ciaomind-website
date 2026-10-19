export const locales = ['it', 'zh'] as const;
export type Locale = (typeof locales)[number];
