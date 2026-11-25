"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView } from "motion/react";
import { motion, ease, Reveal } from "../fx";
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
