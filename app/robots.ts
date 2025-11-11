import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://goalsphere.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
