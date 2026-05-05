"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const BRANDS = [
  { src: "/brand/freightro.png",        alt: "Freightro",  w: 160, invertDark: false },
  { src: "/brand/migoshvac.png",        alt: "Migos HVAC", w: 180, invertDark: false },
  { src: "/brand/mobiliapp_black.webp", alt: "Mobiliapp",  w: 160, invertDark: true  },
  { src: "/brand/human.png",            alt: "Human",      w: 140, invertDark: false },
];

const TRACK = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

export function TrustedSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";

  return (
    <section className="relative border-b border-border/30 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

      <div className="flex items-center h-16">

        {/* Fixed label */}
        <div className="flex-shrink-0 flex items-center gap-4 pl-6 lg:pl-10 pr-6">
          <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/90 font-mono whitespace-nowrap">
            Trusted by companies shipping real products
          </span>
          <div className="w-px h-5 bg-border/50 flex-shrink-0" aria-hidden="true" />
        </div>

        {/* Scrolling logos */}
        <div className="flex-1 overflow-hidden relative">
          {/* Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
            aria-hidden="true"
          />

          <div className="flex items-center animate-marquee" style={{ animationDuration: "28s" }}>
            {TRACK.map(({ src, alt, w, invertDark }, i) => {
              const darkFilter = invertDark
                ? "invert(1) brightness(1.8) contrast(0.8)"
                : "grayscale(100%) brightness(1.5) contrast(0.75)";
              const baseFilter = isLight
                ? "grayscale(20%) contrast(1.1) brightness(0.85)"
                : darkFilter;
              return (
              <div key={`${alt}-${i}`} className="flex items-center mx-10 flex-shrink-0">
                <div
                  className="relative transition-all duration-500"
                  style={{
                    width: w,
                    height: 36,
                    opacity: isLight ? 0.75 : 0.40,
                    filter:  baseFilter,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.opacity = "1";
                    el.style.filter  = invertDark && !isLight ? "invert(1) brightness(1)" : "grayscale(0%) contrast(1.05) brightness(1)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.opacity = isLight ? "0.75" : "0.40";
                    el.style.filter  = baseFilter;
                  }}
                >
                  <Image src={src} alt={alt} fill className="object-contain" sizes={`${w}px`} quality={100} />
                </div>
              </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
