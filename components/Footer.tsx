'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Send } from 'lucide-react';
import { company } from '@/data/company';
import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from './animations/FadeIn';

export default function Footer() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    company: [
      { label: t('about'), href: '/about' },
      { label: t('team'), href: '/team' },
      { label: t('careers'), href: '/careers' },
    ],
    services: [
      { label: t('aiTraining'), href: '/services' },
      { label: t('teaCulture'), href: '/services' },
      { label: t('consulting'), href: '/services' },
    ],
    support: [
      { label: t('contact'), href: '/contact' },
      { label: t('faq'), href: '/faq' },
      { label: t('privacy'), href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-gradient-hero text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-coral rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-purple rounded-full blur-3xl" />
      </div>

      <div className="container-modern relative z-10">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {t('newsletter.title')}
              </h3>
              <p className="text-white/70 mb-8 text-lg">
                {t('newsletter.subtitle')}
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.placeholder')}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-coral transition-colors"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-primary-coral text-white font-semibold hover:bg-primary-coral-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t('newsletter.subscribe')}
                </motion.button>
              </form>

              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-accent-teal"
                >
                  {t('newsletter.success')}
                </motion.p>
              )}
            </FadeIn>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-bold mb-6 inline-block">
              <span className="text-primary-coral">CIAO</span>MIND
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t('company.description')}
            </p>
            <div className="space-y-3 text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-primary-coral" />
                <span>{company.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-coral" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                  {company.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-coral" />
                <a href={`tel:${company.phone}`} className="hover:text-white transition-colors">
                  {company.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t('links.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{t('links.services')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{t('links.support')}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {company.year} CIAOMIND S.B. S.R.L. {t('rights')}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, href: company.social?.facebook || '#' },
              { icon: Instagram, href: company.social?.instagram || '#' },
              { icon: Linkedin, href: company.social?.linkedin || '#' },
              { icon: Twitter, href: company.social?.twitter || '#' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary-coral hover:text-white transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
