import {newsTranslations} from '@/data/news-translations';
import { innerPageLocales } from '@/data/inner-page-locales';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/data/company';
import { roundtable, roundtableImages } from '@/data/milan-roundtable';

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await paramsPromise;

  const c = (lang in newsTranslations ? newsTranslations[lang as keyof typeof newsTranslations] : roundtable[lang === 'zh' ? 'zh' : 'it']);
  const url = `${company.website}/${lang}/news/${roundtable.slug}/`;
  return {
    title: { absolute: `${c.title} | CIAOMIND` }, description: c.summary,
    alternates: { canonical: url, languages: Object.fromEntries(['zh','it','en','fr','de','es','pt','ja'].map(l=>[l,`${company.website}/${l}/news/${roundtable.slug}/`])) },
    openGraph: { type: 'article', title: c.title, description: c.summary, url, publishedTime: roundtable.published, images: [{ url: `${company.website}/images/news/${roundtable.slug}/group.jpg`, width: 1280, height: 1774, alt: c.captions[0] }] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.summary, images: [`${company.website}/images/news/${roundtable.slug}/group.jpg`] },
  };
}
export default async function MilanRoundtable({ params: paramsPromise }: { params: Promise<{ lang: string }> }) {
  const { lang } = await paramsPromise;

  const zh = lang === 'zh';
  const c = (lang in newsTranslations ? newsTranslations[lang as keyof typeof newsTranslations] : roundtable[zh ? 'zh' : 'it']);
  const localized = innerPageLocales[lang as keyof typeof innerPageLocales]?.news;
  const structuredData = { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: c.title, description: c.summary, datePublished: roundtable.published, inLanguage: lang === 'zh' ? 'zh-CN' : lang, author: { '@type': 'Organization', name: 'CIAOMIND' }, publisher: { '@type': 'Organization', name: company.name }, mainEntityOfPage: `${company.website}/${lang}/news/${roundtable.slug}/`, image: roundtableImages.map(image => `${company.website}/images/news/${roundtable.slug}/${image.file}`) };
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <header className="section bg-primary-navy text-white"><div className="container-modern max-w-4xl">
      <Link className="underline text-sm" href={`/${lang}/news/`}>{localized ? localized[0] : zh ? '← 公司动态' : '← Notizie'}</Link>
      <p className="mt-8 text-sm tracking-widest">MILANO · ITALIA–CINA</p>
      <h1 className="text-3xl md:text-5xl leading-tight my-6 text-white">{c.title}</h1>
      <p className="text-lg leading-relaxed">{c.summary}</p>
      <p className="mt-8 text-sm">{zh ? '发布于 ' : lang === 'it' ? 'Pubblicato il ' : 'Published: '}<time dateTime={roundtable.published}>20.10.2026</time>{zh ? ' · 活动日期：' : lang === 'it' ? ' · Data dell’incontro: ' : ' · Event: '}<time dateTime={roundtable.eventDate}>17.10.2026</time></p>
    </div></header>
    <div className="section"><div className="container-modern max-w-4xl">
      <p className="text-sm mb-8">Club House · Via Esopo 8, Milano · 10:30–13:00</p>
      <div className="space-y-6 text-lg leading-loose"><p>{c.intro}</p><p>{c.context}</p></div>
      <figure className="my-12"><Image className="w-full h-auto max-h-[850px] object-contain bg-stone-100" src={`/images/news/${roundtable.slug}/group.jpg`} width={1280} height={1774} alt={c.captions[0]} priority /><figcaption className="mt-3 text-sm text-gray-600">{c.captions[0]} · Milano, 17.10.2026</figcaption></figure>
      {c.sections.map(([title, body]) => <section key={title} className="my-10"><h2 className="text-2xl mb-4">{title}</h2><p className="text-lg leading-loose">{body}</p></section>)}
      <p className="text-lg leading-loose border-l-2 border-primary-navy pl-6 my-12">{c.closing}</p>
      <h2 className="text-2xl mb-6">{zh ? '现场影像' : lang === 'it' ? 'Immagini dell’incontro' : 'Gallery'}</h2>
      <div className="grid gap-8 md:grid-cols-3">{roundtableImages.slice(1).map((image, i) => <figure key={image.file}><a href={`/images/news/${roundtable.slug}/${image.file}`}><Image className="w-full h-auto" src={`/images/news/${roundtable.slug}/${image.file}`} width={image.width} height={image.height} alt={c.captions[i + 1]} /></a><figcaption className="mt-3 text-sm text-gray-600">{c.captions[i + 1]}</figcaption></figure>)}</div>
      <p className="text-sm leading-relaxed text-gray-600 border-t mt-12 pt-6">{c.note}</p>
      <Link className="inline-block underline mt-8" href={`/${lang}/news/`}>{localized ? localized[0] : zh ? '返回新闻' : 'Torna alle notizie'}</Link>
    </div></div>
  </article>;
}
