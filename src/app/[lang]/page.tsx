import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProductCategories } from "@/components/ProductCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CustomerSatisfaction } from "@/components/CustomerSatisfaction";
import { OrderForm } from "@/components/OrderForm";
import { isLocale } from "@/lib/i18n";
import { defaultLocale, SITE_NAME } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Args = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : defaultLocale;
  // The layout's title template does not reach this same-segment page, so the demo title is set here;
  // description and Open Graph come from the layout.
  const kind = l === "tr" ? "Kurumsal Tedarik Web Sitesi Demosu" : "B2B Supply Website Demo";
  return {
    title: { absolute: `${SITE_NAME} — ${kind} | MK Digital Systems` },
  };
}

export default async function HomePage({ params }: Args) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <main>
      <Hero locale={lang} />
      <AboutSection locale={lang} />
      <ProductCategories locale={lang} id="kategoriler" />
      <FeaturedProducts locale={lang} id="urunler" />
      <CustomerSatisfaction locale={lang} />
      <div className="bg-white">
        <OrderForm locale={lang} id="teklif" />
      </div>
    </main>
  );
}
