import type { Locale } from "@/config/site";
import { defaultLocale, locales } from "@/config/site";
import type { Dictionary } from "@/types/dictionary";
import en from "@/locales/en.json";
import tr from "@/locales/tr.json";

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function isLocale(s: string): s is Locale {
  return (locales as readonly string[]).includes(s);
}

export function getLocale(maybe: string | undefined): Locale {
  if (maybe && isLocale(maybe)) return maybe;
  return defaultLocale;
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? tr;
}
