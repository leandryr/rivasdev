import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Your Website Is Losing You Customers | Rivas Technologies",
  description:
    "Every second your website takes to load costs you 7% in conversions. Learn the speed, structure and trust signals that separate converting websites from expensive business cards.",
  keywords: [
    "website losing customers",
    "website conversion optimization",
    "web performance 2026",
    "core web vitals guide",
    "website speed optimization",
    "improve website conversions",
    "slow website fix",
    "web development performance",
  ],
  openGraph: {
    title: "Why Your Website Is Losing You Customers (And How to Fix It)",
    description: "Speed, structure and trust signals that separate converting websites from expensive business cards.",
    url: "https://rivastechnologies.com/blog/why-your-website-is-losing-you-customers",
    type: "article",
  },
  alternates: { canonical: "https://rivastechnologies.com/blog/why-your-website-is-losing-you-customers" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Your Website Is Losing You Customers (And How to Fix It)",
  description: "Speed, structure and trust signals that separate converting websites from expensive business cards.",
  author: { "@type": "Organization", name: "Rivas Technologies LLC", url: "https://rivastechnologies.com" },
  publisher: { "@type": "Organization", name: "Rivas Technologies LLC", logo: { "@type": "ImageObject", url: "https://rivastechnologies.com/logos/logo.png" } },
  datePublished: "2026-05-01",
  dateModified: "2026-05-01",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://rivastechnologies.com/blog/why-your-website-is-losing-you-customers" },
};

export default function BlogPost() {
  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="pt-28 pb-20">
        <div className="px-6 lg:px-10 max-w-3xl mx-auto">

          {/* Back */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-mono uppercase tracking-[0.2em] mb-10 transition-colors duration-300">
            <ArrowLeft size={12} /> Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 rounded-full"
                style={{ background:"rgba(10,124,255,0.12)", color:"#0A7CFF", border:"1px solid rgba(10,124,255,0.25)" }}>
                Performance & SEO
              </span>
              <span className="text-muted-foreground/60 text-[10px] font-mono flex items-center gap-1">
                <Clock size={10} /> 6 min read
              </span>
              <span className="text-muted-foreground/40 text-[10px] font-mono ml-auto">May 1, 2026</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
              Why Your Website Is Losing You Customers (And How to Fix It)
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Speed, structure and trust signals that separate converting websites from expensive business cards. A technical breakdown for entrepreneurs.
            </p>
          </div>

          {/* Content */}
          <article className="prose prose-invert max-w-none space-y-8">

            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-foreground font-semibold text-sm mb-1">The key stat you need to know:</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every <strong className="text-foreground">1 second of additional load time</strong> reduces conversions by <strong className="text-primary">7%</strong>. If your site takes 4 seconds to load and your competitor's takes 1 second — they're converting 21% more of your shared audience. Every day.
              </p>
            </div>

            <section>
              <h2 className="text-foreground text-xl font-bold mb-3">The Three Things Killing Your Conversions</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                After auditing dozens of business websites, we see the same three problems repeatedly. They're not glamorous, but fixing them consistently doubles conversion rates.
              </p>

              <h3 className="text-foreground text-base font-semibold mb-2">1. Load Speed (The #1 Killer)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Google's Core Web Vitals report shows that 53% of mobile users abandon sites that take more than 3 seconds to load. Most small business websites load in 6-8 seconds. The usual culprits: unoptimized images, no CDN, bloated WordPress plugins, shared hosting.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                <strong className="text-foreground">The fix:</strong> Move to a modern stack (Next.js on Vercel or Cloudflare), optimize images with WebP format, implement caching headers, and use a CDN. We routinely take clients from 6s to under 1s load time.
              </p>

              <h3 className="text-foreground text-base font-semibold mb-2">2. Missing Trust Signals</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                A visitor who doesn't trust you won't buy from you. Trust signals include: SSL certificate (https), real contact information (not a form), a physical address, verified reviews, professional design consistency, and clear "who we are" information.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                <strong className="text-foreground">The fix:</strong> Audit your site for each of these. Most are free to add. Reviews integration from Google or Trustpilot adds the social proof that converts fence-sitters.
              </p>

              <h3 className="text-foreground text-base font-semibold mb-2">3. No Clear Action Path</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Visitors need to know what to do next — and they need that direction within 5 seconds of landing. Confusing navigation, competing CTAs, or a homepage that tries to say everything will cost you conversions every day.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">The fix:</strong> One primary CTA per page. For a service business: "Book a Call" or "Get a Quote" above the fold, on every page. Make it impossible to miss.
              </p>
            </section>

            <section>
              <h2 className="text-foreground text-xl font-bold mb-3">How to Measure Your Current Performance</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Before fixing anything, measure. Use these free tools:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-none">
                {[
                  { tool: "Google PageSpeed Insights", url: "pagespeed.web.dev", desc: "Core Web Vitals score and specific recommendations" },
                  { tool: "GTmetrix", url: "gtmetrix.com", desc: "Waterfall analysis showing exactly what's slow" },
                  { tool: "Google Search Console", url: "search.google.com/search-console", desc: "Real user data on your site's performance" },
                ].map(item => (
                  <li key={item.tool} className="flex items-start gap-3 p-3 rounded-lg border border-border/30 bg-card/20">
                    <span className="text-primary mt-0.5">▸</span>
                    <div>
                      <span className="text-foreground font-medium">{item.tool}</span>
                      <span className="text-muted-foreground/60"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-foreground text-xl font-bold mb-3">The ROI of Fixing Your Website</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Here's a real scenario: A service business gets 1,000 visitors/month with a 2% conversion rate and $500 average client value. That's $10,000/month in revenue from the website.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                After a performance and conversion optimization project (typically $3,000–$8,000 investment), conversion rates move to 4-5%. Same traffic. Now it's generating $20,000–$25,000/month. The investment pays for itself in weeks.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This is why we say: a slow, poorly converting website isn't just a problem — it's an active drain on your business, every single day it stays the way it is.
              </p>
            </section>

            {/* CTA */}
            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center">
              <h3 className="text-foreground font-bold text-lg mb-2">Want a Free Performance Audit?</h3>
              <p className="text-muted-foreground text-sm mb-4">We'll analyze your site and give you a specific action plan — no obligations.</p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300">
                Get Your Free Audit <ExternalLink size={14} />
              </Link>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
