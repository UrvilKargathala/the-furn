"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { Reveal, SplitText, RollText, motion, ease } from "./fx";
import { getProject, testimonials, testimonialPhoto } from "./content/projects";
import { Pic } from "./pic";
import { Label } from "./ui";

const SLIDE_MS = 8000;
// Sample quotes are hidden on the live site (they still show in development). Add real quotes in content/projects.ts
// without `sample` and the section appears on its own.
const SHOW_SAMPLES = false;
export const list = SHOW_SAMPLES || process.env.NODE_ENV === "development" ? testimonials : testimonials.filter((t) => !t.sample);

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = list.length;
  // Auto-advance; the key on the progress bar restarts it for every story
  useEffect(() => {
    if (paused || n < 2) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, paused, n]);
  if (n === 0) return null;

  const t = list[i];
  const p = t.slug ? getProject(t.slug) : undefined;
  const photo = testimonialPhoto(t, list.indexOf(t));
  const go = (d: number) => setI((x) => (x + d + n) % n);

  return (
    <section id="testimonials" className="px-5 pt-24 pb-10 md:px-12 md:pt-32 md:pb-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          
          <Label>Client stories</Label>
          <h2 className="mt-6 text-5xl leading-[0.95] font-bold tracking-[-0.04em] md:text-7xl lg:text-8xl">
            <span className="block"><SplitText text="Words from the" /></span>
            <span className="block text-ink/45"><SplitText text="homes we built." delay={0.2} /></span>
          </h2>
        </div>
      </div>

      <div className="mt-14 grid items-center gap-10 md:mt-16 md:gap-14 lg:mt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-10 md:gap-14">
          <div className="relative">
            <span aria-hidden className="absolute -top-10 -left-1 text-[9rem] leading-none text-brass/30 select-none md:-top-16 md:text-[14rem]">“</span>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30, filter: "blur(6px)" }} transition={{ duration: 0.7, ease }} className="relative min-h-[16rem] md:min-h-[14rem] lg:min-h-[19rem]">
                <blockquote className="pt-10 text-2xl leading-[1.25] font-medium tracking-tight md:pt-14 md:text-3xl lg:pt-16 lg:text-[2.1rem]">{t.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-brass" />
                  <span><span className="block font-semibold">{t.name}</span><span className="block text-sm text-ink/65">{t.role} · {t.place}{p ? <> · <Link href={`/works/${p.slug}`} className="group inline-flex min-h-11 items-center underline-offset-4 hover:underline"><RollText>{p.n}</RollText></Link></> : null}</span></span>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              <button onClick={() => go(-1)} aria-label="Previous story" className="grid h-14 w-14 place-items-center rounded-full border border-ink/20 text-xl transition-colors hover:bg-ink hover:text-ivory">←</button>
              <button onClick={() => go(1)} aria-label="Next story" className="grid h-14 w-14 place-items-center rounded-full border border-ink/20 text-xl transition-colors hover:bg-ink hover:text-ivory">→</button>
            </div>
            <span className="font-mono text-sm tracking-[0.2em] text-ink/65">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <div className="h-px flex-1 bg-ink/15">
              <motion.div key={`${i}-${paused}`} initial={{ scaleX: paused ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: "linear" }} className="h-full origin-left bg-ink" />
            </div>
          </div>
        </div>

        {/* The project behind the quote: photo wipes in, with the client's film when we have one */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden bg-ink md:aspect-[16/10] md:max-w-none lg:aspect-[4/5] lg:max-h-[78svh] lg:justify-self-end">
            <AnimatePresence initial={false}>
              <motion.div key={i} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0 }} transition={{ duration: 1, ease }} className="absolute inset-0">
                <Pic src={photo} alt={p ? p.n : "Modular kitchen by The Furn"} sizes="(min-width: 1024px) 40vw, 90vw" className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            {!p && <span className="absolute right-5 bottom-5 left-5 text-sm font-semibold tracking-[0.15em] text-ivory uppercase">{t.place}</span>}
            {p && <Link href={`/works/${p.slug}`} className="group absolute right-5 bottom-5 left-5 flex items-center justify-between text-ivory"><span className="text-sm font-semibold tracking-[0.15em] uppercase">{p.n}</span><span className="grid h-10 w-10 place-items-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-ink">↗</span></Link>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
