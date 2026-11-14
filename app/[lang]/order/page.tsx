import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceCheckout from '@/components/ServiceCheckout';
import { businessServices, resolveBusinessLocale } from '@/data/business-catalog';

type Props = { params: { lang: string }; searchParams: Record<string, string | string[] | undefined> };

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveBusinessLocale(params.lang);
  const title = { zh: '提交服务订单', it: 'Invia una richiesta di servizio', en: 'Submit a service request', fr: 'Envoyer une demande de service', de: 'Serviceanfrage senden', es: 'Enviar una solicitud de servicio' }[locale];
  return { title, robots: { index: false, follow: true } };
}

export default function OrderPage({ params, searchParams }: Props) {
  const locale = resolveBusinessLocale(params.lang);
  const rawService = typeof searchParams.service === 'string' ? searchParams.service : '';
  const service = businessServices.some(item => item.id === rawService) ? rawService : '';
  const rawSource = typeof searchParams.utm_source === 'string' ? searchParams.utm_source : '';
  const source = /^[A-Za-z0-9_.-]{1,80}$/.test(rawSource) ? rawSource : '';
  const rawVariant = typeof searchParams.variant === 'string' ? searchParams.variant : '';
  const serviceDefinition = businessServices.find(item => item.id === service);
  const variant = /^[a-z0-9-]{1,48}$/.test(rawVariant) && serviceDefinition?.variants.some(item => item.id === rawVariant) ? rawVariant : '';
  const coverage = {
    zh: '受理范围为意大利的企业开办和经营事项。',
    it: 'Accettiamo richieste per l’avvio e la gestione di attività in Italia.',
    en: 'We accept requests for starting and running a business in Italy.',
    fr: 'Nous acceptons les demandes de création et de gestion d’activités en Italie.',
    de: 'Wir nehmen Anfragen zur Gründung und Führung von Unternehmen in Italien an.',
    es: 'Tramitamos solicitudes para iniciar y gestionar actividades en Italia.',
  }[locale];
  const copy = {
    zh: { eyebrow: '服务需求', title: '告诉我们你需要什么', intro: '提交需求后，我们会人工确认适用范围并提供书面报价。提交不产生付款，也不代表服务已接受。', back: '← 返回首页' },
    it: { eyebrow: 'Richiesta di servizio', title: 'Raccontaci di cosa hai bisogno', intro: 'Dopo l’invio verificheremo manualmente il perimetro e ti forniremo un preventivo scritto. L’invio non comporta pagamenti né conferma l’accettazione del servizio.', back: '← Torna alla home' },
    en: { eyebrow: 'Service request', title: 'Tell us what you need', intro: 'After you submit your request, we will review the scope and provide a written quotation. Submitting does not require payment or mean the service has been accepted.', back: '← Back to home' },
    fr: { eyebrow: 'Demande de service', title: 'Dites-nous ce dont vous avez besoin', intro: 'Après l’envoi, nous examinerons le périmètre et vous fournirons un devis écrit. L’envoi n’entraîne aucun paiement et ne signifie pas que le service est accepté.', back: '← Retour à l’accueil' },
    de: { eyebrow: 'Serviceanfrage', title: 'Teilen Sie uns Ihren Bedarf mit', intro: 'Nach dem Absenden prüfen wir den Umfang und erstellen ein schriftliches Angebot. Das Absenden ist nicht mit einer Zahlung verbunden und bedeutet keine Annahme des Auftrags.', back: '← Zur Startseite' },
    es: { eyebrow: 'Solicitud de servicio', title: 'Cuéntanos qué necesitas', intro: 'Después de enviar la solicitud, revisaremos el alcance y te proporcionaremos un presupuesto por escrito. El envío no requiere pago ni significa que el servicio haya sido aceptado.', back: '← Volver al inicio' },
  }[locale];

  return (
    <>
      <section className="bg-primary-navy text-white py-12 md:py-16">
        <div className="container max-w-4xl">
          <p className="uppercase tracking-[0.18em] text-xs sm:text-sm text-white/70 mb-4">CIAOMIND · {copy.eyebrow}</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-white/80 leading-relaxed">{copy.intro}</p>
          <p className="mt-3 font-semibold text-white">{coverage}</p>
          <Link href={{ pathname: `/${locale}/`, query: source ? { utm_source: source } : undefined }} className="inline-flex mt-6 text-sm font-semibold text-white underline underline-offset-4">{copy.back}</Link>
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
