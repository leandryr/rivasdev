"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { TrustedSection } from "@/components/trusted-section";

// ─── Constellation Canvas ─────────────────────────────────────────────────────

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const isLight = () => document.documentElement.classList.contains("light");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Background dust particles (many, spread everywhere) ──
    interface Dust {
      x: number; y: number; vx: number; vy: number;
      ox: number; oy: number; // origin for gentle return
      size: number; alpha: number; connected: boolean;
    }
    const DUST_COUNT = 220;
    const dust: Dust[] = Array.from({ length: DUST_COUNT }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x, y, ox: x, oy: y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: Math.random() * 2.2 + 0.4,
        alpha: Math.random() * 0.45 + 0.08,
        connected: Math.random() > 0.45,
      };
    });

    // ── Chaser swarm (orbit cursor tightly) ──
    interface Chaser {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; speed: number; angle: number;
    }
    const CHASER_COUNT = 140;
    const chasers: Chaser[] = Array.from({ length: CHASER_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0, vy: 0,
      size:  Math.random() * 2.6 + 0.7,
      alpha: Math.random() * 0.75 + 0.25,
      speed: Math.random() * 0.06 + 0.02,
      angle: Math.random() * Math.PI * 2,
    }));

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onMouse = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const lt = isLight();
      const baseColor = lt ? "10,96,210" : "10,124,255";

      // ── Dust: universal gravity toward mouse ──
      dust.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        // Wrap
        if (n.x < -10) n.x = canvas.width + 10;
        if (n.x > canvas.width + 10) n.x = -10;
        if (n.y < -10) n.y = canvas.height + 10;
        if (n.y > canvas.height + 10) n.y = -10;

        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = dx / dist, ny = dy / dist;

        // Weak universal gravity — affects ALL particles regardless of distance
        n.vx += nx * 0.0012;
        n.vy += ny * 0.0012;

        // Stronger pull when close
        if (dist < 600) {
          const f = Math.pow((600 - dist) / 600, 1.4) * 0.018;
          n.vx += nx * f;
          n.vy += ny * f;
        }

        // Speed cap + damping
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 3.5) { n.vx = (n.vx / speed) * 3.5; n.vy = (n.vy / speed) * 3.5; }
        n.vx *= 0.985; n.vy *= 0.985;

        // Proximity glow
        const proximity = Math.max(0, 1 - dist / 500);
        const a = n.alpha * (lt ? 0.7 : 1) * (0.35 + proximity * 0.65);

        if (proximity > 0.2) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 4);
          g.addColorStop(0, `rgba(${baseColor},${a * 0.55})`);
          g.addColorStop(1, `rgba(${baseColor},0)`);
          ctx.beginPath(); ctx.arc(n.x, n.y, n.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
        }

        ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor},${a})`; ctx.fill();
      });

      // ── Connections between nearby dust ──
      for (let i = 0; i < dust.length; i++) {
        if (!dust[i].connected) continue;
        for (let j = i + 1; j < dust.length; j++) {
          if (!dust[j].connected) continue;
          const dx = dust[i].x - dust[j].x, dy = dust[i].y - dust[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(dust[i].x, dust[i].y); ctx.lineTo(dust[j].x, dust[j].y);
            ctx.strokeStyle = `rgba(${baseColor},${(lt ? 0.12 : 0.055) * (1 - d / 120)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      // ── Chaser swarm: orbit mouse ──
      chasers.forEach((c) => {
        const dx = mouse.x - c.x, dy = mouse.y - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        c.angle += 0.016;
        const orbitR = 14 + c.size * 5;
        const tx = mouse.x + Math.cos(c.angle) * orbitR;
        const ty = mouse.y + Math.sin(c.angle) * orbitR;
        const tdx = tx - c.x, tdy = ty - c.y;
        const td  = Math.sqrt(tdx * tdx + tdy * tdy) || 1;
        const boost = dist < 180 ? 2.5 : 1;
        c.vx += (tdx / td) * c.speed * boost;
        c.vy += (tdy / td) * c.speed * boost;

        c.vx *= 0.87; c.vy *= 0.87;
        c.x  += c.vx; c.y  += c.vy;
        if (c.x < 0) c.x = canvas.width;
        if (c.x > canvas.width)  c.x = 0;
        if (c.y < 0) c.y = canvas.height;
        if (c.y > canvas.height) c.y = 0;

        const prox = Math.max(0, 1 - dist / 350);
        const a    = c.alpha * (lt ? 0.7 : 1) * (0.2 + prox * 0.8);

        if (prox > 0.1) {
          const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size * 5);
          g.addColorStop(0, `rgba(${baseColor},${a * 0.55})`);
          g.addColorStop(1, `rgba(${baseColor},0)`);
          ctx.beginPath(); ctx.arc(c.x, c.y, c.size * 5, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
        }

        ctx.beginPath(); ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor},${a})`; ctx.fill();
      });

      // Lines from nearest chasers to mouse
      chasers.forEach((c) => {
        const d = Math.sqrt((mouse.x - c.x) ** 2 + (mouse.y - c.y) ** 2);
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${baseColor},${0.2 * (1 - d / 100)})`; ctx.lineWidth = 0.6; ctx.stroke();
        }
      });

      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}

