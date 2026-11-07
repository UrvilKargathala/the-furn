"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, type MotionValue } from "motion/react";
import Link from "next/link";
import { SplitText, RollText, motion, useTransform, ease, MotionPic, useSmoothScroll } from "./fx";
import { MEDIA } from "./content/site";
import { services } from "./content/services";
import { getProject } from "./content/projects";
import { Loader, Nav, ArrowIcon } from "./ui";
import { Pic } from "./pic";

// Featured on the home page: projects that have our own photos and videos
export const projects = ["avadh-ayuska", "atmosphere", "casa-rivera", "snowera"].map((s) => getProject(s)!);

// Hero background: one remix film of our projects in the old site's order, cut from the original
// HD/4K videos and cropped to 1920x1080 (37 s, on the media server). `at` = second each project starts.
export const HERO_REMIX = `${MEDIA}/hero/remix.mp4`;

export const heroReel = [
  { slug: "serene-art", at: 0 },
  { slug: "island-axis", at: 3.5 },
  { slug: "aestra", at: 7 },
  { slug: "noir-arc", at: 10.5 },
  { slug: "beige-bailey", at: 14 },
  { slug: "ivory", at: 17.5 },
  { slug: "concrete-canvas", at: 21 },
  { slug: "avadh-ayuska", at: 24.5 },
  { slug: "studio-furn", at: 32 },
].map((c) => ({ ...c, p: getProject(c.slug)! }));

// The four headlines rotate through the reel
export const heroScenes = [
  { from: 0, h: ["Where every home", "begins with a feeling"], d: "Before the first sketch, we learn how you want to live, then build furniture that fits." },
  { from: 6, h: ["Designed for the home", "you're building"], d: "Weekend villas, apartments and complete interiors, planned around your site and your family." },
  { from: 12, h: ["Interiors made to", "the millimetre"], d: "Modular furniture cut and finished in our own workshop, installed by our own team." },
  { from: 25, h: ["Details you feel", "every single day"], d: "Honest materials, quiet finishes and storage that disappears into the room." },
];

export const steps = [
  { t: "Consult", tags: ["Site visit", "Measurements", "Budget"], d: "We visit, measure and listen to how the space is really used.", i: "/works/avadh-ayuska/02.jpg" },
  { t: "Design", tags: ["3D layouts", "Material board", "Quote"], d: "3D layouts, material boards and a transparent, itemised quote.", i: "/works/palladium/10.jpg" },
  { t: "Craft", tags: ["In-house factory", "Edge banding", "Quality check"], d: "Factory-made modules with precision edges and soft-close hardware.", i: "/works/casa-rivera/05.jpg" },
  { t: "Install", tags: ["On-site fitting", "Cleanup", "Handover"], d: "Clean, on-schedule fitting and a final walkthrough with you.", i: "/works/globcon/11.jpg" },
];

export function Services() {
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
                    className="aspect-[16/8] max-h-[min(52svh,34rem)] w-full overflow-hidden">
                    <MotionPic src={s.i} alt={s.t} sizes="(min-width: 768px) 50vw, 100vw" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease }} className="h-full w-full object-cover" />
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
export function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="mt-16">
      {projects.map((p, i) => <StackCard key={p.n} p={p} i={i} progress={scrollYProgress} />)}
    </div>
  );
}

export function StackCard({ p, i, progress }: { p: (typeof projects)[number]; i: number; progress: MotionValue<number> }) {
  const n = projects.length;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.05]);
  const dim = useTransform(progress, [i / n, 1], [0, (n - 1 - i) * 0.15]);
  return (
    <div className="sticky top-0 flex h-svh items-center">
      <motion.a href={`/works/${p.slug}`} data-cursor="View" style={{ scale }} className="group relative block h-svh w-full origin-top overflow-hidden bg-ink text-ivory">
        <Pic src={p.i} alt={p.n} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/70" />
        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-ink" />
        {p.video && <Reel src={p.video} poster={p.gallery[0]} />}
        <div className="relative flex h-full flex-col justify-between px-5 pt-28 pb-10 md:px-12 md:pt-32 md:pb-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-ivory/60 uppercase">0{i + 1} / 0{n} · {p.c}</span>
            <h3 className="mt-3 text-4xl font-semibold tracking-tight md:text-7xl">{p.n}</h3>
            <p className="mt-4 text-ivory/80 md:text-lg">{p.d}</p>
            {p.l && <p className="mt-5 text-sm font-semibold tracking-[0.15em] uppercase">{p.l}, India</p>}
            {p.y && <p className="mt-1 text-sm text-ivory/70">{p.y}</p>}
          </div>
          <div className="flex items-end justify-between gap-6">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-ink">
              <ArrowIcon />
            </span>
            {p.area && (
              <div className="text-right">
                <p className="text-xs text-ivory/60">Area</p>
                <p className="text-2xl font-semibold md:text-4xl">{p.area}</p>
                {p.days && <><p className="mt-3 text-xs text-ivory/60">Delivered in</p><p className="text-lg font-semibold md:text-2xl">{p.days}</p></>}
              </div>
            )}
          </div>
        </div>
      </motion.a>
    </div>
  );
}

