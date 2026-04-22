import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { defaultLocale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { OrderForm } from "@/components/OrderForm";

type Args = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : defaultLocale;
  const d = getDictionary(l);
  return { title: d.pages.contact.title, description: d.pages.contact.p };
}

export default async function ContactPage({ params }: Args) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <main>
      <div className="mx-auto max-w-xl px-4 pt-12 sm:px-6 sm:pt-16">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">{d.pages.contact.title}</h1>
        <p className="mt-3 text-slate-600 sm:text-lg">{d.pages.contact.p}</p>
      </div>
      <OrderForm locale={lang} id="teklif" />
    </main>
  );
}
