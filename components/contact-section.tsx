"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const inputClass =
  "w-full bg-card/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 focus:bg-card transition-all duration-300";

export function ContactSection() {
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollReveal<HTMLDivElement>(0.2);
  const { ref: formRef, isVisible: formVisible } =
    useScrollReveal<HTMLDivElement>(0.15);

  const [form, setForm] = useState({ name: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10 border-t border-border/20"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-8 lg:mb-10">
        <div
          className={`flex items-center gap-4 mb-5 transition-all duration-700 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-primary/40 text-[10px] font-mono">06</span>
          <div className="h-px w-8 bg-border" />
          <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">
            Start an Engagement
          </span>
        </div>
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-balance transition-all duration-700 delay-100 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-foreground">Partner with </span>
          <span className="text-primary">Rivas Technologies</span>
        </h2>
      </div>

      {/* Grid */}
      <div
        ref={formRef}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 transition-all duration-700 ${
          formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Left — contact info */}
        <div className="flex flex-col justify-between gap-10">
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            Qualified engagements receive a dedicated engineering assessment within 24 hours. Tell us about your initiative and we will outline a delivery path.
          </p>

          <div className="space-y-5">
            <ContactRow
              icon={
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              }
              label="+1 (404) 839-4292"
              href="tel:+14048394292"
            />
            <ContactRow
              icon={
                <>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </>
              }
              label="contact@rivastechnologies.com"
              href="mailto:contact@rivastechnologies.com"
            />
            <ContactRow
              icon={
                <>
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </>
              }
              label="Gainesville, GA, USA"
            />
            <ContactRow
              icon={
                <>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </>
              }
              label="Mon – Fri · 8:00 AM – 6:00 PM EST"
            />
          </div>

          <div className="p-5 rounded-2xl border border-border/40 bg-card/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-mono">
                Accepting new engagements · Q2 2026
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Pilot sprint available for qualified engagements. We assess fit before either party commits — no obligations until alignment is confirmed.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div>
          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
              <p className="text-foreground font-semibold text-lg">Inquiry received</p>
              <p className="text-muted-foreground text-sm">
                Your message has been delivered to our team. We will respond within one business day.
              </p>
              <button
                onClick={() => { setStatus("idle"); setForm({ name: "", lastName: "", email: "", phone: "", subject: "", message: "" }); }}
                className="text-primary text-xs font-mono uppercase tracking-[0.2em] hover:underline mt-2"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground/90 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground/90 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    placeholder="Your last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground/90 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground/90 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-muted-foreground/90 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Engagement type, initiative, partnership..."
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-muted-foreground/90 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Describe your initiative, technical requirements, and desired timeline..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-xs font-mono">Failed to send. Please try again or email us directly.</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                data-cursor-hover
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                ) : (
                  <>Submit Inquiry <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 text-muted-foreground text-xs group">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary/60 mt-0.5 shrink-0 group-hover:text-primary transition-colors"
        aria-hidden="true"
      >
        {icon}
      </svg>
      <span className="group-hover:text-foreground transition-colors duration-300">
        {label}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} data-cursor-hover>
        {content}
      </a>
    );
  }
  return content;
}
