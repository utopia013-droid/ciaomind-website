'use client';

import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Locale } from '@/lib/i18n';
import styles from './HeritagePilotForm.module.css';

type Role = 'brand' | 'rights-holder';
type Props = { locale: Locale; initialRole: Role; source: string; quoteNotice: string };

const copy: Record<Locale, {
  formTitle: string; role: string; brand: string; rightsHolder: string; organization: string; contact: string; email: string;
  brief: string; brandPrompt: string; rightsPrompt: string; safeNote: string; submit: string; submitting: string;
  required: string; failed: string; successTitle: string; success: string; order: string; privacy: string; privacyLink: string;
}> = {
  zh: {
    formTitle: '项目申请', role: '申请身份', brand: '品牌方', rightsHolder: '权利方', organization: '组织或公司名称', contact: '联系人姓名', email: '联系邮箱',
    brief: '项目简介', brandPrompt: '产品或品牌：\n试点预算范围：\n计划上市时间：\n目标市场：\n希望验证的目标：',
    rightsPrompt: '文化资产或内容：\n权利方（如已知）：\n拟议用途：\n目标市场：\n希望讨论的问题：',
    safeNote: '请勿上传文件，也不要填写身份证件、税号、银行信息、未公开的机密材料或其他敏感信息。',
    submit: '提交申请', submitting: '正在提交…', required: '请检查必填内容后重试。', failed: '申请未能确认送达。请稍后重试；已填写内容会保留。',
    successTitle: '申请已收到', success: '这是系统收到申请的回执，不表示我们已接受委托或承诺执行。请保存申请编号；我们会通过邮箱联系你讨论范围和书面报价。',
    order: '申请编号', privacy: '提交即表示你已阅读隐私说明。', privacyLink: '查看隐私说明',
  },
  it: {
    formTitle: 'Richiesta del progetto', role: 'Ruolo del richiedente', brand: 'Brand', rightsHolder: 'Titolare dei diritti', organization: 'Organizzazione o azienda', contact: 'Nome del referente', email: 'Email di contatto',
    brief: 'Descrizione del progetto', brandPrompt: 'Prodotto o brand:\nBudget indicativo del pilota:\nTempistiche di lancio:\nMercato obiettivo:\nObiettivo da verificare:',
    rightsPrompt: 'Bene culturale o contenuto:\nTitolare dei diritti (se noto):\nUso previsto:\nMercato o mercati obiettivo:\nQuestione da discutere:',
    safeNote: 'Non caricare file e non inserire documenti d’identità, codici fiscali, dati bancari, materiali riservati non pubblici o altre informazioni sensibili.',
    submit: 'Invia la richiesta', submitting: 'Invio in corso…', required: 'Controlla i campi obbligatori e riprova.', failed: 'Non è stato possibile confermare la ricezione. Riprova più tardi; i dati inseriti sono conservati.',
    successTitle: 'Richiesta ricevuta', success: 'Questa ricevuta conferma la ricezione della richiesta; non significa che l’incarico sia stato accettato o che l’esecuzione sia garantita. Conserva il numero: ti contatteremo via email per discutere perimetro e preventivo scritto.',
    order: 'Numero della richiesta', privacy: 'Con l’invio dichiari di aver letto l’informativa privacy.', privacyLink: 'Informativa privacy',
  },
  en: {
    formTitle: 'Pilot application', role: 'Applicant role', brand: 'Brand', rightsHolder: 'Rights-holder', organization: 'Organization or company', contact: 'Contact name', email: 'Contact email',
    brief: 'Project brief', brandPrompt: 'Product or brand:\nIndicative pilot budget:\nPlanned launch timing:\nTarget market:\nGoal to validate:',
    rightsPrompt: 'Cultural asset or content:\nRights-holder (if known):\nIntended use:\nTarget market or markets:\nQuestion to discuss:',
    safeNote: 'Do not upload files or include identity documents, tax IDs, bank details, non-public confidential material, or other sensitive information.',
    submit: 'Submit application', submitting: 'Submitting…', required: 'Check the required fields and try again.', failed: 'We could not confirm receipt. Please try again later; your entries have been kept.',
    successTitle: 'Application received', success: 'This receipt confirms that your application reached us. It does not mean we accepted an engagement or guarantee execution. Save the application number; we will contact you by email to discuss scope and a written quote.',
    order: 'Application number', privacy: 'By submitting, you confirm that you have read the privacy notice.', privacyLink: 'Read the privacy notice',
  },
  fr: {
    formTitle: 'Candidature au projet pilote', role: 'Rôle du demandeur', brand: 'Marque', rightsHolder: 'Ayant droit', organization: 'Organisation ou entreprise', contact: 'Nom du contact', email: 'Adresse e-mail',
    brief: 'Présentation du projet', brandPrompt: 'Produit ou marque :\nBudget indicatif du pilote :\nCalendrier de lancement :\nMarché cible :\nObjectif à valider :',
    rightsPrompt: 'Actif culturel ou contenu :\nAyant droit (si connu) :\nUsage envisagé :\nMarché(s) cible(s) :\nQuestion à discuter :',
    safeNote: 'Ne téléversez aucun fichier et ne saisissez aucun document d’identité, numéro fiscal, donnée bancaire, contenu confidentiel non public ni autre information sensible.',
    submit: 'Envoyer la candidature', submitting: 'Envoi…', required: 'Vérifiez les champs obligatoires et réessayez.', failed: 'La réception n’a pas pu être confirmée. Réessayez plus tard ; vos saisies sont conservées.',
    successTitle: 'Candidature reçue', success: 'Ce reçu confirme la réception de votre demande ; il ne signifie pas que la mission est acceptée ni que son exécution est garantie. Conservez le numéro : nous vous contacterons par e-mail pour discuter du périmètre et d’un devis écrit.',
    order: 'Numéro de candidature', privacy: 'En envoyant ce formulaire, vous confirmez avoir lu la notice de confidentialité.', privacyLink: 'Lire la notice de confidentialité',
  },
  de: {
    formTitle: 'Bewerbung für ein Pilotprojekt', role: 'Rolle der antragstellenden Person', brand: 'Marke', rightsHolder: 'Rechteinhaberschaft', organization: 'Organisation oder Unternehmen', contact: 'Kontaktperson', email: 'Kontakt-E-Mail',
    brief: 'Projektbeschreibung', brandPrompt: 'Produkt oder Marke:\nUngefähres Pilotbudget:\nGeplanter Marktstart:\nZielmarkt:\nZu prüfendes Ziel:',
    rightsPrompt: 'Kulturgut oder Inhalt:\nRechteinhaber (falls bekannt):\nGeplante Nutzung:\nZielmarkt oder Zielmärkte:\nZu besprechende Frage:',
    safeNote: 'Bitte keine Dateien hochladen und keine Ausweisdokumente, Steuer-IDs, Bankdaten, nicht öffentliche vertrauliche Inhalte oder andere sensible Informationen eingeben.',
    submit: 'Bewerbung senden', submitting: 'Wird gesendet…', required: 'Bitte prüfen Sie die Pflichtfelder und versuchen Sie es erneut.', failed: 'Der Eingang konnte nicht bestätigt werden. Bitte später erneut versuchen; Ihre Eingaben bleiben erhalten.',
    successTitle: 'Bewerbung eingegangen', success: 'Diese Bestätigung belegt den Eingang Ihrer Bewerbung. Sie bedeutet weder die Annahme eines Auftrags noch eine Ausführungsgarantie. Bitte speichern Sie die Nummer; wir melden uns per E-Mail, um Umfang und schriftliches Angebot zu besprechen.',
    order: 'Bewerbungsnummer', privacy: 'Mit dem Absenden bestätigen Sie, dass Sie den Datenschutzhinweis gelesen haben.', privacyLink: 'Datenschutzhinweis lesen',
  },
  es: {
    formTitle: 'Solicitud del proyecto piloto', role: 'Perfil de quien solicita', brand: 'Marca', rightsHolder: 'Titular de derechos', organization: 'Organización o empresa', contact: 'Nombre de contacto', email: 'Correo de contacto',
    brief: 'Descripción del proyecto', brandPrompt: 'Producto o marca:\nPresupuesto orientativo del piloto:\nFecha prevista de lanzamiento:\nMercado objetivo:\nObjetivo que se quiere validar:',
    rightsPrompt: 'Bien cultural o contenido:\nTitular de derechos (si se conoce):\nUso previsto:\nMercado o mercados objetivo:\nCuestión que se quiere tratar:',
    safeNote: 'No subas archivos ni incluyas documentos de identidad, números fiscales, datos bancarios, información confidencial no pública ni otros datos sensibles.',
    submit: 'Enviar solicitud', submitting: 'Enviando…', required: 'Revisa los campos obligatorios y vuelve a intentarlo.', failed: 'No se pudo confirmar la recepción. Inténtalo más tarde; se conservaron tus datos.',
    successTitle: 'Solicitud recibida', success: 'Este recibo confirma que recibimos la solicitud; no significa que hayamos aceptado el encargo ni garantiza su ejecución. Guarda el número: te contactaremos por correo para hablar del alcance y del presupuesto por escrito.',
    order: 'Número de solicitud', privacy: 'Al enviar, confirmas que has leído el aviso de privacidad.', privacyLink: 'Leer el aviso de privacidad',
  },
};

