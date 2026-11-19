import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { company } from '@/data/company';
import { getEcosystemCopy } from '@/data/heritage-value';
import { getBriefCopy, matchChoice, roleIds, stageIds } from '@/data/project-brief';
import { strategyLocales } from '@/data/strategy-locales';
import { locales } from '@/lib/i18n';

type Query = { topic?: string | string[]; role?: string | string[]; stage?: string | string[] };

export default async function ContactPage({params, searchParams}: {params: Promise<{lang: string}>; searchParams: Promise<Query>}) {
  const [{lang}, query, t] = await Promise.all([params, searchParams, getTranslations('contact')]);
  const locale = matchChoice(lang, locales);
  if (!locale) notFound();
  const stage = matchChoice(query.stage, stageIds);
  const role = matchChoice(query.role, roleIds);
  const topic = matchChoice(query.topic, ['formation', 'heritage', 'industry', 'capital'] as const) ?? (stage || role ? 'industry' : undefined);
  const copy = getEcosystemCopy(locale);
  const strategy = strategyLocales[locale];
  const isProject = !!topic && topic !== 'formation';

  return <>
    <section className="section bg-primary-navy text-white">
      <div className="container-modern"><h1 className="text-4xl text-white">{t('title')}</h1><p className="mt-5 text-xl">{copy.rolesIntro}</p></div>
    </section>
    <section className="section bg-white"><div className="container-modern grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="space-y-5"><h2 className="text-2xl">{strategy.cta}</h2>
        {!isProject && <Link className="inline-block underline underline-offset-4" href={'/' + locale + '/contact/?topic=industry#brief'}>{getBriefCopy(locale).title} →</Link>}
        <p>{t('email')}: <a className="underline" href={'mailto:' + company.email}>{company.email}</a></p>
        <p>PEC: <a className="underline" href={'mailto:' + company.pec}>{company.pec}</a></p>
        <p>{t('phone')}: <a href={'tel:' + company.phone.replace(/\s/g,'')}>{company.phone}</a></p>
        <p>{strategy.stage}</p>
      </div>
      <ContactForm key={[topic, role, stage].join('/')} locale={locale} topic={topic} initialRole={role} initialStage={stage} roles={copy.roles} stages={copy.stages}/>
    </div></section>
  </>;
}
