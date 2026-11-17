import { innerPageLocales } from '@/data/inner-page-locales';
import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
export default function LegalPage({params:{lang}}:{params:{lang:string}}) { const t = useTranslations('legal'); const c = innerPageLocales[lang as keyof typeof innerPageLocales]?.legal;
  if(c) return <section className="section bg-white"><div className="container-modern max-w-3xl"><h1 className="text-3xl mb-8">{c[0]}</h1><p className="leading-relaxed mb-8">{c[1]}</p><p>{company.name} · P. IVA {company.vat}</p><a className="underline" href={`mailto:${company.email}`}>{company.email}</a></div></section>;
 return <section className="section bg-white"><div className="container-modern max-w-3xl"><h1 className="text-3xl mb-8">{t('privacyTitle')}</h1><p className="leading-relaxed mb-8">{t('privacyText')}</p><p>{company.name} · P. IVA {company.vat}</p><a className="underline" href={`mailto:${company.email}`}>{company.email}</a></div></section>; }
