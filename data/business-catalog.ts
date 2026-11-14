export type BusinessLocale = 'zh' | 'it';

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
      "it": "Apri un’attività"
    },
    "intro": {
      "zh": "从选择经营形式到整理开办材料。",
      "it": "Dalla scelta della forma ai documenti di avvio."
    }
  },
  {
    "id": "manage",
    "title": {
      "zh": "经营管理",
      "it": "Gestisci l’attività"
    },
    "intro": {
      "zh": "把日常会计、文件和专业需求整理到同一个入口。",
      "it": "Riunisci contabilità, documenti e richieste professionali in un unico punto."
    }
  },
  {
    "id": "tools",
    "title": {
      "zh": "工具与合作服务",
      "it": "Strumenti e servizi partner"
    },
    "intro": {
      "zh": "按需要选择辅助服务，先确认适用范围。",
      "it": "Scegli il supporto che ti serve e concorda il perimetro."
    }
  }
];

export const businessServices: BusinessService[] = [
  {
    "id": "incorporation",
    "group": "open",
    "name": {
      "zh": "公司设立",
      "it": "Costituzione società"
    },
    "summary": {
      "zh": "按公司形式梳理设立条件、材料和后续手续。",
      "it": "Inquadra forma societaria, documenti e passaggi successivi."
    },
    "variants": [
      {
        "id": "srl",
        "label": {
          "zh": "SRL 有限责任公司",
          "it": "SRL"
        }
      },
      {
        "id": "srls",
        "label": {
          "zh": "SRLS 简化有限责任公司",
          "it": "SRLS"
        }
      },
      {
        "id": "startup",
        "label": {
          "zh": "创新初创公司",
          "it": "Startup innovativa"
        }
      }
    ]
  },
  {
    "id": "vat-opening",
    "group": "open",
    "name": {
      "zh": "开通 Partita IVA",
      "it": "Apertura partita IVA"
    },
    "summary": {
      "zh": "整理自由职业或个体经营的开办需求。",
      "it": "Prepara la richiesta per avviare un’attività professionale o individuale."
    },
    "variants": [
      {
        "id": "professional",
        "label": {
          "zh": "自由职业",
          "it": "Libera professione"
        }
      },
      {
        "id": "sole-trader",
        "label": {
          "zh": "个体经营",
          "it": "Ditta individuale"
        }
      }
    ]
  },
  {
    "id": "association",
    "group": "open",
    "name": {
      "zh": "设立协会",
      "it": "Costituzione associazione"
    },
    "summary": {
      "zh": "梳理协会的宗旨、组织形式和设立资料。",
      "it": "Definisci finalità, forma e documenti per l’associazione."
    },
    "variants": [
      {
        "id": "association",
        "label": {
          "zh": "协会设立",
          "it": "Nuova associazione"
        }
      }
    ]
  },
  {
    "id": "accounting",
    "group": "manage",
    "name": {
      "zh": "在线会计",
      "it": "Contabilità online"
    },
    "summary": {
      "zh": "按主体类型整理账务、报送期限和电子发票需求。",
      "it": "Inquadra contabilità, scadenze e fatturazione elettronica in base al soggetto."
    },
    "variants": [
      {
        "id": "company",
        "label": {
          "zh": "公司会计",
          "it": "Contabilità società"
        }
      },
      {
        "id": "sole-trader",
        "label": {
          "zh": "个体经营会计",
          "it": "Contabilità ditte individuali"
        }
      },
      {
        "id": "association",
        "label": {
          "zh": "协会会计",
          "it": "Contabilità associazioni"
        }
      }
    ]
  },
  {
    "id": "contracts",
    "group": "manage",
    "name": {
      "zh": "合同与文件",
      "it": "Contratti e documenti"
    },
    "summary": {
      "zh": "按用途选择合同类型，提交起草或审阅需求。",
      "it": "Scegli un tipo di documento e richiedi preparazione o revisione."
    },
    "variants": [
      {
        "id": "work",
        "label": {
          "zh": "承揽合同",
          "it": "Contratto di realizzazione d’opera"
        }
      },
      {
        "id": "service",
        "label": {
          "zh": "服务合同",
          "it": "Contratto di fornitura di servizi"
        }
      },
      {
        "id": "nda",
        "label": {
          "zh": "保密协议",
          "it": "Accordo di riservatezza"
        }
      },
      {
        "id": "site-terms",
        "label": {
          "zh": "网站条款",
          "it": "Termini del sito"
        }
      },
      {
        "id": "privacy",
        "label": {
          "zh": "隐私政策",
          "it": "Informativa privacy"
        }
      }
    ]
  },
  {
    "id": "consultation",
    "group": "manage",
    "name": {
      "zh": "专业咨询",
      "it": "Consulenze"
    },
    "summary": {
      "zh": "选择一个具体问题，由团队先确认需要哪类专业支持。",
      "it": "Indica un quesito concreto per individuare il tipo di supporto necessario."
    },
    "variants": [
      {
        "id": "shares",
        "label": {
          "zh": "SRL 股权转让",
          "it": "Cessione quote SRL"
        }
      },
      {
        "id": "trademark",
        "label": {
          "zh": "商标注册",
          "it": "Registrazione marchio"
        }
      },
      {
        "id": "gdpr",
        "label": {
          "zh": "GDPR 合规",
          "it": "Adeguamento GDPR"
        }
      },
      {
        "id": "work-for-equity",
        "label": {
          "zh": "以服务换股权",
          "it": "Work for equity"
        }
      },
      {
        "id": "other",
        "label": {
          "zh": "其他专业问题",
          "it": "Altro quesito"
        }
      }
    ]
  },
  {
    "id": "payroll",
    "group": "manage",
    "name": {
      "zh": "工资单与劳动事务",
      "it": "Paghe e consulenza del lavoro"
    },
    "summary": {
      "zh": "整理用工、员工管理和工资单相关需求。",
      "it": "Descrivi le esigenze di gestione del personale, paghe e adempimenti."
    },
    "variants": [
      {
        "id": "payroll",
        "label": {
          "zh": "工资单",
          "it": "Cedolini paga"
        }
      },
      {
        "id": "employment",
        "label": {
          "zh": "劳动事务",
          "it": "Gestione del personale"
        }
      }
    ]
  },
  {
    "id": "registered-office",
    "group": "tools",
    "name": {
      "zh": "注册地址服务",
      "it": "Domiciliazione"
    },
    "summary": {
      "zh": "按主体类型提交注册地点和信件处理需求。",
      "it": "Descrivi le esigenze di sede legale e gestione della corrispondenza."
    },
    "variants": [
      {
        "id": "company",
        "label": {
          "zh": "公司住所",
          "it": "Domiciliazione società"
        }
      },
      {
        "id": "association",
        "label": {
          "zh": "协会住所",
          "it": "Domiciliazione associazione"
        }
      }
    ]
  },
  {
    "id": "partner-services",
    "group": "tools",
    "name": {
      "zh": "合作伙伴服务",
      "it": "Servizi partner"
    },
    "summary": {
      "zh": "按企业账户、收款或融资用途提交需求。",
      "it": "Richiedi un orientamento su conti, incassi o finanziamenti."
    },
    "variants": [
      {
        "id": "bank-account",
        "label": {
          "zh": "企业账户",
          "it": "Conto aziendale"
        }
      },
      {
        "id": "pos",
        "label": {
          "zh": "收款与 POS",
          "it": "Incassi e POS"
        }
      },
      {
        "id": "funding",
        "label": {
          "zh": "贷款与资助",
          "it": "Finanziamenti e bandi"
        }
      }
    ]
  },
  {
    "id": "ai-assistant",
    "group": "tools",
    "name": {
      "zh": "AI 助手",
      "it": "Assistente AI"
    },
    "summary": {
      "zh": "提交想梳理的经营问题，确认 AI 工具可以协助的环节。",
      "it": "Indica una domanda operativa per capire dove uno strumento AI può aiutare."
    },
    "variants": [
      {
        "id": "orientation",
        "label": {
          "zh": "经营问题梳理",
          "it": "Orientamento operativo"
        }
      }
    ]
  }
];
