import Link from 'next/link';
import type { Metadata } from 'next';
import { accountClient, accountLocale } from '@/lib/account';
import { submitBusinessRequest } from './actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Business cooperation | CIAOMIND' };
const copy = {
  zh: { title: '提交企业或合作方需求', intro: '告诉我们你的业务目标、合作能力和所需支持，团队将在人工审核后决定是否进一步对接。', company: '企业 / 机构名称', email: '业务联系邮箱', type: '需求类型', buyer: '企业需求', partner: '合作方入驻意向', brief: '需求或能力简述（20–2400 字符）', notice: '仅收集机构名称、联系邮箱、需求类型、简述与提交语言，用于评估和回复本次合作意向。请勿提交身份证件、健康信息、银行资料或未获授权的文件。邮箱尚未经验证，信息需人工核实；提交不代表受理、签约或付款。', consent: '我同意按隐私说明处理上述信息，用于本次需求评估和联系。', privacy: '阅读隐私说明', submit: '提交人工审核', unavailable: '在线提交暂未开放，需求尚未提交。请通过官网联系团队。', received: '需求已记录，等待人工审核。这不是受理确认；不会自动发送邮件、签约或付款。', invalid: '提交失败，请核对字段长度、邮箱与同意选项。', login: '团队工作台', open: '公开入口仅接收意向，具体服务与费用须另行人工确认。' },
  it: { title: 'Invia una richiesta aziendale o di collaborazione', intro: 'Descrivi obiettivi, competenze e supporto richiesto. Il team valuterà manualmente l’eventuale seguito.', company: 'Azienda / organizzazione', email: 'Email di lavoro', type: 'Tipo di richiesta', buyer: 'Richiesta aziendale', partner: 'Candidatura partner', brief: 'Esigenze o competenze (20–2400 caratteri)', notice: 'Raccogliamo solo organizzazione, email, tipo, descrizione e lingua per valutare e rispondere a questa richiesta. Non inserire documenti d’identità, dati sanitari, bancari o documenti senza autorizzazione. Email e contenuti non sono verificati; l’invio non costituisce accettazione, contratto o pagamento.', consent: 'Acconsento al trattamento dei dati indicati per valutare la richiesta e ricontattarmi, secondo l’informativa privacy.', privacy: 'Informativa privacy', submit: 'Invia a verifica umana', unavailable: 'L’invio online non è ancora disponibile. La richiesta non è stata inviata. Contatta il team dal sito.', received: 'Richiesta registrata per verifica umana. Non è una conferma di accettazione; nessuna email, contratto o pagamento automatico.', invalid: 'Invio non riuscito. Controlla lunghezze, email e consenso.', login: 'Area team', open: 'Questo modulo raccoglie manifestazioni d’interesse. Servizi e costi richiedono conferma separata.' },
  en: { title: 'Submit a business or partnership request', intro: 'Describe your goals, capabilities and required support. Our team will manually assess the next step.', company: 'Company / organisation', email: 'Business contact email', type: 'Request type', buyer: 'Business request', partner: 'Partner application', brief: 'Needs or capabilities (20–2400 characters)', notice: 'We collect only your organisation, contact email, request type, brief and language to assess and respond to this enquiry. Do not provide identity documents, health or banking information, or unauthorised documents. Email and claims are unverified. Submission does not constitute acceptance, a contract or payment.', consent: 'I consent to processing these details to assess and respond to this enquiry, under the privacy notice.', privacy: 'Read privacy notice', submit: 'Submit for human review', unavailable: 'Online submission is not yet available. Your request has not been submitted. Contact the team through the website.', received: 'Request recorded for human review. This is not acceptance; no email, contract or payment is automated.', invalid: 'Submission failed. Check field lengths, email and consent.', login: 'Team workspace', open: 'This form records expressions of interest. Services and fees require separate human confirmation.' },
};
export default async function BusinessRequest({ params: paramsPromise, searchParams: searchParamsPromise }: { params: Promise<{ lang: string }>; searchParams: Promise<{ status?: string }> }) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;

  const lang = accountLocale(params.lang);
  const c = copy[lang === 'zh' || lang === 'it' ? lang : 'en'];
  const client = await accountClient(false);
  const readiness = client ? await client.rpc('bos_intake_available') : null;
  const ready = readiness?.data === true && !readiness.error;
  const field = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-3';
  return <section className="mx-auto max-w-2xl px-4 py-12 sm:px-8"><p className="mb-3 text-sm font-semibold text-emerald-800">CIAOMIND</p><h1 className="text-3xl font-semibold">{c.title}</h1><p className="mt-4 text-slate-600">{c.intro}</p>
    {searchParams.status === 'received' && <p role="status" className="mt-6 rounded-xl bg-emerald-50 p-5 text-emerald-950">{c.received}</p>}
    {(!ready || searchParams.status === 'unavailable') && <p role="alert" className="mt-6 rounded-xl bg-amber-50 p-5 text-amber-950">{c.unavailable} <Link className="underline" href={`/${lang}/contact/`}>{lang === 'zh' ? '联系团队' : lang === 'it' ? 'Contatta il team' : 'Contact the team'}</Link></p>}
    {searchParams.status === 'invalid' && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-5 text-red-900">{c.invalid}</p>}
    <p className="mt-6 rounded-xl bg-slate-50 p-5 text-sm leading-relaxed">{c.notice} <Link className="underline" href={`/${lang}/privacy/`}>{c.privacy}</Link></p>
    <form action={submitBusinessRequest.bind(null, lang)} className="mt-7 grid gap-5"><fieldset disabled={!ready} className="grid gap-5 disabled:opacity-50">
      <label className="grid gap-2 text-sm font-medium">{c.company}<input name="company" className={field} maxLength={160} autoComplete="organization" required /></label>
      <label className="grid gap-2 text-sm font-medium">{c.email}<input name="email" type="email" className={field} maxLength={254} autoComplete="email" required /></label>
      <label className="grid gap-2 text-sm font-medium">{c.type}<select name="kind" className={field}><option value="buyer">{c.buyer}</option><option value="partner">{c.partner}</option></select></label>
      <label className="grid gap-2 text-sm font-medium">{c.brief}<textarea name="brief" className={field} rows={6} minLength={20} maxLength={2400} required /></label>
      <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="flex items-start gap-3 text-sm"><input type="checkbox" name="consent" className="mt-1" required /><span>{c.consent}</span></label>
      <button className="rounded-lg bg-[#173d35] px-5 py-3 font-semibold text-white disabled:opacity-50" disabled={!ready}>{c.submit}</button>
    </fieldset></form><p className="mt-5 text-xs text-slate-500">{c.open}</p><Link href={`/${lang}/business-os/`} className="mt-8 inline-block text-sm underline">{c.login}</Link>
  </section>;
}
