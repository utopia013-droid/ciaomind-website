'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-modern">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-primary-navy' : 'text-white'
            }`}
          >
            <span className="text-primary-coral">CIAO</span>MIND
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? 'text-text-main hover:text-primary-coral hover:bg-primary-coral/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(item.key as any)}
              </Link>
            ))}

            {/* Language Switcher */}
            <button
              onClick={() => switchLanguage(locale === 'it' ? 'zh' : 'it')}
              className={`ml-4 px-4 py-2 rounded-lg border transition-all duration-300 ${
                isScrolled
                  ? 'border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white'
                  : 'border-white/50 text-white hover:bg-white hover:text-primary-navy'
              }`}
            >
              {locale === 'it' ? '中文' : 'Italiano'}
            </button>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className={`ml-4 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-primary-coral text-white hover:bg-primary-coral-dark hover:shadow-glow'
                  : 'bg-white text-primary-navy hover:bg-white/90 hover:shadow-lg'
              }`}
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-primary-navy' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white rounded-2xl shadow-xl mt-2 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="block px-4 py-3 rounded-lg text-text-main hover:text-primary-coral hover:bg-primary-coral/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.key as any)}
                  </Link>
                ))}

                <div className="pt-4 border-t mt-4 space-y-2">
                  <button
                    onClick={() => {
                      switchLanguage(locale === 'it' ? 'zh' : 'it');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-colors text-left"
                  >
                    {locale === 'it' ? '切换到中文' : 'Passa all\'italiano'}
                  </button>

                  <Link
                    href={`/${locale}/contact`}
                    className="block w-full px-4 py-3 rounded-lg bg-primary-coral text-white text-center font-semibold hover:bg-primary-coral-dark transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('contact')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
