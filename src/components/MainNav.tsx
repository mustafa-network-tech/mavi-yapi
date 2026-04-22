"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/config/site";
import { paths } from "@/lib/paths";
import { isNavItemActive } from "@/lib/nav-active";
import { cn } from "@/lib/cn";

const keys = [
  { k: "home" as const, href: (l: Locale) => paths.home(l) },
  { k: "products" as const, href: (l: Locale) => paths.products(l) },
  { k: "about" as const, href: (l: Locale) => paths.about(l) },
  { k: "contact" as const, href: (l: Locale) => paths.contact(l) },
];

type Nav = {
  home: string;
  products: string;
  about: string;
  contact: string;
};

type Props = {
  locale: Locale;
  nav: Nav;
};

export function MainNav({ locale, nav }: Props) {
  const pathname = usePathname() || `/${locale}`;
  return (
    <nav
      className="no-scrollbar flex min-h-0 min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 overflow-x-auto sm:gap-0 md:gap-1 lg:gap-2"
      aria-label="Primary"
    >
      {keys.map(({ k, href }) => {
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
