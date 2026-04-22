import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { paths } from "@/lib/paths";

/* Endüstriyel tedarit — beyaz + turuncu vurgu */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1553413077-190dd305871c?w=2000&q=85&auto=format&fit=crop";

type Props = { locale: Locale };

export function Hero({ locale }: Props) {
  const d = getDictionary(locale);
  const h = d.hero;
  const ext = h as typeof h & { titleLine1?: string; titleLine2?: string };
  const line1 = ext.titleLine1?.trim() || h.title;
  const line2 = ext.titleLine2?.trim() || null;
  const badges = [h.badge1, h.badge2, h.badge3];
  return (
    <section
      className="relative min-h-[min(92vh,960px)] overflow-hidden bg-slate-900"
      aria-labelledby="hero-heading"
    >
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-950/55"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_20%_0%,rgba(249,115,22,0.28),transparent_55%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-orange-500/10"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[min(92vh,960px)] max-w-6xl flex-col justify-center gap-8 px-4 py-20 sm:gap-10 sm:px-6 sm:py-24 md:py-28">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-200/95 sm:mb-4 sm:text-xs">
            <span className="mr-2 h-px w-6 bg-brand-400/80" aria-hidden />
            {h.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="font-heading text-balance text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl sm:leading-[1.06] md:text-6xl"
          >
            <span className="block text-white/95">{line1}</span>
            {line2 && (
              <span className="mt-1.5 block text-white sm:mt-2.5">
                {line2}
              </span>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base font-normal leading-relaxed text-slate-200/95 sm:mt-6 sm:text-lg sm:leading-relaxed">
            {h.sub}
          </p>
        </div>
        <div className="flex max-w-2xl flex-col gap-3.5 sm:flex-row sm:items-stretch sm:gap-4">
          <a
            href="#teklif"
            className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-lg bg-brand-500 px-7 text-sm font-semibold text-white shadow-[0_10px_40px_-6px_rgba(249,115,22,0.55)] transition [transition:transform_0.2s,box-shadow_0.2s,background_0.2s] hover:-translate-y-0.5 hover:bg-brand-600 sm:min-w-[9.5rem] sm:max-w-xs sm:text-base"
          >
            {h.ctaQuote}
          </a>
          <Link
            href={`${paths.home(locale)}#urunler`}
            className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-lg border-2 border-white/90 bg-white px-7 text-sm font-semibold text-brand-700 shadow-md transition [transition:transform_0.2s,border-color_0.2s,background_0.2s,box-shadow_0.2s] hover:-translate-y-0.5 hover:border-brand-100 hover:bg-brand-50 sm:min-w-[9.5rem] sm:max-w-xs sm:text-base"
          >
            {h.ctaProducts}
          </Link>
        </div>
        <ul
          className="flex max-w-2xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-2"
          aria-label={locale === "tr" ? "Güven satırları" : "Trust points"}
        >
          {badges.map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm font-medium text-white shadow-sm shadow-black/20 backdrop-blur-sm sm:px-4"
            >
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-300 sm:h-4 sm:w-4" strokeWidth={2.25} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
