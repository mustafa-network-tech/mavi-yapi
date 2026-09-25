import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Crawlable on purpose so search engines can read the noindex; no sitemap for a demo.
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
