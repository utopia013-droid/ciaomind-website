import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['zh', 'it'],

  // Used when no locale matches
  defaultLocale: 'zh',
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - _next (Next.js internals)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
