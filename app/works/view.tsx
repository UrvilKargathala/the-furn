import Link from "next/link";
import { SmoothScroll, Reveal, SplitText, ScrollWords, RollText, WideningImage, BlurIn } from "../fx";
import { projects } from "../content/projects";
import { Label, Heading, Arrow, Nav, Cta, Footer, ArrowIcon, PageHero, EnquiryBand } from "../ui";
import { Pic } from "../pic";

import type { Project } from "../content/types";
import { Spotlight, ProjectVideo, WorksFilter, ProjectGallery } from "./parts";

export function WorksView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      <section className="px-5 pt-40 pb-14 md:px-12 md:pt-48">
        
        <PageHero label="Our Works" lines={["Homes we've", "brought to life"]} />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <BlurIn delay={0.45}><p className="max-w-lg text-lg text-ink/70">Kitchens, wardrobes and complete homes across India, each one designed around the family that lives in it.</p></BlurIn>
          <BlurIn delay={0.6}><p className="text-sm font-semibold tracking-[0.2em] text-ink/65 uppercase">{String(projects.length).padStart(2, "0")} projects</p></BlurIn>
        </div>
      </section>

      <WorksFilter />
      <EnquiryBand title="Planning your own space?" text="Tell us about your home and we'll visit, measure and give you a fixed quote." />

      <section>
        <div className="px-5 pb-14 md:px-12"><Label>Spotlight</Label><Heading text="Stories worth" accent="a closer look" /></div>
        {projects.slice(0, 2).map((p) => <Spotlight key={p.slug} p={p} />)}
      </section>

      <Cta />
      <Footer />
    </main>
  );
}

// Detail page pieces ------------------------------------------------------

export function WorkDetailView({ p }: { p: Project }) {
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const meta = [["Category", p.c], ["Service", p.service], ["Year", p.y], ["Location", p.l && `${p.l}, India`], ["Area", p.area], ["Timeline", p.days]].filter(([, v]) => v);
  const story = [["Overview", p.overview], ["The challenge", p.challenge], ["Our solution", p.solution]].filter(([, v]) => v);
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Title + tagline (primedecor) and spec table (homespaceid) */}
      <section className="px-5 pt-36 pb-16 md:px-12 md:pt-44">
        <BlurIn>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink/65">
            <Link href="/works" className="inline-flex min-h-11 items-center hover:text-ink">Works</Link><span>/</span><span className="text-ink">{p.n}</span>
          </nav>
        </BlurIn>
        <div className="mt-6 grid items-end gap-8 md:grid-cols-[1.5fr_1fr]">
          <h1 className="text-[15vw] leading-[0.88] font-bold tracking-[-0.04em] md:text-[9vw]"><SplitText text={p.n} /></h1>
          <BlurIn delay={0.4}><p className="max-w-md text-lg text-ink/70 md:pb-4">{p.d}</p></BlurIn>
        </div>
        <dl className="mt-16 grid grid-cols-2 md:grid-cols-6">
          {meta.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06} className="border-t border-ink/15 py-5 pr-4">
              <dt className="text-sm text-ink/65">{k}</dt>
              <dd className="mt-1 text-lg font-semibold">{v}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <WideningImage src={p.i} alt={p.n} />

      {p.video && <ProjectVideo p={p} />}

      {/* Story: label pins on the left while the copy scrolls */}
      {story.length > 0 && <section className="px-5 py-24 md:px-12 md:py-32">
        {story.map(([k, v], i) => (
          <div key={k} className="grid gap-6 border-t border-ink/15 py-12 md:grid-cols-[1fr_2fr] md:py-16">
            <div className="md:sticky md:top-32 md:self-start">
              <span className="text-sm font-semibold text-brass">0{i + 1}</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{k}</h2>
            </div>
            {i === 0
              ? <ScrollWords className="text-2xl leading-snug font-medium tracking-tight md:text-4xl" text={v} />
              : <Reveal><p className="text-xl leading-relaxed text-ink/75 md:text-2xl">{v}</p></Reveal>}
          </div>
        ))}
      </section>}

      {/* Key features */}
      {p.features.length > 0 && <section className="bg-ink px-5 py-24 text-ivory md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div><Label dark>Key features</Label><Heading text="What makes" accent="it work" dark /></div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {p.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.08}>
                <li className="flex h-full flex-col justify-between gap-10 border border-ivory/15 p-6">
                  <span className="text-sm text-brass">0{i + 1}</span>
                  <span className="text-xl font-medium">{f}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>}

      <ProjectGallery p={p} />

      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="grid gap-12 md:grid-cols-2">
          {(p.credits.length > 0 || p.insta) && <Reveal>
            <Label>Credits</Label>
            <dl className="mt-8">
              {p.credits.map((c) => (
                <div key={c.r} className="flex justify-between gap-6 border-t border-ink/15 py-5">
                  <dt className="text-ink/65">{c.r}</dt><dd className="text-lg font-semibold">{c.n}</dd>
                </div>
              ))}
              {p.insta && <div className="flex justify-between gap-6 border-t border-ink/15 py-5">
                <dt className="text-ink/65">See more</dt>
                <dd><a href={p.insta} target="_blank" rel="noreferrer" className="group inline-flex min-h-11 items-center gap-2 text-lg font-semibold"><RollText>Instagram</RollText><ArrowIcon /></a></dd>
              </div>}
            </dl>
          </Reveal>}
          {/* The outcome, with the client's words when we have them */}
          {(p.result || p.quote.t) && (
            <Reveal delay={0.15}>
              {p.result && <><Label>The result</Label><p className="mt-8 mb-8 text-2xl leading-snug font-medium tracking-tight md:text-3xl">{p.result}</p></>}
              {p.quote.t && <blockquote className="bg-sand p-8 md:p-10">
                <span className="text-5xl leading-none text-brass">“</span>
                <p className="mt-2 text-2xl leading-snug font-medium">{p.quote.t}</p>
                <footer className="mt-6 text-sm text-ink/65">{p.quote.by}</footer>
              </blockquote>}
            </Reveal>
          )}
        </div>
      </section>

      <EnquiryBand title="Want something like this?" text={`We can design and build a space like ${p.n} around your home, your storage and your budget.`} />

      {/* Next project */}
      <Link href={`/works/${next.slug}`} data-cursor="Next" className="group relative flex h-[80svh] flex-col justify-end overflow-hidden bg-ink px-5 py-10 text-ivory md:px-12 md:py-12">
        <Pic src={next.i} alt={next.n} className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="relative flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-ivory/70 uppercase">Next project</p>
            <h2 className="mt-3 text-5xl font-bold tracking-tight md:text-8xl"><SplitText text={next.n} /></h2>
          </div>
          <Arrow className="h-14 w-14" />
        </div>
      </Link>

      <Cta />
      <Footer />
    </main>
  );
}
