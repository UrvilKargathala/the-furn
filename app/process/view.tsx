import Link from "next/link";
import { SmoothScroll, Reveal, RollText, BlurIn } from "../fx";
import { processDetail } from "../content/services";
import { ProcessAccordion } from "./accordion";
import { Label, Heading, Arrow, Nav, Cta, Footer, PageHero } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProcessView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      <section className="px-5 pt-40 pb-16 md:px-12 md:pt-48">
        <PageHero label="Our process" lines={["From first sketch", "to final handover"]} />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <BlurIn delay={0.45}><p className="max-w-lg text-lg text-ink/70">Five clear steps, one team the whole way. You always know what happens next, what it costs and when your room will be ready.</p></BlurIn>
          <BlurIn delay={0.6}>
            <Link href="/contact" className="btn-fill btn-fill-brass group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>Book a site visit</RollText><Arrow /></Link>
          </BlurIn>
        </div>

        {/* Step index: jump to any step */}
        <BlurIn delay={0.75}>
          <ol className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-5">
            {processDetail.map((st, i) => (
              <li key={st.t} className={i === processDetail.length - 1 ? "col-span-2 md:col-span-1" : ""}>
                <a href={`#step-${i + 1}`} className="group flex h-full flex-col justify-between gap-6 bg-ivory p-5 transition-colors duration-500 hover:bg-ink hover:text-ivory">
                  <span className="text-sm font-semibold text-brass">{pad(i + 1)}</span>
                  <span className="text-base font-semibold leading-snug md:text-lg">{st.t}</span>
                </a>
              </li>
            ))}
          </ol>
        </BlurIn>
      </section>

      <ProcessAccordion />

      {/* What stays the same at every step */}
      <section className="bg-ink px-5 py-24 text-ivory md:px-12 md:py-32">
        <Label dark>Our promise</Label>
        <Heading text="One team," accent="start to finish" dark />
        <div className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-3">
          {[
            ["Designed in-house", "The people who measure your room are the people who design it."],
            ["Built on German machinery", "Every module is cut, edge-banded and assembled with high precision and a clean finish."],
            ["Installed by our own team", "No subcontractors on site. We align, clean up and hand over ourselves."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1} className="bg-ink p-8 md:p-10">
              <span className="text-sm font-semibold text-brass">{pad(i + 1)}</span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{t}</h3>
              <p className="mt-3 text-ivory/65">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
