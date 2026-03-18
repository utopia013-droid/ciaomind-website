import { useTranslations } from 'next-intl';
import TeamMember from '@/components/TeamMember';
import { team } from '@/data/team';

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'zh' }];
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            CIAOMIND S.B. S.R.L. - 连接东方与西方的文化桥梁
          </p>
        </div>
      </section>

      {/* Company Description */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary-navy mb-6">我们的故事</h2>
              <p className="text-lg text-text-secondary mb-4">
                CIAOMIND 是一家专注于连接东方与西方的文化桥梁企业,致力于促进中意两国之间的深度文化交流与合作。我们相信,通过文化的力量,可以创造更美好的未来。
              </p>
              <p className="text-lg text-text-secondary mb-4">
                在这个全球化的时代,文化的理解和融合比以往任何时候都更加重要。我们深知东方文化的深厚底蕴和西方文明的创新精神,通过我们的服务,让两种文化在对话中相互启发、共同成长。
              </p>
              <p className="text-lg text-text-secondary">
                无论是AI技能服务、茶文化体验,还是文化科技产品,我们都以专业的态度和创新的思维,为每一位客户创造独特的价值。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card">
                <h3 className="text-2xl font-bold text-primary-navy mb-4">愿景</h3>
                <p className="text-text-secondary">
                  成为中意文化交流的领导者,推动东西方文明的对话与融合,让文化的力量为世界带来更多和谐与理解。
                </p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold text-primary-navy mb-4">使命</h3>
                <p className="text-text-secondary">
                  通过创新的服务和产品,让更多人了解和欣赏东西方文化的独特魅力,搭建真正意义上的文化桥梁。
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-primary-navy mb-4">我们的价值观</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-primary-coral font-bold mr-2">•</span>
                  <span><strong>尊重:</strong> 尊重每种文化的独特价值和传统</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-coral font-bold mr-2">•</span>
                  <span><strong>创新:</strong> 不断探索文化表达的新方式</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-coral font-bold mr-2">•</span>
                  <span><strong>专业:</strong> 以专业精神对待每一个项目</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-coral font-bold mr-2">•</span>
                  <span><strong>合作:</strong> 相信合作的力量,共创美好未来</span>
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
            我们的团队
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            专业、热情、富有创造力的团队,为您服务
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamMember key={member.id} id={member.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
