import { useTranslations } from 'next-intl';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'zh' }];
}

export default function ServicesPage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('services.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('home.services.description')}
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section bg-white">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <ServiceCard id={service.id} locale={lang} />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-primary-navy mb-4">
                    {t(service.titleKey as any)}
                  </h3>
                  <p className="text-lg text-text-secondary mb-6">
                    {t(service.descriptionKey as any)}
                  </p>
                  <ul className="space-y-2 text-text-secondary">
                    {service.features?.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-primary-coral mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-background-light">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-navy mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            {t('services.cta_description') || '联系我们,了解更多服务详情,定制专属您的文化体验'}
          </p>
          <a
            href={`/${lang}/contact`}
            className="btn-primary inline-block"
          >
            {t('contact.title') || '联系我们'}
          </a>
        </div>
      </section>
    </>
  );
}
