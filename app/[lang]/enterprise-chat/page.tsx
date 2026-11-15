'use client';

import { useRef, useState } from 'react';
import { company } from '@/data/company';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const COPY = {
  zh: {
    title: '企业服务咨询',
    intro: '咨询欧洲落地合规预审相关问题：自查清单、企业筛选、展示材料与预审报告流程。',
    note: '本页回答仅依据 CIAOMIND 公布的服务材料；不构成法律意见。材料未覆盖的问题，我们会直接说明，不猜测。',
    greeting: '你好，我可以根据 CIAOMIND 的服务材料回答企业欧洲落地合规预审相关问题。请问有什么可以帮你？',
    placeholder: '请输入您的问题，例如：GPSR 适用于哪些产品？',
    send: '发送',
    sending: '发送中…',
    inputLabel: '您的问题',
    error: '暂时无法回答，请稍后再试，或通过联系页面联系我们。',
    contactLink: '联系我们',
    contactIntro: '需要个案咨询或报价说明，请通过联系页面联系我们。',
  },
  it: {
    title: 'Assistenza per le imprese',
    intro: 'Domande sulla pre-valutazione di conformità per l\u2019ingresso in Europa: checklist, selezione delle imprese, materiali di presentazione e struttura del rapporto.',
    note: 'Le risposte si basano esclusivamente sui materiali di servizio pubblicati da CIAOMIND e non costituiscono un parere legale. Se i materiali non coprono una domanda, lo diciamo chiaramente, senza indovinare.',
    greeting: 'Ciao, posso rispondere a domande sulla pre-valutazione di conformità per l\u2019ingresso in Europa, in base ai materiali di servizio di CIAOMIND. Come posso aiutarti?',
    placeholder: 'Scrivi la tua domanda, ad esempio: a quali prodotti si applica il GPSR?',
    send: 'Invia',
    sending: 'Invio in corso…',
    inputLabel: 'La tua domanda',
    error: 'Al momento non è possibile rispondere. Riprova più tardi o contattaci tramite la pagina dei contatti.',
    contactLink: 'Contattaci',
    contactIntro: 'Per una consulenza sul tuo caso o informazioni sui costi, contattaci tramite la pagina dei contatti.',
  },
} as const;

export default function EnterpriseChatPage({ params: { lang } }: { params: { lang: string } }) {
  const copy = lang === 'it' ? COPY.it : COPY.zh;
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: copy.greeting },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || loading) return;
    setInput('');
    setFailed(false);
    const next: ChatMessage[] = [...messages, { role: 'user', content: question }];
    setMessages(next);
    setLoading(true);
    try {
      const response = await fetch('/api/enterprise-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: lang === 'it' ? 'it' : 'zh', messages: next.slice(-4) }),
      });
      const data = (await response.json()) as { reply?: unknown };
      if (!response.ok || typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('bad reply');
      }
      setMessages([...next, { role: 'assistant', content: data.reply.trim() }]);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <section className="section bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="container-modern text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{copy.title}</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">{copy.intro}</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-modern max-w-3xl">
          <p className="mb-6 text-text-secondary">{copy.note}</p>
          <div className="card-modern">
            <div role="log" aria-live="polite" className="space-y-4 mb-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.role === 'user'
                      ? 'ml-auto max-w-[85%] bg-primary-navy text-white rounded-2xl px-4 py-3 whitespace-pre-wrap'
                      : 'mr-auto max-w-[85%] bg-background-light border rounded-2xl px-4 py-3 whitespace-pre-wrap'
                  }
                >
                  {message.content}
                </div>
              ))}
              {loading ? (
                <div className="mr-auto max-w-[85%] bg-background-light border rounded-2xl px-4 py-3 text-text-secondary">
                  {copy.sending}
                </div>
              ) : null}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <label htmlFor="enterprise-chat-input" className="sr-only">
                {copy.inputLabel}
              </label>
              <input
                id="enterprise-chat-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={copy.placeholder}
                maxLength={2000}
                autoComplete="off"
                className="flex-1 min-w-0 border rounded-lg p-3"
              />
              <button type="submit" disabled={loading || !input.trim()} className="btn-primary px-6 py-3 disabled:opacity-50">
                {copy.send}
              </button>
            </form>
            {failed ? (
              <p role="alert" className="mt-4 text-primary-coral">
                {copy.error}
              </p>
            ) : null}
          </div>
          <p className="mt-6 text-text-secondary">
            {copy.contactIntro}{' '}
            <a href={`/${lang === 'it' ? 'it' : 'zh'}/contact/`} className="underline">
              {copy.contactLink}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${company.email}`} className="underline">
              {company.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
