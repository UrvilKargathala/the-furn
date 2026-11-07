"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useMotionValueEvent } from "motion/react";
import { Reveal, SplitText, RollText, ParallaxImg, motion, useScroll, ease } from "./fx";
import { img, links, CONTACT } from "./content/site";
import { services } from "./content/services";


const phoneIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>;
const waIcon = (c = "h-6 w-6") => <svg viewBox="0 0 24 24" fill="currentColor" className={c} aria-hidden><path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm4.4 12.3c-.2.5-1.1 1-1.6 1-.4.1-.9.1-2.9-.7-2.4-1-4-3.4-4.1-3.6-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" /></svg>;

// Floating WhatsApp button, phones only (desktop visitors have the nav and CTA)
export function WhatsAppFab() {
  return (
    <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 transition-transform active:scale-95 md:hidden">
      {waIcon("h-7 w-7")}
    </a>
  );
}
import { Pic } from "./pic";

// Section tag: a tiny brass bench mark (from the logo), the label in spaced small caps,
// and a hairline that draws itself out when the section scrolls into view
export function Label({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <Reveal>
      <span className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${dark ? "text-ivory/75" : "text-ink/60"}`}>
        <Mark className="h-3 w-auto shrink-0 text-brass" />
        <span>{children}</span>
        <motion.span aria-hidden className="h-px w-14 origin-left bg-brass/70"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease, delay: 0.25 }} />
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

// The diagonal arrow used on every link and card
export function ArrowIcon({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

// Arrow in a small ivory circle (button end-caps)
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span className={`grid h-8 w-8 place-items-center rounded-full bg-ivory text-ink transition-transform duration-500 group-hover:rotate-45 ${className}`}>
      <ArrowIcon />
    </span>
  );
}

// Big two-line page title (second line muted) with an optional section tag above it.
// One component so every page hero keeps the same size, spacing and animation.
export function PageHero({ label, lines, dark = false, as: Tag = "h1", large = false }: {
  label?: string; lines: [string, string]; dark?: boolean; as?: "h1" | "h2"; large?: boolean;
}) {
  return (
    <>
      {label && <Label dark={dark}>{label}</Label>}
      <Tag className={`${label ? "mt-6" : ""} text-[13vw] leading-[0.9] font-bold tracking-[-0.04em] ${large ? "md:text-[9vw]" : "md:text-[8vw]"}`}>
        <span className="block"><SplitText text={lines[0]} /></span>
        <span className={`block ${dark ? "text-stone" : "text-ink/35"}`}><SplitText text={lines[1]} delay={0.2} /></span>
      </Tag>
    </>
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
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const anchor = useRef(0);
  const { scrollY } = useScroll();
  // Direction is measured from where it last changed, so slow trackpad scrolls still count
  useMotionValueEvent(scrollY, "change", (y) => {
    setAtTop(y <= 120);
    if (y <= 120) { setHidden(false); anchor.current = y; return; }
    // Hide while scrolling down, bring it back as soon as the user scrolls up
    if (y - anchor.current > 12) { setHidden(true); setOpen(false); anchor.current = y; }
    else if (anchor.current - y > 12) { setHidden(false); anchor.current = y; }
    else if ((hidden && y > anchor.current) || (!hidden && y < anchor.current)) anchor.current = y;
  });
  const clear = atTop && !light;
  return (
    <motion.header initial={{ y: -100, opacity: 0 }} animate={show ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${hidden ? "-translate-y-[150%]" : "translate-y-0"}`}>
      <nav className={`flex w-full items-center justify-between gap-10 border-b px-5 text-ivory transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:px-12 ${clear ? "border-transparent bg-transparent py-4" : "border-ivory/10 bg-ink/80 py-3 backdrop-blur-xl"}`}>
        <Logo />
        <ul className={`hidden items-center gap-1 transition-all duration-500 md:flex text-[17px]`}>
          {links.map(([t, h]) => (
            <li key={t}><Link href={h} className="group block rounded-full px-4 py-2 transition-colors hover:bg-ivory/10"><RollText>{t}</RollText></Link></li>
          ))}
        </ul>
        <a href={CONTACT.phone.href} aria-label={`Call us on ${CONTACT.phone.label}`} className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-ivory/25 md:hidden">{phoneIcon}</a>
        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="grid h-11 w-11 place-items-center md:hidden">
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ${open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"}`} />
          </span>
        </button>
      </nav>
      <motion.div initial={false} animate={open ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -12, pointerEvents: "none" }}
        transition={{ duration: 0.4, ease }}
        className="border-b border-ivory/10 bg-ink/90 p-3 text-ivory backdrop-blur-xl md:hidden">
        {links.map(([t, h]) => (
          <Link key={t} href={h} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg font-medium hover:bg-ivory/10">{t}</Link>
        ))}
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-ivory/10 pt-3">
          <a href={CONTACT.phone.href} className="flex items-center justify-center gap-2 rounded-full bg-brass px-4 py-3 font-semibold text-ink">{phoneIcon}Call us</a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-4 py-3 font-semibold">{waIcon("h-5 w-5")}WhatsApp</a>
        </div>
      </motion.div>
      </div>
    </motion.header>
  );
}

