"use client";

import Image from "next/image";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/rivas-technologies-llc/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rivastechnologies",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/leandryrp",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61575844187685",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.404.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.404 24 24 23.404 24 22.674V1.326C24 .595 23.404 0 22.675 0z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@rivastechnologies",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.228V2h-3.274v13.517a2.727 2.727 0 1 1-1.863-2.59V9.595a6.01 6.01 0 1 0 5.137 5.922V8.641a8.064 8.064 0 0 0 4.726 1.526V6.686a4.816 4.816 0 0 1-.956 0z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@rivastechnologies",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const serviceLinks = [
  { label: "Web Engineering",   href: "#capabilities" },
  { label: "Mobile Solutions",  href: "#capabilities" },
  { label: "Commerce Platforms",href: "#capabilities" },
  { label: "API Infrastructure",href: "#capabilities" },
  { label: "Security & Compliance", href: "#capabilities" },
  { label: "Performance & SEO", href: "#capabilities" },
];

const companyLinks = [
  { label: "Services",         href: "/services" },
  { label: "Selected Work",    href: "/#projects" },
  { label: "About Us",         href: "/about" },
  { label: "Blog",             href: "/blog" },
  { label: "Start an Engagement", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/30">
      <div className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-5">
            <Image
              src="/logos/logoblanco.png"
              alt="Rivas Technologies"
              width={400}
              height={100}
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-xs mb-6">
            Enterprise engineering partner for companies building at scale. Architecture, execution, and delivery — without compromise.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-cursor-hover
                className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <span className="text-muted-foreground/80 text-[10px] font-mono uppercase tracking-[0.3em] block mb-5">
            Solutions
          </span>
          <ul className="space-y-2.5">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  data-cursor-hover
                  className="text-muted-foreground text-xs hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <span className="text-muted-foreground/80 text-[10px] font-mono uppercase tracking-[0.3em] block mb-5">
            Company
          </span>
          <ul className="space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  data-cursor-hover
                  className="text-muted-foreground text-xs hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact quick */}
        <div>
          <span className="text-muted-foreground/80 text-[10px] font-mono uppercase tracking-[0.3em] block mb-5">
            Direct Line
          </span>
          <ul className="space-y-3">
            <li>
              <a
                href="tel:+14048394292"
                data-cursor-hover
                className="text-muted-foreground text-xs hover:text-foreground transition-colors duration-300"
              >
                +1 (404) 839-4292
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@rivastechnologies.com"
                data-cursor-hover
                className="text-muted-foreground text-xs hover:text-foreground transition-colors duration-300 break-all"
              >
                contact@rivastechnologies.com
              </a>
            </li>
            <li className="text-muted-foreground text-xs">
              Gainesville, GA, USA
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 sm:px-6 lg:px-10 py-5 border-t border-border/20 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-muted-foreground/70 text-[10px] font-mono uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Rivas Technologies LLC · All rights reserved
        </span>
        <a
          href="https://www.rivastechnologies.com"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="text-muted-foreground/70 text-[10px] hover:text-primary transition-colors duration-300 uppercase tracking-[0.2em] font-mono"
        >
          rivastechnologies.com
        </a>
      </div>
    </footer>
  );
}
