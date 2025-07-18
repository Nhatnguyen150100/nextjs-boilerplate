import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PRIVATE_ROUTES } from './constants';
import isChildUrl from './utils/functions/check-active-router';
import { matchRoute } from './utils/helpers';

const authSecret = process.env.NEXTAUTH_SECRET;

/**
 * Protects routes from unauthorized access and handles public access.
 * @param {NextRequest} req - Request object
 * @returns {Promise<NextResponse>} Response object
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: authSecret });

  const isAuthenticated = Boolean(token);

  const isPrivate = PRIVATE_ROUTES.some((route) => {
    if (route.endsWith('/**')) {
      const baseRoute = route.replace('/**', '');
      return isChildUrl(baseRoute, pathname);
    }
    return matchRoute(pathname, route);
  });

  const isAuthRoute = isChildUrl('/auth', pathname);

  if (!isAuthenticated && isPrivate) {
    const signinUrl = new URL('/auth/sign-in', req.url);
    signinUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(signinUrl);
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  experimental: {
    serverActions: true,
  },
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
