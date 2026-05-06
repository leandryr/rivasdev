"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MapPin, ArrowRight, ExternalLink, Zap, ShieldCheck, Globe, TrendingUp, Code2, Lightbulb } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "2021",      label: "Founded in Gainesville, GA" },
  { value: "Apr 2025",  label: "Incorporated as LLC" },
  { value: "US + LATAM", label: "Presence across the Americas" },
  { value: "24h",       label: "Engineering assessment" },
];

const pillars = [
  {
    icon: Zap,
    color: "#F59E0B",
    title: "Business Automation",
    desc: "We eliminate the manual. CRM workflows, billing pipelines, notification systems, and data integrations — we connect your tools and let your team focus on what actually grows the business.",
  },
  {
    icon: Globe,
    color: "#0A7CFF",
    title: "Digital Business Creation",
    desc: "From idea to launch. We partner with entrepreneurs to define, design and deploy digital products — web platforms, SaaS tools, e-commerce stores — built to scale from day one.",
  },
  {
    icon: ShieldCheck,
    color: "#10B981",
    title: "Security Auditing",
    desc: "With forensic-grade discipline at our core, we audit existing systems for vulnerabilities, harden authentication layers, and ensure every product we ship meets enterprise compliance standards.",
  },
  {
    icon: TrendingUp,
    color: "#8B5CF6",
    title: "Horizontally Scalable Architecture",
    desc: "We architect systems that grow with you — containerised, cloud-native, and load-balanced. No bottlenecks when your user base doubles. No rewrites six months in.",
  },
  {
    icon: Code2,
    color: "#EF4444",
    title: "Modern Web Engineering",
    desc: "React, Next.js, Laravel, Node.js — we build with the right tool for the job, not the trendy one. Clean code, tested pipelines, and documented systems your team can own.",
  },
  {
    icon: Lightbulb,
    color: "#06B6D4",
    title: "Innovation Strategy",
    desc: "We don't just execute — we challenge assumptions. Weekly discovery sessions, rapid prototyping, and evidence-driven iteration to help founders build the right thing, faster.",
  },
];

const team = [
  {
    name: "Leandry R Rivas P",
    role: "Full Stack Developer & Founder",
    location: "Gainesville, GA · United States",
    bio: "Full-stack web developer and digital forensics specialist with a background as Detective Agregado – Forensic Informatics at the Scientific Criminal Investigation Police. Brings law-enforcement-grade security, investigative rigor, and evidence-driven thinking to every engagement.",
    focus: "Next.js & React, Laravel, Node.js, MongoDB, PostgreSQL, MariaDB, Git, Vercel, Linux VPS, AWS, Google Cloud, Kubernetes, horizontally scalable architectures & containerised deployments.",
    tags: ["Full Stack", "Security", "Founder & CEO"],
    email: "leandry@rivastechnologies.com",
    initials: "LR",
    color: "#0A7CFF",
    photo: "/team/Leandry.webp",
    photoPos: "center top",
  },
  {
    name: "Magaly Olivera",
    role: "Director of Business, HR & Compliance",
    location: "United States",
    bio: "HR and Compliance professional with a strong foundation in Business Information Systems and Human Resources Management. Experienced in managing confidential records, ensuring data accuracy, and supporting regulatory compliance aligned with U.S. Department of Homeland Security standards. Demonstrated ability to coordinate cross-functional operations, streamline administrative processes, and maintain high-volume data systems with precision.",
    focus: "Regulatory compliance, HR operations, cross-functional coordination, administrative process optimization, and organizational integrity through accurate reporting and documentation.",
    tags: ["Business Director", "HR", "Compliance"],
    email: "",
    initials: "MO",
    color: "#F59E0B",
    photo: "/team/Magaly.jpeg",
    photoPos: "center top",
  },
  {
    name: "Carlos Bruzual",
    role: "Frontend Developer & Web Designer",
    location: "Venezuela",
    bio: "Frontend developer and web designer focused on building clean, responsive websites and landing pages. WordPress specialist with strong skills in layout, visual design, and performance optimization — combining design sense with solid frontend craft to deliver conversion-oriented experiences.",
    focus: "Frontend development, WordPress, UI implementation, performance optimization.",
    tags: ["Frontend", "Web Design"],
    email: "",
    initials: "CB",
    color: "#10B981",
    photo: "/team/Carlos.webp",
    photoPos: "center 20%",
  },
  {
    name: "Virginia Moffi",
    role: "Brand & UX/UI Designer",
    location: "Venezuela",
    bio: "Brand and UX/UI designer focused on building clear, memorable visual identities and user-friendly interfaces. Combines print and digital experience to deliver cohesive design systems across packaging, social media and digital products.",
    focus: "Branding, visual identity systems, UX/UI design, social media content systems.",
    tags: ["Branding", "UX/UI"],
    email: "",
    initials: "VM",
    color: "#8B5CF6",
    photo: "/team/Maria.webp",
    photoPos: "center top",
  },
];

