
import { MetadataRoute } from "next";
import { news } from "@/lib/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://goalsphere.vercel.app";
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 1 },
    { url: `${base}/news`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/matches`, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 0.8 },
    { url: `${base}/standings`, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 0.7 },
  ];
  const articles = news.map(n => ({ url: `${base}/news/${n.slug}`, lastModified: new Date(n.publishedAt), changeFrequency: "weekly" as const, priority: 0.6 }));
  return [...pages, ...articles];
}
