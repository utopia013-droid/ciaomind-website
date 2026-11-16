import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe2, ShieldCheck } from 'lucide-react';
import { globalMarkets } from '@/data/global-catalog';
import { locales, localeTags, type Locale } from '@/lib/i18n';
import { readCampaign } from '@/lib/campaign';
import { marketingMetadata } from '@/lib/marketing-metadata';
import styles from './Global.module.css';

type Props = { params: { lang: string }; searchParams: Record<string, string | string[] | undefined> };

const pageCopy: Record<Locale, {
  title: string; intro: string; crossBorderTitle: string; crossBorder: string;
  pathways: string; italyNote: string; evaluationNote: string; wealthNote: string; stepsTitle: string;
  steps: [string, string, string]; privacyTitle: string; privacy: string;
  contact: string; meta: string;
}> = {
  zh: { title: '跨境业务与地区目录', intro: '按业务所在地查看可讨论的路径。先选地区，再选主题；我们会先了解情况并确认是否适用。', crossBorderTitle: '跨境业务场景', crossBorder: '如果创办人、资产、客户或经营活动分布在多个国家，可以从下方选择相关地区，整理需要厘清的问题。', pathways: '相关路径', italyNote: '意大利开办事项可直接从现有服务入口开始。', evaluationNote: '此路径仅用于初步评估，不代表可以办理、已接受委托或享有任何税务优惠。', wealthNote: '此入口仅收集需求并转介合适的持牌顾问；不提供投资服务或资产转移，也不报价或保证费用、收益或结果。', stepsTitle: '接下来', steps: ['选择相关地区与主题', '提交基本情况与目标', '等待人工确认范围与书面报价'], privacyTitle: '请保护敏感信息', privacy: '请勿通过需求表提交身份证件、银行对账单、税号或信托契约。初步沟通只需说明大致情况；如确需文件，我们会先说明安全的传递方式。', contact: '联系团队', meta: '按国家和地区查看跨境企业及结构相关的初步评估路径。' },
  it: { title: 'Paesi e percorsi internazionali', intro: 'Consulta i percorsi in base al luogo dell’attività. Scegli un paese o una regione e poi il tema: verificheremo prima se la richiesta rientra nell’ambito.', crossBorderTitle: 'Attività transfrontaliere', crossBorder: 'Se fondatori, beni, clienti o attività si trovano in più paesi, seleziona le regioni pertinenti per chiarire i temi da valutare.', pathways: 'Percorsi correlati', italyNote: 'Per avviare un’attività in Italia puoi accedere direttamente ai servizi esistenti.', evaluationNote: 'Questo percorso serve solo a una valutazione iniziale: non garantisce operatività, accettazione dell’incarico o benefici fiscali.', wealthNote: 'Questo modulo raccoglie esigenze e le indirizza a un consulente autorizzato idoneo; non offre servizi d’investimento o trasferimenti patrimoniali, né comunica o garantisce commissioni, rendimenti o risultati.', stepsTitle: 'Prossimi passaggi', steps: ['Scegli le regioni e i temi pertinenti', 'Descrivi brevemente situazione e obiettivo', 'Attendi la verifica dell’ambito e un preventivo scritto'], privacyTitle: 'Proteggi i dati sensibili', privacy: 'Non inviare documenti d’identità, estratti conto, codici fiscali o atti fiduciari tramite il modulo. Per il primo contatto basta una descrizione generale; se servono documenti, indicheremo prima un canale sicuro.', contact: 'Contatta il team', meta: 'Percorsi di valutazione iniziale per attività e strutture transfrontaliere, per paese e regione.' },
  en: { title: 'Global business and region directory', intro: 'Explore pathways by where your activity is based. Choose a country or region, then a topic; we will first review whether it fits our scope.', crossBorderTitle: 'Cross-border situations', crossBorder: 'If founders, assets, customers, or operations span several countries, select the relevant regions to outline the questions that need review.', pathways: 'Related pathways', italyNote: 'For starting a business in Italy, you can go directly to the existing service options.', evaluationNote: 'This pathway is for an initial evaluation only. It does not promise availability, acceptance of an engagement, or any tax benefit.', wealthNote: 'This intake collects needs for referral to an appropriate licensed adviser. It does not provide investment services or transfer assets, and no fees, returns, or outcomes are quoted or guaranteed.', stepsTitle: 'What happens next', steps: ['Choose relevant regions and topics', 'Share a brief outline and your goal', 'Wait for a scope review and written quotation'], privacyTitle: 'Keep sensitive data private', privacy: 'Do not submit identity documents, bank statements, tax IDs, or trust deeds through the intake form. A general outline is enough for an initial discussion; if documents are needed, we will first explain a secure way to share them.', contact: 'Contact the team', meta: 'Initial evaluation pathways for cross-border business and structures by country and region.' },
  fr: { title: 'Répertoire international des activités et régions', intro: 'Explorez les parcours selon le lieu de votre activité. Choisissez un pays ou une région, puis un thème ; nous vérifierons d’abord si la demande entre dans notre champ.', crossBorderTitle: 'Situations transfrontalières', crossBorder: 'Si les fondateurs, les actifs, les clients ou les activités concernent plusieurs pays, sélectionnez les régions pertinentes pour préciser les questions à examiner.', pathways: 'Parcours associés', italyNote: 'Pour créer une activité en Italie, accédez directement aux services existants.', evaluationNote: 'Ce parcours sert uniquement à une première évaluation. Il ne garantit ni la disponibilité, ni l’acceptation d’une mission, ni un avantage fiscal.', wealthNote: 'Ce formulaire recueille les besoins afin d’orienter vers un conseiller agréé approprié. Il ne fournit aucun service d’investissement ni transfert d’actifs ; aucun frais, rendement ou résultat n’est annoncé ou garanti.', stepsTitle: 'Étapes suivantes', steps: ['Choisissez les régions et thèmes concernés', 'Présentez brièvement votre situation et votre objectif', 'Attendez l’examen du périmètre et un devis écrit'], privacyTitle: 'Protégez vos données sensibles', privacy: 'Ne transmettez pas de pièce d’identité, relevé bancaire, numéro fiscal ou acte de trust via le formulaire. Une description générale suffit au premier échange ; si des documents sont nécessaires, nous vous indiquerons d’abord un moyen sécurisé de les partager.', contact: 'Contacter l’équipe', meta: 'Parcours d’évaluation initiale pour les activités et structures transfrontalières, par pays et région.' },
  de: { title: 'Verzeichnis für internationale Geschäfte und Regionen', intro: 'Entdecken Sie mögliche Wege nach dem Ort Ihrer Geschäftstätigkeit. Wählen Sie ein Land oder eine Region und anschließend ein Thema. Wir prüfen zunächst den passenden Umfang.', crossBorderTitle: 'Grenzüberschreitende Situationen', crossBorder: 'Wenn Gründer, Vermögenswerte, Kunden oder Geschäftstätigkeiten mehrere Länder betreffen, wählen Sie die relevanten Regionen aus und beschreiben Sie die zu prüfenden Fragen.', pathways: 'Passende Themen', italyNote: 'Für eine Unternehmensgründung in Italien können Sie direkt zu den bestehenden Leistungen wechseln.', evaluationNote: 'Dieser Weg dient nur einer ersten Einschätzung. Er verspricht weder Verfügbarkeit noch die Annahme eines Mandats oder steuerliche Vorteile.', wealthNote: 'Diese Anfrage erfasst den Bedarf zur Vermittlung an einen passenden zugelassenen Berater. Sie bietet keine Anlagedienstleistungen oder Vermögensübertragungen; Gebühren, Renditen oder Ergebnisse werden weder genannt noch garantiert.', stepsTitle: 'Nächste Schritte', steps: ['Relevante Regionen und Themen auswählen', 'Situation und Ziel kurz beschreiben', 'Prüfung des Umfangs und schriftliches Angebot abwarten'], privacyTitle: 'Sensible Daten schützen', privacy: 'Übermitteln Sie über das Formular keine Ausweisdokumente, Kontoauszüge, Steuer-IDs oder Trust-Urkunden. Für das erste Gespräch reicht eine allgemeine Beschreibung. Falls Dokumente nötig sind, erklären wir zuerst einen sicheren Übermittlungsweg.', contact: 'Team kontaktieren', meta: 'Erste Einschätzung zu grenzüberschreitenden Geschäftsaktivitäten und Strukturen nach Land und Region.' },
  es: { title: 'Directorio internacional de negocios y regiones', intro: 'Consulta las opciones según dónde se desarrolla tu actividad. Elige un país o región y después un tema; primero revisaremos si la solicitud encaja en nuestro ámbito.', crossBorderTitle: 'Situaciones transfronterizas', crossBorder: 'Si los fundadores, activos, clientes o actividades abarcan varios países, selecciona las regiones pertinentes para definir qué cuestiones conviene revisar.', pathways: 'Opciones relacionadas', italyNote: 'Para iniciar una actividad en Italia, puedes acceder directamente a los servicios existentes.', evaluationNote: 'Esta opción es solo para una evaluación inicial. No garantiza disponibilidad, aceptación del encargo ni beneficios fiscales.', wealthNote: 'Este formulario recopila necesidades para derivarlas a un asesor autorizado adecuado. No ofrece servicios de inversión ni transferencias de activos; no se cotizan ni garantizan comisiones, rendimientos o resultados.', stepsTitle: 'Qué ocurre después', steps: ['Elige las regiones y temas relevantes', 'Resume la situación y tu objetivo', 'Espera la revisión del alcance y un presupuesto por escrito'], privacyTitle: 'Protege tus datos sensibles', privacy: 'No envíes documentos de identidad, extractos bancarios, números fiscales ni escrituras de fideicomiso mediante el formulario. Para el primer contacto basta una descripción general; si necesitamos documentos, primero indicaremos un medio seguro para compartirlos.', contact: 'Contactar con el equipo', meta: 'Opciones de evaluación inicial para negocios y estructuras transfronterizas por país y región.' },
};

