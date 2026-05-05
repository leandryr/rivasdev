"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isLight = () => document.documentElement.classList.contains("light");

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx - 4}px`;
      dot.style.top  = `${my - 4}px`;
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx - 20}px`;
      ring.style.top  = `${ry - 20}px`;
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      const light = isLight();
      dot.style.transform = "scale(3)";
      ring.style.width    = "60px";
      ring.style.height   = "60px";
      ring.style.left     = `${rx - 30}px`;
      ring.style.top      = `${ry - 30}px`;
      ring.style.borderColor = light
        ? "rgba(10,108,224,0.9)"
        : "rgba(10,124,255,0.85)";
      ring.style.boxShadow = light
        ? "0 0 20px rgba(10,108,224,0.2)"
        : "0 0 20px rgba(10,124,255,0.15)";
    };

    const onLeaveLink = () => {
      const light = isLight();
      dot.style.transform    = "scale(1)";
      ring.style.width       = "40px";
      ring.style.height      = "40px";
      ring.style.borderColor = light
        ? "rgba(10,108,224,0.45)"
        : "rgba(10,124,255,0.35)";
      ring.style.boxShadow   = light
        ? "0 0 12px rgba(10,108,224,0.12)"
        : "none";
    };

    window.addEventListener("mousemove", onMove);
    animate();

    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot  hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  );
}
