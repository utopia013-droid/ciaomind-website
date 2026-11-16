import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, Package, ScrollText } from 'lucide-react';
import { locales, localeTags, type Locale } from '@/lib/i18n';
import { pilotContent } from './pilot-content';
import styles from './Pilot.module.css';

type Props = { params: { lang: Locale }; searchParams: Record<string, string | string[] | undefined> };

const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
const collectionUrl = 'https://www.metmuseum.org/art/collection/search/460197';

export function generateMetadata({ params: { lang } }: Props): Metadata {
  const copy = pilotContent[lang];
  const languages = Object.fromEntries(locales.map(locale => [localeTags[locale], `/${locale}/pilot/`]));

  return {
    title: copy.title,
    description: copy.intro,
    alternates: {
      canonical: `/${lang}/pilot/`,
      languages: { ...languages, 'x-default': '/zh/pilot/' },
    },
  };
}

export default function Pilot({ params: { lang }, searchParams }: Props) {
  const copy = pilotContent[lang];
  const attribution = new URLSearchParams();
  for (const key of utmKeys) {
    const value = searchParams[key];
    if (typeof value === 'string' && /^[A-Za-z0-9_.-]{1,80}$/.test(value)) attribution.set(key, value);
  }

  const entries = [
    { role: 'brand', copy: copy.brand, Icon: Package },
    { role: 'rights-holder', copy: copy.rightsHolder, Icon: ScrollText },
  ];

  return (
    <div className={styles.pilot}>
      <section className={styles.hero} aria-labelledby="pilot-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Heritage Economy OS</p>
          <h1 id="pilot-title">{copy.title}</h1>
          <p className={styles.intro}>{copy.intro}</p>
          <p className={styles.market}>{copy.market}</p>
          <a className={styles.heroAction} href="#pilot-services">
            {copy.explore}
            <ArrowDown size={17} aria-hidden />
          </a>
        </div>
        <figure className={styles.heroFigure}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/heritage/maiolica-1530.webp"
              alt={copy.imageAlt}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 42vw"
            />
          </div>
          <figcaption>
            <a href={collectionUrl}>{copy.imageCaption}</a>
          </figcaption>
        </figure>
      </section>

      <section className={styles.entries} id="pilot-services" aria-labelledby="pilot-request">
        <div className={styles.wrap}>
          <h2 id="pilot-request">{copy.entriesTitle}</h2>
          <div className={styles.entryGrid}>
            {entries.map(({ role, copy: entry, Icon }) => {
              const query = new URLSearchParams({ role });
              for (const [key, value] of attribution) query.set(key, value);

              return (
                <article className={styles.entry} key={role}>
                  <Icon className={styles.entryIcon} size={27} strokeWidth={1.4} aria-hidden />
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  <Link className={styles.entryAction} href={`/${lang}/pilot/apply/?${query}`}>
                    {entry.action}
                    <ArrowRight size={18} aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>
          <p className={styles.terms}>{copy.terms}</p>
        </div>
      </section>

      <section className={styles.workflow} id="pilot-process" aria-labelledby="pilot-process-title">
        <div className={styles.wrap}>
          <h2 id="pilot-process-title">{copy.processTitle}</h2>
          <p className={styles.processIntro}>{copy.processIntro}</p>
          <div className={styles.workflowGrid}>
            <ol className={styles.steps} role="list">
              {copy.steps.map((step, index) => (
                <li key={step.title}>
                  <span className={styles.stepNumber} aria-hidden>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <aside className={styles.deliverables} aria-labelledby="pilot-deliverables-title">
              <h3 id="pilot-deliverables-title">{copy.deliverablesTitle}</h3>
              <ul role="list">
                {copy.deliverables.map(item => (
                  <li key={item}>
                    <Check size={18} strokeWidth={1.8} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