const trustCopy: Record<Locale, { title: string; summary: string; boundaries: string; existing: string }> = {
  zh: { title: '信托与持有架构专项评估', summary: '先区分信托适用的管辖法律、受托人的牌照或服务所在地，以及底层持股公司的注册地。核查角色图、已签署的信托契约与最终财产清单、股份登记及控制权凭证，再梳理持续申报。服务提供方退出与信托终止应可独立复核。', boundaries: '香港入口仅用于核查服务提供方；BVI 特殊结构需个案审查。本入口不承诺税务结果，也不收取信托资金。', existing: '其他信托主题' },
  it: { title: 'Valutazione dedicata di trust e strutture di detenzione', summary: 'Distinguere la legge applicabile al trust, il luogo della licenza o del servizio del trustee e il luogo della società sottostante. Verificare mappa dei ruoli, atto fiduciario firmato e inventario patrimoniale definitivo, registrazione delle quote e prove del controllo, quindi gli adempimenti continuativi. L’uscita del fornitore e la cessazione del trust devono poter essere verificate separatamente.', boundaries: 'Hong Kong: verifica del solo fornitore. Le strutture speciali BVI richiedono un esame caso per caso. Nessun risultato fiscale è promesso e non vengono ricevuti fondi del trust.', existing: 'Altri temi sui trust' },
  en: { title: 'Trust and ownership structure review', summary: 'Separate the trust’s governing law, the trustee’s licence or service location, and the underlying holding company’s location. Review the role map, signed trust deed and final property schedule, share registration and control evidence, then ongoing reporting. Provider offboarding and trust termination should be independently reviewable.', boundaries: 'Hong Kong is a provider review only. BVI special structures are subject to case review. No tax outcome is promised and no trust funds are accepted.', existing: 'Other trust topics' },
  fr: { title: 'Évaluation dédiée des trusts et structures de détention', summary: 'Distinguer le droit applicable au trust, le lieu d’agrément ou de service du trustee et le lieu de la société sous-jacente. Examiner la cartographie des rôles, l’acte de trust signé et l’inventaire définitif des biens, l’inscription des parts et les preuves de contrôle, puis les déclarations continues. Le départ du prestataire et la clôture du trust doivent pouvoir être vérifiés indépendamment.', boundaries: 'Hong Kong : vérification du prestataire uniquement. Les structures spéciales BVI sont soumises à un examen au cas par cas. Aucun résultat fiscal n’est promis et aucun fonds du trust n’est reçu.', existing: 'Autres thèmes liés aux trusts' },
  de: { title: 'Prüfung von Trusts und Beteiligungsstrukturen', summary: 'Zu unterscheiden sind das maßgebliche Trust-Recht, der Ort der Zulassung oder Dienstleistung des Trustees und der Sitz der zugrunde liegenden Holdinggesellschaft. Geprüft werden Rollenübersicht, unterzeichnete Trust-Urkunde und endgültiges Vermögensverzeichnis, Aktienregistrierung und Kontrollnachweise sowie laufende Meldungen. Das Ausscheiden des Dienstleisters und die Beendigung des Trusts sollten unabhängig überprüfbar sein.', boundaries: 'Hongkong dient ausschließlich der Prüfung von Dienstleistern. Besondere BVI-Strukturen werden einzeln geprüft. Steuerliche Ergebnisse werden nicht versprochen; Trust-Gelder werden nicht angenommen.', existing: 'Weitere Trust-Themen' },
  es: { title: 'Revisión de trusts y estructuras de titularidad', summary: 'Distingue la ley aplicable al trust, el lugar de licencia o servicio del fiduciario y la ubicación de la sociedad tenedora subyacente. Revisa el mapa de funciones, el documento del trust firmado y el inventario final de bienes, el registro de acciones y las pruebas de control, y después las declaraciones periódicas. La salida del proveedor y la terminación del trust deben poder revisarse de forma independiente.', boundaries: 'Hong Kong es solo para revisar proveedores. Las estructuras especiales de las BVI requieren revisión individual. No se prometen resultados fiscales ni se reciben fondos del trust.', existing: 'Otros temas sobre trusts' },
};

