"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, useMotionValueEvent, type MotionValue } from "motion/react";
import { SmoothScroll, Reveal, SplitText, ScrollWords, RollText, ParallaxImg, motion, useScroll, useTransform, ease } from "../fx";
import { img } from "../data";
import { Label, Heading, Arrow, Nav, Footer } from "../ui";

// ponytail: placeholder studio content, replace with real team, awards and history
const numbers = [
  { n: "250+", k: "Homes delivered", d: "From compact city apartments to four-bedroom villas, every one designed around the family living in it." },
  { n: "12+", k: "Years of craft", d: "Twelve years of designing, building and refining, and learning something from every home." },
  { n: "6", k: "Cities served", d: "Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar and Bhavnagar, with our own install teams." },
  { n: "98%", k: "Clients refer us", d: "Most of our new projects come from families we've already worked with, and their friends." },
];

const principles = [
  { t: "Made to measure", d: "No catalogue sizes. Every module is drawn for your wall, your ceiling and your appliances." },
  { t: "Honest pricing", d: "An itemised quote you sign off before production, with no surprise add-ons at handover." },
  { t: "Built in-house", d: "Our own workshop cuts, edges and assembles every module, so quality never leaves our hands." },
  { t: "Here after handover", d: "A 10-year hardware warranty and a team that picks up the phone when you call." },
];

const journey = [
  { y: "2014", t: "The first workshop", d: "Two carpenters and a designer start building kitchens in a 1,200 sq ft shed in Ahmedabad." },
  { y: "2017", t: "Modular, in-house", d: "We invest in CNC cutting and edge-banding machines and bring all production under one roof." },
  { y: "2020", t: "Complete interiors", d: "Clients ask for whole homes, so we grow a design team to plan every room together." },
  { y: "2023", t: "Six cities", d: "Dedicated install teams take The Furn to Surat, Vadodara, Rajkot and beyond." },
  { y: "2026", t: "The Furn studio", d: "A new design studio and material library where clients can touch every finish before choosing." },
];

const team = [
  { n: "Arjun Mehta", r: "Founder & Design Lead", i: "1500648767791-00dcc994a43e" },
  { n: "Riya Shah", r: "Head of Interiors", i: "1494790108377-be9c29b29330" },
  { n: "Karan Patel", r: "Production Manager", i: "1506794778202-cad84cf45f1d" },
  { n: "Neha Desai", r: "Client Experience", i: "1544005313-94ddf0286df2" },
];

const awards = [
  { y: "2026", t: "Best Modular Kitchen Studio", o: "Gujarat Interior Awards" },
  { y: "2025", t: "Excellence in Residential Design", o: "Home & Design Trends" },
  { y: "2024", t: "Top 10 Interior Brands, Gujarat", o: "Interior Today" },
  { y: "2023", t: "Craftsmanship Award", o: "Indian Furniture Council" },
];

const roles = [
  { t: "Interior Designer", m: ["Full-time", "Ahmedabad", "2–4 yrs"] },
  { t: "3D Visualiser", m: ["Full-time", "Ahmedabad", "1–3 yrs"] },
  { t: "Site Supervisor", m: ["Full-time", "Surat", "3+ yrs"] },
  { t: "Sales Consultant", m: ["Full-time", "Vadodara", "1–3 yrs"] },
];

