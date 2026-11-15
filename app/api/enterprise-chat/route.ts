import { NextResponse } from 'next/server';
import { company } from '@/data/company';
import { enterpriseKnowledge } from '@/data/enterprise-knowledge';

// v0 enterprise-service chat endpoint. Server-side only: the OpenAI API key
// is read from process.env.OPENAI_API_KEY and never leaves the server.
// No live OpenAI call is made unless this route is deployed with the key set.

const MODEL = 'gpt-5-mini';
const MAX_COMPLETION_TOKENS = 800;
const MAX_TURNS = 4;
const MAX_MESSAGE_CHARS = 2000;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function formatKnowledge(): string {
  return enterpriseKnowledge
    .map((entry) => `[${entry.source}]\n${entry.zh}${entry.it ? `\n(IT) ${entry.it}` : ''}`)
    .join('\n\n');
}

function buildSystemPrompt(lang: string): string {
  const pageLang = lang === 'it' ? 'Italian' : lang === 'en' ? 'English' : 'Chinese';
  return [
    'You are the CIAOMIND enterprise-service assistant. You answer questions about',
    'the CIAOMIND pre-review service materials for companies entering the European market.',
    '',
    'STRICT RULES:',
    '1. Answer ONLY from the KNOWLEDGE section below. Never use general knowledge,',
    '   never invent facts, dates, regulation numbers, or company details.',
    '2. Cite the source label of every fact you use, in brackets, e.g. [checklist: A].',
    '3. Keep answers short: a few sentences or a short list. No marketing language.',
    `4. Reply in ${pageLang}, unless the user clearly writes in another language (Chinese, Italian, or English).`,
    '5. If the question cannot be answered from the KNOWLEDGE section, say plainly',
    '   that the published service materials do not cover it, and suggest contacting',
    '   CIAOMIND. Do not guess and do not offer a partial invented answer.',
    '6. NEVER quote any price, fee, or cost figure for any service. If asked about',
    '   prices, fees, quotes, or costs, reply only that pricing is decided case by',
    '   case, and point to the contact page and email below. Do not mention any figure.',
    '7. Never name any individual person. Never ask for or repeat personal data.',
    '8. This is pre-review information only, not legal advice. If a question needs a',
    '   legal conclusion, say the formal conclusion must come from a licensed lawyer',
    '   or compliance body.',
    '',
    `Contact page: /${lang === 'en' ? 'zh' : lang}/contact/`,
    `Contact email: ${company.email}`,
    '',
    'KNOWLEDGE:',
    formatKnowledge(),
  ].join('\n');
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== 'object' || body === null) return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const parsed: ChatMessage[] = [];
  for (const item of messages) {
    if (typeof item !== 'object' || item === null) return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string') return null;
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_CHARS) return null;
    parsed.push({ role, content: trimmed });
  }
  if (!parsed.some((m) => m.role === 'user')) return null;
  return parsed.slice(-MAX_TURNS);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }
  const rawLang = (body as { lang?: unknown }).lang;
  const lang = rawLang === 'it' || rawLang === 'en' ? rawLang : 'zh';

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 503 });
  }

  let upstream: Response;
  try {
    upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_completion_tokens: MAX_COMPLETION_TOKENS,
        messages: [{ role: 'system', content: buildSystemPrompt(lang) }, ...messages],
      }),
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }
  const choices = (data as { choices?: unknown }).choices;
  const reply =
    Array.isArray(choices) && choices.length > 0
      ? ((choices[0] as { message?: { content?: unknown } }).message?.content ?? '')
      : '';
  if (typeof reply !== 'string' || !reply.trim()) {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }
  return NextResponse.json({ reply: reply.trim() });
}
