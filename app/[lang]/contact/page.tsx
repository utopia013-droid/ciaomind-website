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

                <div className="flex items-start">
                  <div className="bg-primary-coral/10 p-3 rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-primary-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-navy mb-1">{t('contact.working_hours') || '工作时间'}</h3>
                    <p className="text-text-secondary">
                      {t('contact.weekdays') || '周一至周五'}: 9:00 - 18:00<br />
                      {t('contact.weekend') || '周六至周日'}: {t('contact.closed') || '休息'}
                    </p>
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

      {/* Map Section */}
      <section className="section bg-background-light">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-primary-navy mb-8">
            {t('contact.our_location') || '我们的位置'}
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.065557344736!2d12.496365!3d41.902783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU0JzEwLjAiTiAxMsKwMjknNDYuOSJF!5e0!3m2!1sit!2sit!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
