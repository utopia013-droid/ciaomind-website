'use client';

import { useTranslations } from 'next-intl';
import * as Icons from 'lucide-react';
import { services } from '@/data/services';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  locale: string;
}

export default function ServiceCard({ id, locale }: ServiceCardProps) {
  const t = useTranslations();
  const service = services.find(s => s.id === id);

  if (!service) return null;

  const Icon = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-white rounded-2xl p-8 overflow-hidden transition-all duration-500"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-coral/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-coral/10 to-accent-purple/10 mb-6 group-hover:scale-110 transition-transform duration-300">
          {Icon && <Icon className="w-8 h-8 text-primary-coral" />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary-coral transition-colors duration-300">
          {t(service.titleKey as any)}
        </h3>

        {/* Description */}
        <p className="text-text-secondary mb-6 leading-relaxed">
          {t(service.descriptionKey as any)}
        </p>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-coral mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* CTA Link */}
        <div className="flex items-center text-primary-coral font-semibold group/link cursor-pointer">
          <span className="mr-2 group-hover/link:mr-4 transition-all duration-300">
            {locale === 'zh' ? '了解更多' : 'Scopri di più'}
          </span>
          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300" />
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary-coral/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
