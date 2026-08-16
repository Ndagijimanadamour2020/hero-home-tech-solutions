import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const cookieName = 'hero_admin_session';
const secret = process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || 'change-this-admin-secret';

export function sessionValue(username: string) {
  return `${username}.${createHmac('sha256', secret).update(username).digest('hex')}`;
}

export function validSession(value?: string) {
  if (!value) return false;
  const [username, signature] = value.split('.');
  if (!username || !signature) return false;
  const expected = sessionValue(username).split('.')[1];
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function isAdmin() {
  return validSession(cookies().get(cookieName)?.value);
}

export { cookieName };
