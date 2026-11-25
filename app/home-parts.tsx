"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, useMotionValueEvent, type MotionValue } from "motion/react";
import Link from "next/link";
import { SplitText, RollText, motion, useTransform, ease, MotionPic, useSmoothScroll } from "./fx";
import { MEDIA } from "./content/site";
import { services, processDetail } from "./content/services";
import { getProject } from "./content/projects";
import { Loader, Nav, ArrowIcon, Arrow } from "./ui";
import { Pic } from "./pic";

// Featured on the home page: projects that have our own photos and videos
export const projects = ["amber-travertine", "vapour-mist", "torrent-grey", "statuario-blanc"].map((s) => getProject(s)!);

// Hero background: one remix film of our projects in the old site's order, cut from the original
// HD/4K videos and cropped to 1920x1080 (37 s, on the media server). `at` = second each project starts.
export const HERO_REMIX = `${MEDIA}/hero/remix.mp4`;

export const heroReel = [
  { slug: "serene-art", at: 0 },
  { slug: "island-axis", at: 3.5 },
  { slug: "statuario-blanc", at: 7 },
  { slug: "torrent-grey", at: 10.5 },
  { slug: "beige-bailey", at: 14 },
  { slug: "vapour-mist", at: 17.5 },
  { slug: "concrete-canvas", at: 21 },
  { slug: "amber-travertine", at: 24.5 },
  { slug: "studio-furn", at: 32 },
].map((c) => ({ ...c, p: getProject(c.slug)! }));

// The four headlines rotate through the reel
export const heroScenes = [
  { from: 0, h: ["Where every home", "begins with a feeling"], d: "Before the first sketch, we learn how you want to live, then build furniture that fits." },
  { from: 6, h: ["Designed for the home", "you're building"], d: "Weekend villas, apartments and complete interiors, planned around your site and your family." },
  { from: 12, h: ["Interiors made to", "the millimetre"], d: "Modular furniture precision-cut and finished on German machinery, installed by our own team." },
  { from: 25, h: ["Details you feel", "every single day"], d: "Honest materials, quiet finishes and storage that disappears into the room." },
];

// Same five steps as the /process page
const steps = processDetail;

// Services (after clearpath). Desktop is one pinned sequence with no dead space:
//  1. a warm screen with a "Made to measure" toggle in the off position: "If only the perfect home came off a shelf."
//  2. scrolling flips it on, the gradient clears and the line answers itself
//  3. the headline glides up and the row of cards rises in beneath it
//  4. further scrolling moves through the services one card at a time, the card in focus in full colour.
// Phones get the same story without pinning: the switch flips once it's on screen, then the cards swipe.
const CARD_VW = 36;
const GAP_VW = 2.5;
const FLIP = 0.1; // progress where the switch turns on
const RISE = [0.12, 0.24] as const; // headline moves up, cards rise in
const ROW = [0.28, 0.97] as const; // the row moves one card at a time

const switchLines = {
  off: { a: "If only the perfect home", b: "came off a shelf.", d: "Standard sizes mean standard compromises." },
  on: { a: "It doesn't. So we build", b: "every piece to fit yours.", d: "Six ways we work, each one designed in-house and built to your exact measurements." },
};

