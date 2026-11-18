import {newsTranslations} from '@/data/news-translations';
import { innerPageLocales } from '@/data/inner-page-locales';
import Link from 'next/link';
import { roundtable } from '@/data/milan-roundtable';
export default async function NewsPage({ params: paramsPromise }: { params: Promise<{ lang: string }> }) {
  const { lang } = await paramsPromise;

 const zh = lang === 'zh';
 const c = lang in newsTranslations ? newsTranslations[lang as keyof typeof newsTranslations] : roundtable[zh ? 'zh' : 'it'];
const localized = innerPageLocales[lang as keyof typeof innerPageLocales]?.news;
 if(localized) return <><section className="section bg-primary-navy text-white"><div className="container-modern"><h1 className="text-4xl text-white">{localized[0]}</h1></div></section><section className="section bg-white"><div className="container-modern max-w-3xl space-y-8"><article className="card"><time dateTime={roundtable.published}>20.10.2026</time><h2 className="text-2xl my-4"><Link href={`/${lang}/news/${roundtable.slug}/`}>{c.title}</Link></h2><p>{c.summary}</p><Link className="underline mt-5 inline-block" href={`/${lang}/news/${roundtable.slug}/`}>{localized[1]}</Link></article><article className="card"><time dateTime="2025-12-18">18.12.2025</time><h2 className="text-2xl my-4">{localized[2]}</h2><p>{localized[3]}</p></article></div></section></>;
 return <><section className="section bg-primary-navy text-white"><div className="container-modern"><h1 className="text-4xl text-white">{zh ? '公司动态' : 'Notizie della società'}</h1></div></section>
 <section className="section"><div className="container-modern max-w-3xl space-y-8"><article className="card"><time dateTime={roundtable.published}>20.10.2026</time><h2 className="text-2xl my-4"><Link href={`/${lang}/news/${roundtable.slug}/`}>{c.title}</Link></h2><p>{c.summary}</p><Link className="inline-block underline mt-6" href={`/${lang}/news/${roundtable.slug}/`}>{zh ? '阅读活动回顾' : 'Leggi il resoconto'} →</Link></article><article className="card"><time dateTime="2025-12-18">18.12.2025</time><h2 className="text-2xl my-4">{zh ? 'CIAOMIND完成公司登记' : 'Iscrizione di CIAOMIND al Registro delle Imprese'}</h2><p>{zh ? 'CIAOMIND S.B. S.R.L.于2025年12月18日在Como-Lecco商会完成登记，关注文化遗产数字化、教育与中意文化合作。' : 'CIAOMIND S.B. S.R.L. è stata iscritta il 18 dicembre 2025 presso la Camera di Commercio Como-Lecco. I suoi ambiti riguardano il patrimonio culturale digitale, l’educazione e la cooperazione tra Italia e Cina.'}</p><Link className="inline-block underline mt-6" href={`/${lang}/about/`}>{zh ? '了解公司' : 'Scopri la società'}</Link></article></div></section></>;
}
