import { MessageCircleHeart, MessageSquare, RefreshCw } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";
import { CustomerReviews } from "./CustomerReviews";

const iconOrder = [MessageCircleHeart, MessageSquare, RefreshCw] as const;
const itemKeys = ["feedback", "clear", "improve"] as const;

type Props = { locale: Locale; id?: string };

export function CustomerSatisfaction({ locale, id = "musteri-memnuniyeti" }: Props) {
  const d = getDictionary(locale);
  const s = d.satisfaction;
  return (
    <section
      id={id}
      className="border-t border-brand-100/80 bg-gradient-to-b from-white via-brand-50/40 to-white py-20 sm:py-24 md:py-28"
      aria-labelledby="satisfaction-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          titleId="satisfaction-heading"
          title={s.title}
          lead={s.text}
        />
        <ul className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {itemKeys.map((key, i) => {
            const item = s.items[key];
            const Icon = iconOrder[i];
            return (
              <li
                key={key}
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_2px_8px_-2px_rgba(10,22,40,0.06)] transition [transition:transform_0.25s,box-shadow_0.25s] hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-500/10 sm:p-7"
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100/90 text-brand-700 ring-1 ring-inset ring-brand-200/70"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold tracking-tight text-ink-900 sm:text-[1.05rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </li>
            );
          })}
        </ul>
        <CustomerReviews locale={locale} />
      </div>
    </section>
  );
}
