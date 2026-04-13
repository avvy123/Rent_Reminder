import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const protectedRoutes = ["/dashboard", "/pending", "/rents", "/tenants"];
    const token = request.cookies.get("token")?.value;

    const { pathname } = request.nextUrl;

    // Protect onboarding
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }

    return NextResponse.next();
}