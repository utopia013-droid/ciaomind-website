import type { Locale } from '@/lib/i18n';

export type ContactTopic = 'formation' | 'heritage' | 'industry' | 'capital';

export const contactTopicCopy: Record<Locale, { subject: string; formation: string; heritage: string; industry: string; capital: string }> = {
  zh: { industry: "产业与品牌协同", capital: "扩张与资本合作", subject: '邮件主题（可修改）', formation: '欧洲企业设立咨询', heritage: '文化遗产合作咨询' },
  it: { industry: "Collaborazioni tra industria e marchi", capital: "Crescita e capitale", subject: 'Oggetto dell’email (modificabile)', formation: 'Richiesta sulla costituzione di un’impresa in Europa', heritage: 'Richiesta di collaborazione sul patrimonio culturale' },
  en: { industry: "Industry & brand collaboration", capital: "Growth & capital partnerships", subject: 'Email subject (editable)', formation: 'Company formation in Europe enquiry', heritage: 'Cultural heritage partnership enquiry' },
  fr: { industry: "Coopération industrielle et marques", capital: "Croissance et capital", subject: 'Objet du message (modifiable)', formation: 'Demande de création d’entreprise en Europe', heritage: 'Demande de coopération sur le patrimoine culturel' },
  de: { industry: "Industrie und Marken verbinden", capital: "Wachstum und Kapital", subject: 'E-Mail-Betreff (bearbeitbar)', formation: 'Anfrage zur Unternehmensgründung in Europa', heritage: 'Anfrage zur Zusammenarbeit im Kulturerbe' },
  es: { industry: "Industria y marcas en colaboración", capital: "Crecimiento y capital", subject: 'Asunto del correo (editable)', formation: 'Consulta sobre creación de empresas en Europa', heritage: 'Consulta de colaboración en patrimonio cultural' },
  pt: { industry: "Colaboração entre indústria e marcas", capital: "Crescimento e capital", subject: 'Assunto do e-mail (editável)', formation: 'Pedido sobre constituição de empresas na Europa', heritage: 'Pedido de parceria de património cultural' },
  ja: { industry: "産業とブランドの連携", capital: "成長と資本連携", subject: 'メールの件名（編集可）', formation: '欧州での会社設立に関する相談', heritage: '文化遺産の連携に関する相談' },
};
