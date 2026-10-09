"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValueEvent, type MotionValue } from "motion/react";
import { SmoothScroll, Reveal, SplitText, ScrollWords, Counter, RollText, ParallaxImg, motion, useScroll, useTransform, ease } from "./fx";

// ponytail: Unsplash/Pexels placeholders, swap for real project media in /public
const img = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const SLIDE_MS = 7000;

const links = [["Home", "#"], ["Services", "#services"], ["Works", "#projects"], ["Studio", "#about"], ["Process", "#process"]];

const categories = [
  { t: "Kitchen", h: "Kitchens built around how you cook", d: "Modular kitchens with precision shutters, smart storage and hardware that lasts.", i: "1556912173-3bb406ef7e77", v: "https://videos.pexels.com/video-files/38231065/16231771_1280_720_60fps.mp4" },
  { t: "Wardrobe", h: "Wardrobes made for everything you own", d: "Sliding, hinged and walk-in storage, sized to the last shelf and drawer.", i: "1616486338812-3dadae4b4ace", v: "https://videos.pexels.com/video-files/15887130/15887130-hd_1280_720_30fps.mp4" },
  { t: "Living", h: "Living spaces that feel like home", d: "TV units, panelling and furniture that bring calm and warmth to every room.", i: "1618221195710-dd6b41faaea6", v: "https://videos.pexels.com/video-files/7578540/7578540-hd_1280_720_30fps.mp4" },
];

const services = [
  { t: "Modular Kitchens", d: "Parallel, L-shape, island and U-shape kitchens built around how you cook.", tags: ["Layout", "Shutters", "Hardware"], i: "1556911220-bff31c812dba" },
  { t: "Wardrobes", d: "Sliding, hinged and walk-in storage with fittings sized to your wardrobe.", tags: ["Sliding", "Walk-in", "Lofts"], i: "1616486338812-3dadae4b4ace" },
  { t: "Living & TV Units", d: "Panelling, consoles and display units that anchor the room.", tags: ["Panelling", "Consoles", "Display"], i: "1618221195710-dd6b41faaea6" },
  { t: "Complete Interiors", d: "End-to-end homes, from layout and material palette to handover.", tags: ["Planning", "Materials", "Turnkey"], i: "1600210492486-724fe5c67fb0" },
];

const projects = [
  { n: "Serene Art", c: "Modular Kitchen", l: "Ahmedabad", i: "1556912173-3bb406ef7e77" },
  { n: "Island Axis", c: "Island Kitchen", l: "Surat", i: "1565538810643-b5bdb714032a" },
  { n: "Aestra", c: "Wardrobe", l: "Vadodara", i: "1616486338812-3dadae4b4ace" },
  { n: "Beige Bailey", c: "Complete Interior", l: "Rajkot", i: "1618221195710-dd6b41faaea6" },
];

const steps = [
  { t: "Consult", d: "We visit, measure and listen to how the space is really used.", i: "1600210492486-724fe5c67fb0" },
  { t: "Design", d: "3D layouts, material boards and a transparent, itemised quote.", i: "1618221195710-dd6b41faaea6" },
  { t: "Craft", d: "Factory-made modules with precision edges and soft-close hardware.", i: "1556912173-3bb406ef7e77" },
  { t: "Install", d: "Clean, on-schedule fitting and a final walkthrough with you.", i: "1565538810643-b5bdb714032a" },
];

function Label({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <Reveal>
      <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "border-ivory/20 text-ivory/70" : "border-ink/15 text-ink/60"}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-brass" />{children}
      </span>
    </Reveal>
  );
}

function Heading({ text, accent, dark = false }: { text: string; accent?: string; dark?: boolean }) {
  return (
    <h2 className={`mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl ${dark ? "text-ivory" : ""}`}>
      <SplitText text={text} />
      {accent && <SplitText text={accent} className={dark ? "text-stone" : "text-ink/35"} delay={0.15} />}
    </h2>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <span className={`grid h-8 w-8 place-items-center rounded-full bg-ivory text-ink transition-transform duration-500 group-hover:rotate-45 ${className}`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" /></svg>
    </span>
  );
}

// Brand mark (T···f bench), traced from the supplied logo
function Mark({ className = "" }: { className?: string }) {
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
    <a href="#" className={`flex items-center text-lg font-bold tracking-[0.25em] text-ivory transition-all duration-500 ${compact ? "gap-0" : "gap-3"}`}>
      <Mark className="h-6 w-auto md:h-7" />
      <span className={`overflow-hidden whitespace-nowrap transition-all duration-500 ${compact ? "max-w-0 opacity-0" : "max-w-40"}`}>THE FURN</span>
    </a>
  );
}

