import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ArrowRight, Layers, Smartphone, ShoppingCart, Server, Shield, Gauge, Figma, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Services | Rivas Technologies LLC",
  description:
    "Full-stack web development, mobile apps, e-commerce, API architecture, security hardening, and performance optimization. Enterprise-grade engineering for growing businesses.",
  keywords: [
    "web development services",
    "mobile app development",
    "e-commerce development",
    "API development",
    "software engineering services",
    "React Next.js development",
    "Laravel development",
    "security auditing services",
    "performance optimization",
    "UI UX design services",
    "Gainesville GA software company",
    "enterprise software engineering",
  ],
  openGraph: {
    title: "Engineering Services | Rivas Technologies LLC",
    description: "Full-stack web, mobile, APIs, security, and performance — built to enterprise standard.",
    url: "https://rivastechnologies.com/services",
    type: "website",
  },
  alternates: { canonical: "https://rivastechnologies.com/services" },
};

const services = [
  {
    icon: Layers,
    num: "01",
    title: "Web Development",
    accent: "#0A7CFF",
    description:
      "End-to-end web applications built with React, Next.js, TypeScript, and Laravel. From marketing sites to full-scale SaaS platforms — architected for performance, SEO, and scale from day one.",
    deliverables: [
      "Server-side rendered Next.js applications",
      "REST and GraphQL API backends",
      "Authentication, roles, and permissions",
      "CI/CD pipelines and automated deployments",
      "Lighthouse 90+ Core Web Vitals",
    ],
    tags: ["React", "Next.js", "TypeScript", "Laravel", "Node.js"],
  },
  {
    icon: Smartphone,
    num: "02",
    title: "Mobile App Development",
    accent: "#10B981",
    description:
      "Cross-platform iOS and Android applications with React Native. Shared codebase, native performance, App Store and Google Play deployment — delivered in production-ready state.",
    deliverables: [
      "React Native cross-platform apps",
      "Push notifications and offline support",
      "App Store and Google Play submission",
      "Deep links and universal links",
      "Integration with existing APIs",
    ],
    tags: ["React Native", "iOS", "Android", "Expo"],
  },
  {
    icon: ShoppingCart,
    num: "03",
    title: "E-Commerce Platforms",
    accent: "#F59E0B",
    description:
      "Scalable online stores with secure payment processing, inventory management, and conversion-optimized checkout flows. Custom-built or Shopify/WooCommerce extended.",
    deliverables: [
      "Stripe, PayPal, and payment gateway integration",
      "Inventory and order management",
      "Multi-currency and multi-language support",
      "Abandoned cart recovery flows",
      "Analytics and revenue reporting",
    ],
    tags: ["Stripe", "Shopify", "WooCommerce", "Next.js Commerce"],
  },
  {
    icon: Server,
    num: "04",
    title: "APIs & Backend Systems",
    accent: "#8B5CF6",
    description:
      "Microservices, RESTful APIs, GraphQL endpoints, and cloud deployments. Built for high availability, horizontal scaling, and clean documentation your team can work with.",
    deliverables: [
      "RESTful and GraphQL API design",
      "Microservices architecture",
      "PostgreSQL, MongoDB, Redis integration",
      "Docker and Kubernetes deployments",
      "AWS and GCP infrastructure",
    ],
    tags: ["REST", "GraphQL", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
  },
  {
    icon: Shield,
    num: "05",
    title: "Security & Compliance",
    accent: "#EF4444",
    description:
      "Security hardening, penetration testing, and compliance preparation for growing companies. OWASP Top 10 coverage, authentication architecture, and ongoing security monitoring.",
    deliverables: [
      "Security audit and vulnerability report",
      "Authentication and authorization review",
      "OWASP Top 10 remediation",
      "HTTPS, HSTS, and CSP implementation",
      "Dependency scanning and update automation",
    ],
    tags: ["OWASP", "JWT", "Auth", "HTTPS", "Penetration Testing"],
  },
  {
    icon: Gauge,
    num: "06",
    title: "Performance & SEO",
    accent: "#06B6D4",
    description:
      "Obsessive Core Web Vitals optimization, sub-second load times, and technical SEO that compounds. We target Lighthouse 95+ across all metrics and structured data for rich search results.",
    deliverables: [
      "Core Web Vitals audit and optimization",
      "Image optimization and CDN configuration",
      "Structured data and schema markup",
      "Technical SEO audit",
      "Performance monitoring setup",
    ],
    tags: ["Core Web Vitals", "Lighthouse", "Schema.org", "CDN", "SEO"],
  },
  {
    icon: Figma,
    num: "07",
    title: "UI/UX Design",
    accent: "#EC4899",
    description:
      "Product design from wireframes to high-fidelity prototypes. Design systems, component libraries, and pixel-perfect handoff to engineering — all in Figma.",
    deliverables: [
      "User flow and wireframe design",
      "High-fidelity UI prototypes",
      "Design system and component library",
      "Accessibility compliance (WCAG 2.1)",
      "Developer handoff documentation",
    ],
    tags: ["Figma", "Design Systems", "Prototyping", "WCAG", "Accessibility"],
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Rivas Technologies Engineering Services",
  description: "Full-stack engineering services for growing businesses",
  url: "https://rivastechnologies.com/services",
  numberOfItems: services.length,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      provider: {
        "@type": "Organization",
        name: "Rivas Technologies LLC",
        url: "https://rivastechnologies.com",
      },
      areaServed: ["United States", "Latin America"],
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: "https://rivastechnologies.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://rivastechnologies.com/services" },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CustomCursor />
      <SiteHeader />

      <main className="min-h-screen bg-background pt-28 pb-20">
        <div className="px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground/70 mb-12" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Services</span>
          </nav>

          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="h-px w-8 bg-border" />
              <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">What We Build</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.03em] text-balance mb-6">
              <span className="text-foreground">Engineering </span>
              <span className="text-primary">services</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
              Every engagement is scoped around your specific product goals — not a menu of generic deliverables. We serve as the engineering backbone for companies that need to move fast and scale without compromise.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.num}
                  className="group relative rounded-2xl border border-border/40 bg-card/30 p-6 sm:p-8 hover:border-border/70 transition-all duration-300"
                >
                  {/* Top line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${service.accent}80, transparent)` }}
                  />

                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `${service.accent}12`, border: `1px solid ${service.accent}25` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: service.accent }} />
                    </div>
                    <span className="text-[11px] font-mono tabular-nums" style={{ color: `${service.accent}50` }}>
                      {service.num}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-foreground mb-3">{service.title}</h2>
                  <p className="text-muted-foreground/85 text-sm leading-relaxed mb-5">{service.description}</p>

                  <ul className="space-y-2 mb-5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground/80">
                        <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: service.accent }} />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                        style={{
                          background: `${service.accent}0a`,
                          color: `${service.accent}cc`,
                          border: `1px solid ${service.accent}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="border border-border/40 rounded-2xl p-8 sm:p-12 text-center bg-card/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-mono">
                Accepting new engagements · Q2 2026
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to start an engagement?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
              Qualified engagements receive a dedicated engineering assessment within 24 hours. Tell us about your initiative and we will outline a delivery path.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                Start an Engagement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors duration-300"
              >
                View our work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}
