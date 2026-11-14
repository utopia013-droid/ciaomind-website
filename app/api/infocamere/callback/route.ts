import { timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { callbackUrl, collaudoCredentials, flowCookie, result, tokenUrl } from '@/lib/infocamere-collaudo';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const state = params.get('state');
  const code = params.get('code');
  const flow = request.cookies.get(flowCookie)?.value.match(/^([a-f0-9]{64})\.([A-Za-z0-9_-]{43})$/);
  if (params.getAll('state').length !== 1 || !state || !/^[a-f0-9]{64}$/.test(state) || !flow ||
      !timingSafeEqual(Buffer.from(state), Buffer.from(flow[1]))) {
    return result('Richiesta di autenticazione non valida o scaduta.', 400);
  }

  if (params.has('error') || params.getAll('code').length !== 1 || !code || code.length > 2048) {
    return result('Autenticazione InfoCamere non completata.', 400);
  }
  const credentials = collaudoCredentials();
  if (!credentials) return result('Collaudo InfoCamere in attesa delle credenziali.', 503);

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        code,
        redirect_uri: callbackUrl,
        code_verifier: flow[2],
      }),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
    });
    if (!tokenResponse.ok) return result('Scambio del codice InfoCamere non riuscito.', 502);
    const token = await tokenResponse.json();
    if (typeof token?.access_token !== 'string' || !token.access_token) {
      return result('Risposta di autenticazione InfoCamere non valida.', 502);
    }

    // This endpoint validates authentication for collaudo without retaining any tokens.
    return result('Autenticazione InfoCamere completata in ambiente di collaudo.', 200);
  } catch {
    return result('Servizio di autenticazione InfoCamere temporaneamente non disponibile.', 502);
  }
}
