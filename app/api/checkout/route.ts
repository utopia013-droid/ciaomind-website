import { NextResponse, type NextRequest } from 'next/server';
import { getServicePrice } from '@/data/service-prices';
import {
  checkoutSessionMaxAge,
  createCheckoutSession,
  getCheckoutReference,
  getCheckoutSigningKey,
  isCheckoutDemoEnabled,
} from '@/lib/checkout-session';

export const runtime = 'nodejs';

const maxBytes = 8192;

function reply(status: number, body: { reference: string } | { error: string }) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function readBody(request: NextRequest): Promise<Record<string, unknown> | null> {
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
    const data: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    return data && typeof data === 'object' && !Array.isArray(data) ? data as Record<string, unknown> : null;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

function normalizeCompany(input: unknown) {
  if (typeof input !== 'string' || input.length > 120 || input.includes('\0')) return '';
  return input.normalize('NFC').trim().replace(/\s+/g, ' ');
}

export async function POST(request: NextRequest) {
  if (!isCheckoutDemoEnabled()) return reply(404, { error: 'checkout_unavailable' });

  const contentType = request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase();
  const origin = request.headers.get('origin');
  const fetchSite = request.headers.get('sec-fetch-site');
  if (contentType !== 'application/json' || origin !== request.nextUrl.origin ||
      (fetchSite && fetchSite !== 'same-origin')) {
    return reply(400, { error: 'invalid_request' });
  }

  const data = await readBody(request);
  if (!data) return reply(400, { error: 'invalid_request' });
  const { action, service, variant } = data;
  if ((action !== 'pay' && action !== 'status' && action !== 'confirm-name') ||
      typeof service !== 'string' || typeof variant !== 'string' || !getServicePrice(service, variant)) {
    return reply(400, { error: 'invalid_request' });
  }

  const key = getCheckoutSigningKey();
  if (!key) return reply(503, { error: 'checkout_unavailable' });
  const cookieName = `ciaomind-checkout-test-${service}-${variant}`;
  const reference = getCheckoutReference(request.cookies.get(cookieName)?.value, service, variant, key);

  if (action === 'pay') {
    if (reference) return reply(200, { reference });
    const session = createCheckoutSession(service, variant, key);
    const response = reply(200, { reference: session.reference });
    response.cookies.set(cookieName, session.token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: request.nextUrl.protocol === 'https:' || process.env.VERCEL_ENV === 'preview',
      path: '/api/checkout',
      maxAge: checkoutSessionMaxAge,
    });
    return response;
  }

  if (!reference) return reply(401, { error: 'checkout_required' });
  if (action === 'confirm-name') {
    const company = normalizeCompany(data.company);
    if (!company || company !== normalizeCompany(data.companyConfirmation)) {
      return reply(400, { error: 'company_confirmation_required' });
    }
  }

  return reply(200, { reference });
}
