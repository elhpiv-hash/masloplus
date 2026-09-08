import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Статический вывод — совместимо со статическим экспортом (GitHub Pages).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/styleguide"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
