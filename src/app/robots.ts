import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

const base = SITE_URL.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
