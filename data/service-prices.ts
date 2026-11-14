import { localeTags, type Locale } from '@/lib/i18n';

type Labels = Record<Locale, string>;
type ServicePrice = {
  service: string;
  variant: string;
  amountCents: number;
  period: 'once' | 'four_months';
  label: Labels;
  includes: Labels;
  excludes: Labels;
  unit: Labels;
};

export const servicePrices: ServicePrice[] = [
  {
    service: 'incorporation', variant: 'srl', amountCents: 9900, period: 'once',
    label: {
      zh: '意大利标准 SRL 开办准备', it: 'Preparazione apertura SRL standard',
      en: 'Standard Italian SRL setup preparation', fr: 'Préparation d’une SRL italienne standard',
      de: 'Vorbereitung einer italienischen Standard-SRL', es: 'Preparación de una SRL italiana estándar',
    },
    includes: {
      zh: '初步梳理设立范围、材料清单和办理步骤。', it: 'Prima verifica del perimetro, elenco dei documenti e passaggi di costituzione.',
      en: 'Initial scope review, document checklist and formation steps.', fr: 'Premier examen du périmètre, liste des documents et étapes de création.',
      de: 'Erste Prüfung des Umfangs, Unterlagenliste und Gründungsschritte.', es: 'Revisión inicial del alcance, lista de documentos y pasos de constitución.',
    },
    excludes: {
      zh: '公证、官费和第三方专业服务另计。', it: 'Notaio, diritti pubblici e prestazioni di terzi a parte.',
      en: 'Notary, government and third-party fees are separate.', fr: 'Notaire, frais officiels et prestations de tiers en supplément.',
      de: 'Notar-, Behörden- und Drittanbietergebühren fallen separat an.', es: 'Notaría, tasas públicas y servicios de terceros se cotizan aparte.',
    },
    unit: { zh: '一次性', it: 'una tantum', en: 'one-time', fr: 'paiement unique', de: 'einmalig', es: 'pago único' },
  },
  {
    service: 'accounting', variant: 'company', amountCents: 49900, period: 'four_months',
    label: {
      zh: '意大利公司会计基础方案', it: 'Contabilità aziendale di base in Italia',
      en: 'Basic Italian company accounting', fr: 'Comptabilité de base pour société en Italie',
      de: 'Basisbuchhaltung für italienische Gesellschaften', es: 'Contabilidad básica de sociedades en Italia',
    },
    includes: {
      zh: '按账务量确认常规记账和申报范围，由具备资格的专业方复核。', it: 'Contabilità ordinaria e dichiarazioni da definire in base al volume e alla verifica del professionista.',
      en: 'Routine bookkeeping and filings scoped by volume and reviewed by a qualified professional.', fr: 'Tenue comptable et déclarations courantes définies selon le volume et validées par un professionnel qualifié.',
      de: 'Laufende Buchhaltung und Meldungen nach Umfang und Prüfung durch qualifizierte Fachleute.', es: 'Contabilidad y declaraciones ordinarias según el volumen y la revisión de un profesional cualificado.',
    },
    excludes: {
      zh: '应缴税款、额外申报及特殊业务另计。', it: 'Imposte dovute, dichiarazioni extra e operazioni straordinarie a parte.',
      en: 'Taxes due, extra filings and exceptional work are separate.', fr: 'Impôts dus, déclarations supplémentaires et travaux exceptionnels en supplément.',
      de: 'Fällige Steuern, zusätzliche Meldungen und Sonderleistungen fallen separat an.', es: 'Impuestos, declaraciones adicionales y actuaciones extraordinarias se cotizan aparte.',
    },
    unit: { zh: '每 4 个月', it: 'ogni 4 mesi', en: 'per 4 months', fr: 'pour 4 mois', de: 'je 4 Monate', es: 'cada 4 meses' },
  },
];

export function getServicePrice(service: string, variant: string) {
  return servicePrices.find(price => price.service === service && price.variant === variant);
}

export function formatServicePrice(amountCents: number, locale: Locale) {
  return new Intl.NumberFormat(localeTags[locale], {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2,
  }).format(amountCents / 100);
}
export const priceVersion = '2026-11-14-01';

export const pricingCopy: Record<Locale, { from: string; tax: string; submit: string; changed: string; quote: string }> = {
  zh: { from: '起价', tax: '另加 IVA', submit: '按此起价下单', changed: '报价已更新，请刷新页面查看最新金额。', quote: '提交后确认适用范围和书面报价，当前不扣款。' },
  it: { from: 'Da', tax: '+ IVA', submit: 'Ordina a partire da questo prezzo', changed: 'Il prezzo è cambiato. Aggiorna la pagina per vedere l’importo attuale.', quote: 'Il team confermerà il perimetro e il preventivo scritto. Nessun addebito all’invio.' },
  en: { from: 'From', tax: '+ VAT', submit: 'Order at this starting price', changed: 'The price has changed. Refresh the page to see the latest amount.', quote: 'The team will confirm the scope and written quote. Submitting does not charge you.' },
  fr: { from: 'À partir de', tax: 'hors TVA', submit: 'Commander à partir de ce prix', changed: 'Le prix a changé. Actualisez la page pour voir le montant à jour.', quote: 'L’équipe confirmera le périmètre et le devis écrit. L’envoi ne déclenche aucun paiement.' },
  de: { from: 'Ab', tax: 'zzgl. MwSt.', submit: 'Zum Einstiegspreis bestellen', changed: 'Der Preis wurde geändert. Laden Sie die Seite neu, um den aktuellen Betrag zu sehen.', quote: 'Das Team bestätigt Umfang und schriftliches Angebot. Beim Absenden wird nichts berechnet.' },
  es: { from: 'Desde', tax: '+ IVA', submit: 'Pedir a partir de este precio', changed: 'El precio ha cambiado. Recarga la página para ver el importe actualizado.', quote: 'El equipo confirmará el alcance y el presupuesto escrito. El envío no genera ningún cargo.' },
};
