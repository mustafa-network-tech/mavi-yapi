"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/config/site";
import { isNavItemActive } from "@/lib/nav-active";
import { navRouteKeys, type NavLabels } from "@/lib/nav-routes";
import { cn } from "@/lib/cn";

const MD_MIN = 768;

type Props = { locale: Locale; nav: NavLabels };

function closeOnDesktop(setOpen: (o: boolean) => void) {
  if (typeof window !== "undefined" && window.innerWidth >= MD_MIN) setOpen(false);
}

export function MobileNav({ locale, nav }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || `/${locale}`;
  const id = useId();
  const panelId = `mobile-menu-${id}`;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    const onResize = () => closeOnDesktop(setOpen);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const overlay =
    open && mounted
      ? createPortal(
          <>
            <div
              className="fixed bottom-0 left-0 right-0 top-16 z-[100] bg-slate-900/40 md:hidden"
              onClick={close}
              aria-hidden
            />
            <div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label={locale === "tr" ? "Ana menü" : "Main menu"}
              className="fixed bottom-0 right-0 top-16 z-[110] w-1/2 min-w-0 overflow-y-auto border-l border-brand-100/80 bg-white py-1 shadow-[-6px_0_24px_-4px_rgba(0,0,0,0.12)] md:hidden"
            >
              <nav aria-label="Primary">
                <ul className="min-w-0 py-1">
                  {navRouteKeys.map(({ k, href }) => {
                    const active = isNavItemActive(pathname, locale, k);
                    const to = href(locale);
                    return (
                      <li key={k}>
                        <Link
                          href={to}
                          onClick={close}
                          className={cn(
                            "block min-h-12 border-b border-slate-100 px-4 py-3.5 text-base font-medium last:border-b-0",
                            active
                              ? "bg-brand-50/90 text-brand-800"
                              : "text-slate-800 active:bg-slate-50",
                          )}
                        >
                          {nav[k]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={locale === "tr" ? "Menüyü aç veya kapat" : "Open or close menu"}
      >
        {open ? <X className="h-5 w-5" strokeWidth={2.25} aria-hidden /> : <Menu className="h-5 w-5" strokeWidth={2.25} aria-hidden />}
      </button>
      {overlay}
    </div>
  );
}
