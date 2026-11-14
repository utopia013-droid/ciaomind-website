import { locales, type Locale } from '@/lib/i18n';

export type BusinessLocale = Locale;
export function resolveBusinessLocale(lang: string): BusinessLocale {
  return locales.find(locale => locale === lang) ?? 'zh';
}

type Label = Record<BusinessLocale, string>;
export type BusinessVariant = { id: string; label: Label };
export type BusinessService = {
  id: string;
  group: string;
  name: Label;
  summary: Label;
  variants: BusinessVariant[];
};

export const businessGroups = [
  {
    "id": "open",
    "title": {
      "zh": "开办业务",
      "it": "Apri un’attività",
      "en": "Start a business",
      "fr": "Créer une activité",
      "de": "Ein Unternehmen gründen",
      "es": "Iniciar una actividad"
    },
    "intro": {
      "zh": "从选择经营形式到整理开办材料。",
      "it": "Dalla scelta della forma ai documenti di avvio.",
      "en": "From choosing a legal form to preparing the documents.",
      "fr": "Choisissez une structure et préparez votre dossier.",
      "de": "Wählen Sie eine Rechtsform und bereiten Sie die Unterlagen vor.",
      "es": "Elige la forma jurídica y prepara la documentación."
    }
  },
  {
    "id": "manage",
    "title": {
      "zh": "经营管理",
      "it": "Gestisci l’attività",
      "en": "Manage your business",
      "fr": "Gérer son activité",
      "de": "Ein Unternehmen führen",
      "es": "Gestionar tu actividad"
    },
    "intro": {
      "zh": "把日常会计、文件和专业需求整理到同一个入口。",
      "it": "Riunisci contabilità, documenti e richieste professionali in un unico punto.",
      "en": "Bring accounting, documents and expert requests together.",
      "fr": "Regroupez comptabilité, documents et demandes de conseil.",
      "de": "Organisieren Sie Buchhaltung, Dokumente und Beratungsanfragen an einem Ort.",
      "es": "Reúne la contabilidad, los documentos y las consultas en un único lugar."
    }
  },
  {
    "id": "tools",
    "title": {
      "zh": "工具与合作服务",
      "it": "Strumenti e servizi partner",
      "en": "Tools and partner services",
      "fr": "Outils et services partenaires",
      "de": "Tools und Partnerdienste",
      "es": "Herramientas y servicios asociados"
    },
    "intro": {
      "zh": "按需要选择辅助服务，先确认适用范围。",
      "it": "Scegli il supporto che ti serve e concorda il perimetro.",
      "en": "Choose the support you need and confirm its scope.",
      "fr": "Choisissez l’appui adapté et précisez votre besoin.",
      "de": "Wählen Sie die passende Unterstützung und klären Sie den Umfang.",
      "es": "Elige el apoyo que necesitas y define su alcance."
    }
  }
];