export function Cta() {
  return (
    <section id="contact">
      <div className="relative overflow-hidden bg-ink px-6 py-24 text-center text-ivory md:py-36">
        <ParallaxImg src={img("1565538810643-b5bdb714032a", 2400)} alt="" className="absolute inset-0 opacity-40" />
        <div className="relative">
          
          <Label dark>Start your project</Label>
          <h2 className="mx-auto mt-6 max-w-4xl text-5xl leading-[1] font-bold tracking-tight md:text-8xl">
            <SplitText text="Let's build your" /><SplitText text="dream space." className="text-stone" delay={0.2} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-md text-ivory/75">Book a free consultation. We&apos;ll measure, plan and quote, with no obligation.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="group flex items-center gap-3 rounded-full bg-brass py-2 pr-2 pl-6 font-semibold"><RollText>Book a consultation</RollText><Arrow /></Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="group rounded-full border border-ivory/30 px-6 py-3 font-semibold backdrop-blur-md"><RollText>WhatsApp us</RollText></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const social: { n: string; href: string; icon: React.ReactNode }[] = [
  { n: "Instagram", href: CONTACT.instagram.href, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg> },
  { n: "Pinterest", href: "https://in.pinterest.com/thefurnprojects/", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M12 2C6.5 2 3 5.7 3 9.8c0 2.5 1.4 4.6 3.4 5.2.3.1.5 0 .6-.3l.3-1.1c.1-.3 0-.4-.2-.6-.6-.7-.9-1.6-.9-2.8 0-3.1 2.3-5.3 5.5-5.3 3 0 4.7 1.8 4.7 4.3 0 3.2-1.4 5.9-3.6 5.9-1.2 0-2-1-1.7-2.2.3-1.4 1-3 1-4 0-.9-.5-1.7-1.5-1.7-1.2 0-2.1 1.2-2.1 2.9 0 1 .4 1.8.4 1.8l-1.4 5.9c-.3 1.3 0 3.1 0 3.3 0 .1.2.2.3.1.1-.1 1.4-1.8 1.9-3.5l.7-2.7c.4.7 1.4 1.3 2.5 1.3 3.3 0 5.5-3 5.5-7C21 5 17.5 2 12 2z" /></svg> },
  { n: "LinkedIn", href: "https://www.linkedin.com/company/the-furn-projects/", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4v11H3v-11zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11z" /></svg> },
  { n: "WhatsApp", href: CONTACT.whatsapp, icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm4.4 12.3c-.2.5-1.1 1-1.6 1-.4.1-.9.1-2.9-.7-2.4-1-4-3.4-4.1-3.6-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" /></svg> },
];

// Dark footer over one of our own kitchen photos (like a card, matching the CTA above it)
// Current year, read in the browser (pages are prerendered, so the server can't know "today")
const noSubscribe = () => () => {};
function CurrentYear() {
  return useSyncExternalStore(noSubscribe, () => String(new Date().getFullYear()), () => "");
}

export function Footer() {
  const contact: [string, string, string][] = [
    ["Phone", CONTACT.phone.label, CONTACT.phone.href],
    ["Email", CONTACT.email, `mailto:${CONTACT.email}`],
    ["Address", CONTACT.address, CONTACT.maps],
  ];
  return (
    <footer>
      <div className="relative overflow-hidden bg-ink px-5 pt-16 pb-24 text-ivory md:px-12 md:pt-20 md:pb-6">
        <Pic src="/works/globcon/11.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink/35" />
        <div className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr] lg:gap-14">
            <Reveal>
              <p className="max-w-md text-2xl leading-snug font-medium tracking-tight md:text-3xl lg:max-w-sm">Tailored modular furniture, designed and built for the way you live.</p>
              <p className="mt-10 text-sm font-semibold tracking-[0.25em] uppercase lg:mt-12">Follow us</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {social.map((s) => (
                  <li key={s.n}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.n} title={s.n}
                      className="grid h-12 w-12 place-items-center rounded-2xl md:h-14 md:w-14 bg-ivory/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-brass hover:text-ink">{s.icon}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[0.8fr_1.1fr_1.5fr] md:gap-10">
              <Reveal delay={0.1}>
                <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-ivory/50 uppercase">Menu</p>
                <ul className="space-y-3 text-base md:text-lg">
                  {links.map(([t, h]) => <li key={t}><Link href={h} className="group text-ivory/85 hover:text-ivory"><RollText>{t}</RollText></Link></li>)}
                </ul>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-ivory/50 uppercase">Services</p>
                <ul className="space-y-3 text-base md:text-lg">
                  {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="group text-ivory/85 hover:text-ivory"><RollText>{s.t}</RollText></Link></li>)}
                </ul>
              </Reveal>
              <Reveal delay={0.3} className="col-span-2 md:col-span-1">
                <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-ivory/50 uppercase">Contact</p>
                <ul className="space-y-5">
                  {contact.map(([k, v, href]) => (
                    <li key={k}>
                      <p className="text-sm text-ivory/50">{k}</p>
                      <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-1 block text-base leading-snug break-words text-ivory/90 hover:text-ivory md:text-lg">{v}</a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t sm:flex-row sm:flex-wrap sm:justify-between sm:gap-4 md:mt-20 border-ivory/15 pt-6 text-sm text-ivory/60">
            <span>© <CurrentYear /> The Furn. All rights reserved.</span>
            <span>Tailored Modular Furniture · Surat, India</span>
          </div>
          <p aria-hidden className="mt-8 bg-gradient-to-b from-ivory via-ivory/70 to-transparent bg-clip-text text-center text-[17vw] leading-[0.82] font-bold tracking-[-0.05em] whitespace-nowrap text-transparent select-none">THE FURN</p>
        </div>
      </div>
    </footer>
  );
}
