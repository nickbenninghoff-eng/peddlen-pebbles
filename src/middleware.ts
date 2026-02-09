import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Allow login page
  if (pathname === '/admin/login') return NextResponse.next();

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const user = req.auth?.user as { role?: string } | undefined;
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
