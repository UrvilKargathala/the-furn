"use client";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { SmoothScroll, Reveal, SplitText, RollText, motion, ease } from "../fx";
import { budgets, enquiryTypes } from "../data";
import { Label, Arrow, Nav, Footer } from "../ui";

type Option = { v: string; t: string; hint?: string };

// Styled dropdown that still submits a plain value (opens on click, closes on outside click or Escape)
function Select({ label, value, onChange, options, placeholder, error, required }: {
  label: string; value: string; onChange: (v: string) => void; options: Option[]; placeholder: string; error?: string; required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const current = options.find((o) => o.v === value);
  return (
    <div ref={ref} className="relative">
      <label id={id} className="text-sm text-ink/55">{label}{required && <span className="text-brass"> *</span>}</label>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={id} onClick={() => setOpen(!open)}
        className={`mt-2 flex w-full items-center justify-between gap-4 border-b py-3 text-left text-lg transition-colors ${error ? "border-red-600" : open ? "border-ink" : "border-ink/25 hover:border-ink/60"}`}>
        <span className={current ? "" : "text-ink/35"}>{current ? current.t : placeholder}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}><path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul role="listbox" aria-labelledby={id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease }}
            className="absolute inset-x-0 z-20 mt-2 max-h-72 overflow-auto rounded-2xl border border-ink/10 bg-ivory p-2 shadow-2xl">
            {options.map((o) => (
              <li key={o.v} role="option" aria-selected={o.v === value}>
                <button type="button" onClick={() => { onChange(o.v); setOpen(false); }}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-colors hover:bg-sand ${o.v === value ? "bg-sand font-semibold" : ""}`}>
                  <span>{o.t}</span>{o.hint && <span className="text-xs tracking-wider text-ink/45 uppercase">{o.hint}</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

function Field({ label, name, value, onChange, error, type = "text", required, autoComplete, multiline }: {
  label: string; name: string; value: string; onChange: (v: string) => void; error?: string; type?: string; required?: boolean; autoComplete?: string; multiline?: boolean;
}) {
  const cls = `mt-2 block w-full border-b bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-ink/30 ${error ? "border-red-600" : "border-ink/25 hover:border-ink/60 focus:border-ink"}`;
  return (
    <div>
      <label htmlFor={name} className="text-sm text-ink/55">{label}{required && <span className="text-brass"> *</span>}</label>
      {multiline
        ? <textarea id={name} name={name} value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={`${cls} resize-none`} />
        : <input id={name} name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} className={cls} />}
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

const empty = { name: "", phone: "", email: "", city: "", type: "", budget: "", message: "", company: "" };

function Form() {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "fail">("idle");
  const set = (k: keyof typeof empty) => (v: string) => { setF((p) => ({ ...p, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: "" })); };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setState("done"); return; }
      if (res.status === 422 && data.errors) { setErrors(data.errors); setState("idle"); return; }
      setState("fail");
    } catch { setState("fail"); }
  }

  const tier = budgets.find((b) => b.v === f.budget)?.tier;
  const mailto = `mailto:info@thefurn.co?subject=${encodeURIComponent(`New enquiry from ${f.name || "website"}`)}&body=${encodeURIComponent(
    [`Name: ${f.name}`, `Phone: ${f.phone}`, `Email: ${f.email}`, `City: ${f.city}`, `Looking for: ${f.type}`, `Budget: ${budgets.find((b) => b.v === f.budget)?.t ?? ""}`, "", f.message].join("\n"))}`;

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="rounded-[28px] bg-ink p-8 text-ivory md:p-12">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brass text-2xl text-ink">✓</span>
        <h2 className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl">Thank you, {f.name.split(" ")[0]}.</h2>
        <p className="mt-4 max-w-md text-ivory/75">We&apos;ve received your details and will call you within one working day to plan your free site visit.</p>
        <button onClick={() => { setF(empty); setState("idle"); }} className="group mt-8 text-sm font-semibold underline underline-offset-4"><RollText>Send another enquiry</RollText></button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Full name" name="name" value={f.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" value={f.phone} onChange={set("phone")} error={errors.phone} required autoComplete="tel" />
        <Field label="Email" name="email" type="email" value={f.email} onChange={set("email")} error={errors.email} required autoComplete="email" />
        <Field label="City" name="city" value={f.city} onChange={set("city")} error={errors.city} required autoComplete="address-level2" />
        <Select label="What are you looking for?" value={f.type} onChange={set("type")} placeholder="Select a service" options={enquiryTypes.map((t) => ({ v: t, t }))} error={errors.type} />
        <Select label="Your budget" required value={f.budget} onChange={set("budget")} placeholder="Select a budget range" error={errors.budget}
          options={budgets.map((b) => ({ v: b.v, t: b.t, hint: b.tier }))} />
      </div>
      <Field label="Tell us about your space" name="message" value={f.message} onChange={set("message")} multiline />
      {/* Honeypot: hidden from people, bots fill it in */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden value={f.company} onChange={(e) => set("company")(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-xs text-sm text-ink/50">{tier ? <>Enquiry category: <strong className="font-semibold text-ink">{tier}</strong>. </> : null}Free consultation. No obligation.</p>
        <button type="submit" disabled={state === "sending"} className="group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-7 font-semibold text-ivory transition-opacity disabled:opacity-60">
          <RollText>{state === "sending" ? "Sending..." : "Send enquiry"}</RollText><Arrow />
        </button>
      </div>
      {state === "fail" && (
        <p role="alert" className="rounded-2xl bg-sand p-5 text-sm">
          We couldn&apos;t send that just now. Please <a href={mailto} className="font-semibold underline underline-offset-4">email us directly</a> and we&apos;ll reply the same day.
        </p>
      )}
    </form>
  );
}

const info: [string, string, string?][] = [
  ["Email", "info@thefurn.co", "mailto:info@thefurn.co"],
  ["Studio", "Surat, Gujarat, India"],
  ["Instagram", "@thefurn.co", "https://www.instagram.com/thefurn.co/"],
  ["Hours", "Monday to Saturday, 10 am to 7 pm"],
];

export function ContactView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      <section className="px-5 pt-40 pb-12 md:px-12 md:pt-48">
        <Label>Contact us</Label>
        <h1 className="mt-6 text-[13vw] leading-[0.9] font-bold tracking-[-0.04em] md:text-[8vw]">
          <span className="block"><SplitText text="Let's talk about" /></span>
          <span className="block text-ink/35"><SplitText text="your space." delay={0.2} /></span>
        </h1>
      </section>

      <section className="px-5 pb-28 md:px-12">
        <div className="grid gap-16 md:grid-cols-[1fr_1.7fr] md:gap-20">
          <Reveal>
            <p className="max-w-sm text-lg text-ink/70">Tell us about your home and your budget. We&apos;ll call you to plan a free site visit, then measure, design and quote with no obligation.</p>
            <dl className="mt-12">
              {info.map(([k, v, href]) => (
                <div key={k} className="flex justify-between gap-6 border-t border-ink/15 py-5">
                  <dt className="text-ink/50">{k}</dt>
                  <dd className="text-right font-semibold">{href ? <a href={href} className="group underline-offset-4 hover:underline"><RollText>{v}</RollText></a> : v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.15}><Form /></Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
