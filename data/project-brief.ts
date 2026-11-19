import type { Locale } from '@/lib/i18n';

export const stageIds = ['rights', 'production', 'market', 'operations', 'scale', 'circular'] as const;
export const roleIds = ['custodian', 'designer', 'maker', 'operator', 'network', 'capital'] as const;
export type ProjectStage = (typeof stageIds)[number];
export type ProjectRole = (typeof roleIds)[number];

export function matchChoice<T extends string>(value: string | string[] | undefined, options: readonly T[]) {
  return options.find(option => option === value);
}

type BriefCopy = {
  title: string; intro: string; role: string; stage: string; undecided: string;
  resources: string; objective: string; next: string; nextHint: string;
  copy: string; copied: string; manual: string; draft: string; action: string;
};
const briefCopy: Record<Locale, BriefCopy> = {
  zh: {
    title: '合作项目简报', intro: '写下你已有的资源和希望找到的伙伴。你可以先复制简报，或在自己的邮箱里确认发送给 CIAOMIND。',
    role: '你在项目中的角色', stage: '希望从哪个环节开始？', undecided: '尚未确定',
    resources: '你能提供的资源或能力（选填）', objective: '你希望和伙伴一起完成什么？',
    next: '希望谁参与下一步？要确认什么？（选填）', nextHint: '例如，请制造伙伴核对材料与打样成本。',
    copy: '复制项目简报', copied: '简报已复制，可以交给合作伙伴。', manual: '请选中并复制下方简报。', draft: '可复制的项目简报', action: '打开邮件草稿'
  },
  it: {
    title: 'Scheda di collaborazione', intro: 'Descrivi cosa puoi offrire e quale partner cerchi. Puoi copiare la scheda o inviarla a CIAOMIND dal tuo programma di posta.',
    role: 'Il tuo ruolo nel progetto', stage: 'Da quale fase vuoi iniziare?', undecided: 'Da definire',
    resources: 'Risorse o competenze che puoi offrire (facoltativo)', objective: 'Cosa vuoi realizzare con un partner?',
    next: 'Chi dovrebbe intervenire e cosa deve verificare? (facoltativo)', nextHint: 'Ad esempio, chiedi al produttore di verificare materiali e costi del prototipo.',
    copy: 'Copia la scheda', copied: 'Scheda copiata, pronta da condividere.', manual: 'Seleziona e copia la scheda qui sotto.', draft: 'Scheda da copiare', action: 'Apri una bozza email'
  },
  en: {
    title: 'Project collaboration brief', intro: 'Describe what you can offer and the partner you need. Copy the brief or send it to CIAOMIND from your email app.',
    role: 'Your role in the project', stage: 'Which stage do you want to start with?', undecided: 'Still to be decided',
    resources: 'Resources or skills you can offer (optional)', objective: 'What would you like to achieve with a partner?',
    next: 'Who should take the next step, and what needs checking? (optional)', nextHint: 'For example, ask a manufacturer to check materials and prototype costs.',
    copy: 'Copy project brief', copied: 'Brief copied and ready to share.', manual: 'Select and copy the brief below.', draft: 'Project brief to copy', action: 'Open email draft'
  },
  fr: {
    title: 'Fiche de collaboration', intro: 'Décrivez vos ressources et le partenaire recherché. Copiez la fiche ou envoyez-la à CIAOMIND depuis votre messagerie.',
    role: 'Votre rôle dans le projet', stage: 'Par quelle étape souhaitez-vous commencer ?', undecided: 'À définir',
    resources: 'Ressources ou compétences proposées (facultatif)', objective: 'Que souhaitez-vous réaliser avec un partenaire ?',
    next: 'Qui doit intervenir ensuite et que faut-il vérifier ? (facultatif)', nextHint: 'Par exemple, demander au fabricant de vérifier les matériaux et le coût du prototype.',
    copy: 'Copier la fiche', copied: 'Fiche copiée et prête à partager.', manual: 'Sélectionnez et copiez la fiche ci-dessous.', draft: 'Fiche à copier', action: 'Ouvrir un brouillon de courriel'
  },
  de: {
    title: 'Projektanfrage für eine Zusammenarbeit', intro: 'Beschreiben Sie, was Sie einbringen und wen Sie suchen. Kopieren Sie die Anfrage oder senden Sie sie über Ihr E-Mail-Programm an CIAOMIND.',
    role: 'Ihre Rolle im Projekt', stage: 'In welcher Phase möchten Sie beginnen?', undecided: 'Noch offen',
    resources: 'Was Sie anbieten können (optional)', objective: 'Was möchten Sie mit einem Partner erreichen?',
    next: 'Wer soll als Nächstes was prüfen? (optional)', nextHint: 'Zum Beispiel kann der Hersteller Materialien und Musterkosten prüfen.',
    copy: 'Projektanfrage kopieren', copied: 'Die Anfrage wurde kopiert.', manual: 'Bitte markieren und kopieren Sie die Anfrage unten.', draft: 'Projektanfrage zum Kopieren', action: 'E-Mail-Entwurf öffnen'
  },
  es: {
    title: 'Ficha de colaboración', intro: 'Describe qué puedes aportar y qué tipo de socio buscas. Copia la ficha o envíala a CIAOMIND desde tu correo.',
    role: 'Tu función en el proyecto', stage: '¿En qué etapa quieres empezar?', undecided: 'Por definir',
    resources: 'Recursos o capacidades que puedes aportar (opcional)', objective: '¿Qué te gustaría lograr con un socio?',
    next: '¿Quién debería intervenir y qué debe comprobar? (opcional)', nextHint: 'Por ejemplo, pedir al fabricante que compruebe los materiales y el coste del prototipo.',
    copy: 'Copiar la ficha', copied: 'Ficha copiada y lista para compartir.', manual: 'Selecciona y copia la ficha de abajo.', draft: 'Ficha para copiar', action: 'Abrir borrador de correo'
  },
  pt: {
    title: 'Ficha de colaboração', intro: 'Descreva o que pode oferecer e o parceiro que procura. Copie a ficha ou envie-a à CIAOMIND a partir do seu email.',
    role: 'O seu papel no projeto', stage: 'Em que fase pretende começar?', undecided: 'Por definir',
    resources: 'Recursos ou competências que pode oferecer (opcional)', objective: 'O que pretende alcançar com um parceiro?',
    next: 'Quem deve participar a seguir e o que é preciso confirmar? (opcional)', nextHint: 'Por exemplo, pedir ao fabricante que confirme os materiais e o custo do protótipo.',
    copy: 'Copiar a ficha', copied: 'Ficha copiada e pronta a partilhar.', manual: 'Selecione e copie a ficha abaixo.', draft: 'Ficha para copiar', action: 'Abrir rascunho de email'
  },
  ja: {
    title: '協業プロジェクトの概要', intro: '提供できる資源や技術、探している協業先をお知らせください。概要をコピーするか、メールアプリから CIAOMIND に送信できます。',
    role: 'プロジェクトでの役割', stage: 'どの段階から始めますか？', undecided: '未定',
    resources: '提供できる資源や技術（任意）', objective: '協業先と何を実現したいですか？',
    next: '次に誰に何を確認してほしいですか？（任意）', nextHint: '例：製造パートナーに素材と試作費用を確認してもらう。',
    copy: '概要をコピー', copied: '概要をコピーしました。協業先と共有できます。', manual: '以下の概要を選択してコピーしてください。', draft: 'コピー用の概要', action: 'メールの下書きを開く'
  }
};

export function getBriefCopy(locale: Locale) {
  return briefCopy[locale];
}
