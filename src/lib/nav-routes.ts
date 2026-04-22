import type { Locale } from "@/config/site";
import { paths } from "@/lib/paths";

export const navRouteKeys = [
  { k: "home" as const, href: (l: Locale) => paths.home(l) },
  { k: "products" as const, href: (l: Locale) => paths.products(l) },
  { k: "about" as const, href: (l: Locale) => paths.about(l) },
  { k: "contact" as const, href: (l: Locale) => paths.contact(l) },
] as const;

export type NavKey = (typeof navRouteKeys)[number]["k"];

export type NavLabels = {
  home: string;
  products: string;
  about: string;
  contact: string;
};
