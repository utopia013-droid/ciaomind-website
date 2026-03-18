import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'zh' }];
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">我们的服务</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            通过创新的服务和产品,连接东西方文化,创造独特价值
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
                  <ServiceCard id={service.id} />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-primary-navy mb-4">
                    {service.id === 'ai-skills' && 'AI技能服务'}
                    {service.id === 'tea-culture' && '茶文化预约'}
                    {service.id === 'culture-tech' && '文化科技产品'}
                  </h3>
                  <p className="text-lg text-text-secondary mb-6">
                    {service.id === 'ai-skills' &&
                      '我们利用最新的人工智能技术,为企业提供全方位的智能化解决方案。从数据分析到自动化流程,从智能客服到预测性维护,我们的AI专家团队将帮助您在数字化转型的道路上取得成功。'}
                    {service.id === 'tea-culture' &&
                      '沉浸式体验中国千年茶文化的魅力。我们提供专业的茶道表演、茶艺培训、茶叶品鉴等活动,让您在优雅的环境中感受茶文化的博大精深。无论是商务接待还是个人体验,都能找到最适合您的茶文化之旅。'}
                    {service.id === 'culture-tech' &&
                      '将传统文化与现代科技完美融合,创造前所未有的文化体验产品。通过VR/AR技术、互动装置、数字艺术等形式,让传统艺术以全新的方式呈现。这些创新产品不仅具有观赏价值,更承载着深厚的文化内涵。'}
                  </p>
                  <ul className="space-y-2 text-text-secondary">
                    {service.id === 'ai-skills' && [
                      '智能化数据分析与决策支持',
                      '自动化流程优化',
                      '智能客服系统开发',
                      '预测性维护解决方案',
                    ]}
                    {service.id === 'tea-culture' && [
                      '专业茶道表演',
                      '茶艺培训课程',
                      '高端茶叶品鉴',
                      '定制化茶文化活动',
                    ]}
                    {service.id === 'culture-tech' && [
                      'VR/AR文化体验',
                      '互动数字艺术装置',
                      '文化遗产数字化',
                      '沉浸式文化展览',
                    ]?.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-primary-coral mr-2">✓</span>
                        {item}
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
            准备好开始了吗?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            联系我们,了解更多服务详情,定制专属您的文化体验
          </p>
          <a
            href="/contact"
            className="btn-primary inline-block"
          >
            联系我们
          </a>
        </div>
      </section>
    </>
  );
}
