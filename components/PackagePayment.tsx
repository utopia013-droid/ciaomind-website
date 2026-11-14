'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ExternalLink, LockKeyhole } from 'lucide-react';
import { formatServicePrice, pricingCopy, type ServicePrice } from '@/data/service-prices';
import type { Locale } from '@/lib/i18n';
import styles from './ServiceCheckout.module.css';

const copy = {
  zh: {
    title: '套餐付款', payment: '付款', details: '确认公司名称', test: '测试结账 · 不会扣款',
    unavailable: '在线收款待开通。商户账号接入后，付款成功即可继续办理。',
    start: '模拟付款成功', pay: '在线付款待开通', proposed: '拟用公司名称', registered: '已注册公司法定名称',
    repeat: '再次输入公司名称', confirm: '确认名称', mismatch: '两次填写的名称不一致。',
    failed: '当前无法完成操作，请重试。', expired: '测试付款会话已过期，请重新测试付款。',
    paid: '测试付款已确认。', confirmed: '测试名称已确认。', noSave: '请使用示例名称。测试不会保存名称、扣款或提交官方申请。',
    registry: '前往意大利企业登记册查询', registryNote: '查询已登记的企业。名称能否正式使用，以官方审核为准。',
    includes: '套餐包含', separate: '费用另计',
  },
  it: {
    title: 'Pagamento del pacchetto', payment: 'Pagamento', details: 'Conferma del nome', test: 'Checkout di prova · nessun addebito',
    unavailable: 'Il pagamento online sarà disponibile dopo l’attivazione di un conto esercente. Dopo il pagamento potrai proseguire.',
    start: 'Simula il pagamento', pay: 'Pagamento online in attesa di attivazione', proposed: 'Denominazione proposta', registered: 'Ragione sociale registrata',
    repeat: 'Ripeti la denominazione', confirm: 'Conferma il nome', mismatch: 'Le due denominazioni non corrispondono.',
    failed: 'Impossibile completare l’operazione. Riprova.', expired: 'La sessione di prova è scaduta. Ripeti il pagamento di prova.',
    paid: 'Pagamento di prova confermato.', confirmed: 'Nome di prova confermato.', noSave: 'Usa un nome di esempio. Il test non salva il nome, non addebita importi e non invia pratiche.',
    registry: 'Cerca nel Registro Imprese', registryNote: 'Consulta le imprese registrate. La possibilità di usare il nome dipende dalla verifica ufficiale.',
    includes: 'Incluso', separate: 'Costi a parte',
  },
  en: {
    title: 'Package payment', payment: 'Payment', details: 'Confirm company name', test: 'Test checkout · no charge',
    unavailable: 'Online payment will open when a merchant account is connected. After payment, you can continue.',
    start: 'Simulate successful payment', pay: 'Online payment pending activation', proposed: 'Proposed company name', registered: 'Registered legal company name',
    repeat: 'Enter the company name again', confirm: 'Confirm name', mismatch: 'The two names do not match.',
    failed: 'This action could not be completed. Please try again.', expired: 'The test payment session expired. Please run the test payment again.',
    paid: 'Test payment confirmed.', confirmed: 'Test name confirmed.', noSave: 'Use an example name. The test does not save the name, charge you or file an application.',
    registry: 'Search the Italian Business Register', registryNote: 'Search existing registrations. Official review determines whether a name can be registered.',
    includes: 'Included', separate: 'Separate fees',
  },
  fr: {
    title: 'Paiement du forfait', payment: 'Paiement', details: 'Confirmer la dénomination', test: 'Paiement de test · aucun débit',
    unavailable: 'Le paiement en ligne sera disponible après activation d’un compte marchand. Vous pourrez poursuivre après le paiement.',
    start: 'Simuler le paiement', pay: 'Paiement en ligne en attente d’activation', proposed: 'Dénomination envisagée', registered: 'Dénomination légale enregistrée',
    repeat: 'Saisir à nouveau la dénomination', confirm: 'Confirmer la dénomination', mismatch: 'Les deux dénominations ne correspondent pas.',
    failed: 'Impossible de terminer cette action. Réessayez.', expired: 'La session de test a expiré. Relancez le paiement de test.',
    paid: 'Paiement de test confirmé.', confirmed: 'Dénomination de test confirmée.', noSave: 'Utilisez un nom fictif. Le test ne conserve pas le nom, ne débite aucun montant et ne dépose aucune demande.',
    registry: 'Rechercher au registre italien des entreprises', registryNote: 'Consultez les entreprises inscrites. La disponibilité du nom relève de l’examen officiel.',
    includes: 'Compris', separate: 'Frais en supplément',
  },
  de: {
    title: 'Paket bezahlen', payment: 'Zahlung', details: 'Firmennamen bestätigen', test: 'Testzahlung · keine Abbuchung',
    unavailable: 'Die Online-Zahlung wird nach Anbindung eines Händlerkontos freigeschaltet. Nach der Zahlung können Sie fortfahren.',
    start: 'Erfolgreiche Zahlung simulieren', pay: 'Online-Zahlung noch nicht freigeschaltet', proposed: 'Vorgesehener Firmenname', registered: 'Eingetragener Firmenname',
    repeat: 'Firmennamen erneut eingeben', confirm: 'Firmennamen bestätigen', mismatch: 'Die beiden Namen stimmen nicht überein.',
    failed: 'Die Aktion konnte nicht abgeschlossen werden. Versuchen Sie es erneut.', expired: 'Die Testsitzung ist abgelaufen. Wiederholen Sie die Testzahlung.',
    paid: 'Testzahlung bestätigt.', confirmed: 'Testname bestätigt.', noSave: 'Verwenden Sie einen Beispielnamen. Der Test speichert keinen Namen, bucht nichts ab und reicht keinen Antrag ein.',
    registry: 'Im italienischen Unternehmensregister suchen', registryNote: 'Suchen Sie bestehende Einträge. Die Registerstelle entscheidet über die Eintragungsfähigkeit.',
    includes: 'Enthalten', separate: 'Zusätzliche Gebühren',
  },
  es: {
    title: 'Pago del paquete', payment: 'Pago', details: 'Confirmar el nombre', test: 'Pago de prueba · sin cargo',
    unavailable: 'El pago en línea estará disponible al conectar una cuenta de comercio. Podrás continuar después del pago.',
    start: 'Simular un pago correcto', pay: 'Pago en línea pendiente de activación', proposed: 'Nombre propuesto de la empresa', registered: 'Nombre legal registrado de la empresa',
    repeat: 'Vuelve a introducir el nombre', confirm: 'Confirmar nombre', mismatch: 'Los dos nombres no coinciden.',
    failed: 'No se pudo completar la operación. Inténtalo de nuevo.', expired: 'La sesión de prueba caducó. Repite el pago de prueba.',
    paid: 'Pago de prueba confirmado.', confirmed: 'Nombre de prueba confirmado.', noSave: 'Usa un nombre de ejemplo. La prueba no guarda el nombre, no cobra ni presenta solicitudes.',
    registry: 'Buscar en el Registro italiano de Empresas', registryNote: 'Consulta las empresas inscritas. La revisión oficial determina si el nombre puede registrarse.',
    includes: 'Incluye', separate: 'Gastos aparte',
  },
} satisfies Record<Locale, Record<string, string>>;

