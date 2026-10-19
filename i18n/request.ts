import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import zh from '../messages/zh.json';
import it from '../messages/it.json';
const messages = { zh, it };
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = locales.includes(requested as Locale) ? requested as Locale : 'zh';
  return { locale, timeZone: 'Europe/Rome', messages: messages[locale] };
});
