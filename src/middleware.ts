import { NextResponse, type NextRequest } from 'next/server';

import { defaultLocale, isLocale, locales } from '@/i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const first = pathname.split('/')[1] ?? '';
  if (isLocale(first)) return NextResponse.next();

  const cookie = request.cookies.get('locale')?.value ?? '';
  const locale = isLocale(cookie) ? cookie : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

export { locales };
