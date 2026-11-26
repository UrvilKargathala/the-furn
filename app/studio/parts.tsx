"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import type { MotionValue } from "motion/react";
import { Reveal, SplitText, RollText, motion, useTransform, MotionPic, useSmoothScroll } from "../fx";
import { img, STATS } from "../content/site";
import { Globe } from "./globe";
import { Label, Arrow } from "../ui";
import { Pic } from "../pic";

// ponytail: placeholder studio content, replace with real team, awards and history

const journey = [
  { y: "Before", t: "Two decades at the bench", d: `Our founders spend ${STATS.years}+ years designing and building kitchens, wardrobes and interiors.` },
  { y: "2021", t: "The Furn is founded", d: "A design-and-build studio opens in Surat, with every module precision-built on German machinery." },
  { y: "Today", t: "Across India", d: `Our own install teams work in ${STATS.cities.slice(0, -1).join(", ")} and ${STATS.cities.at(-1)}.` },
];

// Three stand-alone sections replace the old pinned "in numbers" scroller

// 1. Homes delivered: full-bleed photo with the big number
export function HomesStat() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-ivory">
      <MotionPic src={"/works/avadh-ayuska/02.jpg"} alt="" style={{ scale }} className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="relative flex min-h-svh flex-col justify-between p-6 pt-28 md:p-12 md:pt-32">
        <Label dark>In numbers</Label>
        <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-[28vw] leading-[0.8] font-bold tracking-[-0.05em] md:text-[17vw]">{STATS.homes}+</p>
            <p className="mt-4 text-sm font-semibold tracking-[0.2em] uppercase">(Homes delivered)</p>
          </Reveal>
          <Reveal delay={0.15}><p className="max-w-sm text-lg text-ivory/80">From compact city apartments to four-bedroom villas, every one designed around the family living in it.</p></Reveal>
        </div>
      </div>
    </section>
  );
}

// 2. Years of craft + hardware warranty, side by side
export function CraftStats() {
  const items = [
    { n: `${STATS.years}+`, k: "Years of craft", d: `${STATS.years}+ years of designing, building and refining, and learning something from every home.` },
    { n: `${STATS.warrantyYears} yr`, k: "Hardware warranty", d: "Every hinge, channel and fitting we install is covered, and we come back if anything needs attention." },
  ];
  return (
    <section className="grid border-b border-ink/10 md:grid-cols-2">
      {items.map((x, k) => (
        <Reveal key={x.k} delay={k * 0.15} className={`px-5 py-20 md:px-12 md:py-28 ${k ? "border-t border-ink/10 md:border-t-0 md:border-l" : ""}`}>
          <p className="text-[22vw] leading-[0.85] font-bold tracking-[-0.05em] md:text-[9vw]">{x.n.replace(/(\+| yr)$/, "")}<span className="text-brass">{x.n.match(/(\+| yr)$/)?.[0]}</span></p>
          <p className="mt-5 text-sm font-semibold tracking-[0.2em] uppercase text-ink/65">({x.k})</p>
          <p className="mt-5 max-w-md text-lg text-ink/70">{x.d}</p>
        </Reveal>
      ))}
    </section>
  );
}

// 3. Cities served: light particle globe with city labels and dotted routes from the hub (see globe.tsx)
const CITY_COORDS: Record<string, [number, number]> = {
  Surat: [21.17, 72.83], Mumbai: [19.08, 72.88], "Navi Mumbai": [19.03, 73.03], Ahmedabad: [23.02, 72.57],
  Hyderabad: [17.39, 78.49], Pune: [18.52, 73.86], Vadodara: [22.31, 73.18], Rajkot: [22.3, 70.8],
  Gandhinagar: [23.22, 72.65], Bhavnagar: [21.76, 72.15], Navsari: [20.95, 72.93], Vapi: [20.37, 72.9], Bharuch: [21.7, 72.98],
};
const HUB = "Surat";

const SERVED = STATS.cities.filter((c) => CITY_COORDS[c]);

