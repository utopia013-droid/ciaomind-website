import type { Locale } from '@/lib/i18n';

type PilotEntry = { title: string; description: string; action: string };

type PilotContent = {
  title: string;
  intro: string;
  market: string;
  explore: string;
  imageAlt: string;
  imageCaption: string;
  entriesTitle: string;
  brand: PilotEntry;
  rightsHolder: PilotEntry;
  terms: string;
  processTitle: string;
  processIntro: string;
  steps: readonly { title: string; description: string }[];
  deliverablesTitle: string;
  deliverables: readonly string[];
};

export const pilotContent: Record<Locale, PilotContent> = {
  zh: {
    title: '从文化素材到可试单的产品',
    intro: 'Heritage Economy OS 首期付费试点面向文化权利方和小型品牌，共同开发一件有明确授权、可打样的非电子家居装饰品。',
    market: '从意大利开始，再用同一套跨境撮合流程验证另一个欧盟市场的需求。',
    explore: '查看申请入口',
    imageAlt: '一件带蓝色和金色纹饰的意大利马约利卡陶盘',
    imageCaption: '马约利卡陶盘，1530 年 · 纽约大都会艺术博物馆馆藏图像',
    entriesTitle: '选择你的申请入口',
    brand: {
      title: '品牌方',
      description: '适合小型家居、装饰或文化商品品牌。提交选品与采购需求、预算范围和计划上市时间。',
      action: '以品牌方身份申请',
    },
    rightsHolder: {
      title: '文化权利方',
      description: '适合持有权利或有授权代表资格的机构与创作者。提供可授权或权利归属可核验的文化素材及来源说明。',
      action: '以权利方身份申请',
    },
    terms: '我们先评估申请，再以书面报价确认试点范围、费用和时间。',
    processTitle: '试点如何开展',
    processIntro: '试点计划用文化 IP 商业撮合 BOT，借助 AI 发现机会并初筛候选。素材来源、授权范围与版本记录在同一个项目档案里，权利核验和样品批准由相关人员负责。',
    steps: [
      { title: '明确需求', description: '梳理品牌的选品需求、目标市场，以及可用于开发的文化素材。' },
      { title: '核验权利', description: '核对使用方式、授权地域与素材版本，由相关人员审核批准。' },
      { title: '匹配合作方', description: '对照最低起订量、价格与交期筛选供应商。' },
      { title: '设计与打样', description: '审阅设计与样品，记录修改意见及最终批准。' },
      { title: '试单与交付', description: '确认小批量试单和交付安排，由买方书面验收。' },
    ],
    deliverablesTitle: '试点拟交付',
    deliverables: ['经核验的授权文件', '获批的非电子家居装饰品样品', '可据此下单的供应商报价', '买方书面验收记录'],
  },
  it: {
    title: 'Dal patrimonio culturale a un prodotto per un ordine di prova',
    intro: 'Il primo progetto pilota a pagamento di Heritage Economy OS mette in contatto titolari dei diritti e piccoli marchi per sviluppare un articolo decorativo non elettronico con diritti verificati e un campione fisico.',
    market: 'Si parte dall’Italia e si usa lo stesso processo di ricerca di partner oltreconfine per verificare la domanda in un altro mercato dell’UE.',
    explore: 'Scopri come candidarti',
    imageAlt: 'Piatto italiano in maiolica con decorazioni blu e dorate',
    imageCaption: 'Piatto in maiolica, 1530 · Immagine della collezione del Metropolitan Museum of Art',
    entriesTitle: 'Scegli come candidarti',
    brand: {
      title: 'Marchi e acquirenti',
      description: 'Per piccoli marchi di arredo, decorazione o prodotti culturali. Indica l’articolo che cerchi, la fascia di budget e il periodo previsto per il lancio.',
      action: 'Candidati come marchio',
    },
    rightsHolder: {
      title: 'Titolari dei diritti',
      description: 'Per enti e creatori titolari dei diritti o con mandato a rappresentarli. Presenta materiali culturali autorizzati o con diritti verificabili e indicane la provenienza.',
      action: 'Candidati come titolare dei diritti',
    },
    terms: 'Dopo l’esame della candidatura, attività, costi e tempi del progetto vengono confermati in un preventivo scritto.',
    processTitle: 'Come si svolge il progetto',
    processIntro: 'Il progetto prevede un bot AI per individuare opportunità commerciali legate alla proprietà intellettuale culturale e selezionare i candidati. Provenienza, autorizzazioni e versioni confluiscono nello stesso fascicolo. I referenti verificano i diritti e approvano i campioni.',
    steps: [
      { title: 'Definizione del progetto', description: 'Esaminiamo il prodotto richiesto, il mercato di destinazione e i materiali culturali disponibili.' },
      { title: 'Verifica dei diritti', description: 'Controlliamo utilizzi, territori e versioni dei materiali. L’approvazione spetta ai referenti autorizzati.' },
      { title: 'Ricerca dei partner', description: 'Confrontiamo quantitativi minimi d’ordine, prezzi e tempi di consegna dei fornitori.' },
      { title: 'Design e campionatura', description: 'Rivediamo il design e il campione, documentando modifiche e approvazione finale.' },
      { title: 'Ordine di prova e consegna', description: 'Concordiamo un ordine di prova e la consegna, con accettazione scritta da parte dell’acquirente.' },
    ],
    deliverablesTitle: 'Risultati previsti',
    deliverables: ['Documentazione verificata dei diritti d’uso', 'Campione approvato di un articolo decorativo non elettronico', 'Preventivo del fornitore utilizzabile per ordinare', 'Accettazione scritta dell’acquirente'],
  },
  en: {
    title: 'From cultural heritage to a product ready for a trial order',
    intro: 'The first paid Heritage Economy OS pilot brings rights holders and small brands together to develop a non-electronic home décor item with verified permissions and a physical sample.',
    market: 'We start in Italy, then reuse the cross-border matching process to validate demand in one other EU market.',
    explore: 'See how to apply',
    imageAlt: 'Italian maiolica dish with blue and gold decoration',
    imageCaption: 'Maiolica dish, 1530 · Collection image from The Metropolitan Museum of Art',
    entriesTitle: 'Choose how to apply',
    brand: {
      title: 'Brands and buyers',
      description: 'For small homeware, décor or cultural goods brands. Share a sourcing brief, budget range and planned launch window.',
      action: 'Apply as a brand',
    },
    rightsHolder: {
      title: 'Rights holders',
      description: 'For organizations and creators who own or represent the rights. Share authorized cultural materials or assets with verifiable rights, along with their provenance.',
      action: 'Apply as a rights holder',
    },
    terms: 'We review your application first, then confirm the pilot scope, fees and timeline in a written quote.',
    processTitle: 'How the pilot works',
    processIntro: 'The pilot plans to use an AI-powered Cultural IP Commercial Matchmaking Bot to help find opportunities and shortlist candidates. One project record tracks sources, permissions and asset versions. People verify rights and approve samples.',
    steps: [
      { title: 'Discovery', description: 'Review the sourcing brief, target market and cultural materials available for development.' },
      { title: 'Rights review', description: 'Check permitted uses, territories and asset versions. The responsible people review and approve.' },
      { title: 'Partner matching', description: 'Compare suppliers on minimum order quantities, prices and lead times.' },
      { title: 'Design and sampling', description: 'Review the design and sample, record changes and obtain final approval.' },
      { title: 'Trial order and delivery', description: 'Agree on a trial order and delivery, then obtain the buyer’s written acceptance.' },
    ],
    deliverablesTitle: 'Planned deliverables',
    deliverables: ['Verified permissions file', 'Approved non-electronic décor sample', 'Supplier quote ready for ordering', 'Documented buyer acceptance'],
  },
  fr: {
    title: 'Du patrimoine culturel à un produit prêt pour une commande test',
    intro: 'Le premier projet pilote payant de Heritage Economy OS réunit des titulaires de droits et de petites marques pour développer un objet décoratif non électronique, avec des droits vérifiés et un échantillon physique.',
    market: 'Le projet démarre en Italie. Le même processus de recherche de partenaires à l’international servira à évaluer la demande dans un autre marché de l’UE.',
    explore: 'Voir comment candidater',
    imageAlt: 'Coupe italienne en majolique à décor bleu et doré',
    imageCaption: 'Coupe en majolique, 1530 · Image de la collection du Metropolitan Museum of Art',
    entriesTitle: 'Choisissez comment candidater',
    brand: {
      title: 'Marques et acheteurs',
      description: 'Pour les petites marques d’articles pour la maison, de décoration ou de produits culturels. Précisez ce que vous cherchez, votre budget et la période prévue pour le lancement.',
      action: 'Candidater en tant que marque',
    },
    rightsHolder: {
      title: 'Titulaires de droits',
      description: 'Pour les organisations et créateurs qui détiennent les droits ou sont mandatés pour les représenter. Présentez des ressources culturelles dont l’usage est autorisé ou dont les droits sont vérifiables, et indiquez leur provenance.',
      action: 'Candidater en tant que titulaire de droits',
    },
    terms: 'Après examen de votre candidature, un devis écrit précise le périmètre, les coûts et le calendrier du projet.',
    processTitle: 'Les étapes du projet pilote',
    processIntro: 'Le pilote prévoit un bot d’IA pour repérer des débouchés commerciaux liés à la propriété intellectuelle culturelle et présélectionner les candidats. Un dossier projet unique consigne les sources, les autorisations et les versions. Les personnes responsables vérifient les droits et valident les échantillons.',
    steps: [
      { title: 'Cadrage', description: 'Nous étudions les besoins d’approvisionnement, le marché visé et les ressources culturelles disponibles.' },
      { title: 'Vérification des droits', description: 'Nous vérifions les usages, les territoires et les versions autorisés. Les personnes responsables examinent et valident ces éléments.' },
      { title: 'Recherche de partenaires', description: 'Nous comparons les fournisseurs selon leurs quantités minimales de commande, prix et délais.' },
      { title: 'Conception et échantillon', description: 'Nous examinons le design et l’échantillon, puis documentons les modifications et la validation finale.' },
      { title: 'Commande test et livraison', description: 'Nous convenons d’une commande test et de sa livraison. L’acheteur confirme son acceptation par écrit.' },
    ],
    deliverablesTitle: 'Livrables prévus',
    deliverables: ['Dossier des autorisations vérifié', 'Échantillon validé d’un objet décoratif non électronique', 'Devis fournisseur permettant de passer commande', 'Acceptation écrite de l’acheteur'],
  },
  de: {
    title: 'Vom Kulturerbe zum Produkt für eine Testbestellung',
    intro: 'Das erste kostenpflichtige Pilotprojekt von Heritage Economy OS bringt Rechteinhaber und kleine Marken zusammen. Gemeinsam entwickeln sie einen nicht elektronischen Dekoartikel mit geklärten Nutzungsrechten und einem physischen Muster.',
    market: 'Wir starten in Italien und prüfen anschließend mit demselben grenzüberschreitenden Vermittlungsverfahren die Nachfrage in einem weiteren EU-Markt.',
    explore: 'Zur Bewerbung',
    imageAlt: 'Italienische Majolikaschale mit blauem und goldenem Dekor',
    imageCaption: 'Majolikaschale, 1530 · Sammlungsaufnahme des Metropolitan Museum of Art',
    entriesTitle: 'Wählen Sie Ihre Bewerbungsart',
    brand: {
      title: 'Marken und Einkäufer',
      description: 'Für kleine Marken im Bereich Wohnaccessoires, Dekoration oder Kulturprodukte. Beschreiben Sie Ihren Beschaffungsbedarf, den Budgetrahmen und den geplanten Zeitraum für die Markteinführung.',
      action: 'Als Marke bewerben',
    },
    rightsHolder: {
      title: 'Rechteinhaber',
      description: 'Für Organisationen und Kreative, die die Rechte besitzen oder sie vertreten dürfen. Stellen Sie freigegebene Kulturmaterialien oder Materialien mit nachweisbaren Rechten und Angaben zur Herkunft vor.',
      action: 'Als Rechteinhaber bewerben',
    },
    terms: 'Nach Prüfung Ihrer Bewerbung halten wir Umfang, Kosten und Zeitplan in einem schriftlichen Angebot fest.',
    processTitle: 'Ablauf des Pilotprojekts',
    processIntro: 'Für das Pilotprojekt ist ein KI-Bot vorgesehen, der Geschäftsmöglichkeiten für kulturelles geistiges Eigentum erkennt und bei der Vorauswahl hilft. Eine gemeinsame Projektakte hält Quellen, Nutzungsrechte und Versionen fest. Die zuständigen Personen prüfen die Rechte und geben Muster frei.',
    steps: [
      { title: 'Bedarf klären', description: 'Wir prüfen den Beschaffungsbedarf, den Zielmarkt und das verfügbare Kulturmaterial.' },
      { title: 'Rechte prüfen', description: 'Wir klären Nutzungsarten, Gebiete und Materialversionen. Die zuständigen Personen erteilen die Freigabe.' },
      { title: 'Partner finden', description: 'Wir vergleichen Lieferanten nach Mindestbestellmenge, Preis und Lieferzeit.' },
      { title: 'Entwurf und Muster', description: 'Wir prüfen Entwurf und Muster und dokumentieren Änderungen und die endgültige Freigabe.' },
      { title: 'Testbestellung und Lieferung', description: 'Wir vereinbaren die Testbestellung und die Lieferung. Der Käufer bestätigt die Abnahme schriftlich.' },
    ],
    deliverablesTitle: 'Geplante Ergebnisse',
    deliverables: ['Geprüfte Unterlagen zu den Nutzungsrechten', 'Freigegebenes Muster eines nicht elektronischen Dekoartikels', 'Lieferantenangebot als Bestellgrundlage', 'Schriftliche Abnahme durch den Käufer'],
  },
  es: {
    title: 'Del patrimonio cultural a un producto listo para un pedido de prueba',
    intro: 'El primer piloto de pago de Heritage Economy OS reúne a titulares de derechos y pequeñas marcas para desarrollar un artículo decorativo no electrónico con permisos verificados y una muestra física.',
    market: 'Empezamos en Italia y después reutilizamos el proceso de búsqueda de socios internacionales para evaluar la demanda en otro mercado de la UE.',
    explore: 'Ver cómo presentar una solicitud',
    imageAlt: 'Plato italiano de mayólica con decoración azul y dorada',
    imageCaption: 'Plato de mayólica, 1530 · Imagen de la colección del Metropolitan Museum of Art',
    entriesTitle: 'Elige cómo presentar tu solicitud',
    brand: {
      title: 'Marcas y compradores',
      description: 'Para pequeñas marcas de artículos para el hogar, decoración o productos culturales. Indica lo que quieres comprar, el presupuesto y el periodo previsto de lanzamiento.',
      action: 'Presentar una solicitud como marca',
    },
    rightsHolder: {
      title: 'Titulares de derechos',
      description: 'Para organizaciones y creadores que poseen los derechos o pueden representarlos. Presenta materiales culturales autorizados o con derechos verificables e indica su procedencia.',
      action: 'Presentar una solicitud como titular de derechos',
    },
    terms: 'Tras revisar tu solicitud, confirmamos el alcance, los costes y los plazos en un presupuesto por escrito.',
    processTitle: 'Cómo funciona el piloto',
    processIntro: 'El piloto prevé un bot de IA para detectar oportunidades comerciales relacionadas con la propiedad intelectual cultural y preseleccionar candidatos. Un único expediente registra las fuentes, los permisos y las versiones. Las personas responsables verifican los derechos y aprueban las muestras.',
    steps: [
      { title: 'Definición del proyecto', description: 'Revisamos las necesidades de compra, el mercado objetivo y los materiales culturales disponibles.' },
      { title: 'Revisión de derechos', description: 'Comprobamos los usos, territorios y versiones autorizados. Las personas responsables revisan y aprueban.' },
      { title: 'Búsqueda de socios', description: 'Comparamos proveedores según las cantidades mínimas de pedido, los precios y los plazos de entrega.' },
      { title: 'Diseño y muestra', description: 'Revisamos el diseño y la muestra y documentamos los cambios y la aprobación final.' },
      { title: 'Pedido de prueba y entrega', description: 'Acordamos el pedido y la entrega, y el comprador deja constancia por escrito de su aceptación.' },
    ],
    deliverablesTitle: 'Entregables previstos',
    deliverables: ['Expediente de permisos verificado', 'Muestra aprobada de un artículo decorativo no electrónico', 'Presupuesto del proveedor válido para cursar el pedido', 'Aceptación por escrito del comprador'],
  },
};
