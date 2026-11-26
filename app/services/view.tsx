import Link from "next/link";
import { SmoothScroll, Reveal, SplitText, ScrollWords, RollText, WideningImage, BlurIn } from "../fx";
import { img, STATS } from "../content/site";
import { services } from "../content/services";
import { Label, Heading, Arrow, Nav, Cta, Footer, ArrowIcon, PageHero } from "../ui";
import { Pic } from "../pic";

import type { Service } from "../content/types";
import { WhyUs, Options } from "./parts";
import { StatsRow } from "../stats";

// Card: photo zooms on hover and a scrolling "Explore" strip slides across it (primedecor + lunarch)
function ServiceCard({ s, i }: { s: Service; i: number }) {
  return (
    <Link href={`/services/${s.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <Pic src={img(s.i, 1400)} alt={s.t} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
        <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 scale-y-0 overflow-hidden bg-ivory py-3 text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100">
          <div className="flex w-max animate-marquee gap-8 text-sm font-semibold tracking-[0.15em] whitespace-nowrap uppercase">
            {Array.from({ length: 12 }, (_, k) => <span key={k}>Explore {s.t} <span className="text-brass">↗</span></span>)}
          </div>
        </div>
        <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-ivory/90 text-ink backdrop-blur transition-transform duration-500 group-hover:rotate-45">
          <ArrowIcon />
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">{s.t}</h3>
        <span className="text-sm font-semibold text-ink/65">({String(i + 1).padStart(2, "0")})</span>
      </div>
      <p className="mt-2 max-w-md text-lg text-ink/70">{s.short}</p>
    </Link>
  );
}

export function ServicesView() {
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Hero: big split title + stats row (primedecor) */}
      <section className="px-5 pt-40 pb-20 md:px-12 md:pt-48">
        
        <PageHero label="Our Services" lines={["Tailored furniture", "for every room"]} />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <BlurIn delay={0.45}><p className="max-w-lg text-lg text-ink/70">From the kitchen to the wardrobe, every piece is designed in-house and built to your exact measurements, with one team taking you from first sketch to handover.</p></BlurIn>
          <BlurIn delay={0.6}>
            <a href="#contact" className="btn-fill btn-fill-brass group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>Book a consultation</RollText><Arrow /></a>
          </BlurIn>
        </div>
        <div className="mt-20">
          <StatsRow stats={[
            { n: STATS.years, s: "+", t: "Years of design & build experience", href: "/studio" },
            { n: STATS.homes, s: "+", t: "Homes delivered across India", href: "/works" },
            { n: STATS.cities.length, s: "", t: "Cities served by our own install teams", href: "/contact" },
            { n: STATS.warrantyYears, s: " yr", t: "Hardware warranty on every project", href: "/process" },
          ]} />
        </div>
      </section>

      {/* Services grid */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.15} className={i % 2 ? "md:mt-28" : ""}>
              <ServiceCard s={s} i={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <WhyUs />
      <Cta />
      <Footer />
    </main>
  );
}

// Detail page pieces ------------------------------------------------------

export function ServiceDetailView({ s }: { s: Service }) {
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  return (
    <main>
      <SmoothScroll />
      <Nav light />

      {/* Hero: breadcrumb, title, actions (lunarch) */}
      <section className="px-5 pt-36 pb-16 md:px-12 md:pt-44">
        <BlurIn>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink/65">
            <Link href="/services" className="inline-flex min-h-11 items-center hover:text-ink">Services</Link><span>/</span><span className="text-ink">{s.t}</span>
          </nav>
        </BlurIn>
        <h1 className="mt-6 text-[14vw] leading-[0.9] font-bold tracking-[-0.04em] md:text-[9vw]"><SplitText text={s.t} /></h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <BlurIn delay={0.4}>
            <p className="max-w-lg text-lg text-ink/70">{s.short}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => <span key={t} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm">{t}</span>)}
            </div>
          </BlurIn>
          <BlurIn delay={0.55}>
            <a href="#contact" className="btn-fill btn-fill-brass group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold text-ivory"><RollText>Get a free quote</RollText><Arrow /></a>
          </BlurIn>
        </div>
      </section>

      <WideningImage src={img(s.i, 2400)} alt={s.t} />

      {/* Overview article: heading pins while the copy scrolls */}
      <section className="px-5 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="md:sticky md:top-32 md:self-start">
            
            <Label>Overview</Label>
            <Heading text="Designed around" accent="everyday living" />
          </div>
          <div>
            <ScrollWords className="text-2xl leading-snug font-medium tracking-tight md:text-4xl" text={s.intro[0]} />
            <Reveal><p className="mt-8 text-lg text-ink/70">{s.intro[1]}</p></Reveal>
            {s.sections.map((sec) => (
              <Reveal key={sec.h} className="mt-16 border-t border-ink/15 pt-10">
                <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">{sec.h}</h3>
                {sec.p.map((para) => <p key={para} className="mt-4 text-lg text-ink/70">{para}</p>)}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-ink px-5 py-24 text-ivory md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div><Label dark>Deliverables</Label><Heading text="What you" accent="get" dark /></div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {s.deliverables.map((d, i) => (
              <li key={d} className="border-b border-ivory/15">
                <Reveal delay={i * 0.06} className="flex items-start gap-4 py-5">
                  <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass text-xs">✓</span>
                  <span className="text-lg">{d}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Options */}
      <section className="mt-3 bg-sand px-5 py-24 md:px-12 md:py-32">
        
        <Label>Styles & options</Label>
        <Heading text="Choose what" accent="fits your space" />
        <Options s={s} />
      </section>

      {/* Process: numbered grid (lunarch) */}
      <section className="px-5 py-24 md:px-12 md:py-32">
        
        <Label>Our process</Label>
        <Heading text="A clear path from" accent="idea to install" />
        <div className="mt-16 grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {s.process.map((p, i) => (
            <Reveal key={p.t} delay={(i % 3) * 0.1} className="bg-ivory p-8 md:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-brass text-sm font-semibold text-brass">0{i + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-3 text-lg text-ink/70">{p.d}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="flex flex-col justify-between bg-brass p-8 text-ivory md:p-10">
            <p className="text-2xl font-semibold tracking-tight">Ready to start?</p>
            <a href="#contact" className="group mt-8 inline-flex items-center gap-3 font-semibold"><RollText>Book a site visit</RollText><Arrow /></a>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label>Explore more</Label><Heading text="Other" accent="services" /></div>
          <Reveal><Link href="/services" className="btn-fill btn-fill-brass group flex items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-ivory"><RollText>All services</RollText><Arrow /></Link></Reveal>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {others.map((o) => (
            <Reveal key={o.slug} delay={0.1}>
              <ServiceCard s={o} i={services.indexOf(o)} />
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
