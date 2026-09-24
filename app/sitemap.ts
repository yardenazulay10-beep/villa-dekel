import type { MetadataRoute } from "next";

// The legal pages are robots: { index: false }, so they do not belong here.
// Listing a noindex URL in a sitemap shows up in Search Console as an error.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.nofhadekel.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];
}
