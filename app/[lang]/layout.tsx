import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { company } from '@/data/company';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';
export function generateStaticParams() { return [{ lang: 'zh' }, { lang: 'it' }]; }
export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const zh = lang === 'zh';
  return {
    metadataBase: new URL(company.website),
    title: { default: zh ? 'CIAOMIND｜文化与科技连接中意' : 'CIAOMIND | Cultura e tecnologia tra Italia e Cina', template: '%s | CIAOMIND' },
    description: zh ? 'CIAOMIND S.B. S.R.L.：文化遗产数字化、数字教育与中意文化交流。了解项目方向，联系团队讨论合作。' : 'CIAOMIND S.B. S.R.L.: digitalizzazione del patrimonio culturale, educazione digitale e dialogo tra Italia e Cina.',
    openGraph: { siteName: company.name, type: 'website', locale: zh ? 'zh_CN' : 'it_IT' },
    robots: { index: true, follow: true },
  };
}
export default async function LocaleLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: string } }) {
  if (!locales.includes(lang as Locale)) notFound();
  const messages = await getMessages();
  return <html lang={lang === 'zh' ? 'zh-CN' : 'it'}><body>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:p-4">{lang === 'zh' ? '跳到正文' : 'Vai al contenuto'}</a>
    <NextIntlClientProvider messages={messages} locale={lang}>
      <div className="min-h-screen flex flex-col"><Header /><main id="main-content" className="flex-1 pt-20">{children}</main><Footer /></div>
    </NextIntlClientProvider>
  </body></html>;
}
