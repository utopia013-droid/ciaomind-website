import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
import { NextResponse } from 'next/server';
import { businessServices } from '@/data/business-catalog';
import { structureReview } from '@/data/global-catalog';
import { getServicePrice, priceVersion } from '@/data/service-prices';
import { locales, type Locale } from '@/lib/i18n';

export const runtime = 'nodejs';

const maxBytes = 8192;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function reply(status: number, body: object) {
  const headers: HeadersInit = { 'Cache-Control': 'no-store' };
  if (status === 429) headers['Retry-After'] = '3600';
  return NextResponse.json(body, { status, headers });
}

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  if (Number(request.headers.get('content-length')) > maxBytes || !request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

function field(input: unknown, limit: number) {
  if (typeof input !== 'string' || input.includes('\u0000')) return '';
  const value = input.trim();
  return value.length <= limit ? value : '';
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')?.split(';')[0]?.trim();
  const origin = request.headers.get('origin');
  if (contentType !== 'application/json' || request.headers.get('sec-fetch-site') === 'cross-site' ||
      (origin && origin !== new URL(request.url).origin)) {
    return reply(400, { error: 'invalid_request' });
  }

  const data = await readBody(request);
  if (!data || data.website !== '') return reply(400, { error: 'invalid_request' });
  const service = field(data.service, 48);
  const selectedService = service === structureReview.id ? structureReview : businessServices.find(item => item.id === service);
  const variant = field(data.variant, 48);
  const company = field(data.company, 120);
  const name = field(data.name, 100);
  const email = field(data.email, 254).toLowerCase();
  const brief = field(data.brief, 1200);
  const locale = field(data.locale, 2);
  const requestId = field(data.requestId, 36);
  const source = field(data.source, 80);
  if (!selectedService || (service === structureReview.id && !variant) || (data.variant && !selectedService.variants.some(item => item.id === variant)) ||
      !company || !name || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email) || !brief ||
      !locales.includes(locale as Locale) || !uuid.test(requestId) ||
      (data.source && !/^[A-Za-z0-9_.-]{1,80}$/.test(source))) {
    return reply(400, { error: 'invalid_request' });
  }

  const displayedPrice = getServicePrice(service, variant);
  if (data.priceVersion !== (displayedPrice ? priceVersion : undefined)) {
    return reply(409, { error: 'price_changed' });
  }
  const nameConfirmation = field(data.companyConfirmation, 120);
  const normalizeCompany = (value: string) => value.normalize('NFC').replace(/\s+/g, ' ');
  if (displayedPrice && normalizeCompany(company) !== normalizeCompany(nameConfirmation)) {
    return reply(400, { error: 'company_confirmation_required' });
  }
  const quote = displayedPrice ? {
    version: priceVersion,
    currency: 'EUR',
    amountCents: displayedPrice.amountCents,
    period: displayedPrice.period,
    tax: 'excluded',
  } : undefined;

  const { ORDER_INTAKE_URL: url, ORDER_INTAKE_KEY: key, ORDER_INTAKE_SECRET: secret } = process.env;
  if (!url || !key || !secret) return reply(503, { error: 'order_unavailable' });

  const forwarded = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const ip = isIP(forwarded) ? forwarded : 'unknown';
  const ipHash = createHmac('sha256', secret).update(ip).digest('hex');
  try {
    const response = await fetch(new URL('/rest/v1/rpc/ciaomind_submit_service_order', url), {
      method: 'POST',
      headers: { apikey: key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        ip_hash: ipHash,
        order_data: { requestId, service, variant, company, name, email, brief, locale, source, quote },
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) {
      const result: { status?: string; orderNumber?: string } = await response.json();
      if (result.status === 'rate_limited') return reply(429, { error: 'rate_limited' });
      if (result.status === 'conflict') return reply(409, { error: 'order_conflict' });
      if ((result.status === 'created' || result.status === 'existing') &&
          typeof result.orderNumber === 'string' && /^CMO-[0-9A-F]{32}$/.test(result.orderNumber)) {
        return reply(result.status === 'created' ? 201 : 200, { orderNumber: result.orderNumber });
      }
    }
  } catch {
    // Return an explicit retryable error without logging personal data.
  }

  console.warn('Service intake unavailable');
  return reply(503, { error: 'order_unavailable' });
}
