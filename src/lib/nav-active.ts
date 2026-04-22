import type { Locale } from "@/config/site";

/**
 * Mevcut pathname için üst menü "aktif" eşleşmesi
 */
export function isNavItemActive(
  pathname: string,
  locale: Locale,
  key: "home" | "products" | "about" | "contact",
) {
  const p = pathname.replace(/\/$/, "") || "/";
  const l = `/${locale}`;
  if (key === "home") {
    return p === l;
  }
  if (key === "products") {
    return p.startsWith(`${l}/products`);
  }
  if (key === "about") {
    return p === `${l}/about`;
  }
  if (key === "contact") {
    return p === `${l}/contact`;
  }
  return false;
}
