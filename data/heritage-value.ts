import type { Locale } from '@/lib/i18n';

type Stage = readonly [string, string];
export type EcosystemText = {
  hero: string[]; intro: string; title: string; mission: string; pathTitle: string; pathIntro: string;
  stages: Stage[]; cards: Stage[]; rolesTitle: string; roles: string[]; rolesIntro: string;
  contact: string; explore: string; videos: string; libraryTitle: string; libraryIntro: string;
  all: string; watch: string; play: string; close: string; chapter: string; notice: string;
  capital: string; status: string; formation: string; heritage: string; loop: string;
  technologyTitle: string; technology: Stage[];
};

export const ecosystemCopy: Record<Locale, EcosystemText> = {
  "zh": {
    "hero": [
      "在欧洲开展业务，",
      "让文化价值生长。"
    ],
    "intro": "协助创业者评估欧洲企业设立路径，并探索从文化与 IP 保护、数字化到设计制造、品牌市场和持续运营的产业协同。 以 AI 与物联网连接区域文化、品牌、供应链和更广阔的市场。",
    "title": "从文化保护到产业协同",
    "mission": "CIAOMIND 以文化遗产、文化要素与知识产权保护为起点，探索数字化、精益制造、品牌营销和经营管理的连接，让产业发展持续支持文化保护与新的创造。 以 AI 与物联网连接区域文化、品牌、供应链和更广阔的市场。",
    "pathTitle": "连接文化与产业的价值链",
    "pathIntro": "从一项权利清晰的文化资源和一个具体项目开始，逐步连接专业伙伴、交付流程和经营数据。",
    "stages": [
      [
        "保护与数字化",
        "确认来源、持有者、授权范围与利益分配，建立可追踪的数字档案。"
      ],
      [
        "设计与精益制造",
        "连接设计师、工匠与制造商，推进材料选择、打样、质量和交付协同。"
      ],
      [
        "品牌与市场",
        "围绕文化故事与客户需求，协同品牌定位、内容营销、渠道和售后反馈。"
      ],
      [
        "运营与财务",
        "以共同的项目、订单与成本口径，跟踪责任、进度、收入和现金流。"
      ],
      [
        "扩张与资本合作",
        "在验证经营模式后，评估标准化复制、合作重组与融资准备。"
      ],
      [
        "循环与再投入",
        "探索维修、再制造、再销售，以及对文化保护和工艺传承的持续投入。"
      ]
    ],
    "cards": [
      [
        "欧洲企业设立",
        "评估设立国家、材料与专业服务路径，为进入欧洲市场做好准备。"
      ],
      [
        "文化遗产与 IP",
        "讨论文化记录、数字资产、授权开发与可持续运营。"
      ],
      [
        "产业与品牌协同",
        "连接设计、生产、品牌和市场，共同定义一个可交付的项目。"
      ]
    ],
    "rolesTitle": "从你的角色进入合作",
    "roles": [
      "文化机构与权利持有者",
      "区域品牌、设计师与市场运营方",
      "工匠、制造商与产业伙伴"
    ],
    "rolesIntro": "带上你的资源、目标、合作范围与当前难点。我们从需求梳理和伙伴沟通开始。",
    "contact": "讨论合作项目",
    "explore": "了解服务路径",
    "videos": "观看案例与方法",
    "libraryTitle": "文化价值与产业协同 · 视频选片",
    "libraryIntro": "精选外部视频串起保护、AI、物联网、制造、市场、财务与循环发展。通过具体项目逐步验证 CIAOMIND 的方案。",
    "all": "全部视频",
    "watch": "在 YouTube 观看",
    "play": "播放视频",
    "close": "关闭播放器",
    "chapter": "业务环节",
    "notice": "点击播放将连接 YouTube。视频由各发布方制作。",
    "capital": "资本合作将围绕可核验的权利、合同、成本、收入与资金用途展开评估。",
    "status": "合作方式与交付范围按具体项目确认。",
    "formation": "咨询企业设立",
    "heritage": "咨询文化与产业合作",
    "loop": "以循环发展为指导，让经营收益持续支持文化保护。",
    "technologyTitle": "AI 与物联网贯穿其中",
    "technology": [
      [
        "AI 辅助研究与协同",
        "探索识别、资料整理、多语内容、设计辅助与协同决策，专业判断由人复核。"
      ],
      [
        "物联网与数据连接",
        "按项目探索实物采集、环境与设备状态、生产追踪和产品溯源。"
      ]
    ]
  },
  "en": {
    "hero": [
      "Build your business in Europe.",
      "Keep cultural value growing."
    ],
    "intro": "Explore company formation in Europe and a connected path from cultural and IP protection to digitisation, manufacturing, brands and lasting operations. Connect regional culture, brands, supply chains and wider markets through AI and IoT.",
    "title": "From cultural protection to industrial collaboration",
    "mission": "CIAOMIND explores how protecting cultural heritage, cultural resources and intellectual property can connect digitisation, lean production, brand development and business management, supporting preservation and new creative work. Connect regional culture, brands, supply chains and wider markets through AI and IoT.",
    "pathTitle": "A value chain to build step by step",
    "pathIntro": "Start with a clearly authorised cultural resource and a defined project, then connect specialist partners, delivery processes and business records.",
    "stages": [
      [
        "Protect & digitise",
        "Establish provenance, custodians, permissions and benefit sharing. Build traceable digital records."
      ],
      [
        "Design & lean production",
        "Connect designers, artisans and manufacturers around materials, prototypes, quality and delivery."
      ],
      [
        "Brands & markets",
        "Connect cultural storytelling and customer needs with positioning, marketing, channels and service feedback."
      ],
      [
        "Operations & finance",
        "Track ownership, delivery, revenue and cash flow through shared project, order and cost definitions."
      ],
      [
        "Growth & capital partnerships",
        "After validating the operating model, assess repeatable processes, partnerships and financing readiness."
      ],
      [
        "Circulation & reinvestment",
        "Explore repair, remanufacturing, resale and continued investment in cultural preservation and craft skills."
      ]
    ],
    "cards": [
      [
        "Company formation in Europe",
        "Assess destination countries, documentation and professional support for entering European markets."
      ],
      [
        "Cultural heritage & IP",
        "Discuss documentation, digital assets, licensed development and sustainable operations."
      ],
      [
        "Industry & brand collaboration",
        "Connect design, production, brands and markets around a project with defined deliverables."
      ]
    ],
    "rolesTitle": "Join from your area of expertise",
    "roles": [
      "Cultural institutions & rights holders",
      "Regional brands, designers & market operators",
      "Artisans, manufacturers & industry partners"
    ],
    "rolesIntro": "Share your resources, goals, proposed scope and current challenges. We begin with a needs review and partner conversations.",
    "contact": "Discuss a partnership",
    "explore": "Explore service pathways",
    "videos": "Watch cases & methods",
    "libraryTitle": "Cultural value & industry · Video selection",
    "libraryIntro": "External videos connect protection, AI, IoT, production, markets, finance and circular development. CIAOMIND tests its approach through defined projects.",
    "all": "All videos",
    "watch": "Watch on YouTube",
    "play": "Play video",
    "close": "Close player",
    "chapter": "Business stage",
    "notice": "Playing a video connects to YouTube. Each video is produced by its credited publisher.",
    "capital": "Capital partnerships are assessed against verifiable rights, contracts, costs, revenue and uses of funds.",
    "status": "Partnership terms and deliverables are agreed for each project.",
    "formation": "Discuss company formation",
    "heritage": "Discuss culture & industry",
    "loop": "Guided by circular development, reinvest business value in cultural preservation.",
    "technologyTitle": "AI and IoT across the value chain",
    "technology": [
      [
        "AI-assisted research & collaboration",
        "Explore recognition, documentation, multilingual content, design assistance and coordination, with human review."
      ],
      [
        "IoT & connected data",
        "Explore physical capture, environmental and equipment data, production tracking and product traceability by project."
      ]
    ]
  },
  "it": {
    "hero": [
      "Fare impresa in Europa.",
      "Far crescere il valore culturale."
    ],
    "intro": "Valutiamo percorsi di costituzione in Europa e collegamenti tra tutela culturale e della proprietà intellettuale, digitalizzazione, produzione, marchi e gestione duratura. Collegare cultura territoriale, marchi, filiere e mercati più ampi con AI e IoT.",
    "title": "Dalla tutela culturale alla collaborazione industriale",
    "mission": "CIAOMIND esplora come la tutela del patrimonio, delle risorse culturali e della proprietà intellettuale possa collegare digitalizzazione, produzione snella, marchi e gestione, sostenendo conservazione e nuova creatività. Collegare cultura territoriale, marchi, filiere e mercati più ampi con AI e IoT.",
    "pathTitle": "Una filiera da costruire passo dopo passo",
    "pathIntro": "Partire da una risorsa culturale autorizzata e da un progetto definito, per collegare professionisti, processi e dati gestionali.",
    "stages": [
      [
        "Tutela e digitalizzazione",
        "Verificare provenienza, titolari, autorizzazioni e condivisione dei benefici. Creare archivi digitali tracciabili."
      ],
      [
        "Design e produzione snella",
        "Collegare designer, artigiani e produttori su materiali, prototipi, qualità e consegne."
      ],
      [
        "Marchi e mercati",
        "Unire racconto culturale e bisogni dei clienti con posizionamento, marketing, canali e assistenza."
      ],
      [
        "Gestione e finanza",
        "Seguire responsabilità, avanzamento, ricavi e cassa con criteri comuni per progetti, ordini e costi."
      ],
      [
        "Crescita e capitale",
        "Dopo la validazione del modello, valutare processi replicabili, partnership e preparazione finanziaria."
      ],
      [
        "Circolarità e reinvestimento",
        "Esplorare riparazione, rigenerazione, rivendita e investimenti continuativi nella tutela e nei mestieri."
      ]
    ],
    "cards": [
      [
        "Costituire un’impresa in Europa",
        "Valutare Paesi, documenti e supporto professionale per entrare nei mercati europei."
      ],
      [
        "Patrimonio culturale e proprietà intellettuale",
        "Confrontarsi su documentazione, risorse digitali, sviluppo autorizzato e gestione sostenibile."
      ],
      [
        "Collaborazioni tra industria e marchi",
        "Collegare design, produzione e mercati intorno a un progetto con risultati definiti."
      ]
    ],
    "rolesTitle": "Collaborare a partire dalle proprie competenze",
    "roles": [
      "Istituzioni culturali e titolari dei diritti",
      "Marchi territoriali, designer e operatori commerciali",
      "Artigiani, produttori e partner industriali"
    ],
    "rolesIntro": "Condividi risorse, obiettivi, ambito e difficoltà. Iniziamo dall’analisi delle esigenze e dal confronto con i partner.",
    "contact": "Parliamo di una collaborazione",
    "explore": "Scopri i percorsi",
    "videos": "Guarda casi e metodi",
    "libraryTitle": "Valore culturale e industria · Videoselezione",
    "libraryIntro": "Video esterni collegano tutela, AI, IoT, produzione, mercati, finanza e circolarità. CIAOMIND verifica il proprio approccio in progetti definiti.",
    "all": "Tutti i video",
    "watch": "Guarda su YouTube",
    "play": "Riproduci il video",
    "close": "Chiudi il lettore",
    "chapter": "Fase operativa",
    "notice": "La riproduzione collega a YouTube. Ogni video è realizzato dall’editore indicato.",
    "capital": "Le collaborazioni finanziarie si valutano su diritti, contratti, costi, ricavi e impieghi verificabili.",
    "status": "Modalità di collaborazione e risultati sono concordati per ogni progetto.",
    "formation": "Consulenza per la costituzione",
    "heritage": "Parliamo di cultura e industria",
    "loop": "La circolarità guida il reinvestimento del valore economico nella tutela culturale.",
    "technologyTitle": "AI e IoT lungo la filiera",
    "technology": [
      [
        "Ricerca e collaborazione con AI",
        "Esplorare riconoscimento, documentazione, contenuti multilingue, supporto al design e coordinamento con verifica umana."
      ],
      [
        "IoT e dati connessi",
        "Esplorare acquisizione fisica, dati ambientali e dei macchinari, avanzamento e tracciabilità per progetto."
      ]
    ]
  },
  "fr": {
    "hero": [
      "Entreprendre en Europe.",
      "Faire vivre la valeur culturelle."
    ],
    "intro": "Évaluer une création d’entreprise en Europe et relier protection culturelle et propriété intellectuelle, numérisation, production, marques et gestion durable. Relier cultures territoriales, marques, filières et marchés plus larges grâce à l’IA et à l’IoT.",
    "title": "De la protection culturelle à la coopération industrielle",
    "mission": "CIAOMIND explore les liens entre protection du patrimoine et de la propriété intellectuelle, numérisation, production allégée, marques et gestion, pour soutenir la conservation et la création. Relier cultures territoriales, marques, filières et marchés plus larges grâce à l’IA et à l’IoT.",
    "pathTitle": "Une chaîne de valeur à construire progressivement",
    "pathIntro": "Partir d’une ressource culturelle autorisée et d’un projet défini, puis relier professionnels, livrables et données de gestion.",
    "stages": [
      [
        "Protéger et numériser",
        "Vérifier provenance, titulaires, autorisations et partage des bénéfices. Créer des archives traçables."
      ],
      [
        "Design et production allégée",
        "Relier designers, artisans et fabricants autour des matériaux, prototypes, qualité et livraisons."
      ],
      [
        "Marques et marchés",
        "Relier récit culturel et besoins clients au positionnement, au marketing, aux canaux et au service."
      ],
      [
        "Gestion et finances",
        "Suivre responsabilités, avancement, revenus et trésorerie selon des critères communs."
      ],
      [
        "Croissance et capital",
        "Après validation du modèle, évaluer réplication, partenariats et préparation au financement."
      ],
      [
        "Circularité et réinvestissement",
        "Explorer réparation, reconditionnement, revente et soutien continu à la conservation et aux métiers."
      ]
    ],
    "cards": [
      [
        "Créer une entreprise en Europe",
        "Évaluer pays, documents et accompagnement professionnel pour accéder aux marchés européens."
      ],
      [
        "Patrimoine culturel et propriété intellectuelle",
        "Échanger sur la documentation, les actifs numériques, les licences et la gestion durable."
      ],
      [
        "Coopération industrielle et marques",
        "Relier design, production et marchés autour d’un projet aux livrables définis."
      ]
    ],
    "rolesTitle": "Collaborer selon votre expertise",
    "roles": [
      "Institutions culturelles et titulaires de droits",
      "Marques territoriales, designers et acteurs du marché",
      "Artisans, fabricants et partenaires industriels"
    ],
    "rolesIntro": "Présentez vos ressources, objectifs, périmètre et difficultés pour engager le dialogue.",
    "contact": "Discuter d’un partenariat",
    "explore": "Découvrir les parcours",
    "videos": "Voir les cas et méthodes",
    "libraryTitle": "Valeur culturelle et industrie · Sélection vidéo",
    "libraryIntro": "Des vidéos externes relient protection, IA, IoT, production, marchés, finances et circularité. CIAOMIND vérifie son approche par projets.",
    "all": "Toutes les vidéos",
    "watch": "Voir sur YouTube",
    "play": "Lire la vidéo",
    "close": "Fermer le lecteur",
    "chapter": "Étape",
    "notice": "La lecture établit une connexion à YouTube. Chaque vidéo est produite par l’éditeur indiqué.",
    "capital": "Les partenariats financiers sont évalués sur les droits, contrats, coûts, revenus et usages des fonds vérifiables.",
    "status": "Les modalités et livrables sont convenus pour chaque projet.",
    "formation": "Parler de création d’entreprise",
    "heritage": "Parler de culture et d’industrie",
    "loop": "Réinvestir la valeur économique dans la protection culturelle selon une démarche circulaire.",
    "technologyTitle": "L’IA et l’IoT tout au long de la chaîne",
    "technology": [
      [
        "Recherche et coopération avec l’IA",
        "Explorer reconnaissance, documentation, contenus multilingues, aide au design et coordination avec validation humaine."
      ],
      [
        "IoT et données connectées",
        "Explorer acquisition physique, données environnementales et machines, suivi de production et traçabilité par projet."
      ]
    ]
  },
  "de": {
    "hero": [
      "In Europa gründen.",
      "Kulturellen Wert weiterentwickeln."
    ],
    "intro": "Unternehmensgründung in Europa prüfen und Kulturschutz, geistiges Eigentum, Digitalisierung, Produktion, Marken und langfristigen Betrieb verbinden. Regionale Kultur, Marken, Lieferketten und größere Märkte durch KI und IoT verbinden.",
    "title": "Vom Kulturschutz zur industriellen Zusammenarbeit",
    "mission": "CIAOMIND untersucht die Verbindung von Kulturerbe und geistigem Eigentum mit Digitalisierung, schlanker Produktion, Markenentwicklung und Unternehmensführung, um Erhalt und neue Gestaltung zu unterstützen. Regionale Kultur, Marken, Lieferketten und größere Märkte durch KI und IoT verbinden.",
    "pathTitle": "Eine Wertschöpfungskette Schritt für Schritt",
    "pathIntro": "Mit einer genehmigten Kulturressource und einem definierten Projekt beginnen und Fachpartner, Abläufe und Geschäftsdaten verbinden.",
    "stages": [
      [
        "Schützen und digitalisieren",
        "Herkunft, Rechteinhaber, Genehmigungen und Nutzenverteilung klären. Nachvollziehbare digitale Archive aufbauen."
      ],
      [
        "Design und schlanke Produktion",
        "Designer, Handwerker und Hersteller bei Materialien, Prototypen, Qualität und Lieferung verbinden."
      ],
      [
        "Marken und Märkte",
        "Kulturelle Geschichten und Kundenbedarf mit Positionierung, Marketing, Vertrieb und Service verbinden."
      ],
      [
        "Betrieb und Finanzen",
        "Verantwortung, Fortschritt, Einnahmen und Liquidität mit gemeinsamen Projekt- und Kostenbegriffen verfolgen."
      ],
      [
        "Wachstum und Kapital",
        "Nach der Modellprüfung wiederholbare Abläufe, Partnerschaften und Finanzierungsreife bewerten."
      ],
      [
        "Kreislauf und Reinvestition",
        "Reparatur, Aufarbeitung, Wiederverkauf und laufende Investitionen in Kulturerhalt und Handwerk untersuchen."
      ]
    ],
    "cards": [
      [
        "Unternehmensgründung in Europa",
        "Zielländer, Unterlagen und fachliche Begleitung für den europäischen Markteintritt prüfen."
      ],
      [
        "Kulturerbe und geistiges Eigentum",
        "Dokumentation, digitale Ressourcen, lizenzierte Entwicklung und nachhaltigen Betrieb besprechen."
      ],
      [
        "Industrie und Marken verbinden",
        "Design, Produktion und Märkte in einem Projekt mit definierten Ergebnissen verbinden."
      ]
    ],
    "rolesTitle": "Mit Ihrer Expertise zusammenarbeiten",
    "roles": [
      "Kultureinrichtungen und Rechteinhaber",
      "Regionale Marken, Designer und Marktakteure",
      "Handwerker, Hersteller und Industriepartner"
    ],
    "rolesIntro": "Beschreiben Sie Ressourcen, Ziele, Umfang und Herausforderungen als Ausgangspunkt für das Gespräch.",
    "contact": "Zusammenarbeit besprechen",
    "explore": "Leistungswege entdecken",
    "videos": "Beispiele und Methoden ansehen",
    "libraryTitle": "Kultureller Wert und Industrie · Videoauswahl",
    "libraryIntro": "Externe Videos verbinden Schutz, KI, IoT, Produktion, Märkte, Finanzen und Kreislaufwirtschaft. CIAOMIND prüft den Ansatz in definierten Projekten.",
    "all": "Alle Videos",
    "watch": "Auf YouTube ansehen",
    "play": "Video abspielen",
    "close": "Player schließen",
    "chapter": "Geschäftsphase",
    "notice": "Beim Abspielen wird eine Verbindung zu YouTube hergestellt. Die Videos stammen von den genannten Herausgebern.",
    "capital": "Kapitalpartnerschaften werden anhand prüfbarer Rechte, Verträge, Kosten, Einnahmen und Mittelverwendung bewertet.",
    "status": "Zusammenarbeit und Ergebnisse werden je Projekt vereinbart.",
    "formation": "Gründung besprechen",
    "heritage": "Kultur und Industrie besprechen",
    "loop": "Wirtschaftlichen Wert im Sinne der Kreislaufwirtschaft in den Kulturerhalt reinvestieren.",
    "technologyTitle": "KI und IoT entlang der Wertschöpfung",
    "technology": [
      [
        "KI für Forschung und Zusammenarbeit",
        "Erkennung, Dokumentation, mehrsprachige Inhalte, Designhilfe und Koordination mit menschlicher Prüfung untersuchen."
      ],
      [
        "IoT und vernetzte Daten",
        "Erfassung, Umwelt- und Maschinendaten, Produktionsverfolgung und Rückverfolgbarkeit je Projekt untersuchen."
      ]
    ]
  },
  "es": {
    "hero": [
      "Emprender en Europa.",
      "Hacer crecer el valor cultural."
    ],
    "intro": "Evaluar la creación de empresas en Europa y conectar protección cultural y propiedad intelectual, digitalización, producción, marcas y gestión duradera. Conectar cultura regional, marcas, cadenas de suministro y mercados más amplios con IA e IoT.",
    "title": "De la protección cultural a la colaboración industrial",
    "mission": "CIAOMIND explora cómo conectar patrimonio y propiedad intelectual con digitalización, producción ajustada, marcas y gestión para apoyar la conservación y la creación. Conectar cultura regional, marcas, cadenas de suministro y mercados más amplios con IA e IoT.",
    "pathTitle": "Una cadena de valor paso a paso",
    "pathIntro": "Empezar con un recurso cultural autorizado y un proyecto definido, conectando profesionales, entregables y datos de gestión.",
    "stages": [
      [
        "Proteger y digitalizar",
        "Aclarar procedencia, titulares, permisos y reparto de beneficios. Crear archivos digitales trazables."
      ],
      [
        "Diseño y producción ajustada",
        "Conectar diseñadores, artesanos y fabricantes en materiales, prototipos, calidad y entregas."
      ],
      [
        "Marcas y mercados",
        "Conectar relato cultural y necesidades del cliente con posicionamiento, marketing, canales y servicio."
      ],
      [
        "Operaciones y finanzas",
        "Seguir responsabilidades, avances, ingresos y caja con criterios comunes de proyectos y costes."
      ],
      [
        "Crecimiento y capital",
        "Tras validar el modelo, evaluar procesos replicables, alianzas y preparación financiera."
      ],
      [
        "Circularidad y reinversión",
        "Explorar reparación, remanufactura, reventa e inversión continua en conservación y oficios."
      ]
    ],
    "cards": [
      [
        "Crear una empresa en Europa",
        "Evaluar países, documentación y apoyo profesional para acceder a mercados europeos."
      ],
      [
        "Patrimonio cultural y propiedad intelectual",
        "Dialogar sobre documentación, activos digitales, licencias y gestión sostenible."
      ],
      [
        "Industria y marcas en colaboración",
        "Conectar diseño, producción y mercados en un proyecto con entregables definidos."
      ]
    ],
    "rolesTitle": "Colaborar desde tu especialidad",
    "roles": [
      "Instituciones culturales y titulares de derechos",
      "Marcas regionales, diseñadores y operadores del mercado",
      "Artesanos, fabricantes y socios industriales"
    ],
    "rolesIntro": "Comparte recursos, objetivos, alcance y dificultades para iniciar la conversación.",
    "contact": "Hablar de una colaboración",
    "explore": "Explorar los servicios",
    "videos": "Ver casos y métodos",
    "libraryTitle": "Valor cultural e industria · Selección de vídeos",
    "libraryIntro": "Vídeos externos conectan protección, IA, IoT, producción, mercados, finanzas y circularidad. CIAOMIND valida su enfoque mediante proyectos.",
    "all": "Todos los vídeos",
    "watch": "Ver en YouTube",
    "play": "Reproducir el vídeo",
    "close": "Cerrar el reproductor",
    "chapter": "Etapa",
    "notice": "La reproducción conecta con YouTube. Cada vídeo pertenece al editor indicado.",
    "capital": "Las alianzas financieras se evalúan con derechos, contratos, costes, ingresos y usos de fondos verificables.",
    "status": "El alcance y los entregables se acuerdan para cada proyecto.",
    "formation": "Consultar sobre creación de empresas",
    "heritage": "Hablar de cultura e industria",
    "loop": "Reinvertir valor económico en protección cultural con una visión circular.",
    "technologyTitle": "IA e IoT en toda la cadena",
    "technology": [
      [
        "Investigación y colaboración con IA",
        "Explorar reconocimiento, documentación, contenidos multilingües, apoyo al diseño y coordinación con revisión humana."
      ],
      [
        "IoT y datos conectados",
        "Explorar captura física, datos ambientales y de equipos, seguimiento de producción y trazabilidad por proyecto."
      ]
    ]
  },
  "pt": {
    "hero": [
      "Empreender na Europa.",
      "Fazer crescer o valor cultural."
    ],
    "intro": "Avaliar a criação de empresas na Europa e ligar proteção cultural e propriedade intelectual, digitalização, produção, marcas e gestão duradoura. Ligar cultura regional, marcas, cadeias de abastecimento e mercados mais amplos com IA e IoT.",
    "title": "Da proteção cultural à colaboração industrial",
    "mission": "A CIAOMIND explora a ligação entre património e propriedade intelectual, digitalização, produção enxuta, marcas e gestão, apoiando a conservação e a criação. Ligar cultura regional, marcas, cadeias de abastecimento e mercados mais amplos com IA e IoT.",
    "pathTitle": "Uma cadeia de valor passo a passo",
    "pathIntro": "Começar com um recurso cultural autorizado e um projeto definido, ligando especialistas, entregas e dados de gestão.",
    "stages": [
      [
        "Proteger e digitalizar",
        "Clarificar proveniência, titulares, permissões e partilha de benefícios. Criar arquivos digitais rastreáveis."
      ],
      [
        "Design e produção enxuta",
        "Ligar designers, artesãos e fabricantes em materiais, protótipos, qualidade e entregas."
      ],
      [
        "Marcas e mercados",
        "Ligar narrativas culturais e necessidades dos clientes ao posicionamento, marketing, canais e serviço."
      ],
      [
        "Operações e finanças",
        "Acompanhar responsabilidades, progresso, receitas e caixa com critérios comuns de projetos e custos."
      ],
      [
        "Crescimento e capital",
        "Após validar o modelo, avaliar processos replicáveis, parcerias e preparação financeira."
      ],
      [
        "Circularidade e reinvestimento",
        "Explorar reparação, remanufatura, revenda e investimento contínuo na conservação e nos ofícios."
      ]
    ],
    "cards": [
      [
        "Criar uma empresa na Europa",
        "Avaliar países, documentos e apoio profissional para entrar nos mercados europeus."
      ],
      [
        "Património cultural e propriedade intelectual",
        "Conversar sobre documentação, ativos digitais, licenças e gestão sustentável."
      ],
      [
        "Colaboração entre indústria e marcas",
        "Ligar design, produção e mercados num projeto com entregas definidas."
      ]
    ],
    "rolesTitle": "Colaborar a partir da sua especialidade",
    "roles": [
      "Instituições culturais e titulares de direitos",
      "Marcas regionais, designers e operadores de mercado",
      "Artesãos, fabricantes e parceiros industriais"
    ],
    "rolesIntro": "Partilhe recursos, objetivos, âmbito e dificuldades para iniciar a conversa.",
    "contact": "Conversar sobre uma parceria",
    "explore": "Explorar os serviços",
    "videos": "Ver casos e métodos",
    "libraryTitle": "Valor cultural e indústria · Seleção de vídeos",
    "libraryIntro": "Vídeos externos ligam proteção, IA, IoT, produção, mercados, finanças e circularidade. A CIAOMIND valida a abordagem através de projetos.",
    "all": "Todos os vídeos",
    "watch": "Ver no YouTube",
    "play": "Reproduzir o vídeo",
    "close": "Fechar o leitor",
    "chapter": "Etapa",
    "notice": "A reprodução estabelece ligação ao YouTube. Cada vídeo é produzido pelo editor indicado.",
    "capital": "As parcerias financeiras são avaliadas com direitos, contratos, custos, receitas e usos de fundos verificáveis.",
    "status": "O âmbito e as entregas são acordados para cada projeto.",
    "formation": "Consultar sobre criação de empresas",
    "heritage": "Conversar sobre cultura e indústria",
    "loop": "Reinvestir valor económico na proteção cultural com uma visão circular.",
    "technologyTitle": "IA e IoT em toda a cadeia",
    "technology": [
      [
        "Investigação e colaboração com IA",
        "Explorar reconhecimento, documentação, conteúdos multilingues, apoio ao design e coordenação com revisão humana."
      ],
      [
        "IoT e dados ligados",
        "Explorar captura física, dados ambientais e de equipamentos, acompanhamento e rastreabilidade por projeto."
      ]
    ]
  },
  "ja": {
    "hero": [
      "欧州で事業を始める。",
      "文化の価値を育て続ける。"
    ],
    "intro": "欧州での会社設立を検討し、文化と知的財産の保護、デジタル化、製造、ブランド、市場、継続的な運営をつなぎます。 AI と IoT で地域の文化、ブランド、供給網をより広い市場につなぎます。",
    "title": "文化保護から産業連携へ",
    "mission": "CIAOMIND は文化遺産、文化資源、知的財産の保護を起点に、デジタル化、リーン生産、ブランド開発、経営管理の連携を探り、保全と新たな創造を支えます。 AI と IoT で地域の文化、ブランド、供給網をより広い市場につなぎます。",
    "pathTitle": "一歩ずつ築く価値の連鎖",
    "pathIntro": "利用許諾が明確な文化資源と具体的なプロジェクトから、専門家、納品プロセス、経営データをつなぎます。",
    "stages": [
      [
        "保護とデジタル化",
        "来歴、権利者、利用許諾、利益の配分を確認し、追跡可能なデジタル記録を整えます。"
      ],
      [
        "デザインとリーン生産",
        "素材、試作、品質、納期を軸にデザイナー、職人、製造者をつなぎます。"
      ],
      [
        "ブランドと市場",
        "文化の物語と顧客ニーズを、ブランド戦略、販促、販路、サービスの改善へつなげます。"
      ],
      [
        "運営と財務",
        "共通のプロジェクト、受注、費用の基準で責任、進捗、収益、資金繰りを把握します。"
      ],
      [
        "成長と資本連携",
        "事業モデルの検証後、再現可能な仕組み、協業、資金調達の準備を検討します。"
      ],
      [
        "循環と再投資",
        "修理、再製造、再販を検討し、文化保護と技能継承への継続的な投資を目指します。"
      ]
    ],
    "cards": [
      [
        "欧州での会社設立",
        "進出先の国、必要書類、専門家による支援の道筋を検討します。"
      ],
      [
        "文化遺産と知的財産",
        "記録、デジタル資産、利用許諾を伴う開発、持続可能な運営を相談します。"
      ],
      [
        "産業とブランドの連携",
        "成果物を定めたプロジェクトで、デザイン、製造、ブランド、市場をつなぎます。"
      ]
    ],
    "rolesTitle": "専門性を活かして参加する",
    "roles": [
      "文化機関と権利者",
      "地域ブランド、デザイナー、市場運営者",
      "職人、製造者、産業パートナー"
    ],
    "rolesIntro": "資源、目標、協力範囲、課題を共有し、要件整理と対話から始めます。",
    "contact": "連携プロジェクトを相談",
    "explore": "サービスの道筋を見る",
    "videos": "事例と方法を動画で見る",
    "libraryTitle": "文化の価値と産業連携・動画集",
    "libraryIntro": "保護、AI、IoT、製造、市場、財務、循環を外部動画で紹介します。CIAOMIND は具体的なプロジェクトで構想を検証します。",
    "all": "すべての動画",
    "watch": "YouTube で見る",
    "play": "動画を再生",
    "close": "プレーヤーを閉じる",
    "chapter": "事業の段階",
    "notice": "再生すると YouTube に接続します。各動画は記載の発行元が制作しています。",
    "capital": "資本連携は検証可能な権利、契約、費用、収益、資金用途をもとに検討します。",
    "status": "協力方法と成果物の範囲はプロジェクトごとに合意します。",
    "formation": "会社設立を相談",
    "heritage": "文化と産業の連携を相談",
    "loop": "循環的な発展を指針に、事業の価値を文化保護へ再投資します。",
    "technologyTitle": "価値の連鎖を支える AI と IoT",
    "technology": [
      [
        "AI による調査と連携支援",
        "認識、記録、多言語コンテンツ、デザイン支援、調整を、人の確認とともに検討します。"
      ],
      [
        "IoT とデータ連携",
        "実物の記録、環境と設備のデータ、生産の進捗、製品のトレーサビリティをプロジェクトごとに検討します。"
      ]
    ]
  }
};

export function getEcosystemCopy(lang: string) {
  return ecosystemCopy[lang as Locale] ?? ecosystemCopy.en;
}