export default function HeritagePilotForm({ locale, initialRole, source, quoteNotice }: Props) {
  const t = copy[locale];
  const [role, setRole] = useState<Role>(initialRole);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const submission = useRef({ signature: '', requestId: '' });
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setError(t.required);
      return;
    }
    if (!window.crypto?.randomUUID) {
      setError(t.failed);
      return;
    }

    const values = new FormData(form);
    const roleValue = String(values.get('role') ?? '') as Role;
    if (roleValue !== 'brand' && roleValue !== 'rights-holder') {
      setError(t.required);
      return;
    }
    const briefText = String(values.get('brief') ?? '').trim();
    const payload = {
      service: 'consultation',
      variant: 'other',
      company: String(values.get('company') ?? '').trim(),
      name: String(values.get('name') ?? '').trim(),
      email: String(values.get('email') ?? '').trim(),
      brief: `Heritage Economy OS / ${roleValue}\n${briefText}`,
      locale,
      source: source || undefined,
      website: String(values.get('website') ?? ''),
    };
    if (!briefText || payload.brief.length > 1200) {
      setError(t.required);
      return;
    }

    submitting.current = true;
    setBusy(true);
    setError('');
    const signature = JSON.stringify(payload);
    if (submission.current.signature !== signature) {
      submission.current = { signature, requestId: window.crypto.randomUUID() };
    }
    try {
      const response = await fetch('/api/service-orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, requestId: submission.current.requestId }),
      });
      if (response.status !== 200 && response.status !== 201) throw new Error('order-rejected');
      const result = await response.json() as { orderNumber?: unknown };
      if (typeof result.orderNumber !== 'string' || !/^CMO-[0-9A-F]{32}$/.test(result.orderNumber)) throw new Error('invalid-response');
      setOrderNumber(result.orderNumber);
    } catch {
      setError(t.failed);
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  if (orderNumber) return (
    <section className={styles.card} aria-labelledby="heritage-pilot-success" aria-live="polite">
      <div className={styles.successMark} aria-hidden="true">✓</div>
      <h2 className={styles.title} id="heritage-pilot-success">{t.successTitle}</h2>
      <p className={styles.description}>{t.success}</p>
      <div className={styles.orderBox}>
        <span className={styles.orderLabel}>{t.order}</span>
        <output className={styles.orderNumber} aria-label={t.order}>{orderNumber}</output>
      </div>
    </section>
  );

  return (
    <section className={styles.card} aria-labelledby="heritage-pilot-form-title">
      <h2 className={styles.title} id="heritage-pilot-form-title">{t.formTitle}</h2>
      <p className={styles.description}>{quoteNotice}</p>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.field}>
          <label htmlFor="heritage-pilot-role">{t.role} <span aria-hidden="true">*</span></label>
          <select id="heritage-pilot-role" name="role" value={role} onChange={event => setRole(event.target.value as Role)} required disabled={busy}>
            <option value="brand">{t.brand}</option>
            <option value="rights-holder">{t.rightsHolder}</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="heritage-pilot-company">{t.organization} <span aria-hidden="true">*</span></label>
          <input id="heritage-pilot-company" name="company" autoComplete="organization" maxLength={120} required disabled={busy} />
        </div>
        <div className={styles.field}>
          <label htmlFor="heritage-pilot-name">{t.contact} <span aria-hidden="true">*</span></label>
          <input id="heritage-pilot-name" name="name" autoComplete="name" maxLength={100} required disabled={busy} />
        </div>
        <div className={styles.field}>
          <label htmlFor="heritage-pilot-email">{t.email} <span aria-hidden="true">*</span></label>
          <input id="heritage-pilot-email" name="email" type="email" autoComplete="email" maxLength={254} required disabled={busy} />
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="heritage-pilot-brief">{t.brief} <span aria-hidden="true">*</span></label>
          <textarea id="heritage-pilot-brief" name="brief" rows={8} maxLength={1100} required disabled={busy}
            placeholder={role === 'brand' ? t.brandPrompt : t.rightsPrompt} aria-describedby="heritage-pilot-safe-note" />
          <p className={styles.hint} id="heritage-pilot-safe-note">{t.safeNote}</p>
        </div>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="heritage-pilot-website">Website</label>
          <input id="heritage-pilot-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className={styles.full}>
          {error ? <p className={styles.error} role="alert">{error}</p> : null}
          <button type="submit" className={styles.submitButton} disabled={busy}>{busy ? t.submitting : t.submit}</button>
          <p className={styles.privacy}>{t.privacy} <a href={`/${locale}/privacy/`}>{t.privacyLink}</a></p>
        </div>
      </form>
    </section>
  );
}