function SwitchHeadline({ on, onToggle, compact = false }: { on: boolean; onToggle: () => void; compact?: boolean }) {
  const line = on ? switchLines.on : switchLines.off;
  return (
    <div className="flex flex-col items-center text-center">
      <button type="button" onClick={onToggle} aria-pressed={on} aria-label="Made to measure"
        className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] text-ink/60 uppercase">
        Made to measure
        <span className={`relative h-7 w-12 rounded-full transition-colors duration-500 ${on ? "bg-brass" : "bg-ink/15"}`}>
          <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className={`absolute top-1 h-5 w-5 rounded-full bg-ivory shadow ${on ? "right-1" : "left-1"}`} />
        </span>
      </button>
      <AnimatePresence mode="wait">
        <motion.div key={on ? "on" : "off"} initial={{ opacity: 0, y: 18, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(10px)" }} transition={{ duration: 0.6, ease }}>
          <h2 className={`mt-6 leading-[1.08] font-medium tracking-tight ${compact ? "text-[8.2vw]" : "text-[4.4vw]"}`}>
            <span className="block">{line.a}</span>
            <span className={`block ${on ? "text-brass" : "text-ink/50"}`}>{line.b}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink/70">{line.d}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="relative">
      <ServicesPinned />
      <ServicesPhone />
    </section>
  );
}

function ServicesPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const n = services.length;
  const { scrollYProgress: p } = useSmoothScroll({ target: ref, offset: ["start start", "end end"] });
  const [auto, setAuto] = useState(false);
  const [manual, setManual] = useState<boolean | null>(null);
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    setAuto(v > FLIP);
    if (v < 0.02 || v > RISE[1]) setManual(null);
    const k = Math.min(n - 1, Math.max(0, Math.round(((v - ROW[0]) / (ROW[1] - ROW[0])) * (n - 1))));
    setActive((a) => (a === k ? a : k));
  });
  const on = manual ?? auto;
  const glow = useTransform(p, [FLIP - 0.04, FLIP + 0.06], [1, 0]);
  const headY = useTransform(p, [...RISE], ["0svh", "-31svh"]);
  const headScale = useTransform(p, [...RISE], [1, 0.66]);
  const rowY = useTransform(p, [...RISE], ["75svh", "0svh"]);
  const rowX = useTransform(p, [...ROW], ["0vw", `-${(n - 1) * (CARD_VW + GAP_VW)}vw`]);
  const bar = useTransform(p, [...ROW], [1 / n, 1]);

  return (
    <div ref={ref} className="relative hidden md:block" style={{ height: `${120 + n * 50}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Warm gradient that clears as the switch flips */}
        <motion.div aria-hidden style={{ opacity: glow }} className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(90% 70% at 18% 12%, #d8b98c 0%, transparent 60%), radial-gradient(80% 70% at 88% 88%, #bfa98d 0%, transparent 62%), linear-gradient(180deg, #e9dfcf, #e3d5c1)" }} />
          <div className="absolute top-1/2 left-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/40" />
          <div className="absolute top-1/2 left-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/25" />
        </motion.div>

        {/* Headline: centred at first, then glides up to make room for the cards */}
        <motion.div style={{ y: headY, scale: headScale }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-12">
          <SwitchHeadline on={on} onToggle={() => setManual(!on)} />
        </motion.div>

        {/* The row: rises in under the headline, then moves one card at a time */}
        <motion.div style={{ y: rowY }} className="absolute inset-x-0 bottom-[9svh]">
          <motion.div style={{ x: rowX, paddingLeft: `${(100 - CARD_VW) / 2}vw`, gap: `${GAP_VW}vw` }} className="flex h-[52svh]">
            {services.map((s, k) => (
              <div key={s.slug} className="h-full shrink-0" style={{ width: `${CARD_VW}vw` }}><ServiceCard x={s} k={k} on={k === active} /></div>
            ))}
          </motion.div>
          <div className="mx-auto mt-5 flex w-[min(24rem,60vw)] items-center gap-4 text-sm font-semibold">
            <span className="w-6 text-ink">0{active + 1}</span>
            <span className="h-px flex-1 bg-ink/15"><motion.span style={{ scaleX: bar }} className="block h-full origin-left bg-brass" /></span>
            <span className="w-6 text-right text-ink/45">0{n}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Phones: no pinning. The switch flips by itself a moment after it comes into view, then the cards swipe.
function ServicesPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-35% 0px" });
  const [flipped, setFlipped] = useState(false);
  const [manual, setManual] = useState<boolean | null>(null);
  useEffect(() => {
    if (!seen) return;
    const t = setTimeout(() => setFlipped(true), 1400);
    return () => clearTimeout(t);
  }, [seen]);
  const on = manual ?? flipped;
  return (
    <div className="px-5 py-20 md:hidden">
      <div ref={ref}><SwitchHeadline on={on} onToggle={() => setManual(!on)} compact /></div>
      <div className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
        {services.map((s, k) => (
          <div key={s.slug} className="aspect-[3/4.2] w-[80vw] shrink-0 snap-start"><ServiceCard x={s} k={k} on /></div>
        ))}
      </div>
    </div>
  );
}

// A single service card. `on` = in focus: full height and real colours; otherwise tinted and slightly shorter.
function ServiceCard({ x, k, on }: { x: (typeof services)[number]; k: number; on: boolean }) {
  return (
    <Link href={`/services/${x.slug}`} tabIndex={on ? 0 : -1}
      style={{ clipPath: on ? "inset(0% 0 0% 0)" : "inset(7% 0 7% 0)" }}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink p-6 text-ivory transition-[clip-path] duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:p-9">
      <Pic src={x.i} alt={x.t} sizes="(min-width: 768px) 38vw, 80vw"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] ${on ? "scale-100" : "scale-110"}`} />
      <div className={`absolute inset-0 bg-[#9c7a52] mix-blend-color transition-opacity duration-700 ${on ? "opacity-0" : "opacity-60"}`} />
      <div className={`absolute inset-0 bg-ink transition-opacity duration-700 ${on ? "opacity-0" : "opacity-30"}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent via-40% to-ink/85" />
      <div className="relative flex items-start justify-between gap-6">
        <h3 className="text-3xl leading-[1.02] font-semibold tracking-tight md:text-4xl lg:text-5xl">{x.t}</h3>
        <span className="pt-2 text-sm font-semibold text-ivory/70">0{k + 1}</span>
      </div>
      <div className={`relative transition-all duration-700 ${on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-60"}`}>
        <p className="max-w-sm text-base text-ivory/90 md:text-lg">{x.short}</p>
        <span className="btn-fill btn-fill-ivory mt-5 inline-flex items-center gap-3 rounded-full border border-ivory/40 px-5 py-2.5 text-sm font-semibold">
          View service <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
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
    <div className="sticky top-0 flex h-[85svh] items-center md:h-svh">
      <motion.a href={`/works/${p.slug}`} data-cursor="View" style={{ scale }} className="group relative block h-full w-full origin-top overflow-hidden bg-ink text-ivory">
        <Pic src={p.i} alt={p.n} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
        {/* Dark scrims behind the text (left column and bottom stats) so it stays readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/20 to-ink/80" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ink/80 via-ink/45 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(27,25,21,0.75),transparent_55%)]" />
        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-ink" />
        <div className="relative flex h-full flex-col justify-between px-5 pt-20 pb-8 md:px-12 md:pt-32 md:pb-12">
          <div className="max-w-xl [text-shadow:0_1px_18px_rgba(27,25,21,0.55)]">
            <span className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">0{i + 1} / 0{n} · {p.c}</span>
            <h3 className="mt-3 text-4xl font-semibold tracking-tight text-ivory md:text-7xl">{p.n}</h3>
            <p className="mt-4 text-ivory md:text-lg">{p.d}</p>
            {p.l && <p className="mt-5 text-sm font-semibold tracking-[0.15em] text-ivory uppercase">{p.l}, India</p>}
            {p.y && <p className="mt-1 text-sm text-ivory/85">{p.y}</p>}
          </div>
          <div className="flex items-end justify-between gap-6">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-ink">
              <ArrowIcon />
            </span>
            {p.area && (
              <div className="text-right [text-shadow:0_1px_18px_rgba(27,25,21,0.55)]">
                <p className="text-xs font-semibold tracking-[0.15em] text-brass uppercase">Area</p>
                <p className="text-2xl font-semibold text-ivory md:text-4xl">{p.area}</p>
                {p.days && <><p className="mt-3 text-xs font-semibold tracking-[0.15em] text-brass uppercase">Delivered in</p><p className="text-lg font-semibold text-ivory md:text-2xl">{p.days}</p></>}
              </div>
            )}
          </div>
        </div>
      </motion.a>
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
  // The first headline waits for the film to open out; later scene changes swap straight away
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setSettled(true), 2600);
    return () => clearTimeout(t);
  }, [ready]);
  const base = settled ? 0.1 : 1;
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
        {/* The film opens out from a small frame in the centre, then settles from a slight zoom */}
        <motion.div className="absolute inset-0" initial={{ clipPath: "inset(34% 30% 34% 30% round 20px)" }}
          animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 0px)" } : {}} transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}>
          <motion.div className="absolute inset-0" initial={{ scale: 1.35 }} animate={ready ? { scale: 1 } : {}} transition={{ duration: 2.2, ease, delay: 0.35 }}>
            <video ref={video} src={HERO_REMIX} poster={heroReel[0].p.i} muted loop playsInline preload="auto" onTimeUpdate={onTime}
              className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/30" />
        </motion.div>
        <motion.div style={{ y }} className="relative z-10 flex h-full flex-col justify-end gap-8 p-6 md:flex-row md:items-end md:justify-between md:p-12">
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={active} exit={{ opacity: 0, y: -30, filter: "blur(6px)" }} transition={{ duration: 0.5, ease }}>
                <h1 className="text-[9vw] leading-[0.95] font-bold tracking-[-0.04em] md:text-[6vw]">
                  {scene.h.map((line, j) => (
                    <span key={line} className="block whitespace-nowrap"><SplitText text={line} play={ready} delay={base + j * 0.15} /></span>
                  ))}
                </h1>
                <motion.p initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 1, ease, delay: base + 0.4 }}
                  className="mt-5 max-w-md text-base text-ivory/80 md:text-lg">{scene.d}</motion.p>
              </motion.div>
            </AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 1, ease, delay: 1.55 }} className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-fill btn-fill-ivory group flex items-center gap-3 rounded-full bg-brass py-2 pr-2 pl-6 font-semibold text-ink"><RollText>Book a site visit</RollText><Arrow /></Link>
              <Link href="/works" className="btn-fill btn-fill-ivory group rounded-full border border-ivory/40 px-6 py-3 font-semibold backdrop-blur-md"><RollText>See our work</RollText></Link>
            </motion.div>
          </div>
          {/* Which project is on screen right now */}
          <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} animate={ready ? { opacity: 1, filter: "blur(0px)" } : {}} transition={{ duration: 1, ease, delay: 1.7 }} className="self-start md:self-end">
          <Link href={`/works/${now.slug}`} className="group flex min-h-11 items-center gap-3 text-sm text-ivory/80 hover:text-ivory">
            <span className="font-mono tracking-[0.2em] whitespace-nowrap">{String(clip + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-ivory/40" />
            <AnimatePresence mode="wait">
              <motion.span key={now.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }} className="font-semibold">{now.n}</motion.span>
            </AnimatePresence>
          </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// The loader plays once per visit; coming back to Home from another page goes straight to the hero
let loaderPlayed = false;

// Intro loader, nav and hero share one "ready" flag: the nav and hero animate in once the loader lifts
export function HomeIntro() {
  const [ready, setReady] = useState(() => loaderPlayed);
  const [gone, setGone] = useState(() => loaderPlayed);
  const reveal = useCallback(() => { loaderPlayed = true; setReady(true); }, []);
  const done = useCallback(() => setGone(true), []);
  return (
    <>
      {!gone && <Loader onReveal={reveal} onDone={done} />}
      <Nav show={ready} />
      <Hero ready={ready} />
    </>
  );
}
