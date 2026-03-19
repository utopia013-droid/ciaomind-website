'use client';

import { useTranslations } from 'next-intl';
import FadeIn from './animations/FadeIn';
import { motion } from 'framer-motion';

interface PartnersProps {
  locale: string;
}

const partners = [
  { name: 'Partner 1', logo: 'P1' },
  { name: 'Partner 2', logo: 'P2' },
  { name: 'Partner 3', logo: 'P3' },
  { name: 'Partner 4', logo: 'P4' },
  { name: 'Partner 5', logo: 'P5' },
  { name: 'Partner 6', logo: 'P6' },
];

export default function Partners({ locale }: PartnersProps) {
  const t = useTranslations();

  return (
    <section className="py-16 bg-background-white border-y border-gray-100">
      <div className="container-modern">
        <FadeIn className="text-center mb-12">
          <p className="text-text-secondary text-lg">
            {t('partners.title')}
          </p>
        </FadeIn>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="group flex items-center justify-center w-32 h-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-text-secondary group-hover:text-primary-navy transition-colors">
                  {partner.logo}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
