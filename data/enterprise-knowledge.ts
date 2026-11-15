// Enterprise-service knowledge base for the v0 chat bot (bot/enterprise-minimal-v0).
//
// Grounding: ONLY the four pre-review package files dated 2026-11-10
// (self-check checklist, enterprise screening table, multilingual one-pager
// template, pre-review report skeleton). Every entry carries a source label
// (file + section) so answers can cite where they came from.
//
// Stripped when this file was built: all service price figures, all personal
// data, all person names, and all worked examples. The single monetary figure
// kept is the EUR 150 IOSS threshold, which is a regulatory threshold and is
// labelled as such in its entry. Do not add prices, names, or facts from
// other sources to this file without a new grounding review.

export type KnowledgeEntry = {
  id: string;
  /** Short source label, e.g. "checklist A". Cited in answers. */
  source: string;
  /** Content in Chinese (the language of the source files). */
  zh: string;
  /** Italian wording, only where the source file itself supplies it. */
  it?: string;
};

export const enterpriseKnowledge: KnowledgeEntry[] = [
  {
    id: 'checklist-purpose',
    source: 'checklist: purpose',
    zh: '本清单供中国中小企业自查欧洲落地合规，逐项勾选并填写信息或备注。自检结果分三档：通过、有条件通过（需补材料）、暂缓（需先解决红灯项）。本文件为预审辅助工具，不构成法律意见，正式合规结论以持牌律师或合规机构意见为准。',
    it: 'La checklist serve per autovalutare la conformità per l\u2019ingresso in Europa, con tre esiti: superato, superato con condizioni (documenti da integrare), sospeso (prima risolvere i punti critici). Non costituisce un parere legale: la conclusione formale spetta a un avvocato abilitato o a un organismo di conformità.',
  },
  {
    id: 'checklist-a-product-rules',
    source: 'checklist: A',
    zh: '产品与法规适用：确认产品类别与适用法规编号。通用产品安全法规 GPSR 为 (EU) 2023/988，自 2024-12-13 起适用。专项规则包括：REACH Regulation (EC) No 1907/2006；RoHS Directive 2011/65/EU 及 2015/863；玩具 Directive 2009/48/EC；食品接触材料 Regulation (EC) No 1935/2004；机械指令 2006/42/EC（现行），新版机械法规 (EU) 2023/1230 自 2027-01-20 起适用，取代 2006/42/EC；电池法规 Regulation (EU) 2023/1542，电池护照自 2027-02-18 起强制。CE 标志相关指令包括：机械 2006/42/EC、无线电设备 2014/53/EU、电磁兼容 2014/30/EU。',
    it: 'Il prodotto rientra nel campo di applicazione del GPSR? È richiesto il marchio CE? Coinvolge RoHS / REACH / materiali a contatto con alimenti / giochi / macchine / batterie?',
  },
  {
    id: 'checklist-b-operators',
    source: 'checklist: B',
    zh: '责任主体：需有欧盟境内责任人（名称、地址、联系方式），适用法规 (EU) 2023/988 与 (EU) 2019/1020（市场监管）。制造商在欧盟外的，需确认是否已签署欧盟授权代表。进口商信息需完整（名称、地址、联系人、EORI 等），适用法规 (EU) 2019/1020 与 Regulation (EU) No 952/2013（欧盟海关法典）。制造商信息需完整（产地、生产地址、批次记录）。需有书面责任分工（合同或协议）明确制造商、授权代表、进口商职责。',
    it: 'Responsabile nel territorio UE (nome / indirizzo / contatto). Rappresentante autorizzato nell\u2019UE (se applicabile). Informazioni sull\u2019importatore complete (nome / indirizzo / contatto / EORI). Informazioni sul produttore complete (origine / sede / registro lotti). Accordo scritto che definisca le responsabilità tra produttore, rappresentante e importatore.',
  },
  {
    id: 'checklist-c-docs',
    source: 'checklist: C',
    zh: '技术文件与符合性声明：需准备并保存技术文件（技术档案位置与负责人）。需签署并保存 EU 符合性声明（Declaration of Conformity，版本与日期）。需有第三方检测或实验室报告（机构、报告号、日期），适用法规 Regulation (EC) No 765/2008（认可）。需列出适用的 EN 协调标准清单（标准号与版本），适用法规 Regulation (EU) No 1025/2012（欧洲标准化）。需记录风险评估或安全分析报告（方法与结论）。',
    it: 'File tecnico disponibile e luogo di conservazione. Dichiarazione di conformità UE disponibile (versione / data). Rapporti di prova da laboratorio terzo (organismo / numero / data). Elenco delle norme armonizzate applicate (EN / numero / versione). Valutazione dei rischi disponibile (metodo / risultato).',
  },
  {
    id: 'checklist-d-marking',
    source: 'checklist: D',
    zh: '标签与追溯：确认产品上的 CE 标志及位置。产品需标注批次、型号或序列号。包装或标签需含制造商与进口商名称地址。使用说明与安全信息需有目标国官方语言版本。需建立产品追溯记录（销售记录、分销链、库存位置）。适用法规包括 (EU) 2023/988、(EU) 2019/1020 与 Regulation (EC) No 765/2008。',
    it: 'Marcatura CE applicata e posizione. Numero di lotto / modello / seriale presente. Nome e indirizzo del produttore / importatore su imballaggio / etichetta. Istruzioni d\u2019uso e avvertenze nella lingua dei Paesi di vendita. Tracciabilità prodotto disponibile (vendite / distribuzione / magazzino).',
  },
  {
    id: 'checklist-e-ecommerce',
    source: 'checklist: E',
    zh: '电商与远程销售：在线平台页面需公开必要合规信息（产品识别、制造商与进口商、使用说明、符合性声明链接）。需了解并准备接收来自 Safety Gate（原 RAPEX）的通报并配合通报流程。平台上需提供召回或安全缺陷通报通道。需了解平台与卖家在数字服务法 DSA（Regulation (EU) 2022/2065，自 2024-02-17 起全面适用）与平台合规方面的责任。需记录线上销售国家、数量与客户联系以便召回。适用法规还包括 (EU) 2019/1020 与 (EU) 2023/988。',
    it: 'Informazioni obbligatorie pubblicate sulla piattaforma. Pronto a ricevere / gestire notifiche dal Safety Gate (RAPEX). Canale per richiami / alert disponibile sulla piattaforma. Conoscenza delle responsabilità della piattaforma e del venditore (DSA / regole applicabili). Registro vendite online per paese / quantità / contatti clienti.',
  },
  {
    id: 'checklist-f-tax-customs',
    source: 'checklist: F',
    zh: '税务与海关：需确认是否已申请或获得 EORI 号，适用法规 Regulation (EU) No 952/2013（欧盟海关法典），自 2016-05-01 起适用。需准备 VAT 与 IOSS（VAT 号与 IOSS 注册），IOSS 自 2021-07-01 起施行；法规阈值（非服务价格）：价值不超过 150 欧元的 B2C 进口可用 IOSS 申报。需确定海关编码（HS/TARIC）与估计关税率。需指定清关代理与入境港口或仓储。需了解特定产品进口限制或许可。',
    it: 'EORI ottenuto? Stato VAT / IOSS (numero / registrazione). Codice doganale (HS / TARIC) e dazio stimato. Agente doganale e porto / magazzino di ingresso designati. Restrizioni / licenze specifiche per importazione.',
  },
  {
    id: 'checklist-g-recalls',
    source: 'checklist: G',
    zh: '召回与事故：需制定召回预案（流程、负责人、模板声明位置）。需有事故或不良事件通报流程并指定联系人，包含 Safety Gate 报送。产品责任与召回保险方面，无单一欧盟法规强制规定，建议商业保险（参见各国规定）。需保存可用于召回的销售与消费者联系记录（保存期限与位置）。需有内外部沟通模板（媒体声明、消费者通知、电商下架流程）。适用法规包括 (EU) 2019/1020 与 (EU) 2023/988。',
    it: 'Piano di richiamo pronto (procedura / responsabile / modello dichiarazione). Procedura per segnalazione incidenti / eventi avversi e contatto designato (incluso Safety Gate). Polizza assicurativa per responsabilità prodotto / richiami. Conservazione dei dati di vendita e contatto clienti per richiami. Template comunicazioni interne / esterne per richiami e ritiro prodotti.',
  },
  {
    id: 'checklist-regulation-index',
    source: 'checklist: regulation index',
    zh: '法规索引（适用日期已核对，2026-11-10）：通用产品安全法规 GPSR (EU) 2023/988，自 2024-12-13 起适用；市场监管法规 (EU) 2019/1020，自 2021-07-16 起适用；欧盟海关法典 UCC (EU) No 952/2013，自 2016-05-01 起适用；REACH (EC) No 1907/2006，自 2007-06-01 起生效；RoHS 2011/65/EU（2015/863 修订），自 2011-07-21 起生效；玩具指令 2009/48/EC，自 2011-07-20 起适用主要条款，新版玩具法规 (EU) 2025/2509 已公布，数字产品护照自 2030-08-01 起；食品接触材料法规 (EC) No 1935/2004，2004 年生效；机械指令 2006/42/EC，自 2009-12-29 起适用，新版机械法规 (EU) 2023/1230 自 2027-01-20 起适用；电池法规 (EU) 2023/1542，电池护照自 2027-02-18 起强制；无线电设备指令 RED 2014/53/EU，自 2016-06-13 起适用；电磁兼容指令 EMC 2014/30/EU，自 2016-04-20 起适用；认可法规 (EC) No 765/2008，2010 年生效；欧洲标准化法规 (EU) No 1025/2012，2013 年生效；数字服务法 DSA (EU) 2022/2065，自 2024-02-17 起全面适用；VAT 电子商务规则与 IOSS，Directive 2006/112/EC（2017/2455 修订），IOSS 自 2021-07-01 起施行。',
  },
  {
    id: 'checklist-scoring',
    source: 'checklist: scoring',
    zh: '自评打分规则：清单共 34 项，每项按事实打分，0 分为未完成或不足，1 分为已完成且可核实，满分 34 分。得分 29 分及以上（约 85%）为通过，建议进入标准版预审；20 至 28 分（约 59% 至 82%）为有条件通过，需列出需补材料清单并按优先级补齐后复核；19 分及以下（约 56%）为暂缓，需先解决红灯项（高风险或法律阻断项）再申请进一步审查。计算示例：得分等于获得分数除以 34 再乘以 100%。下一步：通过的，准备进入标准版预审，提供全部技术文件副本（符合性声明、检测报告、技术档案、授权代表合同等）；有条件通过的，按优先级列出并补齐缺失文件（优先：技术文件、检测报告、授权代表或进口商合同、标签样张）；暂缓的，先解决必须项（如无欧盟责任人、无基本合格证书或检测、严重化学风险等），必要时聘请持牌律师或合规机构核查并出具整改计划。',
  },
  {
    id: 'screening-public-only',
    source: 'screening: notes',
    zh: '企业筛选仅使用公开渠道核查：商会或公司登记记录、VAT 信息交换系统（VIES）、公司官网与电商页面、欧盟制裁名单、公开财报与新闻或媒体报道。严格不查、不买、不推断非公开信息。与 VAT 和 VIES 相关的欧盟法规参考：Council Directive 2006/112/EC 和 Regulation (EU) No 904/2010（增值税行政合作与信息交换，VIES 的法律依据）。仅做预审整理工具，不构成法律意见，正式合规结论以持牌律师或合规机构意见为准。',
  },
  {
    id: 'screening-check-items',
    source: 'screening: table',
    zh: '筛选表逐项记录公开核查结果，共 14 项：法定名称（本地语言加英文）；注册号或商会登记号；VAT 号及 VIES 核验结果与核验时间；注册地址（注册地址与经营地址是否一致）；成立时间（年与月）；法人或董事（主要管理人名单）；经营范围（公司章程或网站描述）；官网与电商渠道（列出网址）；产品线（核心产品与主要品类）；认证（CE、ISO、RoHS 等，列证书号与发证机构）；公开财务信号（是否有公开年报或营收提示，是否有破产或重组记录）；欧盟制裁名单核查结果；负面新闻或诉讼检索（近 5 年）；联系方式核实结果（邮件、电话、地址能否接通）。每项记录来源并标注状态：已核实、未通过或待补。',
  },
  {
    id: 'screening-dimensions',
    source: 'screening: scoring',
    zh: '评分标准总分 0 至 10 分，五个维度各 0 至 2 分，每项评分以公开证据为准，不得基于主观推断或非公开数据评分。1）身份真实性：2 分为商会登记号与公司官网名称一致、VAT 号存在且 VIES 核验通过、注册地址可核实、法人或董事信息一致；1 分为部分一致或 VIES 未能核实但未出现冲突，需补材料；0 分为登记信息与提供信息明显不符，或 VIES 显示无效或未注册，或注册地址或法人无法验证。2）合规完备度：2 分为目标市场必需证书能在公开来源证实，或有明确合规或质量管理声明；1 分为部分证书或自述有合规措施但缺直接证据，需补证书复印件或检测报告；0 分为无任何相关证书且产品属于需强制认证或禁止项的高风险类目。3）经营稳定性：2 分为有近 2 年以上连续公开经营记录、最近公开财务或销售线索无重大下滑、未见破产或清算或重大欠债公告；1 分为经营信息有限（新成立不足 2 年）或公开财务波动较大，但无破产或重大负面记录；0 分为有破产、法院扣押、持续负面财务信号或频繁变更注册信息。4）产品适配度：2 分为产品线与拟进欧盟的目标市场高度匹配，且已具备或接近满足适用标准或指令；1 分为产品可部分适配，但需额外测试或认证或存在标签或说明改进需求；0 分为产品不适合欧盟市场（法律禁止或限制项）或适配成本过高。5）沟通响应：2 分为提供的邮箱、电话或联系人经测试在 48 小时内有实际回复，或客服能提供具体后续材料时间表；1 分为联系方式存在但未回复（已留记录），或回复含糊需再次跟进；0 分为无有效联系方式或多次联系未果。',
  },
  {
    id: 'screening-bands',
    source: 'screening: scoring',
    zh: '评分汇总与处理建议：8 至 10 分为可推进，进入深度尽调或合同谈判并准备合规申请文件；5 至 7 分为需补材料，列出缺项后补齐复评；0 至 4 分为暂缓，存在实质性身份、合规或经营风险，建议不推进或需更严格的法律或合规核查。常用补材料示例清单：商会登记注册页截图（含注册号与成立时间）、VIES 查询截图（含搜索时间）、证书扫描件（CE、ISO、检测报告）、最近 2 年公开财报或财务摘要（如公开）、官方联系人的邮件往来截图或客服通话记录、负面新闻或法院记录原链或截图。',
  },
  {
    id: 'onepager-fields',
    source: 'one-pager: template',
    zh: '多语言展示一页纸模板（中文、意大利文、英文三栏）包含以下栏目：公司名（填写公司在欧洲使用的注册或品牌名）；定位句（一句话，说明目标客户与主要价值）；核心产品（3 项，每项一行：产品名加一句话卖点）；认证与合规亮点（CE、ISO、检测报告等，列出证书名称、编号与发证日期或写在办）；欧洲落地准备度三项勾选：仓库（欧洲）、合规（证书与检测）、售后（本地或远程），各勾选已准备好或未准备好；联系方式（负责人姓名、邮箱、国际格式电话、微信选填）；询盘跟进栏（日期、渠道、对方、下一步，每次联系后更新一行）。',
    it: 'Nome azienda. Frase di posizionamento (una frase). Prodotti principali (3 voci: nome + breve vantaggio). Certificazioni e conformità (CE / ISO / report). Prontezza per Europa: magazzino, conformità, assistenza post-vendita (pronto / non pronto). Contatti (nome / email / telefono / WeChat). Follow-up richieste (data / canale / interlocutore / prossimo passo).',
  },
  {
    id: 'onepager-rules',
    source: 'one-pager: notes',
    zh: '一页纸填写规则：不要写模糊宣传词（如最好、第一）；每项产品写产品型号或名称加可验证功能或参数，不写无法验证的绝对描述；只列出可出示的证书名称、编号与发证日期或写在办，不要写未取得的证书或含糊表述；联系方式至少填一位负责人姓名、有效邮箱和国际格式电话，不要只留微信且无其他联系方式；询盘跟进栏每次联系后务必更新并保存历史记录，记录具体动作与截止时间，不要只写已联系而无下一步。可直接印刷或导出为 PDF 发给欧洲买家；若一页放不下，先删核心产品中不重要的卖点行，不要新增页数。本文件为预审辅助工具，不构成法律意见，正式合规结论以持牌律师或合规机构意见为准。',
  },
  {
    id: 'report-structure',
    source: 'report: structure',
    zh: '预审报告骨架供标准版与完整版共用，标准版表示必须包含的章节，完整版表示仅在完整版中展开或新增的章节。章节包括：0）封面（委托方名称、产品名称与型号、报告日期、报告版本号、报告类型）；1）执行摘要（总体结论：通过、有条件通过或不通过，前三大风险点，关键整改建议，是否建议进行完整版深查）；2）委托范围与资料清单（委托范围、客户已提供资料清单、缺失资料清单）；3）企业核查结果（营业执照或注册信息、是否有欧盟驻点或代表、是否有 EORI 号、供应商清单含产地、合规负责人联系方式、结论筛选表）；4）产品合规逐项（按法规与合格要求列出每项合规要素的状态与缺口，表格化：法规或要求、适用性、当前状态、缺口说明、整改建议、优先级）；5）税务与海关（VAT 与 IOSS 注册状态、EORI、建议的关税 HS 编码、估计税率、进口门到门流程、责任分工）；6）渠道与平台（各销售渠道的特殊合规要求与注意事项）；7）风险清单（按红、黄、绿三级列出风险）；8）落地路径：30、60、90 天三步走（每阶段事项、负责人、所需文件、验收标准）；9）附件清单（已有附件与需补交的证据材料）。完整版额外章节：供应商与生产现场核查记录、样品检测对照表、技术文件逐条索引。',
  },
  {
    id: 'report-channels-risks',
    source: 'report: channels and risks',
    zh: '渠道与平台要点：Amazon 可能要求上传合格声明、技术文件或测试报告，被投诉可能触发下架，需有欧盟售后与退货策略；eBay 对危险品、假冒物品、有害物质等有严格限制；独立站需备齐合规文档以应对海关与诉讼风险，若收集欧盟消费者个人数据需注意 GDPR（本次预审不包含 GDPR 深度审查）。风险颜色定义：红（高风险）为若不整改可能导致产品下架、高额罚款、召回或刑事责任；黄（中风险）为需整改但短期可通过限制销售缓解；绿（低风险）为建议跟进但对市场准入无立即障碍。每条风险写清风险描述、潜在影响、可行建议、优先级与负责人建议。',
  },
  {
    id: 'report-path-rules',
    source: 'report: path and notes',
    zh: '落地路径 30、60、90 天三步走：30 天为短期关键项，60 天为中期整改，90 天为长期合规，每阶段写明事项、负责人与验收标准。填写注意事项：所有法规引用必须标注法规全称、编号与适用日期，正式报告发出前请持牌律师或合规机构复核日期；不要在报告中出现承诺性语句（例如保证通过 CE）；若引用第三方检测报告或证书，写明报告编号、出具机构与出具日期；报告中所有结论均为预审结论，最终合规评价以持牌律师、合规机构或监管机构确认为准。',
  },
  {
    id: 'report-regulation-index',
    source: 'report: regulation index',
    zh: '报告骨架法规索引补充：低压指令 LVD Directive 2014/35/EU，自 2016-04-20 起适用；WEEE Directive 2012/19/EU，自 2014-02-14 起适用；玩具新版法规 Regulation (EU) 2025/2509 已公布，数字产品护照自 2030-08-01 起；机械法规 Regulation (EU) 2023/1230 自 2027-01-20 起适用；电池法规 Regulation (EU) 2023/1542，电池护照自 2027-02-18 起强制；IOSS 自 2021-07-01 起施行；EORI 随欧盟海关法典 Regulation (EU) No 952/2013，自 2016-05-01 起适用。',
  },
];
