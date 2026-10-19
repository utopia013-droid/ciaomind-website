import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
export default function LegalPage() { const t = useTranslations('legal'); return <section className="section bg-white"><div className="container-modern max-w-3xl"><h1 className="text-3xl mb-8">{t('privacyTitle')}</h1><p className="leading-relaxed mb-8">{t('privacyText')}</p><p>{company.name} · P. IVA {company.vat}</p><p>{company.address}</p><a className="underline" href={`mailto:${company.email}`}>{company.email}</a></div></section>; }
