import { useTranslations } from 'next-intl';
import TeamMember from '@/components/TeamMember';
import { team } from '@/data/team';

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'zh' }];
}

export default function TeamPage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('home.team.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('home.team.description')}
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamMember key={member.id} id={member.id} locale={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="section bg-background-light">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-navy mb-4">
            {t('team.join_us') || '加入我们'}
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            {t('team.join_description') || '如果您对文化交流充满热情,欢迎加入我们的团队,一起创造更多可能'}
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
