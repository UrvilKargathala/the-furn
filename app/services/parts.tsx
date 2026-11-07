"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, type MotionValue } from "motion/react";
import { motion, useTransform, ease, useSmoothScroll } from "../fx";
import { img } from "../content/site";
import { Label } from "../ui";
import { Pic } from "../pic";
import type { Service } from "../content/types";

export const reasons = [
  { t: "Made to measure", d: "Every module is sized to your wall, your ceiling and your appliances, never a catalogue size.", c: "bg-ink text-ivory", r: -5 },
  { t: "In-house factory", d: "Cut, edge-banded and assembled under one roof for precision you can see in every joint.", c: "bg-brass text-ivory", r: 4 },
  { t: "45-day delivery", d: "A fixed timeline from design sign-off to handover, with weekly site updates.", c: "bg-sand text-ink", r: -3 },
  { t: "10-year warranty", d: "Branded hardware and BWP carcasses backed by a decade-long warranty.", c: "bg-walnut text-ivory", r: 2 },
];

// Cards fly up one by one and settle into a tilted pile while the section is pinned (linoxa)
export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-5 pt-16">
        <div className="mb-10 text-center">
          
          <Label>Why The Furn</Label>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Built differently, <span className="text-ink/35">built to last</span></h2>
        </div>
        <div className="relative h-[52svh] w-full max-w-md">
          {reasons.map((r, i) => <ReasonCard key={r.t} r={r} i={i} p={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}

export function ReasonCard({ r, i, p }: { r: (typeof reasons)[number]; i: number; p: MotionValue<number> }) {
  const n = reasons.length;
  const start = i === 0 ? -1 : (i - 1) / (n - 1) * 0.85;
  const end = i === 0 ? 0 : start + 0.85 / (n - 1);
  const y = useTransform(p, [start, end], ["110vh", "0vh"]);
  const rotate = useTransform(p, [start, end], [r.r * 3, r.r]);
  return (
    <motion.div style={{ y, rotate }} className={`absolute inset-0 flex flex-col justify-between p-8 shadow-2xl md:p-10 ${r.c}`}>
      <span className="text-sm font-semibold opacity-60">0{i + 1} / 0{n}</span>
      <div>
        <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{r.t}</h3>
        <p className="mt-4 opacity-80">{r.d}</p>
      </div>
    </motion.div>
  );
}

// Option list scrolls on the right; the pinned photo on the left follows the active option (linoxa)
export function Options({ s }: { s: Service }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="hidden md:block">
        <div className="sticky top-28 h-[70vh] overflow-hidden bg-ink">
          {s.options.map((o, i) => (
            <motion.div key={o.t} className="absolute inset-0" initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }} transition={{ duration: 0.9, ease }}>
              <Pic src={img(o.i)} alt={o.t} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
            </motion.div>
          ))}
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
      <p className="mt-4 max-w-md text-ink/70">{o.d}</p>
      <Pic src={img(o.i, 1000)} alt={o.t} className="mt-6 aspect-[4/3] w-full object-cover md:hidden" />
    </div>
  );
}
