import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight, BookOpen, Building2, Calculator, CircleHelp, ClipboardCheck,
  CreditCard, FileText, Handshake, Home, MessageCircle, Sparkles, Users,
} from 'lucide-react';
import { businessGroups, businessServices, resolveBusinessLocale } from '@/data/business-catalog';
import { locales, localeTags } from '@/lib/i18n';
import styles from './Storefront.module.css';

export type StorefrontProps = {
  params: { lang: string };
  searchParams: Record<string, string | string[] | undefined>;
};

const copy = {
  zh: {
    title: '在意大利开办和管理企业',
    intro: '从开办公司到日常经营，先选择你要办理的事项。CIAOMIND 帮你梳理需求、材料和下一步。',
    start: '开始下单', browse: '查看全部服务', pricing: '报价与流程', notes: '常见问题', guide: '办理指南',
    service: '选择服务', details: '选择办理事项', order: '提交订单', quoted: '范围确认后报价',
    summary: '按事项选择服务',
    steps: ['选择办理事项', '填写需求并取得订单号', '确认范围与书面报价'],
    questions: [
      ['提交后会发生什么？', '页面会生成订单号。团队会用你留下的邮箱联系你，确认办理范围、材料和费用。'],
      ['提交订单时需要付款吗？', '提交时不扣款。报价和服务范围以双方后续的书面确认内容为准。'],
      ['哪些事项需要专业人士？', '涉及公证、法律、税务或劳动专业工作的，由具备相应资格的专业人士处理，具体安排在报价前确认。'],
    ],
    guides: [
      ['第一次开办企业', '先确定经营活动、经营地点、主体形式和共同创办人。', 'open'],
      ['已经有公司，想简化日常经营', '先列出需要的账务、合同或咨询事项，带上目标完成日期。', 'manage'],
      ['需要额外的经营工具', '按实际场景选择注册地址、企业账户或其他辅助支持。', 'tools'],
    ],
  },
  it: {
    title: 'Apri e gestisci la tua attività in Italia',
    intro: 'Dall’avvio dell’impresa alla gestione quotidiana. Scegli il servizio e CIAOMIND ti aiuta a chiarire esigenze, documenti e prossimi passi.',
    start: 'Inizia un ordine', browse: 'Esplora i servizi', pricing: 'Preventivi e passaggi', notes: 'Domande frequenti', guide: 'Guide pratiche',
    service: 'Scegli il servizio', details: 'Scegli la pratica', order: 'Invia un ordine', quoted: 'Preventivo dopo la definizione del perimetro',
    summary: 'Scegli il servizio per la tua pratica',
    steps: ['Scegli la pratica', 'Invia i dati e ricevi il numero d’ordine', 'Concorda perimetro e preventivo scritto'],
    questions: [
      ['Cosa succede dopo l’invio?', 'La pagina mostra il numero d’ordine. Il team ti contatterà via email per definire attività, documenti e costi.'],
      ['Devo pagare per inviare un ordine?', 'L’invio non comporta un addebito. Il perimetro del servizio e il preventivo saranno concordati separatamente per iscritto.'],
      ['Quando serve un professionista abilitato?', 'Le attività notarili, legali, fiscali o del lavoro riservate spettano a professionisti abilitati. Il team chiarirà come procedere prima del preventivo.'],
    ],
    guides: [
      ['Avviare la prima impresa', 'Parti da attività, sede, forma da valutare ed eventuali soci.', 'open'],
      ['Organizzare un’impresa già attiva', 'Elenca le esigenze di contabilità, contratti o consulenza con le relative scadenze.', 'manage'],
      ['Trovare strumenti per l’impresa', 'Individua le esigenze di domiciliazione, conto aziendale o supporto operativo.', 'tools'],
    ],
  },
  ...{
  "en": {
    "title": "Start and run your business in Italy",
    "intro": "Choose what you need, from forming a company to handling day-to-day operations. CIAOMIND helps you clarify the scope, documents and next steps.",
    "start": "Start an order",
    "browse": "Browse services",
    "pricing": "Quotes and steps",
    "notes": "Frequently asked questions",
    "guide": "Practical guides",
    "service": "Browse relevant services",
    "details": "Choose a service",
    "order": "Submit an order",
    "quoted": "Written quote after we agree the scope",
    "summary": "What would you like to do?",
    "steps": [
      "Choose a service",
      "Submit your request and receive an order number",
      "Agree the scope and written quote"
    ],
    "questions": [
      [
        "What happens after I submit?",
        "You receive an order number. The team uses your email to confirm the scope, documents and cost."
      ],
      [
        "Do I pay when I submit?",
        "Submitting an order does not charge you. Costs and scope are confirmed separately in writing."
      ],
      [
        "When do I need a licensed professional?",
        "Reserved notarial, legal, tax and employment work is handled by licensed professionals. The team confirms the arrangement before quoting."
      ]
    ],
    "guides": [
      [
        "Starting a business",
        "Identify your activity, location, structure and any co-founders.",
        "open"
      ],
      [
        "Running an existing business",
        "List the accounting, contracts or advice you need and your deadlines.",
        "manage"
      ],
      [
        "Finding business tools",
        "Identify your needs for an address, business account or other support.",
        "tools"
      ]
    ]
  },
  "fr": {
    "title": "Créez et gérez votre activité en Italie",
    "intro": "De la création d’une société à sa gestion quotidienne, choisissez la démarche qui vous concerne. CIAOMIND vous aide à préciser le besoin, les documents et les prochaines étapes.",
    "start": "Commencer une commande",
    "browse": "Voir les services",
    "pricing": "Devis et étapes",
    "notes": "Questions fréquentes",
    "guide": "Guides pratiques",
    "service": "Voir les services associés",
    "details": "Choisir une démarche",
    "order": "Envoyer une commande",
    "quoted": "Devis écrit après définition du besoin",
    "summary": "Que souhaitez-vous faire ?",
    "steps": [
      "Choisir une démarche",
      "Envoyer votre demande et obtenir un numéro",
      "Valider le périmètre et le devis écrit"
    ],
    "questions": [
      [
        "Que se passe-t-il après l’envoi ?",
        "Vous recevez un numéro de commande. L’équipe vous contacte par e-mail pour confirmer le périmètre, les documents et le coût."
      ],
      [
        "Dois-je payer au moment de l’envoi ?",
        "L’envoi ne déclenche aucun paiement. Le coût et le périmètre seront validés séparément par écrit."
      ],
      [
        "Quand faut-il un professionnel habilité ?",
        "Les activités notariales, juridiques, fiscales et sociales réservées relèvent de professionnels habilités. L’équipe précise les modalités avant le devis."
      ]
    ],
    "guides": [
      [
        "Créer sa première entreprise",
        "Identifiez l’activité, le lieu, la structure et les éventuels associés.",
        "open"
      ],
      [
        "Gérer une entreprise existante",
        "Listez vos besoins de comptabilité, de contrats ou de conseil et vos échéances.",
        "manage"
      ],
      [
        "Trouver des outils pour votre activité",
        "Précisez vos besoins de domiciliation, de compte professionnel ou d’assistance.",
        "tools"
      ]
    ]
  },
  "de": {
    "title": "Ihr Unternehmen in Italien gründen und führen",
    "intro": "Von der Gründung bis zum laufenden Betrieb. Wählen Sie Ihr Anliegen. CIAOMIND hilft Ihnen, Umfang, Unterlagen und nächste Schritte zu klären.",
    "start": "Auftrag starten",
    "browse": "Dienste ansehen",
    "pricing": "Angebote und Ablauf",
    "notes": "Häufige Fragen",
    "guide": "Ratgeber",
    "service": "Passende Dienste ansehen",
    "details": "Anliegen auswählen",
    "order": "Auftrag einreichen",
    "quoted": "Schriftliches Angebot nach Klärung des Umfangs",
    "summary": "Was möchten Sie erledigen?",
    "steps": [
      "Anliegen auswählen",
      "Anfrage absenden und Auftragsnummer erhalten",
      "Umfang und schriftliches Angebot abstimmen"
    ],
    "questions": [
      [
        "Was passiert nach dem Absenden?",
        "Sie erhalten eine Auftragsnummer. Das Team meldet sich per E-Mail, um Umfang, Unterlagen und Kosten zu klären."
      ],
      [
        "Muss ich beim Absenden zahlen?",
        "Beim Absenden wird nichts berechnet. Kosten und Umfang werden separat schriftlich vereinbart."
      ],
      [
        "Wann brauche ich zugelassene Fachleute?",
        "Vorbehaltene notarielle, rechtliche, steuerliche und arbeitsrechtliche Tätigkeiten übernehmen zugelassene Fachleute. Das Team klärt die Zuständigkeit vor dem Angebot."
      ]
    ],
    "guides": [
      [
        "Das erste Unternehmen gründen",
        "Klären Sie Tätigkeit, Standort, Rechtsform und mögliche Mitgründer.",
        "open"
      ],
      [
        "Ein bestehendes Unternehmen führen",
        "Notieren Sie Ihren Bedarf an Buchhaltung, Verträgen oder Beratung sowie Ihre Fristen.",
        "manage"
      ],
      [
        "Werkzeuge für den Betrieb finden",
        "Klären Sie Ihren Bedarf an Geschäftsanschrift, Geschäftskonto oder weiterer Unterstützung.",
        "tools"
      ]
    ]
  },
  "es": {
    "title": "Crea y gestiona tu empresa en Italia",
    "intro": "Desde la constitución hasta la gestión diaria, elige el trámite que necesitas. CIAOMIND te ayuda a concretar el alcance, los documentos y los próximos pasos.",
    "start": "Iniciar un pedido",
    "browse": "Ver los servicios",
    "pricing": "Presupuestos y pasos",
    "notes": "Preguntas frecuentes",
    "guide": "Guías prácticas",
    "service": "Ver los servicios relacionados",
    "details": "Elegir trámite",
    "order": "Enviar pedido",
    "quoted": "Presupuesto escrito tras definir el alcance",
    "summary": "¿Qué quieres tramitar?",
    "steps": [
      "Elige un trámite",
      "Envía la solicitud y recibe un número de pedido",
      "Acuerda el alcance y el presupuesto escrito"
    ],
    "questions": [
      [
        "¿Qué pasa después de enviar el pedido?",
        "Recibirás un número de pedido. El equipo te contactará por correo para confirmar el alcance, los documentos y el coste."
      ],
      [
        "¿Tengo que pagar al enviar el pedido?",
        "El envío no genera ningún cargo. El coste y el alcance se acuerdan por escrito después."
      ],
      [
        "¿Cuándo necesito un profesional habilitado?",
        "Las tareas notariales, jurídicas, fiscales y laborales reservadas corresponden a profesionales habilitados. El equipo aclarará cómo proceder antes del presupuesto."
      ]
    ],
    "guides": [
      [
        "Crear tu primera empresa",
        "Identifica la actividad, el lugar, la forma jurídica y posibles socios.",
        "open"
      ],
      [
        "Gestionar una empresa existente",
        "Anota los servicios contables, contractuales o de consulta que necesitas y los plazos.",
        "manage"
      ],
      [
        "Encontrar herramientas para tu empresa",
        "Define tus necesidades de domicilio social, cuenta empresarial u otro apoyo.",
        "tools"
      ]
    ]
  }
}
};
const icons = [Building2, CreditCard, Users, Calculator, FileText, MessageCircle, ClipboardCheck, Home, Handshake, Sparkles];
export function storefrontMetadata(language: string, path: 'home' | 'business'): Metadata {
  const lang = resolveBusinessLocale(language);
  const url = (locale: string) => `/${locale}/${path === 'business' ? 'business/' : ''}`;
  return {
    title: copy[lang].title,
    description: copy[lang].intro,
    alternates: {
      canonical: url(lang),
      languages: Object.fromEntries(locales.map(locale => [localeTags[locale], url(locale)])),
    },
  };
}

