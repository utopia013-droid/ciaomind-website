'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { NetworkCopy } from '@/data/partner-network';
import { networkAreas, networkBriefLimit, type NetworkArea, type NetworkFormResult } from '@/lib/partner-network';

const field = 'mt-2 w-full rounded-lg border border-[#839a91] bg-white px-3 py-3 text-[#172e29]';

export default function NetworkApplication({
  copy, lang, defaultArea, action,
}: {
  copy: NetworkCopy;
  lang: string;
  defaultArea: NetworkArea;
  action: (previous: NetworkFormResult, form: FormData) => Promise<NetworkFormResult>;
}) {
  const [state, submit, pending] = useActionState<NetworkFormResult, FormData>(action, { status: 'idle' });
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState<NetworkArea>(defaultArea);
  const [brief, setBrief] = useState('');
  const [consent, setConsent] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status !== 'idle') feedback.current?.focus();
  }, [state]);

  if (state.status === 'received') {
    return <div ref={feedback} tabIndex={-1} role="status" className="rounded-xl border border-emerald-800 bg-emerald-50 p-5 text-emerald-950">
      <p>{copy.received}</p>
      <p className="mt-4 text-sm font-semibold">{copy.reference}</p>
      <code className="break-all text-sm">{state.id}</code>
    </div>;
  }

  return <form action={submit} className="grid min-w-0 gap-5">
    {state.status !== 'idle' && <div ref={feedback} tabIndex={-1} role="alert" className="rounded-xl bg-amber-50 p-4 text-amber-950">{copy[state.status]}</div>}
    <fieldset disabled={pending} className="grid min-w-0 gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="min-w-0 text-sm font-semibold">{copy.company}
          <input name="company" className={field} autoComplete="organization" maxLength={160} required value={company} onChange={event => setCompany(event.target.value)} />
        </label>
        <label className="min-w-0 text-sm font-semibold">{copy.email}
          <input name="email" className={field} type="email" autoComplete="email" maxLength={254} required value={email} onChange={event => setEmail(event.target.value)} />
        </label>
      </div>
      <label className="min-w-0 text-sm font-semibold">{copy.area}
        <select name="area" className={field} value={area} onChange={event => setArea(event.target.value as NetworkArea)}>
          {networkAreas.map(key => <option value={key} key={key}>{copy.areas[key][0]}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">{copy.brief}
        <span id="network-brief-hint" className="mt-1 block font-normal text-[#4e615c]">{copy.detailHint}</span>
        <textarea name="brief" className={field} aria-describedby="network-brief-hint network-safety" rows={5} minLength={20}
          maxLength={networkBriefLimit} required value={brief} onChange={event => setBrief(event.target.value)} />
      </label>
      <p id="network-safety" className="text-xs text-[#4e615c]">{copy.safety}</p>
      <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="grid gap-2 text-sm">
        <label className="flex items-start gap-2"><input name="consent" type="checkbox" className="mt-1" required
          checked={consent} onChange={event => setConsent(event.target.checked)} />{copy.consent}</label>
        <Link className="w-fit underline underline-offset-4" href={'/' + lang + '/privacy/#network-data'}>{copy.privacy}</Link>
      </div>
      <button className="w-fit rounded-lg bg-[#163d34] px-6 py-3 font-semibold text-white hover:bg-[#245447] disabled:opacity-60" type="submit">
        {pending ? copy.submitting : copy.submit}
      </button>
    </fieldset>
  </form>;
}
