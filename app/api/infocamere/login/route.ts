import { createHash, randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  authorizationUrl, callbackUrl, collaudoCredentials, cookieOptions, flowCookie,
  responseHeaders, result,
} from '@/lib/infocamere-collaudo';

export const dynamic = 'force-dynamic';

export function GET() {
  const credentials = collaudoCredentials();
  if (!credentials) return result('Collaudo InfoCamere in attesa delle credenziali.', 503);

  const state = randomBytes(32).toString('hex');
  const verifier = randomBytes(32).toString('base64url');
  const url = new URL(authorizationUrl);
  url.search = new URLSearchParams({
    response_type: 'code',
    client_id: credentials.clientId,
    redirect_uri: callbackUrl,
    scope: credentials.scope,
    code_challenge: createHash('sha256').update(verifier).digest('base64url'),
    code_challenge_method: 'S256',
    state,
  }).toString();
  const response = NextResponse.redirect(url, { headers: responseHeaders });
  response.cookies.set(flowCookie, `${state}.${verifier}`, { ...cookieOptions, maxAge: 600 });
  return response;
}
