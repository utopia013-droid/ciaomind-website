import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeTags, type Locale } from '@/lib/i18n';
import { company } from '@/data/company';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';
export function generateStaticParams() { return locales.map(lang => ({ lang })); }
export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const zh = lang === 'zh';
  return {
    metadataBase: new URL(company.website),
    verification: { google: 'BCzndz9cNhhBv22fXOGM9UqXwErfYZrQyzxGFtn-WjQ' },
    icons: { icon: '/brand/ciaomind-icon.png', apple: '/brand/ciaomind-icon.png' },
    title: { default: zh ? 'CIAOMIND｜文化与科技连接中意' : 'CIAOMIND | Cultura e tecnologia tra Italia e Cina', template: '%s | CIAOMIND' },
    description: zh ? 'CIAOMIND S.B. S.R.L.：文化遗产数字化、数字教育与中意文化交流。了解项目方向，联系团队讨论合作。' : 'CIAOMIND S.B. S.R.L.: digitalizzazione del patrimonio culturale, educazione digitale e dialogo tra Italia e Cina.',
    openGraph: { siteName: company.name, type: 'website', locale: zh ? 'zh_CN' : 'it_IT' },
    robots: { index: true, follow: true },
  };
}
export default async function LocaleLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: string } }) {
  if (!locales.includes(lang as Locale)) notFound();
  const messages = await getMessages();
  const skipText: Record<Locale, string> = {
    zh: '跳到正文', it: 'Vai al contenuto', en: 'Skip to content',
    fr: 'Aller au contenu', de: 'Zum Inhalt', es: 'Saltar al contenido',
  };
  return <html lang={localeTags[lang as Locale]}><body>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:p-4">{skipText[lang as Locale]}</a>
    <NextIntlClientProvider messages={messages} locale={lang}>
      <div className="min-h-screen flex flex-col"><Header /><main id="main-content" className="flex-1 pt-20">{children}</main><Footer /></div>
    </NextIntlClientProvider>
  </body></html>;
}

