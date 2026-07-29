import type { MetadataRoute } from "next";
import { BUSINESS_CONFIG } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS_CONFIG.siteUrl;
  const locales = ["he", "en"];

  const pages = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/booking`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  return pages;
}
