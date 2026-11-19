import type { Locale } from '@/lib/i18n';

const notices = {
  zh: ['产业协同申请', '我们使用机构名称、工作邮箱、合作方向、简述及语言评估申请并联系你。如果你通过合作方的引荐链接提交，系统会保存已核验的引荐节点，用于核对本次合作的来源。申请由 CIAOMIND 授权团队查看，主要数据库位于法兰克福，托管及数据库供应商可能按其数据处理条款跨境处理。无后续合作的意向按 180 天复核清理。'],
  it: ['Candidature alla rete industriale', 'Usiamo organizzazione, email di lavoro, ambito, descrizione e lingua per valutare la candidatura e ricontattarti. Se invii tramite un link di presentazione, registriamo il nodo verificato per controllare l’origine. L’accesso è riservato al team autorizzato. La banca dati primaria è a Francoforte. I fornitori possono trattare dati oltrefrontiera secondo i loro accordi. Le richieste senza seguito sono riesaminate per cancellazione entro 180 giorni.'],
  en: ['Industry network applications', 'We use organisation name, work email, area, brief and language to assess and respond to your application. If you submit through a referral link, we record the verified referring node to check the origin of this collaboration. Access is limited to the authorised team. The primary database is in Frankfurt. Hosting and database providers may process data across borders under their data processing terms. We review unsuccessful applications for deletion within 180 days.'],
  fr: ['Demandes de participation au réseau', 'Nous utilisons l’organisation, l’email professionnel, le domaine, la description et la langue pour examiner la demande et vous répondre. En cas de recommandation, nous conservons le nœud vérifié pour contrôler l’origine du contact. Seule l’équipe autorisée y accède. La base principale est à Francfort. Les prestataires peuvent traiter les données à l’étranger selon leurs clauses de traitement. Les demandes sans suite sont réexaminées pour suppression sous 180 jours.'],
  de: ['Anträge für das Industrienetzwerk', 'Wir verwenden Organisation, geschäftliche E-Mail, Bereich, Beschreibung und Sprache zur Prüfung und Beantwortung Ihres Antrags. Bei einem Empfehlungslink speichern wir den geprüften Empfehlungsgeber zur Überprüfung der Herkunft. Zugriff hat das berechtigte Team. Die primäre Datenbank liegt in Frankfurt. Anbieter können die Daten nach ihren Auftragsverarbeitungsbedingungen grenzüberschreitend verarbeiten. Anträge ohne weitere Zusammenarbeit werden binnen 180 Tagen auf Löschung geprüft.'],
  es: ['Solicitudes para la red industrial', 'Usamos la organización, el correo profesional, el área, la descripción y el idioma para evaluar y responder. Si utilizas un enlace de referencia, guardamos el nodo verificado para comprobar el origen del contacto. Solo accede el equipo autorizado. La base principal está en Fráncfort. Los proveedores pueden realizar tratamiento transfronterizo según sus acuerdos. Las solicitudes sin seguimiento se revisan para su supresión en un plazo de 180 días.'],
  pt: ['Candidaturas à rede industrial', 'Utilizamos a organização, o email profissional, a área, a descrição e o idioma para avaliar e responder. Se usar uma ligação de referência, registamos o nó verificado para confirmar a origem. O acesso cabe à equipa autorizada. A base principal está em Frankfurt. Os fornecedores podem tratar dados além-fronteiras segundo os seus acordos. Os pedidos sem seguimento são revistos para eliminação no prazo de 180 dias.'],
  ja: ['産業連携の申請情報', '組織名、業務用メール、連携分野、概要と言語は、申請の審査と返信に使用します。紹介リンクから申請した場合は、紹介元を確認するために確認済みノードを記録します。閲覧できるのは権限を持つ担当者です。主要データベースはフランクフルトにあり、サービス提供者のデータ処理条件により国境を越えて処理されることがあります。連携に至らなかった申請は180日以内に削除対象として確認します。'],
} satisfies Record<Locale, [string, string]>;

export default function NetworkPrivacy({ lang }: { lang: string }) {
  const [title, text] = notices[lang as Locale] ?? notices.en;
  return <section id="network-data" className="mt-8 scroll-mt-28">
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="mt-3 leading-relaxed">{text}</p>
  </section>;
}
