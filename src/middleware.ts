import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/checkout"];
const adminRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/user-login?redirect=" + pathname, request.url));
    }
  }

  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    const adminToken = request.cookies.get("adminToken")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/checkout/:path*", "/dashboard/:path*"],
};