export function CitiesMap() {
  const cities = SERVED;
  const [active, setActive] = useState(HUB);
  return (
    <section className="overflow-hidden border-b border-ink/10 px-5 py-24 md:px-12 md:py-32">
      <Label>Cities served</Label>
      <div className="mt-6 grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-center">
        <div>
          <Reveal><p className="text-[22vw] leading-[0.85] font-bold tracking-[-0.05em] md:text-[9vw]">{cities.length}<span className="text-brass"> cities</span></p></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-md text-lg text-ink/70">Designed in {HUB}, installed by our own teams. Pick a city to see where we work.</p></Reveal>
          <ul className="mt-10 flex flex-wrap gap-2">
            {cities.map((c) => (
              <li key={c}>
                <button type="button" onMouseEnter={() => setActive(c)} onFocus={() => setActive(c)} onClick={() => setActive(c)} aria-pressed={active === c}
                  className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors duration-300 ${active === c ? "border-brass bg-brass text-ivory" : "border-ink/15 text-ink/75 hover:border-ink/40"}`}>
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-3xl md:-my-20">
          <Globe cities={cities} coords={CITY_COORDS} hub={HUB} active={active} onSelect={setActive}
            label={`Globe showing the cities we serve: ${cities.join(", ")}. Drag to spin.`} />
        </div>
      </div>
    </section>
  );
}

// Vertical line draws down as you scroll; each milestone dot lights up as the line reaches it (lunarch)
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  return (
    <ol ref={ref} className="relative ml-2">
      <span className="absolute top-0 bottom-0 left-0 w-px bg-ink/15" />
      <motion.span style={{ scaleY: scrollYProgress }} className="absolute top-0 bottom-0 left-0 w-px origin-top bg-brass" />
      {journey.map((j, i) => <Milestone key={j.y} j={j} i={i} p={scrollYProgress} />)}
    </ol>
  );
}

export function Milestone({ j, i, p }: { j: (typeof journey)[number]; i: number; p: MotionValue<number> }) {
  const at = i / (journey.length - 1);
  const bg = useTransform(p, [at - 0.05, at], ["#f3f1ed", "#c7843f"]);
  return (
    <li className="relative pb-16 pl-10 last:pb-0 md:pl-14">
      <motion.span style={{ backgroundColor: bg }} className="absolute top-1.5 -left-[7px] h-[15px] w-[15px] rounded-full border-2 border-brass" />
      <Reveal>
        <p className="text-5xl font-bold tracking-tight text-ink/20 md:text-7xl">{j.y}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{j.t}</h3>
        <p className="mt-2 max-w-lg text-ink/70">{j.d}</p>
      </Reveal>
    </li>
  );
}

// Photos rise and tilt over a giant wordmark while the CTA stays pinned (raumora)
export const risers = [
  // x = desktop lane; xs = phone/tablet lane. Photos pass behind the heading, never over it
  { i: "/works/atmosphere/02.jpg", x: "8%", xs: "4%", r: -8 },
  { i: "/works/casa-rivera/05.jpg", x: "62%", xs: "62%", r: 6 },
  { i: "/works/palladium/10.jpg", x: "30%", xs: "32%", r: -4 },
  { i: "/works/globcon/11.jpg", x: "78%", xs: "70%", r: 9 },
];

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} id="contact" className="relative h-[220vh] md:h-[260vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-5">
        <p aria-hidden className="absolute text-[24vw] leading-none font-bold tracking-[-0.05em] whitespace-nowrap text-ink/[0.06]">THE FURN</p>
        {risers.map((r, k) => <Riser key={r.i} r={r} k={k} p={scrollYProgress} />)}
        <div className="relative z-20 text-center">
          <h2 className="mx-auto max-w-3xl text-5xl leading-[1] font-bold tracking-tight md:text-8xl">
            <span className="block"><SplitText text="Ready to transform" /></span><span className="block"><SplitText text="your space?" className="text-[#92908c]" delay={0.2} /></span>
          </h2>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-fill btn-fill-brass group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>Book a consultation</RollText><Arrow /></Link>
            <Link href="/works" className="btn-fill btn-fill-ink group rounded-full border border-ink/20 bg-ivory/80 px-6 py-3 font-semibold backdrop-blur"><RollText>See our work</RollText></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Riser({ r, k, p }: { r: (typeof risers)[number]; k: number; p: MotionValue<number> }) {
  const start = k * 0.15;
  const y = useTransform(p, [start, start + 0.55], ["70vh", "-90vh"]);
  const rotate = useTransform(p, [start, start + 0.55], [0, r.r]);
  return (
    <div style={{ "--xs": r.xs, "--x": r.x } as React.CSSProperties}
      className="absolute top-1/2 z-0 left-[var(--xs)] w-28 lg:left-[var(--x)] lg:w-56">
      <motion.div style={{ y, rotate }} className="aspect-[4/5] w-full overflow-hidden shadow-2xl">
        <Pic src={img(r.i, 600)} alt="" sizes="20vw" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
}
