import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check, ClipboardList, ScanSearch, Layers3 } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { company } from '@/data/company';

type Props = { params: { lang: string }; searchParams: Record<string, string | string[] | undefined> };
const text = {
  zh: {
    title: '进入中意市场，先验证一个项目',
    intro: '把一个市场问题变成明确的交付：验证需求、比较供应商，或梳理文化品牌试点。',
    action: '选择试点', process: '合作流程', demoTitle: '看看项目如何推进', demoBody: '用虚构信息体验从需求到报价、项目进度和账单的完整流程。',
    demo: '打开项目与账单演示', services: '从一个目标开始', quote: '确认范围后书面报价', select: '选择服务',
    steps: ['选择试点', '确认范围与报价', '执行与交付'], form: '告诉我们你要验证什么',
    defaultBrief: '目标市场：\n产品或项目：\n希望验证的问题：\n计划时间：',
    choose: '未选择具体服务', selected: '意向服务', condition: '此页用于咨询。范围、费用和交付日期以双方确认的书面报价为准。',
    offerings: [
      ['市场验证', '围绕一个产品和目标市场，核查公开价格、渠道和可验证线索。', '证据表与下一步建议'],
      ['供应商初筛', '按照统一口径梳理候选供应商、最低起订量和样品条件。', '候选名单与询价对比表'],
      ['文化品牌试点', '从一个文化主题出发，梳理材料来源、权利待核事项和产品方向。', '来源清单与试点范围'],
    ],
  },
  it: {
    title: 'Italia e Cina: parti da un progetto pilota',
    intro: 'Trasforma una domanda concreta in un risultato verificabile: mercato, fornitori o un progetto per il tuo brand culturale.',
    action: 'Scegli il progetto', process: 'Come funziona', demoTitle: 'Scopri come si segue un progetto', demoBody: 'Una dimostrazione con dati fittizi: dalla richiesta al preventivo, alla consegna e al riepilogo dei pagamenti. Interfaccia in cinese.',
    demo: 'Apri la demo del portale', services: 'Inizia da un obiettivo', quote: 'Preventivo scritto dopo la definizione del perimetro', select: 'Seleziona il servizio',
    steps: ['Scegli il progetto', 'Conferma perimetro e preventivo', 'Ricevi il risultato'], form: 'Raccontaci cosa vuoi verificare',
    defaultBrief: 'Mercato obiettivo:\nProdotto o progetto:\nDomanda da verificare:\nTempistiche:',
    choose: 'Servizio da definire', selected: 'Servizio di interesse', condition: 'Questa pagina raccoglie richieste. Perimetro, prezzo e tempi sono definiti nel preventivo concordato.',
    offerings: [
      ['Analisi di mercato', 'Esaminiamo prezzi pubblici, canali e fonti verificabili per un prodotto e un mercato.', 'Tabella delle evidenze e prossimi passi'],
      ['Selezione preliminare dei fornitori', 'Confrontiamo fornitori candidati, quantitativi minimi e condizioni per i campioni.', 'Elenco dei candidati e confronto delle offerte'],
      ['Progetto per brand culturali', 'Partiamo da un tema culturale per mappare fonti, diritti da verificare e ipotesi di prodotto.', 'Registro delle fonti e perimetro del progetto'],
    ],
  },
};
const services = ['market', 'sourcing', 'heritage'];
const icons = [ScanSearch, ClipboardList, Layers3];
const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang === 'it' ? 'it' : 'zh';
  return {
    title: text[lang].title,
    description: text[lang].intro,
    alternates: { canonical: `/${lang}/pilot/`, languages: { 'zh-CN': '/zh/pilot/', it: '/it/pilot/' } },
  };
}

export default function Pilot({ params, searchParams }: Props) {
  const lang = params.lang === 'it' ? 'it' : 'zh';
  const t = text[lang];
  const serviceIndex = typeof searchParams.service === 'string' ? services.indexOf(searchParams.service) : -1;
  const attribution = new URLSearchParams();
  for (const key of utmKeys) {
    const value = searchParams[key];
    if (typeof value === 'string' && /^[A-Za-z0-9_.-]{1,80}$/.test(value)) attribution.set(key, value);
  }
  const campaign = attribution.toString();
  const requestContext = [`${t.selected}: ${t.offerings[serviceIndex]?.[0] ?? t.choose}`, ...Array.from(attribution, ([key, value]) => `${key}: ${value}`)].join('\n');

  return <>
    <section className="bg-primary-navy text-white py-16 md:py-24">
      <div className="container">
        <p className="uppercase tracking-widest text-sm text-white/80 mb-5">CIAOMIND · {lang === 'zh' ? '中意企业试点' : 'Progetti Italia – Cina'}</p>
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight">{t.title}</h1>
        <p className="mt-5 text-xl text-white/90 max-w-2xl">{t.intro}</p>
        <a href="#pilot-services" className="inline-flex items-center gap-2 mt-8 rounded-lg bg-white px-5 py-3 font-bold text-primary-navy">{t.action}<ArrowUpRight size={18} aria-hidden /></a>
      </div>
    </section>
    <section className="section bg-background-light scroll-mt-24" id="pilot-services">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">{t.services}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.offerings.map(([name, summary, deliverable], i) => {
            const Icon = icons[i];
            const query = new URLSearchParams(campaign);
            query.set('service', services[i]);
            return <article key={services[i]} className="card flex flex-col gap-4">
              <Icon className="text-primary-coral" aria-hidden />
              <h3 className="text-xl font-bold">{name}</h3>
              <p>{summary}</p><p className="flex items-start gap-2"><Check size={18} className="shrink-0 mt-1 text-primary-coral" aria-hidden />{deliverable}</p>
              <p className="text-sm text-text-secondary mt-auto">{t.quote}</p>
              <Link className="btn-primary self-start" href={`/${lang}/pilot/?${query}#pilot-request`}>{t.select}<span className="sr-only">: {name}</span></Link>
            </article>;
          })}
        </div>
      </div>
    </section>
    <section className="section bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">{t.process}</h2>
        <ol className="grid md:grid-cols-3 gap-4">
          {t.steps.map((step, i) => <li key={step} className="border rounded-xl p-5"><span className="text-primary-coral font-bold mr-3">0{i + 1}</span>{step}</li>)}
        </ol>
        <aside className="mt-8 rounded-xl bg-background-light p-6">
          <h3 className="text-xl font-bold">{t.demoTitle}</h3><p className="my-2">{t.demoBody}</p>
          <a href="/pilot-demo.html" className="underline font-semibold">{t.demo}</a>
        </aside>
      </div>
    </section>
    <section className="section bg-background-light scroll-mt-24" id="pilot-request">
      <div className="container">
        <div className="max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl font-bold mb-2">{t.form}</h2>
          <p className="mb-3">{t.condition}</p>
          <p className="font-semibold">{t.selected}：{t.offerings[serviceIndex]?.[0] ?? t.choose}</p>
        </div>
        <ContactForm key={requestContext} locale={lang} requestContext={requestContext} defaultMessage={t.defaultBrief} />
        <p className="max-w-2xl mx-auto mt-4 text-sm text-text-secondary">{company.name}</p>
      </div>
    </section>
  </>;
}
