import Link from 'next/link';
import { useLocale } from 'next-intl';
import { company } from '@/data/company';

const companyPages = ['about', 'services', 'team', 'news', 'contact', 'pilot'] as const;
import type { Locale } from '@/lib/i18n';

const labels: Record<Locale, { pages: Record<(typeof companyPages)[number], string>; privacy: string; terms: string; address: string; rights: string }> = {
  zh: { pages: { about: '关于我们', services: '公司服务', team: '团队', news: '新闻', contact: '联系', pilot: '文化 IP 试点' }, privacy: '隐私政策', terms: '服务条款', address: '地址', rights: '版权所有。' },
  it: { pages: { about: 'Chi siamo', services: 'Servizi aziendali', team: 'Team', news: 'Notizie', contact: 'Contatti', pilot: 'Pilota patrimonio culturale' }, privacy: 'Privacy', terms: 'Termini di servizio', address: 'Indirizzo', rights: 'Tutti i diritti riservati.' },
  en: { pages: { about: 'About (IT)', services: 'Company services (IT)', team: 'Team (IT)', news: 'News (IT)', contact: 'Contact (IT)', pilot: 'Cultural IP pilot' }, privacy: 'Privacy policy', terms: 'Terms of service', address: 'Address', rights: 'All rights reserved.' },
  fr: { pages: { about: 'À propos (IT)', services: 'Services de l’entreprise (IT)', team: 'Équipe (IT)', news: 'Actualités (IT)', contact: 'Contact (IT)', pilot: 'Pilote patrimoine' }, privacy: 'Confidentialité', terms: 'Conditions de service', address: 'Adresse', rights: 'Tous droits réservés.' },
  de: { pages: { about: 'Über uns (IT)', services: 'Unternehmensleistungen (IT)', team: 'Team (IT)', news: 'Neuigkeiten (IT)', contact: 'Kontakt (IT)', pilot: 'Kulturerbe-Pilot' }, privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', address: 'Adresse', rights: 'Alle Rechte vorbehalten.' },
  es: { pages: { about: 'Acerca de (IT)', services: 'Servicios de la empresa (IT)', team: 'Equipo (IT)', news: 'Noticias (IT)', contact: 'Contacto (IT)', pilot: 'Piloto de patrimonio' }, privacy: 'Privacidad', terms: 'Términos del servicio', address: 'Dirección', rights: 'Todos los derechos reservados.' },
};

const descriptions: Record<Locale, string> = {
  zh: '连接意大利与中国的企业、机构与专业服务。',
  it: 'Mettiamo in relazione imprese, istituzioni e servizi professionali tra Italia e Cina.',
  en: 'Connecting businesses, institutions, and professional services across Italy and China.',
  fr: 'Relier entreprises, institutions et services professionnels entre l’Italie et la Chine.',
  de: 'Wir verbinden Unternehmen, Institutionen und professionelle Dienstleistungen in Italien und China.',
  es: 'Conectamos empresas, instituciones y servicios profesionales entre Italia y China.',
};

export default function Footer() {
  const locale = useLocale() as Locale;
  const copy = labels[locale] ?? labels.it;
  const companyLocale = locale === 'zh' || locale === 'it' ? locale : 'it';

  return <footer className="site-footer">
    <div className="container-modern grid gap-10 py-12 md:grid-cols-2">
      <div>
        <Link href={`/${locale}/`} className="text-2xl font-bold">CIAOMIND</Link>
        <p className="mt-4 max-w-lg text-white/80">{descriptions[locale] ?? descriptions.it}</p>
        <address className="mt-5 space-y-2 text-sm not-italic text-white/80">
          <p>{company.name}</p><p>{copy.address}: {company.address}</p>
          <p>P. IVA {company.vat} · REA {company.rea}</p>
          <p><a href={`mailto:${company.email}`}>{company.email}</a></p>
          <p>PEC: <a href={`mailto:${company.pec}`}>{company.pec}</a></p>
        </address>
      </div>
      <nav aria-label={locale === 'zh' ? '公司信息与法律链接' : 'Company information and legal links'} className="flex flex-wrap content-start gap-x-7 gap-y-4 text-sm text-white/80">
        {companyPages.map(path => <Link key={path} href={`/${path === 'pilot' ? locale : companyLocale}/${path}/`}>{copy.pages[path]}</Link>)}
        <Link href={`/${locale}/privacy/`}>{copy.privacy}</Link>
        <Link href={`/${companyLocale}/terms/`}>{copy.terms}{companyLocale !== locale && ' (IT)'}</Link>
      </nav>
    </div>
    <div className="container-modern border-t border-white/20 py-6 text-sm text-white/75">© {company.year} {company.name}. {copy.rights}</div>
  </footer>;
}
