import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { company } from '@/data/company';
export default function Footer() {
  const locale = useLocale(); const t = useTranslations();
  const paths = ['about', 'services', 'team', 'contact'] as const;
  return <footer className="site-footer">
    <div className="container-modern py-12 grid gap-10 md:grid-cols-2">
      <div><Link href={`/${locale}/`} className="text-2xl font-bold">CIAOMIND</Link>
        <p className="mt-4 max-w-lg text-white/80">{t('footer.description')}</p>
        <address className="not-italic mt-5 text-white/80 space-y-2"><p>{company.name}</p><p>{t('contact.address')}: {company.address}</p>
          <p>P. IVA {company.vat} · REA {company.rea}</p><p><a href={`mailto:${company.email}`}>{company.email}</a></p><p>PEC: <a href={`mailto:${company.pec}`}>{company.pec}</a></p>
        </address>
      </div>
      <nav aria-label={t('footer.quick_links')} className="flex flex-wrap content-start gap-x-8 gap-y-4">
        {paths.map(path => <Link key={path} href={`/${locale}/${path}/`}>{t(`common.${path}`)}</Link>)}
        <Link href={`/${locale}/privacy/`}>{t('legal.privacyTitle')}</Link><Link href={`/${locale}/terms/`}>{t('legal.termsTitle')}</Link>
      </nav>
    </div><div className="container-modern border-t border-white/20 py-6 text-sm text-white/75">© {company.year} {company.name}. {t('footer.rights')}</div>
  </footer>;
}
