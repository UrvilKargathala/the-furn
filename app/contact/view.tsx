import { SmoothScroll, Reveal, HeroGrow, BlurIn } from "../fx";
import { CONTACT, STATS } from "../content/site";
import { Nav, Footer, PageHero } from "../ui";
import { Pic } from "../pic";
import { Form, JumpTo } from "./form";


const info: [string, string, string?][] = [
  ["Phone", CONTACT.phone.label, CONTACT.phone.href],
  ["Email", CONTACT.email, `mailto:${CONTACT.email}`],
  ["Studio", CONTACT.address, CONTACT.maps],
  ["Instagram", CONTACT.instagram.label, CONTACT.instagram.href],
  ["Hours", CONTACT.hours],
];

// Reassurance right above the form: three quick facts as a stat strip (big figure, label, one line)
const trust: { n: string; u: string; t: string; d: string }[] = [
  { n: "24", u: "h", t: "Reply time", d: "A real person calls you back, Monday to Saturday." },
  { n: String(STATS.warrantyYears), u: " yr", t: "Hardware warranty", d: "Every module is covered, with care guidance at handover." },
  { n: String(STATS.cities.length), u: " cities", t: "Where we work", d: `${STATS.cities.slice(0, -1).join(", ")} and ${STATS.cities.at(-1)}.` },
];

function Trust() {
  return (
    <Reveal>
      <ul className="mb-10 grid grid-cols-3 border-y border-ink/15 sm:mb-14">
        {trust.map((x, k) => (
          <li key={x.t} className={`group py-5 sm:py-7 ${k ? "border-l border-ink/15 pl-4 sm:pl-7" : "pr-4 sm:pr-7"} ${k === 1 ? "pr-4 sm:pr-7" : ""}`}>
            <p className="text-[2rem] leading-none font-semibold tracking-tight sm:text-5xl">
              {x.n}<span className="text-[0.6em] text-brass sm:text-[1em]">{x.u}</span>
            </p>
            <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-ink/65 uppercase sm:text-xs">{x.t}</p>
            <p className="mt-2 hidden max-w-[16rem] text-sm leading-relaxed text-ink/65 sm:block">{x.d}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function ContactView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Photo first: one of our own projects behind the heading */}
      <section className="relative h-[56svh] overflow-hidden bg-ink text-ivory md:h-[80svh]">
        <HeroGrow>
          <Pic preload src="/works/avadh-ayuska/02.jpg" alt="Living room designed and built by The Furn" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45" />
        </HeroGrow>
        <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-12 md:p-12 md:pb-16">
          
          <BlurIn delay={0.9}><PageHero label="Contact us" lines={["Let's talk about", "your space."]} dark delay={1} /></BlurIn>
          <JumpTo target="enquiry" className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink md:hidden">Fill the form <span aria-hidden>↓</span></JumpTo>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-20 px-5 py-14 md:px-12 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <Reveal className="order-2 lg:order-none">
            <p className="max-w-sm text-lg text-ink/70">Tell us about your home and your budget. We&apos;ll call you to plan a site visit, then measure, design and quote with no obligation.</p>
            <dl className="mt-12">
              {info.map(([k, v, href]) => (
                <div key={k} className="flex items-center justify-between gap-6 border-t border-ink/15 py-3">
                  <dt className="text-ink/65">{k}</dt>
                  <dd className="max-w-[16rem] text-right font-semibold md:max-w-md lg:max-w-[16rem]">{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex min-h-11 items-center justify-end underline-offset-4 hover:underline">{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
            <a href={CONTACT.maps} target="_blank" rel="noreferrer" aria-label="Open our studio in Google Maps" className="group relative mt-8 block aspect-[4/3] overflow-hidden bg-sand">
              <iframe title="Map showing The Furn studio in Pal Gam, Surat" loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1}
                src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&z=15&output=embed`} className="pointer-events-none h-full w-full border-0 grayscale-[35%]" />
              <span className="absolute right-4 bottom-4 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ivory transition-colors group-hover:bg-brass group-hover:text-ink">Open in Google Maps ↗</span>
            </a>
          </Reveal>
          <Reveal delay={0.15} className="order-1 lg:order-none"><Trust /><Form /></Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
