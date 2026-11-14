'use client';

import { useRef, useState } from 'react';
import styles from './ServiceCheckout.module.css';
import { businessServices } from '@/data/business-catalog';

type Locale = 'zh' | 'it';
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
