import type { Locale } from '@/lib/i18n';

export type ContactTopic = 'formation' | 'heritage';

export const contactTopicCopy: Record<Locale, { subject: string; formation: string; heritage: string }> = {
  zh: { subject: '邮件主题（可修改）', formation: '欧洲企业设立咨询', heritage: '文化遗产合作咨询' },
  it: { subject: 'Oggetto dell’email (modificabile)', formation: 'Richiesta sulla costituzione di un’impresa in Europa', heritage: 'Richiesta di collaborazione sul patrimonio culturale' },
  en: { subject: 'Email subject (editable)', formation: 'Company formation in Europe enquiry', heritage: 'Cultural heritage partnership enquiry' },
  fr: { subject: 'Objet du message (modifiable)', formation: 'Demande de création d’entreprise en Europe', heritage: 'Demande de coopération sur le patrimoine culturel' },
  de: { subject: 'E-Mail-Betreff (bearbeitbar)', formation: 'Anfrage zur Unternehmensgründung in Europa', heritage: 'Anfrage zur Zusammenarbeit im Kulturerbe' },
  es: { subject: 'Asunto del correo (editable)', formation: 'Consulta sobre creación de empresas en Europa', heritage: 'Consulta de colaboración en patrimonio cultural' },
  pt: { subject: 'Assunto do e-mail (editável)', formation: 'Pedido sobre constituição de empresas na Europa', heritage: 'Pedido de parceria de património cultural' },
  ja: { subject: 'メールの件名（編集可）', formation: '欧州での会社設立に関する相談', heritage: '文化遺産の連携に関する相談' },
};