const roadmap = [
  {
    title: "Deeper automation tooling",
    desc: "Build a library of pre-integrated automation modules so entrepreneurs can activate CRM, billing and analytics without starting from scratch every time.",
  },
  {
    title: "Productised launch packages",
    desc: "Standardised, battle-tested launch stacks for specific verticals — services, e-commerce, SaaS — so founders move from idea to live product in days, not months.",
  },
  {
    title: "LATAM expansion",
    desc: "Grow our team of collaborators across Latin America to serve the region's rapidly expanding startup ecosystem with culturally informed, technically rigorous delivery.",
  },
  {
    title: "Security-as-a-service",
    desc: "Package our forensic-grade audit methodology into recurring compliance monitoring — keeping client systems hardened long after launch.",
  },
];

// ─── Team card ────────────────────────────────────────────────────────────────
function TeamCard({ member, isLight }: { member: typeof team[0]; isLight: boolean }) {
  const [hov, setHov] = useState(false);

  const cardBg     = isLight ? "#FFFFFF"                  : "rgba(10,10,18,0.7)";
  const borderBase = isLight ? "rgba(0,0,0,0.10)"         : "rgba(255,255,255,0.07)";
  const shadowBase = isLight ? "0 2px 12px rgba(0,0,0,0.08)" : "0 2px 16px rgba(0,0,0,0.3)";
  const shadowHov  = isLight
    ? `0 0 30px ${member.color}22, 0 8px 32px rgba(0,0,0,0.12)`
    : `0 0 50px ${member.color}20, 0 8px 40px rgba(0,0,0,0.4)`;
  const textName   = isLight ? "#050508"                  : "var(--foreground)";
  const textMuted  = isLight ? "#444466"                  : "var(--muted-foreground)";
  const tagBg      = isLight ? "rgba(0,0,0,0.06)"         : "rgba(10,10,18,0.7)";

  return (
    <div
      className="relative rounded-2xl border overflow-hidden transition-all duration-500 cursor-default select-none flex flex-col"
      style={{
        borderColor: hov ? `${member.color}55` : borderBase,
        background: cardBg,
        boxShadow: hov ? shadowHov : shadowBase,
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor-hover
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          style={{ objectPosition: member.photoPos }}
          sizes="(max-width: 768px) 100vw, 25vw"
          quality={95}
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0"
          style={{
            background: isLight
              ? "none"
              : `linear-gradient(to top, rgba(10,10,18,0.9) 0%, rgba(10,10,18,0.2) 25%, transparent 50%)`,
          }} />
        {/* Color accent top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(to right, transparent, ${member.color}, transparent)` }} />
        {/* Tags overlaid bottom-left */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {member.tags.map(t => (
            <span key={t} className="text-[8px] font-mono uppercase tracking-[0.15em] px-2 py-1 rounded backdrop-blur-sm"
              style={{
                color: member.color,
                background: "rgba(5,5,12,0.75)",
                border: `1px solid ${member.color}60`,
              }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pt-4 pb-2">
        <h3 className="font-bold text-base leading-tight mb-1" style={{ color: isLight ? "#050508" : "#FFFFFF" }}>{member.name}</h3>
        <p className="text-xs font-mono font-medium" style={{ color: member.color }}>{member.role}</p>
        {member.email && (
          <a href={`mailto:${member.email}`}
            className="text-[10px] font-mono mt-0.5 hover:underline block"
            style={{ color: isLight ? "rgba(10,96,230,0.65)" : "rgba(10,124,255,0.6)" }}
            onClick={e => e.stopPropagation()}>
            {member.email}
          </a>
        )}
      </div>

      {/* Bio — slides in on hover */}
      <div className="overflow-hidden transition-all duration-500 px-5"
        style={{
          maxHeight: hov ? "240px" : "0px",
          opacity: hov ? 1 : 0,
          paddingBottom: hov ? "16px" : "0",
        }}>
        <div className="pt-3 border-t mt-2" style={{ borderColor: `${member.color}20` }}>
          <p className="text-xs leading-relaxed mb-3" style={{ color: textMuted }}>{member.bio}</p>
          <div>
            <span className="text-[8px] font-mono uppercase tracking-[0.2em] mb-1 block" style={{ color: member.color }}>Focus</span>
            <p className="text-[11px] leading-relaxed" style={{ color: textMuted }}>{member.focus}</p>
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="px-5 pb-4 mt-auto">
        {!hov && <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.2)" }}>Hover to read</span>}
      </div>
    </div>
  );
}

function useIsLight() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && resolvedTheme === "light";
}

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12);
  return (
    <div ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const breadcrumbSchemaAbout = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: "https://rivastechnologies.com" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://rivastechnologies.com/about" },
  ],
});

export default function AboutPage() {
  const isLight = useIsLight();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaAbout }} />
      <CustomCursor />
      <SiteHeader />
      <main className="pt-28 pb-20">

        {/* ── Hero ── */}
        <section className="px-6 lg:px-10 mb-20">
          <Section>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-primary/40 text-[10px] font-mono">About</span>
              <div className="h-px w-8 bg-border" />
              <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">Rivas Technologies LLC</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.04em] text-balance mb-6 leading-[0.95]">
              <span className="text-foreground">We help entrepreneurs </span>
              <span className="text-primary">build, automate </span>
              <span className="text-foreground">& scale.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
              Founded in Gainesville, Georgia with one conviction: every entrepreneur deserves access to the kind of engineering that used to require a venture-backed budget. We combine technical depth, security rigor, and product thinking to turn ideas into resilient digital businesses.
            </p>
          </Section>
        </section>

        {/* ── Stats ── */}
        <section className="px-6 lg:px-10 mb-20">
          <Section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="p-5 rounded-2xl border border-border/40 bg-card/30">
                  <div className="text-2xl lg:text-3xl font-bold text-primary tracking-tight mb-1">{s.value}</div>
                  <div className="text-muted-foreground text-xs uppercase tracking-[0.15em] font-mono leading-relaxed">{s.label}</div>
                </div>
              ))}
            </div>
          </Section>
        </section>

        {/* ── Origin story ── */}
        <section className="px-6 lg:px-10 mb-20 border-t border-border/20 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Section>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/60 block mb-4">How it started</span>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-[-0.03em] text-foreground mb-5">
                One question sparked everything
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  In 2021, our founder — a digital forensics specialist based in Gainesville, Georgia — noticed a pattern while working with small business owners in the greater Atlanta metro: they were drowning in manual processes, insecure systems, and static websites that couldn't grow with them.
                </p>
                <p>
                  The question wasn't <em>"can we build this?"</em> — it was <em>"why are entrepreneurs still doing this by hand?"</em> That curiosity became the foundation. Early projects focused on automating repetitive workflows, hardening authentication systems, and replacing fragile WordPress sites with scalable, production-grade stacks.
                </p>
                <p>
                  By April 2025, the practice formalised as <span className="text-foreground font-medium">Rivas Technologies LLC</span> (Control Number 25096365, State of Georgia) — with collaborators across the US and Latin America, and a methodology built around one principle: <span className="text-foreground font-medium">the entrepreneur wins when the system runs itself.</span>
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                Gainesville, GA · Founded & headquartered
              </div>
            </Section>

            {/* Pull quote */}
            <Section delay={150}>
              <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="text-primary/20 text-8xl font-serif leading-none mb-4 select-none">"</div>
                <blockquote className="text-foreground text-lg sm:text-xl font-medium leading-relaxed tracking-[-0.01em] mb-6">
                  The entrepreneur wins when the system runs itself.
                </blockquote>
                <div className="text-muted-foreground text-xs font-mono uppercase tracking-[0.2em]">
                  — The principle behind every engagement
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </div>
            </Section>
          </div>
        </section>

        {/* ── What we do ── */}
        <section className="px-6 lg:px-10 mb-20 border-t border-border/20 pt-16">
          <Section>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/60 block mb-4">What we do</span>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-[-0.03em] text-foreground mb-10">
              Six ways we move your business forward
            </h2>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Section key={p.title} delay={i * 60}>
                  <div className="p-5 rounded-2xl border border-border/30 bg-card/20 h-full hover:border-border/60 transition-colors duration-300">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${p.color}18`, border: `1px solid ${p.color}35` }}>
                      <Icon className="w-4 h-4" style={{ color: p.color }} />
                    </div>
                    <h3 className="text-foreground font-semibold text-sm mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </Section>
              );
            })}
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="px-6 lg:px-10 mb-20 border-t border-border/20 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Section>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/60 block mb-4">Where we're heading</span>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-[-0.03em] text-foreground mb-3">
                Building the infrastructure for the next generation of founders
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We're not just taking on client projects — we're systematically building the tools, packages, and partnerships that make entrepreneurship less fragile.
              </p>
            </Section>
            <Section delay={100}>
              <div className="space-y-4">
                {roadmap.map((r, i) => (
                  <div key={r.title} className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/20">
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-foreground font-medium text-sm mb-1">{r.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="px-6 lg:px-10 mb-20 border-t border-border/20 pt-16">
          <Section>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/60 block mb-4">The people behind the studio</span>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-[-0.03em] text-foreground mb-3">
              Hands-on in every project
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mb-10">
              Rivas Technologies is led from Gainesville, GA with collaborators across the Americas. No account managers in between — you work directly with the people building your product.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {team.map(m => <TeamCard key={m.name} member={m} isLight={isLight} />)}
            </div>
          </Section>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 lg:px-10 border-t border-border/20 pt-16">
          <Section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border border-border/40 bg-card/20">
              <div>
                <h3 className="text-foreground font-semibold text-xl mb-2">Ready to automate, build, and scale?</h3>
                <p className="text-muted-foreground text-sm max-w-md">Qualified engagements receive a dedicated engineering assessment within 24 hours. No obligations until alignment is confirmed.</p>
              </div>
              <a href="/#contact" data-cursor-hover
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300 flex-shrink-0">
                Start an Engagement <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </Section>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
