'use server';

import { redirect } from 'next/navigation';
import { accountClient, accountLocale } from '@/lib/account';
import { networkId } from '@/lib/partner-network';

export async function changeNetworkNode(rawLang: string, operation: 'verify' | 'state', form: FormData) {
  const lang = accountLocale(rawLang);
  const workspace = '/' + lang + '/business-os/network/';
  const client = await accountClient();
  if (!client) redirect(workspace + '?status=failed');
  const { data } = await client.auth.getUser();
  if (!data.user?.email_confirmed_at) redirect('/' + lang + '/account/');
  const id = networkId(form.get('id'));
  if (!id) redirect(workspace + '?status=failed');

  let saved = false;
  if (operation === 'verify') {
    const value = form.get('verification');
    const verification = typeof value === 'string' ? value.trim() : '';
    if (form.get('confirmed') === 'on' && verification.length >= 12 && verification.length <= 300) {
      const result = await client.rpc('bos_verify_network_node', { item: id, verification });
      saved = !result.error && Boolean(result.data);
    }
  } else if (operation === 'state') {
    const state = form.get('active');
    if (state === 'true' || state === 'false') {
      const result = await client.rpc('bos_set_network_node_active', { node_id: id, make_active: state === 'true' });
      saved = !result.error;
    }
  }
  redirect(workspace + '?status=' + (saved ? 'saved' : 'failed'));
}
