'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { readCampaign } from '@/lib/campaign';
import { locales, type Locale } from '@/lib/i18n';
import styles from './Header.module.css';

const languageNames: Record<Locale, string> = {
  zh: '中文', it: 'Italiano', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español',
};

const copy: Record<Locale, {
  pilot: string; business: string; global: string; apply: string; menu: string; toggle: string; language: string;
}> = {
  zh: { pilot: '文化 IP 试点', business: '企业服务', global: '跨境与信托', apply: '申请试点', menu: '主导航', toggle: '切换导航菜单', language: '选择语言' },
  it: { pilot: 'Pilota culturale', business: 'Servizi alle imprese', global: 'Internazionale e trust', apply: 'Candidati', menu: 'Navigazione principale', toggle: 'Apri o chiudi il menu', language: 'Scegli lingua' },
  en: { pilot: 'Cultural IP pilot', business: 'Business services', global: 'Cross-border and trusts', apply: 'Apply for the pilot', menu: 'Main navigation', toggle: 'Toggle navigation menu', language: 'Choose language' },
  fr: { pilot: 'Pilote patrimoine', business: 'Services aux entreprises', global: 'International et trusts', apply: 'Candidater', menu: 'Navigation principale', toggle: 'Ouvrir ou fermer le menu', language: 'Choisir la langue' },
  de: { pilot: 'Kulturerbe-Pilot', business: 'Unternehmensleistungen', global: 'International und Trusts', apply: 'Für den Pilot bewerben', menu: 'Hauptnavigation', toggle: 'Menü ein- oder ausblenden', language: 'Sprache wählen' },
  es: { pilot: 'Piloto de patrimonio', business: 'Servicios para empresas', global: 'Internacional y fideicomisos', apply: 'Solicitar el piloto', menu: 'Navegación principal', toggle: 'Abrir o cerrar el menú', language: 'Elegir idioma' },
};

const companyOnlyPaths = new Set(['about', 'services', 'team', 'news', 'contact', 'terms', 'portal']);

export default function Header() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [campaign, setCampaign] = useState<Record<string, string>>({});

  useEffect(() => {
    setCampaign(readCampaign(new URLSearchParams(window.location.search)));
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        document.getElementById('navigation-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  function switchLanguage(nextLocale: Locale) {
    const url = new URL(window.location.href);
    const currentPath = url.pathname.replace(/^\/(zh|it|en|fr|de|es)(?=\/|$)/, '').replace(/^\//, '');
    const translated = !companyOnlyPaths.has(currentPath.split('/')[0]) || nextLocale === 'zh' || nextLocale === 'it';
    url.pathname = translated ? `/${nextLocale}/${currentPath}` : `/${nextLocale}/`;
    if (!translated) url.hash = '';
    window.location.assign(url.toString());
  }

  const navigation = (mobile: boolean) => (
    <>
      {([
        ['pilot', t.pilot], ['business', t.business], ['global', t.global],
      ] as const).map(([route, label]) => {
        const target = `/${locale}/${route}/`;
        return <Link key={route} href={{ pathname: target, query: campaign }} onClick={() => setOpen(false)}
          aria-current={pathname === target || pathname === target.slice(0, -1) ? 'page' : undefined}
          className={styles.navLink}>{label}</Link>;
      })}
      <Link href={{ pathname: `/${locale}/pilot/`, hash: 'pilot-services', query: campaign }}
        onClick={() => setOpen(false)} className={styles.apply}>{t.apply}</Link>
      <label className="sr-only" htmlFor={mobile ? 'mobile-language' : 'desktop-language'}>{t.language}</label>
      <select id={mobile ? 'mobile-language' : 'desktop-language'} value={locale}
        onChange={event => switchLanguage(event.target.value as Locale)} className={styles.language}>
        {locales.map(code => <option key={code} value={code}>{languageNames[code]}</option>)}
      </select>
    </>
  );

  return <header className="site-header fixed top-0 left-0 right-0 z-50">
    <nav className={`container-modern ${styles.nav}`} aria-label={t.menu}>
      <div className={styles.top}>
        <Link href={{ pathname: `/${locale}/`, query: campaign }} onClick={() => setOpen(false)} className="brand-mark">CIAOMIND</Link>
        <div className={styles.desktop}>{navigation(false)}</div>
        <button type="button" id="navigation-toggle" className={styles.toggle}
          aria-expanded={open} aria-controls="mobile-navigation" aria-label={t.toggle}
          onClick={() => setOpen(value => !value)}>{open ? <X aria-hidden /> : <Menu aria-hidden />}</button>
      </div>
      <div id="mobile-navigation" className={styles.mobile} hidden={!open}>{navigation(true)}</div>
    </nav>
  </header>;
}
