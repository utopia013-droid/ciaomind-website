'use server';
import { redirect } from 'next/navigation';
import { accountClient, accountLocale } from '@/lib/account';

export async function submitBusinessRequest(rawLang: string, form: FormData) {
  const lang = accountLocale(rawLang);
  const client = await accountClient(true);
  const input = (key: string) => String(form.get(key) ?? '').trim();
  let status = 'unavailable';
  if (client && !input('website') && form.get('consent') === 'on') {
    const company = input('company');
    const email = input('email').toLowerCase();
    const brief = input('brief');
    const kind = input('kind');
    if (company.length > 0 && company.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 && brief.length >= 20 && brief.length <= 2400 && ['buyer', 'partner'].includes(kind)) {
      const { data, error } = await client.rpc('bos_submit_intake', { company_name: company, contact_email: email, request_kind: kind, request_brief: brief, request_language: ['zh', 'it'].includes(lang) ? lang : 'en', consent_given: true });
      if (!error && data) status = 'received';
    } else status = 'invalid';
  }
  redirect(`/${lang}/business-os/request/?status=${status}`);
}
