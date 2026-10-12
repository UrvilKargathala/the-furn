"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, type MotionValue } from "motion/react";
import Link from "next/link";
import { SmoothScroll, Reveal, SplitText, ScrollWords, Counter, RollText, ParallaxImg, motion, useScroll, useTransform, ease } from "./fx";
import { img, services, projects as allProjects } from "./data";

const projects = allProjects.slice(0, 4);
import { Label, Heading, Loader, Nav, Cta, Footer } from "./ui";

const SLIDE_MS = 7000;

const categories = [
  { t: "Kitchen", h: ["Kitchens built", "around how you cook"], d: "Modular kitchens with precision shutters, smart storage and hardware that lasts.", i: "1556912173-3bb406ef7e77", v: "https://videos.pexels.com/video-files/38231065/16231771_1280_720_60fps.mp4" },
  { t: "Wardrobe", h: ["Wardrobes made for", "everything you own"], d: "Sliding, hinged and walk-in storage, sized to the last shelf and drawer.", i: "1616486338812-3dadae4b4ace", v: "https://videos.pexels.com/video-files/15887130/15887130-hd_1280_720_30fps.mp4" },
  { t: "Living", h: ["Living spaces that", "feel like home"], d: "TV units, panelling and furniture that bring calm and warmth to every room.", i: "1618221195710-dd6b41faaea6", v: "https://videos.pexels.com/video-files/7578540/7578540-hd_1280_720_30fps.mp4" },
];


const steps = [
  { t: "Consult", tags: ["Site visit", "Measurements", "Budget"], d: "We visit, measure and listen to how the space is really used.", i: "1600210492486-724fe5c67fb0" },
  { t: "Design", tags: ["3D layouts", "Material board", "Quote"], d: "3D layouts, material boards and a transparent, itemised quote.", i: "1618221195710-dd6b41faaea6" },
  { t: "Craft", tags: ["In-house factory", "Edge banding", "Quality check"], d: "Factory-made modules with precision edges and soft-close hardware.", i: "1556912173-3bb406ef7e77" },
  { t: "Install", tags: ["On-site fitting", "Cleanup", "Handover"], d: "Clean, on-schedule fitting and a final walkthrough with you.", i: "1565538810643-b5bdb714032a" },
];

function Services() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-16 border-t border-ink/15">
      {services.map((s, i) => (
        <div key={s.t} className="border-b border-ink/15">
          <button onClick={() => setOpen(open === i ? -1 : i)} onMouseEnter={() => setOpen(i)} aria-expanded={open === i}
            className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8">
            <span className="text-sm font-semibold text-ink/40">0{i + 1}</span>
            <span className={`flex-1 text-2xl font-semibold tracking-tight transition-all duration-500 md:text-5xl ${open === i ? "" : "text-ink/50 group-hover:translate-x-3 group-hover:text-ink"}`}>{s.t}</span>
            <span className={`grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-xl transition-transform duration-500 ${open === i ? "rotate-45 bg-ink text-ivory" : ""}`}>+</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease }} className="overflow-hidden">
                <div className="grid gap-6 pb-8 md:grid-cols-[1fr_2fr]">
                  <div>
                    <p className="max-w-sm text-ink/70">{s.short}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => <span key={t} className="rounded-full border border-ink/15 px-3 py-1 text-xs">{t}</span>)}
                    </div>
                    <Link href={`/services/${s.slug}`} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      <RollText>View service</RollText><span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                  <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.9, ease, delay: 0.1 }}
                    className="aspect-[16/8] overflow-hidden rounded-[22px]">
                    <motion.img src={img(s.i)} alt={s.t} initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease }} className="h-full w-full object-cover" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Cards pin one after another; each one shrinks a little as the next slides over it
function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="mt-16">
      {projects.map((p, i) => <StackCard key={p.n} p={p} i={i} progress={scrollYProgress} />)}
    </div>
  );
}
function StackCard({ p, i, progress }: { p: (typeof projects)[number]; i: number; progress: MotionValue<number> }) {
  const n = projects.length;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.05]);
  const dim = useTransform(progress, [i / n, 1], [0, (n - 1 - i) * 0.15]);
  return (
    <div className="sticky top-0 flex h-svh items-center">
      <motion.a href={`/works/${p.slug}`} style={{ scale }} className="group relative block h-[85svh] w-full origin-top overflow-hidden rounded-[28px] bg-ink text-ivory">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(p.i, 2000)} alt={p.n} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/70" />
        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-ink" />
        <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-ivory/60 uppercase">0{i + 1} / 0{n} · {p.c}</span>
            <h3 className="mt-3 text-4xl font-semibold tracking-tight md:text-7xl">{p.n}</h3>
            <p className="mt-4 text-ivory/80 md:text-lg">{p.d}</p>
            <p className="mt-5 text-sm font-semibold tracking-[0.15em] uppercase">{p.l}, India</p>
            <p className="mt-1 text-sm text-ivory/70">{p.y}</p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-ink">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" /></svg>
            </span>
            <div className="text-right">
              <p className="text-xs text-ivory/60">Area</p>
              <p className="text-2xl font-semibold md:text-4xl">{p.area}</p>
              <p className="mt-3 text-xs text-ivory/60">Delivered in</p>
              <p className="text-lg font-semibold md:text-2xl">{p.days}</p>
            </div>
          </div>
        </div>
      </motion.a>
    </div>
  );
}