export const businessServices: BusinessService[] = [
  {
    "id": "incorporation",
    "group": "open",
    "name": {
      "zh": "公司设立",
      "it": "Costituzione società",
      "en": "Company formation",
      "fr": "Création de société",
      "de": "Gesellschaftsgründung",
      "es": "Constitución de sociedades"
    },
    "summary": {
      "zh": "按公司形式梳理设立条件、材料和后续手续。",
      "it": "Inquadra forma societaria, documenti e passaggi successivi.",
      "en": "Prepare documents and map the steps for the chosen company type.",
      "fr": "Préparez le dossier et les démarches selon la forme de société.",
      "de": "Bereiten Sie Unterlagen und Schritte für die gewählte Gesellschaftsform vor.",
      "es": "Prepara la documentación y los trámites según el tipo de sociedad."
    },
    "variants": [
      {
        "id": "srl",
        "label": {
          "zh": "SRL 有限责任公司",
          "it": "SRL",
          "en": "SRL limited liability company",
          "fr": "Société à responsabilité limitée (SRL)",
          "de": "Italienische GmbH (SRL)",
          "es": "Sociedad limitada italiana (SRL)"
        }
      },
      {
        "id": "srls",
        "label": {
          "zh": "SRLS 简化有限责任公司",
          "it": "SRLS",
          "en": "SRLS simplified company",
          "fr": "Société simplifiée (SRLS)",
          "de": "Vereinfachte italienische GmbH (SRLS)",
          "es": "Sociedad limitada simplificada (SRLS)"
        }
      },
      {
        "id": "startup",
        "label": {
          "zh": "创新初创公司",
          "it": "Startup innovativa",
          "en": "Innovative startup",
          "fr": "Startup innovante",
          "de": "Innovatives Startup",
          "es": "Empresa emergente innovadora"
        }
      }
    ]
  },
  {
    "id": "vat-opening",
    "group": "open",
    "name": {
      "zh": "开通 Partita IVA",
      "it": "Apertura partita IVA",
      "en": "VAT registration",
      "fr": "Immatriculation à la TVA",
      "de": "Umsatzsteuerregistrierung",
      "es": "Alta de IVA"
    },
    "summary": {
      "zh": "整理自由职业或个体经营的开办需求。",
      "it": "Prepara la richiesta per avviare un’attività professionale o individuale.",
      "en": "Prepare a request to start working as a professional or sole trader.",
      "fr": "Préparez votre demande de démarrage en tant que professionnel ou indépendant.",
      "de": "Bereiten Sie die Anmeldung einer freiberuflichen oder selbstständigen Tätigkeit vor.",
      "es": "Prepara la solicitud para empezar una actividad profesional o individual."
    },
    "variants": [
      {
        "id": "professional",
        "label": {
          "zh": "自由职业",
          "it": "Libera professione",
          "en": "Freelance professional",
          "fr": "Profession libérale",
          "de": "Freier Beruf",
          "es": "Profesional autónomo"
        }
      },
      {
        "id": "sole-trader",
        "label": {
          "zh": "个体经营",
          "it": "Ditta individuale",
          "en": "Sole trader",
          "fr": "Entreprise individuelle",
          "de": "Einzelunternehmen",
          "es": "Empresa individual"
        }
      }
    ]
  },
  {
    "id": "association",
    "group": "open",
    "name": {
      "zh": "设立协会",
      "it": "Costituzione associazione",
      "en": "Set up an association",
      "fr": "Création d’association",
      "de": "Vereinsgründung",
      "es": "Constitución de asociaciones"
    },
    "summary": {
      "zh": "梳理协会的宗旨、组织形式和设立资料。",
      "it": "Definisci finalità, forma e documenti per l’associazione.",
      "en": "Outline your association’s purpose, structure and documents.",
      "fr": "Précisez l’objet, la structure et les pièces de l’association.",
      "de": "Klären Sie Zweck, Struktur und Unterlagen für Ihren Verein.",
      "es": "Define la finalidad, estructura y documentos de la asociación."
    },
    "variants": [
      {
        "id": "association",
        "label": {
          "zh": "协会设立",
          "it": "Nuova associazione",
          "en": "New association",
          "fr": "Nouvelle association",
          "de": "Neuer Verein",
          "es": "Nueva asociación"
        }
      }
    ]
  },
  {
    "id": "accounting",
    "group": "manage",
    "name": {
      "zh": "在线会计",
      "it": "Contabilità online",
      "en": "Online accounting",
      "fr": "Comptabilité en ligne",
      "de": "Online-Buchhaltung",
      "es": "Contabilidad en línea"
    },
    "summary": {
      "zh": "按主体类型整理账务、报送期限和电子发票需求。",
      "it": "Inquadra contabilità, scadenze e fatturazione elettronica in base al soggetto.",
      "en": "Outline bookkeeping, reporting deadlines and e-invoicing needs.",
      "fr": "Précisez les besoins de comptabilité, déclarations et facturation électronique.",
      "de": "Klären Sie Buchhaltung, Meldefristen und elektronische Rechnungen.",
      "es": "Define tus necesidades contables, de plazos y de facturación electrónica."
    },
    "variants": [
      {
        "id": "company",
        "label": {
          "zh": "公司会计",
          "it": "Contabilità società",
          "en": "Company accounting",
          "fr": "Comptabilité des sociétés",
          "de": "Buchhaltung für Gesellschaften",
          "es": "Contabilidad de sociedades"
        }
      },
      {
        "id": "sole-trader",
        "label": {
          "zh": "个体经营会计",
          "it": "Contabilità ditte individuali",
          "en": "Sole trader accounting",
          "fr": "Comptabilité des indépendants",
          "de": "Buchhaltung für Einzelunternehmen",
          "es": "Contabilidad de empresas individuales"
        }
      },
      {
        "id": "association",
        "label": {
          "zh": "协会会计",
          "it": "Contabilità associazioni",
          "en": "Association accounting",
          "fr": "Comptabilité des associations",
          "de": "Buchhaltung für Vereine",
          "es": "Contabilidad de asociaciones"
        }
      }
    ]
  },
  {
    "id": "contracts",
    "group": "manage",
    "name": {
      "zh": "合同与文件",
      "it": "Contratti e documenti",
      "en": "Contracts and documents",
      "fr": "Contrats et documents",
      "de": "Verträge und Dokumente",
      "es": "Contratos y documentos"
    },
    "summary": {
      "zh": "按用途选择合同类型，提交起草或审阅需求。",
      "it": "Scegli un tipo di documento e richiedi preparazione o revisione.",
      "en": "Select a document type to ask for drafting or review.",
      "fr": "Choisissez un document à préparer ou à faire relire.",
      "de": "Wählen Sie ein Dokument zur Erstellung oder Prüfung.",
      "es": "Elige el tipo de documento que quieres preparar o revisar."
    },
    "variants": [
      {
        "id": "work",
        "label": {
          "zh": "承揽合同",
          "it": "Contratto di realizzazione d’opera",
          "en": "Works contract",
          "fr": "Contrat d’entreprise",
          "de": "Werkvertrag",
          "es": "Contrato de obra"
        }
      },
      {
        "id": "service",
        "label": {
          "zh": "服务合同",
          "it": "Contratto di fornitura di servizi",
          "en": "Service agreement",
          "fr": "Contrat de prestation",
          "de": "Dienstleistungsvertrag",
          "es": "Contrato de servicios"
        }
      },
      {
        "id": "nda",
        "label": {
          "zh": "保密协议",
          "it": "Accordo di riservatezza",
          "en": "Non-disclosure agreement",
          "fr": "Accord de confidentialité",
          "de": "Vertraulichkeitsvereinbarung",
          "es": "Acuerdo de confidencialidad"
        }
      },
      {
        "id": "site-terms",
        "label": {
          "zh": "网站条款",
          "it": "Termini del sito",
          "en": "Website terms",
          "fr": "Conditions du site",
          "de": "Website-Bedingungen",
          "es": "Condiciones del sitio"
        }
      },
      {
        "id": "privacy",
        "label": {
          "zh": "隐私政策",
          "it": "Informativa privacy",
          "en": "Privacy notice",
          "fr": "Politique de confidentialité",
          "de": "Datenschutzhinweise",
          "es": "Aviso de privacidad"
        }
      }
    ]
  },
  {
    "id": "consultation",
    "group": "manage",
    "name": {
      "zh": "专业咨询",
      "it": "Consulenze",
      "en": "Professional consultations",
      "fr": "Conseil professionnel",
      "de": "Fachberatung",
      "es": "Consultas profesionales"
    },
    "summary": {
      "zh": "选择一个具体问题，由团队先确认需要哪类专业支持。",
      "it": "Indica un quesito concreto per individuare il tipo di supporto necessario.",
      "en": "Describe a specific question so we can identify the support you need.",
      "fr": "Décrivez une question précise pour identifier l’accompagnement adapté.",
      "de": "Beschreiben Sie eine konkrete Frage, um die passende Unterstützung zu finden.",
      "es": "Describe una pregunta concreta para identificar el apoyo adecuado."
    },
    "variants": [
      {
        "id": "shares",
        "label": {
          "zh": "SRL 股权转让",
          "it": "Cessione quote SRL",
          "en": "SRL share transfer",
          "fr": "Cession de parts de SRL",
          "de": "Übertragung von SRL-Anteilen",
          "es": "Cesión de participaciones de una SRL"
        }
      },
      {
        "id": "trademark",
        "label": {
          "zh": "商标注册",
          "it": "Registrazione marchio",
          "en": "Trademark registration",
          "fr": "Dépôt de marque",
          "de": "Markenanmeldung",
          "es": "Registro de marca"
        }
      },
      {
        "id": "gdpr",
        "label": {
          "zh": "GDPR 合规",
          "it": "Adeguamento GDPR",
          "en": "GDPR compliance",
          "fr": "Conformité RGPD",
          "de": "DSGVO-Anforderungen",
          "es": "Cumplimiento del RGPD"
        }
      },
      {
        "id": "work-for-equity",
        "label": {
          "zh": "以服务换股权",
          "it": "Work for equity",
          "en": "Work for equity",
          "fr": "Rémunération en capital",
          "de": "Vergütung durch Anteile",
          "es": "Trabajo a cambio de participaciones"
        }
      },
      {
        "id": "other",
        "label": {
          "zh": "其他专业问题",
          "it": "Altro quesito",
          "en": "Other question",
          "fr": "Autre question",
          "de": "Andere Frage",
          "es": "Otra consulta"
        }
      }
    ]
  },
  {
    "id": "payroll",
    "group": "manage",
    "name": {
      "zh": "工资单与劳动事务",
      "it": "Paghe e consulenza del lavoro",
      "en": "Payroll and employment",
      "fr": "Paie et droit du travail",
      "de": "Lohnabrechnung und Personal",
      "es": "Nóminas y gestión laboral"
    },
    "summary": {
      "zh": "整理用工、员工管理和工资单相关需求。",
      "it": "Descrivi le esigenze di gestione del personale, paghe e adempimenti.",
      "en": "Describe your payroll, staffing and employment needs.",
      "fr": "Décrivez vos besoins de paie et de gestion du personnel.",
      "de": "Beschreiben Sie Ihre Anforderungen an Lohnabrechnung und Personalverwaltung.",
      "es": "Indica qué necesitas en nóminas y administración de personal."
    },
    "variants": [
      {
        "id": "payroll",
        "label": {
          "zh": "工资单",
          "it": "Cedolini paga",
          "en": "Payslips",
          "fr": "Bulletins de paie",
          "de": "Lohnabrechnungen",
          "es": "Nóminas"
        }
      },
      {
        "id": "employment",
        "label": {
          "zh": "劳动事务",
          "it": "Gestione del personale",
          "en": "Staff administration",
          "fr": "Gestion du personnel",
          "de": "Personalverwaltung",
          "es": "Gestión de personal"
        }
      }
    ]
  },
  {
    "id": "registered-office",
    "group": "tools",
    "name": {
      "zh": "注册地址服务",
      "it": "Domiciliazione",
      "en": "Registered office services",
      "fr": "Domiciliation",
      "de": "Geschäftsanschrift",
      "es": "Domicilio social"
    },
    "summary": {
      "zh": "按主体类型提交注册地点和信件处理需求。",
      "it": "Descrivi le esigenze di sede legale e gestione della corrispondenza.",
      "en": "Describe your registered address and mail handling needs.",
      "fr": "Précisez vos besoins de siège social et de gestion du courrier.",
      "de": "Beschreiben Sie den Bedarf an einer Geschäftsadresse und Postbearbeitung.",
      "es": "Indica tus necesidades de domicilio social y gestión de correspondencia."
    },
    "variants": [
      {
        "id": "company",
        "label": {
          "zh": "公司住所",
          "it": "Domiciliazione società",
          "en": "Company address",
          "fr": "Domiciliation de société",
          "de": "Gesellschaftsanschrift",
          "es": "Domicilio de sociedad"
        }
      },
      {
        "id": "association",
        "label": {
          "zh": "协会住所",
          "it": "Domiciliazione associazione",
          "en": "Association address",
          "fr": "Domiciliation d’association",
          "de": "Vereinsanschrift",
          "es": "Domicilio de asociación"
        }
      }
    ]
  },
  {
    "id": "partner-services",
    "group": "tools",
    "name": {
      "zh": "合作伙伴服务",
      "it": "Servizi partner",
      "en": "Partner services",
      "fr": "Services partenaires",
      "de": "Partnerdienste",
      "es": "Servicios asociados"
    },
    "summary": {
      "zh": "按企业账户、收款或融资用途提交需求。",
      "it": "Richiedi un orientamento su conti, incassi o finanziamenti.",
      "en": "Request guidance on business accounts, payments or funding.",
      "fr": "Demandez un accompagnement pour les comptes, les paiements ou le financement.",
      "de": "Fragen Sie Unterstützung zu Geschäftskonten, Zahlungen oder Finanzierung an.",
      "es": "Solicita orientación sobre cuentas, cobros o financiación."
    },
    "variants": [
      {
        "id": "bank-account",
        "label": {
          "zh": "企业账户",
          "it": "Conto aziendale",
          "en": "Business account",
          "fr": "Compte professionnel",
          "de": "Geschäftskonto",
          "es": "Cuenta de empresa"
        }
      },
      {
        "id": "pos",
        "label": {
          "zh": "收款与 POS",
          "it": "Incassi e POS",
          "en": "Payments and POS",
          "fr": "Encaissement et terminal",
          "de": "Zahlungen und POS",
          "es": "Cobros y TPV"
        }
      },
      {
        "id": "funding",
        "label": {
          "zh": "贷款与资助",
          "it": "Finanziamenti e bandi",
          "en": "Funding and grants",
          "fr": "Financements et aides",
          "de": "Finanzierung und Förderung",
          "es": "Financiación y ayudas"
        }
      }
    ]
  },
  {
    "id": "ai-assistant",
    "group": "tools",
    "name": {
      "zh": "AI 助手",
      "it": "Assistente AI",
      "en": "AI assistant",
      "fr": "Assistant IA",
      "de": "KI-Assistent",
      "es": "Asistente de IA"
    },
    "summary": {
      "zh": "提交想梳理的经营问题，确认 AI 工具可以协助的环节。",
      "it": "Indica una domanda operativa per capire dove uno strumento AI può aiutare.",
      "en": "Describe a business question to identify where AI could help.",
      "fr": "Décrivez une question d’entreprise pour identifier où l’IA pourrait aider.",
      "de": "Beschreiben Sie eine betriebliche Frage, bei der KI helfen könnte.",
      "es": "Describe una consulta operativa para identificar dónde puede ayudar la IA."
    },
    "variants": [
      {
        "id": "orientation",
        "label": {
          "zh": "经营问题梳理",
          "it": "Orientamento operativo",
          "en": "Business guidance",
          "fr": "Orientation pour l’entreprise",
          "de": "Betriebliche Orientierung",
          "es": "Orientación para empresas"
        }
      }
    ]
  }
];
