import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['it', 'zh'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as any)) notFound();
  return {
    messages: (await import()).default
  };
});
