'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { EcosystemText } from '@/data/heritage-value';
import { ecosystemVideos } from '@/data/industry-videos';
import type { Locale } from '@/lib/i18n';
import styles from './IndustryVideos.module.css';

export default function IndustryVideos({ lang, copy, sourceLabel, initialStage = null }: {
  lang: string; copy: EcosystemText; sourceLabel: string; initialStage?: number | null;
}) {
  const [stage, setStage] = useState<number | null>(initialStage);
  const [active, setActive] = useState<string | null>(null);
  const visible = ecosystemVideos.filter(video => stage === null || video.stage === stage);
  function selectStage(next: number | null) {
    setActive(null);
    setStage(next);
  }
  return (
    <section id="industry" className={styles.section} aria-labelledby="industry-videos-title">
      <header className={styles.heading}><h2 id="industry-videos-title">{copy.libraryTitle}</h2><p>{copy.libraryIntro}</p></header>
      <div className={styles.filters} role="group" aria-label={copy.chapter}>
        <button type="button" aria-pressed={stage === null} onClick={() => selectStage(null)}>{copy.all}</button>
        {copy.stages.map(([name], index) => <button type="button" key={name} aria-pressed={stage === index} onClick={() => selectStage(index)}>{name}</button>)}
      </div>
      {stage !== null ? <p className={styles.context}>{copy.stages[stage][1]}</p> : null}
      <div className={styles.grid}>
        {visible.map(video => (
          <article key={video.id} className={styles.card}>
            <div className={styles.screen}>
              {active === video.id ? <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&hl=${lang === 'zh' ? 'zh-CN' : lang}`}
                title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"
              /> : <button type="button" id={`play-${video.id}`} className={styles.poster} aria-label={`${copy.play} · ${video.title}`} onClick={() => setActive(video.id)}>
                <Image src={`/api/video-poster/${video.id}/`} alt="" fill unoptimized sizes="(max-width: 700px) 90vw, (max-width: 1100px) 44vw, 29vw" />
                <span className={styles.play} aria-hidden="true">▶</span>
              </button>}
            </div>
            {active === video.id ? <button className={styles.close} type="button" onClick={() => {
              const buttonId = video.id;
              setActive(null);
              requestAnimationFrame(() => document.getElementById(`play-${buttonId}`)?.focus());
            }}>{copy.close}</button> : null}
            <p className={styles.publisher}>{video.publisher}</p>
            <h3 title={video.title}>{video.names[lang as Locale] ?? video.names.en}</h3>
            <p className={styles.stage}>{copy.stages[video.stage][0]}</p>
            <div className={styles.links}>
              <a href={`https://www.youtube.com/watch?v=${video.id}`}>{copy.watch} ↗</a>
              <a href={video.source}>{sourceLabel} ↗</a>
              <Link href={`/${lang}/contact/?topic=${video.stage === 4 ? 'capital' : video.stage === 0 ? 'heritage' : 'industry'}`}>{copy.contact} →</Link>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.notice}>{copy.notice}</p>
    </section>
  );
}
