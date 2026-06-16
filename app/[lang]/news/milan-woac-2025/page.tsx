import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Users, Handshake } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'CIAOMIND米兰会晤WOAC国际奥艺委员会主席秦雯女士一行 | CIAOMIND',
  description: 'CIAOMIND创始人程之远先生在意大利米兰热情接待了来访的国际奥艺委员会（WOAC）执行主席秦雯女士与Dalia女士一行，双方就中欧文化艺术合作进行了深度交流。',
  keywords: 'CIAOMIND, 程之远, WOAC, 国际奥艺委员会, 秦雯, 米兰, 中欧艺术合作, 文化艺术交流',
  openGraph: {
    title: 'CIAOMIND创始人在米兰会晤WOAC国际奥艺委员会主席秦雯一行',
    description: '程之远先生代表CIAOMIND在米兰接待WOAC执行主席秦雯女士一行，共话中欧文化艺术合作',
    type: 'article',
    locale: 'zh_CN',
    siteName: 'CIAOMIND',
  },
};

export default function MilanWoacPage({ params: { lang } }: { params: { lang: string } }) {
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
              ? "CIAOMIND创始人在米兰会晤WOAC国际奥艺委员会主席秦雯女士一行"
              : "Il Fondatore di CIAOMIND Incontra a Milano la Delegazione WOAC Guidata da Qin Wen",
            datePublished: "2025-07-25",
            dateModified: "2025-07-25",
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
              "https://www.ciaomind.com/images/news/milan-woac-2025/milan-staircase-group.jpg",
              "https://www.ciaomind.com/images/news/milan-woac-2025/milan-mirror-hall.jpg",
            ],
            articleSection: "News",
            keywords: "WOAC, 国际奥艺委员会, Milan, CIAOMIND, 秦雯, 程之远, 中欧艺术合作",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-navy via-primary-navy to-indigo-900 text-white relative overflow-hidden">
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
              {isZh ? '新闻动态' : 'Notizie'}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {isZh ? (
                <>CIAOMIND创始人在米兰会晤<br /><span className="text-primary-coral">WOAC国际奥艺委员会主席一行</span></>
              ) : (
                <>CIAOMIND Incontra a Milano<br /><span className="text-primary-coral">la Delegazione WOAC</span></>
              )}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/80 mt-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-coral" />
                <span>2025年7月</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-coral" />
                <span>{isZh ? '意大利 · 米兰' : 'Milano, Italia'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-primary-coral" />
                <span>{isZh ? '高层会晤' : 'Incontro di Alto Livello'}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-white">
        <div className="container">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden shadow-xl -mt-10 relative z-20 max-w-5xl mx-auto">
              <Image
                src="/images/news/milan-woac-2025/milan-staircase-group.jpg"
                alt={isZh ? '程之远先生与WOAC秦雯主席一行在米兰合影' : 'Cheng Zhiyuan con la Presidente WOAC Qin Wen e delegazione a Milano'}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white text-lg font-medium">
                  {isZh ? '程之远先生与WOAC执行主席秦雯女士（右三）及Dalia女士（右二）一行在米兰合影' : 'Cheng Zhiyuan con Qin Wen (Presidente WOAC) e Dalia a Milano'}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Article Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-xl text-text-secondary leading-relaxed">
                  {isZh ? (
                    <>CIAOMIND S.B. S.R.L. 创始人<strong className="text-primary-navy">程之远先生</strong>在意大利<strong className="text-primary-navy">米兰</strong>热情接待了来访的<strong className="text-primary-navy">国际奥艺委员会（WOAC）执行主席秦雯女士</strong>与<strong className="text-primary-navy">Dalia女士</strong>一行，双方在米兰这座艺术与时尚之都展开了富有成果的文化艺术交流对话。</>
                  ) : (
                    <>Il fondatore di <strong className="text-primary-navy">CIAOMIND S.B. S.R.L.</strong>, il Sig. <strong className="text-primary-navy">Cheng Zhiyuan</strong>, ha accolto a <strong className="text-primary-navy">Milano</strong> la Presidente Esecutiva del <strong className="text-primary-navy">World Olympic Arts Council (WOAC)</strong>, <strong className="text-primary-navy">Qin Wen</strong>, insieme a <strong className="text-primary-navy">Dalia</strong> e alla delegazione, per un fruttuoso dialogo sull'arte e la cultura tra Europa e Cina.</>
                  )}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              {/* Event Highlights Cards */}
              <div className="grid md:grid-cols-2 gap-6 my-12">
                <div className="card-modern p-6 bg-gradient-to-br from-primary-navy/5 to-transparent border-l-4 border-primary-navy">
                  <div className="w-12 h-12 rounded-full bg-primary-navy/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary-navy" />
                  </div>
                  <h3 className="font-bold text-lg text-primary-navy mb-2">{isZh ? '高层对话' : 'Dialogo Strategico'}</h3>
                  <p className="text-text-secondary">{isZh ? '双方就中欧文化艺术合作前景、Olym\'Arts 2027奥艺大赛筹备以及企业品牌与艺术融合创新等议题进行了深度探讨。' : 'Discussione approfondita sulla cooperazione culturale Cina-Europa, i preparativi per Olym\'Arts 2027 e l\'integrazione tra arte e impresa.'}</p>
                </div>
                <div className="card-modern p-6 bg-gradient-to-br from-primary-coral/5 to-transparent border-l-4 border-primary-coral">
                  <div className="w-12 h-12 rounded-full bg-primary-coral/10 flex items-center justify-center mb-4">
                    <Handshake className="w-6 h-6 text-primary-coral" />
                  </div>
                  <h3 className="font-bold text-lg text-primary-navy mb-2">{isZh ? '合作展望' : 'Prospettive di Collaborazione'}</h3>
                  <p className="text-text-secondary">{isZh ? '此次米兰会晤为CIAOMIND在国际艺术文化领域的深度参与奠定了坚实基础，双方达成了多项未来合作共识。' : 'Questo incontro a Milano ha gettato solide basi per la partecipazione di CIAOMIND nel settore artistico e culturale internazionale, con accordi su future collaborazioni.'}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              {/* Group Photo Gallery */}
              <div className="my-12">
                <h2 className="text-2xl font-bold text-primary-navy mb-6">{isZh ? '会晤合影' : 'Galleria dell\'Incontro'}</h2>
                <p className="text-text-secondary mb-6">
                  {isZh ? '在米兰标志性的古典建筑中，程之远先生与WOAC代表团留下了珍贵的会晤影像。' : 'In uno storico edificio milanese, Cheng Zhiyuan e la delegazione WOAC hanno immortalato questo prezioso incontro.'}
                </p>
                <div className="relative rounded-xl overflow-hidden shadow-lg group max-w-2xl mx-auto mb-6">
                  <Image
                    src="/images/news/milan-woac-2025/milan-mirror-hall.jpg"
                    alt={isZh ? '程之远先生与WOAC代表团在米兰会晤合影' : 'Foto di gruppo dell\'incontro CIAOMIND-WOAC a Milano'}
                    width={1000}
                    height={700}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <p className="text-white text-sm">
                      {isZh ? '全部会晤人员在米兰古典镜厅合影留念' : 'Foto di gruppo nello storico salone degli specchi a Milano'}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              {/* About WOAC & Personages */}
              <div className="prose prose-lg max-w-none space-y-6 my-12">
                <h2 className="text-2xl font-bold text-primary-navy">{isZh ? '关于国际奥艺委员会（WOAC）' : 'Il World Olympic Arts Council (WOAC)'}</h2>
                <p className="text-text-secondary leading-relaxed">
                  {isZh ? (
                    <>
                      国际奥艺委员会（World Olympic Arts Council，简称<strong>WOAC</strong>）是一个致力于通过艺术连接世界的国际组织。其核心使命是弘扬1995年签署的《奥林匹克艺术宪章》精神，用艺术搭建桥梁、传递希望。WOAC正在全球范围内推进"Olym'Arts 2027"奥艺大赛的筹备工作。
                    </>
                  ) : (
                    <>
                      Il <strong>World Olympic Arts Council (WOAC)</strong> è un'organizzazione internazionale dedicata a connettere il mondo attraverso l'arte. La sua missione è promuovere lo spirito della Carta Olimpica delle Arti firmata nel 1995, costruendo ponti attraverso l'arte e trasmettendo speranza. Il WOAC sta preparando a livello globale i Giochi "Olym'Arts 2027".
                    </>
                  )}
                </p>

                <h2 className="text-2xl font-bold text-primary-navy">{isZh ? '秦雯女士简介' : 'Qin Wen'}</h2>
                <p className="text-text-secondary leading-relaxed">
                  {isZh ? (
                    <>
                      <strong>秦雯女士</strong>是国际奥艺委员会（WOAC）执行主席，长期致力于推动全球文化艺术交流事业。她拥有丰富的国际文化项目策划经验，曾成功策划并承办多项国内外大型文化活动和公益项目，在国际文化艺术界享有盛誉。
                    </>
                  ) : (
                    <>
                      <strong>Qin Wen</strong> è la Presidente Esecutiva del World Olympic Arts Council (WOAC), da lungo tempo impegnata nella promozione degli scambi culturali e artistici globali. Con una vasta esperienza nell'organizzazione di eventi culturali internazionali e progetti filantropici, gode di grande stima nel mondo dell'arte internazionale.
                    </>
                  )}
                </p>

                <h2 className="text-2xl font-bold text-primary-navy">{isZh ? 'CIAOMIND的角色与愿景' : 'Il Ruolo di CIAOMIND'}</h2>
                <div className="card-modern p-8 bg-gradient-to-br from-primary-navy/5 to-primary-coral/5 border-l-4 border-primary-coral">
                  <p className="text-text-secondary leading-relaxed">
                    {isZh ? (
                      <>
                        作为深耕中意两国文化交流的桥梁企业，<strong>CIAOMIND</strong>始终致力于推动东西方文明的深层对话。此次在米兰接待WOAC主席一行，标志着CIAOMIND在国际艺术文化领域的重要布局。我们相信，文化艺术是超越语言和国界的共同语言，CIAOMIND将持续发挥在中欧之间的独特优势，为全球文化艺术交流贡献价值。
                      </>
                    ) : (
                      <>
                        Come impresa-ponte tra Cina e Italia, <strong>CIAOMIND</strong> è sempre impegnata a promuovere il dialogo profondo tra le civiltà orientale e occidentale. L'accoglienza della delegazione WOAC a Milano segna un passo importante per CIAOMIND nel settore artistico e culturale internazionale. Crediamo che l'arte e la cultura siano un linguaggio universale che trascende lingue e confini.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              {/* CTA */}
              <div className="mt-12 mb-8 text-center">
                <Link
                  href={`/${lang}/contact`}
                  className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
                >
                  {isZh ? '了解更多合作机会' : 'Scopri Opportunita di Collaborazione'}
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}