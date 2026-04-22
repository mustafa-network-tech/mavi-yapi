"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/config/site";
import { isNavItemActive } from "@/lib/nav-active";
import { navRouteKeys, type NavLabels } from "@/lib/nav-routes";
import { cn } from "@/lib/cn";

type Props = {
  locale: Locale;
  nav: NavLabels;
  className?: string;
};

export function MainNav({ locale, nav, className }: Props) {
  const pathname = usePathname() || `/${locale}`;
  return (
    <nav
      className={cn(
        "no-scrollbar flex min-h-0 min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 overflow-x-auto sm:gap-0 md:gap-1 lg:gap-2",
        className,
      )}
      aria-label="Primary"
    >
      {navRouteKeys.map(({ k, href }) => {
        const active = isNavItemActive(pathname, locale, k);
        const to = href(locale);
        return (
          <Link
            key={k}
            href={to}
            className={cn(
              "group relative shrink-0 px-2 py-2.5 text-[13px] font-medium tracking-tight sm:px-3.5 sm:text-sm",
              active ? "text-brand-700" : "text-slate-600 hover:text-brand-700",
            )}
          >
            {nav[k]}
            <span
              className={cn(
                "pointer-events-none absolute bottom-0 left-2.5 right-2.5 h-0.5 max-h-[2px] rounded-full sm:left-3.5 sm:right-3.5",
                "origin-center transition-transform duration-200 ease-out",
                active ? "scale-x-100 bg-brand-500" : "scale-x-0 bg-brand-500/90 group-hover:scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
