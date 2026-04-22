import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, getDictionary } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { defaultLocale, locales, SITE_NAME, SITE_URL } from "@/config/site";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

type Args = { children: ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = isLocale(lang) ? lang : defaultLocale;
  const d = getDictionary(l);
  const tr = l === "tr";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${tr ? "B2B tedarik" : "B2B supply"}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: d.hero.sub.slice(0, 160),
    openGraph: {
      type: "website",
      locale: l === "tr" ? "tr_TR" : "en_US",
      url: `${SITE_URL}/${l}`,
      siteName: SITE_NAME,
      title: `${SITE_NAME} — ${d.hero.title}`,
      description: d.hero.sub.slice(0, 200),
    },
    alternates: {
      languages: { tr: `${SITE_URL}/tr`, en: `${SITE_URL}/en` },
    },
  };
}

export default async function LangLayout({ children, params }: Args) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  const floatLabel = l === "tr" ? "WhatsApp üzerinden yaz" : "Chat on WhatsApp";
  return (
    <>
      <Header locale={l} />
      <div className="min-h-0 flex-1">{children}</div>
      <SiteFooter locale={l} />
      <WhatsAppFloat aria-label={floatLabel} />
    </>
  );
}
