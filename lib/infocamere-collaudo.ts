import { NextResponse } from 'next/server';

export const callbackUrl = 'https://www.ciaomind.com/api/infocamere/callback/';
export const authorizationUrl = 'https://iamocl.infocamere.it/syncope-wa/oidc/oidcAuthorize';
export const tokenUrl = 'https://iamocl.infocamere.it/syncope-wa/oidc/oidcAccessToken';
export const flowCookie = '__Host-ciaomind-infocamere-collaudo';
export const cookieOptions = { httpOnly: true, secure: true, sameSite: 'lax', path: '/' } as const;
export const responseHeaders = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow',
};

export function collaudoCredentials() {
  const clientId = process.env.INFOCAMERE_COLLAUDO_CLIENT_ID;
  const clientSecret = process.env.INFOCAMERE_COLLAUDO_CLIENT_SECRET;
  const scope = process.env.INFOCAMERE_COLLAUDO_SCOPE;
  return clientId && clientSecret && scope ? { clientId, clientSecret, scope } : null;
}

export function result(message: string, status: number) {
  const response = new NextResponse(message, { status, headers: {
    ...responseHeaders,
    'Content-Type': 'text/plain; charset=utf-8',
  } });
  response.cookies.set(flowCookie, '', { ...cookieOptions, maxAge: 0 });
  return response;
}
