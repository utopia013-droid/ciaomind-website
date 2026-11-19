import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { locales, type Locale } from './i18n';
import { createAccountClient } from './account-session';

export const accountLocale = (lang: string): Locale => locales.includes(lang as Locale) ? lang as Locale : 'it';

export async function accountClient(writable = true) {
  const jar = await cookies();
  return createAccountClient(
    () => jar.getAll(),
    entries => {
      if (!writable) return;
      for (const { name, value, options } of entries) jar.set(name, value, options);
    },
  );
}

export async function requireAccount(lang: string, writable = true) {
  const client = await accountClient(writable);
  const user = client && (await client.auth.getUser()).data.user;
  if (!client || !user?.email || !user.email_confirmed_at) redirect(`/${lang}/account/`);
  return { client, email: user.email };
}
