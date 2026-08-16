import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { cookieName, sessionValue } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const user = username && await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password || '', user.password))) return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  const response = NextResponse.json({ success: true });
  response.cookies.set(cookieName, sessionValue(user.username), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 12 });
  return response;
}
