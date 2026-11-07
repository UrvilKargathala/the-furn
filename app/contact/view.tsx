import { SmoothScroll, Reveal, ease, Appear } from "../fx";
import { CONTACT } from "../content/site";
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

// Reassurance right above the form. TODO: put the real warranty length here once confirmed (e.g. "10-year warranty").
const trust: [string, string][] = [
  ["We reply within 24 hours", "A real person calls you back, Monday to Saturday."],
  ["Written warranty", "Every module is covered, with care guidance at handover."],
  ["Surat and across Gujarat", "Free site visit and measurement in our service area."],
];

function Trust() {
  return (
    <ul className="mb-10 grid gap-2 sm:mb-12 sm:grid-cols-3 sm:gap-3">
      {trust.map(([t, d]) => (
        <li key={t} className="sm:bg-sand/60 sm:p-4">
          <span className="flex items-center gap-2 text-sm font-semibold sm:text-base"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brass text-[11px] text-ink">✓</span>{t}</span>
          <span className="mt-1 hidden text-sm text-ink/60 sm:block">{d}</span>
        </li>
      ))}
    </ul>
  );
}

export function ContactView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Photo first: one of our own projects behind the heading */}
      <section className="relative h-[56svh] overflow-hidden bg-ink text-ivory md:h-[80svh]">
        <Appear className="absolute inset-0" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }}>
          <Pic preload src="/works/avadh-ayuska/02.jpg" alt="Living room designed and built by The Furn" className="h-full w-full object-cover" />
        </Appear>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45" />
        <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-12 md:p-12 md:pb-16">
          
          <PageHero label="Contact us" lines={["Let's talk about", "your space."]} dark />
          <JumpTo target="enquiry" className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink md:hidden">Fill the form <span aria-hidden>↓</span></JumpTo>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-20 px-5 py-14 md:px-12 md:py-28">
        <div className="grid gap-16 md:grid-cols-[1fr_1.7fr] md:gap-20">
          <Reveal className="order-2 md:order-none">
            <p className="max-w-sm text-lg text-ink/70">Tell us about your home and your budget. We&apos;ll call you to plan a free site visit, then measure, design and quote with no obligation.</p>
            <dl className="mt-12">
              {info.map(([k, v, href]) => (
                <div key={k} className="flex justify-between gap-6 border-t border-ink/15 py-5">
                  <dt className="text-ink/50">{k}</dt>
                  <dd className="max-w-[16rem] text-right font-semibold">{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="underline-offset-4 hover:underline">{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.15} className="order-1 md:order-none"><Trust /><Form /></Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