export function Storefront({ params, searchParams }: StorefrontProps) {
  const lang = resolveBusinessLocale(params.lang);
  const t = copy[lang];
  const source = searchParams.utm_source;
  const campaign = typeof source === 'string' && /^[A-Za-z0-9_.-]{1,80}$/.test(source) ? source : '';
  const checkout = (service?: string, variant?: string) => {
    const query = new URLSearchParams();
    if (service) query.set('service', service);
    if (variant) query.set('variant', variant);
    if (campaign) query.set('utm_source', campaign);
    return `/${lang}/order/${query.size ? '?' + query : ''}`;
  };

  return <div className={styles.store}>
    <div className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.heroCopy}>
          <h1 lang={localeTags[lang]}>{t.title}</h1>
          <p>{t.intro}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={checkout()}>{t.start}<ArrowRight size={18} aria-hidden /></Link>
            <a className={styles.textLink} href="#open">{t.browse}</a>
          </div>
        </div>
        <div className={styles.quick}>
          <h2>{t.summary}</h2>
          {businessGroups.map(group =>
            <a key={group.id} href={'#' + group.id}>
              <span><strong>{group.title[lang]}</strong><small>{group.intro[lang]}</small></span>
              <ArrowRight size={18} aria-hidden />
            </a>,
          )}
        </div>
      </div>
    </div>

    {businessGroups.map(group => <section className={styles.section} key={group.id} id={group.id}>
      <div className={styles.inner}>
        <h2>{group.title[lang]}</h2><p className={styles.intro}>{group.intro[lang]}</p>
        <div className={styles.cards}>
          {businessServices.filter(service => service.group === group.id).map(service => {
            const Icon = icons[businessServices.indexOf(service)];
            return <article className={styles.card} key={service.id}>
              <Icon className={styles.icon} aria-hidden size={23} />
              <h3>{service.name[lang]}</h3>
              <p>{service.summary[lang]}</p>
              <ul className={styles.variants}>{service.variants.map(variant =>
                <li key={variant.id}><Link href={checkout(service.id, variant.id)}>{variant.label[lang]}<ArrowRight size={14} aria-hidden /></Link></li>,
              )}</ul>
              <Link href={checkout(service.id)} className={styles.textLink}>
                {t.details}<span className="sr-only"> · {service.name[lang]}</span><ArrowRight size={16} aria-hidden />
              </Link>
            </article>;
          })}
        </div>
      </div>
    </section>)}

    <section className={styles.section + ' ' + styles.tinted} id="pricing">
      <div className={styles.inner}>
        <h2>{t.pricing}</h2>
        <p className={styles.intro}>{t.quoted}</p>
        <ol className={styles.process}>{t.steps.map(step => <li key={step}>{step}</li>)}</ol>
        <Link className={styles.primary} href={checkout()}>{t.order}<ArrowRight aria-hidden size={16} /></Link>
      </div>
    </section>
    <section className={styles.section} id="guides">
      <div className={styles.inner}>
        <h2>{t.guide}</h2>
        <div className={styles.cards}>{t.guides.map(([title, body, group]) =>
          <article className={styles.card} key={group}>
            <BookOpen size={22} className={styles.icon} aria-hidden /><h3>{title}</h3><p>{body}</p>
            <a href={'#' + group} className={styles.textLink}>{t.service}<ArrowRight size={16} aria-hidden /></a>
          </article>,
        )}</div>
        <div className={styles.faq}><h2><CircleHelp size={25} aria-hidden />{t.notes}</h2>
          {t.questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </div>
    </section>
  </div>;
}
