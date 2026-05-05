import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, Clock, Tag, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Rivas Technologies — Web Development, AI & Business Automation",
  description: "Technical insights, engineering guides and business automation strategies from the Rivas Technologies team. Learn about Next.js, Laravel, AI integration, scalable architecture and more.",
  keywords: ["web development blog","software engineering articles","Next.js tutorials","business automation guide","AI for business","scalable web architecture","full stack development tips"],
  openGraph: {
    title: "Rivas Technologies Blog — Engineering Insights",
    description: "Technical articles on web development, AI, automation and scalable architecture.",
    url: "https://rivastechnologies.com/blog",
  },
  alternates: { canonical: "https://rivastechnologies.com/blog" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Architecture":         "#F59E0B",
  "Web Development":      "#0A7CFF",
  "Security":             "#EF4444",
  "Infrastructure":       "#8B5CF6",
  "Engineering":          "#06B6D4",
  "Automatización":       "#10B981",
  "Rendimiento":          "#0A7CFF",
  "IA & Automatización":  "#8B5CF6",
  "Seguridad":            "#EF4444",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest     = posts.slice(1);

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

        <div className="px-6 lg:px-10">
          {posts.length === 0 ? (
            <div className="text-muted-foreground text-sm font-mono text-center py-20">
              First post coming soon — check back tomorrow.
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="block group mb-8">
                  <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 overflow-hidden">
                    {/* Cover image */}
                    <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/api/blog-image?title=${encodeURIComponent(featured.title)}&category=${encodeURIComponent(featured.category)}&readTime=${featured.readTime}&lang=${featured.lang}&date=${featured.date}`}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                        style={{ minHeight: 280 }}
                      />
                    </div>
                    {/* Content */}
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 rounded-full"
                            style={{ background:`${CATEGORY_COLORS[featured.category] ?? "#0A7CFF"}15`, color: CATEGORY_COLORS[featured.category] ?? "#0A7CFF", border:`1px solid ${CATEGORY_COLORS[featured.category] ?? "#0A7CFF"}30` }}>
                            {featured.category}
                          </span>
                          <span className="text-muted-foreground/60 text-[10px] font-mono flex items-center gap-1">
                            <Clock size={10} /> {featured.readTime}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border/30 text-muted-foreground/40">
                            {featured.lang === "es" ? "ES" : "EN"}
                          </span>
                        </div>
                        <h2 className="text-foreground text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                          {featured.title}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">{featured.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-1.5 text-muted-foreground/40 text-[10px] font-mono">
                          <Calendar size={10} /> {featured.date}
                        </div>
                        <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-[0.2em]">
                          Read <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                      <article className="h-full rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 overflow-hidden flex flex-col">
                        {/* Mini cover */}
                        <div className="overflow-hidden" style={{ height: 180 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/api/blog-image?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&readTime=${post.readTime}&lang=${post.lang}&date=${post.date}`}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
                              style={{ background:`${CATEGORY_COLORS[post.category] ?? "#0A7CFF"}15`, color: CATEGORY_COLORS[post.category] ?? "#0A7CFF", border:`1px solid ${CATEGORY_COLORS[post.category] ?? "#0A7CFF"}25` }}>
                              {post.category}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border/30 text-muted-foreground/40 ml-auto">
                              {post.lang === "es" ? "ES" : "EN"}
                            </span>
                          </div>
                          <h2 className="text-foreground font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-300 flex-1">
                            {post.title}
                          </h2>
                          <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{post.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.slice(0, 3).map(t => (
                              <span key={t} className="text-[8px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 rounded border border-border/40 text-muted-foreground/50 flex items-center gap-0.5">
                                <Tag size={7} /> {t}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground/40 text-[9px] font-mono flex items-center gap-1">
                              <Calendar size={8} /> {post.date}
                            </span>
                            <span className="text-muted-foreground/40 text-[9px] font-mono flex items-center gap-1">
                              <Clock size={8} /> {post.readTime}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
