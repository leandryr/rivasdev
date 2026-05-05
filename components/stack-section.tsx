"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Monitor, Smartphone, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

// ─── Tech SVG Icons ────────────────────────────────────────────────────────────

function IconReact({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0A7CFF" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0A7CFF" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0A7CFF" strokeWidth="1.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#0A7CFF" />
    </svg>
  );
}
function IconNextjs({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 8l8 9M8 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconTypeScript({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#0A7CFF" fillOpacity="0.2" stroke="#0A7CFF" strokeWidth="1.2" />
      <path d="M7 10h4M9 10v7" stroke="#0A7CFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 14c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2" stroke="#0A7CFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconTailwind({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 10c.5-2 1.8-3 4-3 4 0 4 4 8 4 2.2 0 3.5-1 4-3" stroke="#0A7CFF" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 16c.5-2 1.8-3 4-3 4 0 4 4 8 4 2.2 0 3.5-1 4-3" stroke="#0A7CFF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconNode({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L21 7v10l-9 5-9-5V7z" stroke="#10B981" strokeWidth="1.2" />
      <path d="M12 7v10M7 9.5l5 2.5 5-2.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function IconLaravel({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l10 5.5v11L12 22 2 17.5v-11z" stroke="#10B981" strokeWidth="1.2" />
      <path d="M12 2v20M2 6.5l10 5.5 10-5.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function IconGraphQL({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" stroke="#10B981" strokeWidth="1.2" />
      <circle cx="12" cy="3" r="1.5" fill="#10B981" />
      <circle cx="20" cy="7.5" r="1.5" fill="#10B981" />
      <circle cx="20" cy="16.5" r="1.5" fill="#10B981" />
      <circle cx="12" cy="21" r="1.5" fill="#10B981" />
      <circle cx="4" cy="16.5" r="1.5" fill="#10B981" />
      <circle cx="4" cy="7.5" r="1.5" fill="#10B981" />
    </svg>
  );
}
function IconRestApi({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="6" rx="2" stroke="#10B981" strokeWidth="1.2" />
      <rect x="2" y="14" width="20" height="6" rx="2" stroke="#10B981" strokeWidth="1.2" />
      <path d="M7 7h4M7 17h4" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="18" cy="7" r="1.5" fill="#10B981" />
      <circle cx="18" cy="17" r="1.5" fill="#f87171" />
    </svg>
  );
}
function IconPostgres({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="#F59E0B" strokeWidth="1.2" />
    </svg>
  );
}
function IconMySQL({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="7" rx="8" ry="3" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" stroke="#F59E0B" strokeWidth="1.2" />
    </svg>
  );
}
function IconMongo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2c0 0-6 5.4-6 11a6 6 0 0012 0c0-5.6-6-11-6-11z" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M12 14v8" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconRedis({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l2.5 5H20l-4.5 3.5 1.8 5.5L12 14l-5.3 3 1.8-5.5L4 8h5.5z" stroke="#F59E0B" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
function IconDocker({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="10" width="4" height="4" rx="0.5" stroke="#8B5CF6" strokeWidth="1.2" />
      <rect x="7" y="10" width="4" height="4" rx="0.5" stroke="#8B5CF6" strokeWidth="1.2" />
      <rect x="12" y="10" width="4" height="4" rx="0.5" stroke="#8B5CF6" strokeWidth="1.2" />
      <rect x="7" y="5"  width="4" height="4" rx="0.5" stroke="#8B5CF6" strokeWidth="1.2" />
      <rect x="12" y="5" width="4" height="4" rx="0.5" stroke="#8B5CF6" strokeWidth="1.2" />
      <path d="M2 16c2 3 6 4 10 2.5s9-1 11-3" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M19 10c1-2 3-2 3-2s0 2-1 3" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function IconKubernetes({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#8B5CF6" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2.5" fill="#8B5CF6" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function IconAWS({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 16.5C4 16 2 14 2 11.5c0-2 1.5-3.8 3.5-4.3C6 5 8 3 10.5 3c2 0 3.8 1.2 4.5 3C17.5 6 20 8.5 20 11.5c0 2.8-2.2 5-5 5" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 20l2-2-2-2M17 20l-2-2 2-2M9 20h6" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCloudRun({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 14C4 13.5 2 12 2 9.5c0-2.2 1.6-4 3.8-4.4C6.5 3 8.5 2 11 2c2.2 0 4.2 1.3 5 3 2.5.2 4 2 4 4 0 2.4-2 4.5-4.5 5" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 17l3-3-3-3v6z" fill="#8B5CF6" stroke="#8B5CF6" strokeWidth="0.5" />
      <path d="M13 22v-4" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function IconGithub({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1-.3-3.3 1.3a11.5 11.5 0 00-6 0C6.5 2.8 5.5 3.1 5.5 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCICD({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#8B5CF6" strokeWidth="1.2" />
      <path d="M12 5V2M12 22v-3M5 12H2M22 12h-3" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 4a10 10 0 0116 0" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function IconNginx({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7z" stroke="#8B5CF6" strokeWidth="1.2" />
      <path d="M8 8l8 8M8 16V8" stroke="#8B5CF6" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconLinux({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C9 2 7 6 7 10c0 2 .5 4 1 5l-3 3c-.5.5-.5 1 0 1.5L7 21c.5.5 1 .5 1.5 0L12 18l3.5 3c.5.5 1 .5 1.5 0l2-1.5c.5-.5.5-1 0-1.5l-3-3c.5-1 1-3 1-5 0-4-2-8-5-8z" stroke="#8B5CF6" strokeWidth="1.2" />
      <circle cx="9.5" cy="10" r="1" fill="#8B5CF6" />
      <circle cx="14.5" cy="10" r="1" fill="#8B5CF6" />
      <path d="M10 13.5c.5.5 1 .7 2 .7s1.5-.2 2-.7" stroke="#8B5CF6" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

const TECH_ICONS: Record<string, React.FC<{ size?: number }>> = {
  "React": IconReact, "Next.js": IconNextjs, "TypeScript": IconTypeScript,
  "Tailwind": IconTailwind, "Node.js": IconNode, "Laravel": IconLaravel,
  "GraphQL": IconGraphQL, "REST API": IconRestApi, "PostgreSQL": IconPostgres,
  "MySQL": IconMySQL, "MongoDB": IconMongo, "Redis": IconRedis,
  "Docker": IconDocker, "Kubernetes": IconKubernetes, "AWS": IconAWS,
  "Cloud Run": IconCloudRun, "GitHub": IconGithub, "CI/CD": IconCICD,
  "Nginx": IconNginx, "Linux": IconLinux,
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type Category = "client" | "frontend" | "backend" | "database" | "cloud";

interface TechNode {
  name: string; category: Category;
  x: number; y: number; desc: string;
}

const NODES: TechNode[] = [
  // Client — left column
  { name: "Browser",    category: "client",   x: 3,  y: 20, desc: "Web browsers (Chrome, Firefox, Safari)" },
  { name: "Mobile App", category: "client",   x: 3,  y: 50, desc: "iOS & Android native apps"             },
  { name: "Desktop",    category: "client",   x: 3,  y: 78, desc: "Desktop & PWA applications"            },
  // Frontend
  { name: "React",      category: "frontend", x: 16, y: 30, desc: "UI component library"    },
  { name: "Next.js",    category: "frontend", x: 26, y: 18, desc: "React meta-framework"    },
  { name: "TypeScript", category: "frontend", x: 18, y: 52, desc: "Typed JavaScript"        },
  { name: "Tailwind",   category: "frontend", x: 11, y: 72, desc: "Utility-first CSS"       },
  // Backend
  { name: "Node.js",    category: "backend",  x: 42, y: 35, desc: "JS server runtime"       },
  { name: "Laravel",    category: "backend",  x: 51, y: 22, desc: "PHP MVC framework"       },
  { name: "GraphQL",    category: "backend",  x: 43, y: 57, desc: "API query language"      },
  { name: "REST API",   category: "backend",  x: 59, y: 28, desc: "HTTP API standard"       },
  // Database
  { name: "PostgreSQL", category: "database", x: 67, y: 22, desc: "Relational database"     },
  { name: "MySQL",      category: "database", x: 76, y: 18, desc: "SQL database engine"     },
  { name: "MongoDB",    category: "database", x: 74, y: 42, desc: "Document store"          },
  { name: "Redis",      category: "database", x: 63, y: 58, desc: "In-memory cache layer"   },
  // Cloud / Infra
  { name: "Docker",     category: "cloud",    x: 84, y: 28, desc: "Container runtime"       },
  { name: "Kubernetes", category: "cloud",    x: 92, y: 18, desc: "Container orchestration" },
  { name: "AWS",        category: "cloud",    x: 93, y: 45, desc: "Cloud infrastructure"    },
  { name: "Cloud Run",  category: "cloud",    x: 85, y: 60, desc: "Serverless containers"   },
  { name: "GitHub",     category: "cloud",    x: 32, y: 74, desc: "Version control"         },
  { name: "CI/CD",      category: "cloud",    x: 51, y: 82, desc: "Automated pipelines"     },
  { name: "Nginx",      category: "cloud",    x: 68, y: 76, desc: "Reverse proxy"           },
  { name: "Linux",      category: "cloud",    x: 80, y: 82, desc: "Server OS"              },
];

// idx: 0=Browser 1=MobileApp 2=Desktop 3=React 4=Next.js 5=TS 6=Tailwind
//      7=Node 8=Laravel 9=GraphQL 10=REST 11=PG 12=MySQL 13=Mongo 14=Redis
//      15=Docker 16=K8s 17=AWS 18=CloudRun 19=GitHub 20=CICD 21=Nginx 22=Linux
// idx: 0=Browser 1=MobileApp 2=Desktop 3=React 4=Next.js 5=TypeScript 6=Tailwind
//      7=Node.js 8=Laravel 9=GraphQL 10=REST 11=PostgreSQL 12=MySQL 13=MongoDB 14=Redis
//      15=Docker 16=Kubernetes 17=AWS 18=CloudRun 19=GitHub 20=CICD 21=Nginx 22=Linux
const EDGES: [number, number][] = [
  // Clients → Frontend (all clients reach frontend)
  [0, 3], [0, 4], [1, 3], [1, 5], [2, 4], [2, 6],
  // Frontend internal
  [3, 4], [3, 5], [4, 5], [5, 6], [3, 6],
  // Frontend → Backend
  [3, 7], [4, 7], [4, 10], [5, 7], [5, 9],
  // Backend internal
  [7, 8], [7, 9], [7, 10], [8, 10], [9, 10],
  // Backend → Database
  [7, 11], [7, 13], [7, 14], [8, 11], [8, 12], [9, 13], [10, 11], [10, 12],
  // Database internal
  [11, 12], [11, 14], [13, 14],
  // Database → Cloud
  [11, 15], [12, 15], [13, 18], [14, 18], [14, 15],
  // Cloud infra
  [15, 16], [15, 17], [15, 18], [16, 17], [17, 18], [17, 22], [18, 21], [21, 22],
  // CI/CD pipeline (GitHub → CI/CD → Docker/Nginx/Linux)
  [19, 20], [20, 15], [20, 21], [20, 22], [6, 19], [8, 19],
  // Cross-links (Nginx load balances to Node/Laravel, Linux hosts everything)
  [21, 7], [22, 15], [22, 16], [17, 16],
];

const CAT_COLORS: Record<Category, string> = {
  client:   "#94A3B8",
  frontend: "#0A7CFF",
  backend:  "#10B981",
  database: "#F59E0B",
  cloud:    "#8B5CF6",
};

const CAT_LABELS: Record<Category, string> = {
  client:   "Clients",
  frontend: "Frontend",
  backend:  "Backend",
  database: "Database",
  cloud:    "Cloud & Infra",
};

const FILTER_CATS: Category[] = ["frontend", "backend", "database", "cloud"];

function rgb(hex: string) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}

// ─── Constellation Canvas ─────────────────────────────────────────────────────

function TechConstellation({ filter, isLight }: { filter: Category | null; isLight: boolean }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const stateRef     = useRef({
    hovered: null as number | null,
    pinned:  null as number | null,
    filter:  null as Category | null,
    isLight: false,
  });

  const [hovered,    setHovered]    = useState<number | null>(null);
  const [pinned,     setPinned]     = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ w: 900, h: 560 });

  useEffect(() => { stateRef.current.hovered = hovered; }, [hovered]);
  useEffect(() => { stateRef.current.pinned  = pinned;  }, [pinned]);
  useEffect(() => { stateRef.current.filter  = filter;  }, [filter]);
  useEffect(() => { stateRef.current.isLight = isLight; }, [isLight]);

  const getPos = useCallback((node: TechNode) => ({
    x: (node.x / 100) * dimensions.w,
    y: (node.y / 100) * dimensions.h,
  }), [dimensions]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ w: width, h: height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = dimensions.w * dpr;
    canvas.height = dimensions.h * dpr;
    ctx.scale(dpr, dpr);

    let time = 0, raf: number;

    interface Pulse { edge: number; t: number; speed: number; }
    const pulses: Pulse[] = [];
    const spawn = () => pulses.push({ edge: Math.floor(Math.random() * EDGES.length), t: 0, speed: 0.003 + Math.random() * 0.004 });
    for (let i = 0; i < 10; i++) spawn();

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.w, dimensions.h);
      time += 0.008;
      const { hovered, pinned, filter, isLight: lt } = stateRef.current;
      const active = pinned ?? hovered;

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed;
        if (pulses[i].t > 1.15) pulses.splice(i, 1);
      }
      if (pulses.length < 14 && Math.random() < 0.07) spawn();

      // ── Edges ──
      EDGES.forEach(([a, b]) => {
        const pa = getPos(NODES[a]), pb = getPos(NODES[b]);
        const connAct   = active !== null && (active === a || active === b);
        const filtMatch = filter !== null && NODES[a].category === filter && NODES[b].category === filter;
        const filtDim   = filter !== null && !filtMatch;

        let alpha = lt ? 0.40 : 0.06, lw = lt ? 1.2 : 0.6, c = "10,124,255";
        if (connAct)        { alpha = lt ? 0.85 : 0.45; lw = 2.5; c = rgb(CAT_COLORS[NODES[active!].category]); }
        else if (filtMatch) { alpha = lt ? 0.65 : 0.3;  lw = lt ? 1.6 : 1.1; c = rgb(CAT_COLORS[filter!]); }
        else if (filtDim)   { alpha = lt ? 0.06 : 0.015; }

        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(${c},${alpha})`; ctx.lineWidth = lw; ctx.stroke();
      });

      // ── Pulses ──
      pulses.forEach((p) => {
        if (p.edge >= EDGES.length) return;
        const [a, b] = EDGES[p.edge];
        const pa = getPos(NODES[a]), pb = getPos(NODES[b]);
        const px = pa.x + (pb.x - pa.x) * p.t;
        const py = pa.y + (pb.y - pa.y) * p.t;
        const isAct  = active !== null && (active === a || active === b);
        const isFilt = filter !== null && (NODES[a].category === filter || NODES[b].category === filter);
        const c      = rgb(CAT_COLORS[NODES[a].category]);
        const al     = isAct ? 1 : isFilt ? (lt ? 0.95 : 0.6) : (lt ? 0.75 : 0.22);
        const r      = isAct ? 5 : lt ? 3.5 : 2;
        const g = ctx.createRadialGradient(px, py, 0, px, py, r * 5);
        g.addColorStop(0, `rgba(${c},${al * 0.7})`); g.addColorStop(1, `rgba(${c},0)`);
        ctx.beginPath(); ctx.arc(px, py, r * 5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${c},${al})`; ctx.fill();
      });

      // ── Nodes ──
      NODES.forEach((node, i) => {
        const pos    = getPos(node);
        const isAct  = active === i;
        const isConn = active !== null && active !== i && EDGES.some(([a,b]) => (a===active&&b===i)||(b===active&&a===i));
        const isFilt = filter !== null && node.category === filter;
        const isDim  = filter !== null && !isFilt;
        const c      = rgb(CAT_COLORS[node.category]);
        const pulse  = Math.sin(time + i * 0.9) * 0.2 + 0.8;

        let op = (lt ? 0.9 : 0.45) * pulse, r = lt ? 5.5 : 3.5;
        if (isAct)       { op = 1;    r = 8; }
        else if (isConn) { op = 1;    r = lt ? 6.5 : 5; }
        else if (isFilt) { op = 1;    r = lt ? 6 : 4.5; }
        else if (isDim)  { op = lt ? 0.15 : 0.08; r = 2.5; }

        if (isAct) {
          const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 44);
          g.addColorStop(0, `rgba(${c},${lt ? 0.35 : 0.22})`); g.addColorStop(1, `rgba(${c},0)`);
          ctx.beginPath(); ctx.arc(pos.x, pos.y, 44, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        }
        if (isAct || isConn || isFilt) {
          const g2 = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 18);
          g2.addColorStop(0, `rgba(${c},${op * (lt ? 0.5 : 0.35)})`); g2.addColorStop(1, `rgba(${c},0)`);
          ctx.beginPath(); ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2); ctx.fillStyle = g2; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},${op})`; ctx.fill();
        // Center dot: dark on light, white on dark
        ctx.beginPath(); ctx.arc(pos.x, pos.y, Math.max(1, r * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = lt ? `rgba(10,10,20,${op * 0.7})` : `rgba(255,255,255,${op * 0.9})`; ctx.fill();
      });

      // ── Mouse beams ──
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      if (mx > 0 && mx < dimensions.w) {
        NODES.forEach((node, i) => {
          if (hovered === i || pinned === i) return;
          const pos = getPos(node);
          const d = Math.sqrt((mx - pos.x) ** 2 + (my - pos.y) ** 2);
          if (d < 140 && d > 14) {
            ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = `rgba(${rgb(CAT_COLORS[node.category])},${(lt ? 0.15 : 0.06) * (1 - d/140)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [dimensions, getPos]);

  const findNode = useCallback((x: number, y: number) => {
    let found = -1;
    NODES.forEach((node, i) => {
      const pos = getPos(node);
      if (Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2) < 30) found = i;
    });
    return found >= 0 ? found : null;
  }, [getPos]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    mouseRef.current = { x, y };
    const next = findNode(x, y);
    stateRef.current.hovered = next;
    setHovered(next);
  }, [findNode]);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
    stateRef.current.hovered = null;
    setHovered(null);
  }, []);

  const onClick = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clicked = findNode(e.clientX - rect.left, e.clientY - rect.top);
    setPinned((prev) => {
      const next = prev === clicked ? null : clicked;
      stateRef.current.pinned = next;
      return next;
    });
  }, [findNode]);

  const active = pinned ?? hovered;

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-crosshair"
      style={{ height: 540 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Node icon cards */}
      {NODES.map((node, i) => {
        const pos    = getPos(node);
        const isAct  = active === i;
        const isConn = active !== null && active !== i && EDGES.some(([a,b]) => (a===active&&b===i)||(b===active&&a===i));
        const isFilt = filter !== null && node.category === filter;
        const isDim  = filter !== null && !isFilt;
        const op     = isAct ? 1 : isConn ? 1 : isDim ? (isLight ? 0.15 : 0.12) : isFilt ? 1 : (isLight ? 0.85 : 1);
        const color  = CAT_COLORS[node.category];
        const Icon   = TECH_ICONS[node.name];
        const isClient = node.category === "client";

        return (
          <div
            key={node.name}
            className="absolute pointer-events-none select-none transition-all duration-300 flex flex-col items-center gap-1"
            style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -220%)", opacity: op }}
          >
            {/* Icon badge */}
            <div className="rounded-lg p-1.5 flex items-center justify-center transition-all duration-300"
              style={{
                background: isAct ? `${color}40` : isLight ? `${color}28` : `${color}22`,
                border:     `1px solid ${color}${isAct ? "90" : isLight ? "70" : "55"}`,
                boxShadow:  isAct ? `0 0 16px ${color}60` : isLight ? `0 2px 8px ${color}30` : `0 0 8px ${color}25`,
              }}>
              {isClient ? (
                node.name === "Browser"    ? <Globe      size={16} style={{ color }} /> :
                node.name === "Mobile App" ? <Smartphone size={16} style={{ color }} /> :
                                              <Monitor    size={16} style={{ color }} />
              ) : Icon ? <Icon size={16} style={{ color }} /> : (
                <span className="text-[10px] font-bold font-mono" style={{ color }}>{node.name.slice(0, 2)}</span>
              )}
            </div>
            {/* Name label */}
            <span className="text-[9px] font-mono uppercase tracking-wider whitespace-nowrap font-semibold"
              style={{ color: isAct ? color : isLight ? "#050508" : "#FFFFFF" }}>
              {node.name}
            </span>
          </div>
        );
      })}

      {/* Tooltip */}
      {active !== null && (() => {
        const node      = NODES[active];
        const pos       = getPos(node);
        const connEdges = EDGES.filter(([a, b]) => a === active || b === active);
        const connNames = connEdges.map(([a, b]) => NODES[a === active ? b : a].name);
        const color     = CAT_COLORS[node.category];
        const Icon      = TECH_ICONS[node.name];
        const isClient  = node.category === "client";

        return (
          <div
            className="absolute pointer-events-none z-20 transition-all duration-150"
            style={{
              left: Math.min(pos.x + 28, dimensions.w - 235),
              top:  Math.max(pos.y - 100, 40),
            }}
          >
            <div className="rounded-xl px-4 py-3 shadow-2xl backdrop-blur-xl" style={{
              background: isLight ? "rgba(255,255,255,0.97)" : "rgba(6,11,24,0.95)",
              border:     `1px solid ${isLight ? color + "35" : color + "28"}`,
              minWidth:   200,
              boxShadow:  isLight ? `0 8px 32px rgba(0,0,0,0.12), 0 2px 8px ${color}15` : undefined,
            }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg p-2 flex-shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  {isClient ? (
                    node.name === "Browser"    ? <Globe      size={18} style={{ color }} /> :
                    node.name === "Mobile App" ? <Smartphone size={18} style={{ color }} /> :
                                                 <Monitor    size={18} style={{ color }} />
                  ) : Icon ? <Icon size={18} /> : null}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: isLight ? "#050508" : undefined }}>{node.name}</div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.3em] mt-0.5" style={{ color }}>{CAT_LABELS[node.category]}</div>
                </div>
              </div>
              <div className="text-[11px]" style={{ color: isLight ? "#050508" : "rgba(210,215,232,0.88)" }}>{node.desc}</div>
              <div className="h-px my-2.5" style={{ background: isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.05)" }} />
              <div className="text-[10px] font-mono" style={{ color: isLight ? "#050508" : "rgba(185,190,210,0.75)" }}>{connEdges.length} connections</div>
              {pinned !== null && connNames.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {connNames.slice(0, 8).map((n) => (
                    <span key={n} className="text-[9px] px-1.5 py-0.5 rounded font-mono font-medium"
                      style={{ background: `${color}15`, color: color, border: `1px solid ${color}30` }}>
                      {n}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function StackSection() {
  const [filter, setFilter]   = useState<Category | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme }     = useTheme();
  const { ref, isVisible }    = useScrollReveal<HTMLDivElement>(0.1);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";

  return (
    <section id="tech" className="relative py-12 lg:py-16 px-6 lg:px-10">
      <div ref={ref}>
        <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-primary/40 text-[10px] font-mono">04</span>
          <div className="h-px w-8 bg-border" />
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">Engineering Infrastructure</span>
        </div>

        <div className="flex items-start justify-between gap-8 flex-wrap mb-8">
          <div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-foreground">Technology </span>
              <span className="text-muted-foreground/65">infrastructure</span>
            </h2>
            <p className={`mt-3 text-muted-foreground/85 text-sm max-w-sm transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Battle-tested stack built for horizontally scalable, production-grade systems.
            </p>
          </div>

          <div className={`flex gap-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {FILTER_CATS.map((cat) => {
              const count = NODES.filter((n) => n.category === cat).length;
              return (
                <div key={cat} className="text-right">
                  <div className="text-2xl font-bold tabular-nums" style={{ color: CAT_COLORS[cat] }}>{count}</div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/75 mt-0.5">{CAT_LABELS[cat]}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`flex flex-wrap gap-2 mb-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button onClick={() => setFilter(null)}
            className="px-4 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider border transition-all duration-200"
            style={filter === null ? {
              background:   isLight ? "rgba(10,96,230,0.1)"   : "rgba(255,255,255,0.07)",
              borderColor:  isLight ? "rgba(10,96,230,0.3)"   : "rgba(255,255,255,0.15)",
              color:        isLight ? "#0060E6"                : "rgba(229,231,235,0.8)",
            } : {
              borderColor: isLight ? "rgba(10,20,60,0.15)"  : "rgba(255,255,255,0.07)",
              color:       isLight ? "#050508"               : "rgba(185,190,210,0.72)",
            }}>
            All · {NODES.length}
          </button>
          {FILTER_CATS.map((cat) => {
            const count  = NODES.filter((n) => n.category === cat).length;
            const active = filter === cat;
            return (
              <button key={cat}
                onClick={() => setFilter((prev) => (prev === cat ? null : cat))}
                className="px-4 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider border transition-all duration-200"
                style={active ? {
                  backgroundColor: `${CAT_COLORS[cat]}18`,
                  borderColor:     `${CAT_COLORS[cat]}45`,
                  color:            CAT_COLORS[cat],
                  fontWeight:      "600",
                } : {
                  borderColor: isLight ? "rgba(10,20,60,0.15)"  : "rgba(255,255,255,0.07)",
                  color:       isLight ? "#050508"               : "rgba(185,190,210,0.72)",
                }}>
                {CAT_LABELS[cat]} · {count}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`border border-border/30 rounded-2xl bg-card/20 overflow-hidden transition-all duration-700 delay-[400ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="px-3 pt-6 pb-3">
          <TechConstellation filter={filter} isLight={isLight} />
        </div>
      </div>

      <p className="text-center text-[10px] font-mono text-muted-foreground/90 uppercase tracking-[0.35em] mt-5">
        Hover to explore · Click to pin · Filter by category
      </p>
    </section>
  );
}