// Black intro: brand letters fade in one by one, then the curtain lifts
function Loader({ onDone }: { onDone: () => void }) {
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

function Nav({ show }: { show: boolean }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y <= 120) setCompact(false);
    else if (Math.abs(y - prev) > 4) setCompact(y > prev);
  });
  return (
    <motion.header initial={{ y: -100, opacity: 0 }} animate={show ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-8 md:pt-6">
      <nav className={`mx-auto flex items-center justify-between gap-10 rounded-full border px-2 text-ivory transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${compact ? "max-w-[620px] border-ivory/10 bg-ink/80 py-1.5 pl-3 backdrop-blur-xl" : "max-w-[1400px] border-transparent bg-transparent py-2"}`}>
        <Logo compact={compact} />
        <ul className={`hidden items-center gap-1 transition-all duration-500 md:flex ${compact ? "text-[15px]" : "text-[17px]"}`}>
          {links.map(([t, h]) => (
            <li key={t}><a href={h} className="group block rounded-full px-4 py-2 transition-colors hover:bg-ivory/10"><RollText>{t}</RollText></a></li>
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
          <a key={t} href={h} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg font-medium hover:bg-ivory/10">{t}</a>
        ))}
      </motion.div>
    </motion.header>
  );
}

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
                    <p className="max-w-sm text-ink/70">{s.d}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => <span key={t} className="rounded-full border border-ink/15 px-3 py-1 text-xs">{t}</span>)}
                    </div>
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

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const frame = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  return (
    <motion.a ref={ref} href="#contact" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease }} className="group relative grid h-[80svh] min-h-[520px] place-items-center overflow-hidden rounded-[28px] bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(p.i, 1200)} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl" />
      <motion.div style={{ scale: frame }} className="relative w-[78%] max-w-xl bg-ivory p-2 shadow-2xl md:p-3">
        <div className="aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(p.i, 1200)} alt={p.n} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
        </div>
        <div className="py-5 text-center">
          <h3 className="text-xl font-semibold tracking-tight uppercase md:text-2xl">{p.n}</h3>
          <p className="mt-1 text-sm text-ink/60">{p.l}, India</p>
        </div>
      </motion.div>
      <span className="absolute bottom-5 left-5 rounded-full border border-ivory/40 bg-ivory/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-ivory uppercase backdrop-blur-md">{p.c}</span>
      <span className="absolute right-5 bottom-5 grid h-11 w-11 place-items-center rounded-full border border-ivory/40 text-ivory transition-all duration-500 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-ink">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" /></svg>
      </span>
    </motion.a>
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
          <div className="max-w-4xl">
            <motion.p {...fade(0.4)} className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase text-ivory/80">
              <span className="h-px w-10 bg-brass" />The Furn · Tailored Modular Furniture
            </motion.p>
            <AnimatePresence mode="wait">
              <motion.div key={active} exit={{ opacity: 0, y: -30, filter: "blur(6px)" }} transition={{ duration: 0.5, ease }}>
                <h1 className="text-[12vw] leading-[0.9] font-bold tracking-[-0.04em] md:text-[6.5vw]">
                  <SplitText text={categories[active].h} play={ready} delay={0.1} />
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

      {/* Projects: blurred backdrop + framed photo cards */}
      <section id="projects" className="px-3 py-28 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 px-2 md:px-0">
          <div><Label>Our Works</Label><Heading text="Selected" accent="projects" /></div>
          <Reveal><a href="#contact" className="group flex items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-ivory"><RollText>All projects</RollText><Arrow /></a></Reveal>
        </div>
        <div className="mt-16 space-y-4">
          {projects.map((p) => <ProjectCard key={p.n} p={p} />)}
        </div>
      </section>

      {/* Process: cards pin and stack while scrolling */}
      <section id="process" className="px-3 pt-28 pb-16 md:px-12">
        <div className="px-2 md:px-0"><Label>How it Works</Label><Heading text="From first sketch" accent="to final handover" /></div>
        <div className="mt-16">
          {steps.map((st, i) => (
            <div key={st.t} className="sticky mb-6" style={{ top: 96 + i * 84 }}>
              <div className="grid gap-4 overflow-hidden rounded-[28px] bg-ink p-4 text-ivory md:h-[56vh] md:grid-cols-[1fr_1.3fr]">
                <div className="flex flex-col justify-between p-3 md:p-4">
                  <span className="text-4xl leading-none font-semibold text-brass md:text-5xl">/0{i + 1}</span>
                  <div className="mt-10">
                    <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{st.t}</h3>
                    <p className="mt-4 max-w-sm text-ivory/70">{st.d}</p>
                  </div>
                </div>
                <ParallaxImg src={img(st.i)} alt={st.t} className="aspect-[4/3] rounded-[20px] md:aspect-auto" />
              </div>
            </div>
          ))}
        </div>
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

      {/* Start your project */}
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

      {/* Footer */}
      <footer className="overflow-hidden px-5 pt-20 pb-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <Reveal>
            <p className="max-w-xs text-xl font-semibold tracking-tight">Tailored modular furniture, designed and built for the way you live.</p>
          </Reveal>
          {[
            ["Explore", links],
            ["Services", services.map((s) => [s.t, "#services"])],
            ["Contact", [["hello@thefurn.in", "mailto:hello@thefurn.in"], ["+91 00000 00000", "tel:+910000000000"], ["Instagram", "#"], ["Pinterest", "#"]]],
          ].map(([title, items], i) => (
            <Reveal key={title as string} delay={0.1 * (i + 1)}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">{title as string}</p>
              <ul className="space-y-2">
                {(items as string[][]).map(([t, h]) => <li key={t}><a href={h} className="group text-ink/80 hover:text-ink"><RollText>{t}</RollText></a></li>)}
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
    </main>
  );
}
