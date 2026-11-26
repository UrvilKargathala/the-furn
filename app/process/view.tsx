import Link from "next/link";
import { SmoothScroll, Reveal, SplitText, RollText, ParallaxImg, BlurIn } from "../fx";
import { processDetail } from "../content/services";
import { Label, Heading, Arrow, Nav, Cta, Footer, PageHero } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

// One step: big number, what happens, what you leave with; photo alternates sides
function StepRow({ st, i }: { st: (typeof processDetail)[number]; i: number }) {
  const flip = i % 2 === 1;
  return (
    <section id={`step-${i + 1}`} className="scroll-mt-24 border-t border-ink/15 py-16 md:py-28">
      <div className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <Reveal>
            <p className="flex items-baseline gap-4">
              <span className="text-7xl leading-none font-bold tracking-tighter text-brass md:text-9xl">{pad(i + 1)}</span>
              <span className="text-sm font-semibold text-ink/65">of {pad(processDetail.length)}</span>
            </p>
          </Reveal>
          <h2 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl"><SplitText text={st.t} /></h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg text-ink/70">{st.d}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {st.tags.map((t) => <li key={t} className="rounded-full bg-sand px-4 py-2 text-sm font-medium">{t}</li>)}
            </ul>
            <div className="mt-10 flex items-start gap-4 border-l-2 border-brass pl-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-ink/65 uppercase">You get</p>
                <p className="mt-1 text-lg font-semibold">{st.out}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <ParallaxImg src={st.i} alt={st.t} quality={90} className="aspect-[4/5] w-full md:aspect-[4/5]" />
      </div>
    </section>
  );
}

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

      <div className="px-5 md:px-12">
        {processDetail.map((st, i) => <StepRow key={st.t} st={st} i={i} />)}
      </div>

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
