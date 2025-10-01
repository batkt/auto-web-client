import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const nextLocale = req.cookies.get('NEXT_LOCALE')?.value;
  const url = req.nextUrl;

  if (!nextLocale) {
    let locale = 'mn';
    let newUrl = new URL(url.pathname, req.url);

    if (!url.pathname?.startsWith('/mn') && !url.pathname?.startsWith('/en')) {
      newUrl = new URL(`/mn${url.pathname}`, req.url);
    }

    if (url.pathname?.startsWith('/en')) {
      locale = 'en';
    }

    newUrl.search = url.search;
    const res = NextResponse.redirect(newUrl);
    res.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return res;
  }

  return intlMiddleware(req);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher:
    '/((?!api|trpc|_next|_vercel|static|favicon|manifest|robots|.*\\..*).*)',
};
