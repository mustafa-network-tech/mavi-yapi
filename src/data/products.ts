import type { Locale } from "@/config/site";
import { PLACEHOLDER_PRODUCT_IMAGE } from "@/config/site";

export type ProductRecord = {
  id: string;
  slug: string;
  category: "gloves";
  name: Record<Locale, string>;
  short: Record<Locale, string>;
  image: string;
  alt: Record<Locale, string>;
};

export const products: ProductRecord[] = [
  {
    id: "1",
    slug: "nitril-endustriyel",
    category: "gloves",
    name: { tr: "Nitril Endüstriyel Eldiven", en: "Industrial Nitrile Gloves" },
    short: {
      tr: "Dayanıklı, kimyasal direnç; üretim ve atölye kullanımı.",
      en: "Durable with chemical resistance for workshop use.",
    },
    image: PLACEHOLDER_PRODUCT_IMAGE,
    alt: { tr: "Mavi nitril eldiven", en: "Blue nitrile gloves" },
  },
  {
    id: "2",
    slug: "lateks-cok-amaçlı",
    category: "gloves",
    name: { tr: "Lateks Çok Amaçlı Eldiven", en: "Multi-purpose Latex Gloves" },
    short: {
      tr: "Elastik tutuş; hafif montaj ve genel işler.",
      en: "Elastic grip; light assembly and general tasks.",
    },
    image: PLACEHOLDER_PRODUCT_IMAGE,
    alt: { tr: "Beyaz lateks eldiven", en: "White latex gloves" },
  },
  {
    id: "3",
    slug: "kesilme-direncli",
    category: "gloves",
    name: { tr: "Kesilmeye Dirençli Eldiven (Seviye 5)", en: "Cut-Resistant Gloves (Level 5)" },
    short: {
      tr: "Metal, cam ve keskin yüzeylerle çalışmada ek koruma.",
      en: "Extra protection for metal, glass, and sharp surfaces.",
    },
    image: PLACEHOLDER_PRODUCT_IMAGE,
    alt: { tr: "Siyah kesilmeye dayanıklı eldiven", en: "Black cut-resistant work gloves" },
  },
  {
    id: "4",
    slug: "is-eldiveni-deri",
    category: "gloves",
    name: { tr: "Deri İş Eldiveni", en: "Leather Work Gloves" },
    short: {
      tr: "Ağır işler ve dış mekân; uzun ömürlü kullanım.",
      en: "Heavy duty and outdoor; long-lasting use.",
    },
    image: PLACEHOLDER_PRODUCT_IMAGE,
    alt: { tr: "Kahverengi deri iş eldivenleri", en: "Brown leather work gloves" },
  },
];

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function getProductBySlugInCategory(categorySlug: string, productSlug: string) {
  return products.find((p) => p.category === categorySlug && p.slug === productSlug);
}

export function getProductSelectOptions(locale: Locale) {
  return products.map((p) => ({
    value: p.id,
    label: p.name[locale],
  }));
}
