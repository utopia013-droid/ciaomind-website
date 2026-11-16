'use client';

import { useRef, useState } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import styles from './CompanyNameCheck.module.css';
import checkoutStyles from './ServiceCheckout.module.css';

const registryUrl = 'https://www.registroimprese.it/ricercaext';
const outcomes = ['match', 'none', 'unsure'] as const;
type Outcome = typeof outcomes[number];
type CopyEntry = {
  title: string;
  guide: string;
  name: string;
  copy: string;
  copied: string;
  copyFailed: string;
  open: string;
  result: string;
  edit: string;
  options: Record<Outcome, [label: string, nextStep: string]>;
};

export const nameCheckCopy: Record<Locale, CopyEntry> = {
  zh: {
    title: '在官方登记册预查',
    guide: '复制拟用名称，打开意大利企业登记册，在「Nome Impresa o Attività」中粘贴查询。先查完整名称，再用核心词查找近似名称。',
    name: '拟用名称', copy: '复制名称', copied: '已复制名称', copyFailed: '已选中名称，可手动复制。',
    open: '打开意大利企业登记册', result: '记录你在登记册看到的结果（仅本页）', edit: '修改拟用名称',
    options: {
      match: ['发现相同或相近名称', '记录相近的企业名称和登记号，准备备选名称，再请公证人核对。'],
      none: ['未发现相近结果', '可以保留该候选名称。查询结果无法保留名称，正式使用前请公证人复核。'],
      unsure: ['结果不确定', '缩短为核心词重查，核对相近企业的名称与所在地，再请公证人复核。'],
    },
  },
  it: {
    title: 'Ricerca preliminare nel registro',
    guide: 'Copia il nome, apri il Registro Imprese e incollalo in «Nome Impresa o Attività». Cerca prima il nome completo, poi le parole distintive per individuare nomi simili.',
    name: 'Denominazione proposta', copy: 'Copia il nome', copied: 'Nome copiato', copyFailed: 'Il nome è selezionato. Puoi copiarlo manualmente.',
    open: 'Apri il Registro Imprese', result: 'Annota l’esito della tua ricerca (solo in questa pagina)', edit: 'Modifica la denominazione',
    options: {
      match: ['Ho trovato un nome uguale o simile', 'Annota il nome e il numero d’iscrizione, prepara un’alternativa e chiedi una verifica al notaio.'],
      none: ['Non ho trovato nomi simili', 'Mantieni la denominazione tra le opzioni. La ricerca non riserva il nome. Chiedi al notaio di verificarla prima di usarla.'],
      unsure: ['L’esito è incerto', 'Ripeti la ricerca con le parole distintive, confronta nomi e sedi e chiedi una verifica al notaio.'],
    },
  },
  en: {
    title: 'Preliminary register search',
    guide: 'Copy the name, open the Italian Business Register, and paste it into “Nome Impresa o Attività”. Search the full name first, then its distinctive words to find similar names.',
    name: 'Proposed name', copy: 'Copy name', copied: 'Name copied', copyFailed: 'The name is selected. Copy it manually.',
    open: 'Open the Italian Business Register', result: 'Record what you saw in the register (this page only)', edit: 'Change the proposed name',
    options: {
      match: ['Same or similar name found', 'Note the name and registration number, prepare an alternative, and ask your notary to review it.'],
      none: ['No similar name found', 'Keep this candidate for review. A search does not reserve the name. Ask your notary to verify it before use.'],
      unsure: ['The result is unclear', 'Search again using distinctive words, compare names and locations, and ask your notary to review the results.'],
    },
  },
  fr: {
    title: 'Recherche préalable au registre',
    guide: 'Copiez le nom, ouvrez le registre italien et collez-le dans « Nome Impresa o Attività ». Cherchez d’abord le nom complet, puis les mots distinctifs pour repérer les noms similaires.',
    name: 'Dénomination envisagée', copy: 'Copier le nom', copied: 'Nom copié', copyFailed: 'Le nom est sélectionné. Copiez-le manuellement.',
    open: 'Ouvrir le registre italien des entreprises', result: 'Notez le résultat de votre recherche (sur cette page uniquement)', edit: 'Modifier la dénomination',
    options: {
      match: ['Nom identique ou similaire trouvé', 'Notez le nom et le numéro d’immatriculation, préparez une alternative et demandez une vérification au notaire.'],
      none: ['Aucun nom similaire trouvé', 'Conservez cette option. La recherche ne réserve pas la dénomination. Demandez au notaire de la vérifier avant usage.'],
      unsure: ['Résultat incertain', 'Relancez la recherche avec les mots distinctifs, comparez les noms et les sièges, puis consultez le notaire.'],
    },
  },
  de: {
    title: 'Vorprüfung im Unternehmensregister',
    guide: 'Kopieren Sie den Namen und fügen Sie ihn im italienischen Register unter „Nome Impresa o Attività“ ein. Suchen Sie zuerst den vollständigen Namen und anschließend die kennzeichnenden Wörter.',
    name: 'Vorgesehener Firmenname', copy: 'Namen kopieren', copied: 'Name kopiert', copyFailed: 'Der Name ist ausgewählt. Kopieren Sie ihn manuell.',
    open: 'Italienisches Unternehmensregister öffnen', result: 'Suchergebnis festhalten (nur auf dieser Seite)', edit: 'Firmennamen ändern',
    options: {
      match: ['Gleichen oder ähnlichen Namen gefunden', 'Notieren Sie Namen und Registernummer, bereiten Sie eine Alternative vor und lassen Sie den Namen notariell prüfen.'],
      none: ['Keinen ähnlichen Namen gefunden', 'Behalten Sie den Namen zur Prüfung bei. Die Suche reserviert ihn nicht. Lassen Sie ihn vor der Nutzung notariell prüfen.'],
      unsure: ['Ergebnis unklar', 'Suchen Sie nach kennzeichnenden Wörtern, vergleichen Sie Namen und Sitze und lassen Sie das Ergebnis notariell prüfen.'],
    },
  },
  es: {
    title: 'Búsqueda preliminar en el registro',
    guide: 'Copia el nombre, abre el registro italiano y pégalo en «Nome Impresa o Attività». Busca primero el nombre completo y después las palabras distintivas para detectar nombres similares.',
    name: 'Nombre propuesto', copy: 'Copiar nombre', copied: 'Nombre copiado', copyFailed: 'El nombre está seleccionado. Puedes copiarlo manualmente.',
    open: 'Abrir el Registro italiano de Empresas', result: 'Anota lo que viste en el registro (solo en esta página)', edit: 'Cambiar el nombre propuesto',
    options: {
      match: ['Encontré un nombre igual o similar', 'Anota el nombre y el número de registro, prepara una alternativa y pide al notario que la revise.'],
      none: ['No encontré nombres similares', 'Conserva esta opción. La búsqueda no reserva el nombre. Pide al notario que lo revise antes de usarlo.'],
      unsure: ['El resultado no está claro', 'Busca las palabras distintivas, compara los nombres y las sedes y pide al notario que revise el resultado.'],
    },
  },
};

