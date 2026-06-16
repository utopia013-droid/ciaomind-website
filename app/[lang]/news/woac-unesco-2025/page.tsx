import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Globe, Award } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'CIAOMIND创始人程之远先生出席UNESCO国际奥艺委员会30周年庆典 | CIAOMIND',
  description: '2025年7月16日，CIAOMIND创始人程之远先生受邀出席在巴黎联合国教科文组织总部举办的"艺术连接世界"暨《奥林匹克艺术宪章》签署30周年庆典活动。',
  keywords: 'CIAOMIND, 程之远, UNESCO, WOAC, 国际奥艺委员会, 奥林匹克艺术宪章, 巴黎, 艺术连接世界, 中意文化交流',
  openGraph: {
    title: 'CIAOMIND创始人程之远先生出席UNESCO国际奥艺委员会30周年庆典',
    description: '程之远先生受邀出席巴黎UNESCO总部举办的国际奥艺委员会30周年庆典',
    type: 'article',
    locale: 'zh_CN',
    siteName: 'CIAOMIND',
  },
};

export default function WoacUnescoPage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();
  const isZh = lang === 'zh';

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: isZh
              ? "CIAOMIND创始人程之远先生受邀出席UNESCO国际奥艺委员会30周年庆典"
              : "Il Fondatore di CIAOMIND Cheng Zhiyuan Invitato al 30° Anniversario WOAC presso l'UNESCO",
            datePublished: "2025-07-16",
            dateModified: "2025-07-16",
            author: {
              "@type": "Organization",
              name: "CIAOMIND S.B. S.R.L.",
              url: "https://www.ciaomind.com",
            },
            publisher: {
              "@type": "Organization",
              name: "CIAOMIND S.B. S.R.L.",
              logo: {
                "@type": "ImageObject",
                url: "https://www.ciaomind.com/images/logo.png",
              },
            },
            image: [
              "https://www.ciaomind.com/images/news/woac-unesco-2025/cheng-unesco-portrait.jpg",
              "https://www.ciaomind.com/images/news/woac-unesco-2025/unesco-group-photo.jpg",
              "https://www.ciaomind.com/images/news/woac-unesco-2025/unesco-building.jpg",
              "https://www.ciaomind.com/images/news/woac-unesco-2025/celebration-stage.jpg",
            ],
            articleSection: "News",
            keywords: "UNESCO, WOAC, 国际奥艺委员会, 奥林匹克艺术宪章, 巴黎, 艺术连接世界, 程之远, CIAOMIND",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-navy via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-coral rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-teal rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <Link href={`/${lang}/news`} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {isZh ? '返回新闻列表' : 'Torna alle Notizie'}
            </Link>
            <span className="inline-block px-4 py-2 rounded-full bg-primary-coral/20 text-primary-coral text-sm font-semibold mb-6">
              {isZh ? '国际盛会' : 'Evento Internazionale'}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {isZh ? (
                <>程之远先生受邀出席<br /><span className="text-primary-coral">UNESCO国际奥艺委员会30周年庆典</span></>
              ) : (
                <>Il Fondatore di CIAOMIND al <span className="text-primary-coral">30° Anniversario WOAC UNESCO</span></>
              )}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {isZh ? '2025年7月16日' : '16 Luglio 2025'}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {isZh ? '法国巴黎·UNESCO总部' : 'Parigi, Sede UNESCO'}
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Image */}
      <section className="section bg-white">
        <div className="container">
          <FadeIn>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/news/woac-unesco-2025/cheng-unesco-portrait.jpg"
                alt={isZh ? '程之远先生在UNESCO总部' : 'Cheng Zhiyuan alla sede UNESCO'}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg md:text-xl font-semibold">
                  {isZh
                    ? '程之远先生在联合国教科文组织总部留影'
                    : 'Cheng Zhiyuan alla sede UNESCO di Parigi'}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Article Content */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <FadeIn>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-text-secondary leading-relaxed mb-8">
                {isZh
                  ? '2025年7月16日，CIAOMIND创始人程之远先生受邀出席在法国巴黎联合国教科文组织（UNESCO）总部举办的"艺术连接世界"暨《奥林匹克艺术宪章》签署30周年庆典活动。此次活动由国际奥艺委员会（WOAC）主办，吸引了来自全球70多个国家的230余位文化艺术界代表参加。'
                  : 'Il 16 luglio 2025, Cheng Zhiyuan, fondatore di CIAOMIND, è stato invitato a partecipare alla celebrazione "Arts Connect The World" per il 30° anniversario della firma della Carta Olimpica delle Arti, tenutasi presso la sede UNESCO di Parigi. L\'evento, organizzato dal World OlympArts Committee (WOAC), ha visto la partecipazione di oltre 230 rappresentanti culturali e artistici da più di 70 paesi.'
                }
              </p>

              <h2 className="text-2xl font-bold text-primary-navy mt-12 mb-6">
                {isZh ? '🌍 全球盛会：艺术连接世界' : '🌍 Evento Globale: Arts Connect The World'}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                {isZh
                  ? '本次活动主题为"艺术连接世界"（Arts Connect The World），旨在通过艺术这一跨越国界、语言和文化的通用语言，促进全球文化交流与理解。活动现场，《奥林匹克艺术宪章》签署30周年纪念仪式隆重举行，来自五大洲的艺术家、文化学者、政商精英共同见证了这一历史性时刻。'
                  : 'Il tema dell\'evento era "Arts Connect The World", con l\'obiettivo di promuovere lo scambio culturale globale attraverso l\'arte, un linguaggio universale che supera confini, lingue e culture. La cerimonia commemorativa del 30° anniversario della firma della Carta Olimpica delle Arti è stata celebrata alla presenza di artisti, studiosi culturali e leader politici e imprenditoriali provenienti dai cinque continenti.'
                }
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-background-light rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-primary-coral" />
                    <h3 className="font-bold text-primary-navy">
                      {isZh ? '全球参与' : 'Partecipazione Globale'}
                    </h3>
                  </div>
                  <p className="text-text-secondary">
                    {isZh
                      ? '来自70多个国家的230余位文化艺术代表齐聚一堂，共同探讨艺术在促进全球和平与可持续发展中的重要作用。'
                      : 'Oltre 230 rappresentanti culturali e artistici da più di 70 paesi si sono riuniti per esplorare il ruolo dell\'arte nella promozione della pace globale e dello sviluppo sostenibile.'
                    }
                  </p>
                </div>
                <div className="bg-background-light rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-primary-coral" />
                    <h3 className="font-bold text-primary-navy">
                      {isZh ? '重要里程碑' : 'Milestone Importante'}
                    </h3>
                  </div>
                  <p className="text-text-secondary">
                    {isZh
                      ? '《奥林匹克艺术宪章》签署30周年，标志着国际奥艺委员会在推动全球艺术交流方面取得的重大成就。'
                      : 'Il 30° anniversario della firma della Carta Olimpica delle Arti segna un significativo traguardo nel promuovere gli scambi artistici globali da parte del WOAC.'
                    }
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-primary-navy mt-12 mb-6">
                {isZh ? '📜 《奥艺宣言》签署仪式' : '📜 Cerimonia della Dichiarazione Olimpica delle Arti'}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                {isZh
                  ? '庆典期间，《奥艺宣言》签署仪式隆重举行。该宣言重申了艺术作为人类共同财富的价值，呼吁各国政府、文化机构和个人共同努力，保护和传承非物质文化遗产，推动艺术教育的普及，并通过艺术促进不同文明之间的对话与理解。'
                  : 'Durante la celebrazione, si è tenuta la solenne cerimonia di firma della Dichiarazione Olimpica delle Arti. La dichiarazione ribadisce il valore dell\'arte come patrimonio comune dell\'umanità, invitando governi, istituzioni culturali e individui a lavorare insieme per proteggere e trasmettere il patrimonio culturale immateriale, promuovere l\'educazione artistica e favorire il dialogo tra diverse civiltà attraverso l\'arte.'
                }
              </p>

              {/* Image Gallery */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="/images/news/woac-unesco-2025/unesco-group-photo.jpg"
                    alt={isZh ? 'UNESCO合影墙' : 'Foto di gruppo UNESCO'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="/images/news/woac-unesco-2025/unesco-building.jpg"
                    alt={isZh ? 'UNESCO总部外景' : 'Sede UNESCO di Parigi'}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-primary-navy mt-12 mb-6">
                {isZh ? '🚁 世界低空经济艺术发展委员会揭牌' : '🚁 Svelamento del World Low Altitude Economy Art Development Committee'}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                {isZh
                  ? '活动期间，世界低空经济艺术发展委员会正式揭牌成立。该委员会致力于探索低空飞行器（无人机）在艺术表现中的应用，将科技与艺术完美融合，开创全新的艺术表现形式。庆典当晚，塞纳河畔上演了一场精彩的无人机灯光秀表演，数百架无人机在夜空中描绘出"艺术连接世界"的主题图案，成为巴黎夜空最美的风景。'
                  : 'Durante l\'evento, il World Low Altitude Economy Art Development Committee è stato ufficialmente inaugurato. Il comitato si dedica all\'esplorazione dell\'uso dei droni nell\'espressione artistica, integrando perfettamente tecnologia e arte per creare nuove forme di espressione artistica. La sera della celebrazione, una spettacolare performance di luci con droni si è svolta lungo la Senna, con centinaia di droni che disegnavano il tema "Arts Connect The World" nel cielo notturno di Parigi.'
                }
              </p>

              <div className="relative aspect-video rounded-xl overflow-hidden my-8">
                <Image
                  src="/images/news/woac-unesco-2025/celebration-stage.jpg"
                  alt={isZh ? '庆典主屏幕' : 'Palco della celebrazione'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-semibold">
                    {isZh
                      ? '"艺术连接世界"庆典活动现场'
                      : 'La scena della celebrazione "Arts Connect The World"'}
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-primary-navy mt-12 mb-6">
                {isZh ? '🤝 CIAOMIND与全球艺术事业' : '🤝 CIAOMIND e la Causa Artistica Globale'}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                {isZh
                  ? '作为致力于促进中欧文化交流的创新型社会企业，CIAOMIND始终关注全球艺术发展趋势，积极参与国际文化艺术交流活动。创始人程之远先生表示："能够受邀出席这次具有历史意义的庆典，我们深感荣幸。CIAOMIND将继续发挥桥梁作用，推动中国优秀传统文化与世界艺术潮流的对话与融合，让更多优秀的中国艺术家和艺术作品走向世界舞台。"'
                  : 'Come un\'impresa sociale innovativa dedicata alla promozione degli scambi culturali sino-europei, CIAOMIND segue da vicino le tendenze artistiche globali e partecipa attivamente agli scambi culturali internazionali. Il fondatore Cheng Zhiyuan ha dichiarato: "Siamo profondamente onorati di essere stati invitati a questa celebrazione storica. CIAOMIND continuerà a svolgere il ruolo di ponte, promuovendo il dialogo e la fusione tra la cultura tradizionale cinese e le tendenze artistiche mondiali, permettendo a più artisti e opere d\'arte cinesi di emergere sulla scena globale."'
                }
              </p>

              <p className="text-text-secondary leading-relaxed mb-6">
                {isZh
                  ? '此次出席UNESCO国际奥艺委员会30周年庆典，不仅是对CIAOMIND在文化艺术领域所做努力的肯定，也标志着公司在国际化道路上迈出了重要一步。未来，CIAOMIND将继续秉承"连接东方与西方"的使命，为中欧文化艺术交流搭建更加广阔的平台。'
                  : 'La partecipazione a questa celebrazione del 30° anniversario del WOAC presso l\'UNESCO non solo riconosce gli sforzi di CIAOMIND nel campo culturale e artistico, ma segna anche un passo importante nel percorso di internazionalizzazione dell\'azienda. In futuro, CIAOMIND continuerà a perseguire la missione di "collegare Oriente e Occidente", costruendo piattaforme più ampie per gli scambi culturali e artistici sino-europei.'
                }
              </p>
            </div>

            {/* Back to News */}
            <div className="mt-16 pt-8 border-t">
              <Link
                href={`/${lang}/news`}
                className="inline-flex items-center gap-2 text-primary-navy hover:text-primary-coral font-semibold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {isZh ? '返回新闻列表' : 'Torna alle Notizie'}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
