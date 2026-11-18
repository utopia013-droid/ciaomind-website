import Link from 'next/link';
import type { Metadata } from 'next';

const copy = {
  zh: {
    eyebrow: 'CIAOMIND · 产品愿景 / 2026.11',
    title: '让下一步，真正发生。',
    subtitle: '以智能协作连接真实世界的机构、专业人士与产业资源，帮助个人和企业从当前状态走向下一阶段。',
    status: '产品方向与服务网络建设中 · 以下为规划方案，并非已上线的自动办理服务',
    sections: [
      ['个人与家庭','从迁居准备、住房、学校、医疗与日常事务，到职业发展、照护、语言沟通和长期本地融入。我们探索如何让复杂事务变成清晰、可跟进的下一步。'],
      ['创业与企业发展','从创意验证、公司设立、合规、融资准备，到进入新市场、渠道对接、产业升级、并购研究和投后协同，按具体情况组合专业服务。'],
      ['区域产业与文化','连接区域品牌、供应链、知识产权与文化遗产持有方，探索数字化、授权合作、跨区域市场连接和可持续保护模式。']
    ],
    howTitle: '一个入口，连接多种能力',
    how: ['理解目标与已有条件','核实适用规则与可用资源','拆解任务并明确授权','连接具备能力的真实服务节点','跟踪进度、异常与可核验结果'],
    principleTitle: '我们的原则',
    principle: '尊重每个人的选择，不把全球化当作唯一答案；优先利用已有平台与专业服务商。API 接入、机构授权、代客办理与数据处理权限均需逐项核验。个人资料仅按具体目的和适用规则处理，不自动用于模型训练。',
    futureTitle: '正在研究的能力',
    future: '多语言沟通与实时翻译、无障碍交互、任务持续执行、区域政策与产业要素知识网络、服务商协同，以及在业务量得到验证后的战略合作或选择性并购。',
    cta: '讨论你的下一步', note: '本页是 CIAOMIND 的方向说明，不构成融资、法律、税务、医疗或政府审批承诺。'
  },
  it: {
    eyebrow: 'CIAOMIND · Visione del prodotto / 11.2026',
    title: 'Dare forma al prossimo passo.',
    subtitle: 'Intelligenza artificiale e relazioni con organizzazioni, professionisti e risorse reali per accompagnare persone e imprese verso nuovi obiettivi.',
    status: 'Progetto in fase di sviluppo · Le funzionalità descritte sono una visione, non servizi automatizzati già attivi',
    sections: [
      ['Persone e famiglie','Dalla preparazione di un trasferimento alla casa, scuola, sanità, pratiche quotidiane, lavoro, cura dei familiari, comunicazione multilingue e integrazione nel territorio.'],
      ['Imprenditorialità e imprese','Dalla validazione di un’idea alla costituzione, conformità, preparazione al finanziamento, ingresso in nuovi mercati, canali commerciali, trasformazione e analisi di acquisizioni.'],
      ['Territori, industria e cultura','Collegare marchi territoriali, filiere, titolari di proprietà intellettuale e patrimonio culturale attraverso digitalizzazione, collaborazioni, accesso ai mercati e modelli sostenibili.']
    ],
    howTitle: 'Un punto di accesso, diverse competenze',
    how: ['Comprendere obiettivi e condizioni','Verificare regole e risorse applicabili','Definire attività e autorizzazioni','Coinvolgere operatori realmente qualificati','Seguire progressi, criticità e risultati verificabili'],
    principleTitle: 'I nostri principi',
    principle: 'Rispettiamo le scelte delle persone: l’espansione globale non è sempre la risposta. Preferiamo collaborare con piattaforme e professionisti esistenti. Accessi API, autorizzazioni, rappresentanza e trattamento dei dati richiedono verifiche specifiche. I dati personali non vengono automaticamente utilizzati per addestrare modelli.',
    futureTitle: 'Capacità in esplorazione',
    future: 'Comunicazione multilingue e traduzione in tempo reale, accessibilità, coordinamento continuativo delle pratiche, conoscenza dinamica di politiche e risorse territoriali, collaborazione con operatori e possibili acquisizioni selettive.',
    cta: 'Parliamo del tuo progetto', note: 'Questa pagina illustra una visione progettuale; non garantisce finanziamenti, consulenze regolamentate, prestazioni sanitarie o approvazioni amministrative.'
  }
};
export async function generateMetadata({params: paramsPromise}:{params:Promise<{lang:string}>}): Promise<Metadata> {
  const {lang} = await paramsPromise;

  const it=lang==='it';return {title:it?'La nostra visione | CIAOMIND':'智能协同平台愿景 | CIAOMIND',description:it?copy.it.subtitle:copy.zh.subtitle};
}
export default async function VisionPage({params: paramsPromise}:{params:Promise<{lang:string}>}){
  const {lang} = await paramsPromise;

  const c=lang==='it'?copy.it:copy.zh;
  return <div className="bg-[#F8F9FA] text-[#0F234B]">
    <section className="bg-[#0F234B] text-white px-6 py-20 md:py-28"><div className="max-w-5xl mx-auto">
      <p className="text-xs tracking-[0.24em] uppercase text-[#F1B6AE] mb-7">{c.eyebrow}</p>
      <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">{c.title}</h1>
      <p className="text-lg md:text-2xl text-slate-200 mt-8 max-w-3xl leading-relaxed">{c.subtitle}</p>
      <p className="mt-10 border-l-2 border-[#DA4644] pl-4 text-sm text-slate-300 max-w-3xl">{c.status}</p>
    </div></section>
    <section className="max-w-5xl mx-auto px-6 py-16"><div className="grid md:grid-cols-3 gap-5">{c.sections.map(([name,description],i)=><article key={name} className="bg-white rounded-2xl p-7 border border-slate-200"><p className="text-[#DA4644] text-xs tracking-widest mb-5">0{i+1}</p><h2 className="text-xl font-semibold mb-4">{name}</h2><p className="text-slate-600 leading-7">{description}</p></article>)}</div></section>
    <section className="bg-white px-6 py-16"><div className="max-w-5xl mx-auto"><h2 className="text-3xl font-semibold mb-10">{c.howTitle}</h2><div className="grid md:grid-cols-5 gap-4">{c.how.map((s,i)=><div key={s} className="border-t-2 border-[#DA4644] pt-4"><p className="text-sm text-[#DA4644] mb-3">0{i+1}</p><p className="leading-7">{s}</p></div>)}</div></div></section>
    <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12"><div><h2 className="text-2xl font-semibold mb-5">{c.principleTitle}</h2><p className="text-slate-600 leading-8">{c.principle}</p></div><div><h2 className="text-2xl font-semibold mb-5">{c.futureTitle}</h2><p className="text-slate-600 leading-8">{c.future}</p></div></section>
    <section className="bg-[#0F234B] px-6 py-14 text-center"><Link href={`/${lang}/contact/`} className="inline-block bg-white text-[#0F234B] rounded-full px-8 py-4 font-semibold">{c.cta}</Link><p className="text-slate-300 text-xs max-w-3xl mx-auto mt-7 leading-6">{c.note}</p></section>
  </div>;
}