const floaters = [
  { i: "1556912173-3bb406ef7e77", x: "4%", w: "w-36 md:w-56", from: 110, speed: 190 },
  { i: "1616486338812-3dadae4b4ace", x: "72%", w: "w-40 md:w-64", from: 140, speed: 230 },
  { i: "1600210492486-724fe5c67fb0", x: "18%", w: "w-32 md:w-48", from: 190, speed: 260 },
  { i: "1565538810643-b5bdb714032a", x: "60%", w: "w-36 md:w-52", from: 230, speed: 300 },
  { i: "1618221195710-dd6b41faaea6", x: "84%", w: "w-28 md:w-44", from: 270, speed: 320 },
  { i: "1600585154340-be6161a56a0c", x: "36%", w: "w-32 md:w-48", from: 300, speed: 360 },
];

// Quote stays pinned while photos drift up past it at different speeds
function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 grid h-svh place-items-center overflow-hidden px-5">
        {floaters.map((f) => <Floater key={f.i} f={f} p={scrollYProgress} />)}
        <Reveal className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="mx-auto mb-8 grid h-14 w-14 place-items-center rounded-full bg-ink text-3xl leading-none text-ivory">“</span>
          <p className="text-3xl leading-[1.1] font-bold tracking-tight uppercase md:text-6xl">Where precise craft meets the quiet comfort of a home made for you.</p>
          <p className="mt-6 text-sm text-ink/60">Founder, The Furn</p>
        </Reveal>
      </div>
    </section>
  );
}
function Floater({ f, p }: { f: (typeof floaters)[number]; p: MotionValue<number> }) {
  const y = useTransform(p, [0, 1], [`${f.from}vh`, `${f.from - f.speed}vh`]);
  return (
    <motion.div style={{ y, left: f.x }} className={`absolute top-0 aspect-[4/5] overflow-hidden rounded-2xl ${f.w}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(f.i, 600)} alt="" className="h-full w-full object-cover" />
    </motion.div>
  );
}

function Process() {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
      <div>
        {steps.map((st, i) => <Step key={st.t} st={st} i={i} active={active === i} onActive={() => setActive(i)} />)}
      </div>
      {/* Pinned photo: each step's image wipes up over the last */}
      <div className="hidden md:block">
        <div className="sticky top-24 h-[72vh] overflow-hidden rounded-[28px] bg-ink">
          {steps.map((st, i) => (
            <motion.div key={st.t} className="absolute inset-0" initial={false}
              animate={{ clipPath: i <= active ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }} transition={{ duration: 1, ease }}>
              { }
              <motion.img src={img(st.i)} alt={st.t} initial={false} animate={{ scale: i === active ? 1 : 1.15 }} transition={{ duration: 1.4, ease }}
                className="h-full w-full object-cover" />
            </motion.div>
          ))}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-8 text-ivory">
            <AnimatePresence mode="wait">
              <motion.span key={active} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.5, ease }}
                className="text-8xl leading-none font-bold tracking-tighter">0{active + 1}</motion.span>
            </AnimatePresence>
            <div className="flex gap-2 pb-3">
              {steps.map((st, i) => <span key={st.t} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-brass" : "w-4 bg-ivory/40"}`} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Step({ st, i, active, onActive }: { st: (typeof steps)[number]; i: number; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(); }, [inView, onActive]);
  return (
    <div ref={ref} className={`border-t border-ink/15 py-10 transition-opacity duration-500 md:flex md:min-h-[60vh] md:flex-col md:justify-center ${active ? "opacity-100" : "md:opacity-30"}`}>
      <p className="flex items-center gap-3 text-sm font-semibold text-ink/60">Step <span className="h-px w-6 bg-brass" /> 0{i + 1}/0{steps.length}</p>
      <h3 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{st.t}</h3>
      <p className="mt-4 max-w-md text-lg text-ink/70">{st.d}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {st.tags.map((t) => <span key={t} className="rounded-full bg-sand px-4 py-2 text-sm font-medium">{t}</span>)}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(st.i, 1000)} alt={st.t} className="mt-8 aspect-[4/3] w-full rounded-[22px] object-cover md:hidden" />
    </div>
  );
}

