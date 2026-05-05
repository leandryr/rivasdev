"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { GoogleReview } from "@/app/api/reviews/route";

// ─── Google star SVG ──────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l2.9 6.1L22 9.3l-5 4.9 1.2 7-6.2-3.3L5.8 21.2l1.2-7-5-4.9 7.1-1.2z"
            fill={n <= rating ? "#FBBF24" : "none"}
            stroke={n <= rating ? "#FBBF24" : "#374151"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

// ─── Google "G" logo ──────────────────────────────────────────────────────────

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ─── Avatar fallback ──────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  { bg: "#1a73e8", text: "#fff" },
  { bg: "#34a853", text: "#fff" },
  { bg: "#ea4335", text: "#fff" },
  { bg: "#fbbc04", text: "#000" },
  { bg: "#9334e6", text: "#fff" },
  { bg: "#f97316", text: "#fff" },
];

function nameToColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function Avatar({ name, photoUrl }: { name: string; photoUrl: string }) {
  const [err, setErr] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const color = nameToColor(name);

  if (!photoUrl || err) {
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 select-none"
        style={{ backgroundColor: color.bg, color: color.text }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt={name}
      className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-white/10"
      onError={() => setErr(true)}
      referrerPolicy="no-referrer"
    />
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ReviewCard({ review, index }: { review: GoogleReview; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className={`group relative border border-border/40 rounded-2xl bg-card/40 bento-glow p-6 flex flex-col gap-4 transition-all duration-700 hover:border-border/70 hover:bg-card/60`}
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity:   isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(48px)",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      }}
    >
      {/* Top row: stars + Google logo */}
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <div className="flex items-center gap-1.5">
          <GoogleLogo />
          <span className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider">Google</span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-muted-foreground/75 text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border/30">
        <Avatar name={review.author_name} photoUrl={review.profile_photo_url} />
        <div className="min-w-0">
          <p className="text-foreground text-xs font-semibold truncate">{review.author_name}</p>
          <p className="text-muted-foreground/80 text-[10px] font-mono mt-0.5">{review.relative_time_description}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>(0.2);
  const STATIC_REVIEWS: GoogleReview[] = [
    {
      author_name: "Antonio Chacón",
      profile_photo_url: "",
      rating: 5,
      relative_time_description: "1 day ago",
      text: "Great service, personal was really professional and seem to have great experience on the field, go-to option for any business automatization!",
      time: Date.now() / 1000 - 86400,
    },
    {
      author_name: "Rafael Paredes",
      profile_photo_url: "",
      rating: 5,
      relative_time_description: "2 weeks ago",
      text: "Muy buen servicio y respuesta!!",
      time: Date.now() / 1000 - 1209600,
    },
  ];

  const reviews = STATIC_REVIEWS;
  const rating  = 5.0;
  const total   = 2;
  const loading = false;
  const error   = false;

  return (
    <section className="relative py-12 lg:py-16 px-6 lg:px-10">
      {/* Header */}
      <div ref={headerRef} className="mb-8 lg:mb-10">
        <div className={`flex items-center gap-4 mb-5 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-primary/40 text-[10px] font-mono">03</span>
          <div className="h-px w-8 bg-border" />
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">Client Outcomes</span>
        </div>

        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-balance transition-all duration-700 delay-100 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-foreground">Heard from </span>
            <span className="text-muted-foreground/65">our clients</span>
          </h2>

          {/* Google rating badge */}
          {rating !== null && (
            <div className={`flex items-center gap-3 pb-2 transition-all duration-700 delay-200 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <GoogleLogo />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-bold text-lg tabular-nums">{rating.toFixed(1)}</span>
                  <Stars rating={Math.round(rating)} />
                </div>
                {total !== null && (
                  <p className="text-muted-foreground/80 text-[10px] font-mono">{total} Google {total === 1 ? "review" : "reviews"}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-border/30 rounded-2xl bg-card/30 h-52 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      )}

      {(error || (!loading && reviews.length === 0)) && (
        <div className="flex flex-col items-center gap-6 py-16">
          <div className="flex items-center gap-3">
            <GoogleLogo />
            <Stars rating={5} />
            <span className="text-foreground font-bold text-lg">5.0</span>
          </div>
          <p className="text-muted-foreground/90 text-sm text-center max-w-sm">
            We&apos;re proud of every project we ship. Read what our clients say on Google.
          </p>
          <a
            href="https://www.google.com/maps/place/Rivas+Technologies+LLC/@34.2921487,-83.9090555,12z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-border/50 bg-card/50 text-sm text-foreground/70 hover:text-foreground hover:border-border transition-all duration-300"
          >
            <GoogleLogo />
            Read our Google reviews
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <ReviewCard key={`${review.author_name}-${review.time}`} review={review} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
