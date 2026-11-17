import createMiddleware from 'next-intl/middleware';
export default createMiddleware({locales:["zh","it","en","fr","de","es","pt","ja"],defaultLocale:'en'});
export const config={matcher:['/((?!api|_next|.*\\..*).*)']};
