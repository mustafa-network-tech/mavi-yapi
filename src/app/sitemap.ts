import type { MetadataRoute } from "next";
import { locales, SITE_URL } from "@/config/site";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const base = SITE_URL.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const l of locales) {
    out.push(
      { url: `${base}/${l}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
      { url: `${base}/${l}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
      { url: `${base}/${l}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
      { url: `${base}/${l}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    );
    for (const c of categories) {
      out.push({
        url: `${base}/${l}/products/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
      for (const p of products) {
        if (p.category === c.slug) {
          out.push({
            url: `${base}/${l}/products/${c.slug}/${p.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    }
  }
  return out;
}
