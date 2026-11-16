import { ArrowDown, ArrowRight, Building2, PackageOpen, ScrollText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { locales, localeTags, type Locale } from '@/lib/i18n';
import styles from './HeritageHome.module.css';

type HomeCopy = {
  title: string; intro: string; pilot: string; services: string; connect: string;
  brand: string; brandDetail: string; brandAction: string;
  holder: string; holderDetail: string; holderAction: string;
  servicesTitle: string; servicesDetail: string; art: string;
};

const copy: Record<Locale, HomeCopy> = {
  zh: {
    title: '从文化素材到可交付商品', intro: '为家居与文创品牌匹配文化素材和工艺伙伴。先核实使用权，再推进设计、打样和试单。首个试点从意大利开始。',
    pilot: '了解文化 IP 开发试点', services: '查看企业服务', connect: '你想从哪一步开始？',
    brand: '我代表品牌', brandDetail: '带上选品需求、预算和上市时间。我们一起筛选文化素材和可供货的工艺伙伴。', brandAction: '提交选品需求',
    holder: '我代表权利方', holderDetail: '带上一项权利可核的文化素材，说明可讨论的用途和市场。我们一起评估开发机会。', holderAction: '提交文化素材线索',
    servicesTitle: '企业服务', servicesDetail: '查看意大利企业开办准备、会计套餐，以及跨境架构和产业重组评估。', art: '意大利马约利卡陶盘，1530 年',
  },
  it: {
    title: 'Dal patrimonio culturale al prodotto', intro: 'Colleghiamo marchi di arredo e design a risorse culturali e partner artigiani. Verifichiamo prima i diritti, poi passiamo a progettazione, campione e ordine di prova. Il primo pilota parte in Italia.',
    pilot: 'Scopri il progetto pilota', services: 'Vedi i servizi alle imprese', connect: 'Da dove vuoi partire?',
    brand: 'Rappresento un marchio', brandDetail: 'Indica prodotto, budget e data di lancio. Cerchiamo risorse culturali adatte e partner capaci di fornire il prodotto.', brandAction: 'Invia una richiesta di prodotto',
    holder: 'Rappresento un titolare dei diritti', holderDetail: 'Proponi una risorsa culturale con diritti verificabili. Indica gli usi e i mercati che sei disposto a valutare.', holderAction: 'Proponi una risorsa culturale',
    servicesTitle: 'Servizi alle imprese', servicesDetail: 'Preparazione all’apertura in Italia, contabilità e valutazione di assetti e riorganizzazioni transfrontaliere.', art: 'Piatto in maiolica italiana, 1530',
  },
  en: {
    title: 'From cultural heritage to products', intro: 'We connect homeware and design brands with cultural assets and makers. We check usage rights before design, sampling and a trial order. The first pilot starts in Italy.',
    pilot: 'Explore the cultural IP pilot', services: 'View business services', connect: 'Where would you like to start?',
    brand: 'I represent a brand', brandDetail: 'Share your product brief, budget and launch window. We’ll look for suitable cultural assets and makers who can supply the product.', brandAction: 'Share a sourcing brief',
    holder: 'I represent a rights holder', holderDetail: 'Bring a cultural asset with verifiable rights and indicate the uses and markets you are open to discussing.', holderAction: 'Propose a cultural asset',
    servicesTitle: 'Business services', servicesDetail: 'Explore Italian company setup preparation, accounting, and reviews of cross-border structures and industrial restructuring.', art: 'Italian maiolica dish, 1530',
  },
  fr: {
    title: 'Du patrimoine culturel au produit', intro: 'Nous relions les marques de décoration et de design à des ressources culturelles et des artisans. Les droits sont vérifiés avant la conception, le prototype et la commande d’essai. Le premier pilote se déroule en Italie.',
    pilot: 'Découvrir le projet pilote', services: 'Voir les services aux entreprises', connect: 'Par où souhaitez-vous commencer ?',
    brand: 'Je représente une marque', brandDetail: 'Indiquez le produit, le budget et la période de lancement. Nous cherchons des ressources et des artisans adaptés.', brandAction: 'Présenter un besoin produit',
    holder: 'Je représente un ayant droit', holderDetail: 'Proposez une ressource aux droits vérifiables et indiquez les usages et les marchés à étudier.', holderAction: 'Proposer une ressource culturelle',
    servicesTitle: 'Services aux entreprises', servicesDetail: 'Préparation à la création en Italie, comptabilité et évaluation de structures et restructurations internationales.', art: 'Plat en majolique italienne, 1530',
  },
  de: {
    title: 'Vom Kulturerbe zum Produkt', intro: 'Wir bringen Wohn- und Designmarken mit Kulturgütern und Handwerksbetrieben zusammen. Wir prüfen Nutzungsrechte vor Entwurf, Muster und Testbestellung. Das erste Pilotprojekt startet in Italien.',
    pilot: 'Pilotprojekt kennenlernen', services: 'Unternehmensleistungen ansehen', connect: 'Wie möchten Sie beginnen?',
    brand: 'Ich vertrete eine Marke', brandDetail: 'Beschreiben Sie Produkt, Budget und Markteinführung. Wir suchen passende Kulturvorlagen und Lieferpartner.', brandAction: 'Produktbedarf einreichen',
    holder: 'Ich vertrete einen Rechteinhaber', holderDetail: 'Schlagen Sie eine Kulturvorlage mit prüfbaren Rechten vor und nennen Sie mögliche Nutzungen und Märkte.', holderAction: 'Kulturvorlage vorschlagen',
    servicesTitle: 'Unternehmensleistungen', servicesDetail: 'Gründungsvorbereitung und Buchhaltung in Italien sowie Prüfung internationaler Strukturen und Umstrukturierungen.', art: 'Italienische Majolikaschale, 1530',
  },
  es: {
    title: 'Del patrimonio cultural al producto', intro: 'Conectamos marcas de decoración y diseño con recursos culturales y talleres artesanos. Verificamos los derechos antes del diseño, la muestra y el pedido de prueba. El piloto empieza en Italia.',
    pilot: 'Conocer el proyecto piloto', services: 'Ver servicios para empresas', connect: '¿Por dónde quieres empezar?',
    brand: 'Represento a una marca', brandDetail: 'Indica el producto, el presupuesto y la fecha de lanzamiento. Buscamos recursos y talleres adecuados para producirlo.', brandAction: 'Enviar una necesidad de producto',
    holder: 'Represento a un titular de derechos', holderDetail: 'Propón un recurso cultural con derechos verificables e indica los usos y mercados que te interesa explorar.', holderAction: 'Proponer un recurso cultural',
    servicesTitle: 'Servicios para empresas', servicesDetail: 'Preparación de la constitución en Italia, contabilidad y evaluación de estructuras y reorganizaciones transfronterizas.', art: 'Plato de mayólica italiana, 1530',
  },
};

export function heritageHomeMetadata(locale: Locale) {
  return {
    title: 'Heritage Economy OS',
    description: copy[locale].intro,
    alternates: {
      canonical: `/${locale}/`,
      languages: Object.fromEntries(locales.map(code => [localeTags[code], `/${code}/`])),
    },
  };
}

export default function HeritageHome({ locale, source }: { locale: Locale; source: string }) {
  const t = copy[locale];
  const pilotPath = `/${locale}/pilot/`;
  const query = source ? { utm_source: source } : {};
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="heritage-home-title">
        <div className={styles.heroInner}>
          <div className={styles.intro}>
            <p className={styles.product}>Heritage Economy OS</p>
            <h1 id="heritage-home-title">{t.title}</h1>
            <p className={styles.lead}>{t.intro}</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href={{ pathname: pilotPath, query }}>{t.pilot}<ArrowRight aria-hidden size={18} /></Link>
              <a className={styles.secondary} href="#business-services">{t.services}<ArrowDown aria-hidden size={16} /></a>
            </div>
          </div>
          <figure className={styles.art}>
            <div className={styles.artImage}>
              <Image src="/images/heritage/maiolica-1530.webp" alt={t.art} fill priority sizes="(max-width: 760px) 90vw, (max-width: 1300px) 48vw, 600px" />
            </div>
            <figcaption>{t.art} · <a href="https://www.metmuseum.org/art/collection/search/460197">The Metropolitan Museum of Art</a></figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.entries} aria-labelledby="heritage-entry-title">
        <h2 id="heritage-entry-title">{t.connect}</h2>
        <div className={styles.entryGrid}>
          <article>
            <PackageOpen className={styles.entryIcon} aria-hidden size={23} />
            <h3>{t.brand}</h3>
            <p>{t.brandDetail}</p>
            <Link href={{ pathname: pilotPath + 'apply/', query: { ...query, role: 'brand' } }}>{t.brandAction}<ArrowRight aria-hidden size={16} /></Link>
          </article>
          <article>
            <ScrollText className={styles.entryIcon} aria-hidden size={23} />
            <h3>{t.holder}</h3>
            <p>{t.holderDetail}</p>
            <Link href={{ pathname: pilotPath + 'apply/', query: { ...query, role: 'rights-holder' } }}>{t.holderAction}<ArrowRight aria-hidden size={16} /></Link>
          </article>
        </div>
      </section>
      <section id="business-services" className={styles.services} aria-labelledby="heritage-service-title">
        <Building2 aria-hidden size={26} />
        <div><h2 id="heritage-service-title">{t.servicesTitle}</h2><p>{t.servicesDetail}</p></div>
      </section>
    </div>
  );
}
