import type { Locale } from '@/lib/i18n';

export const serviceVideos = {
  formation: {
    id: 'Cbjj3r40CD4', publisher: 'KVK', duration: '2:57',
    seriesPublisher: 'KVK', playlist: 'PLbE4XGSrywI008ryoG9UmfxxO2rWFp2JL',
    source: 'https://business.gov.nl/starting-your-business/preparations/step-by-step-plan-how-to-start-a-business-in-the-netherlands/',
  },
  heritage: {
    id: 'lgV3KW3ls1E', publisher: 'UNESCO', duration: '0:35',
    seriesPublisher: 'EUreka3D', playlist: 'PLl032Y25p243f4o1BzgnffSfcqkW3Lo0K',
    source: 'https://whc.unesco.org/en/dive-into-heritage/',
  },
} as const;

export type VideoTopic = keyof typeof serviceVideos;
type FeatureText = { category: string; name: string; summary: string; format: string; cta: string };
export type VideoText = {
  title: string; formation: FeatureText; heritage: FeatureText;
  series: string; watch: string; source: string;
};

export const videoText: Record<Locale, VideoText> = {
  zh: {
    title: "视频指南",
    formation: {
      category: "欧洲企业设立",
      name: "荷兰公司如何在商会登记",
      summary: "荷兰商会演示创业者如何办理 KVK 登记。办理其他欧洲国家的手续时，可先咨询适合自己的路径。",
      format: "荷兰语 · 英文和荷兰文字幕",
      cta: "预约企业设立咨询",
    },
    heritage: {
      category: "世界文化遗产",
      name: "走进 UNESCO 的数字遗产平台",
      summary: "观看 Dive into Heritage 演示，了解如何通过数字技术呈现世界遗产，再与我们讨论藏品数字化或可持续运营项目。",
      format: "平台演示",
      cta: "洽谈遗产项目合作",
    },
    series: "系列课程",
    watch: "在 YouTube 观看",
    source: "官方项目说明",
  },
  it: {
    title: "Videoguide",
    formation: {
      category: "Costituire un’impresa in Europa",
      name: "Registrare un’impresa alla KVK",
      summary: "La Camera di commercio olandese illustra la procedura di registrazione. Contattaci per valutare un percorso nel tuo Paese di destinazione.",
      format: "In olandese · sottotitoli in inglese e olandese",
      cta: "Prenota una consulenza",
    },
    heritage: {
      category: "Patrimonio mondiale",
      name: "Esplorare il patrimonio digitale con UNESCO",
      summary: "Scopri la piattaforma Dive into Heritage e confrontati con noi sulla digitalizzazione di una collezione o sulla gestione sostenibile di un sito.",
      format: "Demo della piattaforma",
      cta: "Proponi una collaborazione",
    },
    series: "Playlist",
    watch: "Guarda su YouTube",
    source: "Fonte ufficiale",
  },
  en: {
    title: "Video guides",
    formation: {
      category: "Starting a business in Europe",
      name: "How to register a business with KVK",
      summary: "The Dutch Chamber of Commerce walks through registration in the Netherlands. Speak with us about the steps for your destination country.",
      format: "Dutch audio · English and Dutch subtitles",
      cta: "Book a business consultation",
    },
    heritage: {
      category: "World Heritage",
      name: "Explore UNESCO’s digital heritage platform",
      summary: "See Dive into Heritage in action, then talk to us about digitising a collection or sustaining a heritage site.",
      format: "Platform demo",
      cta: "Discuss a heritage partnership",
    },
    series: "Learning series",
    watch: "Watch on YouTube",
    source: "Official source",
  },
  fr: {
    title: "Guides vidéo",
    formation: {
      category: "Créer une entreprise en Europe",
      name: "Immatriculer une entreprise auprès de la KVK",
      summary: "La Chambre de commerce néerlandaise présente les démarches aux Pays-Bas. Parlons des étapes adaptées à votre pays de destination.",
      format: "En néerlandais · sous-titres anglais et néerlandais",
      cta: "Réserver une consultation",
    },
    heritage: {
      category: "Patrimoine mondial",
      name: "Explorer le patrimoine numérique de l’UNESCO",
      summary: "Découvrez Dive into Heritage et échangez avec nous sur la numérisation de collections ou la gestion durable d’un site.",
      format: "Démonstration",
      cta: "Proposer un partenariat",
    },
    series: "Série de vidéos",
    watch: "Voir sur YouTube",
    source: "Source officielle",
  },
  de: {
    title: "Videoanleitungen",
    formation: {
      category: "Unternehmensgründung in Europa",
      name: "Ein Unternehmen bei der KVK anmelden",
      summary: "Die niederländische Handelskammer zeigt die Anmeldung in den Niederlanden. Besprechen Sie mit uns die Schritte für Ihr Zielland.",
      format: "Niederländisch · englische und niederländische Untertitel",
      cta: "Gründungsberatung anfragen",
    },
    heritage: {
      category: "Welterbe",
      name: "Die digitale Welterbe-Plattform der UNESCO",
      summary: "Entdecken Sie Dive into Heritage und sprechen Sie mit uns über die Digitalisierung einer Sammlung oder den nachhaltigen Betrieb einer Welterbestätte.",
      format: "Plattformdemo",
      cta: "Kooperation besprechen",
    },
    series: "Videoreihe",
    watch: "Auf YouTube ansehen",
    source: "Offizielle Quelle",
  },
  es: {
    title: "Guías en vídeo",
    formation: {
      category: "Crear una empresa en Europa",
      name: "Registrar una empresa en la KVK",
      summary: "La Cámara de Comercio neerlandesa explica el registro en los Países Bajos. Consúltanos sobre los pasos en tu país de destino.",
      format: "Audio en neerlandés · subtítulos en inglés y neerlandés",
      cta: "Solicitar una consulta",
    },
    heritage: {
      category: "Patrimonio mundial",
      name: "Explorar el patrimonio digital de la UNESCO",
      summary: "Conoce Dive into Heritage y hablemos de la digitalización de colecciones o de la gestión sostenible de un sitio.",
      format: "Demostración",
      cta: "Proponer una colaboración",
    },
    series: "Serie de vídeos",
    watch: "Ver en YouTube",
    source: "Fuente oficial",
  },
  pt: {
    title: "Guias em vídeo",
    formation: {
      category: "Criar uma empresa na Europa",
      name: "Registar uma empresa na KVK",
      summary: "A Câmara de Comércio neerlandesa explica o registo nos Países Baixos. Fale connosco sobre os passos no seu país de destino.",
      format: "Áudio em neerlandês · legendas em inglês e neerlandês",
      cta: "Marcar uma consulta",
    },
    heritage: {
      category: "Património mundial",
      name: "Explorar o património digital da UNESCO",
      summary: "Conheça a plataforma Dive into Heritage e fale connosco sobre a digitalização de coleções ou a gestão sustentável de um sítio patrimonial.",
      format: "Demonstração da plataforma",
      cta: "Propor uma parceria",
    },
    series: "Série de vídeos",
    watch: "Ver no YouTube",
    source: "Fonte oficial",
  },
  ja: {
    title: "動画ガイド",
    formation: {
      category: "欧州での会社設立",
      name: "オランダ商業会議所（KVK）での事業登録",
      summary: "オランダ商業会議所が現地の事業登録を解説します。設立を希望する国での手順についてご相談いただけます。",
      format: "オランダ語音声・英語／オランダ語字幕",
      cta: "会社設立の相談を予約",
    },
    heritage: {
      category: "世界遺産",
      name: "ユネスコのデジタル遺産プラットフォーム",
      summary: "Dive into Heritage のデモを紹介します。コレクションのデジタル化や遺産の持続可能な運営についてご相談ください。",
      format: "プラットフォームのデモ",
      cta: "遺産プロジェクトの連携を相談",
    },
    series: "動画シリーズ",
    watch: "YouTube で見る",
    source: "公式資料",
  },
};
