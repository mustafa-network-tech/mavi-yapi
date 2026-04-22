import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { paths } from "@/lib/paths";
import { SITE_NAME } from "@/config/site";

type Args = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const c = getCategoryBySlug(slug);
  if (!c) return {};
  const d = getDictionary(lang);
  const ctd = d.categories[c.nameKey];
  return {
    title: ctd.name,
    description: ctd.desc,
    openGraph: { title: `${ctd.name} | ${SITE_NAME}`, description: ctd.desc },
  };
}

export default async function CategoryPage({ params }: Args) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const c = getCategoryBySlug(slug);
  if (!c) notFound();
  const d = getDictionary(lang);
  const ctd = d.categories[c.nameKey];
  const list = getProductsByCategory(c.slug);
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm text-slate-500">
        <Link href={paths.products(lang)} className="text-brand-600 hover:underline">
          {d.nav.products}
        </Link>{" "}
        / {ctd.name}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900">{ctd.name}</h1>
      <p className="mt-2 max-w-2xl text-slate-600">{ctd.desc}</p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <li key={p.id}>
            <Link
              href={paths.productDetail(lang, c.slug, p.slug)}
              className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={p.image}
                  alt={p.alt[lang]}
                  fill
                  className="object-cover group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-base font-semibold text-ink-900 line-clamp-2 group-hover:text-brand-600">
                  {p.name[lang]}
                </h2>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">{p.short[lang]}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-brand-600">
                  {d.featured.viewDetail} →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
