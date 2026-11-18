import { innerPageLocales } from '@/data/inner-page-locales';
import { getTranslations } from 'next-intl/server';
import { company } from '@/data/company';
export default async function LegalPage({params: paramsPromise}:{params:Promise<{lang:string}>}) {
  const {lang} = await paramsPromise;
 const t = await getTranslations('legal'); const c = innerPageLocales[lang as keyof typeof innerPageLocales]?.legal;
  if(c) return <section className="section bg-white"><div className="container-modern max-w-3xl"><h1 className="text-3xl mb-8">{c[2]}</h1><p className="leading-relaxed mb-8">{c[3]}</p><p>{company.name} · P. IVA {company.vat}</p><a className="underline" href={`mailto:${company.email}`}>{company.email}</a></div></section>;
 return <section className="section bg-white"><div className="container-modern max-w-3xl"><h1 className="text-3xl mb-8">{t('termsTitle')}</h1><p className="leading-relaxed mb-8">{t('termsText')}</p><p>{company.name} · P. IVA {company.vat}</p><a className="underline" href={`mailto:${company.email}`}>{company.email}</a></div></section>; }
