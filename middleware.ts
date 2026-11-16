import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { locales } from './lib/i18n';

const localize = createMiddleware({ locales, defaultLocale: 'zh' });
const legacyPages = /^\/(en|fr|de|es)\/(about|contact|news|services|team|terms|portal)(?:\/|$)/;

export default function middleware(request: NextRequest) {
  if (legacyPages.test(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace(/^\/(en|fr|de|es)(?=\/)/, '/it');
    const response = NextResponse.redirect(url);
    response.headers.set('Vary', 'Accept-Language');
    return response;
  }
  return localize(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - _next (Next.js internals)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
