import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { SectionHeader } from "./SectionHeader";

type Props = { locale: Locale; id?: string };

export function FeaturedProducts({ locale, id = "urunler" }: Props) {
  const d = getDictionary(locale);
  return (
    <section
      id={id}
      className="border-t border-brand-100/80 bg-surface-muted py-20 sm:py-24 md:py-28"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          titleId="featured-heading"
          title={d.featured.title}
        />
        <ul className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id}>
              <article
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_8px_-2px_rgba(10,22,40,0.06)] transition [transition:box-shadow_0.25s,border-color_0.25s] hover:border-brand-200/90 hover:shadow-md hover:shadow-orange-500/8"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={p.image}
                    alt={p.alt[locale]}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="line-clamp-2 font-heading text-base font-bold text-ink-900">
                    {p.name[locale]}
                  </h3>
                  <p className="mt-1.5 flex-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {p.short[locale]}
                  </p>
                  <Link
                    href={paths.productDetail(locale, p.category, p.slug)}
                    className="mt-4 inline-flex w-fit min-h-[2.4rem] items-center justify-center rounded-lg border border-brand-300/80 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-100"
                  >
                    {d.featured.viewDetail}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
