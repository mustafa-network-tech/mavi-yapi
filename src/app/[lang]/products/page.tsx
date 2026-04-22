import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { isLocale } from "@/lib/i18n";
import { defaultLocale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { categories } from "@/data/categories";
import { paths } from "@/lib/paths";

type Args = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : defaultLocale;
  const d = getDictionary(l);
  return { title: d.pages.products.title, description: d.categories.subtitle };
}

export default async function ProductsIndexPage({ params }: Args) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">{d.pages.products.title}</h1>
      <p className="mt-2 text-slate-600 sm:text-lg">{d.categories.subtitle}</p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const ctd = d.categories[c.nameKey];
          return (
            <li key={c.slug}>
              <Link
                href={paths.productCategory(lang, c.slug)}
                className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={ctd.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-ink-900 group-hover:text-brand-600">
                    {ctd.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{ctd.desc}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
