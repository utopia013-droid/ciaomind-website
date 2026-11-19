import type { Locale } from '@/lib/i18n';

type Stage = readonly [string, string];
export type EcosystemText = {
  hero: string[]; intro: string; title: string; mission: string; pathTitle: string; pathIntro: string;
  stages: Stage[]; cards: Stage[]; rolesTitle: string; roles: string[]; rolesIntro: string;
  brief: string; contact: string; explore: string; videos: string; libraryTitle: string; libraryIntro: string;
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
    "pathIntro": "把文化资源转为可交付项目：先确认权利，再连接设计、制造与市场；用统一的运营与财务记录评估复制条件，并商定收益回投文化保护的方式。",
    "stages": [
      [
        "保护与数字化",
        "核实来源、持有者、授权范围与利益分配，形成供设计和开发使用的数字档案。"
      ],
      [
        "设计与精益制造",
        "把获授权素材转为设计简报、样品和规格，确认材料、质量、成本与交付条件。"
      ],
      [
        "品牌与市场",
        "把样品和文化表达连接目标客户、品牌与渠道，以市场反馈检验需求。"
      ],
      [
        "运营与财务标准化",
        "统一项目、订单和成本口径，记录交付、收入、现金流与责任，为评估提供依据。"
      ],
      [
        "规模化与资本评估",
        "依据权利、合同、履约和单项目经济性，评估复制、产业协同重组与资金用途。"
      ],
      [
        "循环与收益回投",
        "评估维修、再制造与再销售；约定收益分配与保护投入，并记录实际回投。"
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
      "区域品牌与设计师",
      "工匠与制造商",
      "品牌营销与渠道运营方",
      "区域产业与协调组织",
      "资本与财务合作方"
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
    "loop": "权利与来源 → 产品与市场 → 可核查经营记录 → 规模化评估 → 按约定回投保护与传承。每一步以项目证据和参与方确认为条件。",
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
    ],
    "brief": "说明这一环节的需求"
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
    "pathIntro": "Turn cultural resources into a defined project: confirm rights, connect design, production and markets, then use consistent operating and financial records to assess repeatability and agree how returns can support preservation.",
    "stages": [
      [
        "Protect & digitise",
        "Verify provenance, custodians, permissions and benefit sharing; prepare digital records for design and development."
      ],
      [
        "Design & lean production",
        "Turn authorised resources into a design brief, prototype and specifications; agree materials, quality, cost and delivery."
      ],
      [
        "Brands & markets",
        "Connect the prototype and cultural story to customers, brands and channels, using market feedback to test demand."
      ],
      [
        "Standardise operations & finance",
        "Use shared project, order and cost definitions to record delivery, revenue, cash flow and accountability."
      ],
      [
        "Assess scale & capital",
        "Use rights, contracts, fulfilment and project economics to assess repeatability, industry restructuring and funding needs."
      ],
      [
        "Circulate & reinvest returns",
        "Assess repair, remanufacturing and resale; agree benefit sharing and preservation funding, and record actual reinvestment."
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
      "Regional brands & designers",
      "Artisans & manufacturers",
      "Brand marketing & channel operators",
      "Regional industry & coordination organisations",
      "Capital & financial partners"
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
    "loop": "Rights and provenance → products and markets → verifiable business records → scale assessment → agreed reinvestment in preservation and skills. Each step depends on project evidence and partner agreement.",
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
    ],
    "brief": "Describe this stage"
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
    "pathIntro": "Dalle risorse culturali a un progetto definito: verificare i diritti, collegare design, produzione e mercato, poi usare registri operativi e finanziari coerenti per valutarne la replicabilità e concordare il sostegno alla tutela.",
    "stages": [
      [
        "Tutela e digitalizzazione",
        "Verificare provenienza, custodi, autorizzazioni e ripartizione dei benefici; preparare archivi digitali per design e sviluppo."
      ],
      [
        "Design e produzione snella",
        "Tradurre risorse autorizzate in brief, prototipi e specifiche; concordare materiali, qualità, costi e consegna."
      ],
      [
        "Marchi e mercati",
        "Collegare prototipi e racconto culturale a clienti, marchi e canali, verificando la domanda con riscontri di mercato."
      ],
      [
        "Standardizzare gestione e finanza",
        "Usare criteri condivisi per progetti, ordini e costi, registrando consegne, ricavi, flussi di cassa e responsabilità."
      ],
      [
        "Valutare scala e capitale",
        "Valutare replicabilità, riorganizzazione industriale e impiego dei fondi sulla base di diritti, contratti, consegne ed economia del progetto."
      ],
      [
        "Circolarità e reinvestimento",
        "Valutare riparazione, rigenerazione e rivendita; concordare benefici e fondi per la tutela e registrare i reinvestimenti effettivi."
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
      "Marchi regionali e designer",
      "Artigiani e produttori",
      "Operatori di marketing e canali commerciali",
      "Organizzazioni industriali territoriali e di coordinamento",
      "Partner finanziari e di capitale"
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
    "loop": "Diritti e provenienza → prodotti e mercati → dati gestionali verificabili → valutazione della scala → reinvestimento concordato in tutela e competenze. Ogni passaggio richiede evidenze e accordi tra i partner.",
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
    ],
    "brief": "Descrivi questa fase"
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
    "pathIntro": "Transformer une ressource culturelle en projet défini : vérifier les droits, relier création, production et marché, puis utiliser des données opérationnelles et financières cohérentes pour évaluer la réplication et convenir du soutien à la préservation.",
    "stages": [
      [
        "Protéger et numériser",
        "Vérifier provenance, détenteurs, autorisations et partage des bénéfices ; préparer les archives numériques pour la création."
      ],
      [
        "Design et production au plus juste",
        "Traduire les ressources autorisées en brief, prototype et spécifications ; convenir des matériaux, de la qualité, des coûts et délais."
      ],
      [
        "Marques et marchés",
        "Relier le prototype et le récit culturel aux clients, marques et canaux ; tester la demande par les retours du marché."
      ],
      [
        "Standardiser gestion et finances",
        "Adopter des définitions communes des projets, commandes et coûts pour suivre livraisons, recettes, trésorerie et responsabilités."
      ],
      [
        "Évaluer échelle et capitaux",
        "Évaluer réplication, réorganisation industrielle et emploi des fonds à partir des droits, contrats, livraisons et résultats du projet."
      ],
      [
        "Circularité et réinvestissement",
        "Évaluer réparation, reconditionnement et revente ; convenir du partage des bénéfices et consigner les réinvestissements dans la préservation."
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
      "Institutions culturelles et ayants droit",
      "Marques régionales et designers",
      "Artisans et fabricants",
      "Responsables marketing et canaux de vente",
      "Organisations industrielles régionales et de coordination",
      "Partenaires financiers et investisseurs"
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
    "loop": "Droits et provenance → produits et marchés → données vérifiables → évaluation de la réplication → réinvestissement convenu dans la préservation et les savoir-faire. Chaque étape dépend des preuves et des accords du projet.",
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
    ],
    "brief": "Décrire cette étape"
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
    "pathIntro": "Kulturelle Ressourcen in ein konkretes Projekt überführen: Rechte klären, Gestaltung, Produktion und Märkte verbinden und mit einheitlichen Betriebs- und Finanzdaten die Wiederholbarkeit sowie Beiträge zum Kulturerhalt bewerten.",
    "stages": [
      [
        "Schützen und digitalisieren",
        "Herkunft, Verantwortliche, Nutzungsrechte und Nutzenverteilung prüfen; digitale Unterlagen für Gestaltung und Entwicklung erstellen."
      ],
      [
        "Design und schlanke Produktion",
        "Autorisierte Ressourcen in Briefing, Muster und Spezifikationen übersetzen; Material, Qualität, Kosten und Lieferung vereinbaren."
      ],
      [
        "Marken und Märkte",
        "Muster und kulturelle Geschichte mit Kunden, Marken und Vertrieb verbinden und die Nachfrage anhand von Marktfeedback prüfen."
      ],
      [
        "Betrieb und Finanzen standardisieren",
        "Einheitliche Projekt-, Auftrags- und Kostenbegriffe nutzen, um Lieferung, Erlöse, Cashflow und Verantwortung zu dokumentieren."
      ],
      [
        "Skalierung und Kapital bewerten",
        "Anhand von Rechten, Verträgen, Liefernachweisen und Projektwirtschaftlichkeit Wiederholbarkeit, industrielle Neuordnung und Finanzbedarf prüfen."
      ],
      [
        "Kreisläufe und Reinvestition",
        "Reparatur, Aufarbeitung und Wiederverkauf prüfen; Nutzenverteilung und Mittel für Kulturerhalt vereinbaren und tatsächliche Reinvestitionen dokumentieren."
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
      "Kulturinstitutionen und Rechteinhaber",
      "Regionale Marken und Designer",
      "Handwerksbetriebe und Hersteller",
      "Markenmarketing und Vertriebspartner",
      "Regionale Industrie- und Koordinationsorganisationen",
      "Kapital- und Finanzpartner"
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
    "loop": "Rechte und Herkunft → Produkte und Märkte → prüfbare Betriebsdaten → Skalierungsbewertung → vereinbarte Reinvestition in Kulturerhalt und Handwerk. Jeder Schritt benötigt Projektnachweise und Zustimmung der Beteiligten.",
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
    ],
    "brief": "Bedarf für diese Phase beschreiben"
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
    "pathIntro": "Convertir recursos culturales en un proyecto definido: verificar derechos, conectar diseño, producción y mercados, y utilizar registros operativos y financieros coherentes para evaluar la réplica y acordar aportaciones a la conservación.",
    "stages": [
      [
        "Proteger y digitalizar",
        "Verificar origen, custodios, permisos y reparto de beneficios; preparar registros digitales para diseño y desarrollo."
      ],
      [
        "Diseño y producción ajustada",
        "Traducir recursos autorizados en un brief, prototipo y especificaciones; acordar materiales, calidad, costes y entrega."
      ],
      [
        "Marcas y mercados",
        "Conectar prototipos y relato cultural con clientes, marcas y canales; contrastar la demanda con respuestas del mercado."
      ],
      [
        "Estandarizar gestión y finanzas",
        "Usar criterios comunes de proyectos, pedidos y costes para registrar entregas, ingresos, flujo de caja y responsabilidades."
      ],
      [
        "Evaluar escala y capital",
        "Evaluar réplica, reorganización industrial y destino de fondos mediante derechos, contratos, entregas y economía del proyecto."
      ],
      [
        "Circularidad y reinversión",
        "Evaluar reparación, remanufactura y reventa; acordar beneficios y aportaciones a la conservación y registrar la reinversión real."
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
      "Marcas regionales y diseñadores",
      "Artesanos y fabricantes",
      "Operadores de marketing y canales de venta",
      "Organizaciones industriales regionales y de coordinación",
      "Socios financieros y de capital"
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
    "loop": "Derechos y origen → productos y mercados → registros verificables → evaluación de escala → reinversión acordada en conservación y oficios. Cada paso depende de pruebas del proyecto y acuerdos entre socios.",
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
    ],
    "brief": "Describir esta etapa"
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
    "pathIntro": "Transformar recursos culturais num projeto definido: verificar direitos, ligar design, produção e mercados e usar registos operacionais e financeiros coerentes para avaliar a replicação e acordar o apoio à preservação.",
    "stages": [
      [
        "Proteger e digitalizar",
        "Verificar origem, responsáveis, permissões e partilha de benefícios; preparar registos digitais para design e desenvolvimento."
      ],
      [
        "Design e produção enxuta",
        "Traduzir recursos autorizados num briefing, protótipo e especificações; acordar materiais, qualidade, custos e entrega."
      ],
      [
        "Marcas e mercados",
        "Ligar o protótipo e a narrativa cultural a clientes, marcas e canais, testando a procura com respostas do mercado."
      ],
      [
        "Padronizar gestão e finanças",
        "Usar critérios comuns de projetos, encomendas e custos para registar entregas, receitas, fluxo de caixa e responsabilidades."
      ],
      [
        "Avaliar escala e capital",
        "Avaliar replicação, reorganização industrial e uso dos fundos com base em direitos, contratos, entregas e economia do projeto."
      ],
      [
        "Circularidade e reinvestimento",
        "Avaliar reparação, remanufatura e revenda; acordar benefícios e apoio à preservação e registar o reinvestimento efetivo."
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
      "Marcas regionais e designers",
      "Artesãos e fabricantes",
      "Operadores de marketing e canais comerciais",
      "Organizações industriais regionais e de coordenação",
      "Parceiros financeiros e de capital"
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
    "loop": "Direitos e origem → produtos e mercados → registos verificáveis → avaliação de escala → reinvestimento acordado na preservação e nos ofícios. Cada etapa depende de provas do projeto e acordos entre parceiros.",
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
    ],
    "brief": "Descrever esta etapa"
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
    "pathIntro": "文化資源を具体的なプロジェクトへ。権利を確認し、デザイン・製造・市場を結び、共通の業務・財務記録から再現性を評価し、保護への利益還元を合意します。",
    "stages": [
      [
        "保護とデジタル化",
        "出所、保有者、許諾範囲、利益配分を確認し、デザインと開発に使うデジタル記録を整えます。"
      ],
      [
        "デザインとリーン生産",
        "許諾済み素材から企画書、試作品、仕様を作り、材料、品質、費用、納期を合意します。"
      ],
      [
        "ブランドと市場",
        "試作品と文化の物語を顧客・ブランド・販路につなぎ、市場の反応から需要を検証します。"
      ],
      [
        "業務と財務の標準化",
        "案件・注文・原価の共通定義に沿って、納品、売上、資金の流れ、責任を記録します。"
      ],
      [
        "規模化と資金連携の評価",
        "権利、契約、履行記録、案件の採算を基に、再現性、産業連携の再編、資金用途を評価します。"
      ],
      [
        "循環と利益の再投資",
        "修理、再製造、再販売を検討し、利益配分と保護への還元を合意して、実際の再投資を記録します。"
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
      "文化機関・権利保有者",
      "地域ブランド・デザイナー",
      "職人・製造事業者",
      "ブランドマーケティング・販路運営者",
      "地域産業・連携調整組織",
      "資金・財務パートナー"
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
    "loop": "権利と出所 → 製品と市場 → 検証可能な業務記録 → 規模化の評価 → 合意に基づく保護と技術継承への再投資。各段階は案件の証拠と関係者の確認を前提とします。",
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
    ],
    "brief": "この段階の課題を伝える"
  }
};

export function getEcosystemCopy(lang: string) {
  return ecosystemCopy[lang as Locale] ?? ecosystemCopy.en;
}

