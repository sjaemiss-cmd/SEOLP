import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes (except login page and API routes)
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/api/')) {
        const sessionCookie = request.cookies.get('cms_session');

        if (!sessionCookie?.value) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
