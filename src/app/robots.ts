import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/profile/", "/checkout/"],
    },
    sitemap: "https://footiesbyzain.vercel.app/sitemap.xml",
  };
}