const restructuringCopy = {
  zh: { title: '跨境产业重组', scope: '梳理供应链、品牌、经销渠道和拟承接的经营资产，核对涉及地区、交易主体、控制权变化和交割条件。评估范围与费用按项目确认。', action: '申请重组评估与报价' },
  it: { title: 'Riorganizzazione industriale transfrontaliera', scope: 'Mappiamo filiera, marchi, canali di vendita e attività da rilevare, verificando paesi, parti, controllo e condizioni di chiusura. Perimetro e costo sono definiti per progetto.', action: 'Richiedi una valutazione e un preventivo' },
  en: { title: 'Cross-border industrial restructuring', scope: 'Map supply chains, brands, distribution and operating assets, then review jurisdictions, counterparties, control changes and closing conditions. The scope and fee are quoted for each project.', action: 'Request a restructuring assessment and quote' },
  fr: { title: 'Restructuration industrielle transfrontalière', scope: 'Cartographiez la chaîne d’approvisionnement, les marques, la distribution et les actifs, puis examinez les pays, les parties, le contrôle et les conditions de réalisation. Le périmètre et les frais sont définis sur devis.', action: 'Demander une évaluation et un devis' },
  de: { title: 'Grenzüberschreitende industrielle Umstrukturierung', scope: 'Erfassen Sie Lieferketten, Marken, Vertrieb und Betriebsvermögen. Geprüft werden Länder, Parteien, Kontrollwechsel und Vollzugsbedingungen. Umfang und Kosten werden je Projekt angeboten.', action: 'Prüfung und Angebot anfragen' },
  es: { title: 'Reestructuración industrial transfronteriza', scope: 'Analiza cadenas de suministro, marcas, distribución y activos operativos, así como jurisdicciones, partes, cambios de control y condiciones de cierre. El alcance y el precio se cotizan por proyecto.', action: 'Solicitar evaluación y presupuesto' },
} satisfies Record<Locale, { title: string; scope: string; action: string }>;

