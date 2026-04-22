import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, getLocale, isLocale } from "@/lib/i18n";
import { SITE_NAME } from "@/config/site";
import { paths } from "@/lib/paths";
import Link from "next/link";

type Args = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang } = await params;
  const l = getLocale(lang);
  const d = getDictionary(l);
  return {
    title: d.pages.about.title,
    description: d.pages.about.p1.slice(0, 160),
  };
}

export default async function AboutPage({ params }: Args) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  const t = d.pages.about;
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">{t.title}</h1>
      <p className="mt-6 text-slate-700 leading-relaxed">{t.p1}</p>
      <p className="mt-4 text-slate-700 leading-relaxed">{t.p2}</p>
      <p className="mt-4 text-slate-700 leading-relaxed">{t.p3}</p>
      <p className="mt-10">
        <Link
          href={paths.contact(lang)}
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          {lang === "tr" ? "İletişim sayfasına git" : "Go to contact"}
        </Link>
      </p>
    </main>
  );
}
