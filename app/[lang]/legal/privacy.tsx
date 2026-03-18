import { company } from '@/data/company';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="section container">
        <h1 className="text-4xl font-bold text-primary-navy mb-8">
          隐私政策
        </h1>

        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-lg text-text-secondary mb-8">
            最后更新: {new Date().getFullYear()}年{new Date().getMonth() + 1}月
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              1. 信息收集
            </h2>
            <p className="text-text-secondary mb-4">
              我们收集以下类型的信息:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>您主动提供的信息(如通过联系表单提交的姓名、邮箱、消息等)</li>
              <li>技术信息(如IP地址、浏览器类型、设备信息等)</li>
              <li>使用数据(如访问的页面、停留时间等)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              2. 信息使用
            </h2>
            <p className="text-text-secondary mb-4">
              我们使用收集的信息用于:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>回复您的咨询和请求</li>
              <li>改进我们的服务和用户体验</li>
              <li>发送营销信息(仅在您同意的情况下)</li>
              <li>分析和监控网站使用情况</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              3. 信息共享
            </h2>
            <p className="text-text-secondary mb-4">
              我们不会出售、出租或以其他方式向第三方共享您的个人信息,除非:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>获得您的明确同意</li>
              <li>法律要求或授权</li>
              <li>保护我们的权利、财产或安全</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              4. 数据安全
            </h2>
            <p className="text-text-secondary">
              我们采取适当的技术和组织措施来保护您的个人信息安全,包括使用安全协议、加密技术和访问控制等。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              5. 您的权利
            </h2>
            <p className="text-text-secondary mb-4">
              根据适用的数据保护法律,您有权:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的个人信息</li>
              <li>限制处理您的个人信息</li>
              <li>反对处理您的个人信息</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              6. Cookie 政策
            </h2>
            <p className="text-text-secondary">
              本网站使用 Cookie 来改善用户体验和收集使用数据。您可以通过浏览器设置管理 Cookie。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              7. 联系我们
            </h2>
            <p className="text-text-secondary">
              如果您对本隐私政策有任何疑问或建议,请通过以下方式联系我们:
            </p>
            <p className="text-text-secondary mt-2">
              邮箱: {company.email}<br />
              电话: {company.phone}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              8. 政策更新
            </h2>
            <p className="text-text-secondary">
              我们可能会不时更新本隐私政策。更新后的政策将在本页面发布,并在页首注明最后更新日期。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
