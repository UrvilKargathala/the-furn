"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useMotionValueEvent } from "motion/react";
import { Reveal, SplitText, RollText, ParallaxImg, motion, useScroll, ease } from "./fx";
import { img, links, services } from "./data";

export function Label({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <Reveal>
      <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "border-ivory/20 text-ivory/70" : "border-ink/15 text-ink/60"}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-brass" />{children}
      </span>
    </Reveal>
  );
}

export function Heading({ text, accent, dark = false }: { text: string; accent?: string; dark?: boolean }) {
  return (
    <h2 className={`mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl ${dark ? "text-ivory" : ""}`}>
      <SplitText text={text} />
      {accent && <SplitText text={accent} className={dark ? "text-stone" : "text-ink/35"} delay={0.15} />}
    </h2>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span className={`grid h-8 w-8 place-items-center rounded-full bg-ivory text-ink transition-transform duration-500 group-hover:rotate-45 ${className}`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" /></svg>
    </span>
  );
}

// Brand mark (T···f bench), traced from the supplied logo
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="190 655 1552 620" fill="currentColor" aria-hidden className={className}>
      <path d="M193 670h356v63H405v110h916v56H405v372h-63V733H193z" />
      <path d="M1354 843h56v56h-56zM1443 843h56v56h-56z" />
      <path d="M1532 843h206v56h-143v372h-63z" />
      <path d="M1532 809l13-89q7-20 35-27l153-33v40q-2 12-21 17l-92 18q-25 7-25 35v39z" />
    </svg>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center text-ivory">
      <Mark className={`w-auto transition-all duration-500 ${compact ? "h-6" : "h-7 md:h-9"}`} />
      <span className="sr-only">The Furn</span>
    </Link>
  );
}

// Black intro: logo sweeps in, brand letters fade in, then the curtain lifts
export function Loader({ onDone }: { onDone: () => void }) {
  const letters = "THE FURN".split("");
  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-black text-ivory"
      initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 2 }}
      onAnimationComplete={onDone}>
      <div className="flex items-center gap-4">
        <motion.div initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1, ease }}>
          <Mark className="h-10 w-auto md:h-12" />
        </motion.div>
        <div className="flex text-2xl font-semibold tracking-[0.35em] md:text-3xl">
          {letters.map((l, i) => (
            <motion.span key={i} initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}>{l === " " ? " " : l}</motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// `light` = page starts on a light background, so the bar needs its dark fill even at the top
export function Nav({ show = true, light = false }: { show?: boolean; light?: boolean }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const anchor = useRef(0);
  const { scrollY } = useScroll();
  // Direction is measured from where it last changed, so slow trackpad scrolls still count
  useMotionValueEvent(scrollY, "change", (y) => {
    setAtTop(y <= 120);
    if (y <= 120) { setCompact(false); anchor.current = y; return; }
    if (y - anchor.current > 12) { setCompact(true); anchor.current = y; }
    else if (anchor.current - y > 12) { setCompact(false); anchor.current = y; }
    else if ((compact && y > anchor.current) || (!compact && y < anchor.current)) anchor.current = y;
  });
  const clear = atTop && !light;
  return (
    <motion.header initial={{ y: -100, opacity: 0 }} animate={show ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-8 md:pt-6">
      <nav className={`mx-auto flex items-center justify-between gap-10 rounded-full border px-2 text-ivory transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${compact ? "max-w-[620px] border-ivory/10 bg-ink/80 py-1.5 pl-3 backdrop-blur-xl" : clear ? "max-w-[1400px] border-transparent bg-transparent py-2" : "max-w-[1400px] border-ivory/10 bg-ink/70 py-2 pl-5 backdrop-blur-xl"}`}>
        <Logo compact={compact} />
        <ul className={`hidden items-center gap-1 transition-all duration-500 md:flex ${compact ? "text-[15px]" : "text-[17px]"}`}>
          {links.map(([t, h]) => (
            <li key={t}><Link href={h} className="group block rounded-full px-4 py-2 transition-colors hover:bg-ivory/10"><RollText>{t}</RollText></Link></li>
          ))}
        </ul>
        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="ml-auto grid h-11 w-11 place-items-center md:hidden">
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ${open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"}`} />
          </span>
        </button>
      </nav>
      <motion.div initial={false} animate={open ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -12, pointerEvents: "none" }}
        transition={{ duration: 0.4, ease }}
        className="mt-2 rounded-3xl border border-ivory/10 bg-ink/80 p-3 text-ivory backdrop-blur-xl md:hidden">
        {links.map(([t, h]) => (
          <Link key={t} href={h} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg font-medium hover:bg-ivory/10">{t}</Link>
        ))}
      </motion.div>
    </motion.header>
  );
}

export function Cta() {
  return (
    <section id="contact" className="p-3">
      <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-24 text-center text-ivory md:py-36">
        <ParallaxImg src={img("1565538810643-b5bdb714032a", 2400)} alt="" className="absolute inset-0 opacity-40" />
        <div className="relative">
          <Label dark>Start your project</Label>
          <h2 className="mx-auto mt-6 max-w-4xl text-5xl leading-[1] font-bold tracking-tight md:text-8xl">
            <SplitText text="Let's build your" /><SplitText text="dream space." className="text-stone" delay={0.2} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-md text-ivory/75">Book a free consultation. We&apos;ll measure, plan and quote, with no obligation.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="mailto:hello@thefurn.in" className="group flex items-center gap-3 rounded-full bg-brass py-2 pr-2 pl-6 font-semibold"><RollText>Book a consultation</RollText><Arrow /></a>
              <a href="https://wa.me/" className="group rounded-full border border-ivory/30 px-6 py-3 font-semibold backdrop-blur-md"><RollText>WhatsApp us</RollText></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols: [string, string[][]][] = [
    ["Explore", links],
    ["Services", services.map((s) => [s.t, `/services/${s.slug}`])],
    ["Contact", [["hello@thefurn.in", "mailto:hello@thefurn.in"], ["+91 00000 00000", "tel:+910000000000"], ["Instagram", "#"], ["Pinterest", "#"]]],
  ];
  return (
    <footer className="overflow-hidden px-5 pt-20 pb-6 md:px-12">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <Reveal>
          <p className="max-w-xs text-xl font-semibold tracking-tight">Tailored modular furniture, designed and built for the way you live.</p>
        </Reveal>
        {cols.map(([title, items], i) => (
          <Reveal key={title} delay={0.1 * (i + 1)}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">{title}</p>
            <ul className="space-y-2">
              {items.map(([t, h]) => <li key={t}><Link href={h} className="group text-ink/80 hover:text-ink"><RollText>{t}</RollText></Link></li>)}
            </ul>
          </Reveal>
        ))}
      </div>
      <p aria-hidden className="mt-20 text-center text-[19vw] leading-[0.8] font-bold tracking-[-0.05em] whitespace-nowrap">
        <SplitText text="THE FURN" />
      </p>
      <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-ink/50">
        <span>© 2026 The Furn. All rights reserved.</span>
        <span>Tailored Modular Furniture</span>
      </div>
    </footer>
  );
}
