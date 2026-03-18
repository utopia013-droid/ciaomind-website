import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import TeamMember from '@/components/TeamMember';
import { services } from '@/data/services';
import { team } from '@/data/team';

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'zh' }];
}

export default function HomePage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();

  return (
    <>
      <Hero locale={lang} />

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-navy mb-4">
            {t('home.services.title')}
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            {t('home.services.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} id={service.id} locale={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-background-light">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-navy mb-12">
            {t('home.whyUs.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-primary-navy mb-2">
                  {t(`home.whyUs.points.${index}.title`)}
                </h3>
                <p className="text-text-secondary">
                  {t(`home.whyUs.points.${index}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-navy mb-4">
            {t('home.team.title')}
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            {t('home.team.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamMember key={member.id} id={member.id} locale={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-navy to-primary-navy/80 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            {t('home.cta.description')}
          </p>
          <a
            href={`/${lang}/contact`}
            className="btn-secondary inline-block"
          >
            {t('home.cta.button')}
          </a>
        </div>
      </section>
    </>
  );
}
