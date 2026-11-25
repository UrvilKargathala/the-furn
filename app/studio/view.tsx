import Link from "next/link";
import { SmoothScroll, Reveal, SplitText, ScrollWords, RollText, HeroGrow, BlurIn } from "../fx";
import { img, MEDIA } from "../content/site";
import { Label, Heading, Arrow, Nav, Footer } from "../ui";
import { Pic } from "../pic";
import { HomesStat, CraftStats, CitiesMap, Journey, FinalCta } from "./parts";
import { StudioTestimonials } from "./testimonials";

const principles = [
  { t: "Made to measure", d: "No catalogue sizes. Every module is drawn for your wall, your ceiling and your appliances." },
  { t: "Honest pricing", d: "An itemised quote you sign off before production, with no surprise add-ons at handover." },
  { t: "Precision-built", d: "Every module is cut, edge-banded and assembled on German machinery for a precise, lasting finish." },
  { t: "Here after handover", d: "A 15-year hardware warranty and a team that picks up the phone when you call." },
];

const brands = [
  { n: "Blum", f: "blum" },
  { n: "Kesseböhmer", f: "kessebohmer" },
  { n: "Hettich", f: "hettich" },
  { n: "Häfele", f: "hafele" },
  { n: "Grass", f: "grass" },
  { n: "Higold", f: "higold" },
  { n: "Fenix", f: "fenix" },
  { n: "Rehau", f: "rehau" },
];

export function StudioView() {
  return (
    <main>
      <SmoothScroll />
      <Nav />

      {/* Full-screen hero: a film of our own studio behind the same heading and copy */}
      <section className="relative h-svh overflow-hidden bg-ink text-ivory">
        <HeroGrow>
          <video src={`${MEDIA}/hero/studio.mp4`} poster="/works/studio-furn/cover.webp" autoPlay muted loop playsInline preload="auto"
            className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/40" />
        </HeroGrow>
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-12 md:px-12 md:pb-16">
          
          <BlurIn delay={0.9}><Label dark>Our Studio</Label></BlurIn>
          <h1 className="mt-6 text-[12vw] leading-[0.92] font-bold tracking-[-0.04em] md:text-[6.5vw]">
            <span className="block"><SplitText text="Crafting homes" delay={1} /></span>
            <span className="block text-stone"><SplitText text="that fit your life" delay={1.2} /></span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <BlurIn delay={1.45}>
              <p className="max-w-md text-lg text-ivory/80">The Furn is a design-and-build studio for modular kitchens, wardrobes and complete interiors, with precision manufacturing on German machinery and our own install teams.</p>
            </BlurIn>
            <BlurIn delay={1.6}>
              <Link href="/works" className="btn-fill btn-fill-brass group inline-flex items-center gap-3 rounded-full bg-ivory py-2 pr-2 pl-6 font-semibold text-ink"><RollText>View our work</RollText><Arrow /></Link>
            </BlurIn>
          </div>
        </div>
      </section>

      {/* Who we are (primedecor) */}
      <section className="px-5 py-24 md:px-12 md:py-36">
        <div className="grid gap-10 md:grid-cols-[1fr_2.4fr]">
          <div className="space-y-6 text-sm">
            
            <Label>Who we are</Label>
            <Reveal><p className="text-ink/60">Based in</p><p className="font-semibold">Surat, India</p></Reveal>
            <Reveal delay={0.1}><p className="text-ink/60">Since</p><p className="font-semibold">2021 – Present</p></Reveal>
          </div>
          <div>
            <ScrollWords className="text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
              text="We believe a home should be felt, not just seen. With over 20 years of experience, we've helped families build kitchens they love cooking in, wardrobes that hold everything, and rooms that balance beauty with real life. No showroom sizes, no shortcuts, no compromise." />
            <Reveal><Link href="/works" className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold"><RollText>See all projects</RollText><span className="transition-transform duration-500 group-hover:translate-x-1">→</span></Link></Reveal>
          </div>
        </div>
      </section>

      <HomesStat />
      <CraftStats />
      <CitiesMap />

      {/* Mission & vision (lunarch / raumora) */}
      <section className="px-5 py-24 md:px-12 md:py-32">
        
        <Label>Our foundation</Label>
        <Heading text="What drives" accent="every project" />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { h: "Our mission", p: "To design and build furniture that fits each home perfectly, with honest pricing, in-house quality and a team that stays with you long after handover.", i: "/works/serene-wardrobe/02.jpg", alt: "Made-to-measure wardrobe with fitted shelves, drawers and lighting" },
            { h: "Our vision", p: "To make made-to-measure interiors the norm, not a luxury, so every family can live in a home designed around them.", i: "/works/greenopolish/03.jpg", alt: "Double-height family living room designed by The Furn" },
          ].map((c, k) => (
            <Reveal key={c.h} delay={k * 0.15} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden bg-sand">
                <div className="aspect-[16/10] overflow-hidden">
                  <Pic src={img(c.i, 1400)} alt={c.alt} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                </div>
                <div className="flex-1 p-8 md:p-10">
                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{c.h}</h3>
                  <p className="mt-4 text-lg text-ink/70">{c.p}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles (prismae) */}
      <section className="bg-ink px-5 py-24 text-ivory md:px-12 md:py-32">
        
        <Label dark>Principles</Label>
        <Heading text="The ideas that shape" accent="every space" dark />
        <div className="mt-16 grid gap-px overflow-hidden bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.1} className="group bg-ink p-8 transition-colors duration-500 hover:bg-walnut md:p-10">
              <span className="text-sm font-semibold text-brass">0{i + 1}</span>
              <h3 className="mt-12 text-2xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-3 text-ivory/70">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Hardware and material brands we build with */}
      <section className="px-5 py-24 md:px-12 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Label>Our partners</Label>
            <Heading text="Brands we" accent="build with" />
          </div>
          <Reveal><p className="max-w-sm text-lg text-ink/70">Fittings, hardware and finishes from names we trust, so every drawer, hinge and surface lasts as long as the design.</p></Reveal>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden bg-ink/10 md:grid-cols-4">
          {brands.map((b, i) => (
            <Reveal key={b.n} delay={(i % 4) * 0.08} className="group flex aspect-[3/2] items-center justify-center bg-white p-8 md:p-12">
              <Pic src={`/brands/${b.f}.png`} alt={`${b.n} logo`} width={400} height={200} sizes="(min-width: 768px) 25vw, 50vw"
                className="h-16 w-full max-w-[200px] object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 md:h-20 md:max-w-[220px]" />
            </Reveal>
          ))}
        </div>
      </section>

      <StudioTestimonials />

      {/* Journey timeline (lunarch) */}
      <section className="px-5 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div className="md:sticky md:top-32 md:self-start">
            
            <Label>Our journey</Label>
            <Heading text="Moments that" accent="shaped us" />
          </div>
          <Journey />
        </div>
      </section>

      <FinalCta />
      <Footer />
    </main>
  );
}
