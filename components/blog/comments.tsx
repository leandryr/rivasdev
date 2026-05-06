"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function Comments() {
  const ref       = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    // Clear any previous instance
    ref.current.innerHTML = "";

    const theme = resolvedTheme === "light" ? "light" : "dark_dimmed";

    const script = document.createElement("script");
    script.src              = "https://giscus.app/client.js";
    script.setAttribute("data-repo",              "leandryr/rivasdev");
    script.setAttribute("data-repo-id",           process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "R_kgDOSVCWyw");
    script.setAttribute("data-category",          "Blog");
    script.setAttribute("data-category-id",       process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "DIC_kwDOSVCWy84C8agY");
    script.setAttribute("data-mapping",           "pathname");
    script.setAttribute("data-strict",            "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata",     "0");
    script.setAttribute("data-input-position",    "top");
    script.setAttribute("data-theme",             theme);
    script.setAttribute("data-lang",              "en");
    script.setAttribute("data-loading",           "lazy");
    script.crossOrigin = "anonymous";
    script.async       = true;

    ref.current.appendChild(script);
  }, [mounted, resolvedTheme]);

  return (
    <section className="mt-4">
      <h2 className="text-foreground font-bold text-xl mb-6 flex items-center gap-3">
        <span className="w-8 h-0.5 bg-primary inline-block" />
        Comments
      </h2>
      {!mounted ? (
        <div className="h-32 rounded-xl bg-card/30 border border-border/30 animate-pulse" />
      ) : (
        <div ref={ref} className="giscus-container" />
      )}
    </section>
  );
}
