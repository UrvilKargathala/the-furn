"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, useMotionValueEvent, type MotionValue } from "motion/react";
import { Reveal, SplitText, RollText, motion, useTransform, ease, MotionPic, useSmoothScroll } from "../fx";
import { img, STATS } from "../content/site";
import { Label, Arrow } from "../ui";
import { Pic } from "../pic";

// ponytail: placeholder studio content, replace with real team, awards and history
const numbers = [
  { n: `${STATS.homes}+`, k: "Homes delivered", d: "From compact city apartments to four-bedroom villas, every one designed around the family living in it." },
  { n: `${STATS.years}+`, k: "Years of craft", d: `${STATS.years}+ years of designing, building and refining, and learning something from every home.` },
  { n: String(STATS.cities.length), k: "Cities served", d: `${STATS.cities.slice(0, -1).join(", ")} and ${STATS.cities.at(-1)}, with our own install teams.` },
  { n: `${STATS.warrantyYears} yr`, k: "Hardware warranty", d: "Every hinge, channel and fitting we install is covered, and we come back if anything needs attention." },
];

const journey = [
  { y: "Before", t: "Two decades at the bench", d: `Our founders spend ${STATS.years}+ years designing and building kitchens, wardrobes and interiors.` },
  { y: "2021", t: "The Furn is founded", d: "A design-and-build studio opens in Surat, with its own workshop behind every module." },
  { y: "Today", t: "Across India", d: `Our own install teams work in ${STATS.cities.slice(0, -1).join(", ")} and ${STATS.cities.at(-1)}.` },
];

// Full-screen pinned photo; the big number swaps as you scroll through (primedecor)
export function Numbers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.max(0, Math.min(numbers.length - 1, Math.floor(v * numbers.length)))));
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  return (
    <section ref={ref} className="relative" style={{ height: `${numbers.length * 90}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-ink text-ivory">
        { }
        <MotionPic preload src={"/works/avadh-ayuska/02.jpg"} alt="" style={{ scale }} className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative flex h-full flex-col justify-between p-6 pt-28 md:p-12 md:pt-32">
          
          <Label dark>In numbers</Label>
          <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }} transition={{ duration: 0.6, ease }}>
                <p className="text-[28vw] leading-[0.8] font-bold tracking-[-0.05em] md:text-[17vw]">{numbers[i].n}</p>
                <p className="mt-4 text-sm font-semibold tracking-[0.2em] uppercase">({numbers[i].k})</p>
              </motion.div>
            </AnimatePresence>
            <div>
              <AnimatePresence mode="wait">
                <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="max-w-sm text-lg text-ivory/80">{numbers[i].d}</motion.p>
              </AnimatePresence>
              <div className="mt-8 flex gap-2">
                {numbers.map((x, k) => <span key={x.k} className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-12 bg-brass" : "w-5 bg-ivory/30"}`} />)}
              </div>
            </div>
          </div>
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
            <Link href="/contact" className="group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>Book a consultation</RollText><Arrow /></Link>
            <Link href="/works" className="group rounded-full border border-ink/20 bg-ivory/80 px-6 py-3 font-semibold backdrop-blur"><RollText>See our work</RollText></Link>
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
