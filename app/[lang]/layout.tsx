import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { company } from '@/data/company';
import Header from '@/components/Header';
import BrandIntro from '@/components/BrandIntro';
import Footer from '@/components/Footer';
import '../globals.css';
export function generateStaticParams() { return locales.map(lang=>({lang})); }
export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await paramsPromise;

  const zh = lang === 'zh';
  return {
    metadataBase: new URL(company.website),
    verification: { google: 'BCzndz9cNhhBv22fXOGM9UqXwErfYZrQyzxGFtn-WjQ' },
    icons: { icon: [{ url: '/brand/ciaomind-icon-green.svg', type: 'image/svg+xml' }], apple: '/brand/ciaomind-icon-green.png' },
    title: { default: zh ? 'CIAOMIND｜文化与可信 AI 协作' : lang==='it' ? 'CIAOMIND | Heritage Economy e AI affidabile' : 'CIAOMIND | Heritage Economy OS · Trusted AI Workflows', template: '%s | CIAOMIND' },
    description: zh ? '文化 IP 商业化、跨境匹配与可信 AI 工作流的试点探索。' : 'CIAOMIND Heritage Economy OS: a pilot for rights-cleared cultural assets, real-world partners and human-supervised AI workflows.',
    openGraph: { siteName: company.name, type: 'website', locale: zh ? 'zh_CN' : 'it_IT' },
    robots: { index: true, follow: true },
  };
}
export default async function LocaleLayout({ children, params: paramsPromise }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await paramsPromise;

  if (!locales.includes(lang as Locale)) notFound();
  const messages = await getMessages();
  return <html lang={lang === 'zh' ? 'zh-CN' : lang}><body>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:p-4">{lang === 'zh' ? '跳到正文' : 'Vai al contenuto'}</a>
    <NextIntlClientProvider messages={messages} locale={lang}>
      <BrandIntro /><div className="min-h-screen flex flex-col"><Header /><main id="main-content" className="flex-1 pt-20">{children}</main><Footer /></div>
    </NextIntlClientProvider>
  </body></html>;
}


