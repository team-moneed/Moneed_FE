import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

const protectedRoutes = [
    '/mypage',
    '/editpost',
    '/mycomment',
    '/mypost',
    '/myprofile',
    '/searchstocktype',
    '/selectstocktype',
    '/writepost',
];

const guestOnlyRoutes = ['/onboarding', '/oauth2/callback/kakao'];

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isGuestOnlyRoute = guestOnlyRoutes.includes(path);
    const session = await getSession();

    if (isGuestOnlyRoute && session?.userId) {
        return NextResponse.redirect(new URL('/?reason=logged_in', req.nextUrl));
    }

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/onboarding?reason=no_session', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
