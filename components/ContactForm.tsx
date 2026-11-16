'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
export default function ContactForm({ locale, requestContext, defaultMessage }: { locale: string; requestContext?: string; defaultMessage?: string }) {
  const t = useTranslations('contact'); const [opened, setOpened] = useState(false);
  function compose(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`CIAOMIND — ${String(data.get('name') ?? '')}`);
    const message = String(data.get('message') ?? '').trim();
    if (defaultMessage && message === defaultMessage.trim()) {
      const input = event.currentTarget.elements.namedItem('message') as HTMLTextAreaElement;
      input.setCustomValidity(locale === 'it' ? 'Aggiungi i dettagli del progetto.' : '请补充具体项目需求。');
      input.reportValidity();
      return;
    }
    const body = encodeURIComponent([message, String(data.get('name') ?? ''), String(data.get('email') ?? ''), requestContext].filter(Boolean).join('\n\n'));
    window.location.assign(`mailto:${company.email}?subject=${subject}&body=${body}`); setOpened(true);
  }
  return <div className="card max-w-2xl mx-auto"><h2 className="text-2xl mb-4">{t('message')}</h2><p className="mb-6 text-text-secondary">{t('email_notice')}</p>
    <form onSubmit={compose} className="space-y-5">
      <div><label htmlFor="name" className="block mb-2">{t('your_name')}</label><input id="name" name="name" autoComplete="name" required maxLength={120} className="w-full border rounded-lg p-3" /></div>
      <div><label htmlFor="email" className="block mb-2">{t('your_email')}</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className="w-full border rounded-lg p-3" /></div>
      <div><label htmlFor="message" className="block mb-2">{t('your_message')}</label><textarea id="message" name="message" defaultValue={defaultMessage} onInput={e => e.currentTarget.setCustomValidity('')} required maxLength={4000} rows={6} className="w-full border rounded-lg p-3" /></div>
      <button type="submit" className="btn-primary w-full">{t('send')}</button>
      {opened ? <p role="status" className="text-text-secondary">{t('email_opened')}</p> : null}
      <p className="text-sm text-text-secondary"><a href={`mailto:${company.email}`} className="underline">{company.email}</a> · <a href={`/${locale}/privacy/`} className="underline">{t('privacy_link')}</a></p>
    </form></div>;
}
