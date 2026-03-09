import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: any) {
  const res = intlMiddleware(req);

  if (!req.cookies.get("NEXT_LOCALE")) {
    res.cookies.set("NEXT_LOCALE", "mn", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });
  }

  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|static|favicon|manifest|robots|.*\\..*).*)"
};