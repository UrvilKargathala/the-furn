"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, useInView } from "motion/react";
import { Reveal, SplitText, motion, useTransform, ease, MotionPic, useSmoothScroll } from "../fx";
import { projects, workCats } from "../content/projects";
import { Label, ArrowIcon } from "../ui";
import { Pic } from "../pic";
import type { Project } from "../content/types";

// Card: hover zoom + "See project details" strip (primedecor), spec table underneath (resonance)
export function WorkCard({ p, big }: { p: Project; big: boolean }) {
  // Projects without area/year/city still get a details row, so every card has the same shape
  const details = [["Area", p.area], ["Year", p.y], ["City", p.l]].filter(([, v]) => v);
  return (
    <Link href={`/works/${p.slug}`} data-cursor="View" className="group block">
      <div className={`relative aspect-[4/3] overflow-hidden bg-ink ${big ? "md:aspect-[16/10]" : "md:aspect-[4/5]"}`}>
        <Pic src={p.i} alt={p.n} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 translate-y-full bg-ivory py-3 text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
          <div className="flex w-max animate-marquee gap-8 text-sm font-semibold tracking-[0.15em] whitespace-nowrap uppercase">
            {Array.from({ length: 12 }, (_, k) => <span key={k}>See project details <span className="text-brass">↗</span></span>)}
          </div>
        </div>
        <span className="absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur">{p.c}</span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">{p.n}</h3>
      <dl className="mt-3 flex gap-10 border-t border-ink/15 pt-3 text-base">
        {(details.length ? details : [["Type", p.c], ["Photos", String(p.gallery.length)]]).map(([k, v]) => (
          <div key={k}><dt className="text-ink/65">{k}</dt><dd className="mt-0.5 font-medium">{v}</dd></div>
        ))}
      </dl>
    </Link>
  );
}

