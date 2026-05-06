"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Users, Target, Zap, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Enfocados en resultados",
    desc: "Cada proyecto tiene un objetivo de negocio claro. No entregamos código — entregamos soluciones que mueven métricas.",
  },
  {
    icon: Zap,
    title: "Velocidad sin sacrificar calidad",
    desc: "Primeros releases en 10 días hábiles. Arquitectura escalable desde el día uno, sin deuda técnica acumulada.",
  },
  {
    icon: ShieldCheck,
    title: "Ingeniería de nivel enterprise",
    desc: "Seguridad, performance y escalabilidad no son opcionales. Cada sistema está construido para producción real.",
  },
  {
    icon: Users,
    title: "Comunicación ejecutiva",
    desc: "Sin intermediarios. Acceso directo al equipo técnico. Actualizaciones semanales con claridad y sin sorpresas.",
  },
];

const stats = [
  { value: "10+", label: "años de experiencia" },
  { value: "50+", label: "proyectos entregados" },
  { value: "99%", label: "satisfacción de clientes" },
  { value: "24h", label: "tiempo de respuesta" },
];

export function AboutUsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>(0.2);
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="about" className="relative py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10 border-t border-border/20">

      {/* Header */}
      <div ref={headerRef} className="mb-10 lg:mb-14">
        <div className={`flex items-center gap-4 mb-5 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-primary/40 text-[10px] font-mono">04</span>
          <div className="h-px w-8 bg-border" />
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">
            Nosotros
          </span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-balance transition-all duration-700 delay-100 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-foreground">Ingeniería </span>
          <span className="text-muted-foreground/65">con propósito</span>
        </h2>
        <p className={`mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Rivas Technologies es un socio de ingeniería para empresas que construyen a escala. Combinamos profundidad técnica con pensamiento de producto — sin middlemen, sin handoffs, sin sorpresas.
        </p>
      </div>

      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* Left — values */}
        <div className="space-y-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className={`flex gap-5 transition-all duration-700 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(10,124,255,0.1)", border: "1px solid rgba(10,124,255,0.2)" }}>
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold text-sm mb-1">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right — stats + story */}
        <div className={`transition-all duration-700 delay-300 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label}
                className="p-5 rounded-2xl border border-border/40 bg-card/30">
                <div className="text-3xl font-bold text-primary tracking-tight mb-1">{s.value}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-mono">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="p-5 rounded-2xl border border-border/40 bg-card/30 space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-mono">
                Gainesville, GA · Operando globalmente
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fundados con la misión de eliminar la brecha entre ingeniería y negocio. Trabajamos con startups en crecimiento y empresas establecidas que necesitan ejecución técnica de nivel senior sin el overhead de una agencia tradicional.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cada engagement comienza con un sprint de descubrimiento — alineamos objetivos, arquitectura y timeline antes de escribir una sola línea de código.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