function resolveLocale(value: string): Locale {
  return locales.find(locale => locale === value) ?? 'zh';
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveLocale(params.lang);
  return {
    ...marketingMetadata(locale, `/${locale}/global/`, pageCopy[locale].title, pageCopy[locale].meta),
    title: pageCopy[locale].title,
    description: pageCopy[locale].meta,
    alternates: {
      canonical: `/${locale}/global/`,
      languages: Object.fromEntries(locales.map(item => [localeTags[item], `/${item}/global/`])),
    },
  };
}

export default function GlobalDirectory({ params, searchParams }: Props) {
  const locale = resolveLocale(params.lang);
  const t = pageCopy[locale];
  const campaign = readCampaign(searchParams);
  const orderHref = (variant: string) => {
    const query = new URLSearchParams({ ...campaign, service: 'structure-review', variant });
    return `/${locale}/order/?${query.toString()}`;
  };

  const featured = ['expansion', 'sg', 'wealth', 'hk', 'us', 'bvi', 'cayman', 'trusts'];
  const markets = globalMarkets.filter(market => market.id !== 'trusts').sort((a, b) => {
    const rank = (id: string) => featured.includes(id) ? featured.indexOf(id) : featured.length;
    return rank(a.id) - rank(b.id);
  });
  const singaporeFees = {
    zh: 'ACRA 本地公司官费参考：名称申请 S$15，注册 S$300，年度申报 S$60。',
    it: 'Tariffe ACRA per società locali: S$15 per il nome, S$300 per la registrazione, S$60 per il deposito annuale.',
    en: 'ACRA local company fees: S$15 for a name, S$300 for registration and S$60 for the annual return.',
    fr: 'Tarifs ACRA pour les sociétés locales : 15 S$ pour le nom, 300 S$ pour l’immatriculation et 60 S$ pour la déclaration annuelle.',
    de: 'ACRA-Gebühren für lokale Gesellschaften: S$15 für den Namen, S$300 für die Registrierung und S$60 für die Jahresmeldung.',
    es: 'Tasas de ACRA para sociedades locales: S$15 por el nombre, S$300 por el registro y S$60 por la declaración anual.',
  }[locale];
  const references = {
    zh: '官方资料', it: 'Fonti ufficiali', en: 'Official references',
    fr: 'Sources officielles', de: 'Offizielle Quellen', es: 'Fuentes oficiales',
  }[locale];
  const trust = trustCopy[locale];
  const restructuring = restructuringCopy[locale];
  const trustMarket = globalMarkets.find(market => market.id === 'trusts')!;
  const trustRegions = ['trust-ky', 'trust-sg', 'trust-hk', 'trust-bvi', 'trust-uk', 'trust-record-review'];

  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><Globe2 size={16} aria-hidden="true" /> CIAOMIND · GLOBAL</p>
          <h1 lang={localeTags[locale]}>{t.title}</h1>
          <p className={styles.lead}>{t.intro}</p>
        </div>
        <aside className={styles.crossBorder} aria-labelledby="cross-border-title">
          <h2 id="cross-border-title">{t.crossBorderTitle}</h2>
          <p>{t.crossBorder}</p>
        </aside>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="regions-title">
      <div className={styles.inner}>
        <h2 id="regions-title">{t.pathways}</h2>
        <article className={styles.market + ' ' + styles.restructuring} id="industrial-restructuring" aria-labelledby="restructuring-title">
          <div><h3 id="restructuring-title">{restructuring.title}</h3><p>{restructuring.scope}</p></div>
          <Link className={styles.restructuringLink} href={orderHref('industrial-restructuring')}>{restructuring.action}<ArrowRight size={16} aria-hidden /></Link>
        </article>
        <article className={styles.trustPanel} aria-labelledby="trust-title" id="trusts">
          <div className={styles.trustIntro}>
            <p className={styles.trustEyebrow}>TRUST · STRUCTURE REVIEW</p>
            <h3 id="trust-title">{trust.title}</h3>
            <p>{trust.summary}</p>
            <p className={styles.trustBoundary}>{trust.boundaries}</p>
          </div>
          <ul className={styles.trustGrid}>
            {trustMarket.topics.filter(topic => trustRegions.includes(topic.id)).map(topic => <li key={topic.id}>
              <Link href={orderHref(topic.id)}><span>{topic.label[locale]}</span><ArrowRight size={17} aria-hidden="true" /></Link>
            </li>)}
          </ul>
          <h4 className={styles.trustExistingTitle}>{trust.existing}</h4>
          <ul className={styles.trustExisting}>
            {trustMarket.topics.filter(topic => !trustRegions.includes(topic.id)).map(topic => <li key={topic.id}>
              <Link href={orderHref(topic.id)}><span>{topic.label[locale]}</span><ArrowRight size={17} aria-hidden="true" /></Link>
            </li>)}
          </ul>
          {trustMarket.sources.length > 0 && <details className={styles.references}>
            <summary>{references}</summary>
            <ul>{trustMarket.sources.map(source => <li key={source.href}><a href={source.href}>{source.label[locale]}</a></li>)}</ul>
          </details>}
        </article>
        <div className={styles.marketGrid}>
          {markets.map(market => <article className={styles.market} key={market.id} id={market.id}>
            <h3>{market.label[locale]}</h3>
            {market.id === 'it' && <Link className={styles.italyLink} href={{ pathname: `/${locale}/business/`, query: campaign, hash: 'open' }}>
              <span>{t.italyNote}</span><ArrowRight size={17} aria-hidden="true" />
            </Link>}
            {market.id !== 'it' && <p className={styles.marketNote}>{market.id === 'wealth' ? t.wealthNote : t.evaluationNote}</p>}
            <ul className={styles.topicList}>
              {market.topics.map(topic => <li key={topic.id}>
                <Link href={orderHref(topic.id)}>
                  <span>{topic.label[locale]}</span><ArrowRight size={17} aria-hidden="true" />
                </Link>
              </li>)}
            </ul>
            {market.id === 'sg' && <p className={styles.marketNote}>{singaporeFees} <a className="underline" href="https://www.acra.gov.sg/manage/companies/service-transaction-fees/">ACRA</a></p>}
            {market.sources.length > 0 && <details className={styles.references}>
              <summary>{references}</summary>
              <ul>{market.sources.map(source => <li key={source.href}><a href={source.href}>{source.label[locale]}</a></li>)}</ul>
            </details>}
          </article>)}
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="steps-title">
      <div className={styles.inner}>
        <h2 id="steps-title">{t.stepsTitle}</h2>
        <ol className={styles.steps}>{t.steps.map(step => <li key={step}>{step}</li>)}</ol>
        <aside className={styles.privacy} aria-labelledby="privacy-title">
          <ShieldCheck size={21} aria-hidden="true" />
          <div><h3 id="privacy-title">{t.privacyTitle}</h3><p>{t.privacy}</p></div>
        </aside>
        <Link className={styles.contact} href={`/${locale === 'zh' ? 'zh' : 'it'}/contact/`}>{t.contact}<ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  </div>;
}
