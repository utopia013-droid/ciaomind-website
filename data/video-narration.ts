import type { Locale } from '@/lib/i18n';
import type { VideoTopic } from './service-videos';

export type NarrationLanguage = 'zh' | 'en';
export const narrationLanguages = { zh: '中文', en: 'English' } as const;

export type NarrationCopy = {
  intro: string; language: string; guide: string; original: string; externalNotice: string;
  topics: Record<VideoTopic, { title: string; description: string }>;
};

export const narrationCopy: Record<Locale, NarrationCopy> = {
  zh: {
    intro: "选择中文或英语讲解，了解在欧洲设立企业要准备什么，或如何发起世界文化遗产数字化合作。",
    language: "讲解语言", guide: "CIAOMIND 讲解", original: "查看原始视频",
    topics: {
      formation: { title: "在欧洲设立企业，先准备什么？", description: "从经营地点、创始团队、业务和时间安排开始，准备第一次设立咨询。" },
      heritage: { title: "如何开始一个遗产数字化项目？", description: "从一项获授权的素材开始，规划建档、数字化样品和后续使用。" },
    },
    externalNotice: "仅播放外部机构的视频或课程时会连接 YouTube。",
  },
  it: {
    intro: "Scegli una guida in cinese o in inglese per preparare una consulenza d’impresa o avviare un progetto di patrimonio digitale.",
    language: "Lingua della guida", guide: "Guida CIAOMIND", original: "Video originale",
    topics: {
      formation: { title: "Come prepararsi per costituire un’impresa in Europa", description: "Individua sede operativa, fondatori, attività e tempi prima della prima consulenza." },
      heritage: { title: "Come avviare un progetto di patrimonio digitale", description: "Parti da una risorsa autorizzata e pianifica catalogazione, prototipo digitale e utilizzi futuri." },
    },
    externalNotice: "Solo i video e le serie delle istituzioni esterne si collegano a YouTube.",
  },
  en: {
    intro: "Choose English or Mandarin narration for a first look at forming a company in Europe or starting a digital heritage project.",
    language: "Narration language", guide: "CIAOMIND guide", original: "Original video",
    topics: {
      formation: { title: "What should you prepare before forming a company in Europe?", description: "Identify where you’ll operate, who is founding the company, what it will do and when you want to start." },
      heritage: { title: "How do you start a digital heritage project?", description: "Start with one item you have permission to use, then plan the catalogue record, a digital sample and its future use." },
    },
    externalNotice: "Playing an external organisation’s video or series connects to YouTube.",
  },
  fr: {
    intro: "Choisissez un guide en chinois ou en anglais pour préparer une création d’entreprise ou un projet de patrimoine numérique.",
    language: "Langue de narration", guide: "Guide CIAOMIND", original: "Vidéo originale",
    topics: {
      formation: { title: "Que préparer avant de créer une entreprise en Europe ?", description: "Précisez le lieu d’activité, l’équipe fondatrice, l’activité et le calendrier avant le premier entretien." },
      heritage: { title: "Comment lancer un projet de patrimoine numérique ?", description: "Partez d’une ressource dont l’usage est autorisé, puis prévoyez sa documentation, un échantillon numérique et son utilisation." },
    },
    externalNotice: "La lecture d’une vidéo ou d’une série d’un organisme externe se connecte à YouTube.",
  },
  de: {
    intro: "Wählen Sie eine Einführung auf Chinesisch oder Englisch zur Gründung in Europa oder zum Einstieg in ein digitales Kulturerbeprojekt.",
    language: "Sprache der Erläuterung", guide: "CIAOMIND-Ratgeber", original: "Originalvideo",
    topics: {
      formation: { title: "Was sollten Sie für eine Gründung in Europa vorbereiten?", description: "Klären Sie Tätigkeitsort, Gründungsteam, Geschäftstätigkeit und Zeitplan für das erste Gespräch." },
      heritage: { title: "Wie beginnt ein digitales Kulturerbeprojekt?", description: "Beginnen Sie mit einem Objekt mit geklärten Nutzungsrechten und planen Sie Dokumentation, digitales Muster und spätere Nutzung." },
    },
    externalNotice: "Eine Verbindung zu YouTube entsteht beim Abspielen externer Videos oder Videoreihen.",
  },
  es: {
    intro: "Elige una guía en chino o inglés sobre los preparativos para crear una empresa en Europa o iniciar un proyecto de patrimonio digital.",
    language: "Idioma de la narración", guide: "Guía CIAOMIND", original: "Vídeo original",
    topics: {
      formation: { title: "¿Qué preparar para crear una empresa en Europa?", description: "Define el lugar de actividad, el equipo fundador, la actividad y el calendario antes de la primera consulta." },
      heritage: { title: "¿Cómo empezar un proyecto de patrimonio digital?", description: "Parte de un recurso con permiso de uso y planifica su catalogación, una muestra digital y sus usos futuros." },
    },
    externalNotice: "Al reproducir vídeos o series de organizaciones externas, se establece una conexión con YouTube.",
  },
  pt: {
    intro: "Escolha um guia em chinês ou em inglês para preparar a criação de uma empresa na Europa ou um projeto de património digital.",
    language: "Idioma da narração", guide: "Guia CIAOMIND", original: "Vídeo original",
    topics: {
      formation: { title: "O que preparar antes de criar uma empresa na Europa?", description: "Identifique o local de atividade, a equipa fundadora, a atividade e o calendário antes da primeira consulta." },
      heritage: { title: "Como iniciar um projeto de património digital?", description: "Comece com um recurso com autorização de uso e planeie a catalogação, uma amostra digital e as utilizações futuras." },
    },
    externalNotice: "A reprodução de vídeos ou séries de organizações externas estabelece uma ligação ao YouTube.",
  },
  ja: {
    intro: "中国語または英語の解説で、欧州での会社設立の準備と、世界遺産をデジタル化するプロジェクトの始め方を確認できます。",
    language: "音声言語", guide: "CIAOMIND の解説", original: "公式動画",
    topics: {
      formation: { title: "欧州での会社設立に向けて何を準備する？", description: "最初の相談に向けて、事業を行う場所、創業チーム、事業内容、希望時期を整理します。" },
      heritage: { title: "世界遺産のデジタル化をどう始める？", description: "利用許諾を得た資料を一つ選び、記録の作成、デジタル見本、今後の活用を計画します。" },
    },
    externalNotice: "外部機関の動画またはシリーズを再生すると YouTube に接続します。",
  },
};
