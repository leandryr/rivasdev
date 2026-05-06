import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-lg">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">404 · Page Not Found</span>
          </div>

          <h1 className="text-7xl sm:text-8xl font-bold tracking-[-0.04em] text-primary mb-4 tabular-nums">404</h1>
          <p className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">Page not found</p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-10">
            The page you are looking for doesn&apos;t exist or has been moved. Head back to the homepage or explore our services.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/50 bg-card/50 text-foreground text-sm hover:border-primary/40 transition-colors duration-300"
            >
              Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-border/30">
            <p className="text-muted-foreground/70 text-xs font-mono">
              Need help? Reach us at{" "}
              <a href="mailto:contact@rivastechnologies.com" className="text-primary hover:underline">
                contact@rivastechnologies.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
