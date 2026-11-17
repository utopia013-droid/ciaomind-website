'use client';
import { innerPageLocales } from '@/data/inner-page-locales';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact'); const localized = innerPageLocales[locale as keyof typeof innerPageLocales]?.contact; const label=(key:string,index:number)=>localized?localized[index]:t(key as any); const [opened, setOpened] = useState(false);
  function compose(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`CIAOMIND — ${String(data.get('name') ?? '')}`);
    const body = encodeURIComponent(`${String(data.get('message') ?? '')}\n\n${String(data.get('name') ?? '')}\n${String(data.get('email') ?? '')}`);
    window.location.assign(`mailto:${company.email}?subject=${subject}&body=${body}`); setOpened(true);
  }
  return <div className="card max-w-2xl mx-auto"><h2 className="text-2xl mb-4">{label('message',5)}</h2><p className="mb-6 text-text-secondary">{label('email_notice',6)}</p>
    <form onSubmit={compose} className="space-y-5">
      <div><label htmlFor="name" className="block mb-2">{label('your_name',7)}</label><input id="name" name="name" autoComplete="name" required maxLength={120} className="w-full border rounded-lg p-3" /></div>
      <div><label htmlFor="email" className="block mb-2">{label('your_email',8)}</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className="w-full border rounded-lg p-3" /></div>
      <div><label htmlFor="message" className="block mb-2">{label('your_message',9)}</label><textarea id="message" name="message" required maxLength={4000} rows={6} className="w-full border rounded-lg p-3" /></div>
      <button type="submit" className="btn-primary w-full">{localized ? ({en:'Open email app',fr:'Ouvrir la messagerie',de:'E-Mail öffnen',es:'Abrir correo',pt:'Abrir e-mail',ja:'メールアプリを開く'} as Record<string,string>)[locale] : t('send')}</button>
      {opened ? <p role="status" className="text-text-secondary">{localized ? localized[6] : t('email_opened')}</p> : null}
      <p className="text-sm text-text-secondary"><a href={`mailto:${company.email}`} className="underline">{company.email}</a> · <a href={`/${locale}/privacy/`} className="underline">{localized ? localized[0] : t('privacy_link')}</a></p>
    </form></div>;
}
