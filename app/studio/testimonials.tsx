"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, useInView } from "motion/react";
import { motion, useTransform, useSmoothScroll, Reveal, RollText, ease } from "../fx";
import { Label, Heading } from "../ui";
import { getProject, testimonialPhoto } from "../content/projects";
import { list } from "../testimonials";
import { Pic } from "../pic";

const SLIDE_MS = 8000;

// Studio client stories: a full-width photo of the active client's home with a frosted card naming
// whose home it is, and a row of quote cards below where the active one widens. Uses the same
// quotes as the home page, so it hides itself on the live site until real (non-sample) quotes exist.
export function StudioTestimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = list.length;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  // Only cycle stories while the section is on screen, so visitors start at the first one
  const seen = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (paused || !seen || n < 2) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, paused, seen, n]);
  if (n === 0) return null;

  const t = list[i];
  const p = t.slug ? getProject(t.slug) : undefined;
  const photo = testimonialPhoto(t, i);

  return (
    <section className="px-5 py-24 md:px-12 md:py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <Label>Client stories</Label>
          <Heading text="Homes that" accent="speak for us" />
        </div>
        <Reveal><p className="max-w-sm text-lg text-ink/70">Homeowners and designers on living with furniture made for their walls, their routines and their way of cooking.</p></Reveal>
      </div>

      {/* Photo of the client's finished home */}
      <div ref={ref} className="relative mt-16 h-[78svh] min-h-[520px] overflow-clip bg-ink text-ivory md:h-[86svh]">
        <AnimatePresence initial={false}>
          <motion.div key={i} initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.6 } }}
            transition={{ duration: 1.2, ease }} className="absolute inset-0">
            <motion.div style={{ y, scale: 1.2 }} className="h-full w-full will-change-transform">
              <Pic src={photo} alt={p ? p.n : "Modular kitchen by The Furn"} sizes="100vw" quality={90} className="h-full w-full object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/60" />

        {/* Frosted card: whose home this is */}
        <div className="absolute right-5 bottom-5 left-5 md:right-auto md:bottom-10 md:left-10 md:w-[26rem]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease }}
              className="border border-ivory/25 bg-ivory/10 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-ivory/75 uppercase">{p ? "The home" : t.role}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{p?.n ?? t.place}</p>
              <div className="mt-6 h-px bg-ivory/25" />
              <div className="mt-6 flex items-center justify-between gap-4">
                <span><span className="block font-semibold">{t.name}</span>{p && <span className="block text-sm text-ivory/75">{t.role} · {t.place}</span>}</span>
                {p && (
                  <Link href={`/works/${p.slug}`} aria-label={`See ${p.n}`} className="group grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ivory/40 transition-all duration-500 hover:rotate-45 hover:bg-ivory hover:text-ink">↗</Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <span className="absolute top-5 right-5 font-mono text-sm tracking-[0.2em] text-ivory/80 md:top-auto md:right-10 md:bottom-10">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
      </div>

      {/* Quote cards: the active one widens; tap any card to switch the story above */}
      <div className="mt-3 flex flex-col gap-3 md:flex-row">
        {list.map((q, k) => {
          const on = k === i;
          const qp = q.slug ? getProject(q.slug) : undefined;
          return (
            <motion.button key={k} layout type="button" onClick={() => setI(k)} aria-pressed={on}
              transition={{ layout: { duration: 0.8, ease } }}
              style={{ flexGrow: on ? 2.2 : 1 }}
              className={`relative flex min-h-[15rem] basis-auto flex-col md:basis-0 justify-between overflow-hidden p-6 text-left transition-colors duration-700 md:min-h-[19rem] md:p-8 ${on ? "bg-ink text-ivory" : "bg-sand text-ink hover:bg-stone/40"}`}>
              <div className="flex items-start justify-between gap-6">
                <span className={`text-6xl leading-none ${on ? "text-brass" : "text-brass/50"}`} aria-hidden>“</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-lg transition-transform duration-700 ${on ? "rotate-45 border-ivory/40" : "border-ink/25"}`} aria-hidden>+</span>
              </div>
              <motion.blockquote layout="position" className={`mt-4 font-medium tracking-tight transition-[font-size] duration-700 ${on ? "text-lg leading-snug md:text-xl lg:text-2xl" : "text-base leading-relaxed md:line-clamp-4"}`}>
                {q.quote}
              </motion.blockquote>
              <motion.div layout="position" className="mt-8 flex items-end justify-between gap-4">
                <span><span className="block font-semibold">{q.name}</span><span className={`block text-sm ${on ? "text-ivory/70" : "text-ink/65"}`}>{q.place}</span></span>
                {on && qp && <span className="hidden text-sm font-semibold tracking-[0.15em] uppercase sm:block"><RollText>{qp.n}</RollText></span>}
              </motion.div>
              {/* Time until the next story */}
              {on && n > 1 && seen && (
                <motion.span key={`${i}-${paused}`} initial={{ scaleX: paused ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brass" />
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
