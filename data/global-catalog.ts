import type { BusinessService } from '@/data/business-catalog';
import type { Locale } from '@/lib/i18n';

type Labels = Record<Locale, string>;
type Texts = [string, string, string, string, string, string];
type Topic = { id: string; label: Labels };
type Source = { href: string; label: Labels };
type Market = { id: string; label: Labels; topics: Topic[]; sources: Source[] };

function labels([zh, it, en, fr, de, es]: Texts): Labels {
  return { zh, it, en, fr, de, es };
}

type MarketData = [id: string, label: Texts, topics: [string, ...Texts][], sources: string[]];

const marketData: MarketData[] = [
  ["it", ["意大利","Italia","Italy","Italie","Italien","Italia"], [

  ], []],
  ["fr", ["法国","Francia","France","France","Frankreich","Francia"], [
    ["fr-formation","法国公司设立评估","Valutazione della costituzione in Francia","French company formation review","Évaluation de création de société en France","Prüfung einer Gesellschaftsgründung in Frankreich","Evaluación de constitución en Francia"],
    ["fr-operations","法国会计与经营评估","Valutazione della gestione in Francia","French accounting and operations review","Évaluation comptable et opérationnelle en France","Prüfung von Buchhaltung und Betrieb in Frankreich","Evaluación de contabilidad y gestión en Francia"],
  ], []],
  ["de", ["德国","Germania","Germany","Allemagne","Deutschland","Alemania"], [
    ["de-formation","德国 GmbH／UG 设立评估","Valutazione GmbH o UG in Germania","German GmbH or UG formation review","Évaluation de création de GmbH ou UG","Prüfung einer GmbH- oder UG-Gründung","Evaluación de constitución de GmbH o UG"],
    ["de-operations","德国会计与经营评估","Valutazione della gestione in Germania","German accounting and operations review","Évaluation comptable et opérationnelle en Allemagne","Prüfung von Buchhaltung und Betrieb in Deutschland","Evaluación de contabilidad y gestión en Alemania"],
  ], []],
  ["es", ["西班牙","Spagna","Spain","Espagne","Spanien","España"], [
    ["es-formation","西班牙 SL／自雇设立评估","Valutazione SL o lavoro autonomo in Spagna","Spanish SL or self-employment review","Évaluation de création de SL ou d’activité indépendante","Prüfung einer SL oder Selbstständigkeit in Spanien","Evaluación de constitución de SL o alta de autónomo"],
    ["es-operations","西班牙会计与经营评估","Valutazione della gestione in Spagna","Spanish accounting and operations review","Évaluation comptable et opérationnelle en Espagne","Prüfung von Buchhaltung und Betrieb in Spanien","Evaluación de contabilidad y gestión en España"],
  ], []],
  ["uk", ["英国","Regno Unito","United Kingdom","Royaume-Uni","Vereinigtes Königreich","Reino Unido"], [
    ["uk-formation","英国有限公司设立评估","Valutazione per una Ltd nel Regno Unito","UK limited company formation review","Évaluation de création de société au Royaume-Uni","Prüfung einer Ltd-Gründung im Vereinigten Königreich","Evaluación de constitución de una Ltd británica"],
    ["uk-operations","英国年度申报与经营评估","Valutazione degli adempimenti nel Regno Unito","UK annual filings and operations review","Évaluation des déclarations annuelles au Royaume-Uni","Prüfung jährlicher Meldungen im Vereinigten Königreich","Evaluación de declaraciones anuales en el Reino Unido"],
  ], []],
  ["nl", ["荷兰","Paesi Bassi","Netherlands","Pays-Bas","Niederlande","Países Bajos"], [
    ["nl-formation","荷兰 BV 设立评估","Valutazione della costituzione di una BV","Dutch BV formation review","Évaluation de création d’une BV néerlandaise","Prüfung einer niederländischen BV-Gründung","Evaluación de constitución de una BV neerlandesa"],
    ["nl-operations","荷兰会计与经营评估","Valutazione della gestione nei Paesi Bassi","Dutch accounting and operations review","Évaluation comptable et opérationnelle aux Pays-Bas","Prüfung von Buchhaltung und Betrieb in den Niederlanden","Evaluación de contabilidad y gestión en los Países Bajos"],
  ], []],
  ["cn", ["中国内地","Cina continentale","Mainland China","Chine continentale","Festlandchina","China continental"], [
    ["cn-formation","企业设立与外资进入评估","Valutazione di costituzione e ingresso di investitori esteri","Company formation and foreign investment review","Évaluation de création de société et d’investissement étranger","Prüfung von Gründung und ausländischer Investition","Evaluación de constitución e inversión extranjera"],
    ["cn-operations","中国内地记账与经营评估","Valutazione della gestione in Cina continentale","Mainland China accounting and operations review","Évaluation comptable et opérationnelle en Chine continentale","Prüfung von Buchhaltung und Betrieb in Festlandchina","Evaluación de contabilidad y gestión en China continental"],
  ], []],
  ["hk", ["中国香港","Hong Kong","Hong Kong","Hong Kong","Hongkong","Hong Kong"], [
    ["hk-limited","香港私人股份有限公司","Società privata per azioni di Hong Kong","Hong Kong private company limited by shares","Société privée par actions à Hong Kong","Private Kapitalgesellschaft in Hongkong","Sociedad privada por acciones de Hong Kong"],
    ["hk-secretary","公司秘书与注册地址评估","Valutazione di segreteria societaria e sede legale","Company secretary and registered office review","Évaluation du secrétariat et du siège social","Prüfung der Gesellschaftssekretariats- und Sitzdienste","Evaluación de secretaría societaria y domicilio social"],
    ["hk-annual","年审与持续合规评估","Valutazione degli adempimenti annuali","Annual filings and ongoing compliance review","Évaluation des déclarations annuelles et de la conformité","Prüfung laufender Pflichten und Jahresmeldungen","Evaluación de obligaciones anuales y cumplimiento"],
  ], ["https://www.cr.gov.hk/en/services/register-company.htm","https://www.cr.gov.hk/en/legislation/scr/faq.htm"]],
  ["sg", ["新加坡","Singapore","Singapore","Singapour","Singapur","Singapur"], [
    ["sg-formation","新加坡本地公司设立评估","Valutazione della costituzione di una società locale a Singapore","Singapore local company formation review","Évaluation de création d’une société locale à Singapour","Prüfung einer lokalen Unternehmensgründung in Singapur","Evaluación de constitución de una sociedad local en Singapur"],
    ["sg-foreign-company","外国公司进入新加坡评估","Valutazione dell’ingresso di una società estera a Singapore","Foreign company entry into Singapore review","Évaluation de l’implantation d’une société étrangère à Singapour","Prüfung des Markteintritts eines ausländischen Unternehmens in Singapur","Evaluación de entrada de una empresa extranjera en Singapur"],
    ["sg-compliance","新加坡公司持续合规评估","Valutazione della conformità continuativa a Singapore","Singapore ongoing company compliance review","Évaluation de la conformité continue d’une société à Singapour","Prüfung der laufenden Unternehmenspflichten in Singapur","Evaluación del cumplimiento continuo de una sociedad en Singapur"],
  ], ["https://www.acra.gov.sg/register/foreign-business/ways-to-set-up/","https://www.acra.gov.sg/manage/companies/service-transaction-fees/"]],
  ["us", ["美国","Stati Uniti","United States","États-Unis","USA","Estados Unidos"], [
    ["us-llc","美国 LLC 设立与州别评估","Valutazione LLC e scelta dello Stato","US LLC formation and state review","Évaluation d’une LLC et de l’État américain","Prüfung einer LLC und des US-Bundesstaats","Evaluación de una LLC y del estado de constitución"],
    ["us-corp","美国 Corporation 设立评估","Valutazione di una corporation statunitense","US corporation formation review","Évaluation de création d’une corporation américaine","Prüfung einer US-Corporation-Gründung","Evaluación de constitución de una corporación estadounidense"],
    ["us-multi-state","跨州经营与持续申报评估","Valutazione di attività multistatale e adempimenti","Multi-state operations and filing review","Évaluation des activités et déclarations dans plusieurs États","Prüfung bundesstaatübergreifender Tätigkeit und Meldungen","Evaluación de actividad y obligaciones en varios estados"],
  ], ["https://legacy.sba.gov/business-guide/launch-your-business/register-your-business"]],
  ["bvi", ["英属维尔京群岛（BVI）","Isole Vergini Britanniche (BVI)","British Virgin Islands (BVI)","Îles Vierges britanniques (BVI)","Britische Jungferninseln (BVI)","Islas Vírgenes Británicas (BVI)"], [
    ["bvi-company","BVI 商业公司与注册代理评估","Valutazione di società BVI e agente registrato","BVI business company and registered agent review","Évaluation d’une société BVI et de son agent agréé","Prüfung einer BVI-Gesellschaft und des registrierten Vertreters","Evaluación de sociedad BVI y agente registrado"],
  ], ["https://www.bvifsc.vg/products-services/corporate-structures"]],
  ["cayman", ["开曼群岛","Isole Cayman","Cayman Islands","Îles Caïmans","Kaimaninseln","Islas Caimán"], [
    ["cayman-exempted","开曼豁免公司与持续义务评估","Valutazione di società esente e adempimenti alle Cayman","Cayman exempted company and ongoing obligations review","Évaluation d’une société exemptée et de ses obligations aux Caïmans","Prüfung einer Cayman Exempted Company und laufender Pflichten","Evaluación de sociedad exenta y obligaciones en Caimán"],
  ], ["https://www.ciregistry.ky/companies-register/types-of-companies/exempted-company/","https://www.ciregistry.ky/beneficial-owner/"]],
  ["trusts", ["信托与持有架构","Trust e strutture patrimoniali","Trusts and ownership structures","Trusts et structures de détention","Trusts und Beteiligungsstrukturen","Fideicomisos y estructuras de titularidad"], [
    ["trust-succession","家族传承与信托目标评估","Valutazione di successione familiare e finalità del trust","Family succession and trust objectives review","Évaluation de la succession familiale et des objectifs d’un trust","Prüfung der Familiennachfolge und Trust-Ziele","Evaluación de sucesión familiar y objetivos del fideicomiso"],
    ["trust-governance","受托人、治理与申报评估","Valutazione di trustee, governance e adempimenti","Trustee, governance and reporting review","Évaluation du trustee, de la gouvernance et des déclarations","Prüfung von Trustee, Verwaltung und Meldepflichten","Evaluación de fiduciario, gobernanza y declaraciones"],
    ["trust-holding","信托与公司持有关系评估","Valutazione degli assetti tra trust e società","Trust and company ownership review","Évaluation des liens de détention entre trust et sociétés","Prüfung der Beteiligungsverhältnisse zwischen Trust und Gesellschaft","Evaluación de la titularidad entre fideicomiso y sociedades"],
    ["trust-ky","开曼群岛信托区域评估","Valutazione del trust alle Isole Cayman","Cayman Islands trust review","Évaluation de trust aux Îles Caïmans","Prüfung eines Trusts auf den Caymaninseln","Evaluación de trust en las Islas Caimán"],
    ["trust-sg","新加坡信托服务提供方核查","Verifica dei fornitori di servizi fiduciari a Singapore","Singapore trust service-provider review","Vérification des prestataires de services fiduciaires à Singapour","Prüfung von Trust-Dienstleistern in Singapur","Revisión de proveedores de servicios fiduciarios en Singapur"],
    ["trust-hk","香港信托服务提供方核查","Verifica dei fornitori di servizi fiduciari a Hong Kong","Hong Kong trust service-provider review","Vérification des prestataires de services fiduciaires à Hong Kong","Prüfung von Trust-Dienstleistern in Hongkong","Revisión de proveedores de servicios fiduciarios en Hong Kong"],
    ["trust-bvi","BVI 信托与特殊持有结构评估","Valutazione di trust e strutture speciali BVI","BVI trust and special holding-structure review","Évaluation des trusts et structures spéciales de détention aux BVI","Prüfung von Trusts und besonderen Beteiligungsstrukturen auf den BVI","Evaluación de trusts y estructuras especiales de titularidad en las BVI"],
    ["trust-uk","英国信托登记与申报评估","Valutazione della registrazione e degli obblighi del trust nel Regno Unito","UK trust registration and reporting review","Évaluation de l’enregistrement et des déclarations d’un trust au Royaume-Uni","Prüfung der Trust-Registrierung und Meldungen im Vereinigten Königreich","Evaluación del registro y las declaraciones de trusts en el Reino Unido"],
    ["trust-record-review","信托文件与持续记录核查","Verifica degli atti fiduciari e dei registri continuativi","Trust documents and ongoing-record review","Vérification des actes et registres continus du trust","Prüfung von Trust-Dokumenten und laufenden Aufzeichnungen","Revisión de documentos del trust y registros continuos"],
  ], ["https://www.ciregistry.ky/trusts-register/","https://eservices.mas.gov.sg/fid/","https://www.tcsp.cr.gov.hk/tcspls/search/public-search","https://www.bvifsc.vg/content/vista","https://www.gov.uk/trusts-taxes/registering-a-trust"]],
  ["expansion", ["双向市场拓展","Espansione in entrambe le direzioni","Two-way market expansion","Expansion dans les deux sens","Marktexpansion in beide Richtungen","Expansión en ambas direcciones"], [
    ["industrial-restructuring","跨境产业重组评估","Valutazione della riorganizzazione industriale transfrontaliera","Cross-border industrial restructuring assessment","Évaluation d’une restructuration industrielle transfrontalière","Prüfung einer grenzüberschreitenden industriellen Umstrukturierung","Evaluación de reestructuración industrial transfronteriza"],
    ["cn-outbound","从中国出发：对外拓展评估","Dalla Cina verso l’estero: valutazione dell’espansione","Starting in China: outbound expansion review","Depuis la Chine : évaluation d’une expansion à l’étranger","Ausgehend von China: Prüfung einer Expansion ins Ausland","Desde China: evaluación de expansión al extranjero"],
    ["into-cn","进入中国市场：外资进入与本地设立评估","Ingresso nel mercato cinese: investimenti esteri e costituzione locale","Entering China: foreign investment and local setup review","Entrer sur le marché chinois : investissement étranger et implantation locale","Eintritt in den chinesischen Markt: ausländische Investition und lokale Gründung","Entrada en China: inversión extranjera y constitución local"],
    ["other-expansion","其他起点或目标市场：跨境拓展评估","Altri paesi di partenza o destinazione: valutazione dell’espansione internazionale","Other starting points or target markets: cross-border expansion review","Autres pays de départ ou marchés cibles : évaluation d’une expansion transfrontalière","Andere Ausgangsorte oder Zielmärkte: Prüfung einer grenzüberschreitenden Expansion","Otros puntos de partida o mercados objetivo: evaluación de expansión transfronteriza"],
  ], []],
  ["wealth", ["财富规划与持牌顾问转介","Pianificazione patrimoniale e invio a consulenti autorizzati","Wealth planning and licensed adviser referrals","Planification patrimoniale et orientation vers des conseillers agréés","Vermögensplanung und Vermittlung an zugelassene Berater","Planificación patrimonial y derivación a asesores autorizados"], [
    ["wealth-planning","财富规划需求梳理与顾问转介","Raccolta delle esigenze patrimoniali e invio a un consulente","Wealth planning needs intake and adviser referral","Recueil des besoins de planification patrimoniale et orientation vers un conseiller","Erfassung des Vermögensplanungsbedarfs und Vermittlung an einen Berater","Recopilación de necesidades patrimoniales y derivación a un asesor"],
    ["family-office","家族办公室需求梳理与适当专业人士转介","Esigenze di family office e invio ai professionisti competenti","Family office needs intake and referral to appropriate professionals","Recueil des besoins d’un family office et orientation vers les professionnels compétents","Erfassung des Family-Office-Bedarfs und Vermittlung an passende Fachleute","Recopilación de necesidades de family office y derivación a profesionales adecuados"],
    ["licensed-referral","持牌金融顾问转介需求","Esigenza di contatto con un consulente finanziario autorizzato","Licensed financial adviser referral needs","Besoins d’orientation vers un conseiller financier agréé","Bedarf an Vermittlung zu einem zugelassenen Finanzberater","Necesidad de derivación a un asesor financiero autorizado"],
  ], []],
];

