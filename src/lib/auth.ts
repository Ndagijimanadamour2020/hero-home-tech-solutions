import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function verifyJwtToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function signJwtToken(payload: Record<string, unknown>) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
}

export async function isAdmin() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  
  const payload = await verifyJwtToken(token);
  return !!payload;
}