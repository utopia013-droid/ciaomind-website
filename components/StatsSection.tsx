'use client';

import { useTranslations } from 'next-intl';
import { Users, Globe, Award, Coffee } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import CountUp from './animations/CountUp';

interface StatsSectionProps {
  locale: string;
}

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: '+',
    labelKey: 'stats.partners',
    descriptionKey: 'stats.partnersDesc',
  },
  {
    icon: Globe,
    value: 50,
    suffix: '+',
    labelKey: 'stats.projects',
    descriptionKey: 'stats.projectsDesc',
  },
  {
    icon: Award,
    value: 10,
    suffix: '+',
    labelKey: 'stats.experience',
    descriptionKey: 'stats.experienceDesc',
  },
  {
    icon: Coffee,
    value: 1000,
    suffix: '+',
    labelKey: 'stats.events',
    descriptionKey: 'stats.eventsDesc',
  },
];

export default function StatsSection({ locale }: StatsSectionProps) {
  const t = useTranslations();

  return (
    <section className="section bg-background-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)`,
        }} />
      </div>

      <div className="container-modern relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="card-modern group text-center p-8 hover:scale-105 transition-transform duration-500">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-coral/20 to-accent-purple/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-primary-coral" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-text-main mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-lg font-semibold text-text-main mb-1">
                  {t(stat.labelKey)}
                </div>
                <div className="text-sm text-text-secondary">
                  {t(stat.descriptionKey)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
