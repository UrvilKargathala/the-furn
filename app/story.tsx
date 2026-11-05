"use client";
import { useRef } from "react";
import type { MotionValue } from "motion/react";
import { Reveal, SplitText, ScrollWords, Counter, motion, useScroll, useTransform, MotionPic } from "./fx";
import { Label } from "./ui";

// Story chapters: photos swap and copy changes as the section scrolls (pinned, like prismae / pietra)
const chapters = [
  { n: "01", t: "We start on site", d: "Before a single sketch, we measure the room, study the light and learn how your family moves through it. Every module begins with your space, not a catalogue.", img: "/works/serene-art/cover.webp" },
  { n: "02", t: "We design around you", d: "Layouts, finishes and hardware are chosen with you, then shown in 3D so you can walk through the plan before anything is cut.", img: "/works/noir-arc/cover.webp" },
  { n: "03", t: "We build it ourselves", d: "Every shutter is cut, edge-banded and assembled in our own workshop in Surat, then installed by the same team that made it.", img: "/works/island-axis/cover.webp" },
];

const stats: [number, string, string][] = [
  [250, "+", "Homes delivered across the city"],
  [12, "+", "Years of design & build experience"],
  [98, "%", "Clients who refer us to friends"],
  [100, "%", "Built in our own workshop"],
];

function ChapterImg({ src, i, n, p }: { src: string; i: number; n: number; p: MotionValue<number> }) {
  const clip = useTransform(p, i === 0 ? [0, 1] : [Math.max(0, i / n - 0.1), i / n + 0.04],
    i === 0 ? ["inset(0% 0 0 0)", "inset(0% 0 0 0)"] : ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const scale = useTransform(p, [i / n - 0.1, (i + 1) / n], [1.3, 1.05]);
  return (
    <motion.div style={{ clipPath: clip }} className="absolute inset-0">
      <MotionPic src={src} alt="" sizes="(min-width: 768px) 50vw, 100vw" style={{ scale }} className="h-full w-full object-cover" />
    </motion.div>
  );
}

function ChapterText({ c, i, n, p }: { c: (typeof chapters)[number]; i: number; n: number; p: MotionValue<number> }) {
  const a = i / n, b = (i + 1) / n, first = i === 0, last = i === n - 1;
  const from = first ? 0 : a - 0.06;
  const range = [from, a + 0.04, b - 0.08, b - 0.02];
  const opacity = useTransform(p, range, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(p, range, [first ? 0 : 40, 0, 0, last ? 0 : -40]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <span className="font-mono text-sm tracking-[0.2em] text-brass">{c.n} / 0{n}</span>
      <h3 className="mt-4 text-4xl leading-[1] font-bold tracking-[-0.03em] md:text-7xl">{c.t}</h3>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70 md:text-xl">{c.d}</p>
    </motion.div>
  );
}

function Chapters() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = chapters.length;
  return (
    <div ref={ref} style={{ height: `${n * 95}vh` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-6 px-5 pt-20 md:grid md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16 md:px-12 md:pt-0">
        <div className="relative h-[40svh] overflow-hidden bg-ink md:h-[78svh]">
          {chapters.map((c, i) => <ChapterImg key={c.n} src={c.img} i={i} n={n} p={p} />)}
        </div>
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="relative h-[36svh] md:h-[52svh]">
            {chapters.map((c, i) => <ChapterText key={c.n} c={c} i={i} n={n} p={p} />)}
          </div>
          <div className="h-px w-full bg-ink/15"><motion.div style={{ scaleX: p }} className="h-full origin-left bg-ink" /></div>
        </div>
      </div>
    </div>
  );
}

export function OurStory() {
  return (
    <section id="about" className="pt-28 md:pt-40">
      <div className="px-5 md:px-12">
        <div className="flex items-center justify-between">
          <div className="shrink-0 whitespace-nowrap"><Label>Our Story</Label></div>
          <span className="text-right font-mono text-xs tracking-[0.2em] text-ink/50 uppercase">Surat, Gujarat · Est. 2014</span>
        </div>
        <h2 className="mt-8 text-[13vw] leading-[0.9] font-bold tracking-[-0.04em] md:text-[9vw]">
          <span className="block"><SplitText text="Furniture that" /></span>
          <span className="block text-ink/35"><SplitText text="fits your life." delay={0.2} /></span>
        </h2>
        <div className="mt-16 md:mt-24 md:ml-[30%]">
          <ScrollWords className="text-3xl leading-[1.12] font-medium tracking-tight md:text-5xl"
            text="A home works best when its furniture is made for it. We design modular kitchens, wardrobes and interiors around your space, your routine and the way you live." />
        </div>
      </div>

      <div className="mt-24 md:mt-32"><Chapters /></div>

      <div className="px-5 md:px-12">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map(([n, s, t], i) => (
            <Reveal key={t} delay={i * 0.08} className="border-t border-ink/15 py-8 pr-4 md:py-10">
              <dt className="text-6xl font-semibold tracking-tight md:text-8xl"><Counter to={n} suffix={s} /></dt>
              <dd className="mt-3 max-w-[16ch] text-sm text-ink/60">{t}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
