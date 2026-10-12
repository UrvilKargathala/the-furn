"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, type MotionValue } from "motion/react";
import { SmoothScroll, Reveal, SplitText, ScrollWords, RollText, WideningImage, motion, useScroll, useTransform, ease } from "../fx";
import { img, projects, workCats } from "../data";
import { Label, Heading, Arrow, Nav, Cta, Footer } from "../ui";

type Project = (typeof projects)[number];

const arrowSvg = <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" /></svg>;

// Card: hover zoom + "See project details" strip (primedecor), spec table underneath (resonance)
function WorkCard({ p, big }: { p: Project; big: boolean }) {
  return (
    <Link href={`/works/${p.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-[24px] bg-ink ${big ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(p.i, big ? 1800 : 1000)} alt={p.n} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 translate-y-full bg-ivory py-3 text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
          <div className="flex w-max animate-marquee gap-8 text-sm font-semibold tracking-[0.15em] whitespace-nowrap uppercase">
            {Array.from({ length: 12 }, (_, k) => <span key={k}>See project details <span className="text-brass">↗</span></span>)}
          </div>
        </div>
        <span className="absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur">{p.c}</span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">{p.n}</h3>
      <dl className="mt-3 grid grid-cols-3 border-t border-ink/15 pt-3 text-sm">
        {[["Area", p.area], ["Year", p.y], ["City", p.l]].map(([k, v]) => (
          <div key={k}><dt className="text-ink/50">{k}</dt><dd className="mt-0.5 font-medium">{v}</dd></div>
        ))}
      </dl>
    </Link>
  );
}

// Full-screen panel with drifting photo (arpeggio)
function Spotlight({ p }: { p: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <Link ref={ref} href={`/works/${p.slug}`} className="group relative flex h-svh flex-col justify-between overflow-hidden bg-ink p-6 text-ivory md:p-12">
      { }
      <motion.img src={img(p.i, 2400)} alt={p.n} style={{ y, scale: 1.25 }} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/70" />
      <Reveal className="relative max-w-2xl"><p className="text-2xl leading-snug font-medium md:text-4xl">{p.d}</p></Reveal>
      <div className="relative">
        <div className="flex items-end justify-between border-b border-ivory/40 pb-4 text-sm">
          <span>{p.client}</span><span>{p.l}, {p.y}</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-6">
          <div>
            <h3 className="text-5xl font-bold tracking-tight md:text-8xl"><SplitText text={p.n} /></h3>
            <p className="mt-2 text-ivory/70">{p.c}</p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ivory/50 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-ink">{arrowSvg}</span>
        </div>
      </div>
    </Link>
  );
}

export function WorksView() {
  const [cat, setCat] = useState("All");
  const shown = projects.filter((p) => cat === "All" || p.cat === cat);
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      <section className="px-5 pt-40 pb-14 md:px-12 md:pt-48">
        <Label>Our Works</Label>
        <h1 className="mt-6 text-[13vw] leading-[0.9] font-bold tracking-[-0.04em] md:text-[8vw]">
          <span className="block"><SplitText text="Homes we've" /></span>
          <span className="block text-ink/35"><SplitText text="brought to life" delay={0.2} /></span>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.4}><p className="max-w-lg text-lg text-ink/70">Kitchens, wardrobes and complete homes across Gujarat, each one designed around the family that lives in it.</p></Reveal>
          <Reveal delay={0.5}><p className="text-sm font-semibold tracking-[0.2em] text-ink/50 uppercase">{String(projects.length).padStart(2, "0")} projects</p></Reveal>
        </div>
      </section>

      {/* Filter tabs (homespaceid / resonance): active pill slides between tabs */}
      <section className="px-5 pb-28 md:px-12">
        <Reveal>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {workCats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-colors ${cat === c ? "border-ink text-ivory" : "border-ink/15 hover:border-ink/40"}`}>
                {cat === c && <motion.span layoutId="work-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Editorial grid (yoo): every fifth card spans two columns */}
        <motion.div layout className="mt-12 grid items-start gap-x-6 gap-y-14 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, k) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.7, ease, delay: k * 0.05 }} className={k % 5 === 0 ? "md:col-span-2" : ""}>
                <WorkCard p={p} big={k % 5 === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section>
        <div className="px-5 pb-14 md:px-12"><Label>Spotlight</Label><Heading text="Stories worth" accent="a closer look" /></div>
        {projects.slice(0, 2).map((p) => <Spotlight key={p.slug} p={p} />)}
      </section>

      <Cta />
      <Footer />
    </main>
  );
}

// Detail page pieces ------------------------------------------------------

// Pinned row of photos that slides sideways as you scroll down
function Gallery({ p }: { p: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = p.gallery.length;
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  // Measure how far the row must travel so the last photo ends on screen, at any width
  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  return (
    <section ref={ref} className="relative" style={{ height: `${n * 70}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="px-5 pb-10 md:px-12"><Label>Gallery</Label></div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-[4vw] px-5 md:px-12">
          {p.gallery.map((g, i) => <GalleryImg key={g + i} src={img(g, 1600)} i={i} p={scrollYProgress} n={n} />)}
        </motion.div>
      </div>
    </section>
  );
}
function GalleryImg({ src, i, p, n }: { src: string; i: number; p: MotionValue<number>; n: number }) {
  const scale = useTransform(p, [Math.max(0, (i - 1) / n), i / n, (i + 1) / n], [0.9, 1, 0.9]);
  return (
    <motion.div style={{ scale }} className="h-[62svh] w-[80vw] shrink-0 overflow-hidden rounded-[24px] md:w-[60vw]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </motion.div>
  );
}

// Drag the handle to compare (primedecor before/after)
function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] select-none md:aspect-[16/8]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt="Before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} className="absolute inset-0 h-full w-full object-cover grayscale sepia-[.3]" />
      <span className="absolute top-5 left-5 rounded-full bg-ink/70 px-4 py-1.5 text-sm font-semibold text-ivory backdrop-blur">Before</span>
      <span className="absolute top-5 right-5 rounded-full bg-ivory/90 px-4 py-1.5 text-sm font-semibold backdrop-blur">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-ivory" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-ink shadow-xl">⇆</span>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Before and after comparison"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}

export function WorkDetailView({ p }: { p: Project }) {
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const meta = [["Client", p.client], ["Location", `${p.l}, India`], ["Category", p.c], ["Area", p.area], ["Timeline", p.days], ["Year", p.y]];
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Title + tagline (primedecor) and spec table (homespaceid) */}
      <section className="px-5 pt-36 pb-16 md:px-12 md:pt-44">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink/50">
            <Link href="/works" className="hover:text-ink">Works</Link><span>/</span><span className="text-ink">{p.n}</span>
          </nav>
        </Reveal>
        <div className="mt-6 grid items-end gap-8 md:grid-cols-[1.5fr_1fr]">
          <h1 className="text-[15vw] leading-[0.88] font-bold tracking-[-0.04em] md:text-[9vw]"><SplitText text={p.n} /></h1>
          <Reveal delay={0.3}><p className="max-w-md text-lg text-ink/70 md:pb-4">{p.d}</p></Reveal>
        </div>
        <dl className="mt-16 grid grid-cols-2 md:grid-cols-6">
          {meta.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06} className="border-t border-ink/15 py-5 pr-4">
              <dt className="text-sm text-ink/50">{k}</dt>
              <dd className="mt-1 text-lg font-semibold">{v}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <WideningImage src={img(p.i, 2400)} alt={p.n} />

      {/* Story: label pins on the left while the copy scrolls */}
      <section className="px-5 py-28 md:px-12 md:py-40">
        {[["Overview", p.overview], ["The challenge", p.challenge], ["Our solution", p.solution]].map(([k, v], i) => (
          <div key={k} className="grid gap-6 border-t border-ink/15 py-12 md:grid-cols-[1fr_2fr] md:py-16">
            <div className="md:sticky md:top-32 md:self-start">
              <span className="text-sm font-semibold text-brass">0{i + 1}</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{k}</h2>
            </div>
            {i === 0
              ? <ScrollWords className="text-2xl leading-snug font-medium tracking-tight md:text-4xl" text={v} />
              : <Reveal><p className="text-xl leading-relaxed text-ink/75 md:text-2xl">{v}</p></Reveal>}
          </div>
        ))}
      </section>

      {/* Key features */}
      <section className="mx-3 rounded-[28px] bg-ink px-5 py-24 text-ivory md:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div><Label dark>Key features</Label><Heading text="What makes" accent="it work" dark /></div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {p.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.08}>
                <li className="flex h-full flex-col justify-between gap-10 rounded-[20px] border border-ivory/15 p-6">
                  <span className="text-sm text-brass">0{i + 1}</span>
                  <span className="text-xl font-medium">{f}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Gallery p={p} />

      <section className="px-5 pb-28 md:px-12">
        <Label>Transformation</Label>
        <Heading text="Before &" accent="after" />
        <Reveal className="mt-12"><BeforeAfter before={img(p.gallery[0], 1800)} after={img(p.i, 1800)} /></Reveal>
        <div className="mt-20 grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-ink/50 uppercase">The result</p>
            <p className="mt-4 text-2xl leading-snug font-medium tracking-tight md:text-3xl">{p.result}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="rounded-[24px] bg-sand p-8 md:p-10">
              <span className="text-5xl leading-none text-brass">“</span>
              <p className="mt-2 text-2xl leading-snug font-medium">{p.quote.t}</p>
              <footer className="mt-6 text-sm text-ink/60">{p.quote.by}</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      <Link href={`/works/${next.slug}`} className="group relative mx-3 flex h-[70svh] flex-col justify-end overflow-hidden rounded-[28px] bg-ink p-6 text-ivory md:p-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(next.i, 2400)} alt={next.n} className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="relative flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-ivory/70 uppercase">Next project</p>
            <h2 className="mt-3 text-5xl font-bold tracking-tight md:text-8xl"><SplitText text={next.n} /></h2>
          </div>
          <Arrow className="h-14 w-14" />
        </div>
      </Link>

      <div className="pt-3"><Cta /></div>
      <Footer />
    </main>
  );
}