function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Auto-advance; clicking a tile changes `active`, which restarts the timer
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % categories.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [ready, active]);
  // Only the visible video plays, from the start
  useEffect(() => {
    if (!ready) return;
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) { v.currentTime = 0; v.play().catch(() => {}); } else v.pause();
    });
  }, [ready, active]);
  const fade = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 1, ease, delay: d } });

  return (
    <section ref={ref} className="h-svh">
      <div className="relative h-full overflow-hidden bg-ink text-ivory">
        <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={ready ? { scale: 1 } : {}} transition={{ duration: 2.2, ease }}>
          {categories.map((c, i) => (
            <video key={c.t} ref={(el) => { vids.current[i] = el; }} src={c.v} poster={img(c.i, 1600)} muted loop playsInline preload={i === 0 ? "auto" : "metadata"}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/30" />
        <motion.div style={{ y }} className="relative z-10 flex h-full flex-col justify-end gap-8 p-6 md:flex-row md:items-end md:justify-between md:p-12">
          <div>
            <motion.p {...fade(0.4)} className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase text-ivory/80">
              <span className="h-px w-10 bg-brass" />The Furn · Tailored Modular Furniture
            </motion.p>
            <AnimatePresence mode="wait">
              <motion.div key={active} exit={{ opacity: 0, y: -30, filter: "blur(6px)" }} transition={{ duration: 0.5, ease }}>
                <h1 className="text-[9vw] leading-[0.95] font-bold tracking-[-0.04em] md:text-[6vw]">
                  {categories[active].h.map((line, j) => (
                    <span key={line} className="block whitespace-nowrap"><SplitText text={line} play={ready} delay={0.1 + j * 0.15} /></span>
                  ))}
                </h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease, delay: 0.5 }}
                  className="mt-5 max-w-md text-base text-ivory/80 md:text-lg">{categories[active].d}</motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);
  return (
    <main>
      <SmoothScroll />
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Nav show={ready} />
      <Hero ready={ready} />

      {/* About */}
      <section id="about" className="px-5 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Label>Our Story</Label>
            <Heading text="Furniture that" accent="fits your life." />
          </div>
          <ScrollWords className="text-2xl leading-snug font-medium tracking-tight md:text-4xl"
            text="The Furn began with a simple belief: a home works best when its furniture is made for it. We design modular kitchens, wardrobes and interiors around your space, your routine and the way you live, then build every piece to the millimetre in our own workshop." />
        </div>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          <ParallaxImg src={img("1600210492486-724fe5c67fb0")} alt="Living room interior" className="aspect-[4/3] rounded-3xl md:col-span-2 md:aspect-auto" />
          <div className="grid gap-4">
            {[[250, "+", "Homes delivered across the city"], [12, "+", "Years of design & build experience"], [98, "%", "Clients who refer us to friends"]].map(([n, s, t], i) => (
              <Reveal key={t as string} delay={i * 0.1}>
                <div className="rounded-3xl bg-sand p-7">
                  <p className="text-5xl font-semibold tracking-tight md:text-6xl"><Counter to={n as number} suffix={s as string} /></p>
                  <p className="mt-2 text-sm text-ink/60">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services: click-to-open accordion */}
      <section id="services" className="rounded-t-[40px] bg-sand px-5 py-28 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label>Services</Label><Heading text="Complete solutions" accent="for every room" /></div>
          <Reveal><p className="max-w-xs text-ink/70">Every module is designed in-house and built to your exact measurements.</p></Reveal>
        </div>
        <Services />
      </section>

      <Quote />

      {/* Projects: stacked pinned cards (prismae style) */}
      <section id="projects" className="px-3 py-28 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 px-2 md:px-0">
          <div><Label>Our Works</Label><Heading text="Featured" accent="projects" /></div>
        </div>
        <FeaturedProjects />
        <Reveal className="mt-12 flex justify-center">
          <Link href="/works" className="group flex items-center gap-1 font-semibold text-ivory">
            <span className="rounded-full bg-ink px-7 py-4"><RollText>View All Projects</RollText></span>
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brass transition-transform duration-500 group-hover:rotate-45">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" /></svg>
            </span>
          </Link>
        </Reveal>
      </section>

      {/* Process: steps scroll on the left, pinned photo swaps on the right (prismae style) */}
      <section id="process" className="px-5 pt-28 pb-16 md:px-12">
        <Label>How it Works</Label><Heading text="From first sketch" accent="to final handover" />
        <Process />
      </section>

      {/* Testimonial */}
      <section className="px-5 pb-28 text-center md:px-12">
        <Label>Testimonials</Label>
        <Reveal>
          <blockquote className="mx-auto mt-8 max-w-4xl text-2xl leading-snug font-medium tracking-tight md:text-5xl">
            “They turned a cramped corner into the kitchen we actually wanted to cook in. Every drawer is exactly where it should be.”
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-ink/50">Homeowner · Island Axis</p>
        </Reveal>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
