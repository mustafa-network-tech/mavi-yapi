import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, getDictionary } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { defaultLocale, locales, SITE_NAME } from "@/config/site";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { DemoBar } from "@/components/DemoBar";

type Args = { children: ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = isLocale(lang) ? lang : defaultLocale;
  const d = getDictionary(l);
  const tr = l === "tr";
  const kind = tr ? "Kurumsal Tedarik Web Sitesi Demosu" : "B2B Supply Website Demo";
  // Demo site: kept out of search results so it is never mistaken for a real company (X-Robots-Tag in next.config.ts too).
  return {
    title: {
      default: `${SITE_NAME} — ${kind} | MK Digital Systems`,
      template: `%s | ${SITE_NAME} (Demo)`,
    },
    description: tr
      ? "MK Digital Systems'in kurumsal tedarik firmaları için hazırladığı örnek web sitesi: ürün katalogu, kategori sayfaları ve teklif formu. Mavi Yapı gerçek bir işletme değildir."
      : "A sample website by MK Digital Systems for B2B supply companies: product catalogue, category pages and a quote form. Mavi Yapı is not a real company.",
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: {
      type: "website",
      locale: l === "tr" ? "tr_TR" : "en_US",
      siteName: SITE_NAME,
      title: `${SITE_NAME} · ${kind}`,
      description: tr
        ? "Kurumsal tedarik firmaları için hazırlanmış örnek web sitesi. MK Digital Systems portföy projesi."
        : "Sample website for B2B supply companies. MK Digital Systems portfolio project.",
    },
  };
}

export default async function LangLayout({ children, params }: Args) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const floatLabel = l === "tr" ? "WhatsApp ile MK Digital Systems'e yazın" : "Message MK Digital Systems on WhatsApp";
  return (
    <>
      <DemoBar locale={l} />
      <div className="h-8 shrink-0" aria-hidden />
      <Header locale={l} />
      <div className="min-h-0 flex-1">{children}</div>
      <SiteFooter locale={l} />
      <WhatsAppFloat aria-label={floatLabel} />
    </>
  );
}
