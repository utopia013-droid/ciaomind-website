import { innerPageLocales } from '@/data/inner-page-locales';
import { getTranslations } from 'next-intl/server';
import TeamMember from '@/components/TeamMember';
import { team } from '@/data/team';

export default async function TeamPage({ params: paramsPromise }: { params: Promise<{ lang: string }> }) {
  const { lang } = await paramsPromise;

  const t = await getTranslations();

  const c = innerPageLocales[lang as keyof typeof innerPageLocales]?.team;
  if(c) return <><section className="section bg-primary-navy text-white"><div className="container-modern"><h1 className="text-4xl text-white">{c[0]}</h1></div></section><section className="section bg-white"><div className="container-modern grid md:grid-cols-2 gap-8">{[1,3].map(i=><article key={i} className="card"><h2 className="text-2xl">{c[i]}</h2><p className="mt-4">{c[i+1]}</p></article>)}</div></section></>;
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
