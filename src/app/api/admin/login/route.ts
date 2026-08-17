export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { cookieName, signJwtToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    let isValid = false;

    // 1. Plain-text check
    if (user.password === password) {
      isValid = true;
    }

    // 2. Bcrypt check against passwordHash
    if (!isValid && user.passwordHash) {
      try {
        isValid = await bcrypt.compare(password, user.passwordHash);
      } catch {
        isValid = false;
      }
    }

    // 3. Bcrypt check against password field
    if (!isValid && user.password) {
      try {
        isValid = await bcrypt.compare(password, user.password);
      } catch {
        isValid = false;
      }
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    // Sign JWT token
    const token = await signJwtToken({ username: user.username });

    const response = NextResponse.json({ success: true, username: user.username });
    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}