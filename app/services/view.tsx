"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, type MotionValue } from "motion/react";
import { SmoothScroll, Reveal, SplitText, ScrollWords, Counter, RollText, WideningImage, motion, useScroll, useTransform, ease } from "../fx";
import { img, services } from "../data";
import { Label, Heading, Arrow, Nav, Cta, Footer } from "../ui";

type Service = (typeof services)[number];

// Card: photo zooms on hover and a scrolling "Explore" strip slides across it (primedecor + lunarch)
function ServiceCard({ s, i }: { s: Service; i: number }) {
  return (
    <Link href={`/services/${s.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(s.i, 1400)} alt={s.t} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
        <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 scale-y-0 overflow-hidden bg-ivory py-3 text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100">
          <div className="flex w-max animate-marquee gap-8 text-sm font-semibold tracking-[0.15em] whitespace-nowrap uppercase">
            {Array.from({ length: 12 }, (_, k) => <span key={k}>Explore {s.t} <span className="text-brass">↗</span></span>)}
          </div>
        </div>
        <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-ivory/90 text-ink backdrop-blur transition-transform duration-500 group-hover:rotate-45">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" /></svg>
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">{s.t}</h3>
        <span className="text-sm font-semibold text-ink/40">({String(i + 1).padStart(2, "0")})</span>
      </div>
      <p className="mt-2 max-w-md text-ink/70">{s.short}</p>
    </Link>
  );
}

const reasons = [
  { t: "Made to measure", d: "Every module is sized to your wall, your ceiling and your appliances, never a catalogue size.", c: "bg-ink text-ivory", r: -5 },
  { t: "In-house factory", d: "Cut, edge-banded and assembled under one roof for precision you can see in every joint.", c: "bg-brass text-ivory", r: 4 },
  { t: "45-day delivery", d: "A fixed timeline from design sign-off to handover, with weekly site updates.", c: "bg-sand text-ink", r: -3 },
  { t: "10-year warranty", d: "Branded hardware and BWP carcasses backed by a decade-long warranty.", c: "bg-walnut text-ivory", r: 2 },
];

// Cards fly up one by one and settle into a tilted pile while the section is pinned (linoxa)
function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
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
function ReasonCard({ r, i, p }: { r: (typeof reasons)[number]; i: number; p: MotionValue<number> }) {
  const n = reasons.length;
  const start = i === 0 ? -1 : (i - 1) / (n - 1) * 0.85;
  const end = i === 0 ? 0 : start + 0.85 / (n - 1);
  const y = useTransform(p, [start, end], ["110vh", "0vh"]);
  const rotate = useTransform(p, [start, end], [r.r * 3, r.r]);
  return (
    <motion.div style={{ y, rotate }} className={`absolute inset-0 flex flex-col justify-between rounded-[28px] p-8 shadow-2xl md:p-10 ${r.c}`}>
      <span className="text-sm font-semibold opacity-60">0{i + 1} / 0{n}</span>
      <div>
        <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{r.t}</h3>
        <p className="mt-4 opacity-80">{r.d}</p>
      </div>
    </motion.div>
  );
}

export function ServicesView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Hero: big split title + stats row (primedecor) */}
      <section className="px-5 pt-40 pb-20 md:px-12 md:pt-48">
        <Label>Our Services</Label>
        <h1 className="mt-6 text-[13vw] leading-[0.9] font-bold tracking-[-0.04em] md:text-[8vw]">
          <span className="block"><SplitText text="Tailored furniture" /></span>
          <span className="block text-ink/35"><SplitText text="for every room" delay={0.2} /></span>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <Reveal delay={0.4}><p className="max-w-lg text-lg text-ink/70">From the kitchen to the wardrobe, every piece is designed in-house and built to your exact measurements, with one team taking you from first sketch to handover.</p></Reveal>
          <Reveal delay={0.5}>
            <a href="#contact" className="group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>Book a consultation</RollText><Arrow /></a>
          </Reveal>
        </div>
        <div className="mt-20 grid grid-cols-2 border-t border-ink/15 md:grid-cols-4">
          {[[12, "+", "Years of experience"], [250, "+", "Homes delivered"], [6, "", "Cities served"], [10, " yr", "Hardware warranty"]].map(([n, s, t], i) => (
            <Reveal key={t as string} delay={i * 0.1} className="border-b border-ink/15 py-6 md:border-b-0 md:py-8">
              <p className="text-sm text-ink/60">{t}</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl"><Counter to={n as number} suffix={s as string} /></p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="px-5 pb-28 md:px-12">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.15} className={i % 2 ? "md:mt-28" : ""}>
              <ServiceCard s={s} i={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <WhyUs />
      <Cta />
      <Footer />
    </main>
  );
}

// Detail page pieces ------------------------------------------------------


// Option list scrolls on the right; the pinned photo on the left follows the active option (linoxa)
function Options({ s }: { s: Service }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="hidden md:block">
        <div className="sticky top-28 h-[70vh] overflow-hidden rounded-[28px] bg-ink">
          {s.options.map((o, i) => (
            <motion.div key={o.t} className="absolute inset-0" initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }} transition={{ duration: 0.9, ease }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(o.i)} alt={o.t} className="h-full w-full object-cover" />
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
function OptionCard({ o, i, active, onActive }: { o: Service["options"][number]; i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(i); }, [inView, onActive, i]);
  return (
    <div ref={ref} className={`rounded-[24px] p-8 transition-all duration-500 md:flex md:min-h-[42vh] md:flex-col md:justify-center md:p-10 ${active ? "bg-ivory shadow-xl" : "md:opacity-40"}`}>
      <span className="text-sm font-semibold text-brass">0{i + 1}</span>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{o.t}</h3>
      <p className="mt-4 max-w-md text-ink/70">{o.d}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(o.i, 1000)} alt={o.t} className="mt-6 aspect-[4/3] w-full rounded-[18px] object-cover md:hidden" />
    </div>
  );
}

export function ServiceDetailView({ s }: { s: Service }) {
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Hero: breadcrumb, title, actions (lunarch) */}
      <section className="px-5 pt-36 pb-16 md:px-12 md:pt-44">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink/50">
            <Link href="/services" className="hover:text-ink">Services</Link><span>/</span><span className="text-ink">{s.t}</span>
          </nav>
        </Reveal>
        <h1 className="mt-6 text-[14vw] leading-[0.9] font-bold tracking-[-0.04em] md:text-[9vw]"><SplitText text={s.t} /></h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <Reveal delay={0.3}>
            <p className="max-w-lg text-lg text-ink/70">{s.short}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => <span key={t} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm">{t}</span>)}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <a href="#contact" className="group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>Get a free quote</RollText><Arrow /></a>
          </Reveal>
        </div>
      </section>

      <WideningImage src={img(s.i, 2400)} alt={s.t} />

      {/* Overview article: heading pins while the copy scrolls */}
      <section className="px-5 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <Label>Overview</Label>
            <Heading text="Designed around" accent="everyday living" />
          </div>
          <div>
            <ScrollWords className="text-2xl leading-snug font-medium tracking-tight md:text-4xl" text={s.intro[0]} />
            <Reveal><p className="mt-8 text-lg text-ink/70">{s.intro[1]}</p></Reveal>
            {s.sections.map((sec) => (
              <Reveal key={sec.h} className="mt-16 border-t border-ink/15 pt-10">
                <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">{sec.h}</h3>
                {sec.p.map((para) => <p key={para} className="mt-4 text-lg text-ink/70">{para}</p>)}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="mx-3 rounded-[28px] bg-ink px-5 py-24 text-ivory md:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div><Label dark>Deliverables</Label><Heading text="What you" accent="get" dark /></div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {s.deliverables.map((d, i) => (
              <Reveal key={d} delay={i * 0.06}>
                <li className="flex items-start gap-4 border-b border-ivory/15 py-5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass text-xs">✓</span>
                  <span className="text-lg">{d}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Options */}
      <section className="mt-3 rounded-[40px] bg-sand px-5 py-28 md:px-12">
        <Label>Styles & options</Label>
        <Heading text="Choose what" accent="fits your space" />
        <Options s={s} />
      </section>

      {/* Process: numbered grid (lunarch) */}
      <section className="px-5 py-28 md:px-12">
        <Label>Our process</Label>
        <Heading text="A clear path from" accent="idea to install" />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {s.process.map((p, i) => (
            <Reveal key={p.t} delay={(i % 3) * 0.1} className="bg-ivory p-8 md:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-brass text-sm font-semibold text-brass">0{i + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-3 text-ink/70">{p.d}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="flex flex-col justify-between bg-brass p-8 text-ivory md:p-10">
            <p className="text-2xl font-semibold tracking-tight">Ready to start?</p>
            <a href="#contact" className="group mt-8 inline-flex items-center gap-3 font-semibold"><RollText>Book a site visit</RollText><Arrow /></a>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="px-5 pb-28 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label>Explore more</Label><Heading text="Other" accent="services" /></div>
          <Reveal><Link href="/services" className="group flex items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-ivory"><RollText>All services</RollText><Arrow /></Link></Reveal>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {others.map((o) => (
            <Reveal key={o.slug} delay={0.1}>
              <ServiceCard s={o} i={services.indexOf(o)} />
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
