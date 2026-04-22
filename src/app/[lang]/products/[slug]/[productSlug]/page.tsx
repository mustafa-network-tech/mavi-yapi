import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { getCategoryBySlug } from "@/data/categories";
import { getProductBySlugInCategory } from "@/data/products";
import { paths } from "@/lib/paths";
import { SITE_NAME } from "@/config/site";

type Args = { params: Promise<{ lang: string; slug: string; productSlug: string }> };

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug, productSlug } = await params;
  if (!isLocale(lang)) return {};
  const p = getProductBySlugInCategory(slug, productSlug);
  if (!p) return {};
  return {
    title: p.name[lang as Locale],
    description: p.short[lang as Locale],
    openGraph: {
      title: `${p.name[lang as Locale]} | ${SITE_NAME}`,
      description: p.short[lang as Locale],
    },
  };
}

export default async function ProductDetailPage({ params }: Args) {
  const { lang, slug, productSlug } = await params;
  if (!isLocale(lang)) notFound();
  const c = getCategoryBySlug(slug);
  if (!c) notFound();
  const p = getProductBySlugInCategory(slug, productSlug);
  if (!p) notFound();
  const d = getDictionary(lang);
  return (
    <main className="mx-auto max-w-5xl gap-8 px-4 py-12 sm:grid sm:grid-cols-2 sm:px-6 sm:py-16">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 sm:aspect-auto sm:min-h-[min(60vh,420px)]">
        <Image
          src={p.image}
          alt={p.alt[lang]}
          fill
          className="object-cover"
          priority
          sizes="(min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div>
        <p className="text-sm text-slate-500">
          <Link
            href={paths.productCategory(lang, slug)}
            className="text-brand-600 hover:underline"
          >
            {d.pages.productDetail.back}
          </Link>
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900">{p.name[lang]}</h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">{p.short[lang]}</p>
        <p className="mt-6 text-sm text-slate-500">
          {lang === "tr" ? "Ödeme entegrasyonu yoktur. Teklif ve sipariş için WhatsApp veya form kullanın." : "No online checkout. Use WhatsApp or the quote form for orders."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={paths.home(lang) + "#teklif"}
            className="inline-flex rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            {d.hero.ctaQuote}
          </a>
        </div>
      </div>
    </main>
  );
}
