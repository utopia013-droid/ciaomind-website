export const locales = ["zh","it","en","fr","de","es","pt","ja"] as const;
export type Locale = (typeof locales)[number];
