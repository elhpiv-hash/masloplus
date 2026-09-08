import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/uslugi", changeFrequency: "monthly", priority: 0.9 },
  { path: "/nabory", changeFrequency: "monthly", priority: 0.9 },
  { path: "/galereya", changeFrequency: "weekly", priority: 0.7 },
  { path: "/kontakty", changeFrequency: "monthly", priority: 0.8 },
  { path: "/policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/soglashenie", changeFrequency: "yearly", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
