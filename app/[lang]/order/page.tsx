import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceCheckout from '@/components/ServiceCheckout';
import { businessServices, resolveBusinessLocale } from '@/data/business-catalog';
import { structureReview } from '@/data/global-catalog';
import { getServicePrice } from '@/data/service-prices';

type Props = { params: { lang: string }; searchParams: Record<string, string | string[] | undefined> };

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveBusinessLocale(params.lang);
  const title = { zh: '提交服务订单', it: 'Invia una richiesta di servizio', en: 'Submit a service request', fr: 'Envoyer une demande de service', de: 'Serviceanfrage senden', es: 'Enviar una solicitud de servicio' }[locale];
  return { title, robots: { index: false, follow: true } };
}

export default function OrderPage({ params, searchParams }: Props) {
  const locale = resolveBusinessLocale(params.lang);
  const rawService = typeof searchParams.service === 'string' ? searchParams.service : '';
  const services = [...businessServices, structureReview];
  const service = services.some(item => item.id === rawService) ? rawService : '';
  const rawSource = typeof searchParams.utm_source === 'string' ? searchParams.utm_source : '';
  const source = /^[A-Za-z0-9_.-]{1,80}$/.test(rawSource) ? rawSource : '';
  const rawVariant = typeof searchParams.variant === 'string' ? searchParams.variant : '';
  const serviceDefinition = services.find(item => item.id === service);
  const variant = /^[a-z0-9-]{1,48}$/.test(rawVariant) && serviceDefinition?.variants.some(item => item.id === rawVariant) ? rawVariant : '';
  const pricedPackage = getServicePrice(service, variant);
  if (pricedPackage) {
    return (
      <section className="bg-background-light px-4 pb-16 pt-8 sm:px-8 md:pt-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href={{ pathname: `/${locale}/`, query: source ? { utm_source: source } : undefined, hash: 'pricing' }}
            className="mb-5 inline-block text-sm font-semibold text-primary-navy underline underline-offset-4"
          >
            {{ zh: '← 返回套餐', it: '← Torna ai pacchetti', en: '← Back to packages',
              fr: '← Retour aux formules', de: '← Zurück zu den Paketen', es: '← Volver a los paquetes' }[locale]}
          </Link>
          <ServiceCheckout key={service + ':' + variant} locale={locale} initialService={service} source={source} variant={variant} checkout />
        </div>
      </section>
    );
  }

  const coverage = {
    zh: '受理范围为意大利的企业开办和经营事项。',
    it: 'Accettiamo richieste per l’avvio e la gestione di attività in Italia.',
    en: 'We accept requests for starting and running a business in Italy.',
    fr: 'Nous acceptons les demandes de création et de gestion d’activités en Italie.',
    de: 'Wir nehmen Anfragen zur Gründung und Führung von Unternehmen in Italien an.',
    es: 'Tramitamos solicitudes para iniciar y gestionar actividades en Italia.',
  }[locale];
  const isStructureReview = service === structureReview.id;
  const scopeNote = isStructureReview ? {
    zh: '跨境架构评估仅为初步审阅，不承诺实施或注册结果。请勿提交税号、银行资料、身份证件或信托契约。',
    it: 'La valutazione transfrontaliera è preliminare e non garantisce l’esecuzione o la costituzione. Non inviare codici fiscali, dati bancari, documenti d’identità o atti fiduciari.',
    en: 'This is a preliminary cross-border structure assessment. It does not guarantee implementation or formation. Do not submit tax IDs, bank details, identity documents, or trust deeds.',
    fr: 'Cette évaluation transfrontalière est préliminaire et ne garantit ni mise en œuvre ni constitution. N’envoyez pas de numéros fiscaux, coordonnées bancaires, pièces d’identité ou actes de fiducie.',
    de: 'Diese grenzüberschreitende Strukturprüfung ist eine erste Einschätzung und garantiert weder Umsetzung noch Gründung. Bitte übermitteln Sie keine Steuer- oder Bankdaten, Ausweisdokumente oder Treuhandurkunden.',
    es: 'Esta evaluación transfronteriza es preliminar y no garantiza la implementación ni la constitución. No envíes identificaciones fiscales, datos bancarios, documentos de identidad ni escrituras de fideicomiso.',
  }[locale] : coverage;
  const pageTitle = isStructureReview ? {
    zh: '申请跨境架构评估', it: 'Richiedi una valutazione transfrontaliera', en: 'Request a cross-border structure assessment', fr: 'Demander une évaluation transfrontalière', de: 'Grenzüberschreitende Strukturprüfung anfragen', es: 'Solicitar una evaluación transfronteriza',
  }[locale] : {
    zh: '告诉我们你需要什么', it: 'Raccontaci di cosa hai bisogno', en: 'Tell us what you need', fr: 'Dites-nous ce dont vous avez besoin', de: 'Teilen Sie uns Ihren Bedarf mit', es: 'Cuéntanos qué necesitas',
  }[locale];
  const pageIntro = isStructureReview ? {
    zh: '提交后我们会先审阅申请，再确认是否能够提供评估及其范围。提交仅为咨询申请，不收费，也不代表接受委托。',
    it: 'Dopo l’invio esamineremo la richiesta e confermeremo se possiamo fornire la valutazione e il relativo perimetro. È una richiesta preliminare senza costi e non implica l’accettazione dell’incarico.',
    en: 'We will review the request and confirm whether we can provide an assessment and define its scope. Submitting is free and does not mean an engagement has been accepted.',
    fr: 'Nous examinerons la demande et confirmerons si nous pouvons réaliser l’évaluation et en définir le périmètre. La demande est gratuite et ne signifie pas qu’une mission est acceptée.',
    de: 'Wir prüfen die Anfrage und klären, ob wir eine Bewertung anbieten können und welchen Umfang sie hat. Die Anfrage ist kostenfrei und bedeutet keine Mandatsannahme.',
    es: 'Revisaremos la solicitud y confirmaremos si podemos realizar la evaluación y definir su alcance. La solicitud es gratuita y no implica la aceptación del encargo.',
  }[locale] : {
    zh: '提交需求后，我们会人工确认适用范围并提供书面报价。提交不产生付款，也不代表服务已接受。',
    it: 'Dopo l’invio verificheremo manualmente il perimetro e ti forniremo un preventivo scritto. L’invio non comporta pagamenti né conferma l’accettazione del servizio.',
    en: 'After you submit your request, we will review the scope and provide a written quotation. Submitting does not require payment or mean the service has been accepted.',
    fr: 'Après l’envoi, nous examinerons le périmètre et vous fournirons un devis écrit. L’envoi n’entraîne aucun paiement et ne signifie pas que le service est accepté.',
    de: 'Nach dem Absenden prüfen wir den Umfang und erstellen ein schriftliches Angebot. Das Absenden ist nicht mit einer Zahlung verbunden und bedeutet keine Annahme des Auftrags.',
    es: 'Después de enviar la solicitud, revisaremos el alcance y te proporcionaremos un presupuesto por escrito. El envío no requiere pago ni significa que el servicio haya sido aceptado.',
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
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">{pageTitle}</h1>
          <p className="mt-4 max-w-2xl text-white/80 leading-relaxed">{pageIntro}</p>
          <p className="mt-3 font-semibold text-white">{scopeNote}</p>
          <Link href={`/${locale}/global/`} className="inline-flex mt-3 text-sm font-semibold text-white underline underline-offset-4">{{ zh: '查看可选司法辖区', it: 'Consulta le giurisdizioni disponibili', en: 'View available jurisdictions', fr: 'Voir les juridictions disponibles', de: 'Verfügbare Rechtsordnungen ansehen', es: 'Ver jurisdicciones disponibles' }[locale]}</Link>
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
