"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { getAlternatePath } from "@/lib/paths";
import type { Locale } from "@/config/site";
import { locales } from "@/config/site";
import { cn } from "@/lib/cn";

const shortLabel: Record<Locale, string> = { tr: "TR", en: "EN" };
const a11yName: Record<Locale, string> = { tr: "Türkçe", en: "English" };

type Props = { locale: Locale; className?: string };

export function LanguageSwitcher({ locale, className }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const currentSeg = pathname.split("/").filter(Boolean)[0] ?? "tr";
  const isLocActive = (loc: string) => currentSeg === loc;
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return (
    <div className={cn("relative", className)} ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-lg border text-slate-600 shadow-sm transition [transition:background_0.2s,border-color_0.2s,color_0.2s,box-shadow_0.2s]",
          "border-slate-200/90 bg-white hover:border-brand-300/90 hover:bg-brand-50 hover:text-brand-800",
          open && "border-brand-300 bg-brand-50 text-brand-900 shadow-[0_2px_8px_-2px_rgba(234,88,12,0.2)]",
        )}
        aria-label={locale === "tr" ? "Dil seçin" : "Select language"}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.2} aria-hidden />
      </button>
      {open && (
        <ul
          className="absolute right-0 top-full z-[200] mt-1.5 min-w-[3.5rem] overflow-hidden rounded-lg border border-slate-200/80 bg-white py-0.5 text-sm font-bold shadow-lg shadow-slate-900/10"
          role="listbox"
          aria-label="Dil / Language"
        >
          {locales.map((loc) => {
            const href = getAlternatePath(pathname, loc);
            return (
              <li key={loc} role="option" aria-selected={isLocActive(loc)}>
                <Link
                  href={href}
                  onClick={close}
                  className={cn(
                    "flex min-w-11 items-center justify-center px-2 py-2.5 text-center tabular-nums transition-colors",
                    isLocActive(loc) ? "bg-brand-50 text-brand-900" : "text-slate-700 hover:bg-brand-50/60",
                  )}
                  hrefLang={loc}
                  lang={loc}
                  aria-label={a11yName[loc]}
                >
                  {shortLabel[loc]}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
