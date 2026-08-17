import { jwtVerify, SignJWT } from 'jose';

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