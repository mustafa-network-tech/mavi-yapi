import type { Locale } from "@/config/site";

const withLang = (locale: Locale, path: string) => `/${locale}${path.startsWith("/") ? path : `/${path}`}`;

export const paths = {
  home: (l: Locale) => withLang(l, "/"),
  about: (l: Locale) => withLang(l, "/about"),
  contact: (l: Locale) => withLang(l, "/contact"),
  products: (l: Locale) => withLang(l, "/products"),
  productCategory: (l: Locale, categorySlug: string) => withLang(l, `/products/${categorySlug}`),
  productDetail: (l: Locale, categorySlug: string, productSlug: string) =>
    withLang(l, `/products/${categorySlug}/${productSlug}`),
} as const;

export function getAlternatePath(pathname: string, targetLocale: Locale) {
  const p = pathname.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";
  if (p === "/") return `/${targetLocale}`;
  return `/${targetLocale}${p.startsWith("/") ? p : `/${p}`}`;
}
