import createMiddleware from 'next-intl/middleware';
import {locales} from './lib/i18n';

// On the first visit, negotiate the browser's Accept-Language preferences.
// On subsequent visits, prefer the user's explicit choice stored in NEXT_LOCALE.
// Explicit /en/, /it/, etc. URLs remain authoritative and update the preference.
// Never infer a person's preferred language solely from their IP country.
export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
  localeCookie: {
    name: 'NEXT_LOCALE',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365
  }
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
