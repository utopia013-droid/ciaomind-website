import { company } from '@/data/company';

export function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'zh' }];
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="section container">
        <h1 className="text-4xl font-bold text-primary-navy mb-8">
          服务条款
        </h1>

        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-lg text-text-secondary mb-8">
            最后更新: {new Date().getFullYear()}年{new Date().getMonth() + 1}月
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              1. 接受条款
            </h2>
            <p className="text-text-secondary">
              通过访问和使用本网站,您同意遵守本服务条款。如果您不同意这些条款,请不要使用本网站。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              2. 服务内容
            </h2>
            <p className="text-text-secondary mb-4">
              CIAOMIND S.B. S.R.L. 提供以下服务:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>AI技能服务</li>
              <li>茶文化预约和体验</li>
              <li>文化科技产品</li>
              <li>文化咨询和合作</li>
            </ul>
            <p className="text-text-secondary mt-4">
              我们保留随时修改、暂停或终止任何服务的权利,恕不另行通知。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              3. 用户责任
            </h2>
            <p className="text-text-secondary mb-4">
              使用本网站时,您同意:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>提供准确、真实的信息</li>
              <li>不从事任何非法或未经授权的活动</li>
              <li>不干扰或破坏网站的安全或正常运行</li>
              <li>不传播病毒、恶意软件或其他有害内容</li>
              <li>尊重他人的知识产权和隐私权</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              4. 知识产权
            </h2>
            <p className="text-text-secondary mb-4">
              本网站的所有内容,包括但不限于文本、图形、图像、标志、软件等,均为 CIAOMIND S.B. S.R.L. 或其内容提供商的财产,受知识产权法保护。
            </p>
            <p className="text-text-secondary">
              未经事先书面许可,您不得以任何方式使用、复制、分发、修改或创建本网站任何内容的衍生作品。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              5. 免责声明
            </h2>
            <p className="text-text-secondary mb-4">
              本网站按"现状"和"可用"基础提供,不提供任何明示或暗示的保证,包括但不限于:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>服务的无中断或无错误运行</li>
              <li>错误或缺陷将被纠正</li>
              <li>网站或其服务器无病毒或其他有害组件</li>
              <li>使用结果将满足您的要求</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              6. 责任限制
            </h2>
            <p className="text-text-secondary">
              在法律允许的最大范围内,CIAOMIND S.B. S.R.L. 不对任何直接、间接、偶然、特殊或后果性损害承担责任,包括但不限于利润损失、数据丢失或业务中断,无论是否由合同、侵权或其他原因引起。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              7. 赔偿
            </h2>
            <p className="text-text-secondary">
              您同意赔偿并使 CIAOMIND S.B. S.R.L. 及其官员、董事、员工和代理免受因您违反本服务条款或侵犯任何第三方权利而产生的任何索赔、损失、损害、责任和费用(包括合理的律师费)。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              8. 争议解决
            </h2>
            <p className="text-text-secondary">
              因本服务条款引起或与之相关的任何争议应首先通过友好协商解决。如果协商不成,应提交至意大利罗马法院裁决。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              9. 可分性
            </h2>
            <p className="text-text-secondary">
              如果本服务条款的任何条款被认定为无效或不可执行,其余条款仍将保持完全有效和可执行。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              10. 完整协议
            </h2>
            <p className="text-text-secondary">
              本服务条款构成您与我们之间关于使用本网站的完整协议,取代所有先前的协议和谅解。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              11. 联系我们
            </h2>
            <p className="text-text-secondary">
              如果您对本服务条款有任何疑问,请通过以下方式联系我们:
            </p>
            <p className="text-text-secondary mt-2">
              邮箱: {company.email}<br />
              电话: {company.phone}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
