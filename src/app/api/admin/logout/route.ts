import { NextResponse } from 'next/server';
import { cookieName } from '@/lib/admin-auth';
export async function POST() { const response = NextResponse.json({ success: true }); response.cookies.set(cookieName, '', { path: '/', maxAge: 0 }); return response; }
