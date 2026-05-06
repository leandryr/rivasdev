import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { Comments } from "@/components/blog/comments";
import { getPostBySlug, getAllPosts, type BlogPost } from "@/lib/blog";
import { ArrowLeft, ArrowRight, Clock, Tag, Calendar, Layers, Globe, ShieldCheck, Server, Zap, BrainCircuit, Gauge, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── SEO keyword builder ───────────────────────────────────────────────────────

const STOP_WORDS = new Set(["what","that","with","from","this","your","when","which","their","have","will","been","more","than","does","should","about","would","could","there","after","before","between","through","during","against","without","within"]);

function buildKeywords(post: BlogPost): string[] {
  const titleKw = post.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP_WORDS.has(w));

  const categoryKw: Record<string, string[]> = {
    "Web Development":   ["web development services", "Next.js development", "React developer", "full stack engineer"],
    "Architecture":      ["software architecture", "scalable systems", "backend architecture"],
    "Security":          ["web security", "application security", "cybersecurity"],
    "Infrastructure":    ["cloud infrastructure", "DevOps", "server deployment"],
    "Automation":        ["business automation", "workflow automation", "process automation"],
    "AI":                ["AI integration", "artificial intelligence business", "AI for startups"],
    "Performance & SEO": ["website performance", "SEO optimization", "Core Web Vitals"],
    "Engineering":       ["software engineering", "engineering services"],
  };

  return [
    ...post.tags,
    ...(categoryKw[post.category] ?? []),
    ...titleKw,
    "Rivas Technologies",
    "software engineering Gainesville GA",
    "web development company",
  ].filter((v, i, a) => v && a.indexOf(v) === i);
}

// ─── Related posts ─────────────────────────────────────────────────────────────

function getRelatedPosts(current: BlogPost, all: BlogPost[], count = 3): BlogPost[] {
  const sameCategory = all.filter(p => p.slug !== current.slug && p.category === current.category);
  const others       = all.filter(p => p.slug !== current.slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}

// ─── Category icons/colors ────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "Architecture":       "#F59E0B",
  "Web Development":    "#0A7CFF",
  "Security":           "#EF4444",
  "Infrastructure":     "#8B5CF6",
  "Engineering":        "#06B6D4",
  "Automation":         "#10B981",
  "AI":                 "#8B5CF6",
  "Performance & SEO":  "#06B6D4",
  "Automatización":     "#10B981",
  "Seguridad":          "#EF4444",
  "IA & Automatización":"#8B5CF6",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Architecture":       Layers,
  "Web Development":    Code2,
  "Security":           ShieldCheck,
  "Infrastructure":     Server,
  "Engineering":        Globe,
  "Automation":         Zap,
  "AI":                 BrainCircuit,
  "Performance & SEO":  Gauge,
  "Automatización":     Zap,
  "Seguridad":          ShieldCheck,
  "IA & Automatización":BrainCircuit,
};

