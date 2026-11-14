'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import styles from './ServiceCheckout.module.css';
import { businessServices, type BusinessLocale } from '@/data/business-catalog';
import { structureReview } from '@/data/global-catalog';
import { formatServicePrice, getServicePrice, priceVersion, pricingCopy } from '@/data/service-prices';

type Locale = BusinessLocale;
type Props = { locale: Locale; initialService: string; source: string; variant: string; checkout?: boolean };
type OrderResponse = { orderNumber?: unknown };
type TextCopy = {
  eyebrow: string; title: string; intro: string; service: string; choose: string; variant: string; chooseVariant: string; company: string; name: string; email: string; brief: string;
  briefHint: string; submit: string; submitting: string; privacy: string; privacyLink: string; noPayment: string; required: string; failed: string; successTitle: string; success: string;
  order: string; copy: string; copied: string; copyError: string; newOrder: string;
  reviewTitle: string; reviewIntro: string; reviewVariant: string; reviewCompany: string; reviewBriefHint: string; reviewSubmit: string; reviewSubmitting: string; reviewSuccessTitle: string; reviewSuccess: string; caseNumber: string; newReview: string; reviewNotice: string;
  checkoutCompany: string; confirmCompany: string; companyMismatch: string; checkoutSubmit: string; checkoutNotice: string; checkoutLink: string;
  checkoutTitle: string;
};
const copy = {
  zh: {
    eyebrow: '订单与报价', title: '提交服务订单', intro: '请简要说明你的业务和需要。我们会人工审核需求、确认服务范围，再向你提供书面报价。',
    service: '你需要哪类服务？', choose: '请选择服务', variant: '具体服务类型（可选）', chooseVariant: '请选择具体类型', company: '公司或组织名称', name: '联系人姓名', email: '电子邮箱', brief: '需求说明', briefHint: '例如：目前情况、希望解决的问题和时间安排。请勿填写密码或敏感个人信息。',
    submit: '提交订单', submitting: '正在提交…', privacy: '提交即表示你已阅读隐私说明。', privacyLink: '隐私说明', noPayment: '现在不需要付款。价格、范围及服务时间均以双方确认的书面报价为准。',
    required: '请检查必填信息并重试。', failed: '暂时无法提交，请稍后重试。你的填写内容仍保留。', successTitle: '订单已收到', success: '请保存订单号。团队会通过你填写的邮箱联系你确认范围和报价。', order: '订单号', copy: '复制编号', copied: '已复制', copyError: '无法自动复制，请手动选择编号。', newOrder: '再下一单',
    reviewTitle: '申请跨境架构评估', reviewIntro: '请提供拟议项目名称和希望评估的司法辖区与问题。此申请仅用于初步评估，不收费且不保证实施或注册。请勿提交税号、银行资料、身份证件或信托契约。', reviewVariant: '拟评估的司法辖区与类型', reviewCompany: '公司或拟议项目名称', reviewBriefHint: '描述项目背景、涉及的国家/地区和需要梳理的问题。请勿填写税号、银行资料、身份证件、信托契约或其他敏感信息。', reviewSubmit: '提交评估申请', reviewSubmitting: '正在提交评估申请…', reviewSuccessTitle: '评估申请已收到', reviewSuccess: '请保存案件编号。我们会通过你填写的邮箱联系你确认是否可提供评估及其范围。此回执仅确认收到申请，不代表接受委托或保证执行。', caseNumber: '案件编号', newReview: '提交另一项评估申请', reviewNotice: '提交评估申请不收费；这不构成服务报价、委托接受或执行承诺。',
    checkoutCompany: '公司法定名称（尚未设立时请填写拟议名称）', confirmCompany: '再次填写公司法定名称或拟议名称', companyMismatch: '两次填写的名称不一致，请核对。', checkoutSubmit: '确认详情并提交订单需求', checkoutNotice: '当前未配置在线支付。提交只会发送订单需求并生成回执，不会收款。该价格为未含 IVA 的套餐金额；团队将人工确认范围。',
    checkoutLink: '继续填写套餐订单',
    checkoutTitle: '套餐结账',
  },
  it: {
    eyebrow: 'Ordine e preventivo', title: 'Invia un ordine di servizio', intro: 'Descrivi brevemente la tua attività e ciò di cui hai bisogno. Esamineremo manualmente la richiesta, definiremo il perimetro e ti invieremo un preventivo scritto.',
    service: 'Di quale servizio hai bisogno?', choose: 'Seleziona un servizio', variant: 'Tipologia specifica (facoltativa)', chooseVariant: 'Seleziona una tipologia', company: 'Nome dell’azienda o organizzazione', name: 'Nome del referente', email: 'Indirizzo email', brief: 'Descrizione della richiesta', briefHint: 'Ad esempio: situazione attuale, obiettivo e tempistiche. Non inserire password o dati personali sensibili.',
    submit: 'Invia l’ordine', submitting: 'Invio in corso…', privacy: 'Inviando confermi di aver letto l’informativa privacy.', privacyLink: 'Informativa privacy', noPayment: 'Non è richiesto alcun pagamento adesso. Prezzo, perimetro e tempi saranno definiti nel preventivo scritto concordato.',
    required: 'Controlla i campi obbligatori e riprova.', failed: 'Al momento non è possibile inviare la richiesta. Riprova più tardi. I campi restano compilati.', successTitle: 'Ordine ricevuto', success: 'Conserva il numero d’ordine. Il team ti contatterà per definire il perimetro e il preventivo.', order: 'Numero d’ordine', copy: 'Copia il numero', copied: 'Copiato', copyError: 'Copia automatica non riuscita. Seleziona il numero manualmente.', newOrder: 'Invia un altro ordine',
    reviewTitle: 'Richiedi una valutazione della struttura transfrontaliera', reviewIntro: 'Indica il nome del progetto proposto e le giurisdizioni e questioni da valutare. La richiesta serve per una valutazione preliminare, non prevede costi e non garantisce esecuzione o costituzione. Non inviare codici fiscali, dati bancari, documenti d’identità o atti fiduciari.', reviewVariant: 'Giurisdizione e tipologia da valutare', reviewCompany: 'Nome dell’azienda o del progetto proposto', reviewBriefHint: 'Descrivi il progetto, i Paesi coinvolti e le questioni da esaminare. Non inserire codici fiscali, dati bancari, documenti d’identità, atti fiduciari o altri dati sensibili.', reviewSubmit: 'Invia la richiesta di valutazione', reviewSubmitting: 'Invio della richiesta di valutazione…', reviewSuccessTitle: 'Richiesta di valutazione ricevuta', reviewSuccess: 'Conserva il numero della pratica. Ti contatteremo via e-mail per confermare se possiamo svolgere la valutazione e il relativo perimetro. Questa ricevuta conferma solo la ricezione della richiesta, non l’accettazione dell’incarico o la sua esecuzione.', caseNumber: 'Numero della pratica', newReview: 'Invia un’altra richiesta di valutazione', reviewNotice: 'La richiesta di valutazione è gratuita; non costituisce un preventivo, l’accettazione dell’incarico o un impegno all’esecuzione.',
    checkoutCompany: 'Ragione sociale (o denominazione proposta se non ancora costituita)', confirmCompany: 'Inserisci nuovamente la ragione sociale o denominazione proposta', companyMismatch: 'I due nomi non corrispondono. Controlla e riprova.', checkoutSubmit: 'Conferma i dettagli e invia la richiesta', checkoutNotice: 'Il pagamento online non è configurato. L’invio trasmette solo la richiesta e genera una ricevuta; non viene effettuato alcun addebito. Il prezzo del pacchetto è al netto dell’IVA e il perimetro sarà confermato manualmente.',
    checkoutLink: 'Continua con l’ordine del pacchetto',
    checkoutTitle: 'Checkout del pacchetto',
  },
  en: {
    eyebrow: 'Order and quotation', title: 'Submit a service request', intro: 'Briefly describe your organization and what you need. We will review the request, confirm the scope, and send you a written quotation.',
    service: 'What service do you need?', choose: 'Select a service', variant: 'Specific service type (optional)', chooseVariant: 'Select a type', company: 'Company or organization name', name: 'Contact name', email: 'Email address', brief: 'Request details', briefHint: 'For example: your current situation, what you want to address, and your timing. Do not enter passwords or sensitive personal information.',
    submit: 'Submit request', submitting: 'Submitting…', privacy: 'By submitting, you confirm that you have read the privacy notice.', privacyLink: 'Privacy notice', noPayment: 'No payment is required now. Price, scope, and timing will be set out in a written quotation agreed by both parties.',
    required: 'Check the required information and try again.', failed: 'We could not submit your request right now. Please try again later. Your entries have been kept.', successTitle: 'Request received', success: 'Save your order number. Our team will contact you by email to confirm the scope and quotation.', order: 'Order number', copy: 'Copy number', copied: 'Copied', copyError: 'Could not copy automatically. Please select the number manually.', newOrder: 'Submit another request',
    reviewTitle: 'Request a cross-border structure assessment', reviewIntro: 'Enter the proposed project name and the jurisdictions and questions to assess. This is a preliminary assessment request, with no fee and no guarantee of implementation or formation. Do not submit tax IDs, bank details, identity documents, or trust deeds.', reviewVariant: 'Jurisdictions and structures to assess', reviewCompany: 'Company or proposed project name', reviewBriefHint: 'Describe the project, countries involved, and questions to review. Do not enter tax IDs, bank details, identity documents, trust deeds, or other sensitive information.', reviewSubmit: 'Submit assessment request', reviewSubmitting: 'Submitting assessment request…', reviewSuccessTitle: 'Assessment request received', reviewSuccess: 'Save your case number. We will contact you by email to confirm whether we can provide an assessment and define its scope. This receipt confirms that we received your request; it does not mean we accepted an engagement or guarantee execution.', caseNumber: 'Case number', newReview: 'Submit another assessment request', reviewNotice: 'The assessment request is free. It is not a quotation, acceptance of an engagement, or commitment to execute.',
    checkoutCompany: 'Legal company name (or proposed name if not yet formed)', confirmCompany: 'Enter the legal or proposed company name again', companyMismatch: 'The names do not match. Please check and try again.', checkoutSubmit: 'Confirm details and submit order request', checkoutNotice: 'Online payment is not configured. Submitting sends an order request and creates a receipt only; no payment will be collected. The package price excludes VAT, and the team will confirm the scope manually.',
    checkoutLink: 'Continue to package order',
    checkoutTitle: 'Package checkout',
  },
  fr: {
    eyebrow: 'Demande et devis', title: 'Envoyer une demande de service', intro: 'Décrivez brièvement votre organisation et vos besoins. Nous examinerons la demande, confirmerons le périmètre et vous enverrons un devis écrit.',
    service: 'De quel service avez-vous besoin ?', choose: 'Sélectionnez un service', variant: 'Type de service précis (facultatif)', chooseVariant: 'Sélectionnez un type', company: 'Nom de l’entreprise ou de l’organisation', name: 'Nom du contact', email: 'Adresse e-mail', brief: 'Détails de la demande', briefHint: 'Par exemple : situation actuelle, objectif et délai souhaité. N’indiquez aucun mot de passe ni donnée personnelle sensible.',
    submit: 'Envoyer la demande', submitting: 'Envoi en cours…', privacy: 'En envoyant cette demande, vous confirmez avoir lu la notice de confidentialité.', privacyLink: 'Notice de confidentialité', noPayment: 'Aucun paiement n’est demandé à ce stade. Le prix, le périmètre et les délais figureront dans un devis écrit accepté par les deux parties.',
    required: 'Vérifiez les champs obligatoires et réessayez.', failed: 'Votre demande ne peut pas être envoyée pour le moment. Réessayez plus tard. Vos informations saisies ont été conservées.', successTitle: 'Demande reçue', success: 'Conservez votre numéro de commande. Notre équipe vous contactera par e-mail pour confirmer le périmètre et le devis.', order: 'Numéro de commande', copy: 'Copier le numéro', copied: 'Copié', copyError: 'La copie automatique a échoué. Sélectionnez le numéro manuellement.', newOrder: 'Envoyer une autre demande',
    reviewTitle: 'Demander une évaluation de structure transfrontalière', reviewIntro: 'Indiquez le nom du projet envisagé, les juridictions et les questions à examiner. Cette demande concerne une évaluation préliminaire, sans frais et sans garantie de mise en œuvre ou de constitution. N’envoyez pas de numéros fiscaux, coordonnées bancaires, pièces d’identité ou actes de fiducie.', reviewVariant: 'Juridictions et structures à évaluer', reviewCompany: 'Nom de l’entreprise ou du projet envisagé', reviewBriefHint: 'Décrivez le projet, les pays concernés et les questions à examiner. N’indiquez aucun numéro fiscal, donnée bancaire, pièce d’identité, acte de fiducie ni autre donnée sensible.', reviewSubmit: 'Envoyer la demande d’évaluation', reviewSubmitting: 'Envoi de la demande d’évaluation…', reviewSuccessTitle: 'Demande d’évaluation reçue', reviewSuccess: 'Conservez le numéro de dossier. Nous vous contacterons par e-mail pour confirmer si nous pouvons réaliser l’évaluation et en définir le périmètre. Cet accusé confirme uniquement la réception de la demande et ne vaut pas acceptation de mission ni garantie d’exécution.', caseNumber: 'Numéro de dossier', newReview: 'Envoyer une autre demande d’évaluation', reviewNotice: 'La demande d’évaluation est gratuite. Elle ne constitue ni un devis, ni une acceptation de mission, ni un engagement d’exécution.',
    checkoutCompany: 'Dénomination légale (ou nom envisagé si l’entreprise n’est pas encore créée)', confirmCompany: 'Saisissez à nouveau la dénomination légale ou envisagée', companyMismatch: 'Les deux noms ne correspondent pas. Vérifiez puis réessayez.', checkoutSubmit: 'Confirmer les détails et envoyer la demande', checkoutNotice: 'Le paiement en ligne n’est pas configuré. L’envoi transmet uniquement une demande et génère un accusé de réception ; aucun paiement ne sera effectué. Le prix du forfait est hors TVA et le périmètre sera confirmé manuellement.',
    checkoutLink: 'Continuer vers la commande du forfait',
    checkoutTitle: 'Commande du forfait',
  },
  de: {
    eyebrow: 'Anfrage und Angebot', title: 'Serviceanfrage senden', intro: 'Beschreiben Sie kurz Ihre Organisation und Ihren Bedarf. Wir prüfen die Anfrage, klären den Umfang und senden Ihnen ein schriftliches Angebot.',
    service: 'Welche Leistung benötigen Sie?', choose: 'Leistung auswählen', variant: 'Genaue Leistungsart (optional)', chooseVariant: 'Art auswählen', company: 'Name des Unternehmens oder der Organisation', name: 'Kontaktperson', email: 'E-Mail-Adresse', brief: 'Details zur Anfrage', briefHint: 'Zum Beispiel: aktuelle Situation, gewünschtes Ziel und Zeitrahmen. Bitte keine Passwörter oder sensiblen persönlichen Daten angeben.',
    submit: 'Anfrage senden', submitting: 'Wird gesendet…', privacy: 'Mit dem Absenden bestätigen Sie, dass Sie den Datenschutzhinweis gelesen haben.', privacyLink: 'Datenschutzhinweis', noPayment: 'Jetzt ist keine Zahlung erforderlich. Preis, Umfang und Zeitplan werden in einem schriftlichen, gemeinsam vereinbarten Angebot festgelegt.',
    required: 'Bitte prüfen Sie die Pflichtfelder und versuchen Sie es erneut.', failed: 'Ihre Anfrage kann derzeit nicht gesendet werden. Bitte versuchen Sie es später erneut. Ihre Eingaben bleiben erhalten.', successTitle: 'Anfrage eingegangen', success: 'Bitte bewahren Sie Ihre Auftragsnummer auf. Unser Team kontaktiert Sie per E-Mail, um Umfang und Angebot abzustimmen.', order: 'Auftragsnummer', copy: 'Nummer kopieren', copied: 'Kopiert', copyError: 'Automatisches Kopieren fehlgeschlagen. Bitte markieren Sie die Nummer manuell.', newOrder: 'Weitere Anfrage senden',
    reviewTitle: 'Grenzüberschreitende Strukturprüfung anfragen', reviewIntro: 'Nennen Sie den geplanten Projektnamen sowie die zu prüfenden Rechtsordnungen und Fragen. Dies ist eine erste Einschätzung ohne Gebühr und ohne Garantie für Umsetzung oder Gründung. Bitte übermitteln Sie keine Steuer- oder Bankdaten, Ausweisdokumente oder Treuhandurkunden.', reviewVariant: 'Zu prüfende Rechtsordnungen und Strukturen', reviewCompany: 'Name des Unternehmens oder geplanten Projekts', reviewBriefHint: 'Beschreiben Sie das Projekt, die beteiligten Länder und Ihre Fragen. Bitte keine Steuer- oder Bankdaten, Ausweisdokumente, Treuhandurkunden oder andere sensible Angaben eintragen.', reviewSubmit: 'Prüfanfrage senden', reviewSubmitting: 'Prüfanfrage wird gesendet…', reviewSuccessTitle: 'Prüfanfrage eingegangen', reviewSuccess: 'Bitte bewahren Sie die Vorgangsnummer auf. Wir kontaktieren Sie per E-Mail, um zu klären, ob wir die Prüfung anbieten können und welchen Umfang sie hat. Diese Eingangsbestätigung bestätigt nur den Erhalt der Anfrage; sie bedeutet keine Mandatsannahme und garantiert keine Umsetzung.', caseNumber: 'Vorgangsnummer', newReview: 'Weitere Prüfanfrage senden', reviewNotice: 'Die Prüfanfrage ist kostenlos. Sie ist weder ein Angebot noch eine Mandatsannahme oder Zusage zur Ausführung.',
    checkoutCompany: 'Rechtlicher Firmenname (oder geplanter Name bei noch nicht erfolgter Gründung)', confirmCompany: 'Rechtlichen oder geplanten Firmennamen erneut eingeben', companyMismatch: 'Die Namen stimmen nicht überein. Bitte prüfen und erneut versuchen.', checkoutSubmit: 'Angaben bestätigen und Anfrage senden', checkoutNotice: 'Online-Zahlung ist nicht eingerichtet. Beim Absenden wird nur eine Anfrage übermittelt und eine Bestätigung erstellt; es wird kein Geld eingezogen. Der Paketpreis versteht sich zuzüglich MwSt.; der Umfang wird manuell bestätigt.',
    checkoutLink: 'Weiter zur Paketbestellung',
    checkoutTitle: 'Paketbestellung',
  },
  es: {
    eyebrow: 'Solicitud y presupuesto', title: 'Enviar una solicitud de servicio', intro: 'Describe brevemente tu organización y lo que necesitas. Revisaremos la solicitud, confirmaremos el alcance y te enviaremos un presupuesto por escrito.',
    service: '¿Qué servicio necesitas?', choose: 'Selecciona un servicio', variant: 'Tipo de servicio específico (opcional)', chooseVariant: 'Selecciona un tipo', company: 'Nombre de la empresa u organización', name: 'Nombre de contacto', email: 'Correo electrónico', brief: 'Detalles de la solicitud', briefHint: 'Por ejemplo: situación actual, objetivo y plazos. No incluyas contraseñas ni datos personales sensibles.',
    submit: 'Enviar solicitud', submitting: 'Enviando…', privacy: 'Al enviar, confirmas que has leído el aviso de privacidad.', privacyLink: 'Aviso de privacidad', noPayment: 'No se requiere ningún pago ahora. El precio, el alcance y los plazos se establecerán en un presupuesto escrito acordado por ambas partes.',
    required: 'Revisa los campos obligatorios e inténtalo de nuevo.', failed: 'No se pudo enviar la solicitud en este momento. Inténtalo más tarde. Se han conservado los datos introducidos.', successTitle: 'Solicitud recibida', success: 'Guarda tu número de pedido. Nuestro equipo se pondrá en contacto contigo por correo electrónico para confirmar el alcance y el presupuesto.', order: 'Número de pedido', copy: 'Copiar número', copied: 'Copiado', copyError: 'No se pudo copiar automáticamente. Selecciona el número manualmente.', newOrder: 'Enviar otra solicitud',
    reviewTitle: 'Solicitar una evaluación de estructura transfronteriza', reviewIntro: 'Indica el nombre del proyecto propuesto, las jurisdicciones y las cuestiones que quieres evaluar. Es una solicitud de evaluación preliminar, sin coste y sin garantía de implementación o constitución. No envíes identificaciones fiscales, datos bancarios, documentos de identidad ni escrituras de fideicomiso.', reviewVariant: 'Jurisdicciones y estructuras que evaluar', reviewCompany: 'Nombre de la empresa o del proyecto propuesto', reviewBriefHint: 'Describe el proyecto, los países implicados y las cuestiones que quieres revisar. No incluyas identificaciones fiscales, datos bancarios, documentos de identidad, escrituras de fideicomiso ni otros datos sensibles.', reviewSubmit: 'Enviar solicitud de evaluación', reviewSubmitting: 'Enviando solicitud de evaluación…', reviewSuccessTitle: 'Solicitud de evaluación recibida', reviewSuccess: 'Guarda el número de expediente. Nos pondremos en contacto contigo por correo electrónico para confirmar si podemos realizar la evaluación y definir su alcance. Este acuse solo confirma la recepción de la solicitud; no implica la aceptación del encargo ni garantiza su ejecución.', caseNumber: 'Número de expediente', newReview: 'Enviar otra solicitud de evaluación', reviewNotice: 'La solicitud de evaluación es gratuita; no constituye un presupuesto, la aceptación del encargo ni un compromiso de ejecución.',
    checkoutCompany: 'Nombre legal de la empresa (o nombre propuesto si aún no está constituida)', confirmCompany: 'Vuelve a escribir el nombre legal o propuesto de la empresa', companyMismatch: 'Los nombres no coinciden. Compruébalos e inténtalo de nuevo.', checkoutSubmit: 'Confirmar los datos y enviar la solicitud', checkoutNotice: 'El pago en línea no está configurado. Al enviar solo se transmite una solicitud y se genera un acuse; no se cobrará ningún importe. El precio del paquete no incluye IVA y el alcance se confirmará manualmente.',
    checkoutLink: 'Continuar al pedido del paquete',
    checkoutTitle: 'Pedido del paquete',
  },
} satisfies Record<Locale, TextCopy>;

