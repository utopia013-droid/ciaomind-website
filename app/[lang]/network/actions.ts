'use server';

import { accountClient, accountLocale } from '@/lib/account';
import { networkArea, networkBriefLimit, networkId, type NetworkFormResult } from '@/lib/partner-network';

export async function submitNetworkApplication(
  rawLang: string,
  requestId: string,
  referral: string | null,
  previous: NetworkFormResult,
  form: FormData,
): Promise<NetworkFormResult> {
  const field = (name: string) => {
    const value = form.get(name);
    return typeof value === 'string' ? value.trim() : '';
  };
  const company = field('company');
  const email = field('email').toLowerCase();
  const brief = field('brief');
  const area = networkArea(field('area'));
  const id = networkId(requestId);
  if (!id || !area || form.get('consent') !== 'on' || field('website') || !company || company.length > 160
    || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || brief.length < 20 || brief.length > networkBriefLimit) {
    return { status: 'invalid' };
  }

  try {
    const client = await accountClient(false);
    if (!client) return { status: 'unavailable' };
    const { data, error } = await client.rpc('bos_submit_network_intake', {
      request_id: id,
      company_name: company,
      contact_email: email,
      node_area: area,
      request_brief: brief,
      request_language: accountLocale(rawLang),
      referral_code: networkId(referral) ?? null,
      consent_given: true,
    });
    if (!error && data === id) return { status: 'received', id };
    if (error?.message === 'intake_capacity_reached') return { status: 'capacity' };
    if (error?.message === 'conflicting_request') return { status: 'conflict' };
    if (error?.message === 'invalid_request') return { status: 'invalid' };
  } catch {
    // Keep personal details and database errors out of the public response.
  }
  return { status: 'unavailable' };
}
