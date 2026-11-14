import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
import { resolveBusinessLocale } from '@/data/business-catalog';

const orderData = {
  zh: {
    title: '服务订单',
    text: '提交服务订单时，CIAOMIND 使用你填写的公司名称、联系人、邮箱和需求，以及选择的服务、访问来源和提交时间，接收订单并联系你确认范围和报价。订单保存在我们使用的欧盟区域数据库中。我们用网络地址的加密摘要限制重复滥用。你可以通过下列邮箱咨询订单数据的处理。',
  },
  it: {
    title: 'Ordini di servizio',
    text: 'Quando invii un ordine, CIAOMIND usa ragione sociale, referente, email, descrizione, servizio scelto, canale di provenienza e data di invio per registrare l’ordine e contattarti per definire il perimetro e il preventivo. Gli ordini sono conservati in un database in una regione UE. Usiamo un hash dell’indirizzo di rete per limitare gli abusi. Per domande sul trattamento dei dati, scrivi al recapito qui sotto.',
  },
  en: {
    title: 'Service orders',
    text: 'When you submit a service order, CIAOMIND uses the company name, contact person, email address, description, selected service, referral source, and submission time to receive the order and contact you to confirm its scope and quotation. Orders are stored in a database hosted in an EU region. We use a hashed network address to limit repeated abuse. You can contact us at the address below with questions about the processing of order data.',
  },
  fr: {
    title: 'Demandes de service',
    text: 'Lorsque vous envoyez une demande de service, CIAOMIND utilise le nom de l’entreprise, le contact, l’adresse e-mail, la description, le service choisi, la source de la visite et l’heure d’envoi pour recevoir la demande et vous contacter afin d’en confirmer le périmètre et le devis. Les demandes sont conservées dans une base de données hébergée dans une région de l’UE. Nous utilisons une empreinte hachée de l’adresse réseau pour limiter les abus répétés. Pour toute question sur le traitement des données de commande, vous pouvez nous écrire à l’adresse ci-dessous.',
  },
  de: {
    title: 'Serviceaufträge',
    text: 'Wenn Sie einen Serviceauftrag absenden, verwendet CIAOMIND den Unternehmensnamen, die Kontaktperson, die E-Mail-Adresse, die Beschreibung, die ausgewählte Leistung, die Herkunft des Besuchs und den Absendezeitpunkt, um den Auftrag entgegenzunehmen und Sie zur Bestätigung von Umfang und Angebot zu kontaktieren. Die Aufträge werden in einer Datenbank in einer EU-Region gespeichert. Zur Begrenzung wiederholten Missbrauchs verwenden wir einen Hash der Netzwerkadresse. Fragen zur Verarbeitung von Auftragsdaten können Sie an die unten angegebene Adresse richten.',
  },
  es: {
    title: 'Solicitudes de servicio',
    text: 'Cuando envías una solicitud de servicio, CIAOMIND utiliza el nombre de la empresa, la persona de contacto, el correo electrónico, la descripción, el servicio elegido, el canal de procedencia y la hora de envío para recibirla y contactarte con el fin de confirmar el alcance y el presupuesto. Las solicitudes se conservan en una base de datos alojada en una región de la UE. Utilizamos un hash de la dirección de red para limitar los abusos reiterados. Si tienes preguntas sobre el tratamiento de los datos de la solicitud, puedes escribirnos a la dirección indicada a continuación.',
  },
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
      <p className="leading-relaxed mb-8">{order.text}</p>
      <p>{company.name} · P. IVA {company.vat}</p>
      <p>{company.address}</p>
      <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>
    </div>
  </section>;
}
