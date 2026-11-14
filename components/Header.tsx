'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { businessGroups, businessServices } from '@/data/business-catalog';

import { locales, type Locale } from '@/lib/i18n';
const languageNames: Record<Locale, string> = {
  zh: '中文', it: 'Italiano', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español',
};
const copy: Record<Locale, { guides: string; pricing: string; order: string; menu: string; companyServices: string }> = {
  zh: { guides: '办理指南', pricing: '报价', order: '开始下单', menu: '主导航', companyServices: '公司服务' },
  it: { guides: 'Guide', pricing: 'Prezzi', order: 'Inizia una richiesta', menu: 'Navigazione principale', companyServices: 'Servizi aziendali' },
  en: { guides: 'Guides', pricing: 'Pricing', order: 'Start an order', menu: 'Main navigation', companyServices: 'Company services' },
  fr: { guides: 'Guides', pricing: 'Tarifs', order: 'Commencer une demande', menu: 'Navigation principale', companyServices: 'Services de l’entreprise' },
  de: { guides: 'Leitfäden', pricing: 'Preise', order: 'Anfrage starten', menu: 'Hauptnavigation', companyServices: 'Unternehmensleistungen' },
  es: { guides: 'Guías', pricing: 'Precios', order: 'Iniciar solicitud', menu: 'Navegación principal', companyServices: 'Servicios de la empresa' },
};

const globalLabel: Record<Locale, string> = {
  zh: '跨境与信托', it: 'Internazionale e trust', en: 'Global and trusts',
  fr: 'International et trusts', de: 'International und Trusts', es: 'Internacional y fideicomisos',
};

const companyOnlyPaths = new Set(['about', 'services', 'team', 'news', 'contact', 'pilot', 'terms', 'portal']);

export default function Header() {
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const text = copy[locale] ?? copy.it;

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const sectionHref = (section: string) => `/${locale}/#${section}`;
  const orderHref = (service?: string) => `/${locale}/order/${service ? `?service=${encodeURIComponent(service)}` : ''}`;
  const label = (labels: Record<string, string>) => labels[locale] ?? labels.it ?? '';

  function switchLanguage(nextLocale: Locale) {
    const url = new URL(window.location.href);
    const match = url.pathname.match(/^\/(zh|it|en|fr|de|es)(?=\/|$)/);
    const currentPath = match ? url.pathname.slice(match[0].length).replace(/^\//, '') : '';
    const targetLocale = locales.includes(nextLocale) ? nextLocale : 'it';
    const translated = !companyOnlyPaths.has(currentPath.split('/')[0]) || targetLocale === 'zh' || targetLocale === 'it';
    url.pathname = translated ? `/${targetLocale}/${currentPath}` : `/${targetLocale}/`;
    window.location.assign(url.toString());
  }

  const groups = businessGroups.map(group => ({
    ...group,
    services: businessServices.filter(service => service.group === group.id),
  }));

  const navigation = (mobile: boolean) => (
    <>
      <div className={mobile ? 'space-y-2' : 'flex items-center gap-1'}>
        {groups.map(group => (
          <div key={group.id} className={mobile ? 'relative flex items-center rounded-lg border border-white/15 px-2' : 'group relative flex items-center'}>
            <Link href={sectionHref(group.id)} onClick={() => mobile && setOpen(false)} className={mobile ? 'flex-1 rounded-lg px-2 py-3 font-medium hover:bg-white/10' : 'rounded-lg px-2 py-2 hover:bg-white/10'}>{label(group.title)}</Link>
            <details className={mobile ? '' : 'relative'}>
            <summary aria-label={`${label(group.title)}: ${text.companyServices}`} className={mobile ? 'cursor-pointer list-none rounded-lg px-3 py-3 hover:bg-white/10' : 'cursor-pointer list-none rounded-lg px-2 py-2 hover:bg-white/10'}>
              <span aria-hidden="true" className="text-xs">⌄</span>
            </summary>
            <div className={mobile ? 'absolute left-0 right-0 top-full z-50 mt-1 max-h-[60dvh] overflow-y-auto rounded-lg border border-white/15 bg-slate-950 p-2 shadow-2xl' : 'absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-white/15 bg-slate-950 p-3 shadow-2xl'}>
              <Link href={sectionHref(group.id)} onClick={() => mobile && setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10">
                {label(group.title)} →
              </Link>
              {group.services.map(service => (
                <Link key={service.id} href={orderHref(service.id)} onClick={() => mobile && setOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">
                  <span className="block font-medium">{label(service.name)}</span>
                  <span className="mt-1 block text-sm text-white/65">{label(service.summary)}</span>
                </Link>
              ))}
            </div>
            </details>
          </div>
        ))}
        <Link href={`/${locale}/global/`} onClick={() => mobile && setOpen(false)} className={mobile ? 'block rounded-lg px-4 py-3 hover:bg-white/10' : 'rounded-lg px-2 py-2 hover:bg-white/10'}>{globalLabel[locale]}</Link>
        <Link href={sectionHref('guides')} onClick={() => mobile && setOpen(false)} className={mobile ? 'block rounded-lg px-4 py-3 hover:bg-white/10' : 'rounded-lg px-3 py-2 hover:bg-white/10'}>{text.guides}</Link>
        <Link href={sectionHref('pricing')} onClick={() => mobile && setOpen(false)} className={mobile ? 'block rounded-lg px-4 py-3 hover:bg-white/10' : 'rounded-lg px-3 py-2 hover:bg-white/10'}>{text.pricing}</Link>
        <Link href={orderHref()} onClick={() => mobile && setOpen(false)} className={mobile ? 'block rounded-lg bg-primary-navy px-4 py-3 text-center font-semibold text-white' : 'ml-2 rounded-lg bg-primary-navy px-4 py-2 font-semibold text-white hover:bg-slate-800'}>{text.order}</Link>
      </div>
      <div className={mobile ? 'mt-3 border-t border-white/20 pt-3' : 'ml-3 border-l border-white/20 pl-3'}>
        <label className="sr-only" htmlFor={mobile ? 'mobile-language' : 'desktop-language'}>{locale === 'zh' ? '选择语言' : 'Select language'}</label>
        <select id={mobile ? 'mobile-language' : 'desktop-language'} value={locale} onChange={event => switchLanguage(event.target.value as Locale)} className="rounded-md border border-white/25 bg-transparent px-2 py-2 text-sm text-current">
          {locales.map(code => <option key={code} value={code} className="bg-white text-primary-navy">{languageNames[code]}</option>)}
        </select>
      </div>
    </>
  );

  return <header className="site-header fixed top-0 left-0 right-0 z-50">
    <nav className="container-modern" aria-label={text.menu}>
      <div className="flex min-h-20 items-center justify-between gap-4">
        <Link href={`/${locale}/`} className="brand-mark">CIAOMIND</Link>
        <div className="hidden 2xl:flex items-center">{navigation(false)}</div>
        <button type="button" className="2xl:hidden rounded-lg p-3" aria-expanded={open} aria-controls="mobile-navigation" aria-label={locale === 'zh' ? '打开或关闭导航菜单' : 'Open or close navigation menu'} onClick={() => setOpen(value => !value)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      {open ? <div id="mobile-navigation" className="2xl:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/20 pb-4 pt-3">{navigation(true)}</div> : null}
    </nav>
  </header>;
}