// ─── Shared Types & Utilities ─────────────────────────────────────────────────

type Token = { text: string; cls?: string };

function buildLineNums(lines: Token[][]): string[] {
  let n = 0;
  return lines.map(row => (row.length === 0 ? "" : String(++n)));
}

function LineRow({ tokens, lineNum, visible, showCursor }: {
  tokens: Token[]; lineNum: string; visible: boolean; showCursor: boolean;
}) {
  return (
    <div className={`flex items-center transition-all duration-[180ms] ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
      <span className="text-zinc-400 w-6 select-none text-right mr-5 text-[11px] flex-shrink-0">{lineNum}</span>
      <span className="text-foreground/80">{tokens.map((t, j) => <span key={j} className={t.cls || ""}>{t.text}</span>)}</span>
      {showCursor && <span className="ml-0.5 inline-block w-[2px] h-[14px] bg-primary animate-pulse" />}
    </div>
  );
}

function useTypingAnimation(lines: Token[][], startDelay = 200) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    setVisible(0);
    let i = 0;
    let tid: ReturnType<typeof setTimeout>;
    const next = () => {
      if (i >= lines.length) return;
      const d = lines[i].length === 0 ? 55 : 145;
      tid = setTimeout(() => { i++; setVisible(i); next(); }, d);
    };
    const sid = setTimeout(next, startDelay);
    return () => { clearTimeout(sid); clearTimeout(tid); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return visible;
}

function useCountUp(target: number, steps = 50) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    let i = 0;
    const id = setInterval(() => { i++; setVal(Math.round(target * i / steps)); if (i >= steps) clearInterval(id); }, 18);
    return () => clearInterval(id);
  }, [target, steps]);
  return val;
}

// ─── Scene 1: Code ────────────────────────────────────────────────────────────

const CODE: Token[][] = [
  [{ text: "import", cls: "text-blue-400" }, { text: " { useState, useEffect }" }, { text: " from", cls: "text-blue-400" }, { text: ' "react"', cls: "text-emerald-400" }],
  [{ text: "import", cls: "text-blue-400" }, { text: " { api }" }, { text: " from", cls: "text-blue-400" }, { text: ' "@/lib/client"', cls: "text-emerald-400" }],
  [],
  [{ text: "export function", cls: "text-blue-400" }, { text: " RevenueCard", cls: "text-yellow-400" }, { text: "() {" }],
  [{ text: "  const", cls: "text-blue-400" }, { text: " [mrr, setMrr] = " }, { text: "useState", cls: "text-yellow-400" }, { text: "<number>(0)" }],
  [],
  [{ text: "  useEffect", cls: "text-yellow-400" }, { text: "(() => {" }],
  [{ text: "    api" }, { text: ".metrics", cls: "text-primary" }, { text: "." }, { text: "get", cls: "text-yellow-400" }, { text: "().then(({ mrr }) =>" }],
  [{ text: "      " }, { text: "setMrr", cls: "text-yellow-400" }, { text: "(mrr))" }],
  [{ text: "  }, [])" }],
  [],
  [{ text: "  return", cls: "text-blue-400" }, { text: " <", cls: "text-primary" }, { text: "Card", cls: "text-yellow-400" }, { text: " value=", cls: "text-primary" }, { text: "{mrr}", cls: "text-emerald-400" }, { text: " />", cls: "text-primary" }],
  [{ text: "}" }],
];
const CODE_NUMS = buildLineNums(CODE);

function CodeScene() {
  const visible = useTypingAnimation(CODE, 180);
  return (
    <div className="px-6 py-5 font-mono text-[14px] leading-[2.1] h-[420px] overflow-hidden">
      {CODE.map((tokens, i) => (
        <LineRow key={i} tokens={tokens} lineNum={CODE_NUMS[i]} visible={i < visible} showCursor={i === visible - 1 && visible < CODE.length} />
      ))}
    </div>
  );
}

// ─── Scene 2: Dashboard ───────────────────────────────────────────────────────

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const BARS =   [36,    52,    44,    70,    63,    84,    100  ];

function Sparkline({ points, color }: { points: string; color: string }) {
  return (
    <svg viewBox="0 0 48 16" className="w-full h-3" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
    </svg>
  );
}

function DashboardScene() {
  const [ready, setReady] = useState(false);
  const mrr   = useCountUp(24200);
  const users = useCountUp(4280);
  const conv  = useCountUp(34);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="px-6 py-5 h-[420px] flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-zinc-400 font-mono uppercase tracking-widest">Revenue · 2025</span>
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Live
        </span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 flex-1">
        {MONTHS.map((m, i) => (
          <div key={m} className="flex flex-col items-center gap-1 flex-1">
            <div className="relative w-full" style={{ height: "100px" }}>
              <div
                className="absolute bottom-0 w-full rounded-t transition-all duration-700 ease-out"
                style={{
                  height: ready ? `${BARS[i]}%` : "0%",
                  transitionDelay: `${i * 65}ms`,
                  background: i === 6 ? "rgba(10,124,255,1)" : `rgba(10,124,255,${0.18 + i * 0.08})`,
                  boxShadow: i === 6 ? "0 0 18px rgba(10,124,255,0.6)" : undefined,
                }}
              />
            </div>
            <span className="text-[9px] text-zinc-400 font-mono">{m}</span>
          </div>
        ))}
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "MRR",   value: `$${(mrr / 1000).toFixed(1)}k`,   change: "+12%", color: "text-emerald-400", spark: "0,14 8,11 16,12 24,7 32,9 40,4 48,1", sparkColor: "#34d399" },
          { label: "Users", value: `${(users / 1000).toFixed(1)}k`,  change: "+8%",  color: "text-emerald-400", spark: "0,14 8,12 16,10 24,8 32,6 40,4 48,2",  sparkColor: "#34d399" },
          { label: "Conv.", value: `${(conv / 10).toFixed(1)}%`,      change: "+0.3", color: "text-primary",     spark: "0,14 8,13 16,11 24,9 32,7 40,5 48,3",  sparkColor: "#0a7cff" },
        ].map(m => (
          <div key={m.label} className="bg-foreground/[0.03] border border-foreground/[0.06] rounded-xl px-3 py-2.5">
            <div className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">{m.label}</div>
            <div className="text-xl font-bold text-foreground leading-tight mt-0.5">{m.value}</div>
            <Sparkline points={m.spark} color={m.sparkColor} />
            <div className={`text-[10px] font-mono mt-0.5 ${m.color}`}>{m.change} ↑</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Scene 3: API / Deploy ────────────────────────────────────────────────────

const API: Token[][] = [
  [{ text: "POST ", cls: "text-orange-400" }, { text: "/api/v1/", cls: "text-zinc-300" }, { text: "deploy", cls: "text-foreground" }],
  [{ text: "Authorization", cls: "text-primary" }, { text: ": Bearer ", cls: "text-zinc-300" }, { text: "sk-rt••••••7a2f", cls: "text-emerald-400" }],
  [],
  [{ text: "{", cls: "text-zinc-300" }],
  [{ text: '  "status"',  cls: "text-primary" }, { text: ": ", cls: "text-zinc-300" }, { text: '"deployed"',   cls: "text-emerald-400" }, { text: ",", cls: "text-zinc-300" }],
  [{ text: '  "env"',     cls: "text-primary" }, { text: ": ", cls: "text-zinc-300" }, { text: '"production"', cls: "text-emerald-400" }, { text: ",", cls: "text-zinc-300" }],
  [{ text: '  "version"', cls: "text-primary" }, { text: ": ", cls: "text-zinc-300" }, { text: '"3.2.1"',      cls: "text-yellow-400"  }, { text: ",", cls: "text-zinc-300" }],
  [{ text: '  "regions"', cls: "text-primary" }, { text: ": ", cls: "text-zinc-300" }, { text: "12",           cls: "text-orange-400"  }, { text: ",", cls: "text-zinc-300" }],
  [{ text: '  "latency"', cls: "text-primary" }, { text: ": ", cls: "text-zinc-300" }, { text: '"< 50ms"',     cls: "text-emerald-400" }],
  [{ text: "}", cls: "text-zinc-300" }],
];
const API_NUMS = buildLineNums(API);

function ApiScene() {
  const visible = useTypingAnimation(API, 140);
  const done = visible >= API.length;

  return (
    <div className="px-6 py-5 font-mono text-[14px] leading-[2.1] h-[420px]">
      <div className={`flex items-center gap-2 mb-3 transition-all duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
        <span className="px-2.5 py-1 rounded text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-bold">200 OK</span>
        <span className="text-zinc-400 text-[12px]">42ms</span>
        <span className="ml-auto text-zinc-400 text-[11px]">application/json</span>
      </div>
      {API.map((tokens, i) => (
        <LineRow key={i} tokens={tokens} lineNum={API_NUMS[i]} visible={i < visible} showCursor={i === visible - 1 && visible < API.length} />
      ))}
    </div>
  );
}

// ─── Tech Card (cycles scenes) ────────────────────────────────────────────────

type SceneId = "code" | "dashboard" | "api";

const SCENES: { id: SceneId; file: string }[] = [
  { id: "code",      file: "Revenue.tsx" },
  { id: "dashboard", file: "dashboard.ts" },
  { id: "api",       file: "api.json"   },
];

const STATUS: Record<SceneId, { dot: string; label: string; labelColor: string; right: string }> = {
  code:      { dot: "bg-emerald-400", label: "Compiled successfully", labelColor: "text-emerald-400", right: "TypeScript" },
  dashboard: { dot: "bg-primary",     label: "MRR $24.2k · Live",     labelColor: "text-primary",     right: "Analytics"  },
  api:       { dot: "bg-emerald-400", label: "200 OK · 42ms",          labelColor: "text-emerald-400", right: "REST API"   },
};


const CYCLE_MS = 7000;

function TechCard({ loaded }: { loaded: boolean }) {
  const [idx, setIdx]       = useState(0);
  const [key, setKey]       = useState(0);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme }   = useTheme();
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";

  const switchTo = (next: number) => {
    setFading(true);
    setTimeout(() => {
      setIdx(next);
      setKey(k => k + 1);
      setFading(false);
    }, 320);
  };

  useEffect(() => {
    if (!loaded) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx(prev => { const n = (prev + 1) % SCENES.length; return n; });
        setKey(k => k + 1);
        setFading(false);
      }, 320);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [loaded]);

  const scene = SCENES[idx];
  const st    = STATUS[scene.id];

  return (
    <div className={`relative transition-all duration-1000 delay-[600ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
      {/* Glow */}
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-[0.18]" style={{ background: "radial-gradient(ellipse at center,rgba(10,124,255,.8) 0%,transparent 70%)", filter: "blur(40px)", transform: "scale(.82)" }} aria-hidden="true" />

      {/* Card */}
      <div
        className="rounded-xl overflow-hidden backdrop-blur-xl transition-all duration-500"
        style={{
          border:     isLight ? "1px solid rgba(10,30,80,0.1)"   : "1px solid rgba(255,255,255,0.07)",
          background: isLight ? "rgba(252,253,255,0.97)"          : "rgba(6,11,24,0.92)",
          boxShadow:  isLight
            ? "0 4px 32px rgba(10,100,200,0.12), 0 1px 4px rgba(0,0,0,0.06)"
            : "0 0 70px rgba(0,0,0,0.65)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-6 py-4 transition-colors duration-500"
          style={{
            borderBottom: isLight ? "1px solid rgba(10,30,80,0.08)" : "1px solid rgba(255,255,255,0.06)",
            background:   isLight ? "rgba(244,246,252,0.9)"          : "rgba(255,255,255,0.015)",
          }}
        >
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            {SCENES.map((s, i) => (
              <button key={s.id} onClick={() => switchTo(i)}
                className={`text-[11px] font-mono px-3.5 py-1.5 rounded-md transition-all duration-200 ${
                  i === idx
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : isLight
                      ? "text-foreground/60 hover:text-foreground border border-transparent"
                      : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                }`}>
                {s.file}
              </button>
            ))}
          </div>
        </div>

        {/* Scene */}
        <div className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>
          {scene.id === "code"      && <CodeScene      key={key} />}
          {scene.id === "dashboard" && <DashboardScene key={key} />}
          {scene.id === "api"       && <ApiScene       key={key} />}
        </div>

        {/* Status bar */}
        <div
          className="flex items-center gap-2 px-6 py-4 transition-colors duration-500"
          style={{
            borderTop:  isLight ? "1px solid rgba(10,30,80,0.08)" : "1px solid rgba(255,255,255,0.06)",
            background: isLight ? "rgba(244,246,252,0.9)"          : "rgba(255,255,255,0.015)",
          }}
        >
          <div className={`w-2 h-2 rounded-full animate-pulse flex-shrink-0 ${st.dot}`} />
          <span className={`text-[11px] font-mono ${st.labelColor}`}>{st.label}</span>
          <span className={`ml-auto text-[11px] font-mono flex-shrink-0 ${isLight ? "text-foreground/70" : "text-zinc-400"}`}>{st.right}</span>
          <div className="flex items-center gap-1.5 ml-3">
            {SCENES.map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${i === idx ? "w-5 h-1.5 bg-primary" : `w-1.5 h-1.5 ${isLight ? "bg-foreground/30" : "bg-zinc-700"}`}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const [loaded, setLoaded]     = useState(false);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 150);
    const t2 = setTimeout(() => setLineWidth(100), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center blueprint-grid overflow-hidden">
      <ConstellationCanvas />

      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-border/30" aria-hidden="true" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-border/30" aria-hidden="true" />

      <div className="relative z-10 w-full px-6 lg:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left content */}
          <div className="lg:col-span-5">
            <div className={`flex items-center gap-4 mb-10 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="h-px bg-primary transition-all duration-1000 ease-out" style={{ width: `${lineWidth}px` }} />
              <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">Enterprise Engineering Partner</span>
            </div>

            <h1 className="text-balance">
              <span className={`block transition-all duration-700 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-[-0.04em] leading-[0.95] text-foreground">Rivas</span>
              </span>
              <span className={`block transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-[-0.04em] leading-[0.95] text-primary">Technologies</span>
              </span>
            </h1>

            <p className={`mt-6 text-muted-foreground/90 text-sm sm:text-base font-light tracking-wide transition-all duration-700 delay-[350ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Engineering partner for companies{" "}
              <span className="text-foreground/70 font-medium">building at scale</span>
            </p>

            <div className={`my-10 h-px bg-border transition-all duration-1000 delay-400 ${loaded ? "w-full opacity-100" : "w-0 opacity-0"}`} />

            <p className={`text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              We serve as the engineering backbone for product leaders who need to move fast and scale without compromise. Architecture, execution, and delivery — fully aligned from day one to production.
            </p>

            <div className={`mt-10 flex items-center gap-4 transition-all duration-700 delay-[650ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <a href="#contact" data-cursor-hover className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300">
                Start an Engagement
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#projects" data-cursor-hover className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors duration-300">
                View our work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>

          {/* Right: Tech card */}
          <div className="hidden lg:flex lg:col-span-7 items-center justify-end">
            <div className="w-full">
              <TechCard loaded={loaded} />
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-20 left-6 lg:left-10 flex items-center gap-3 transition-all duration-700 delay-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <div className="w-px h-10 bg-border relative overflow-hidden">
            <div className="w-full h-3 bg-primary absolute animate-bounce" />
          </div>
        </div>
      </div>

      {/* Trusted logos strip — pinned to bottom of hero viewport */}
      <div className={`absolute bottom-0 left-0 right-0 transition-all duration-700 delay-[800ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <TrustedSection />
      </div>
    </section>
  );
}
