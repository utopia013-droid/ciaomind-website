import { innerPageLocales } from '@/data/inner-page-locales';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/data/company';
import { roundtable, roundtableImages } from '@/data/milan-roundtable';

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const c = roundtable[lang === 'zh' ? 'zh' : 'it'];
  const url = `${company.website}/${lang}/news/${roundtable.slug}/`;
  return {
    title: { absolute: `${c.title} | CIAOMIND` }, description: c.summary,
    alternates: { canonical: url, languages: { 'zh-CN': `${company.website}/zh/news/${roundtable.slug}/`, it: `${company.website}/it/news/${roundtable.slug}/` } },
    openGraph: { type: 'article', title: c.title, description: c.summary, url, publishedTime: roundtable.published, images: [{ url: `${company.website}/images/news/${roundtable.slug}/group.jpg`, width: 1280, height: 1774, alt: c.captions[0] }] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.summary, images: [`${company.website}/images/news/${roundtable.slug}/group.jpg`] },
  };
}
export default function MilanRoundtable({ params: { lang } }: { params: { lang: string } }) {
  const zh = lang === 'zh';
  const c = roundtable[zh ? 'zh' : 'it'];
  const localized = innerPageLocales[lang as keyof typeof innerPageLocales]?.news;
  if(localized) return <article><header className="section bg-primary-navy text-white"><div className="container-modern max-w-4xl"><Link className="underline" href={`/${lang}/news/`}>{localized[0]}</Link><h1 className="text-3xl md:text-5xl text-white mt-8">Milano · Italia–Cina · 17.10.2026</h1><p className="mt-6">{localized[1]}</p></div></header><section className="section bg-white"><div className="container-modern max-w-4xl space-y-8"><p>{localized[3]}</p><p>{({en:'The Milan roundtable explored fashion, design and lifestyle, including brand management after acquisitions and cooperation between Italian and Chinese businesses. This is an event recap, not a transcript or a joint declaration.',fr:'La table ronde de Milan a abordé la mode, le design, la gestion des marques après acquisition et la coopération entre entreprises italiennes et chinoises. Ce compte rendu ne constitue ni une transcription ni une déclaration commune.',de:'Die Mailänder Gesprächsrunde behandelte Mode, Design, Markenführung nach Übernahmen und die Zusammenarbeit italienischer und chinesischer Unternehmen. Dies ist ein Veranstaltungsbericht, kein Wortprotokoll oder eine gemeinsame Erklärung.',es:'La mesa redonda de Milán abordó moda, diseño, gestión de marcas tras adquisiciones y cooperación empresarial entre Italia y China. Este texto es un resumen del encuentro, no una transcripción ni una declaración conjunta.',pt:'A mesa-redonda de Milão abordou moda, design, gestão de marcas após aquisições e cooperação entre empresas italianas e chinesas. Este texto é um resumo, não uma transcrição nem uma declaração conjunta.',ja:'ミラノの円卓会議では、ファッション、デザイン、買収後のブランド運営、イタリアと中国の企業協力について意見交換が行われました。これは会議の概要であり、逐語録や共同声明ではありません。'} as Record<string,string>)[lang]}</p><Image src={`/images/news/${roundtable.slug}/group.jpg`} width={1280} height={1774} alt="Milano roundtable group photo" className="w-full h-auto max-h-[750px] object-contain"/><Link className="underline" href={`/${lang}/news/`}>{localized[0]}</Link></div></section></article>;
  const structuredData = { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: c.title, description: c.summary, datePublished: roundtable.published, inLanguage: zh ? 'zh-CN' : 'it', author: { '@type': 'Organization', name: 'CIAOMIND' }, publisher: { '@type': 'Organization', name: company.name }, mainEntityOfPage: `${company.website}/${lang}/news/${roundtable.slug}/`, image: roundtableImages.map(image => `${company.website}/images/news/${roundtable.slug}/${image.file}`) };
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <header className="section bg-primary-navy text-white"><div className="container-modern max-w-4xl">
      <Link className="underline text-sm" href={`/${lang}/news/`}>{zh ? '← 公司动态' : '← Notizie'}</Link>
      <p className="mt-8 text-sm tracking-widest">MILANO · ITALIA–CINA</p>
      <h1 className="text-3xl md:text-5xl leading-tight my-6 text-white">{c.title}</h1>
      <p className="text-lg leading-relaxed">{c.summary}</p>
      <p className="mt-8 text-sm">{zh ? '发布于 ' : 'Pubblicato il '}<time dateTime={roundtable.published}>20.10.2026</time>{zh ? ' · 活动日期：' : ' · Data dell’incontro: '}<time dateTime={roundtable.eventDate}>17.10.2026</time></p>
    </div></header>
    <div className="section"><div className="container-modern max-w-4xl">
      <p className="text-sm mb-8">Club House · Via Esopo 8, Milano · 10:30–13:00</p>
      <div className="space-y-6 text-lg leading-loose"><p>{c.intro}</p><p>{c.context}</p></div>
      <figure className="my-12"><Image className="w-full h-auto max-h-[850px] object-contain bg-stone-100" src={`/images/news/${roundtable.slug}/group.jpg`} width={1280} height={1774} alt={c.captions[0]} priority /><figcaption className="mt-3 text-sm text-gray-600">{c.captions[0]} · Milano, 17.10.2026</figcaption></figure>
      {c.sections.map(([title, body]) => <section key={title} className="my-10"><h2 className="text-2xl mb-4">{title}</h2><p className="text-lg leading-loose">{body}</p></section>)}
      <p className="text-lg leading-loose border-l-2 border-primary-navy pl-6 my-12">{c.closing}</p>
      <h2 className="text-2xl mb-6">{zh ? '现场影像' : 'Immagini dell’incontro'}</h2>
      <div className="grid gap-8 md:grid-cols-3">{roundtableImages.slice(1).map((image, i) => <figure key={image.file}><a href={`/images/news/${roundtable.slug}/${image.file}`}><Image className="w-full h-auto" src={`/images/news/${roundtable.slug}/${image.file}`} width={image.width} height={image.height} alt={c.captions[i + 1]} /></a><figcaption className="mt-3 text-sm text-gray-600">{c.captions[i + 1]}</figcaption></figure>)}</div>
      <p className="text-sm leading-relaxed text-gray-600 border-t mt-12 pt-6">{c.note}</p>
      <Link className="inline-block underline mt-8" href={`/${zh ? 'it' : 'zh'}/news/${roundtable.slug}/`}>{zh ? 'Leggi in italiano →' : '阅读中文版 →'}</Link>
    </div></div>
  </article>;
}
