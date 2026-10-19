import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { company } from '@/data/company';

export default function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('contact.hero_description') || '我们期待与您交流,为您创造独特价值'}
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary-navy mb-6">
                  {t('contact.contact_info') || '联系方式'}
                </h2>
                <p className="text-text-secondary mb-8">
                  {t('contact.contact_description') || '有任何问题或建议?我们随时准备为您提供帮助。通过以下方式联系我们,或使用右侧表单留言。'}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-coral/10 p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-primary-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-navy mb-1">{t('contact.address')}</h3>
                    <p className="text-text-secondary">{company.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-coral/10 p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-primary-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-navy mb-1">{t('contact.email')}</h3>
                    <p className="text-text-secondary">{company.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-coral/10 p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-primary-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-navy mb-1">{t('contact.phone')}</h3>
                    <p className="text-text-secondary">{company.phone}</p>
                  </div>
                </div>


              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm locale={lang} />
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
