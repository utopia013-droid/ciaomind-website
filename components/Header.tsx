'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
export default function Header() {
 const t = useTranslations('common'); const locale = useLocale(); const pathname = usePathname();
 const [open, setOpen] = useState(false);
 useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
 const paths = ['home', 'about', 'services', 'news', 'team', 'contact'] as const;
 const href = (key: string) => `/${locale}/${key === 'home' ? '' : `${key}/`}`;
 function switchLanguage() { const url = new URL(window.location.href); url.pathname = url.pathname.replace(/^\/(zh|it)(?=\/|$)/, `/${locale === 'it' ? 'zh' : 'it'}`); window.location.assign(url.toString()); }
 return <header className="site-header fixed top-0 left-0 right-0 z-50">
  <nav className="container-modern" aria-label={locale === 'zh' ? '主导航' : 'Navigazione principale'}>
   <div className="h-20 flex items-center justify-between gap-4">
    <Link href={`/${locale}/`} className="brand-mark">CIAOMIND</Link>
    <div className="hidden lg:flex items-center gap-1">{paths.map(key => <Link key={key} href={href(key)} aria-current={pathname.replace(/\/$/, '') === href(key).replace(/\/$/, '') ? 'page' : undefined} className="rounded-lg px-3 py-2 hover:bg-white/10">{t(key)}</Link>)}<button type="button" onClick={switchLanguage} className="language-switch ml-4 border px-4 py-2">{locale === 'it' ? '中文' : 'Italiano'}</button></div>
    <button type="button" className="lg:hidden rounded-lg p-3" aria-expanded={open} aria-controls="mobile-navigation" aria-label={locale === 'zh' ? '切换导航菜单' : 'Apri o chiudi il menu'} onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
   </div>
   {open ? <div id="mobile-navigation" className="lg:hidden max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-white/20 pb-4">{paths.map(key => <Link key={key} href={href(key)} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 hover:bg-white/10">{t(key)}</Link>)}<button type="button" className="px-4 py-3 underline" onClick={switchLanguage}>{locale === 'it' ? '切换到中文' : "Passa all'italiano"}</button></div> : null}
  </nav>
 </header>;
}
