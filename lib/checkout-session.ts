import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

type CheckoutSession = {
  service: string;
  variant: string;
  reference: string;
  mode: 'test';
  expiresAt: number;
};

export const checkoutSessionMaxAge = 30 * 60;
const signingPurpose = 'ciaomind:checkout:demo:v1\0';
let localSigningKey: Buffer | undefined;

function isPreview() {
  return process.env.VERCEL_ENV === 'preview';
}

function isLocalDemo() {
  return !process.env.VERCEL && !process.env.VERCEL_ENV && process.env.CIAOMIND_CHECKOUT_DEMO === '1';
}

export function isCheckoutDemoEnabled() {
  return isPreview() || isLocalDemo();
}

export function getCheckoutSigningKey() {
  if (!isCheckoutDemoEnabled()) return undefined;
  if (process.env.ORDER_INTAKE_SECRET) return process.env.ORDER_INTAKE_SECRET;
  if (isLocalDemo()) return localSigningKey ??= randomBytes(32);
  return undefined;
}

function sign(payload: string, key: string | Buffer) {
  return createHmac('sha256', key).update(signingPurpose).update(payload).digest();
}

export function createCheckoutSession(service: string, variant: string, key: string | Buffer) {
  const reference = `TEST-${randomBytes(16).toString('hex').toUpperCase()}`;
  const session: CheckoutSession = {
    service, variant, reference, mode: 'test', expiresAt: Date.now() + checkoutSessionMaxAge * 1000,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  return { reference, token: `${payload}.${sign(payload, key).toString('base64url')}` };
}

export function getCheckoutReference(token: string | undefined, service: string, variant: string, key: string | Buffer) {
  if (!token || token.length > 512) return undefined;
  const parts = token.split('.');
  if (parts.length !== 2) return undefined;
  const [payload, signature] = parts;
  const expectedSignature = sign(payload, key);
  const receivedSignature = Buffer.from(signature, 'base64url');
  if (receivedSignature.length !== expectedSignature.length || !timingSafeEqual(receivedSignature, expectedSignature)) {
    return undefined;
  }

  try {
    const session: Partial<CheckoutSession> = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (session.mode === 'test' && session.service === service && session.variant === variant &&
        typeof session.expiresAt === 'number' && session.expiresAt > Date.now() &&
        typeof session.reference === 'string' && /^TEST-[0-9A-F]{32}$/.test(session.reference)) {
      return session.reference;
    }
  } catch {
    return undefined;
  }
  return undefined;
}
