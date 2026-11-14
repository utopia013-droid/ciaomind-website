import { useTranslations } from 'next-intl';
import { company } from '@/data/company';

const orderData = {
  zh: {
    title: '服务订单',
    text: '提交服务订单时，CIAOMIND 使用你填写的公司名称、联系人、邮箱和需求，以及选择的服务、访问来源和提交时间，接收订单并联系你确认范围和报价。订单保存在我们使用的欧盟区域数据库中。我们用网络地址的加密摘要限制重复滥用。你可以通过下列邮箱咨询订单数据的处理。',
  },
  it: {
    title: 'Ordini di servizio',
    text: 'Quando invii un ordine, CIAOMIND usa ragione sociale, referente, email, descrizione, servizio scelto, canale di provenienza e data di invio per registrare l’ordine e contattarti per definire il perimetro e il preventivo. Gli ordini sono conservati in un database in una regione UE. Usiamo un hash dell’indirizzo di rete per limitare gli abusi. Per domande sul trattamento dei dati, scrivi al recapito qui sotto.',
  },
};

export default function LegalPage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations('legal');
  const order = orderData[lang === 'it' ? 'it' : 'zh'];
  return <section className="section bg-white">
    <div className="container-modern max-w-3xl">
      <h1 className="text-3xl mb-8">{t('privacyTitle')}</h1>
      <p className="leading-relaxed mb-8">{t('privacyText')}</p>
      <h2 className="text-xl mb-3">{order.title}</h2>
      <p className="leading-relaxed mb-8">{order.text}</p>
      <p>{company.name} · P. IVA {company.vat}</p>
      <p>{company.address}</p>
      <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>
    </div>
  </section>;
}
