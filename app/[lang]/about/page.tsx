import { useTranslations } from 'next-intl';
import TeamMember from '@/components/TeamMember';
import { team } from '@/data/team';

export default function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('about.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('about.company_name')} - {t('hero.title')}
          </p>
        </div>
      </section>

      {/* Company Description */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary-navy mb-6">{t('about.story_title') || '我们的故事'}</h2>
              <p className="text-lg text-text-secondary mb-4">
                {t('about.description')}
              </p>
              <p className="text-lg text-text-secondary mb-4">
                {t('about.description2') || '在这个全球化的时代,文化的理解和融合比以往任何时候都更加重要。我们深知东方文化的深厚底蕴和西方文明的创新精神,通过我们的服务,让两种文化在对话中相互启发、共同成长。'}
              </p>
              <p className="text-lg text-text-secondary">
                {t('about.description3') || '无论是AI技能服务、茶文化体验,还是文化科技产品,我们都以专业的态度和创新的思维,为每一位客户创造独特的价值。'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card">
                <h3 className="text-2xl font-bold text-primary-navy mb-4">{t('about.vision')}</h3>
                <p className="text-text-secondary">
                  {t('about.vision_text')}
                </p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold text-primary-navy mb-4">{t('about.mission')}</h3>
                <p className="text-text-secondary">
                  {t('about.mission_text')}
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-primary-navy mb-4">{t('about.values_title') || '我们的价值观'}</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-primary-coral font-bold mr-2">•</span>
                  <span><strong>{t('about.value1_title') || '尊重'}:</strong> {t('about.value1_desc') || '尊重每种文化的独特价值和传统'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-coral font-bold mr-2">•</span>
                  <span><strong>{t('about.value2_title') || '创新'}:</strong> {t('about.value2_desc') || '不断探索文化表达的新方式'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-coral font-bold mr-2">•</span>
                  <span><strong>{t('about.value3_title') || '专业'}:</strong> {t('about.value3_desc') || '以专业精神对待每一个项目'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-coral font-bold mr-2">•</span>
                  <span><strong>{t('about.value4_title') || '合作'}:</strong> {t('about.value4_desc') || '相信合作的力量,共创美好未来'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-background-light">
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
    </>
  );
}
