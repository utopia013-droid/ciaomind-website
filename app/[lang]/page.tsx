import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import TeamMember from '@/components/TeamMember';
import { services } from '@/data/services';
import { team } from '@/data/team';

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'zh' }];
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <Hero locale={locale} />

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-navy mb-4">
            我们的服务
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            通过创新的服务和产品,连接东西方文化,创造独特价值
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} id={service.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-background-light">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-navy mb-12">
            为什么选择我们
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: '双文化专业', desc: '深谙中意两国文化和商业环境' },
              { title: '创新服务', desc: '结合传统与现代,提供独特体验' },
              { title: '专业团队', desc: '经验丰富的专业团队全程服务' },
              { title: '定制方案', desc: '根据客户需求提供个性化解决方案' },
              { title: '质量保证', desc: '严格的质量控制体系' },
              { title: '持续支持', desc: '长期的合作关系和售后支持' },
            ].map((item, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-primary-navy mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-navy mb-4">
            认识我们的团队
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

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-navy to-primary-navy/80 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            准备好开始了吗?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            让我们一起创造文化价值,连接东西方智慧
          </p>
          <a
            href={`/${locale}/contact`}
            className="btn-secondary inline-block"
          >
            立即联系我们
          </a>
        </div>
      </section>
    </>
  );
}
