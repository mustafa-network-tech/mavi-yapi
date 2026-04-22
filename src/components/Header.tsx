import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/config/site";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { StickyHeader } from "./StickyHeader";

type Props = { locale: Locale };

export function Header({ locale }: Props) {
  const d = getDictionary(locale);
  return (
    <StickyHeader>
      <div className="mx-auto flex min-w-0 max-w-6xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <Link
          href={paths.home(locale)}
          className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
        >
            <span
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5 transition group-hover:ring-brand-400/25 sm:h-10 sm:w-10"
            aria-hidden
          >
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=128&q=80"
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </span>
          <span
            className="font-heading text-base font-extrabold italic leading-tight tracking-tight text-ink-900 transition sm:text-lg sm:tracking-[-0.02em] group-hover:text-brand-600"
          >
            {SITE_NAME}
          </span>
        </Link>
        <div className="hidden min-w-0 flex-1 md:flex md:justify-center">
          <MainNav locale={locale} nav={d.nav} />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:ml-0">
          <LanguageSwitcher locale={locale} />
          <MobileNav locale={locale} nav={d.nav} />
        </div>
      </div>
    </StickyHeader>
  );
}
