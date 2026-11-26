"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useInView, animate, useMotionValue, useSpring } from "motion/react";
import { Pic } from "./pic";

const ease = [0.22, 1, 0.36, 1] as const;

// Back/forward should keep the old scroll position; every other page change starts at the top
let backForward = false;
if (typeof window !== "undefined") window.addEventListener("popstate", () => { backForward = true; });

export function SmoothScroll() {
  useEffect(() => {
    if (!backForward && !location.hash) window.scrollTo(0, 0);
    backForward = false;
    // Respect "reduce motion": keep the browser's native scrolling
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.075,           // lower = longer, softer glide after each wheel step
      wheelMultiplier: 0.9,  // slightly calmer mouse wheel
      touchMultiplier: 1.4,  // trackpads and touch keep their natural speed
      smoothWheel: true,
      anchors: true,         // in-page links (#contact etc.) glide instead of jumping
    });
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
}

// Scroll progress for scroll-linked animation (parallax, sticky sections), lightly damped
// so movement glides with the page instead of stepping with each wheel tick.
export function useSmoothScroll(options: Parameters<typeof useScroll>[0]) {
  const { scrollYProgress, ...rest } = useScroll(options);
  const spring = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.35, restDelta: 0.0005 });
  // Always a real number between 0 and 1: sections that turn progress into a list index
  // (Studio "In numbers", Our Story chapters) must never see -0.001, 1.002 or NaN
  const smooth = useTransform(spring, (v) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0));
  return { ...rest, scrollYProgress: smooth };
}

// Fade + rise when scrolled into view
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, ease, delay }}>
      {children}
    </motion.div>
  );
}

// Words slide up from a mask, staggered. Hidden at 160% so no letter tops peek through the mask's bottom padding. The outer span is what gets observed:
// the inner words start clipped (invisible), so they can't trigger whileInView themselves.
export function SplitText({ text, className = "", delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const word = { hidden: { y: "160%" }, show: (i: number) => ({ y: 0, transition: { duration: 1, ease, delay: delay + i * 0.06 } }) };
  const trigger = play === undefined
    ? { whileInView: "show", viewport: { once: true } }
    : { animate: play ? "show" : "hidden" };
  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="-mb-[0.18em] inline-block overflow-hidden pb-[0.3em] align-bottom">
          <motion.span className="inline-block" variants={word} custom={i}>{w}&nbsp;</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Paragraph whose words light up as you scroll through it
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => <Word key={i} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
    </p>
  );
}
function Word({ children, p, range }: { children: string; p: ReturnType<typeof useScroll>["scrollYProgress"]; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

// Number counts up once visible
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Hover: label rolls up and a copy rolls in from below
export function RollText({ children }: { children: string }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">{children}</span>
    </span>
  );
}

// Image wipes in with a clip reveal and drifts on scroll
export function ParallaxImg({ src, alt, className = "", quality }: { src: string; alt: string; className?: string; quality?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`} initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true }} transition={{ duration: 1.3, ease }}>
      <motion.div style={{ y, scale: 1.18 }} className="h-full w-full will-change-transform"><Pic src={src} alt={alt} quality={quality} className="h-full w-full object-cover" /></motion.div>
    </motion.div>
  );
}

// Full-width photo band
export function WideningImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useSmoothScroll({ target: ref, offset: ["start end", "end start"] });
  // Full width edge to edge; the photo slowly zooms out and drifts as you scroll past
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="h-[85svh] w-full overflow-hidden">
      <motion.div style={{ scale, y }} className="h-full w-full will-change-transform"><Pic src={src} alt={alt} preload fetchPriority="high" className="h-full w-full object-cover" /></motion.div>
    </div>
  );
}

// Cursor label: hovering anything marked data-cursor="View" shows a small round label that follows the mouse (mouse only)
export function HoverCursor() {
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 });
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(el?.getAttribute("data-cursor") ?? "");
    };
    const leave = () => setLabel("");
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", leave); // a click opens or leaves something: hide until the mouse moves again
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", leave); document.removeEventListener("pointerleave", leave); };
  }, [x, y]);
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed top-0 left-0 z-[100]">
      <motion.div initial={false} animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }} transition={{ duration: 0.35, ease }}
        className="-translate-x-1/2 -translate-y-1/2 grid h-20 w-20 place-items-center rounded-full bg-ivory/90 text-xs font-semibold tracking-[0.15em] text-ink uppercase shadow-lg backdrop-blur">
        {label}
      </motion.div>
    </motion.div>
  );
}

// Mount animation usable from server components (props must be plain data)
export function Appear({ children, className, initial, animate, transition }: {
  children?: React.ReactNode; className?: string;
  initial: Record<string, number | string>; animate: Record<string, number | string>; transition?: Record<string, unknown>;
}) {
  return <motion.div className={className} initial={initial} animate={animate} transition={transition}>{children}</motion.div>;
}

// Hero media intro: starts as a small rounded frame in the centre and opens out to fill the hero,
// while the photo or film inside settles from a slight zoom. Usable from server components.
export function HeroGrow({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <motion.div className={`absolute inset-0 ${className}`}
      initial={{ clipPath: "inset(34% 30% 34% 30% round 20px)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}>
      <motion.div className="h-full w-full" initial={{ scale: 1.35 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease, delay: 0.2 }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// Hero copy and buttons: rise out of a soft blur, one after another via `delay`
export function BlurIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease, delay }}>
      {children}
    </motion.div>
  );
}

// next/image that motion can animate (scale, y, opacity)
export const MotionPic = motion.create(Pic);

export { motion, useScroll, useTransform, ease };
