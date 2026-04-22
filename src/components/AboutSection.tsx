import { BadgeCheck, Shield, Truck } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";

const icons = [Shield, Truck, BadgeCheck] as const;

type Props = { locale: Locale };

export function AboutSection({ locale }: Props) {
  const d = getDictionary(locale);
  const h = d.about.highlights;
  const items = [h.trust, h.fast, h.quality];
  return (
    <section
      className="border-y border-brand-100/70 bg-surface py-20 sm:py-24 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          titleId="about-heading"
          title={d.about.title}
          lead={d.about.intro}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-3 sm:gap-6 md:mt-14">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li
                key={item.title}
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_2px_8px_-2px_rgba(10,22,40,0.06)] transition [transition:transform_0.25s,box-shadow_0.25s,border-color_0.25s] hover:-translate-y-1 hover:border-brand-200/90 hover:shadow-[0_12px_40px_-8px_rgba(249,115,22,0.15)] sm:p-7"
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100/90 text-brand-700 ring-1 ring-inset ring-brand-200/80 transition group-hover:bg-brand-100 group-hover:ring-brand-300/60"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-ink-900 sm:text-[1.125rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem] sm:leading-relaxed">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
