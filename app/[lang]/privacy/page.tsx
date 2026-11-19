import { innerPageLocales } from '@/data/inner-page-locales';
import { getTranslations } from 'next-intl/server';
import { company } from '@/data/company';
import BusinessPrivacy from '@/components/BusinessPrivacy';
export default async function LegalPage({params: paramsPromise}:{params:Promise<{lang:string}>}) {
  const {lang} = await paramsPromise;
 const t = await getTranslations('legal'); const c = innerPageLocales[lang as keyof typeof innerPageLocales]?.legal;
  if(c) return <section className="section bg-white"><div className="container-modern max-w-3xl"><h1 className="text-3xl mb-8">{c[0]}</h1><p className="leading-relaxed mb-8">{c[1]}</p><p>{company.name} · P. IVA {company.vat}</p><a className="underline" href={`mailto:${company.email}`}>{company.email}</a><BusinessPrivacy lang={lang}/></div></section>;
 return <section className="section bg-white"><div className="container-modern max-w-3xl"><h1 className="text-3xl mb-8">{t('privacyTitle')}</h1><p className="leading-relaxed mb-8">{t('privacyText')}</p><p>{company.name} · P. IVA {company.vat}</p><a className="underline" href={`mailto:${company.email}`}>{company.email}</a><BusinessPrivacy lang={lang}/></div></section>; }