export default function CompanyNameCheck({ locale, company, onEdit }: {
  locale: Locale;
  company: string;
  onEdit: () => void;
}) {
  const t = nameCheckCopy[locale];
  const [copyStatus, setCopyStatus] = useState('');
  const [outcome, setOutcome] = useState<Outcome | ''>('');
  const nameField = useRef<HTMLInputElement>(null);

  async function copyName() {
    try {
      await navigator.clipboard.writeText(company);
      setCopyStatus(t.copied);
    } catch {
      nameField.current?.focus();
      nameField.current?.select();
      setCopyStatus(t.copyFailed);
    }
  }

  return (
    <section className={styles.panel} aria-labelledby="company-name-check-title">
      <h2 id="company-name-check-title">{t.title}</h2>
      <p>{t.guide}</p>
      <div className={checkoutStyles.field}>
        <label htmlFor="registry-company">{t.name}</label>
        <div className={styles.copyRow}>
          <input id="registry-company" ref={nameField} value={company} readOnly />
          <button className={styles.action} type="button" onClick={copyName}><Copy size={16} aria-hidden />{t.copy}</button>
        </div>
      </div>
      {copyStatus && <p className={styles.feedback} role="status">{copyStatus}</p>}
      <a className={styles.open} href={registryUrl} target="_blank" rel="noreferrer">{t.open}<ExternalLink size={16} aria-hidden /></a>
      <fieldset className={styles.outcomes}>
        <legend>{t.result}</legend>
        {outcomes.map(value => <label key={value}>
          <input type="radio" name="registry-outcome" value={value} checked={outcome === value} onChange={() => setOutcome(value)} />
          {t.options[value][0]}
        </label>)}
      </fieldset>
      <div aria-live="polite">{outcome && <p className={styles.feedback}>{t.options[outcome][1]}</p>}</div>
      <button className={styles.edit} type="button" onClick={onEdit}>{t.edit}</button>
    </section>
  );
}
