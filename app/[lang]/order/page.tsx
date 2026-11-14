import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceCheckout from '@/components/ServiceCheckout';
import { businessServices } from '@/data/business-catalog';

type Props = { params: { lang: string }; searchParams: Record<string, string | string[] | undefined> };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang === 'it' ? 'it' : 'zh';
  return { title: lang === 'zh' ? '提交服务订单' : 'Invia un ordine', robots: { index: false, follow: true } };
}

export default function OrderPage({ params, searchParams }: Props) {
  const locale = params.lang === 'it' ? 'it' : 'zh';
  const rawService = typeof searchParams.service === 'string' ? searchParams.service : '';
  const service = businessServices.some(item => item.id === rawService) ? rawService : '';
  const rawSource = typeof searchParams.utm_source === 'string' ? searchParams.utm_source : '';
  const source = /^[A-Za-z0-9_.-]{1,80}$/.test(rawSource) ? rawSource : '';
  const rawVariant = typeof searchParams.variant === 'string' ? searchParams.variant : '';
  const serviceDefinition = businessServices.find(item => item.id === service);
  const variant = /^[a-z0-9-]{1,48}$/.test(rawVariant) && serviceDefinition?.variants.some(item => item.id === rawVariant) ? rawVariant : '';

  return (
    <>
      <section className="bg-primary-navy text-white py-12 md:py-16">
        <div className="container max-w-4xl">
          <p className="uppercase tracking-[0.18em] text-xs sm:text-sm text-white/70 mb-4">CIAOMIND · {locale === 'zh' ? '服务需求' : 'Richiesta di servizio'}</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">{locale === 'zh' ? '告诉我们你需要什么' : 'Raccontaci di cosa hai bisogno'}</h1>
          <p className="mt-4 max-w-2xl text-white/80 leading-relaxed">{locale === 'zh' ? '提交需求后，我们会人工确认适用范围并提供书面报价。提交不产生付款，也不代表服务已接受。' : 'Dopo l’invio verificheremo manualmente il perimetro e ti forniremo un preventivo scritto. L’invio non comporta pagamenti né conferma l’accettazione del servizio.'}</p>
          <Link href={`/${locale}/business/`} className="inline-flex mt-6 text-sm font-semibold text-white underline underline-offset-4">{locale === 'zh' ? '← 返回业务服务' : '← Torna ai servizi per le imprese'}</Link>
        </div>
      </section>
      <section className="section bg-background-light">
        <div className="container max-w-4xl">
          <ServiceCheckout locale={locale} initialService={service} source={source} variant={variant} />
        </div>
      </section>
    </>
  );
}
