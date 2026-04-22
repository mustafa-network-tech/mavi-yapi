import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { SectionHeader } from "./SectionHeader";

type Props = { locale: Locale; id?: string };

export function ProductCategories({ locale, id = "kategoriler" }: Props) {
  const d = getDictionary(locale);
  return (
    <section
      id={id}
      className="bg-surface py-20 sm:py-24 md:py-28"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          titleId="categories-heading"
          title={d.categories.title}
          lead={d.categories.subtitle}
        />
        <ul className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {categories.map((c) => {
            const ctd = d.categories[c.nameKey];
            return (
              <li key={c.slug}>
                <Link
                  href={paths.productCategory(locale, c.slug)}
                  className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_8px_-2px_rgba(10,22,40,0.06)] transition [transition:transform_0.25s,box-shadow_0.25s] hover:-translate-y-1 hover:border-brand-200/80 hover:shadow-md hover:shadow-orange-500/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-orange-950/25 to-transparent" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-heading text-lg font-bold tracking-tight text-ink-900 group-hover:text-brand-800">
                      {ctd.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{ctd.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-2.5 group-hover:text-brand-500">
                      {locale === "tr" ? "Ürünlere git" : "View products"}{" "}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
