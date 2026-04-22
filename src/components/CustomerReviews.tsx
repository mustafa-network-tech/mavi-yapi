import { Quote } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { reviewEntries, textFor } from "@/data/reviews";
import { SectionHeader } from "./SectionHeader";

type Props = { locale: Locale };

function StarRow() {
  return (
    <span className="inline-flex text-brand-500" title="5/5" aria-label="5 / 5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="px-px text-sm" aria-hidden>
          ★
        </span>
      ))}
    </span>
  );
}

export function CustomerReviews({ locale }: Props) {
  const d = getDictionary(locale);
  const r = d.reviews;
  return (
    <div
      id="musteri-yorumlari"
      className="mt-16 border-t border-slate-200/70 pt-14 sm:mt-20 sm:pt-16"
      aria-labelledby="reviews-heading"
    >
      <SectionHeader
        titleId="reviews-heading"
        title={r.title}
        lead={r.subtitle}
        className="max-w-3xl"
      />
      <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
        {reviewEntries.map((entry) => {
          const { body, role } = textFor(entry, locale);
          return (
            <li
              key={entry.id}
              className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-white/95 p-5 pl-4 shadow-[0_1px_6px_-2px_rgba(10,22,40,0.08)] transition hover:border-brand-200/80 hover:shadow-md sm:p-6"
            >
              <Quote
                className="absolute right-4 top-4 h-8 w-8 -scale-x-100 text-brand-200/90"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="pr-7 text-sm leading-relaxed text-slate-800 sm:pr-8 sm:text-[0.9375rem]">
                {body}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100/90 pt-3.5 text-xs sm:mt-4">
                <p className="text-slate-600">
                  <span className="font-semibold text-ink-900">{entry.author}</span>
                  <span className="text-slate-300"> — </span>
                  <span>{role}</span>
                </p>
                <div className="flex items-center gap-2.5">
                  <StarRow />
                  <time
                    className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-brand-600 sm:text-xs"
                    dateTime={String(entry.year)}
                  >
                    {entry.year}
                  </time>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
