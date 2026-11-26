import Image from 'next/image';
import { notFound } from 'next/navigation';
import { brandCopy } from '@/data/brand';
import { locales, type Locale } from '@/lib/i18n';
import { company } from '@/data/company';
import styles from './brand.module.css';

type Props = { params: Promise<{ lang: string }> };
function getCopy(lang: string) {
  if (!locales.includes(lang as Locale)) notFound();
  return brandCopy[lang as Locale];
}
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const c = getCopy(lang);
  return {
    title: c.title, description: c.intro,
    alternates: { canonical: `${company.website}/${lang}/brand/`, languages: Object.fromEntries(locales.map(l => [l, `${company.website}/${l}/brand/`])) },
    openGraph: { title: `CIAOMIND · ${c.title}`, description: c.intro, images: [{ url: '/brand/ciaomind-social.png?v=20261119r3', width:1200, height:630 }] },
  };
}
export default async function BrandPage({ params }: Props) {
  const { lang } = await params;
  const c = getCopy(lang);
  const variants = [
    ['lockup', c.horizontal], ['stacked', c.stacked], ['centered', c.centered], ['icon', c.symbol],
  ];
  const templates = [
    ['ciaomind-presentation-cover.png', c.presentation, '1920 × 1080'],
    ['ciaomind-post.png', c.post, '1080 × 1350'],
    ['ciaomind-story.png', c.story, '1080 × 1920'],
    ['ciaomind-social.png', c.social, '1200 × 630'],
    ['ciaomind-email-signature.html', c.email, 'HTML'],
    ['ciaomind-letterhead.pdf', c.letterhead, 'PDF · HTML'],
  ];
  return <div className={styles.page}>
    <header className={styles.heading}><h1>{c.title}</h1><p>{c.intro}</p><a className={styles.download} href="/brand/ciaomind-brand-kit.zip?v=20261119r3" download>{c.download} ↓</a></header>
    <Image className={styles.preview} src="/brand/ciaomind-preview.png?v=20261119r3" alt="CIAOMIND" width={1200} height={420} />
    <section><h2>{c.identity}</h2><div className={styles.grid}>{variants.map(([name,title]) =>
      <article key={name}><div className={styles.mark}><Image src={`/brand/ciaomind-${name}-green.svg?v=20261119r3`} alt={title} width={name === 'centered' ? 600 : name === 'stacked' ? 300 : name === 'icon' ? 108 : 500} height={name === 'centered' ? 270 : name === 'icon' || name === 'stacked' ? 108 : 146} /></div><h3>{title}</h3><div className={styles.links}><a href={`/brand/ciaomind-${name}-green.svg?v=20261119r3`} download>{c.vector} ↗</a><a href={`/brand/ciaomind-${name}-green.png?v=20261119r3`} download>{c.png} ↗</a><a href={`/brand/ciaomind-${name}-green.webp?v=20261119r3`} download>WebP ↗</a></div></article>
    )}</div></section>
    <section><h2>{c.templates}</h2><div className={styles.templateGrid}>{templates.map(([file,title,format]) => <a key={file} href={`/brand/${file}?v=20261119r3`} download><span>{title}</span><small>{format}</small><span aria-hidden="true">↓</span></a>)}</div></section>
    <section><h2>{c.colors}</h2><div className={styles.swatches}>{[['#1C4036',c.green],['#F7F5EF',c.cream],['#FFFFFF',c.white]].map(([color,label]) => <div key={color}><span style={{ backgroundColor:color }} /><p>{label}<br/><code>{color}</code></p></div>)}</div></section>
    <section className={styles.rules}><h2>{c.usage}</h2><p>{c.rules}</p></section>
  </div>;
}
