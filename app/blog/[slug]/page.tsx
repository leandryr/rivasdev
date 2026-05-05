import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { Comments } from "@/components/blog/comments";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const imgParams = new URLSearchParams({ title: post.title, category: post.category, readTime: post.readTime, lang: post.lang, date: post.date });
  return {
    title: `${post.title} | Rivas Technologies Blog`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://rivastechnologies.com/blog/${post.slug}`,
      images: [`/api/blog-image?${imgParams.toString()}`],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [`/api/blog-image?${imgParams.toString()}`] },
    alternates: { canonical: `https://rivastechnologies.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const imgParams = new URLSearchParams({ title: post.title, category: post.category, readTime: post.readTime, lang: post.lang, date: post.date });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `https://rivastechnologies.com/api/blog-image?${imgParams.toString()}`,
    author: { "@type": "Organization", name: "Rivas Technologies LLC", url: "https://rivastechnologies.com" },
    publisher: { "@type": "Organization", name: "Rivas Technologies LLC", logo: { "@type": "ImageObject", url: "https://rivastechnologies.com/logos/logo.png" } },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://rivastechnologies.com/blog/${post.slug}` },
    keywords: post.tags.join(", "),
    inLanguage: post.lang === "es" ? "es-US" : "en-US",
  };

  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="pt-28 pb-20">
        <div className="px-6 lg:px-10 max-w-3xl mx-auto">

          {/* Back */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-mono uppercase tracking-[0.2em] mb-10 transition-colors duration-300">
            <ArrowLeft size={12} /> {post.lang === "es" ? "Volver al Blog" : "Back to Blog"}
          </Link>

          {/* Cover image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/blog-image?${imgParams.toString()}`}
            alt={post.title}
            className="w-full rounded-2xl mb-8 border border-border/30"
            style={{ aspectRatio: "1200/630", objectFit: "cover" }}
          />

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border"
              style={{ color: "#0A7CFF", background: "rgba(10,124,255,0.1)", borderColor: "rgba(10,124,255,0.25)" }}>
              {post.category}
            </span>
            <span className="text-muted-foreground/60 text-[10px] font-mono flex items-center gap-1">
              <Clock size={10} /> {post.readTime} {post.lang === "es" ? "de lectura" : "read"}
            </span>
            <span className="text-muted-foreground/60 text-[10px] font-mono flex items-center gap-1">
              <Calendar size={10} /> {post.date}
            </span>
            <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border border-border/30 text-muted-foreground/50">
              {post.lang === "es" ? "Español" : "English"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">{post.title}</h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-8 border-b border-border/20 pb-8">{post.description}</p>

          {/* Content */}
          <article
            className="prose prose-sm lg:prose-base max-w-none mb-12
              prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-li:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12 pt-6 border-t border-border/20">
            {post.tags.map(t => (
              <span key={t} className="text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded border border-border/40 text-muted-foreground/60 flex items-center gap-1">
                <Tag size={8} /> {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 mb-12 text-center">
            <h3 className="text-foreground font-bold text-lg mb-2">
              {post.lang === "es" ? "¿Listo para implementar esto en tu negocio?" : "Ready to implement this in your business?"}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {post.lang === "es"
                ? "Evaluación de ingeniería gratuita en 24 horas. Sin compromiso."
                : "Free engineering assessment within 24 hours. No obligations."}
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300">
              {post.lang === "es" ? "Contáctanos" : "Get in Touch"} →
            </Link>
          </div>

          {/* Comments */}
          <Comments />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
