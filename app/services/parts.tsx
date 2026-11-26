"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, type MotionValue } from "motion/react";
import { motion, ease, Reveal, useTransform, useSmoothScroll } from "../fx";
import { img } from "../content/site";
import { Label, Heading } from "../ui";
import { Pic } from "../pic";
import type { Service } from "../content/types";

export const reasons = [
  { t: "Made to measure", d: "Every module is sized to your wall, your ceiling and your appliances, never a catalogue size.", c: "bg-ink text-ivory", r: -5 },
  { t: "German machinery", d: "Cut, edge-banded and assembled on German machines for precision you can see in every joint.", c: "bg-brass text-ivory", r: 4 },
  { t: "45-day delivery", d: "A fixed timeline from design sign-off to handover, with weekly site updates.", c: "bg-sand text-ink", r: -3 },
  { t: "15-year warranty", d: "Branded hardware and BWP carcasses backed by a 15-year warranty.", c: "bg-walnut text-ivory", r: 2 },
];

// Four reasons, side by side, each fully readable (no pinned scrolling)
export function WhyUs() {
  return (
    <section className="px-5 py-24 md:px-12 md:py-32">
      <Label>Why The Furn</Label>
      <Heading text="Built differently," accent="built to last" />
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.1} className={`flex min-h-72 flex-col justify-between p-8 transition-transform duration-500 hover:-translate-y-1 ${r.c}`}>
            <span className="text-sm font-semibold opacity-70">0{i + 1} / 0{reasons.length}</span>
            <div>
              <h3 className="text-3xl font-semibold tracking-tight">{r.t}</h3>
              <p className="mt-4 text-lg opacity-85">{r.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Option list scrolls on the right; the pinned photo on the left follows the active option (linoxa)
export function Options({ s }: { s: Service }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="hidden md:block">
        <div className="sticky top-28 h-[70vh] overflow-hidden bg-ink">
          <Pic src={img(s.i, 1600)} alt={s.t} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <AnimatePresence mode="wait">
            <motion.span key={active} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.4, ease }}
              className="absolute right-6 bottom-4 text-8xl leading-none font-bold tracking-tighter text-ivory">0{active + 1}</motion.span>
          </AnimatePresence>
          <div className="absolute bottom-6 left-6 rounded-full bg-ivory/90 px-5 py-2 text-sm font-semibold backdrop-blur">{s.options[active].t}</div>
        </div>
      </div>
      <div className="space-y-4">
        {s.options.map((o, i) => <OptionCard key={o.t} o={o} i={i} active={active === i} onActive={setActive} />)}
      </div>
    </div>
  );
}

export function OptionCard({ o, i, active, onActive }: { o: Service["options"][number]; i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(i); }, [inView, onActive, i]);
  return (
    <div ref={ref} className={` p-8 transition-all duration-500 md:flex md:min-h-[42vh] md:flex-col md:justify-center md:p-10 ${active ? "bg-ivory shadow-xl" : "md:opacity-40"}`}>
      <span className="text-sm font-semibold text-brass">0{i + 1}</span>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{o.t}</h3>
      <p className="mt-4 max-w-md text-lg text-ink/70">{o.d}</p>
    </div>
  );
}

// Common questions: native <details> so every answer is in the page HTML for search engines and
// AI assistants, while visitors open one at a time. The first is open so the format is obvious.
export function Faqs({ name, faqs, links = [] }: { name: string; faqs: { q: string; a: string }[]; links?: { t: string; href: string }[] }) {
  return (
    <section id="faq" className="px-5 pb-24 md:px-12 md:pb-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <Label>FAQ</Label>
          <Heading text="Questions about" accent={name.toLowerCase()} />
          <Reveal><p className="mt-6 max-w-sm text-lg text-ink/70">Still unsure? Message us on WhatsApp or book a site visit and we&apos;ll answer for your space.</p></Reveal>
          {links.length > 0 && (
            <Reveal delay={0.1}>
              <p className="mt-10 text-xs font-semibold tracking-[0.2em] text-ink/65 uppercase">Read our guides</p>
              <ul className="mt-3 space-y-1">
                {links.map((l) => <li key={l.href}><Link href={l.href} className="group inline-flex min-h-11 items-center gap-2 text-lg font-semibold underline-offset-4 hover:underline"><span>{l.t}</span><span aria-hidden className="text-brass">↗</span></Link></li>)}
              </ul>
            </Reveal>
          )}
        </div>
        <div className="border-t border-ink/15">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 0.05}>
              <details open={i === 0} className="group border-b border-ink/15">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-xl font-semibold tracking-tight md:text-2xl [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <span aria-hidden className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/25 text-lg transition-transform duration-500 group-open:rotate-45 group-open:border-brass group-open:bg-brass group-open:text-ivory">+</span>
                </summary>
                <p className="max-w-[62ch] pb-7 text-lg leading-relaxed text-ink/75">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services page: each service is a large card that pins as you scroll, and the next one slides up over it.
// Cards already passed sink back slightly, so the pile reads as a stack. All content stays in the page.
export function StackedServices({ list }: { list: Service[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative">
      {list.map((s, i) => <StackCard key={s.slug} s={s} i={i} n={list.length} p={scrollYProgress} />)}
    </div>
  );
}

function StackCard({ s, i, n, p }: { s: Service; i: number; n: number; p: MotionValue<number> }) {
  // Shrinks a little for every card that lands on top of it
  const scale = useTransform(p, [i / n, 1], [1, 1 - (n - 1 - i) * 0.035]);
  const dim = useTransform(p, [i / n, Math.min(1, (i + 1) / n)], [0, i === n - 1 ? 0 : 0.25]);
  return (
    <div className="sticky h-[88svh] pt-6 md:h-[86svh]" style={{ top: `calc(5.5rem + ${i * 14}px)` }}>
      <motion.div style={{ scale }} className="relative h-full origin-top overflow-hidden rounded-2xl bg-ink text-ivory shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.45)]">
        <Link href={`/services/${s.slug}`} className="group flex h-full flex-col md:grid md:grid-cols-[1.25fr_1fr]">
          <div className="relative h-[42%] shrink-0 overflow-hidden md:h-full">
            <Pic src={img(s.i, 1600)} alt={s.t} sizes="(min-width: 768px) 55vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-between gap-6 p-6 md:p-12">
            <div>
              <p className="flex items-baseline justify-between text-sm font-semibold tracking-[0.2em] text-ivory/65 uppercase">
                <span>Service</span><span className="font-mono text-brass">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              </p>
              <h2 className="mt-5 text-4xl leading-[1] font-semibold tracking-tight md:mt-8 md:text-6xl">{s.t}</h2>
              <p className="mt-4 max-w-md text-lg text-ivory/75 md:mt-6">{s.short}</p>
              <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
                {s.options.map((o) => <li key={o.t} className="rounded-full border border-ivory/20 px-4 py-1.5 text-sm">{o.t}</li>)}
              </ul>
            </div>
            <span className="inline-flex items-center gap-3 self-start rounded-full bg-brass py-2 pr-2 pl-6 font-semibold text-ink">
              Explore {s.t.toLowerCase()}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-ivory transition-transform duration-500 group-hover:rotate-45"><ArrowGlyph /></span>
            </span>
          </div>
        </Link>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.div>
    </div>
  );
}

function ArrowGlyph() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 10L10 2M10 2H3.5M10 2v6.5" stroke="currentColor" strokeWidth="1.6" /></svg>;
}