// Full-screen pinned photo; the big number swaps as you scroll through (primedecor)
function Numbers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(numbers.length - 1, Math.floor(v * numbers.length))));
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  return (
    <section ref={ref} className="relative" style={{ height: `${numbers.length * 90}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-ink text-ivory">
        { }
        <motion.img src={img("1600566753190-17f0baa2a6c3", 2400)} alt="" style={{ scale }} className="absolute inset-0 h-full w-full object-cover opacity-35" />
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
function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  return (
    <ol ref={ref} className="relative ml-2">
      <span className="absolute top-0 bottom-0 left-0 w-px bg-ink/15" />
      <motion.span style={{ scaleY: scrollYProgress }} className="absolute top-0 bottom-0 left-0 w-px origin-top bg-brass" />
      {journey.map((j, i) => <Milestone key={j.y} j={j} i={i} p={scrollYProgress} />)}
    </ol>
  );
}
function Milestone({ j, i, p }: { j: (typeof journey)[number]; i: number; p: MotionValue<number> }) {
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
const risers = [
  { i: "1556912173-3bb406ef7e77", x: "8%", r: -8 },
  { i: "1616486338812-3dadae4b4ace", x: "62%", r: 6 },
  { i: "1618221195710-dd6b41faaea6", x: "30%", r: -4 },
  { i: "1600210492486-724fe5c67fb0", x: "78%", r: 9 },
];
function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} id="contact" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-5">
        <p aria-hidden className="absolute text-[24vw] leading-none font-bold tracking-[-0.05em] whitespace-nowrap text-ink/[0.06]">THE FURN</p>
        {risers.map((r, k) => <Riser key={r.i} r={r} k={k} p={scrollYProgress} />)}
        <div className="relative z-10 text-center">
          <h2 className="mx-auto max-w-3xl text-5xl leading-[1] font-bold tracking-tight md:text-8xl">
            <SplitText text="Ready to transform" /><SplitText text="your space?" className="text-ink/35" delay={0.2} />
          </h2>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="mailto:hello@thefurn.in" className="group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>Book a consultation</RollText><Arrow /></a>
            <Link href="/works" className="group rounded-full border border-ink/20 bg-ivory/80 px-6 py-3 font-semibold backdrop-blur"><RollText>See our work</RollText></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Riser({ r, k, p }: { r: (typeof risers)[number]; k: number; p: MotionValue<number> }) {
  const start = k * 0.15;
  const y = useTransform(p, [start, start + 0.55], ["70vh", "-90vh"]);
  const rotate = useTransform(p, [start, start + 0.55], [0, r.r]);
  return (
    <motion.div style={{ y, rotate, left: r.x }} className="absolute top-1/2 aspect-[4/5] w-36 overflow-hidden rounded-2xl shadow-2xl md:w-56">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(r.i, 600)} alt="" className="h-full w-full object-cover" />
    </motion.div>
  );
}

export function StudioView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Split hero (raumora) */}
      <section className="grid gap-10 px-5 pt-36 pb-20 md:grid-cols-[1.1fr_1fr] md:items-end md:px-12 md:pt-44">
        <div>
          <Label>Our Studio</Label>
          <h1 className="mt-6 text-[12vw] leading-[0.92] font-bold tracking-[-0.04em] md:text-[6.5vw]">
            <span className="block"><SplitText text="Crafting homes" /></span>
            <span className="block text-ink/35"><SplitText text="that fit your life" delay={0.2} /></span>
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-md text-lg text-ink/70">The Furn is a design-and-build studio for modular kitchens, wardrobes and complete interiors, with our own workshop and our own install teams.</p>
            <Link href="/works" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>View our work</RollText><Arrow /></Link>
          </Reveal>
        </div>
        <ParallaxImg src={img("1600210492486-724fe5c67fb0", 1600)} alt="Living room designed by The Furn" className="aspect-[4/5] rounded-[28px] md:aspect-[4/4.6]" />
      </section>

      {/* Who we are (primedecor) */}
      <section className="px-5 py-24 md:px-12 md:py-36">
        <div className="grid gap-10 md:grid-cols-[1fr_2.4fr]">
          <div className="space-y-6 text-sm">
            <Label>Who we are</Label>
            <Reveal><p className="text-ink/50">Based in</p><p className="font-semibold">Ahmedabad, India</p></Reveal>
            <Reveal delay={0.1}><p className="text-ink/50">Since</p><p className="font-semibold">2014 – Present</p></Reveal>
          </div>
          <div>
            <ScrollWords className="text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
              text="We believe a home should be felt, not just seen. For over a decade we've helped families build kitchens they love cooking in, wardrobes that hold everything, and rooms that balance beauty with real life. No showroom sizes, no shortcuts, no compromise." />
            <Reveal><Link href="/works" className="group mt-10 inline-flex items-center gap-2 font-semibold"><RollText>See all projects</RollText><span className="transition-transform duration-500 group-hover:translate-x-1">→</span></Link></Reveal>
          </div>
        </div>
      </section>

      <Numbers />

      {/* Mission & vision (lunarch / raumora) */}
      <section className="px-5 py-28 md:px-12">
        <Label>Our foundation</Label>
        <Heading text="What drives" accent="every project" />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { h: "Our mission", p: "To design and build furniture that fits each home perfectly, with honest pricing, in-house quality and a team that stays with you long after handover.", i: "1556911220-bff31c812dba" },
            { h: "Our vision", p: "To make made-to-measure interiors the norm, not a luxury, so every family can live in a home designed around them.", i: "1618221195710-dd6b41faaea6" },
          ].map((c, k) => (
            <Reveal key={c.h} delay={k * 0.15}>
              <article className="group overflow-hidden rounded-[28px] bg-sand">
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(c.i, 1400)} alt="" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{c.h}</h3>
                  <p className="mt-4 text-lg text-ink/70">{c.p}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles (prismae) */}
      <section className="mx-3 rounded-[28px] bg-ink px-5 py-24 text-ivory md:px-12">
        <Label dark>Principles</Label>
        <Heading text="The ideas that shape" accent="every space" dark />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.1} className="group bg-ink p-8 transition-colors duration-500 hover:bg-walnut md:p-10">
              <span className="text-sm font-semibold text-brass">0{i + 1}</span>
              <h3 className="mt-12 text-2xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-3 text-ivory/70">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journey timeline (lunarch) */}
      <section className="px-5 py-28 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <Label>Our journey</Label>
            <Heading text="Moments that" accent="shaped us" />
          </div>
          <Journey />
        </div>
      </section>

      {/* Team (stux / raumora): photos warm up from greyscale on hover */}
      <section className="px-5 pb-28 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label>The team</Label><Heading text="The people" accent="behind every space" /></div>
          <Reveal><p className="max-w-xs text-ink/70">Designers, makers and fitters who care about the last millimetre as much as you do.</p></Reveal>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {team.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.1} className={i % 2 ? "md:mt-16" : ""}>
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-[22px] bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(m.i, 800)} alt={m.n} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <h3 className="mt-4 text-lg font-semibold md:text-xl">{m.n}</h3>
                <p className="text-sm text-ink/60">{m.r}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Awards (stux): rows fill with colour on hover */}
      <section className="px-5 pb-28 md:px-12">
        <Label>Recognition</Label>
        <Heading text="Honoured for" accent="our craft" />
        <ul className="mt-14 border-t border-ink/15">
          {awards.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.06}>
              <li className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b border-ink/15 px-2 py-6 md:grid-cols-[8rem_1fr_1fr_3rem] md:gap-8 md:px-4 md:py-8">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-sand transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                <span className="relative w-fit rounded-full bg-brass px-3 py-1 text-xs font-semibold text-ivory">{a.y}</span>
                <span className="relative text-xl font-semibold tracking-tight md:text-3xl">{a.t}</span>
                <span className="relative hidden text-ink/60 md:block">{a.o}</span>
                <span className="relative text-sm text-ink/40">0{i + 1}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Careers (homespaceid) */}
      <section className="mx-3 rounded-[40px] bg-sand px-5 py-24 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
          <div>
            <Label>Careers</Label>
            <Heading text="Join the" accent="studio team" />
            <Reveal><p className="mt-6 max-w-sm text-ink/70">We&apos;re always looking for people who love good design and better craftsmanship.</p></Reveal>
          </div>
          <ul className="space-y-3">
            {roles.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.08}>
                <li>
                  <a href={`mailto:careers@thefurn.in?subject=${encodeURIComponent(r.t)}`} className="group flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-ivory p-6 transition-shadow duration-500 hover:shadow-xl md:p-8">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{r.t}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {r.m.map((m) => <span key={m} className="rounded-full border border-ink/15 px-3 py-1 text-xs">{m}</span>)}
                      </div>
                    </div>
                    <span className="flex items-center gap-3 text-sm font-semibold"><RollText>Apply now</RollText><Arrow className="bg-ink text-ivory" /></span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </main>
  );
}
