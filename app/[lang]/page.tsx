import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import TeamMember from '@/components/TeamMember';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import FloatingCTA from '@/components/FloatingCTA';
import FadeIn from '@/components/animations/FadeIn';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();

  const whyChooseUs = [
    {
      title: t('home.whyUs.points.1.title'),
      description: t('home.whyUs.points.1.description'),
    },
    {
      title: t('home.whyUs.points.2.title'),
      description: t('home.whyUs.points.2.description'),
    },
    {
      title: t('home.whyUs.points.3.title'),
      description: t('home.whyUs.points.3.description'),
    },
    {
      title: t('home.whyUs.points.4.title'),
      description: t('home.whyUs.points.4.description'),
    },
    {
      title: t('home.whyUs.points.5.title'),
      description: t('home.whyUs.points.5.description'),
    },
    {
      title: t('home.whyUs.points.6.title'),
      description: t('home.whyUs.points.6.description'),
    },
  ];

  return (
    <>
      <Hero locale={lang} />

      {/* Partners Section */}
      <Partners locale={lang} />

      {/* Stats Section */}
      <StatsSection locale={lang} />

      {/* Services Section */}
      <section className="section bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-coral/5 to-transparent" />
        
        <div className="container-modern relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-coral/10 text-primary-coral text-sm font-semibold mb-4">
              {t('home.services.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              {t('home.services.description')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeIn key={service.id} delay={index * 0.1}>
                <ServiceCard id={service.id} locale={lang} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="text-center mt-12">
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 text-primary-coral font-semibold hover:gap-4 transition-all duration-300"
            >
              {t('home.services.viewAll')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-background-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary-coral/10 rounded-full blur-3xl" />
        </div>

        <div className="container-modern relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              {t('home.whyUs.title')}
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              {t('home.whyUs.subtitle')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="card-modern group h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-coral/10 flex items-center justify-center group-hover:bg-primary-coral group-hover:text-white transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-primary-coral group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary-coral transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials locale={lang} />

      {/* Team Preview Section */}
      <section className="section bg-white relative overflow-hidden">
        <div className="container-modern">
          <FadeIn className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-teal/10 text-accent-teal text-sm font-semibold mb-4">
              {t('home.team.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              {t('home.team.title')}
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              {t('home.team.description')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <FadeIn key={member.id} delay={index * 0.1}>
                <TeamMember id={member.id} locale={lang} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="text-center mt-12">
            <Link
              href={`/${lang}/team`}
              className="inline-flex items-center gap-2 text-primary-coral font-semibold hover:gap-4 transition-all duration-300"
            >
              {t('home.team.viewAll')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-hero relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-coral/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-purple/20 rounded-full blur-3xl" />
        </div>

        <div className="container-modern relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-10">
              {t('home.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-navy px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                {t('home.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${lang}/services`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {t('home.cta.secondaryButton')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Floating CTA */}
      <FloatingCTA />
    </>
  );
}
