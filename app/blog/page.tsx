import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, ArrowLeft, Clock, Tag, Calendar, Layers, Globe, ShieldCheck, Server, Zap, BrainCircuit, Gauge, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

const POSTS_PER_PAGE = 4;

const CATEGORY_COLORS: Record<string, string> = {
  "Architecture":         "#F59E0B",
  "Web Development":      "#0A7CFF",
  "Security":             "#EF4444",
  "Infrastructure":       "#8B5CF6",
  "Engineering":          "#06B6D4",
  "Automation":           "#10B981",
  "AI":                   "#8B5CF6",
  "Automatización":       "#10B981",
  "Rendimiento":          "#0A7CFF",
  "IA & Automatización":  "#8B5CF6",
  "Seguridad":            "#EF4444",
  "Performance & SEO":    "#06B6D4",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Architecture":         Layers,
  "Web Development":      Code2,
  "Security":             ShieldCheck,
  "Infrastructure":       Server,
  "Engineering":          Globe,
  "Automation":           Zap,
  "AI":                   BrainCircuit,
  "Automatización":       Zap,
  "Rendimiento":          Gauge,
  "IA & Automatización":  BrainCircuit,
  "Seguridad":            ShieldCheck,
  "Performance & SEO":    Gauge,
};

function PostThumbnail({ category, featured = false }: { category: string; featured?: boolean }) {
  const color   = CATEGORY_COLORS[category] ?? "#0A7CFF";
  const Icon    = CATEGORY_ICONS[category]  ?? Layers;
  const iconSize = featured ? 40 : 26;
  const boxSize  = featured ? 88 : 58;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, #050507 0%, ${color}15 100%)` }}
    >
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${color}10 1px, transparent 1px), linear-gradient(90deg, ${color}10 1px, transparent 1px)`,
        backgroundSize: featured ? "48px 48px" : "32px 32px",
      }} />
      <div className="absolute" style={{
        width: "70%", height: "70%", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse at center, ${color}20 0%, transparent 70%)`,
        filter: "blur(24px)",
      }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center rounded-2xl" style={{
          width: boxSize, height: boxSize,
          background: `${color}12`,
          border: `1px solid ${color}35`,
          boxShadow: `0 0 24px ${color}18`,
        }}>
          <Icon size={iconSize} style={{ color }} strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: `${color}45` }} />
      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: `${color}45` }} />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: `${color}45` }} />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: `${color}45` }} />
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const allPosts   = getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, parseInt(pageParam ?? "1") || 1), totalPages);

  const start    = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = allPosts.slice(start, start + POSTS_PER_PAGE);
  const featured = pagePosts[0];
  const gridPosts = pagePosts.slice(1);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate page numbers to show (max 5 visible)
  const pageNumbers: number[] = [];
  const delta = 2;
  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <main className="pt-28 pb-20">

        {/* ── Header ── */}
        <div className="px-4 sm:px-6 lg:px-10 mb-12">
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

        <div className="px-4 sm:px-6 lg:px-10">
          {allPosts.length === 0 ? (
            <div className="text-muted-foreground text-sm font-mono text-center py-20">
              First post coming soon — check back tomorrow.
            </div>
          ) : (
            <>
              {/* ── Featured post ── */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="block group mb-6">
                  <article className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 overflow-hidden">
                    <div className="relative" style={{ minHeight: 260 }}>
                      <PostThumbnail category={featured.category} featured />
                    </div>
                    <div className="p-7 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-5">
                          <span
                            className="text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border"
                            style={{
                              background: `${CATEGORY_COLORS[featured.category] ?? "#0A7CFF"}12`,
                              color: CATEGORY_COLORS[featured.category] ?? "#0A7CFF",
                              borderColor: `${CATEGORY_COLORS[featured.category] ?? "#0A7CFF"}30`,
                            }}
                          >
                            {featured.category}
                          </span>
                          <span className="text-muted-foreground/50 text-[10px] font-mono flex items-center gap-1">
                            <Clock size={10} /> {featured.readTime}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border/30 text-muted-foreground/40">
                            {featured.lang === "es" ? "ES" : "EN"}
                          </span>
                        </div>
                        <h2 className="text-foreground text-xl sm:text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300 text-balance leading-snug">
                          {featured.title}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {featured.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-6 pt-5 border-t border-border/30">
                        <div className="flex items-center gap-1.5 text-muted-foreground/40 text-[10px] font-mono">
                          <Calendar size={10} /> {featured.date}
                        </div>
                        <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-[0.2em] group-hover:gap-3 transition-all duration-300">
                          READ <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* ── Grid (3 posts) ── */}
              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                  {gridPosts.map(post => {
                    const color = CATEGORY_COLORS[post.category] ?? "#0A7CFF";
                    return (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                        <article className="h-full rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 overflow-hidden flex flex-col">
                          <div className="relative flex-shrink-0" style={{ height: 160 }}>
                            <PostThumbnail category={post.category} />
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border"
                                style={{ background: `${color}10`, color, borderColor: `${color}25` }}
                              >
                                {post.category}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border/30 text-muted-foreground/40 ml-auto">
                                {post.lang === "es" ? "ES" : "EN"}
                              </span>
                            </div>
                            <h2 className="text-foreground font-semibold text-sm leading-snug mb-2.5 group-hover:text-primary transition-colors duration-300 flex-1 text-balance">
                              {post.title}
                            </h2>
                            <p className="text-muted-foreground/70 text-xs leading-relaxed mb-4 line-clamp-2">
                              {post.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {post.tags.slice(0, 3).map(t => (
                                <span key={t} className="text-[8px] font-mono uppercase tracking-[0.1em] px-1.5 py-0.5 rounded border border-border/40 text-muted-foreground/50 flex items-center gap-0.5">
                                  <Tag size={7} /> {t}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-border/20">
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
                    );
                  })}
                </div>
              )}

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between gap-4 pt-6 border-t border-border/20">

                  {/* Prev */}
                  <Link
                    href={hasPrev ? `/blog?page=${currentPage - 1}` : "#"}
                    aria-disabled={!hasPrev}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono uppercase tracking-[0.15em] transition-all duration-200 ${
                      hasPrev
                        ? "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                        : "border-border/20 text-muted-foreground/30 pointer-events-none"
                    }`}
                  >
                    <ChevronLeft size={14} /> Prev
                  </Link>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1.5">
                    {pageNumbers[0] > 1 && (
                      <>
                        <Link href="/blog?page=1"
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-border/40 text-[11px] font-mono text-muted-foreground/60 hover:border-primary/40 hover:text-primary transition-all duration-200">
                          1
                        </Link>
                        {pageNumbers[0] > 2 && (
                          <span className="w-9 h-9 flex items-center justify-center text-muted-foreground/30 text-xs">…</span>
                        )}
                      </>
                    )}

                    {pageNumbers.map(n => (
                      <Link
                        key={n}
                        href={`/blog?page=${n}`}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg border text-[11px] font-mono transition-all duration-200 ${
                          n === currentPage
                            ? "border-primary bg-primary text-primary-foreground font-bold"
                            : "border-border/40 text-muted-foreground/60 hover:border-primary/40 hover:text-primary"
                        }`}
                      >
                        {n}
                      </Link>
                    ))}

                    {pageNumbers[pageNumbers.length - 1] < totalPages && (
                      <>
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                          <span className="w-9 h-9 flex items-center justify-center text-muted-foreground/30 text-xs">…</span>
                        )}
                        <Link href={`/blog?page=${totalPages}`}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-border/40 text-[11px] font-mono text-muted-foreground/60 hover:border-primary/40 hover:text-primary transition-all duration-200">
                          {totalPages}
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Next */}
                  <Link
                    href={hasNext ? `/blog?page=${currentPage + 1}` : "#"}
                    aria-disabled={!hasNext}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono uppercase tracking-[0.15em] transition-all duration-200 ${
                      hasNext
                        ? "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                        : "border-border/20 text-muted-foreground/30 pointer-events-none"
                    }`}
                  >
                    Next <ChevronRight size={14} />
                  </Link>
                </div>
              )}

              {/* Post count indicator */}
              <p className="text-center text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.3em] mt-5">
                Page {currentPage} of {totalPages} · {totalPosts} articles
              </p>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
