import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://rivastechnologies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,               lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE}/about`,    lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/contact`,  lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/blog`,     lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    {
      url: `${BASE}/blog/why-your-website-is-losing-you-customers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const blogPosts = getAllPosts().map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...blogPosts];
}
