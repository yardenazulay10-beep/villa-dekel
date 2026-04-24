import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.nofhadekel.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://www.nofhadekel.com/cancellation", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://www.nofhadekel.com/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://www.nofhadekel.com/accessibility", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
