"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useInView, animate } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
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

// Words slide up from a mask, staggered. The outer span is what gets observed:
// the inner words start clipped (invisible), so they can't trigger whileInView themselves.
export function SplitText({ text, className = "", delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const word = { hidden: { y: "110%" }, show: (i: number) => ({ y: 0, transition: { duration: 1, ease, delay: delay + i * 0.06 } }) };
  const trigger = play === undefined
    ? { whileInView: "show", viewport: { once: true } }
    : { animate: play ? "show" : "hidden" };
  return (
    <motion.span className={className} aria-label={text} initial="hidden" {...trigger}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block" variants={word} custom={i}>{w}&nbsp;</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Paragraph whose words light up as you scroll through it
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
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
export function ParallaxImg({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`} initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true }} transition={{ duration: 1.3, ease }}>
      { }
      <motion.img src={src} alt={alt} style={{ y, scale: 1.18 }} className="h-full w-full object-cover" />
    </motion.div>
  );
}

export { motion, useScroll, useTransform, ease };