// Small looping film of the project: plays only while its card is on screen
export function Reel({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {}); else v.pause();
  }, [inView]);
  return (
    <div className="absolute right-6 bottom-28 hidden aspect-[9/16] h-[46%] overflow-hidden border border-ivory/25 shadow-2xl md:right-10 md:bottom-auto md:top-1/2 md:block md:-translate-y-1/2">
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" className="h-full w-full object-cover" />
    </div>
  );
}

export function Process() {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
      <div>
        {steps.map((st, i) => <Step key={st.t} st={st} i={i} active={active === i} onActive={() => setActive(i)} />)}
      </div>
      {/* Pinned photo: each step's image wipes up over the last */}
      <div className="hidden md:block">
        <div className="sticky top-24 h-[72vh] overflow-hidden bg-ink">
          {steps.map((st, i) => (
            <motion.div key={st.t} className="absolute inset-0" initial={false}
              animate={{ clipPath: i <= active ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }} transition={{ duration: 1, ease }}>
              { }
              <MotionPic src={st.i} alt={st.t} sizes="(min-width: 768px) 50vw, 100vw" initial={false} animate={{ scale: i === active ? 1 : 1.15 }} transition={{ duration: 1.4, ease }}
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

export function Step({ st, i, active, onActive }: { st: (typeof steps)[number]; i: number; active: boolean; onActive: () => void }) {
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
      <Pic src={st.i} alt={st.t} className="mt-8 aspect-[4/3] w-full object-cover md:hidden" />
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const [clip, setClip] = useState(0);
  const n = heroReel.length;
  // Start the remix once the intro loader is done
  useEffect(() => {
    if (ready) video.current?.play().catch(() => {});
  }, [ready]);
  // Follow the project on screen as the remix plays
  const onTime = () => {
    const t = video.current?.currentTime ?? 0;
    let i = 0;
    heroReel.forEach((c, k) => { if (t >= c.at) i = k; });
    setClip((k) => (k === i ? k : i));
  };
  const active = Math.min(heroScenes.length - 1, Math.floor((clip * heroScenes.length) / n));
  const scene = heroScenes[active];
  const now = heroReel[clip].p;

  return (
    <section ref={ref} className="h-svh">
      <div className="relative h-full overflow-hidden bg-ink text-ivory">
        <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={ready ? { scale: 1 } : {}} transition={{ duration: 2.2, ease }}>
          <video ref={video} src={HERO_REMIX} poster={heroReel[0].p.i} muted loop playsInline preload="auto" onTimeUpdate={onTime}
            className="absolute inset-0 h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/30" />
        <motion.div style={{ y }} className="relative z-10 flex h-full flex-col justify-end gap-8 p-6 md:flex-row md:items-end md:justify-between md:p-12">
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={active} exit={{ opacity: 0, y: -30, filter: "blur(6px)" }} transition={{ duration: 0.5, ease }}>
                <h1 className="text-[9vw] leading-[0.95] font-bold tracking-[-0.04em] md:text-[6vw]">
                  {scene.h.map((line, j) => (
                    <span key={line} className="block whitespace-nowrap"><SplitText text={line} play={ready} delay={0.1 + j * 0.15} /></span>
                  ))}
                </h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease, delay: 0.5 }}
                  className="mt-5 max-w-md text-base text-ivory/80 md:text-lg">{scene.d}</motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Which project is on screen right now */}
          <Link href={`/works/${now.slug}`} className="group flex items-center gap-3 self-start text-sm text-ivory/80 hover:text-ivory md:self-end">
            <span className="font-mono tracking-[0.2em]">{String(clip + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-ivory/40" />
            <AnimatePresence mode="wait">
              <motion.span key={now.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }} className="font-semibold">{now.n}</motion.span>
            </AnimatePresence>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Intro loader, nav and hero share one "ready" flag: the nav and hero animate in once the loader lifts
export function HomeIntro() {
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Nav show={ready} />
      <Hero ready={ready} />
    </>
  );
}
