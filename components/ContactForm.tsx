'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
import { contactTopicCopy, type ContactTopic } from '@/data/contact-topics';
import { getBriefCopy, matchChoice, roleIds, stageIds, type ProjectRole, type ProjectStage } from '@/data/project-brief';
import type { Locale } from '@/lib/i18n';

type Props = {
  locale: Locale; topic?: ContactTopic; initialRole?: ProjectRole; initialStage?: ProjectStage;
  roles: string[]; stages: readonly (readonly [string, string])[];
};

const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white p-3';
const labelClass = 'mb-2 block font-medium';

export default function ContactForm({ locale, topic, initialRole, initialStage, roles, stages }: Props) {
  const topicCopy = contactTopicCopy[locale];
  const brief = getBriefCopy(locale);
  const t = useTranslations('contact');
  const project = topic === 'heritage' || topic === 'industry' || topic === 'capital';
  const [stage, setStage] = useState<ProjectStage | ''>(initialStage ?? '');
  const [notice, setNotice] = useState('');
  const [manualDraft, setManualDraft] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const activeStage = stages[stageIds.findIndex(value => value === stage)];

  function readDraft(current: HTMLFormElement) {
    const data = new FormData(current);
    const value = (name: string) => String(data.get(name) ?? '').trim();
    const contactName = value('name');
    const subject = topic ? value('subject') || topicCopy[topic] : contactName;
    const body: string[] = [];
    const add = (label: string, text?: string) => { if (text) body.push(label + '\n' + text); };
    if (project) {
      const roleIndex = roleIds.findIndex(item => item === value('role'));
      add(brief.role, roles[roleIndex]);
      add(brief.stage, activeStage?.[0]);
      add(brief.resources, value('resources'));
      add(brief.objective, value('message'));
      add(brief.next, value('next'));
    } else {
      body.push(value('message'));
    }
    const signature = [contactName, value('email')].filter(Boolean).join('\n');
    if (signature) body.push(signature);
    return { subject: 'CIAOMIND — ' + subject, body: body.join('\n\n') };
  }

  function compose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const draft = readDraft(event.currentTarget);
    window.location.assign('mailto:' + company.email + '?subject=' + encodeURIComponent(draft.subject) + '&body=' + encodeURIComponent(draft.body));
    setNotice(t('email_opened'));
  }

  async function copyBrief() {
    const current = form.current;
    if (!current) return;
    const message = current.elements.namedItem('message') as HTMLTextAreaElement;
    if (!message.reportValidity()) return;
    const draft = readDraft(current);
    const text = draft.subject + '\n\n' + draft.body;
    try {
      await navigator.clipboard.writeText(text);
      setManualDraft('');
      setNotice(brief.copied);
    } catch {
      setManualDraft(text);
      setNotice(brief.manual);
    }
  }

  function clearNotice() {
    setNotice('');
    setManualDraft('');
  }

  return <div id="brief" className="card mx-auto w-full max-w-2xl scroll-mt-24">
    <h2 className="mb-3 text-2xl">{project ? brief.title : t('message')}</h2>
    <p className="mb-6 text-text-secondary">{project ? brief.intro : t('email_notice')}</p>
    <form method="post" ref={form} onSubmit={compose} onChange={clearNotice} className="space-y-5">
      {topic && <div><label htmlFor="subject" className={labelClass}>{topicCopy.subject}</label><input id="subject" name="subject" defaultValue={topicCopy[topic]} required maxLength={200} className={fieldClass} /></div>}
      {project && <>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="role" className={labelClass}>{brief.role}</label>
            <select name="role" id="role" defaultValue={initialRole ?? ''} className={fieldClass}>
              <option value="">{brief.undecided}</option>
              {roleIds.map((id, index) => <option key={id} value={id}>{roles[index]}</option>)}
            </select></div>
          <div><label htmlFor="stage" className={labelClass}>{brief.stage}</label>
            <select name="stage" id="stage" value={stage} onChange={e => setStage(matchChoice(e.target.value, stageIds) ?? '')} aria-describedby={activeStage ? 'stage-context' : undefined} className={fieldClass}>
              <option value="">{brief.undecided}</option>
              {stageIds.map((id, index) => <option key={id} value={id}>{stages[index][0]}</option>)}
            </select></div>
        </div>
        {activeStage && <p id="stage-context" className="rounded-lg border-l-4 border-emerald-800 bg-emerald-50 p-3 text-sm text-emerald-950">{activeStage[1]}</p>}
        <div><label htmlFor="resources" className={labelClass}>{brief.resources}</label><textarea id="resources" name="resources" rows={2} maxLength={1200} className={fieldClass} /></div>
      </>}
      <div><label htmlFor="message" className={labelClass}>{project ? brief.objective : t('your_message')}</label><textarea id="message" name="message" required maxLength={4000} rows={project ? 3 : 6} className={fieldClass} /></div>
      {project && <div><label htmlFor="next" className={labelClass}>{brief.next}</label><textarea id="next" name="next" rows={2} maxLength={900} placeholder={brief.nextHint} className={fieldClass} /></div>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="name" className={labelClass}>{t('your_name')}</label><input id="name" name="name" autoComplete="name" required maxLength={120} className={fieldClass} /></div>
        <div><label htmlFor="email" className={labelClass}>{t('your_email')}</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} /></div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary">{project ? brief.action : t('send')}</button>
        {project && <button type="button" onClick={copyBrief} className="rounded-lg border border-current px-4 py-2 font-medium">{brief.copy}</button>}
      </div>
      {notice && <p role="status" className="text-text-secondary">{notice}</p>}
      {manualDraft && <div><label htmlFor="copy-draft" className={labelClass}>{brief.draft}</label><textarea readOnly id="copy-draft" rows={7} className={fieldClass} value={manualDraft} onFocus={e => e.currentTarget.select()} /></div>}
      <p className="text-sm text-text-secondary"><a href={'mailto:' + company.email} className="underline">{company.email}</a> · <a href={'/' + locale + '/privacy/'} className="underline">{t('privacy_link')}</a></p>
    </form>
  </div>;
}
