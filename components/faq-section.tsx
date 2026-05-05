"use client";

import { useState, useEffect } from "react";
import { Layers, Clock, GitBranch, HeartPulse, Cpu, Zap, Settings2, Brain, Radio } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useTheme } from "next-themes";
import type { LucideIcon } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type HoloType = "services" | "timeline" | "process" | "support" | "tech" | "diff";

interface FAQ {
  q: string; a: string;
  icon: LucideIcon; holo: HoloType;
}

const FAQS: FAQ[] = [
  {
    q: "What services does Rivas Technologies offer?",
    a: "Full-stack web development, mobile apps, e-commerce, API & backend architecture, security hardening, and performance & SEO optimization. Every engagement is scoped around your specific product goals.",
    icon: Layers, holo: "services",
  },
  {
    q: "How long does a typical project take?",
    a: "Most clients see their first release within 10 business days. Full-scale platforms vary by scope — we always establish clear milestones and maintain weekly delivery cadences throughout the engagement.",
    icon: Clock, holo: "timeline",
  },
  {
    q: "What is your development process?",
    a: "Discovery sprint to align on goals, architecture, and timeline. Then iterative development cycles with weekly demos, continuous deployment, and executive-level status updates at every step.",
    icon: GitBranch, holo: "process",
  },
  {
    q: "Do you offer ongoing support and maintenance?",
    a: "Yes. Post-launch packages covering bug fixes, performance monitoring, security patches, and feature iterations. We stay engaged well beyond the initial delivery.",
    icon: HeartPulse, holo: "support",
  },
  {
    q: "What technologies do you specialize in?",
    a: "React, Next.js, TypeScript, Laravel, Node.js, PostgreSQL, MongoDB, MySQL, Docker, Kubernetes, AWS, and Cloud Run. Technology is selected based on your product requirements — not internal preferences.",
    icon: Cpu, holo: "tech",
  },
  {
    q: "How is Rivas Technologies different from other agencies?",
    a: "We operate at the intersection of engineering depth and product thinking. Senior-level technical execution with executive-level communication — no middlemen, no handoffs, no surprises.",
    icon: Zap, holo: "diff",
  },
];

// ─── Hologram displays ────────────────────────────────────────────────────────

