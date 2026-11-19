'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { serviceVideos, type VideoText, type VideoTopic } from '@/data/service-videos';
import { narrationLanguages, type NarrationCopy, type NarrationLanguage } from '@/data/video-narration';
import type { Locale } from '@/lib/i18n';
import styles from './videos.module.css';

type ExternalMode = 'featured' | 'series';
type Selection = { topic: VideoTopic; mode: ExternalMode };
const topics: VideoTopic[] = ['formation', 'heritage'];
const audioLanguages: NarrationLanguage[] = ['zh', 'en'];

function externalPlayer(topic: VideoTopic, mode: ExternalMode, locale: Locale) {
  const film = serviceVideos[topic];
  const player = new URL(`https://www.youtube-nocookie.com/embed/${mode === 'series' ? 'videoseries' : film.id}`);
  player.searchParams.set('playsinline', '1');
  player.searchParams.set('hl', locale === 'zh' ? 'zh-CN' : locale);
  player.searchParams.set('autoplay', '1');
  if (mode === 'series') player.searchParams.set('list', film.playlist);
  if (topic === 'formation' && mode === 'featured') {
    player.searchParams.set('cc_load_policy', '1');
    player.searchParams.set('cc_lang_pref', 'en');
  }
  return player.href;
}

type ShelfProps = { locale: Locale; copy: VideoText; narration: NarrationCopy };

export default function VideoShelf({ locale, copy, narration }: ShelfProps) {
  const [audio, setAudio] = useState<NarrationLanguage>(locale === 'zh' ? 'zh' : 'en');
  const [selected, setSelected] = useState<Selection | null>(null);
  const players = useRef<Partial<Record<VideoTopic, HTMLVideoElement | null>>>({});

  function pauseOther(playing?: VideoTopic) {
    for (const topic of topics) if (topic !== playing) players.current[topic]?.pause();
  }

  function selectExternal(topic: VideoTopic, mode: ExternalMode) {
    pauseOther();
    setSelected({ topic, mode });
  }

  return (
    <>
      <fieldset className={styles.audioChoice}>
        <legend>{narration.language}</legend>
        <div>{audioLanguages.map(lang => (
          <label key={lang}>
            <input type="radio" name="audio" value={lang} checked={audio === lang} onChange={() => { setAudio(lang); setSelected(null); }} />
            <span lang={lang}>{narrationLanguages[lang]}</span>
          </label>
        ))}</div>
      </fieldset>
      <div className={styles.grid}>
        {topics.map(topic => {
          const film = serviceVideos[topic];
          const text = copy[topic];
          const local = narration.topics[topic];
          const mode = selected?.topic === topic ? selected.mode : null;
          const isSeries = mode === 'series';
          const title = isSeries ? `${film.seriesPublisher} · ${copy.series}` : text.name;
          const mediaPath = `/media/guides/v1/${topic}-${audio}`;
          const external = isSeries ? `https://www.youtube.com/playlist?list=${film.playlist}` : `https://www.youtube.com/watch?v=${film.id}`;

          return (
            <article key={topic} id={topic} className={styles.card}>
              <h2>{text.category}</h2>
              <div className={styles.screen}>
                {mode ? (
                  <iframe key={mode} src={externalPlayer(topic, mode, locale)} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                ) : (
                  <video key={mediaPath} ref={node => { players.current[topic] = node; }}
                    src={mediaPath + '.mp4'} poster={mediaPath + '.webp'} controls playsInline preload="none"
                    aria-label={`${local.title} · ${narrationLanguages[audio]}`}
                    onPlay={() => { pauseOther(topic); setSelected(null); }}>
                    <track kind="captions" src={mediaPath + '.vtt'} srcLang={audio === 'zh' ? 'zh-CN' : 'en'} label={narrationLanguages[audio]} default />
                  </video>
                )}
              </div>
              <div className={styles.controls}>
                <button type="button" aria-pressed={!mode} onClick={() => setSelected(null)}>{narration.guide}</button>
                <button type="button" aria-pressed={mode === 'featured'} onClick={() => selectExternal(topic, 'featured')}>{film.publisher} · {narration.original}</button>
                <button type="button" aria-pressed={isSeries} onClick={() => selectExternal(topic, 'series')}>{film.seriesPublisher} · {copy.series}</button>
              </div>
              <div className={styles.details}>
                <p className={styles.credit}>{mode ? (isSeries ? film.seriesPublisher : film.publisher) : 'CIAOMIND'} <span>·</span> {mode ? (isSeries ? copy.series : text.format) : narrationLanguages[audio]}</p>
                <h3>{mode ? title : local.title}</h3>
                {!isSeries && <p>{mode ? text.summary : local.description}</p>}
              </div>
              <div className={styles.actions}>
                <Link className={styles.cta} href={`/${locale}/contact/?topic=${topic}`}>{text.cta} <span aria-hidden="true">→</span></Link>
                <div className={styles.references}>
                  <a href={film.source}>{copy.source} <span aria-hidden="true">↗</span></a>
                  <a href={external}>{mode ? copy.watch : `${film.publisher} · YouTube`} <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <p className={styles.privacy}>{narration.externalNotice}</p>
    </>
  );
}
