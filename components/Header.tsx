'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'team', href: `/${locale}/team` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  const switchLanguage = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary-navy">
            CIAOMIND
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-text-main hover:text-primary-coral transition-colors"
              >
                {t(item.key as any)}
              </Link>
            ))}

            {/* Language Switcher */}
            <button
              onClick={() => switchLanguage(locale === 'it' ? 'zh' : 'it')}
              className="px-4 py-2 rounded-lg border border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors"
            >
              {locale === 'it' ? '中文' : 'Italiano'}
            </button>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="btn-primary"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-primary-navy"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-text-main hover:text-primary-coral transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key as any)}
                </Link>
              ))}

              <button
                onClick={() => switchLanguage(locale === 'it' ? 'zh' : 'it')}
                className="px-4 py-2 rounded-lg border border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors text-left"
              >
                {locale === 'it' ? '中文' : 'Italiano'}
              </button>

              <Link
                href={`/${locale}/contact`}
                className="btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
