import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const newsArticles = [
  {
    slug: 'milan-woac-2025',
    date: '2025-07-25',
    titleZh: 'CIAOMIND创始人在米兰会晤WOAC国际奥艺委员会主席一行',
    titleIt: 'Il Fondatore di CIAOMIND Incontra a Milano la Delegazione WOAC',
    excerptZh: '程之远先生在米兰热情接待WOAC执行主席秦雯女士与Dalia女士一行，共话中欧文化艺术合作。',
    excerptIt: 'Cheng Zhiyuan accoglie a Milano la Presidente WOAC Qin Wen e Dalia per un fruttuoso dialogo culturale. ',
    image: '/images/news/milan-woac-2025/milan-staircase-group.jpg',
  },
  {
    slug: 'woac-unesco-2025',
    date: '2025-07-16',
    titleZh: 'CIAOMIND创始人受邀出席UNESCO国际奥艺委员会30周年庆典',
    titleIt: 'Il Fondatore di CIAOMIND Invitato al 30\u00b0 Anniversario WOAC presso l'UNESCO',
    excerptZh: '程之远先生赴巴黎联合国教科文组织总部，出席\u201c艺术连接世界\u201d暨《奥林匹克艺术宪章》签署30周年庆典活动。',
    excerptIt: 'Cheng Zhiyuan partecipa alla celebrazione del 30\u00b0 anniversario della Carta Olimpica delle Arti presso la sede UNESCO di Parigi.',
    image: '/images/news/woac-unesco-2025/cheng-unesco-portrait.jpg',
  },
];

export default function NewsPage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();
  const isZh = lang === 'zh';

  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="container text-center">
          <FadeIn>
            <span className="inline-block px-4 py-2 rounded-full bg-primary-coral/20 text-primary-coral text-sm font-semibold mb-6">
              {isZh ? '新闻动态' : 'Notizie e Eventi'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isZh ? '新闻中心' : 'Centro Notizie'}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              {isZh ? '了解CIAOMIND最新动态与国际交流活动' : 'Resta aggiornato sulle ultime novit\u00e0 ed eventi internazionali di CIAOMIND'}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* News List */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {newsArticles.map((article, index) => (
              <FadeIn key={article.slug} delay={index * 0.1}>
                <Link href={`/${lang}/news/${article.slug}`} className="group block">
                  <article className="card-modern overflow-hidden flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all duration-300">
                    <div className="md:w-80 flex-shrink-0 relative overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
                      <Image
                        src={article.image}
                        alt={isZh ? article.titleZh : article.titleIt}
                        width={400}
                        height={300}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-primary-coral" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-primary-coral" />
                          {isZh ? '法国巴黎' : 'Parigi, Francia'}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-primary-navy mb-3 group-hover:text-primary-coral transition-colors leading-tight">
                        {isZh ? article.titleZh : article.titleIt}
                      </h2>
                      <p className="text-text-secondary mb-4 line-clamp-2">
                        {isZh ? article.excerptZh : article.excerptIt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-primary-coral font-semibold group-hover:gap-3 transition-all">
                        {isZh ? '阅读全文' : 'Leggi Tutto'}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
