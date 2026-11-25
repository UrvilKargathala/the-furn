"use client";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { RollText, motion, ease } from "../fx";
import { budgets, enquiryTypes, CONTACT } from "../content/site";
import { Arrow } from "../ui";

type Option = { v: string; t: string; hint?: string };

// Styled dropdown that still submits a plain value (opens on click, closes on outside click or Escape)
export function Select({ label, value, onChange, options, placeholder, error, required, search, disabled, loading }: {
  label: string; value: string; onChange: (v: string) => void; options: Option[]; placeholder: string; error?: string; required?: boolean; search?: boolean; disabled?: boolean; loading?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const listId = `${id}-list`, errorId = `${id}-error`, optId = (i: number) => `${id}-opt-${i}`;
  const current = options.find((o) => o.v === value);
  // Long lists (cities) are searchable; only the first matches are drawn to keep it fast
  const shown = (q ? options.filter((o) => o.t.toLowerCase().includes(q.toLowerCase())) : options).slice(0, 150);

  const openList = () => {
    if (disabled) return;
    setQ(""); setOpen(true);
    setActive(Math.max(0, options.slice(0, 150).findIndex((o) => o.v === value)));
  };
  const close = (refocus = true) => { setOpen(false); if (refocus) button.current?.focus(); };
  const pick = (o: Option | undefined) => { if (!o) return; onChange(o.v); close(); };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  // Without a search box, keyboard focus moves into the list so arrow keys work straight away
  useEffect(() => { if (open && !search) list.current?.focus(); }, [open, search]);
  // Keep the highlighted option in view
  useEffect(() => { if (open) document.getElementById(optId(active))?.scrollIntoView({ block: "nearest" }); }, [open, active]); // eslint-disable-line react-hooks/exhaustive-deps

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); openList(); }
      return;
    }
    const last = shown.length - 1;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(last, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(last); }
    else if (e.key === "Enter" || (e.key === " " && !search)) { e.preventDefault(); pick(shown[active]); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Tab") close(false);
    else if (!search && e.key.length === 1) {
      // Type-ahead: jump to the first option starting with the typed letter
      const i = shown.findIndex((o) => o.t.toLowerCase().startsWith(e.key.toLowerCase()));
      if (i >= 0) setActive(i);
    }
  };

  return (
    <div ref={ref} className="relative" onKeyDown={onKeyDown}>
      <label id={id} className="text-sm text-ink/65">{label}{required && <><span className="text-brass" aria-hidden> *</span><span className="sr-only"> (required)</span></>}</label>
      <button ref={button} type="button" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined}
        aria-labelledby={`${id} ${id}-value`} aria-describedby={error ? errorId : undefined}
        onClick={() => (open ? close() : openList())} disabled={disabled}
        className={`mt-2 flex w-full items-center justify-between gap-4 border-b py-3 text-left text-lg transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass ${error ? "border-red-600" : open ? "border-ink" : "border-ink/25 hover:border-ink/60"} ${disabled ? "cursor-not-allowed opacity-45" : ""}`}>
        <span id={`${id}-value`} className={current ? "" : "text-ink/45"}>{loading ? "Loading..." : current ? current.t : placeholder}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}><path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div data-lenis-prevent initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease }}
            className="absolute inset-x-0 z-20 mt-2 rounded-2xl border border-ink/10 bg-ivory p-2 shadow-2xl">
            {search && (
              <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} placeholder="Type to search" aria-label={`Search ${label}`}
                role="combobox" aria-expanded aria-controls={listId} aria-autocomplete="list" aria-activedescendant={shown[active] ? optId(active) : undefined}
                className="mb-2 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-base outline-none focus:border-ink" />
            )}
            <ul ref={list} id={listId} role="listbox" aria-labelledby={id} tabIndex={-1}
              aria-activedescendant={!search && shown[active] ? optId(active) : undefined}
              className="max-h-72 overflow-y-auto overscroll-contain outline-none">
              {shown.length === 0 && <li role="presentation" className="px-4 py-3 text-sm text-ink/60">No match</li>}
              {shown.map((o, i) => (
                <li key={o.v} id={optId(i)} role="option" aria-selected={o.v === value}
                  onMouseEnter={() => setActive(i)} onMouseDown={(e) => e.preventDefault()} onClick={() => pick(o)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3 transition-colors ${i === active ? "bg-sand" : ""} ${o.v === value ? "font-semibold" : ""}`}>
                  <span>{o.t}</span>{o.hint && <span className="text-xs tracking-wider text-ink/45 uppercase">{o.hint}</span>}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p id={errorId} className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export function Field({ label, name, value, onChange, error, type = "text", required, autoComplete, multiline }: {
  label: string; name: string; value: string; onChange: (v: string) => void; error?: string; type?: string; required?: boolean; autoComplete?: string; multiline?: boolean;
}) {
  const cls = `mt-2 block w-full border-b bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-ink/30 ${error ? "border-red-600" : "border-ink/25 hover:border-ink/60 focus:border-ink"}`;
  return (
    <div>
      <label htmlFor={name} className="text-sm text-ink/65">{label}{required && <span className="text-brass"> *</span>}</label>
      {multiline
        ? <textarea id={name} name={name} value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={`${cls} resize-none`} />
        : <input id={name} name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} className={cls} />}
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export const OTHER = "__other__";

export const empty = { name: "", phone: "", email: "", state: "", city: "", cityOther: "", type: "", budget: "", message: "", company: "" };

export function Form() {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "fail">("idle");
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  useEffect(() => {
    fetch("/api/geo").then((r) => r.json()).then((d: { states: { code: string; name: string }[] }) => setStates(d.states.map((s) => ({ v: s.code, t: s.name })))).catch(() => {});
  }, []);
  const pickState = (code: string) => {
    setF((p) => ({ ...p, state: code, city: "", cityOther: "" }));
    setErrors((e) => ({ ...e, state: "", city: "" }));
    setCities([]); setLoadingCities(true);
    fetch(`/api/geo?state=${code}`).then((r) => r.json()).then((d: { cities: string[] }) => setCities(d.cities.map((c) => ({ v: c, t: c }))))
      .catch(() => {}).finally(() => setLoadingCities(false));
  };
  const set = (k: keyof typeof empty) => (v: string) => { setF((p) => ({ ...p, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: "" })); };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, state: states.find((s) => s.v === f.state)?.t ?? "", city: f.city === OTHER ? f.cityOther : f.city, pageUrl: window.location.href }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setState("done"); return; }
      if (res.status === 422 && data.errors) { setErrors(data.errors); setState("idle"); return; }
      setState("fail");
    } catch { setState("fail"); }
  }

  const tier = budgets.find((b) => b.v === f.budget)?.tier;
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`New enquiry from ${f.name || "website"}`)}&body=${encodeURIComponent(
    [`Name: ${f.name}`, `Phone: ${f.phone}`, `Email: ${f.email}`, `City: ${f.city === OTHER ? f.cityOther : f.city}, ${states.find((s) => s.v === f.state)?.t ?? ""}`, `Looking for: ${f.type}`, `Budget: ${budgets.find((b) => b.v === f.budget)?.t ?? ""}`, "", f.message].join("\n"))}`;

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className=" bg-ink p-8 text-ivory md:p-12">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brass text-2xl text-ink">✓</span>
        <h2 className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl">Thank you, {f.name.split(" ")[0]}.</h2>
        <p className="mt-4 max-w-md text-ivory/75">We&apos;ve received your details and will call you within one working day to plan your free site visit.</p>
        <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-fill btn-fill-ink mt-8 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-semibold text-ink">Prefer WhatsApp? Message us now</a>
        <br />
        <button onClick={() => { setF(empty); setState("idle"); }} className="group mt-8 text-sm font-semibold underline underline-offset-4"><RollText>Send another enquiry</RollText></button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-8">
      <fieldset className="grid gap-8">
        <legend className="mb-2 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-ink/60 uppercase"><span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-xs tracking-normal text-ivory">1</span>About you</legend>
        <div className="grid gap-8 md:grid-cols-2">
          <Field label="Full name" name="name" value={f.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
          <Field label="Phone" name="phone" type="tel" value={f.phone} onChange={set("phone")} error={errors.phone} required autoComplete="tel" />
          <Select label="State" required search value={f.state} onChange={pickState} placeholder="Select your state" options={states} error={errors.state} loading={states.length === 0} />
          <Select label="City" required search value={f.city} onChange={set("city")} placeholder={f.state ? "Select your city" : "Choose a state first"} error={errors.city}
            disabled={!f.state || loadingCities} loading={loadingCities} options={[...cities, { v: OTHER, t: "My city isn't listed" }]} />
          {f.city === OTHER && <Field label="Your city" name="cityOther" value={f.cityOther} onChange={set("cityOther")} required />}
          <Field label="Email (optional)" name="email" type="email" value={f.email} onChange={set("email")} error={errors.email} autoComplete="email" />
        </div>
      </fieldset>
      <fieldset className="mt-4 grid gap-8">
        <legend className="mb-2 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-ink/60 uppercase"><span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-xs tracking-normal text-ivory">2</span>About your project</legend>
        <div className="grid gap-8 md:grid-cols-2">
          <Select label="What are you looking for?" value={f.type} onChange={set("type")} placeholder="Select a service" options={enquiryTypes.map((t) => ({ v: t, t }))} error={errors.type} />
          <Select label="Your budget" required value={f.budget} onChange={set("budget")} placeholder="Select a budget range" error={errors.budget}
            options={budgets.map((b) => ({ v: b.v, t: b.t, hint: b.tier }))} />
        </div>
        <Field label="Tell us about your space (optional)" name="message" value={f.message} onChange={set("message")} multiline />
      </fieldset>
      {/* Honeypot: hidden from people, bots fill it in */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden value={f.company} onChange={(e) => set("company")(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-xs text-sm text-ink/60">{tier ? <>Enquiry category: <strong className="font-semibold text-ink">{tier}</strong>. </> : null}Free consultation. No obligation.</p>
        <button type="submit" disabled={state === "sending"} className="btn-fill btn-fill-brass group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-7 font-semibold text-ivory disabled:opacity-60">
          <RollText>{state === "sending" ? "Sending..." : "Send enquiry"}</RollText><Arrow />
        </button>
      </div>
      {state === "fail" && (
        <div role="alert" className="bg-sand p-5 text-sm">
          <p>We couldn&apos;t send that just now. Message us on WhatsApp to book your free site visit, or <a href={mailto} className="font-semibold underline underline-offset-4">email us directly</a> and we&apos;ll reply the same day.</p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-fill btn-fill-brass mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-ivory">Book a free site visit on WhatsApp</a>
        </div>
      )}
    </form>
  );
}

// Button that smooth-scrolls to an element on the page (used by the hero's "Fill the form")
export function JumpTo({ target, className, children }: { target: string; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className}
      onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
      {children}
    </button>
  );
}
