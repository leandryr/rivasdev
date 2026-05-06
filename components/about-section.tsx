"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Layers, Smartphone, ShoppingCart, Server, Shield, Gauge, Figma, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Service {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  tags: string[];
  span: string;
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    num: "01",
    icon: Layers,
    title: "Web Development",
    description:
      "End-to-end React and Next.js applications — from frontend to database — with clean, scalable architectures built to grow with your business.",
    accent: "#0A7CFF",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "Laravel"],
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    featured: true,
  },
  {
    num: "02",
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications with smooth UX, reliable performance, and production-ready deployments on iOS and Android.",
    accent: "#10B981",
    tags: ["React Native", "iOS", "Android", "Expo"],
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    num: "03",
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Scalable online stores with secure payment integration, inventory management, and conversion-optimized checkout flows.",
    accent: "#F59E0B",
    tags: ["Stripe", "Shopify", "WooCommerce"],
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    num: "04",
    icon: Server,
    title: "APIs & Backend",
    description:
      "Microservices, RESTful APIs, SQL and NoSQL integrations, and cloud deployments on Vercel, AWS, and VPS infrastructure.",
    accent: "#8B5CF6",
    tags: ["REST", "GraphQL", "AWS", "Docker", "Kubernetes"],
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    num: "05",
    icon: Shield,
    title: "Security",
    description:
      "Robust authentication, end-to-end encryption, CSRF/XSS protection, and security best practices across every layer of the stack.",
    accent: "#EF4444",
    tags: ["Auth", "JWT", "HTTPS", "OWASP"],
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    num: "06",
    icon: Gauge,
    title: "Performance & SEO",
    description:
      "Obsessive Core Web Vitals optimization, sub-second load times, and SEO strategies that drive organic growth and search visibility.",
    accent: "#06B6D4",
    tags: ["Core Web Vitals", "Lighthouse 100", "SEO", "CDN"],
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    num: "07",
    icon: Figma,
    title: "UI/UX Design",
    description:
      "Product design from wireframes to high-fidelity prototypes — intuitive interfaces, consistent design systems, and pixel-perfect handoff to engineering.",
    accent: "#EC4899",
    tags: ["Figma", "Design System", "Prototyping", "Accessibility"],
    span: "sm:col-span-2 lg:col-span-2",
  },
];


// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.08);
  const [mouse, setMouse]   = useState({ x: 50, y: 50 });
  const [hov, setHov]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme }   = useTheme();
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${service.span} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${index * 70}ms`,
        border: hov
          ? `1px solid ${service.accent}55`
          : isLight
            ? "1px solid rgba(10,20,60,0.1)"
            : "1px solid rgba(255,255,255,0.07)",
        background: isLight ? "#FFFFFF" : "rgba(9,12,22,0.7)",
        boxShadow: hov
          ? isLight
            ? `0 8px 40px ${service.accent}20, 0 2px 8px rgba(0,0,0,0.06)`
            : `0 0 50px ${service.accent}12, 0 1px 0 ${service.accent}20 inset`
          : isLight
            ? "0 1px 4px rgba(10,20,60,0.06), 0 2px 16px rgba(10,20,60,0.04)"
            : "none",
        backdropFilter: "blur(8px)",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
        setHov(true);
      }}
      onMouseLeave={() => setHov(false)}
      data-cursor-hover
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity:    hov ? 1 : 0,
          background: `radial-gradient(ellipse 70% 60% at ${mouse.x}% ${mouse.y}%, ${service.accent}0e 0%, transparent 65%)`,
        }}
      />

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{ background: hov ? `linear-gradient(to right, transparent 0%, ${service.accent}90 50%, transparent 100%)` : "transparent" }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none transition-opacity duration-500"
        style={{
          opacity:    hov ? 1 : 0,
          background: `radial-gradient(circle at 100% 0%, ${service.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className={`relative p-5 sm:p-6 lg:p-8 ${service.featured ? "flex flex-col sm:min-h-[380px]" : ""}`}>

        {/* Icon + number row */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500"
            style={{
              background: `${service.accent}${hov ? "22" : "12"}`,
              border:     `1px solid ${service.accent}${hov ? "40" : "22"}`,
              boxShadow:  hov ? `0 0 20px ${service.accent}20` : "none",
            }}
          >
            <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: service.accent }} />
          </div>
          <span className="text-[11px] font-mono tabular-nums" style={{ color: `${service.accent}40` }}>
            {service.num}
          </span>
        </div>

        <div className={service.featured ? "flex-1 flex flex-col" : ""}>
          {/* Title */}
          <h3
            className="font-semibold text-sm lg:text-base tracking-tight mb-2.5 transition-colors duration-300"
            style={{ color: hov ? service.accent : isLight ? "#050508" : "rgb(229,231,235)" }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className={`text-xs lg:text-sm leading-relaxed ${service.featured ? "max-w-xs" : ""}`}
            style={{ color: isLight ? "#050508" : "rgba(210,215,230,0.85)" }}>
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md transition-all duration-300"
                style={{
                  background: `${service.accent}${hov ? "18" : isLight ? "12" : "0a"}`,
                  color:      `${service.accent}${hov ? "ee" : isLight ? "cc" : "70"}`,
                  border:     `1px solid ${service.accent}${hov ? "35" : isLight ? "30" : "14"}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Featured extras */}
          {service.featured && (
            <div className="mt-auto pt-8">
              {/* CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group/cta"
                style={{ color: hov ? service.accent : "rgba(185,190,215,0.75)" }}
              >
                Start an engagement
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>(0.2);

  return (
    <section id="capabilities" className="relative py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] -z-10 opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #0A7CFF 0%, transparent 70%)", filter: "blur(80px)" }}
        aria-hidden="true"
      />

      {/* Header */}
      <div ref={headerRef} className="mb-8 lg:mb-10">
        <div className={`flex items-center gap-4 mb-5 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-primary/40 text-[10px] font-mono">02</span>
          <div className="h-px w-8 bg-border" />
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">Solutions</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-balance transition-all duration-700 delay-100 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-foreground">Core </span>
          <span className="text-muted-foreground/65">capabilities</span>
        </h2>
        <p className={`mt-4 text-muted-foreground/85 text-sm max-w-md transition-all duration-700 delay-150 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          End-to-end engineering capabilities purpose-built for companies that require results, not just deliverables.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
