'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { company } from '@/data/company';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-primary-navy text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">CIAOMIND</h3>
            <p className="text-gray-300 mb-4">
              连接东方与西方的文化桥梁,促进中意两国之间的深度文化交流与合作。
            </p>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1" />
                <span>{company.address}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>{company.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/it/about" className="text-gray-300 hover:text-white transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/it/services" className="text-gray-300 hover:text-white transition-colors">
                  服务
                </Link>
              </li>
              <li>
                <Link href="/it/team" className="text-gray-300 hover:text-white transition-colors">
                  团队
                </Link>
              </li>
              <li>
                <Link href="/it/contact" className="text-gray-300 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">关注我们</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            © {company.year} CIAOMIND S.B. S.R.L. {t('rights')} |
            <Link href="/it/legal/privacy" className="ml-2 hover:text-white transition-colors">
              {t('privacy')}
            </Link> |
            <Link href="/it/legal/terms" className="ml-2 hover:text-white transition-colors">
              {t('terms')}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
