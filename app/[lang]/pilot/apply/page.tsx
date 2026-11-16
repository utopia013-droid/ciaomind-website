import type { Metadata } from 'next';
import { locales, localeTags, type Locale } from '@/lib/i18n';
import { readCampaign } from '@/lib/campaign';
import HeritagePilotForm from './HeritagePilotForm';

type Props = {
  params: { lang: string };
  searchParams: Record<string, string | string[] | undefined>;
};

const pageCopy: Record<Locale, { title: string; intro: string; process: string; steps: string[]; quote: string }> = {
  zh: {
    title: '申请文化 IP 开发试点',
    intro: '说明你的品牌或权利方项目。我们会先了解目标、初步范围和待核事项，再讨论是否适合开展付费试点。',
    process: '申请后会发生什么',
    steps: ['我们查看你的申请', '双方确认范围与书面报价', '确认后再安排试点'],
    quote: '提交申请不收费，也不代表项目已获接受或开始。只有在双方书面确认范围与报价后，才会安排付费试点。',
  },
  it: {
    title: 'Richiedi un progetto pilota Heritage Economy OS',
    intro: 'Descrivi il progetto del tuo brand o titolare dei diritti. Valuteremo obiettivi, perimetro iniziale e verifiche necessarie prima di discutere un eventuale progetto pilota a pagamento.',
    process: 'Cosa succede dopo la richiesta',
    steps: ['Esaminiamo la richiesta', 'Definiamo insieme perimetro e preventivo scritto', 'Il progetto parte dopo la conferma'],
    quote: 'La richiesta è gratuita e non costituisce accettazione né avvio del progetto. Il progetto pilota a pagamento viene concordato solo dopo la conferma scritta di perimetro e preventivo.',
  },
  en: {
    title: 'Apply for a Heritage Economy OS pilot',
    intro: 'Tell us about your brand or rights-holder project. We will review the goal, initial scope, and open questions before discussing a possible paid pilot.',
    process: 'What happens after you apply',
    steps: ['We review your application', 'We agree on scope and a written quote', 'The pilot is scheduled after confirmation'],
    quote: 'Applying is free and does not mean the project has been accepted or started. A paid pilot is arranged only after both sides confirm the scope and written quote.',
  },
  fr: {
    title: 'Candidater à un projet pilote Heritage Economy OS',
    intro: 'Présentez le projet de votre marque ou ayant droit. Nous étudierons l’objectif, le périmètre initial et les points à vérifier avant d’envisager un projet pilote payant.',
    process: 'Après votre demande',
    steps: ['Nous examinons votre demande', 'Nous convenons du périmètre et d’un devis écrit', 'Le projet démarre après confirmation'],
    quote: 'La demande est gratuite et ne vaut ni acceptation ni démarrage du projet. Le projet pilote payant est organisé uniquement après confirmation écrite du périmètre et du devis par les deux parties.',
  },
  de: {
    title: 'Für ein Heritage Economy OS Pilotprojekt bewerben',
    intro: 'Beschreiben Sie das Vorhaben Ihrer Marke oder Rechteinhaberschaft. Wir prüfen Ziel, ersten Umfang und offene Fragen, bevor wir über ein mögliches kostenpflichtiges Pilotprojekt sprechen.',
    process: 'So geht es nach der Bewerbung weiter',
    steps: ['Wir prüfen Ihre Bewerbung', 'Wir stimmen Umfang und schriftliches Angebot ab', 'Nach Bestätigung wird das Pilotprojekt geplant'],
    quote: 'Die Bewerbung ist kostenlos und bedeutet weder Annahme noch Projektstart. Ein kostenpflichtiges Pilotprojekt wird erst nach schriftlicher Bestätigung von Umfang und Angebot durch beide Seiten vereinbart.',
  },
  es: {
    title: 'Solicita un proyecto piloto de Heritage Economy OS',
    intro: 'Cuéntanos el proyecto de tu marca o titular de derechos. Revisaremos el objetivo, el alcance inicial y las cuestiones pendientes antes de valorar un posible piloto de pago.',
    process: 'Qué ocurre después de enviar la solicitud',
    steps: ['Revisamos la solicitud', 'Acordamos el alcance y un presupuesto por escrito', 'El piloto se programa tras la confirmación'],
    quote: 'La solicitud es gratuita y no implica aceptación ni inicio del proyecto. El piloto de pago se acuerda únicamente después de que ambas partes confirmen por escrito el alcance y el presupuesto.',
  },
};

function getLocale(value: string): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : 'en';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = getLocale(params.lang);
  return {
    title: pageCopy[locale].title,
    description: pageCopy[locale].intro,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/pilot/apply/`,
      languages: Object.fromEntries(locales.map(lang => [localeTags[lang], `/${lang}/pilot/apply/`])),
    },
  };
}

export default function HeritagePilotApply({ params, searchParams }: Props) {
  const locale = getLocale(params.lang);
  const copy = pageCopy[locale];
  const role = searchParams.role === 'rights-holder' ? 'rights-holder' : 'brand';
  const campaign = readCampaign(searchParams);

  return (
    <div className="min-h-screen bg-background-light">
      <section className="bg-[#16352c] px-5 py-12 text-white sm:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[.16em] text-white/75">CIAOMIND · Heritage Economy OS</p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/90">{copy.intro}</p>
        </div>
      </section>
      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-8 max-w-3xl">
            <h2 className="mb-5 text-2xl font-bold">{copy.process}</h2>
            <ol className="grid gap-3 md:grid-cols-3">
              {copy.steps.map((step, index) => (
                <li key={step} className="rounded-xl border border-black/10 bg-white p-4">
                  <span className="mr-2 font-bold text-primary-coral">0{index + 1}</span>{step}
                </li>
              ))}
            </ol>
          </div>
          <HeritagePilotForm locale={locale} initialRole={role} campaign={campaign} quoteNotice={copy.quote} />
        </div>
      </section>
    </div>
  );
}