const guide = labels(['官方参考', 'Fonte ufficiale', 'Official reference', 'Source officielle', 'Offizielle Quelle', 'Fuente oficial']);
const officialLabels: Record<string, string> = {
  'www.cr.gov.hk': 'Companies Registry',
  'legacy.sba.gov': 'U.S. Small Business Administration',
  'www.bvifsc.vg': 'BVI Financial Services Commission',
  'www.ciregistry.ky': 'Cayman Islands General Registry',
  'www.gov.uk': 'GOV.UK',
  'eservices.mas.gov.sg': 'MAS Financial Institutions Directory',
  'www.tcsp.cr.gov.hk': 'Hong Kong Companies Registry TCSP Search',
  'www.acra.gov.sg': 'ACRA Singapore',
};

export const globalMarkets: Market[] = marketData.map(([id, title, entries, official]) => ({
  id,
  label: labels(title),
  topics: entries.map(([topicId, ...topicLabel]) => ({ id: topicId, label: labels(topicLabel) })),
  sources: official.map(href => {
    const agency = officialLabels[new URL(href).hostname];
    return {
      href,
      label: labels([guide.zh, guide.it, guide.en, guide.fr, guide.de, guide.es].map(text => `${text} · ${agency}`) as Texts),
    };
  }),
}));

export const structureReview: BusinessService = {
  id: 'structure-review',
  group: 'global',
  name: labels(['跨境架构评估', 'Valutazione di assetti internazionali', 'Cross-border structure review', 'Évaluation de structure transfrontalière', 'Prüfung einer grenzüberschreitenden Struktur', 'Evaluación de estructura transfronteriza']),
  summary: labels(['提交办理地区、结构和业务目标，团队确认评估范围。', 'Indica giurisdizione, struttura e obiettivo. Il team confermerà il perimetro.', 'Select a jurisdiction and structure, and describe your goal for the team to review.', 'Indiquez la juridiction, la structure et votre objectif. L’équipe confirmera le périmètre.', 'Geben Sie Rechtsordnung, Struktur und Ziel an. Das Team prüft den Umfang.', 'Indica jurisdicción, estructura y objetivo. El equipo confirmará el alcance.']),
  variants: globalMarkets.flatMap(market => market.topics),
};