function HoloServices() {
  const items = [
    { label: "Web Dev",     color: "#0A7CFF" },
    { label: "Mobile Apps", color: "#10B981" },
    { label: "E-Commerce",  color: "#F59E0B" },
    { label: "APIs",        color: "#8B5CF6" },
    { label: "Security",    color: "#EF4444" },
    { label: "SEO & Perf",  color: "#06B6D4" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 w-full animate-holo-appear">
      {items.map((item, i) => (
        <div key={item.label}
          className="rounded-xl border px-3 py-4 flex flex-col items-center gap-2 text-center"
          style={{
            borderColor: `${item.color}35`,
            background:  `${item.color}0a`,
            animationDelay: `${i * 60}ms`,
          }}>
          <div className="w-2 h-2 rounded-full animate-pulse-ring" style={{ background: item.color }} />
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold" style={{ color: item.color }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HoloTimeline({ isLight }: { isLight: boolean }) {
  const steps = [
    { day: "Day 1",  label: "Kickoff & Scoping",    done: true  },
    { day: "Day 3",  label: "Architecture Review",  done: true  },
    { day: "Day 5",  label: "First Milestone",      done: true  },
    { day: "Day 10", label: "First Release",         done: true  },
    { day: "Week 3", label: "Full Platform Launch",  done: false },
  ];
  return (
    <div className="w-full animate-holo-appear">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary/60">Project Timeline</span>
        <span className="text-[10px] font-mono text-emerald-400">ON TRACK</span>
      </div>
      <div className="relative">
        <div className="absolute left-[18px] top-3 bottom-3 w-px bg-border/40" />
        <div className="space-y-5">
          {steps.map((s, i) => (
            <div key={s.day} className="flex items-center gap-4 animate-holo-appear"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10"
                style={{
                  borderColor: s.done ? "#10B981" : isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)",
                  background:  s.done ? "#10B98120" : isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.03)",
                  boxShadow:   s.done ? "0 0 12px #10B98140" : "none",
                }}>
                {s.done
                  ? <span className="text-[10px] text-emerald-400 font-bold">✓</span>
                  : <span className="text-[9px] text-muted-foreground/80 font-mono">{i + 1}</span>
                }
              </div>
              <div>
                <div className="text-xs font-semibold"
                  style={{ color: s.done ? (isLight ? "#050508" : "#e5e7eb") : isLight ? "#444" : "rgba(229,231,235,0.5)" }}>
                  {s.label}
                </div>
                <div className="text-[10px] font-mono"
                  style={{ color: s.done ? "#10B981" : isLight ? "#666" : "rgba(185,190,215,0.6)" }}>
                  {s.day}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HoloProcess() {
  const steps = [
    { num: "01", label: "Discovery Sprint",     sub: "Goals · Architecture · Timeline", color: "#0A7CFF" },
    { num: "02", label: "Iterative Builds",     sub: "Weekly sprints · CI/CD pipeline",  color: "#8B5CF6" },
    { num: "03", label: "Weekly Demos",         sub: "Live review · Feedback loop",      color: "#10B981" },
    { num: "04", label: "Continuous Deploy",    sub: "Production-ready at every step",   color: "#F59E0B" },
  ];
  return (
    <div className="w-full space-y-3 animate-holo-appear">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center gap-4 p-3 rounded-xl border animate-holo-appear"
          style={{
            borderColor: `${s.color}25`,
            background:  `${s.color}08`,
            animationDelay: `${i * 80}ms`,
          }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold"
            style={{ background: `${s.color}18`, color: s.color }}>
            {s.num}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground/90">{s.label}</div>
            <div className="text-[10px] font-mono text-muted-foreground/90 mt-0.5">{s.sub}</div>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full animate-pulse-ring" style={{ background: s.color }} />
        </div>
      ))}
    </div>
  );
}

function HoloSupport() {
  const metrics = [
    { label: "Response Time",  val: "< 2h",    status: "green" },
    { label: "Uptime SLA",     val: "99.9%",   status: "green" },
    { label: "Security Scans", val: "Weekly",  status: "green" },
    { label: "Feature Cycles", val: "Bi-weekly", status: "blue"  },
  ];
  return (
    <div className="w-full animate-holo-appear">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">Systems Operational</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <div key={m.label} className="rounded-xl border border-border/30 p-3 bg-card/30 animate-holo-appear"
            style={{ animationDelay: `${i * 70}ms` }}>
            <div className="text-xl font-bold tabular-nums"
              style={{ color: m.status === "green" ? "#10B981" : "#0A7CFF" }}>
              {m.val}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground/90 mt-1 uppercase tracking-wider">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 h-1.5 rounded-full bg-border/20 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-primary animate-pulse" style={{ width: "94%" }} />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[9px] font-mono text-muted-foreground/70">Support coverage</span>
        <span className="text-[9px] font-mono text-emerald-400">94% avg satisfaction</span>
      </div>
    </div>
  );
}

function HoloTech() {
  const cats = [
    { label: "Frontend",  techs: ["React", "Next.js", "TypeScript", "Tailwind"],          color: "#0A7CFF" },
    { label: "Backend",   techs: ["Node.js", "Laravel", "GraphQL", "REST API"],            color: "#10B981" },
    { label: "Database",  techs: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],              color: "#F59E0B" },
    { label: "Cloud",     techs: ["AWS", "Docker", "Kubernetes", "Cloud Run"],             color: "#8B5CF6" },
  ];
  return (
    <div className="w-full space-y-3 animate-holo-appear">
      {cats.map((cat, ci) => (
        <div key={cat.label} className="animate-holo-appear" style={{ animationDelay: `${ci * 70}ms` }}>
          <div className="text-[9px] font-mono uppercase tracking-widest mb-1.5" style={{ color: cat.color }}>
            {cat.label}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cat.techs.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md border font-medium"
                style={{ background: `${cat.color}12`, color: `${cat.color}dd`, borderColor: `${cat.color}28` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HoloDiff({ isLight }: { isLight: boolean }) {
  const pillars = [
    { Icon: Settings2, label: "Engineering Depth",       sub: "Senior-level execution on every project",      color: "#0A7CFF" },
    { Icon: Brain,     label: "Product Thinking",        sub: "We build for outcomes, not just deliverables", color: "#8B5CF6" },
    { Icon: Radio,     label: "Executive Communication", sub: "No middlemen. Direct, clear, always on time",  color: "#10B981" },
  ];
  return (
    <div className="w-full space-y-4 animate-holo-appear">
      {pillars.map((p, i) => (
        <div key={p.label} className="flex items-start gap-4 p-4 rounded-xl border animate-holo-appear"
          style={{
            borderColor:   `${p.color}30`,
            background:    `${p.color}08`,
            animationDelay: `${i * 100}ms`,
          }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
            <p.Icon className="w-4 h-4" style={{ color: p.color }} />
          </div>
          <div>
            <div className="font-semibold text-sm text-foreground/90 mb-0.5">{p.label}</div>
            <div className="text-[11px] text-muted-foreground/60 leading-relaxed">{p.sub}</div>
          </div>
          <div className="ml-auto w-px h-full min-h-[36px] rounded" style={{ background: `${p.color}40` }} />
        </div>
      ))}
    </div>
  );
}

function HologramPanel({ faq, isLight }: { faq: FAQ; isLight: boolean }) {
  const map: Record<HoloType, React.ReactNode> = {
    services: <HoloServices />,
    timeline: <HoloTimeline isLight={isLight} />,
    process:  <HoloProcess />,
    support:  <HoloSupport />,
    tech:     <HoloTech />,
    diff:     <HoloDiff isLight={isLight} />,
  };

  const panelBg    = isLight ? "rgba(255,255,255,0.97)" : "rgba(4,8,20,0.95)";
  const borderCol  = isLight ? "rgba(10,124,255,0.35)"  : "rgba(10,124,255,0.28)";
  const headerBg   = isLight ? "rgba(10,124,255,0.06)"  : "rgba(10,124,255,0.05)";
  const headerBdr  = isLight ? "rgba(10,124,255,0.18)"  : "rgba(10,124,255,0.15)";
  const dividerCol = isLight ? "rgba(10,124,255,0.12)"  : "rgba(10,124,255,0.08)";
  const footerBg   = isLight ? "rgba(10,124,255,0.04)"  : "rgba(10,124,255,0.03)";
  const footerBdr  = isLight ? "rgba(10,124,255,0.15)"  : "rgba(10,124,255,0.1)";
  const statusBdr  = isLight ? "rgba(10,124,255,0.18)"  : "rgba(10,124,255,0.12)";
  const statusBg   = isLight ? "rgba(10,124,255,0.04)"  : "rgba(10,124,255,0.04)";

  return (
    <div className="relative w-full h-full flex flex-col animate-holo-flicker" style={{ minHeight: 460 }}>

      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: isLight ? "0 4px 40px rgba(10,124,255,0.1), 0 1px 4px rgba(0,0,0,0.06)" : "0 0 60px rgba(10,124,255,0.12), inset 0 0 40px rgba(10,124,255,0.03)" }} />

      {/* Main panel */}
      <div className="relative flex-1 rounded-2xl border overflow-hidden flex flex-col"
        style={{ borderColor: borderCol, background: panelBg }}>

        {/* Scan line */}
        <div className="absolute left-0 right-0 h-px pointer-events-none z-20 animate-holo-scan"
          style={{ background: "linear-gradient(to right, transparent, rgba(10,124,255,0.7) 20%, rgba(100,200,255,0.9) 50%, rgba(10,124,255,0.7) 80%, transparent)" }} />

        {/* Corner brackets */}
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl-xl",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr-xl",
          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl",
          "bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-6 h-6 pointer-events-none z-10 ${cls}`}
            style={{ borderColor: "rgba(10,124,255,0.8)" }} />
        ))}

        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: isLight ? 0.06 : 0.04,
            backgroundImage: "linear-gradient(rgba(10,124,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,124,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: headerBdr, background: headerBg }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">
              Rivas Technologies · Data Feed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-muted-foreground/70">SYS:ACTIVE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Question display */}
        <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: dividerCol }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "rgba(10,124,255,0.12)", border: "1px solid rgba(10,124,255,0.25)" }}>
              <faq.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground/90 leading-snug">{faq.q}</p>
          </div>
        </div>

        {/* Hologram visual */}
        <div className="flex-1 px-5 py-5 overflow-hidden">
          {map[faq.holo]}
        </div>

        {/* Answer text */}
        <div className="px-5 py-4 border-t" style={{ borderColor: footerBdr, background: footerBg }}>
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-mono">{faq.a}</p>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t"
          style={{ borderColor: statusBdr, background: statusBg }}>
          <span className="text-[9px] font-mono text-muted-foreground/65 uppercase tracking-widest">
            SIGNAL LOCKED · {faq.holo.toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-full animate-pulse"
                style={{ width: i === 3 ? 16 : 6, height: 4, background: "rgba(10,124,255,0.6)", animationDelay: `${i * 200}ms` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function FaqSection() {
  const [active, setActive] = useState(0);
  const [holoKey, setHoloKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>(0.2);
  const { ref: listRef,   isVisible: listVisible   } = useScrollReveal<HTMLDivElement>(0.1);

  const select = (i: number) => {
    setActive(i);
    setHoloKey(k => k + 1);
  };

  return (
    <section id="faq" className="relative py-12 lg:py-16 px-6 lg:px-10">
      <FaqSchema />
      {/* Header */}
      <div ref={headerRef} className="mb-8 lg:mb-10">
        <div className={`flex items-center gap-4 mb-5 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-primary/40 text-[10px] font-mono">05</span>
          <div className="h-px w-8 bg-border" />
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">FAQ</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-balance transition-all duration-700 delay-100 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-foreground">Common </span>
          <span className="text-muted-foreground/65">questions</span>
        </h2>
      </div>

      {/* Split layout */}
      <div ref={listRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

        {/* Left: question list */}
        <div className="space-y-1">
          {FAQS.map((faq, i) => {
            const isActive = active === i;
            return (
              <button
                key={faq.q}
                onClick={() => select(i)}
                data-cursor-hover
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border text-left transition-all duration-300 ${
                  isActive
                    ? "border-primary/30 bg-primary/[0.06]"
                    : "border-transparent hover:border-border/40 hover:bg-card/30"
                }`}
                style={{
                  opacity:          listVisible ? 1 : 0,
                  transform:        listVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay:  `${i * 60}ms`,
                  transitionProperty: "opacity,transform,background,border-color",
                  transitionDuration: "600ms,600ms,300ms,300ms",
                }}
              >
                {/* Number */}
                <span className="text-[11px] font-mono tabular-nums flex-shrink-0 w-6 text-right"
                  style={{ color: isActive ? "#0A7CFF" : isLight ? "rgba(10,124,255,0.5)" : "rgba(10,124,255,0.35)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: isActive ? "rgba(10,124,255,0.12)" : "rgba(10,124,255,0.05)",
                    border:     `1px solid rgba(10,124,255,${isActive ? "0.28" : "0.1"})`,
                  }}>
                  <faq.icon className="w-3.5 h-3.5 transition-colors duration-300"
                    style={{ color: isActive ? "#0A7CFF" : isLight ? "#050508" : "rgba(185,190,215,0.85)" }} />
                </div>

                {/* Question */}
                <span className="text-sm font-medium flex-1 leading-snug transition-colors duration-300"
                  style={{ color: isActive ? (isLight ? "#0060E6" : "#e5e7eb") : isLight ? "#050508" : "rgba(229,231,235,0.80)" }}>
                  {faq.q}
                </span>

                {/* Active indicator */}
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    background: isActive ? "#0A7CFF" : "transparent",
                    boxShadow:  isActive ? "0 0 8px #0A7CFF" : "none",
                  }} />
              </button>
            );
          })}
        </div>

        {/* Right: hologram panel */}
        <div className={`transition-all duration-700 delay-300 ${listVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <HologramPanel key={holoKey} faq={FAQS[active]} isLight={isLight} />
        </div>

      </div>
    </section>
  );
}
