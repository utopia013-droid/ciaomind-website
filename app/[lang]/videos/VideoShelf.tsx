'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { serviceVideos, type VideoText, type VideoTopic } from '@/data/service-videos';
import type { Locale } from '@/lib/i18n';
import styles from './videos.module.css';

type Selection = { topic: VideoTopic; mode: 'featured' | 'series' };
const topics: VideoTopic[] = ['formation', 'heritage'];

export default function VideoShelf({ locale, copy }: { locale: Locale; copy: VideoText }) {
  const [selected, setSelected] = useState<Selection | null>(null);
  return (
    <>
      <div className={styles.grid}>
        {topics.map(topic => {
          const film = serviceVideos[topic];
          const text = copy[topic];
          const mode = selected?.topic === topic ? selected.mode : null;
          const series = mode === 'series';
          const player = new URL(series ? 'https://www.youtube-nocookie.com/embed/videoseries' : `https://www.youtube-nocookie.com/embed/${film.id}`);
          player.searchParams.set('playsinline', '1');
          player.searchParams.set('hl', locale === 'zh' ? 'zh-CN' : locale);
          player.searchParams.set('autoplay', '1');
          if (series) player.searchParams.set('list', film.playlist);
          if (topic === 'formation' && !series) {
            player.searchParams.set('cc_load_policy', '1');
            player.searchParams.set('cc_lang_pref', 'en');
          }
          const external = series ? `https://www.youtube.com/playlist?list=${film.playlist}` : `https://www.youtube.com/watch?v=${film.id}`;
          const title = series ? `${film.seriesPublisher} · ${copy.series}` : text.name;
          return (
            <article key={topic} id={topic} className={styles.card}>
              <h2>{text.category}</h2>
              <div className={styles.screen}>
                {mode ? (
                  <iframe key={player.href} src={player.href} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                ) : (
                  <button type="button" className={styles.poster} aria-label={`${copy.play} · ${text.name}`} onClick={() => setSelected({ topic, mode: 'featured' })}>
                    <Image src={`/api/video-poster/${film.id}/`} alt="" fill unoptimized sizes="(max-width: 760px) 100vw, 50vw" />
                    <span className={styles.play} aria-hidden="true">▶</span>
                    <span className={styles.duration}>{film.duration}</span>
                  </button>
                )}
              </div>
              <div className={styles.controls}>
                <button type="button" aria-pressed={!series} onClick={() => setSelected({ topic, mode: 'featured' })}>{copy.featured}</button>
                <button type="button" aria-pressed={series} onClick={() => setSelected({ topic, mode: 'series' })}>{film.seriesPublisher} · {copy.series}</button>
              </div>
              <div className={styles.details}>
                <p className={styles.credit}>{film.publisher} <span>·</span> {text.format}</p>
                <h3>{text.name}</h3>
                <p>{text.summary}</p>
              </div>
              <div className={styles.actions}>
                <Link className={styles.cta} href={`/${locale}/contact/?topic=${topic}`}>{text.cta} <span aria-hidden="true">→</span></Link>
                <div className={styles.references}>
                  <a href={film.source}>{copy.source} <span aria-hidden="true">↗</span></a>
                  <a href={external}>{copy.watch} <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <p className={styles.privacy}>{copy.consent}</p>
    </>
  );
}
