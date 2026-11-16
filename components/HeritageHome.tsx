import { ArrowRight, Building2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { locales, localeTags, type Locale } from '@/lib/i18n';
import styles from './HeritageHome.module.css';

type HomeCopy = {
  title: string; intro: string; market: string; pilot: string; terms: string;
  brandAction: string; holderAction: string;
  servicesTitle: string; servicesDetail: string; art: string;
};

const copy: Record<Locale, HomeCopy> = {
  zh: {
    title: '把文化素材做成产品', intro: '面向家居与设计品牌，以及文化素材权利方。先核实使用权和生产可行性，再评估是否进入设计、打样或试单。',
    market: '文化 IP 开发试点 · 从意大利开始', pilot: '查看试点流程', terms: '申请免费。符合试点条件后，再确认项目范围并报价。',
    brandAction: '品牌方：提交选品需求', holderAction: '权利方：提交文化素材',
    servicesTitle: '企业服务', servicesDetail: '查看意大利企业开办准备、会计套餐，以及跨境架构和产业重组评估。', art: '意大利马约利卡陶盘，1530 年',
  },
  it: {
    title: 'Dal patrimonio culturale al prodotto', intro: 'Per marchi di arredo e design e titolari dei diritti. Verifichiamo i diritti d’uso e la fattibilità produttiva prima di valutare progettazione, campionatura o ordine di prova.',
    market: 'Progetto pilota sul patrimonio culturale · Si parte dall’Italia', pilot: 'Come funziona il progetto pilota', terms: 'Candidatura gratuita. Se il progetto è adatto al pilota, definiamo il lavoro e prepariamo un preventivo.',
    brandAction: 'Marchi: presenta il tuo progetto', holderAction: 'Titolari dei diritti: proponi una risorsa',
    servicesTitle: 'Servizi alle imprese', servicesDetail: 'Preparazione all’apertura in Italia, contabilità e valutazione di assetti e riorganizzazioni transfrontaliere.', art: 'Piatto in maiolica italiana, 1530',
  },
  en: {
    title: 'From cultural heritage to products', intro: 'For homeware and design brands and cultural rights holders. We check usage rights and production feasibility before considering design, a sample or a trial order.',
    market: 'Cultural IP development pilot · Starting in Italy', pilot: 'How the pilot works', terms: 'Free to apply. If there’s a fit, we’ll define the scope and prepare a quote.',
    brandAction: 'Brands: share a product brief', holderAction: 'Rights holders: propose an asset',
    servicesTitle: 'Business services', servicesDetail: 'Explore Italian company setup preparation, accounting, and reviews of cross-border structures and industrial restructuring.', art: 'Italian maiolica dish, 1530',
  },
  fr: {
    title: 'Du patrimoine culturel au produit', intro: 'Pour les marques de décoration et de design et les ayants droit. Nous vérifions les droits d’usage et la faisabilité avant d’envisager la conception, un prototype ou une commande d’essai.',
    market: 'Projet pilote sur le patrimoine culturel · Lancement en Italie', pilot: 'Comment se déroule le projet pilote', terms: 'Candidature gratuite. Si le projet correspond au pilote, nous définissons la prestation et préparons un devis.',
    brandAction: 'Marques : présentez votre projet', holderAction: 'Ayants droit : proposez une ressource',
    servicesTitle: 'Services aux entreprises', servicesDetail: 'Préparation à la création en Italie, comptabilité et évaluation de structures et restructurations internationales.', art: 'Plat en majolique italienne, 1530',
  },
  de: {
    title: 'Vom Kulturerbe zum Produkt', intro: 'Für Wohn- und Designmarken sowie Rechteinhaber. Wir prüfen Nutzungsrechte und Machbarkeit, bevor es um Entwurf, Muster oder Testbestellung geht.',
    market: 'Pilotprojekt für kulturelles Erbe · Start in Italien', pilot: 'So läuft das Pilotprojekt ab', terms: 'Die Bewerbung ist kostenlos. Passt das Vorhaben, klären wir den Umfang und erstellen ein Angebot.',
    brandAction: 'Marken: Produktidee einreichen', holderAction: 'Rechteinhaber: Kulturvorlage vorschlagen',
    servicesTitle: 'Unternehmensleistungen', servicesDetail: 'Gründungsvorbereitung und Buchhaltung in Italien sowie Prüfung internationaler Strukturen und Umstrukturierungen.', art: 'Italienische Majolikaschale, 1530',
  },
  es: {
    title: 'Del patrimonio cultural al producto', intro: 'Para marcas de decoración y diseño y titulares de derechos. Verificamos los derechos de uso y la viabilidad antes de plantear un diseño, una muestra o un pedido de prueba.',
    market: 'Proyecto piloto de patrimonio cultural · Inicio en Italia', pilot: 'Cómo funciona el proyecto piloto', terms: 'Solicitar plaza es gratis. Si el proyecto encaja, definimos el alcance y preparamos un presupuesto.',
    brandAction: 'Marcas: presenta tu proyecto', holderAction: 'Titulares de derechos: propón un recurso',
    servicesTitle: 'Servicios para empresas', servicesDetail: 'Preparación de la constitución en Italia, contabilidad y evaluación de estructuras y reorganizaciones transfronterizas.', art: 'Plato de mayólica italiana, 1530',
  },
};

export function heritageHomeMetadata(locale: Locale) {
  return {
    title: `${copy[locale].title} · Heritage Economy OS`,
    description: copy[locale].intro,
    alternates: {
      canonical: `/${locale}/`,
      languages: Object.fromEntries(locales.map(code => [localeTags[code], `/${code}/`])),
    },
  };
}

export default function HeritageHome({ locale, campaign }: { locale: Locale; campaign: Record<string, string> }) {
  const t = copy[locale];
  const pilotPath = `/${locale}/pilot/`;
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="heritage-home-title">
        <div className={styles.heroInner}>
          <div className={styles.intro}>
            <div className={styles.eyebrow}>
              <p className={styles.product}>Heritage Economy OS</p>
              <p className={styles.market}>{t.market}</p>
            </div>
            <h1 id="heritage-home-title">{t.title}</h1>
            <p className={styles.lead}>{t.intro}</p>
            <div className={styles.actions}>
              <Link className={styles.apply} href={{ pathname: pilotPath + 'apply/', query: { ...campaign, role: 'brand' } }}>
                {t.brandAction}<ArrowRight aria-hidden size={16} />
              </Link>
              <Link className={styles.apply} href={{ pathname: pilotPath + 'apply/', query: { ...campaign, role: 'rights-holder' } }}>
                {t.holderAction}<ArrowRight aria-hidden size={16} />
              </Link>
            </div>
            <p className={styles.terms}>{t.terms}</p>
            <Link className={styles.secondary} href={{ pathname: pilotPath, query: campaign }}>
              {t.pilot}<ArrowRight aria-hidden size={15} />
            </Link>
          </div>
          <figure className={styles.art}>
            <div className={styles.artImage}>
              <Image src="/images/heritage/maiolica-1530.webp" alt={t.art} fill priority sizes="(max-width: 760px) 94vw, (max-width: 1250px) 40vw, 480px" />
            </div>
            <figcaption>{t.art} · <a href="https://www.metmuseum.org/art/collection/search/460197">The Metropolitan Museum of Art</a></figcaption>
          </figure>
        </div>
      </section>
      <section id="business-services" className={styles.services} aria-labelledby="heritage-service-title">
        <Building2 aria-hidden size={26} />
        <div><h2 id="heritage-service-title">{t.servicesTitle}</h2><p>{t.servicesDetail}</p></div>
      </section>
    </div>
  );
}
