"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

const navItems = [
  { label: "Home",     href: "/",        num: "01", page: true  },
  { label: "About Us", href: "/about",   num: "02", page: true  },
  { label: "Blog",     href: "/blog",    num: "03", page: true  },
  { label: "Contact",  href: "/contact", num: "04", page: true  },
];

const sectionIds: string[] = [];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;
  const isDark = resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      data-cursor-hover
      className="relative w-8 h-8 rounded-lg flex items-center justify-center border border-border/50 bg-secondary/60 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
    >
      <Sun className={`absolute w-3.5 h-3.5 text-amber-400 transition-all duration-300 ${isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"}`} />
      <Moon className={`absolute w-3.5 h-3.5 text-primary transition-all duration-300 ${isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"}`} />
    </button>
  );
}

export function SiteHeader() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer — highlight nav item of visible section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-2 bg-background/80 backdrop-blur-2xl border-b border-border/40" : "py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link href="/" className="flex items-center" data-cursor-hover>
          <Image src="/logos/logo.png" alt="Rivas Technologies" width={320} height={80}
            className="h-20 w-auto object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeId === id;
            const inner = (
              <>
                <span className={`text-[10px] font-mono transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-primary/40 group-hover:text-primary"
                }`}>{item.num}</span>
                <span className={`text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}>{item.label}</span>
              </>
            );
            if (item.page) {
              return (
                <Link key={item.label} href={item.href} data-cursor-hover
                  className="group flex items-center gap-2 transition-colors duration-300">
                  {inner}
                </Link>
              );
            }
            return (
              <button key={item.label} onClick={() => handleNav(item.href)} data-cursor-hover
                className="group flex items-center gap-2 transition-colors duration-300">
                {inner}
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => handleNav("#contact")}
            data-cursor-hover
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 text-primary text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Start an Engagement
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
            <span className={`w-5 h-px bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`w-5 h-px bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-4 px-6 pt-6 pb-4 border-t border-border/30 mt-2 bg-background/95 backdrop-blur-xl">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeId === id;
            const inner = (
              <>
                <span className={`text-[10px] font-mono ${isActive ? "text-primary" : "text-primary/40"}`}>{item.num}</span>
                <span className={`text-sm uppercase tracking-[0.2em] ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
              </>
            );
            if (item.page) {
              return (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 transition-colors duration-300">{inner}</Link>
              );
            }
            return (
              <button key={item.label} onClick={() => handleNav(item.href)}
                className="flex items-center gap-3 transition-colors duration-300 text-left">{inner}</button>
            );
          })}
          <button onClick={() => handleNav("#contact")}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 text-primary text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-fit">
            Start an Engagement
          </button>
        </nav>
      </div>
    </header>
  );
}
