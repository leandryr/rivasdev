"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ExternalLink, Github, Mail } from "lucide-react";
import { projects, type Project } from "@/lib/projects";

// ─── Hologram panel card (matches FAQ panel style) ────────────────────────────
function ProjectPanel({ project }: { project: Project }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";

  const panelBg    = isLight ? "rgba(255,255,255,0.97)" : "rgba(4,8,20,0.96)";
  const borderCol  = isLight ? "rgba(10,124,255,0.35)"  : "rgba(10,124,255,0.28)";
  const headerBg   = isLight ? "rgba(10,124,255,0.06)"  : "rgba(10,124,255,0.05)";
  const headerBdr  = isLight ? "rgba(10,124,255,0.18)"  : "rgba(10,124,255,0.15)";
  const dividerCol = isLight ? "rgba(10,124,255,0.14)"  : "rgba(10,124,255,0.08)";
  const footerBg   = isLight ? "rgba(10,124,255,0.04)"  : "rgba(10,124,255,0.03)";
  const footerBdr  = isLight ? "rgba(10,124,255,0.16)"  : "rgba(10,124,255,0.10)";
  const statusBdr  = isLight ? "rgba(10,124,255,0.18)"  : "rgba(10,124,255,0.12)";
  const statusBg   = isLight ? "rgba(10,124,255,0.04)"  : "rgba(10,124,255,0.04)";
  const textMain   = isLight ? "#050508"                 : "rgba(255,255,255,0.90)";
  const textSub    = isLight ? "#444466"                 : "rgba(10,124,255,0.65)";
  const textMuted  = isLight ? "#555577"                 : "rgba(200,220,240,0.55)";
  const statusText = isLight ? "rgba(10,124,255,0.6)"   : "rgba(255,255,255,0.35)";
  const tagColor   = isLight ? "#0060E6"                 : "rgba(10,124,255,0.85)";
  const tagBg      = isLight ? "rgba(10,96,230,0.08)"   : "rgba(10,124,255,0.08)";
  const tagBdr     = isLight ? "rgba(10,96,230,0.22)"   : "rgba(10,124,255,0.2)";
  const imgFilter  = isLight ? "brightness(0.98)"        : "brightness(0.95)";

  return (
    <div className="relative w-full animate-holo-flicker">

      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "0 0 40px rgba(10,124,255,0.10), inset 0 0 30px rgba(10,124,255,0.02)" }} />

      {/* Main panel */}
      <div className="relative rounded-2xl border overflow-hidden flex flex-col"
        style={{ borderColor: borderCol, background: panelBg }}>

        {/* Scan line */}
        <div className="absolute left-0 right-0 h-px pointer-events-none z-20 animate-holo-scan"
          style={{ background: "linear-gradient(to right, transparent, rgba(10,124,255,0.7) 20%, rgba(100,200,255,0.9) 50%, rgba(10,124,255,0.7) 80%, transparent)" }} />

        {/* Corner brackets */}
        {[
          "top-0 left-0 border-t-2 border-l-2",
          "top-0 right-0 border-t-2 border-r-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-5 h-5 pointer-events-none z-10 ${cls}`}
            style={{ borderColor: "rgba(10,124,255,0.85)" }} />
        ))}

        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: isLight ? 0.06 : 0.035,
            backgroundImage: "linear-gradient(rgba(10,124,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,124,255,1) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />

        {/* ── Header bar ── */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b"
          style={{ borderColor: headerBdr, background: headerBg }}>
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-primary/80">
              Rivas Technologies · Project Feed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: statusText }}>SYS:ACTIVE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* ── Project title row ── */}
        <div className="px-4 pt-3 pb-2.5 border-b flex items-center gap-3"
          style={{ borderColor: dividerCol }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(10,124,255,0.12)", border: "1px solid rgba(10,124,255,0.25)" }}>
            <span className="text-primary text-[10px] font-mono font-bold">{project.id}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-snug truncate" style={{ color: textMain }}>{project.title}</p>
            <p className="text-[9px] font-mono mt-0.5" style={{ color: textSub }}>{project.role} · {project.year}</p>
          </div>
          {/* Link icons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="w-6 h-6 rounded flex items-center justify-center transition-colors duration-200"
                style={{ background: "rgba(10,124,255,0.1)", border: "1px solid rgba(10,124,255,0.3)", color: "#0A7CFF" }}>
                <ExternalLink size={10} />
              </a>
            )}
            {project.githubUrl !== "#" && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="w-6 h-6 rounded flex items-center justify-center transition-colors duration-200"
                style={{ background: "rgba(10,124,255,0.1)", border: "1px solid rgba(10,124,255,0.3)", color: "#0A7CFF" }}>
                <Github size={10} />
              </a>
            )}
            <a href={project.contactUrl}
              className="w-6 h-6 rounded flex items-center justify-center transition-colors duration-200"
              style={{ background: "rgba(10,124,255,0.1)", border: "1px solid rgba(10,124,255,0.3)", color: "#0A7CFF" }}>
              <Mail size={10} />
            </a>
          </div>
        </div>

        {/* ── Screenshot ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/8" }}>
          <Image src={project.image} alt={project.title} fill className="object-cover object-top"
            style={{ filter: imgFilter }} />
          <div className="absolute inset-x-0 top-0 h-4 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${isLight ? "rgba(255,255,255,0.3)" : "rgba(4,8,20,0.4)"}, transparent)` }} />
          <div className="absolute inset-x-0 bottom-0 h-8 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${isLight ? "rgba(255,255,255,0.6)" : "rgba(4,8,20,0.7)"}, transparent)` }} />
        </div>

        {/* ── Summary ── */}
        <div className="px-4 py-3 border-t"
          style={{ borderColor: footerBdr, background: footerBg }}>
          <p className="text-[11px] leading-relaxed font-mono" style={{ color: textMuted }}>
            {project.summary}
          </p>
        </div>

        {/* ── Tech tags ── */}
        <div className="px-4 py-2.5 border-t flex flex-wrap gap-1.5"
          style={{ borderColor: dividerCol }}>
          {project.tech.map(t => (
            <span key={t}
              className="text-[8px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded"
              style={{ color: tagColor, background: tagBg, border: `1px solid ${tagBdr}` }}>
              {t}
            </span>
          ))}
        </div>

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between px-4 py-2 border-t"
          style={{ borderColor: statusBdr, background: statusBg }}>
          <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: statusText }}>
            Signal Locked · {project.type}
          </span>
          <div className="flex items-center gap-3">
            {project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-100 transition-opacity duration-200"
                style={{ opacity: 0.9 }}
                onClick={e => e.stopPropagation()}>
                <ExternalLink size={14} style={{ color: "#0A7CFF" }} />
                <span className="text-sm font-mono font-semibold text-primary tracking-wide">
                  my.klamapp.com
                </span>
              </a>
            )}
            <div className="flex items-center gap-1.5">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-full animate-pulse"
                  style={{
                    width: i === 3 ? 14 : 5, height: 3,
                    background: "rgba(10,124,255,0.55)",
                    animationDelay: `${i * 200}ms`,
                  }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function WorkSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>(0.2);
  const orderedProjects = [...projects].reverse();

  return (
    <section id="projects" className="relative py-10 sm:py-12 lg:py-16">

      <div ref={headerRef} className="px-4 sm:px-6 lg:px-10 mb-8 sm:mb-10 lg:mb-12">
        <div className={`flex items-center gap-4 mb-5 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-primary/40 text-[10px] font-mono">01</span>
          <div className="h-px w-8 bg-border" />
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">
            Selected Engagements
          </span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-balance transition-all duration-700 delay-100 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-foreground">Delivered </span>
          <span className="text-muted-foreground/65">at enterprise standard</span>
        </h2>
      </div>

      {orderedProjects.length === 0 ? (
        <div className="px-6 lg:px-10 text-muted-foreground text-sm font-mono">No projects yet.</div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:gap-8" style={{ maxWidth: 860 }}>
            {orderedProjects.map(p => (
              <ProjectPanel key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