export default function ServiceCheckout({ locale, initialService, source, variant: variantProp, checkout = false }: Props) {
  const t = copy[locale];
  const services = [...businessServices, structureReview];
  const [service, setService] = useState(initialService);
  const [variant, setVariant] = useState(initialService && services.find(item => item.id === initialService)?.variants.some(item => item.id === variantProp) ? variantProp : '');
  const serviceDefinition = services.find(item => item.id === service);
  const isStructureReview = service === structureReview.id;
  const selectedPrice = getServicePrice(service, variant);
  const isCheckout = checkout && Boolean(selectedPrice);
  const priceText = pricingCopy[locale];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [companyMismatch, setCompanyMismatch] = useState(false);
  const submission = useRef({ signature: '', requestId: '' });
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedPrice && !isCheckout) return;
    if (submitting.current) return;
    setError('');
    const form = event.currentTarget;
    if (isCheckout) {
      const values = new FormData(form);
      const company = String(values.get('company') ?? '');
      const confirmation = String(values.get('companyConfirmation') ?? '');
      const normalize = (value: string) => value.normalize('NFC').trim().replace(/\s+/g, ' ');
      const mismatch = Boolean(confirmation.trim()) && normalize(company) !== normalize(confirmation);
      setCompanyMismatch(mismatch);
      (form.elements.namedItem('companyConfirmation') as HTMLInputElement | null)?.setCustomValidity(mismatch ? t.companyMismatch : '');
    }
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
      ...(isCheckout ? { companyConfirmation: String(values.get('companyConfirmation') ?? '').trim() } : {}),
      name: String(values.get('name') ?? '').trim(),
      email: String(values.get('email') ?? '').trim(),
      brief: String(values.get('brief') ?? '').trim(),
      locale,
      source: source || undefined,
      variant: variant || undefined,
      priceVersion: selectedPrice ? priceVersion : undefined,
      website: String(values.get('website') ?? ''),
    };
    const signature = JSON.stringify(payload);
    if (submission.current.signature !== signature) {
      submission.current = { signature, requestId: window.crypto.randomUUID() };
    }
    try {
      const response = await fetch('/api/service-orders/', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...payload, requestId: submission.current.requestId }) });
      if (response.status === 409) {
        const conflict = await response.json() as { error?: string };
        if (conflict.error === 'price_changed') {
          setError(priceText.changed);
          return;
        }
      }
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
    setCompanyMismatch(false);
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
    <h2 className={styles.title} id="order-success-title">{isStructureReview ? t.reviewSuccessTitle : t.successTitle}</h2>
    <p className={styles.description}>{isStructureReview ? t.reviewSuccess : t.success}</p>
    {selectedPrice && <p className={styles.description}>{selectedPrice.label[locale]} · {priceText.from} {formatServicePrice(selectedPrice.amountCents, locale)} · {selectedPrice.unit[locale]} · {priceText.tax}</p>}
    <div className={styles.orderBox}>
      <span className={styles.orderLabel}>{isStructureReview ? t.caseNumber : t.order}</span>
      <output className={styles.orderNumber} aria-label={isStructureReview ? t.caseNumber : t.order}>{orderNumber}</output>
      <button type="button" className={styles.copyButton} onClick={copyOrderNumber}>{copied ? t.copied : t.copy}</button>
    </div>
    <button type="button" className={styles.secondaryButton} onClick={startNewOrder}>{isStructureReview ? t.newReview : t.newOrder}</button>
    {error ? <p className={styles.error} role="alert">{error}</p> : null}
  </section>;

  return <section className={styles.card} aria-labelledby="order-form-title">
    <p className={styles.eyebrow}>{t.eyebrow}</p>
    {isCheckout ? <h1 className={styles.title} id="order-form-title">{t.checkoutTitle}</h1> : <h2 className={styles.title} id="order-form-title">{isStructureReview ? t.reviewTitle : t.title}</h2>}
    <p className={styles.description}>{isStructureReview ? t.reviewIntro : t.intro}</p>
    <div className={isCheckout ? styles.checkoutLayout : undefined}>
    {isCheckout && selectedPrice ? <aside className={styles.priceSummary + ' ' + styles.checkoutSummary} aria-label={selectedPrice.label[locale]}>
      <span className={styles.summaryEyebrow}>{locale === 'zh' ? '已选套餐' : locale === 'it' ? 'Pacchetto selezionato' : locale === 'fr' ? 'Forfait choisi' : locale === 'de' ? 'Ausgewähltes Paket' : locale === 'es' ? 'Paquete seleccionado' : 'Selected package'}</span>
      <h3>{selectedPrice.label[locale]}</h3>
      <p className={styles.priceAmount}>{priceText.from} {formatServicePrice(selectedPrice.amountCents, locale)} <span>{priceText.tax}</span></p>
      <p className={styles.summaryUnit}>{selectedPrice.unit[locale]}</p>
      <div className={styles.summaryDetail}><strong>{locale === 'zh' ? '套餐包含' : locale === 'it' ? 'Incluso' : locale === 'fr' ? 'Inclus' : locale === 'de' ? 'Enthalten' : locale === 'es' ? 'Incluye' : 'Included'}</strong><p>{selectedPrice.includes[locale]}</p></div>
      <div className={styles.summaryDetail}><strong>{locale === 'zh' ? '不包含' : locale === 'it' ? 'Escluso' : locale === 'fr' ? 'Non inclus' : locale === 'de' ? 'Nicht enthalten' : locale === 'es' ? 'No incluido' : 'Not included'}</strong><p>{selectedPrice.excludes[locale]}</p></div>
      <p className={styles.checkoutPayment}>{t.checkoutNotice}</p>
    </aside> : null}
    <form ref={formRef} onSubmit={submit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="service-order-service">{t.service} <span aria-hidden="true">*</span></label>
        <select id="service-order-service" name="service" value={service} disabled={busy || isCheckout} onChange={e => { setService(e.target.value); setVariant(''); }} required>
          <option value="">{t.choose}</option>
          {services.map(item => <option value={item.id} key={item.id}>{item.name[locale]}</option>)}
        </select>
      </div>
      {serviceDefinition?.variants.length ? <div className={styles.field}>
        <label htmlFor="service-order-variant">{isStructureReview ? t.reviewVariant : t.variant} {isStructureReview ? <span aria-hidden="true">*</span> : null}</label>
        <select id="service-order-variant" name="variant" value={variant} disabled={busy || isCheckout} onChange={e => setVariant(e.target.value)} required={isStructureReview}>
          <option value="">{t.chooseVariant}</option>
          {serviceDefinition.variants.map(item => <option value={item.id} key={item.id}>{item.label[locale]}</option>)}
        </select>
      </div> : null}
      {selectedPrice && !isCheckout && <aside className={styles.priceSummary + ' ' + styles.full} aria-live="polite">
        <strong>{selectedPrice.label[locale]}</strong>
        <p className={styles.priceAmount}>{priceText.from} {formatServicePrice(selectedPrice.amountCents, locale)} · {selectedPrice.unit[locale]} · {priceText.tax}</p>
        <p>{selectedPrice.includes[locale]}</p>
        <p>{selectedPrice.excludes[locale]}</p>
      </aside>}
      <div className={styles.field}>
        <label htmlFor="service-order-company">{isCheckout ? t.checkoutCompany : isStructureReview ? t.reviewCompany : t.company} <span aria-hidden="true">*</span></label>
        <input id="service-order-company" name="company" autoComplete="organization" maxLength={120} required aria-describedby="service-order-errors" onChange={event => {
          const confirmationInput = formRef.current?.elements.namedItem('companyConfirmation') as HTMLInputElement | null;
          if (!confirmationInput) return;
          const normalize = (value: string) => value.normalize('NFC').trim().replace(/\s+/g, ' ');
          const mismatch = Boolean(confirmationInput.value.trim()) && normalize(event.currentTarget.value) !== normalize(confirmationInput.value);
          confirmationInput.setCustomValidity(mismatch ? t.companyMismatch : '');
          setCompanyMismatch(mismatch);
        }} />
      </div>
      {isCheckout ? <div className={styles.field}>
        <label htmlFor="service-order-company-confirmation">{t.confirmCompany} <span aria-hidden="true">*</span></label>
        <input id="service-order-company-confirmation" name="companyConfirmation" autoComplete="off" maxLength={120} required aria-invalid={companyMismatch} aria-describedby="service-order-company-confirmation-error" onChange={event => {
          const companyInput = formRef.current?.elements.namedItem('company') as HTMLInputElement | null;
          const normalize = (value: string) => value.normalize('NFC').trim().replace(/\s+/g, ' ');
          const mismatch = Boolean(event.currentTarget.value.trim()) && normalize(companyInput?.value ?? '') !== normalize(event.currentTarget.value);
          event.currentTarget.setCustomValidity(mismatch ? t.companyMismatch : '');
          setCompanyMismatch(mismatch);
        }} />
        <p id="service-order-company-confirmation-error" className={companyMismatch ? styles.error : styles.srOnly} aria-live="polite">{companyMismatch ? t.companyMismatch : ''}</p>
      </div> : null}
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
        <p className={styles.hint} id="service-order-hint">{isStructureReview ? t.reviewBriefHint : t.briefHint}</p>
      </div>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="service-order-website">Website</label>
        <input id="service-order-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.full}>
        {error ? <p id="service-order-errors" className={styles.error} role="alert">{error}</p> : <span id="service-order-errors" className={styles.srOnly}>{t.required}</span>}
        {selectedPrice && !isCheckout ? <Link className={styles.submitButton} href={`/${locale}/order/?${new URLSearchParams({ service, variant, ...(source ? { utm_source: source } : {}) })}`}>{t.checkoutLink}</Link> : <button type="submit" className={styles.submitButton} disabled={busy || !service}>{busy ? (isStructureReview ? t.reviewSubmitting : t.submitting) : (isStructureReview ? t.reviewSubmit : isCheckout ? t.checkoutSubmit : t.submit)}</button>}
        {!isCheckout ? <p className={styles.notice}>{isStructureReview ? t.reviewNotice : selectedPrice ? priceText.quote : t.noPayment}</p> : null}
        <p className={styles.privacy}>{t.privacy} <a href={`/${locale}/privacy/`}>{t.privacyLink}</a></p>
      </div>
    </form>
    </div>
  </section>;
}
