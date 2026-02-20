import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = /* logic to check auth, e.g., check cookie */localStorage.getItem('adminToken');
  const protectedRoutes = ['/dashboard'];

  if (protectedRoutes.includes(request.nextUrl.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// Define which routes the middleware should apply to
export const config = {
  matcher: ['/dashboard/:path*', '/user-profile/:path*'],
};
