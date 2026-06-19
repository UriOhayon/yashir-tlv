import type { MetadataRoute } from "next";
import { restaurants } from "@/data/restaurants";
import { BASE_URL, activeCuisines } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/open-now`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
  ];

  const cuisinePages: MetadataRoute.Sitemap = activeCuisines(restaurants).map((c) => ({
    url: `${BASE_URL}/cuisine/${c}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const restaurantPages: MetadataRoute.Sitemap = restaurants.map((r) => ({
    url: `${BASE_URL}/restaurant/${r.id}`,
    lastModified: new Date(r.lastVerified),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...cuisinePages, ...restaurantPages];
}