// Full-screen panel with drifting photo (arpeggio)
export function Spotlight({ p }: { p: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <Link ref={ref} href={`/works/${p.slug}`} data-cursor="View" className="group relative flex h-svh flex-col justify-between overflow-hidden bg-ink p-6 text-ivory md:p-12">
      { }
      <MotionPic src={p.i} alt={p.n} style={{ y, scale: 1.25 }} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/70" />
      <Reveal className="relative max-w-2xl"><p className="text-2xl leading-snug font-medium md:text-4xl">{p.d}</p></Reveal>
      <div className="relative">
        <div className="flex items-end justify-between border-b border-ivory/40 pb-4 text-sm">
          <span>{p.client}</span><span>{[p.l, p.y].filter(Boolean).join(", ")}</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-6">
          <div>
            <h3 className="text-5xl font-bold tracking-tight md:text-8xl"><SplitText text={p.n} /></h3>
            <p className="mt-2 text-ivory/70">{p.c}</p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ivory/50 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-ink"><ArrowIcon /></span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectVideo({ p }: { p: Project }) {
  return (
    <section className="px-3 pt-28 md:px-12 md:pt-40">
      <div className="px-2 pb-10 md:px-0"><Label>Project film</Label></div>
      {/* Films fill the full width with no black bars: one film spans the row, two or more share it */}
      <div className={`grid gap-4 md:gap-6 ${p.moreVideos?.length ? "md:grid-cols-2" : ""}`}>
        {[p.video, ...(p.moreVideos ?? [])].map((src, i, all) => (
          <Reveal key={src} className={all.length % 2 === 1 && i === all.length - 1 && all.length > 1 ? "md:col-span-2" : ""}>
            <Film src={src} poster={p.i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// One film: fills its cell edge to edge; tall clips are trimmed to a screen-high frame on desktop, wide clips show whole
// The film only starts downloading when it's about to scroll into view, plays while on screen
// and pauses when scrolled away (saves mobile data: project pages can have three 4K films)
export function Film({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [wide, setWide] = useState(false);
  const near = useInView(ref, { margin: "300px 0px", once: true });
  const onScreen = useInView(ref, { amount: 0.35 });
  const check = () => { const v = ref.current; if (v?.videoWidth) setWide(v.videoWidth > v.videoHeight); };
  useEffect(check, []); // metadata may load before hydration, when onLoadedMetadata isn't attached yet
  useEffect(() => {
    const v = ref.current;
    if (!v || !near) return;
    if (onScreen) v.play().catch(() => {}); else v.pause();
  }, [near, onScreen]);
  return (
    <video ref={ref} src={near ? src : undefined} poster={poster} muted loop playsInline controls preload={near ? "metadata" : "none"} onLoadedMetadata={check}
      className={`block w-full bg-ink ${wide ? "h-auto" : "aspect-[9/16] h-auto object-cover md:aspect-auto md:h-[85svh]"}`} />
  );
}

// Full-screen photo viewer: arrows or keys to move, Esc or a click outside to close
export function Lightbox({ images, name, index, onIndex }: { images: string[]; name: string; index: number | null; onIndex: (i: number | null) => void }) {
  const n = images.length;
  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndex(null);
      if (e.key === "ArrowRight") onIndex((index + 1) % n);
      if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [index, n, onIndex]);
  const btn = "grid h-12 w-12 place-items-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-ink";
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div role="dialog" aria-modal aria-label={`${name} photo ${index + 1} of ${n}`} data-lenis-prevent data-cursor=""
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}
          onClick={() => onIndex(null)} className="fixed inset-0 z-[90] flex flex-col bg-ink/95 text-ivory backdrop-blur">
          <div className="flex items-center justify-between px-5 py-5 text-sm md:px-12">
            <span className="tracking-[0.2em] uppercase">{name} · {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <button type="button" aria-label="Close" onClick={() => onIndex(null)} className={btn}>✕</button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-8 md:px-24">
            <AnimatePresence mode="wait">
              <motion.img key={images[index]} src={images[index]} alt={`${name}, photo ${index + 1} of ${n}`} onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}
                className="max-h-full max-w-full object-contain" />
            </AnimatePresence>
            {n > 1 && <>
              <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + n) % n); }} className={`${btn} absolute left-3 md:left-8`}>←</button>
              <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % n); }} className={`${btn} absolute right-3 md:right-8`}>→</button>
            </>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Phones only: an even 2-column grid of equal photos; with an odd count the first photo spans the row
export function PhoneGallery({ p, onOpen }: { p: Project; onOpen: (i: number) => void }) {
  const odd = p.gallery.length % 2 === 1;
  return (
    <section className="px-5 py-20 md:hidden">
      <div className="pb-8"><Label>Gallery</Label></div>
      <div className="grid grid-cols-2 gap-3">
        {p.gallery.map((g, i) => {
          const wide = odd && i === 0;
          return (
            <Reveal key={g + i} delay={(i % 2) * 0.06} className={wide ? "col-span-2" : ""}>
              <Pic src={g} alt={`${p.n}, photo ${i + 1}`} width={800} height={1000} sizes={wide ? "100vw" : "50vw"} data-cursor="Expand" onClick={() => onOpen(i)}
                className={`w-full cursor-zoom-in bg-sand object-cover ${wide ? "aspect-[4/3]" : "aspect-[4/5]"}`} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// Tablet and desktop gallery: three photos a row. A leftover row is widened to fill the width
// (two photos share it, one photo spans it), so there is never an empty space.
export function GalleryGrid({ p, onOpen }: { p: Project; onOpen: (i: number) => void }) {
  const n = p.gallery.length;
  const four = n === 4; // four photos read best as two rows of two
  const rest = four ? 0 : n % 3;
  return (
    <section className="px-5 py-24 md:px-12 md:py-32">
      <div className="pb-10"><Label>Gallery</Label></div>
      <div className="grid grid-cols-6 gap-3 md:gap-5">
        {p.gallery.map((g, i) => {
          const tail = i >= n - rest;
          const shape = four || (tail && rest === 2) ? "col-span-3 aspect-square" : tail && rest === 1 ? "col-span-6 aspect-[2/1]" : "col-span-2 aspect-[2/3]";
          return (
            <Reveal key={g + i} delay={(i % 3) * 0.08} className={shape}>
              <Pic src={g} alt={`${p.n}, photo ${i + 1}`} width={1200} height={1200} sizes={shape.includes("col-span-2") ? "33vw" : shape.includes("col-span-3") ? "50vw" : "100vw"}
                data-cursor="Expand" onClick={() => onOpen(i)} className="h-full w-full cursor-zoom-in bg-sand object-cover" />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// Filter tabs (active pill slides between them) and the editorial grid: every fifth card spans two columns
export function WorksFilter() {
  const [cat, setCat] = useState("All");
  const shown = projects.filter((p) => cat === "All" || p.cat === cat);
  return (
        <section className="px-5 pb-24 md:px-12 md:pb-32">
          <Reveal>
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Filter projects" data-lenis-prevent>
              {workCats.map(({ c, n }) => (
                <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                  className={`relative shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors ${cat === c ? "border-ink text-ivory" : "border-ink/15 hover:border-ink/40"}`}>
                  {cat === c && <motion.span layoutId="work-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease }} />}
                  <span className="relative">{c} <span className={cat === c ? "text-ivory/70" : "text-ink/65"}>{n}</span></span>
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
  );
}

// Gallery grid (phone and larger versions) plus the full-screen photo viewer it opens
export function ProjectGallery({ p }: { p: Project }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PhoneGallery p={p} onOpen={setOpen} />
      <div className="hidden md:block">
        <GalleryGrid p={p} onOpen={setOpen} />
      </div>
      <Lightbox images={p.gallery} name={p.n} index={open} onIndex={setOpen} />
    </>
  );
}