function PostThumb({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] ?? "#0A7CFF";
  const Icon  = CATEGORY_ICONS[category]  ?? Layers;
  return (
    <div className="relative w-full h-full overflow-hidden flex-shrink-0"
      style={{ background: `linear-gradient(135deg,#050507 0%,${color}15 100%)` }}>
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(${color}10 1px,transparent 1px),linear-gradient(90deg,${color}10 1px,transparent 1px)`,
        backgroundSize:"28px 28px"
      }}/>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-xl flex items-center justify-center"
          style={{ width:48,height:48,background:`${color}12`,border:`1px solid ${color}30` }}>
          <Icon size={20} style={{ color }} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const imgParams = new URLSearchParams({ title: post.title, category: post.category, readTime: post.readTime, lang: post.lang, date: post.date });
  const keywords  = buildKeywords(post);
  const ogImage   = `https://rivastechnologies.com/api/blog-image?${imgParams.toString()}`;

  return {
    title:       `${post.title} | Rivas Technologies`,
    description: post.description,
    keywords,
    authors:     [{ name: "Leandry Rivas", url: "https://rivastechnologies.com/about" }],
    openGraph: {
      title:         post.title,
      description:   post.description,
      type:          "article",
      publishedTime: post.date,
      authors:       ["Leandry Rivas"],
      section:       post.category,
      tags:          post.tags,
      url:           `https://rivastechnologies.com/blog/${post.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.title,
      description: post.description,
      images:      [ogImage],
      creator:     "@rivastechnologies",
    },
    alternates: { canonical: `https://rivastechnologies.com/blog/${post.slug}` },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts    = getAllPosts();
  const related     = getRelatedPosts(post, allPosts);
  const keywords    = buildKeywords(post);
  const imgParams   = new URLSearchParams({ title: post.title, category: post.category, readTime: post.readTime, lang: post.lang, date: post.date });
  const ogImage     = `https://rivastechnologies.com/api/blog-image?${imgParams.toString()}`;

  // Estimate word count from content HTML
  const wordCount = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://rivastechnologies.com/blog/${post.slug}`,
    headline:     post.title,
    description:  post.description,
    image:        ogImage,
    datePublished:post.date,
    dateModified: post.date,
    wordCount,
    inLanguage:   post.lang === "es" ? "es-US" : "en-US",
    keywords:     keywords.join(", "),
    articleSection: post.category,
    author: {
      "@type":       "Person",
      name:          "Leandry Rivas",
      jobTitle:      "Full Stack Developer & Founder",
      url:           "https://rivastechnologies.com/about",
      worksFor: {
        "@type": "Organization",
        name:    "Rivas Technologies LLC",
        url:     "https://rivastechnologies.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name:    "Rivas Technologies LLC",
      url:     "https://rivastechnologies.com",
      logo:    { "@type": "ImageObject", url: "https://rivastechnologies.com/logos/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://rivastechnologies.com/blog/${post.slug}` },
    isPartOf: { "@type": "Blog", name: "Rivas Technologies Blog", url: "https://rivastechnologies.com/blog" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",  item: "https://rivastechnologies.com" },
      { "@type": "ListItem", position: 2, name: "Blog",  item: "https://rivastechnologies.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://rivastechnologies.com/blog/${post.slug}` },
    ],
  };

  const categoryColor = CATEGORY_COLORS[post.category] ?? "#0A7CFF";

  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ── */}
      <div className="relative blueprint-grid border-b border-border/30 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] -z-10 pointer-events-none opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse at center, #0A7CFF 0%, transparent 70%)", filter: "blur(60px)" }}
          aria-hidden="true" />

        <div className="px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto pt-32 pb-12 sm:pt-36 sm:pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground/60 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-muted-foreground/40 truncate max-w-[160px] sm:max-w-xs">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border"
              style={{ color: categoryColor, background: `${categoryColor}12`, borderColor: `${categoryColor}30` }}>
              {post.category}
            </span>
            <span className="text-muted-foreground/50 text-[10px] font-mono flex items-center gap-1">
              <Clock size={10} /> {post.readTime} {post.lang === "es" ? "de lectura" : "read"}
            </span>
            <span className="text-muted-foreground/50 text-[10px] font-mono flex items-center gap-1">
              <Calendar size={10} /> {post.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground leading-tight mb-5 text-balance">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground/80 text-base sm:text-lg leading-relaxed max-w-2xl">
            {post.description}
          </p>

          {/* Back */}
          <div className="mt-8 pt-8 border-t border-border/30">
            <Link href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300">
              <ArrowLeft size={12} />
              {post.lang === "es" ? "Volver al Blog" : "Back to Blog"}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <main>
        <div className="px-4 sm:px-6 lg:px-10 max-w-3xl mx-auto pt-12 pb-16">

          {/* Content */}
          <article
            className="prose prose-sm lg:prose-base max-w-none mb-12
              prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-li:leading-relaxed prose-li:mb-1
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10 pt-6 border-t border-border/20">
            {post.tags.map(t => (
              <span key={t} className="text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded border border-border/40 text-muted-foreground/60 flex items-center gap-1">
                <Tag size={8} /> {t}
              </span>
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 py-5 border-y border-border/20 mb-10">
            <img src="/team/Leandry.webp" alt="Leandry Rivas"
              className="w-11 h-11 rounded-full object-cover border border-border/40 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-foreground font-semibold text-sm">Leandry Rivas</p>
              <p className="text-muted-foreground/60 text-xs font-mono">Full Stack Developer Web · Rivas Technologies</p>
            </div>
            <Link href="/about"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-primary transition-colors hidden sm:block">
              About →
            </Link>
          </div>

          {/* Comments */}
          <Comments />
        </div>

        {/* ── Related Posts ── */}
        {related.length > 0 && (
          <div className="border-t border-border/20 bg-card/10">
            <div className="px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto py-14">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-primary/40 text-[10px] font-mono">Related</span>
                <div className="h-px w-8 bg-border" />
                <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">
                  More Articles
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map(r => {
                  const rColor = CATEGORY_COLORS[r.category] ?? "#0A7CFF";
                  return (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                      <article className="h-full rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 overflow-hidden flex flex-col">
                        {/* Thumb */}
                        <div className="relative flex-shrink-0" style={{ height: 130 }}>
                          <PostThumb category={r.category} />
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border self-start mb-3"
                            style={{ background:`${rColor}10`, color: rColor, borderColor:`${rColor}25` }}>
                            {r.category}
                          </span>
                          <h3 className="text-foreground font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-300 flex-1 text-balance">
                            {r.title}
                          </h3>
                          <div className="flex items-center justify-between pt-3 border-t border-border/20 mt-auto">
                            <span className="text-muted-foreground/40 text-[9px] font-mono flex items-center gap-1">
                              <Clock size={8} /> {r.readTime}
                            </span>
                            <span className="text-primary text-[9px] font-mono flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                              Read <ArrowRight size={9} />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>

              {/* CTA to blog */}
              <div className="text-center mt-10">
                <Link href="/blog"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/50 text-muted-foreground text-xs font-mono uppercase tracking-[0.2em] hover:border-primary/40 hover:text-primary transition-all duration-300">
                  View all articles <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
