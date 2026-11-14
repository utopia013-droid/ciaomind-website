'use client';

import { useRef, useState } from 'react';
import styles from './ServiceCheckout.module.css';
import { businessServices, type BusinessLocale } from '@/data/business-catalog';

type Locale = BusinessLocale;
type Props = { locale: Locale; initialService: string; source: string; variant: string };
type OrderResponse = { orderNumber?: unknown };
type TextCopy = {
  eyebrow: string; title: string; intro: string; service: string; choose: string; variant: string; chooseVariant: string; company: string; name: string; email: string; brief: string;
  briefHint: string; submit: string; submitting: string; privacy: string; privacyLink: string; noPayment: string; required: string; failed: string; successTitle: string; success: string;
  order: string; copy: string; copied: string; copyError: string; newOrder: string;
};
const copy = {
  zh: {
    eyebrow: '订单与报价', title: '提交服务订单', intro: '请简要说明你的业务和需要。我们会人工审核需求、确认服务范围，再向你提供书面报价。',
    service: '你需要哪类服务？', choose: '请选择服务', variant: '具体服务类型（可选）', chooseVariant: '请选择具体类型', company: '公司或组织名称', name: '联系人姓名', email: '电子邮箱', brief: '需求说明', briefHint: '例如：目前情况、希望解决的问题和时间安排。请勿填写密码或敏感个人信息。',
    submit: '提交订单', submitting: '正在提交…', privacy: '提交即表示你已阅读隐私说明。', privacyLink: '隐私说明', noPayment: '现在不需要付款。价格、范围及服务时间均以双方确认的书面报价为准。',
    required: '请检查必填信息并重试。', failed: '暂时无法提交，请稍后重试。你的填写内容仍保留。', successTitle: '订单已收到', success: '请保存订单号。团队会通过你填写的邮箱联系你确认范围和报价。', order: '订单号', copy: '复制编号', copied: '已复制', copyError: '无法自动复制，请手动选择编号。', newOrder: '再下一单',
  },
  it: {
    eyebrow: 'Ordine e preventivo', title: 'Invia un ordine di servizio', intro: 'Descrivi brevemente la tua attività e ciò di cui hai bisogno. Esamineremo manualmente la richiesta, definiremo il perimetro e ti invieremo un preventivo scritto.',
    service: 'Di quale servizio hai bisogno?', choose: 'Seleziona un servizio', variant: 'Tipologia specifica (facoltativa)', chooseVariant: 'Seleziona una tipologia', company: 'Nome dell’azienda o organizzazione', name: 'Nome del referente', email: 'Indirizzo email', brief: 'Descrizione della richiesta', briefHint: 'Ad esempio: situazione attuale, obiettivo e tempistiche. Non inserire password o dati personali sensibili.',
    submit: 'Invia l’ordine', submitting: 'Invio in corso…', privacy: 'Inviando confermi di aver letto l’informativa privacy.', privacyLink: 'Informativa privacy', noPayment: 'Non è richiesto alcun pagamento adesso. Prezzo, perimetro e tempi saranno definiti nel preventivo scritto concordato.',
    required: 'Controlla i campi obbligatori e riprova.', failed: 'Al momento non è possibile inviare la richiesta. Riprova più tardi. I campi restano compilati.', successTitle: 'Ordine ricevuto', success: 'Conserva il numero d’ordine. Il team ti contatterà per definire il perimetro e il preventivo.', order: 'Numero d’ordine', copy: 'Copia il numero', copied: 'Copiato', copyError: 'Copia automatica non riuscita. Seleziona il numero manualmente.', newOrder: 'Invia un altro ordine',
  },
  en: {
    eyebrow: 'Order and quotation', title: 'Submit a service request', intro: 'Briefly describe your organization and what you need. We will review the request, confirm the scope, and send you a written quotation.',
    service: 'What service do you need?', choose: 'Select a service', variant: 'Specific service type (optional)', chooseVariant: 'Select a type', company: 'Company or organization name', name: 'Contact name', email: 'Email address', brief: 'Request details', briefHint: 'For example: your current situation, what you want to address, and your timing. Do not enter passwords or sensitive personal information.',
    submit: 'Submit request', submitting: 'Submitting…', privacy: 'By submitting, you confirm that you have read the privacy notice.', privacyLink: 'Privacy notice', noPayment: 'No payment is required now. Price, scope, and timing will be set out in a written quotation agreed by both parties.',
    required: 'Check the required information and try again.', failed: 'We could not submit your request right now. Please try again later. Your entries have been kept.', successTitle: 'Request received', success: 'Save your order number. Our team will contact you by email to confirm the scope and quotation.', order: 'Order number', copy: 'Copy number', copied: 'Copied', copyError: 'Could not copy automatically. Please select the number manually.', newOrder: 'Submit another request',
  },
  fr: {
    eyebrow: 'Demande et devis', title: 'Envoyer une demande de service', intro: 'Décrivez brièvement votre organisation et vos besoins. Nous examinerons la demande, confirmerons le périmètre et vous enverrons un devis écrit.',
    service: 'De quel service avez-vous besoin ?', choose: 'Sélectionnez un service', variant: 'Type de service précis (facultatif)', chooseVariant: 'Sélectionnez un type', company: 'Nom de l’entreprise ou de l’organisation', name: 'Nom du contact', email: 'Adresse e-mail', brief: 'Détails de la demande', briefHint: 'Par exemple : situation actuelle, objectif et délai souhaité. N’indiquez aucun mot de passe ni donnée personnelle sensible.',
    submit: 'Envoyer la demande', submitting: 'Envoi en cours…', privacy: 'En envoyant cette demande, vous confirmez avoir lu la notice de confidentialité.', privacyLink: 'Notice de confidentialité', noPayment: 'Aucun paiement n’est demandé à ce stade. Le prix, le périmètre et les délais figureront dans un devis écrit accepté par les deux parties.',
    required: 'Vérifiez les champs obligatoires et réessayez.', failed: 'Votre demande ne peut pas être envoyée pour le moment. Réessayez plus tard. Vos informations saisies ont été conservées.', successTitle: 'Demande reçue', success: 'Conservez votre numéro de commande. Notre équipe vous contactera par e-mail pour confirmer le périmètre et le devis.', order: 'Numéro de commande', copy: 'Copier le numéro', copied: 'Copié', copyError: 'La copie automatique a échoué. Sélectionnez le numéro manuellement.', newOrder: 'Envoyer une autre demande',
  },
  de: {
    eyebrow: 'Anfrage und Angebot', title: 'Serviceanfrage senden', intro: 'Beschreiben Sie kurz Ihre Organisation und Ihren Bedarf. Wir prüfen die Anfrage, klären den Umfang und senden Ihnen ein schriftliches Angebot.',
    service: 'Welche Leistung benötigen Sie?', choose: 'Leistung auswählen', variant: 'Genaue Leistungsart (optional)', chooseVariant: 'Art auswählen', company: 'Name des Unternehmens oder der Organisation', name: 'Kontaktperson', email: 'E-Mail-Adresse', brief: 'Details zur Anfrage', briefHint: 'Zum Beispiel: aktuelle Situation, gewünschtes Ziel und Zeitrahmen. Bitte keine Passwörter oder sensiblen persönlichen Daten angeben.',
    submit: 'Anfrage senden', submitting: 'Wird gesendet…', privacy: 'Mit dem Absenden bestätigen Sie, dass Sie den Datenschutzhinweis gelesen haben.', privacyLink: 'Datenschutzhinweis', noPayment: 'Jetzt ist keine Zahlung erforderlich. Preis, Umfang und Zeitplan werden in einem schriftlichen, gemeinsam vereinbarten Angebot festgelegt.',
    required: 'Bitte prüfen Sie die Pflichtfelder und versuchen Sie es erneut.', failed: 'Ihre Anfrage kann derzeit nicht gesendet werden. Bitte versuchen Sie es später erneut. Ihre Eingaben bleiben erhalten.', successTitle: 'Anfrage eingegangen', success: 'Bitte bewahren Sie Ihre Auftragsnummer auf. Unser Team kontaktiert Sie per E-Mail, um Umfang und Angebot abzustimmen.', order: 'Auftragsnummer', copy: 'Nummer kopieren', copied: 'Kopiert', copyError: 'Automatisches Kopieren fehlgeschlagen. Bitte markieren Sie die Nummer manuell.', newOrder: 'Weitere Anfrage senden',
  },
  es: {
    eyebrow: 'Solicitud y presupuesto', title: 'Enviar una solicitud de servicio', intro: 'Describe brevemente tu organización y lo que necesitas. Revisaremos la solicitud, confirmaremos el alcance y te enviaremos un presupuesto por escrito.',
    service: '¿Qué servicio necesitas?', choose: 'Selecciona un servicio', variant: 'Tipo de servicio específico (opcional)', chooseVariant: 'Selecciona un tipo', company: 'Nombre de la empresa u organización', name: 'Nombre de contacto', email: 'Correo electrónico', brief: 'Detalles de la solicitud', briefHint: 'Por ejemplo: situación actual, objetivo y plazos. No incluyas contraseñas ni datos personales sensibles.',
    submit: 'Enviar solicitud', submitting: 'Enviando…', privacy: 'Al enviar, confirmas que has leído el aviso de privacidad.', privacyLink: 'Aviso de privacidad', noPayment: 'No se requiere ningún pago ahora. El precio, el alcance y los plazos se establecerán en un presupuesto escrito acordado por ambas partes.',
    required: 'Revisa los campos obligatorios e inténtalo de nuevo.', failed: 'No se pudo enviar la solicitud en este momento. Inténtalo más tarde. Se han conservado los datos introducidos.', successTitle: 'Solicitud recibida', success: 'Guarda tu número de pedido. Nuestro equipo se pondrá en contacto contigo por correo electrónico para confirmar el alcance y el presupuesto.', order: 'Número de pedido', copy: 'Copiar número', copied: 'Copiado', copyError: 'No se pudo copiar automáticamente. Selecciona el número manualmente.', newOrder: 'Enviar otra solicitud',
  },
} satisfies Record<Locale, TextCopy>;