const registry = 'https://www.registroimprese.it/ricercaext';

export default function PackagePayment({ locale, price, demoEnabled }: {
  locale: Locale;
  price: ServicePrice;
  demoEnabled: boolean;
}) {
  const t = copy[locale];
  const { service, variant } = price;
  const [reference, setReference] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [restoring, setRestoring] = useState(demoEnabled);
  const [error, setError] = useState('');
  const actionInProgress = useRef(false);

  useEffect(() => {
    if (!demoEnabled) return;
    const controller = new AbortController();
    requestCheckout({ action: 'status', service, variant }, controller.signal)
      .then(result => {
        if (!controller.signal.aborted && result.reference) setReference(result.reference);
      })
      .catch(() => {})
      .finally(() => {
        if (!controller.signal.aborted) setRestoring(false);
      });
    return () => controller.abort();
  }, [demoEnabled, service, variant]);

  async function update(fields: Record<string, string>) {
    if (!demoEnabled || actionInProgress.current) return;
    actionInProgress.current = true;
    setBusy(true);
    setError('');
    try {
      const result = await requestCheckout({ service, variant, ...fields });
      if (result.reference) {
        setReference(result.reference);
        setConfirmed(fields.action === 'confirm-name');
      } else if (result.status === 401) {
        setReference('');
        setConfirmed(false);
        setError(t.expired);
      } else {
        setError(result.error === 'company_confirmation_required' ? t.mismatch : t.failed);
      }
    } catch {
      setError(t.failed);
    } finally {
      actionInProgress.current = false;
      setBusy(false);
    }
  }

  function confirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    void update({
      action: 'confirm-name',
      company: String(values.get('company') ?? ''),
      companyConfirmation: String(values.get('companyConfirmation') ?? ''),
    });
  }

  return (
    <section className={styles.card} aria-labelledby="payment-title">
      <h1 className={styles.title} id="payment-title">{t.title}</h1>
      <ol className={styles.paymentSteps}>
        <li aria-current={reference ? undefined : 'step'}><span>{reference ? <Check size={16} aria-hidden /> : '1'}</span>{t.payment}</li>
        <li aria-current={reference ? 'step' : undefined}><span>{confirmed ? <Check size={16} aria-hidden /> : '2'}</span>{t.details}</li>
      </ol>
      <div className={styles.checkoutLayout}>
        <aside className={styles.priceSummary} aria-label={price.label[locale]}>
          <h2>{price.label[locale]}</h2>
          <p className={styles.priceAmount}>{pricingCopy[locale].from} {formatServicePrice(price.amountCents, locale)} <span>{pricingCopy[locale].tax}</span></p>
          <p className={styles.summaryUnit}>{price.unit[locale]}</p>
          <div className={styles.summaryDetail}><strong>{t.includes}</strong><p>{price.includes[locale]}</p></div>
          <div className={styles.summaryDetail}><strong>{t.separate}</strong><p>{price.excludes[locale]}</p></div>
        </aside>
        <div className={styles.paymentPanel}>
          {demoEnabled ? (
            <>
              <p className={styles.testBadge}>{t.test}</p>
              <p className={styles.description}>{t.noSave}</p>
              {!reference && <button type="button" className={styles.submitButton} disabled={busy || restoring} onClick={() => void update({ action: 'pay' })}>
                {t.start} <ArrowRight size={16} aria-hidden />
              </button>}
            </>
          ) : (
            <>
              <p className={styles.description}>{t.unavailable}</p>
              <button type="button" className={styles.submitButton} disabled><LockKeyhole size={16} aria-hidden /> {t.pay}</button>
            </>
          )}
          {reference && <p className={styles.checkoutPayment} role="status">{confirmed ? t.confirmed : t.paid} <strong>{reference}</strong></p>}
          {reference && !confirmed && <form className={styles.paymentDetails} onSubmit={confirm}>
            <div className={styles.field}>
              <label htmlFor="paid-company">{service === 'incorporation' ? t.proposed : t.registered}</label>
              <input id="paid-company" name="company" required maxLength={120} />
            </div>
            <div className={styles.field}>
              <label htmlFor="paid-company-confirmation">{t.repeat}</label>
              <input id="paid-company-confirmation" name="companyConfirmation" required maxLength={120} />
            </div>
            <button type="submit" className={styles.submitButton} disabled={busy}>{t.confirm}</button>
          </form>}
          {confirmed && service === 'incorporation' && <div className={styles.paymentDetails}>
            <p className={styles.description}>{t.registryNote}</p>
            <a className={styles.secondaryButton} href={registry} target="_blank" rel="noreferrer">{t.registry} <ExternalLink size={15} aria-hidden /></a>
          </div>}
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
      </div>
    </section>
  );
}

async function requestCheckout(fields: Record<string, string>, signal?: AbortSignal) {
  const response = await fetch('/api/checkout/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
    signal,
  });
  const body = await response.json() as { reference?: string; error?: string };
  return { status: response.status, error: body.error, reference: response.ok ? body.reference : undefined };
}
