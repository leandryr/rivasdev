"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { Send, CheckCircle, Loader2, Phone, Mail, MapPin, Clock } from "lucide-react";

const inputClass =
  "w-full bg-card/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:bg-card transition-all duration-300";

function ContactRow({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3 text-sm group">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
        style={{ background: "rgba(10,124,255,0.1)", border: "1px solid rgba(10,124,255,0.2)" }}>
        <div className="text-primary w-4 h-4">{icon}</div>
      </div>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{label}</span>
    </div>
  );
  if (href) return <a href={href} data-cursor-hover>{content}</a>;
  return content;
}

const breadcrumbSchemaContact = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",    item: "https://rivastechnologies.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://rivastechnologies.com/contact" },
  ],
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaContact }} />
      <CustomCursor />
      <SiteHeader />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-primary/40 text-[10px] font-mono">Contact</span>
            <div className="h-px w-8 bg-border" />
            <span className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-mono">
              Start an Engagement
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-balance mb-4">
            <span className="text-foreground">Partner with </span>
            <span className="text-primary">Rivas Technologies</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            Qualified engagements receive a dedicated engineering assessment within 24 hours. Tell us about your initiative and we will outline a delivery path.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">

          {/* Left — info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <ContactRow icon={<Phone size={16} />} label="+1 (404) 839-4292" href="tel:+14048394292" />
              <ContactRow icon={<Mail size={16} />} label="contact@rivastechnologies.com" href="mailto:contact@rivastechnologies.com" />
              <ContactRow icon={<MapPin size={16} />} label="Gainesville, GA, USA" />
              <ContactRow icon={<Clock size={16} />} label="Mon – Fri · 8:00 AM – 6:00 PM EST" />
            </div>

            {/* Status card */}
            <div className="p-5 rounded-2xl border border-border/40 bg-card/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-mono">
                  Accepting new engagements · Q2 2026
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Pilot sprint available for qualified engagements. We assess fit before either party commits — no obligations until alignment is confirmed.
              </p>
            </div>

            {/* What to expect */}
            <div>
              <h3 className="text-foreground font-semibold text-sm mb-4 uppercase tracking-[0.15em] font-mono">What happens next</h3>
              <div className="space-y-4">
                {[
                  { num: "01", title: "We review your inquiry", desc: "Within 24 hours, our team reviews your submission and evaluates scope and fit." },
                  { num: "02", title: "Discovery call", desc: "We schedule a 30-minute call to align on goals, timeline, and technical requirements." },
                  { num: "03", title: "Delivery proposal", desc: "You receive a clear scope of work, architecture outline, and investment estimate." },
                ].map(s => (
                  <div key={s.num} className="flex gap-4">
                    <span className="text-primary/50 text-[10px] font-mono font-bold mt-0.5 flex-shrink-0">{s.num}</span>
                    <div>
                      <p className="text-foreground text-sm font-medium mb-0.5">{s.title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-20">
                <CheckCircle className="w-14 h-14 text-emerald-400" />
                <p className="text-foreground font-semibold text-xl">Inquiry received</p>
                <p className="text-muted-foreground text-sm max-w-sm">
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
                    <label className="text-muted-foreground/70 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">Name</label>
                    <input name="name" type="text" required placeholder="Your name"
                      value={form.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-muted-foreground/70 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">Last Name</label>
                    <input name="lastName" type="text" required placeholder="Your last name"
                      value={form.lastName} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-muted-foreground/70 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">Email</label>
                    <input name="email" type="email" required placeholder="you@company.com"
                      value={form.email} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-muted-foreground/70 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">Phone</label>
                    <input name="phone" type="tel" placeholder="+1 (555) 000-0000"
                      value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground/70 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">Subject</label>
                  <input name="subject" type="text" placeholder="Engagement type, initiative, partnership..."
                    value={form.subject} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                  <label className="text-muted-foreground/70 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">Message</label>
                  <textarea name="message" required rows={6}
                    placeholder="Describe your initiative, technical requirements, and desired timeline..."
                    value={form.message} onChange={handleChange}
                    className={`${inputClass} resize-none`} />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs font-mono">Failed to send. Please try again or email us directly.</p>
                )}

                <button type="submit" disabled={status === "sending"} data-cursor-hover
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
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
      </main>
      <SiteFooter />
    </>
  );
}
