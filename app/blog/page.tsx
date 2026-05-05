import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Rivas Technologies — Web Development, AI & Business Automation",
  description:
    "Technical insights, engineering guides and business automation strategies from the Rivas Technologies team. Learn about Next.js, Laravel, AI integration, scalable architecture and more.",
  keywords: [
    "web development blog",
    "software engineering articles",
    "Next.js tutorials",
    "business automation guide",
    "AI for business",
    "scalable web architecture",
    "full stack development tips",
    "Laravel backend guide",
    "startup engineering",
  ],
  openGraph: {
    title: "Rivas Technologies Blog — Engineering Insights",
    description: "Technical articles on web development, AI, automation and scalable architecture.",
    url: "https://rivastechnologies.com/blog",
  },
  alternates: { canonical: "https://rivastechnologies.com/blog" },
};

const posts = [
  {
    slug: "why-your-website-is-losing-you-customers",
    title: "Why Your Website Is Losing You Customers (And How to Fix It)",
    description: "Speed, structure and trust signals that separate converting websites from expensive business cards. A technical breakdown for entrepreneurs.",
    category: "Performance & SEO",
    readTime: "6 min",
    date: "2026-05-01",
    tags: ["Performance", "Core Web Vitals", "SEO"],
  },
  {
    slug: "business-automation-what-to-automate-first",
    title: "Business Automation: What to Automate First (And What to Leave Alone)",
    description: "Not every workflow should be automated. Here's the framework we use with clients to identify the highest-ROI automations and avoid the ones that create new problems.",
    category: "Automation",
    readTime: "8 min",
    date: "2026-04-22",
    tags: ["Automation", "CRM", "Workflow"],
  },
  {
    slug: "nextjs-vs-traditional-wordpress-2026",
    title: "Next.js vs WordPress in 2026: When to Choose Each",
    description: "A practical guide for business owners — not a framework fanboy debate. When WordPress makes sense, when it becomes a liability, and what the migration looks like.",
    category: "Web Development",
    readTime: "7 min",
    date: "2026-04-15",
    tags: ["Next.js", "WordPress", "Migration"],
  },
  {
    slug: "horizontal-scaling-explained-for-founders",
    title: "Horizontal Scaling Explained for Non-Technical Founders",
    description: "Your app crashes every time you run a promotion. Here's what that means, why it happens, and what your engineering team should be building instead.",
    category: "Architecture",
    readTime: "5 min",
    date: "2026-04-08",
    tags: ["Scaling", "Architecture", "Cloud"],
  },
  {
    slug: "ai-integration-practical-guide-small-business",
    title: "AI Integration: A Practical Guide for Small Business Owners",
    description: "Cutting through the hype. Real AI use cases we've implemented for clients — with actual results, costs, and what we'd do differently.",
    category: "AI & Automation",
    readTime: "9 min",
    date: "2026-03-30",
    tags: ["AI", "Automation", "Business"],
  },
  {
    slug: "security-checklist-web-applications-2026",
    title: "The Web Application Security Checklist Every Founder Should Know",
    description: "From a digital forensics specialist turned full-stack engineer: the security vulnerabilities we find in almost every client system, and how to close them.",
    category: "Security",
    readTime: "10 min",
    date: "2026-03-20",
    tags: ["Security", "Authentication", "OWASP"],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Performance & SEO": "#0A7CFF",
  "Automation":        "#10B981",
  "Web Development":   "#8B5CF6",
  "Architecture":      "#F59E0B",
  "AI & Automation":   "#06B6D4",
  "Security":          "#EF4444",
};

export default function BlogPage() {
  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <main className="pt-28 pb-20">

        {/* Header */}
        <div className="px-6 lg:px-10 mb-14">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-primary/40 text-[10px] font-mono">Blog</span>
            <div className="h-px w-8 bg-border" />
            <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">Engineering Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-balance mb-4">
            <span className="text-foreground">Technical insights </span>
            <span className="text-primary">from the field</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Engineering guides, automation strategies and real-world lessons from building digital products for entrepreneurs across the US and Latin America.
          </p>
        </div>

        {/* Posts grid */}
        <div className="px-6 lg:px-10">
          {/* Featured post */}
          <Link href={`/blog/${posts[0].slug}`} className="block group mb-8">
            <article className="p-8 rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 rounded-full"
                  style={{ background:`${CATEGORY_COLORS[posts[0].category]}15`, color: CATEGORY_COLORS[posts[0].category], border:`1px solid ${CATEGORY_COLORS[posts[0].category]}30` }}>
                  {posts[0].category}
                </span>
                <span className="text-muted-foreground/60 text-[10px] font-mono flex items-center gap-1">
                  <Clock size={10} /> {posts[0].readTime} read
                </span>
                <span className="text-muted-foreground/40 text-[10px] font-mono ml-auto">{posts[0].date}</span>
              </div>
              <h2 className="text-foreground text-2xl lg:text-3xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                {posts[0].title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-3xl">{posts[0].description}</p>
              <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-[0.2em]">
                Read article <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </article>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.slice(1).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <article className="h-full p-6 rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
                      style={{ background:`${CATEGORY_COLORS[post.category]}15`, color: CATEGORY_COLORS[post.category], border:`1px solid ${CATEGORY_COLORS[post.category]}25` }}>
                      {post.category}
                    </span>
                    <span className="text-muted-foreground/50 text-[9px] font-mono flex items-center gap-1 ml-auto">
                      <Clock size={9} /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-foreground font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors duration-300 flex-1">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">{post.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map(t => (
                      <span key={t} className="text-[8px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 rounded border border-border/40 text-muted-foreground/60 flex items-center gap-1">
                        <Tag size={7} /> {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-muted-foreground/40 text-[9px] font-mono">{post.date}</div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
