import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, locales } from "@/config/site";

const LOCALE = /^\/(tr|en)(\/|$)/;

function firstSegment(pathname: string) {
  const s = pathname.split("/").filter(Boolean)[0];
  return s;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.match(/\.(ico|png|jpg|jpeg|svg|webp)$/i)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const seg = firstSegment(pathname);
  if (seg && !(locales as readonly string[]).includes(seg)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname === "/" ? "" : pathname}`, request.url));
  }

  const m = pathname.match(LOCALE);
  const lang = m?.[1] ?? defaultLocale;
  const res = NextResponse.next();
  res.headers.set("x-locale", lang);
  return res;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
