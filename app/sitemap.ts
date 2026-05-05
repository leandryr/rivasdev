import { MetadataRoute } from "next";

const BASE = "https://rivastechnologies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`,                lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/blog/why-your-website-is-losing-you-customers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/business-automation-what-to-automate-first`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/nextjs-vs-traditional-wordpress-2026`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog/horizontal-scaling-explained-for-founders`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog/ai-integration-practical-guide-small-business`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/security-checklist-web-applications-2026`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
