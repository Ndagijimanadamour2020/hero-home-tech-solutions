import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwtToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/admin/login';
  const isAdminApi = pathname.startsWith('/api/admin');

  const token = request.cookies.get('admin_token')?.value;
  const isAuthenticated = token ? await verifyJwtToken(token) : false;

  // Protect Admin API endpoints
  if (isAdminApi && !isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  // Redirect unauthenticated users attempting to access admin routes
  if (isAdminRoute && !isLoginRoute && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page to admin dashboard
  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};