export default function ServiceCheckout({ locale, initialService, source, variant: variantProp }: Props) {
  const t = copy[locale];
  const [service, setService] = useState(initialService);
  const [variant, setVariant] = useState(initialService && businessServices.find(item => item.id === initialService)?.variants.some(item => item.id === variantProp) ? variantProp : '');
  const serviceDefinition = businessServices.find(item => item.id === service);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const submission = useRef({ signature: '', requestId: '' });
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setError('');
    const form = event.currentTarget;
    if (!form.reportValidity()) { setError(t.required); return; }
    if (!window.crypto?.randomUUID) {
      setError(t.failed);
      return;
    }
    submitting.current = true;
    setBusy(true);
    const values = new FormData(form);
    const payload = {
      service,
      company: String(values.get('company') ?? '').trim(),
      name: String(values.get('name') ?? '').trim(),
      email: String(values.get('email') ?? '').trim(),
      brief: String(values.get('brief') ?? '').trim(),
      locale,
      source: source || undefined,
      variant: variant || undefined,
      website: String(values.get('website') ?? ''),
    };
    const signature = JSON.stringify(payload);
    if (submission.current.signature !== signature) {
      submission.current = { signature, requestId: window.crypto.randomUUID() };
    }
    try {
      const response = await fetch('/api/service-orders/', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...payload, requestId: submission.current.requestId }) });
      if (response.status !== 200 && response.status !== 201) throw new Error('order-rejected');
      const result = await response.json() as OrderResponse;
      if (typeof result.orderNumber !== 'string' || !result.orderNumber.trim()) throw new Error('invalid-response');
      setOrderNumber(result.orderNumber.trim());
    } catch {
      setError(t.failed);
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  function startNewOrder() {
    formRef.current?.reset();
    setService('');
    setVariant('');
    setOrderNumber('');
    setError('');
    setCopied(false);
    submission.current = { signature: '', requestId: '' };
  }

  async function copyOrderNumber() {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
    } catch {
      setCopied(false);
      setError(t.copyError);
    }
  }

  if (orderNumber) return <section className={styles.card} aria-labelledby="order-success-title" aria-live="polite">
    <div className={styles.successMark} aria-hidden="true">✓</div>
    <p className={styles.eyebrow}>{t.eyebrow}</p>
    <h2 className={styles.title} id="order-success-title">{t.successTitle}</h2>
    <p className={styles.description}>{t.success}</p>
    <div className={styles.orderBox}>
      <span className={styles.orderLabel}>{t.order}</span>
      <output className={styles.orderNumber} aria-label={t.order}>{orderNumber}</output>
      <button type="button" className={styles.copyButton} onClick={copyOrderNumber}>{copied ? t.copied : t.copy}</button>
    </div>
    <button type="button" className={styles.secondaryButton} onClick={startNewOrder}>{t.newOrder}</button>
    {error ? <p className={styles.error} role="alert">{error}</p> : null}
  </section>;

  return <section className={styles.card} aria-labelledby="order-form-title">
    <p className={styles.eyebrow}>{t.eyebrow}</p>
    <h2 className={styles.title} id="order-form-title">{t.title}</h2>
    <p className={styles.description}>{t.intro}</p>
    <form ref={formRef} onSubmit={submit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="service-order-service">{t.service} <span aria-hidden="true">*</span></label>
        <select id="service-order-service" name="service" value={service} onChange={e => { setService(e.target.value); setVariant(''); }} required>
          <option value="">{t.choose}</option>
          {businessServices.map(item => <option value={item.id} key={item.id}>{item.name[locale]}</option>)}
        </select>
      </div>
      {serviceDefinition?.variants.length ? <div className={styles.field}>
        <label htmlFor="service-order-variant">{t.variant}</label>
        <select id="service-order-variant" name="variant" value={variant} onChange={e => setVariant(e.target.value)}>
          <option value="">{t.chooseVariant}</option>
          {serviceDefinition.variants.map(item => <option value={item.id} key={item.id}>{item.label[locale]}</option>)}
        </select>
      </div> : null}
      <div className={styles.field}>
        <label htmlFor="service-order-company">{t.company} <span aria-hidden="true">*</span></label>
        <input id="service-order-company" name="company" autoComplete="organization" maxLength={120} required aria-describedby="service-order-errors" />
      </div>
      <div className={styles.field}>
        <label htmlFor="service-order-name">{t.name} <span aria-hidden="true">*</span></label>
        <input id="service-order-name" name="name" autoComplete="name" maxLength={100} required aria-describedby="service-order-errors" />
      </div>
      <div className={styles.field}>
        <label htmlFor="service-order-email">{t.email} <span aria-hidden="true">*</span></label>
        <input id="service-order-email" name="email" type="email" autoComplete="email" maxLength={254} required aria-describedby="service-order-errors" />
      </div>
      <div className={`${styles.field} ${styles.full}`}>
        <label htmlFor="service-order-brief">{t.brief} <span aria-hidden="true">*</span></label>
        <textarea id="service-order-brief" name="brief" rows={5} maxLength={1200} required aria-describedby="service-order-hint service-order-errors" />
        <p className={styles.hint} id="service-order-hint">{t.briefHint}</p>
      </div>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="service-order-website">Website</label>
        <input id="service-order-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.full}>
        {error ? <p id="service-order-errors" className={styles.error} role="alert">{error}</p> : <span id="service-order-errors" className={styles.srOnly}>{t.required}</span>}
        <button type="submit" className={styles.submitButton} disabled={busy || !service}>{busy ? t.submitting : t.submit}</button>
        <p className={styles.notice}>{t.noPayment}</p>
        <p className={styles.privacy}>{t.privacy} <a href={`/${locale}/privacy/`}>{t.privacyLink}</a></p>
      </div>
    </form>
  </section>;
}
