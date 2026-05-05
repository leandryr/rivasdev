"use client";

const row1 = [
  "REACT",
  "NEXT.JS",
  "LARAVEL",
  "NODE.JS",
  "MONGODB",
  "MYSQL",
  "POSTGRESQL",
  "GITHUB",
  "VERCEL",
  "VPS",
];

const row2 = [
  "TYPESCRIPT",
  "REST API",
  "TAILWIND",
  "DOCKER",
  "CI/CD",
  "FIGMA",
  "REDIS",
  "AWS",
  "LINUX",
  "NGINX",
];

export function MarqueeDivider() {
  return (
    <div className="relative py-4 border-y border-border/30 overflow-hidden select-none bg-card/30">
      {/* Row 1 */}
      <div className="flex animate-marquee whitespace-nowrap mb-3">
        {[...row1, ...row1, ...row1, ...row1].map((item, i) => (
          <span key={`a-${i}`} className="flex items-center gap-5 mx-5">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70 font-mono">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-primary/20" aria-hidden="true" />
          </span>
        ))}
      </div>
      {/* Row 2 - reverse */}
      <div className="flex animate-marquee-reverse whitespace-nowrap">
        {[...row2, ...row2, ...row2, ...row2].map((item, i) => (
          <span key={`b-${i}`} className="flex items-center gap-5 mx-5">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 font-mono">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-primary/10" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
