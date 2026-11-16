import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
import { resolveBusinessLocale } from '@/data/business-catalog';

const orderData = {
  zh: {
    title: '服务订单',
    text: '提交服务订单或跨境架构评估申请时，CIAOMIND 使用你填写的公司名称、联系人、邮箱和需求，以及选择的服务、办理地区或架构、联系语言、访问来源和提交时间，接收订单并联系你确认范围和报价。订单保存在我们使用的欧盟区域数据库中。我们用网络地址的加密摘要限制重复滥用。你可以通过下列邮箱咨询订单数据的处理。',
  },
  it: {
    title: 'Ordini di servizio',
    text: 'Quando invii un ordine o una richiesta di valutazione internazionale, CIAOMIND usa ragione sociale, referente, email, descrizione, servizio scelto, giurisdizione o struttura, lingua di contatto, canale di provenienza e data di invio per registrare l’ordine e contattarti per definire il perimetro e il preventivo. Gli ordini sono conservati in un database in una regione UE. Usiamo un hash dell’indirizzo di rete per limitare gli abusi. Per domande sul trattamento dei dati, scrivi al recapito qui sotto.',
  },
  en: {
    title: 'Service orders',
    text: 'When you submit a service order or request a cross-border structure review, CIAOMIND uses the company name, contact person, email address, description, selected service, jurisdiction or structure, contact language, referral source, and submission time to receive the order and contact you to confirm its scope and quotation. Orders are stored in a database hosted in an EU region. We use a hashed network address to limit repeated abuse. You can contact us at the address below with questions about the processing of order data.',
  },
  fr: {
    title: 'Demandes de service',
    text: 'Lorsque vous envoyez une demande de service ou d’évaluation transfrontalière, CIAOMIND utilise le nom de l’entreprise, le contact, l’adresse e-mail, la description, le service choisi, la juridiction ou la structure, la langue de contact, la source de la visite et l’heure d’envoi pour recevoir la demande et vous contacter afin d’en confirmer le périmètre et le devis. Les demandes sont conservées dans une base de données hébergée dans une région de l’UE. Nous utilisons une empreinte hachée de l’adresse réseau pour limiter les abus répétés. Pour toute question sur le traitement des données de commande, vous pouvez nous écrire à l’adresse ci-dessous.',
  },
  de: {
    title: 'Serviceaufträge',
    text: 'Wenn Sie einen Serviceauftrag oder eine Anfrage zur grenzüberschreitenden Prüfung absenden, verwendet CIAOMIND den Unternehmensnamen, die Kontaktperson, die E-Mail-Adresse, die Beschreibung, die ausgewählte Leistung, Rechtsordnung oder Struktur, Kontaktsprache, die Herkunft des Besuchs und den Absendezeitpunkt, um den Auftrag entgegenzunehmen und Sie zur Bestätigung von Umfang und Angebot zu kontaktieren. Die Aufträge werden in einer Datenbank in einer EU-Region gespeichert. Zur Begrenzung wiederholten Missbrauchs verwenden wir einen Hash der Netzwerkadresse. Fragen zur Verarbeitung von Auftragsdaten können Sie an die unten angegebene Adresse richten.',
  },
  es: {
    title: 'Solicitudes de servicio',
    text: 'Cuando envías una solicitud de servicio o de evaluación transfronteriza, CIAOMIND utiliza el nombre de la empresa, la persona de contacto, el correo electrónico, la descripción, el servicio elegido, la jurisdicción o estructura, el idioma de contacto, el canal de procedencia y la hora de envío para recibirla y contactarte con el fin de confirmar el alcance y el presupuesto. Las solicitudes se conservan en una base de datos alojada en una región de la UE. Utilizamos un hash de la dirección de red para limitar los abusos reiterados. Si tienes preguntas sobre el tratamiento de los datos de la solicitud, puedes escribirnos a la dirección indicada a continuación.',
  },
};

const campaignData = {
  zh: '试点申请也通过同一系统受理。若申请链接带有推广标记，我们会随申请保存渠道、活动和推广素材等标记，用于统计各渠道带来的申请。',
  it: 'Anche le candidature al pilota passano dallo stesso sistema. Se il link contiene parametri di campagna, li salviamo con la richiesta per contare le candidature per canale, campagna e contenuto.',
  en: 'Pilot applications use the same system. If the link includes campaign tags, we save them with the application to count applications by channel, campaign and content.',
  fr: 'Les candidatures au pilote utilisent le même système. Si le lien contient des paramètres de campagne, nous les enregistrons avec la demande pour compter les candidatures par canal, campagne et contenu.',
  de: 'Bewerbungen für das Pilotprojekt nutzen dasselbe System. Enthält der Link Kampagnenparameter, speichern wir diese mit der Bewerbung, um Bewerbungen nach Kanal, Kampagne und Inhalt zu zählen.',
  es: 'Las solicitudes del piloto usan el mismo sistema. Si el enlace incluye parámetros de campaña, los guardamos con la solicitud para contar las solicitudes por canal, campaña y contenido.',
};

export default function LegalPage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations('legal');
  const locale = resolveBusinessLocale(lang);
  const order = orderData[locale];
  const translation = {
    en: ['Privacy and contact', 'The contact form prepares an email draft on your device. It reaches us after you send it. Please avoid unnecessary identity documents, credentials and sensitive data. Hosting may process technical logs needed to serve the site. Contact us below to ask about data processing or exercise your rights.'],
    fr: ['Confidentialité et contact', 'Le formulaire de contact prépare un brouillon sur votre appareil. Nous le recevons après son envoi. Évitez les pièces d’identité, identifiants et données sensibles superflus. L’hébergeur peut traiter les journaux nécessaires au fonctionnement du site. Pour vos questions ou pour exercer vos droits, contactez-nous ci-dessous.'],
    de: ['Datenschutz und Kontakt', 'Das Kontaktformular erstellt einen E-Mail-Entwurf auf Ihrem Gerät. Wir erhalten ihn, nachdem Sie ihn gesendet haben. Senden Sie keine unnötigen Ausweise, Zugangsdaten oder sensiblen Angaben. Der Hostingdienst kann technische Protokolle für den Betrieb der Website verarbeiten. Bei Fragen oder zur Ausübung Ihrer Rechte nutzen Sie bitte den Kontakt unten.'],
    es: ['Privacidad y contacto', 'El formulario de contacto prepara un borrador de correo en tu dispositivo. Lo recibimos cuando lo envías. Evita documentos de identidad, credenciales o datos sensibles innecesarios. El alojamiento puede tratar registros técnicos necesarios para el sitio. Para consultas o para ejercer tus derechos, usa el contacto que figura a continuación.'],
  };
  const [title, description] = locale === 'it' || locale === 'zh'
    ? [t('privacyTitle'), t('privacyText')]
    : translation[locale];
  return <section className="section bg-white">
    <div className="container-modern max-w-3xl">
      <h1 className="text-3xl mb-8">{title}</h1>
      <p className="leading-relaxed mb-8">{description}</p>
      <h2 className="text-xl mb-3">{order.title}</h2>
      <p className="leading-relaxed mb-4">{order.text}</p>
      <p className="leading-relaxed mb-8">{campaignData[locale]}</p>
      <p>{company.name} · P. IVA {company.vat}</p>
      <p>{company.address}</p>
      <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>
    </div>
  </section>;
}
