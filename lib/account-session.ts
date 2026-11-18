import { createServerClient, type SetAllCookies } from '@supabase/ssr';

export function createAccountClient(
  getAll: () => { name: string; value: string }[],
  setAll: SetAllCookies,
) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createServerClient(url, key, { cookies: { getAll, setAll } });
}
