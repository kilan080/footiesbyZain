import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://footiesbyzain.vercel.app", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://footiesbyzain.vercel.app/testimonials", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://footiesbyzain.vercel.app/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}