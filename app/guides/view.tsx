import Link from "next/link";
import { SmoothScroll, Reveal, RollText, WideningImage, BlurIn } from "../fx";
import { guides } from "../content/guides";
import { getProject } from "../content/projects";
import { getService } from "../content/services";
import { Label, Heading, Nav, Cta, Footer, ArrowIcon, PageHero } from "../ui";
import { Pic } from "../pic";
import { Faqs } from "../services/parts";
import type { Guide } from "../content/types";

const date = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const photoOf = (g: Guide) => getProject(g.photo)?.i ?? "/works/globcon/11.jpg";
const idOf = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Card: photo zooms on hover, read time and title below
function GuideCard({ g, i }: { g: Guide; i: number }) {
  return (
    <Link href={`/guides/${g.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <Pic src={photoOf(g)} alt={g.t} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
        <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-ivory/90 text-ink backdrop-blur transition-transform duration-500 group-hover:rotate-45">
          <ArrowIcon />
        </span>
      </div>
      <p className="mt-5 text-sm font-semibold tracking-[0.15em] text-ink/65 uppercase">{String(i + 1).padStart(2, "0")} · {g.read} min read</p>
      <h2 className="mt-2 text-2xl leading-tight font-semibold tracking-tight md:text-3xl">{g.t}</h2>
      <p className="mt-3 max-w-md text-lg text-ink/70">{g.short}</p>
    </Link>
  );
}

export function GuidesView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />
      <section className="px-5 pt-40 pb-16 md:px-12 md:pt-48">
        <PageHero label="Guides" lines={["Know before", "you build."]} />
        <BlurIn delay={0.4}>
          <p className="mt-10 max-w-xl text-lg text-ink/70">Straight answers to the questions we hear most, from choosing a kitchen layout to planning a wardrobe, written by the team that designs and builds them in Surat.</p>
        </BlurIn>
      </section>
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 3) * 0.1}><GuideCard g={g} i={i} /></Reveal>
          ))}
        </div>
      </section>
      <Cta />
      <Footer />
    </main>
  );
}

export function GuideView({ g }: { g: Guide }) {
  const others = guides.filter((o) => o.slug !== g.slug).slice(0, 3);
  const work = g.projects.map(getProject).filter((p) => p !== undefined);
  const serviceLinks = g.services.map(getService).filter((s) => s !== undefined);
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Hero: breadcrumb, title, read time */}
      <section className="px-5 pt-36 pb-16 md:px-12 md:pt-44">
        <BlurIn>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink/65">
            <Link href="/guides" className="inline-flex min-h-11 items-center hover:text-ink">Guides</Link><span>/</span><span className="line-clamp-1 text-ink">{g.t}</span>
          </nav>
        </BlurIn>
        <BlurIn delay={0.1}>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[1] font-bold tracking-[-0.03em] md:text-7xl lg:text-8xl">{g.t}</h1>
        </BlurIn>
        <BlurIn delay={0.3}>
          <p className="mt-8 max-w-2xl text-xl text-ink/70">{g.short}</p>
          <p className="mt-6 text-sm font-semibold tracking-[0.15em] text-ink/65 uppercase">{g.read} min read · Updated <time dateTime={g.updated}>{date(g.updated)}</time> · By The Furn</p>
        </BlurIn>
      </section>

      <WideningImage src={photoOf(g)} alt={getProject(g.photo)?.n ? `${getProject(g.photo)?.n} by The Furn` : g.t} />

      {/* Article: contents pin on the left while the text scrolls */}
      <section className="px-5 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <Label>In this guide</Label>
            <ol className="mt-6 space-y-1 border-l border-ink/15">
              {g.sections.map((s) => (
                <li key={s.h}><a href={`#${idOf(s.h)}`} className="-ml-px inline-flex min-h-11 items-center border-l border-transparent pl-4 text-ink/70 hover:border-brass hover:text-ink">{s.h}</a></li>
              ))}
            </ol>
          </aside>
          <article className="max-w-3xl">
            {/* The direct answer comes first: it's what readers and AI assistants want */}
            <Reveal className="bg-sand p-7 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] text-brass uppercase">The short answer</p>
              <p className="mt-4 text-xl leading-relaxed font-medium tracking-tight md:text-2xl">{g.answer}</p>
            </Reveal>
            {g.sections.map((s) => (
              <Reveal key={s.h} className="mt-16 scroll-mt-28 border-t border-ink/15 pt-10">
                <h2 id={idOf(s.h)} className="scroll-mt-28 text-3xl font-semibold tracking-tight md:text-4xl">{s.h}</h2>
                {s.p.map((para) => <p key={para} className="mt-5 text-lg leading-relaxed text-ink/75">{para}</p>)}
                {s.list && (
                  <ul className="mt-6 space-y-3">
                    {s.list.map((li) => (
                      <li key={li} className="flex items-start gap-3 text-lg text-ink/80"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" /><span>{li}</span></li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
            {serviceLinks.length > 0 && (
              <Reveal className="mt-16 flex flex-wrap items-center gap-3 border-t border-ink/15 pt-10">
                <span className="mr-2 text-sm font-semibold tracking-[0.15em] text-ink/65 uppercase">Related services</span>
                {serviceLinks.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="btn-fill btn-fill-ink group flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-semibold hover:text-ivory"><RollText>{s.t}</RollText><span aria-hidden className="text-brass">↗</span></Link>
                ))}
              </Reveal>
            )}
          </article>
        </div>
      </section>

      {/* Real projects that show the advice in practice */}
      {work.length > 0 && (
        <section className="bg-sand px-5 py-24 md:px-12 md:py-32">
          <Label>See it in our work</Label>
          <Heading text="Homes we've" accent="designed and built" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {work.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/works/${p.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-ink">
                    <Pic src={p.i} alt={`${p.n} by The Furn`} sizes="(min-width: 1024px) 25vw, 50vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                  </div>
                  <p className="mt-4 text-xl font-semibold tracking-tight">{p.n}</p>
                  <p className="text-ink/65">{p.c}{p.l ? `, ${p.l}` : ""}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="pt-24 md:pt-32"><Faqs name="this guide" faqs={g.faqs} /></div>

      {/* More guides */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label>Keep reading</Label><Heading text="More" accent="guides" /></div>
          <Reveal><Link href="/guides" className="btn-fill btn-fill-brass group flex items-center gap-3 rounded-full bg-ink py-3 px-6 text-sm font-semibold text-ivory"><RollText>All guides</RollText></Link></Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {others.map((o) => <Reveal key={o.slug} delay={0.1}><GuideCard g={o} i={guides.indexOf(o)} /></Reveal>)}
        </div>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
