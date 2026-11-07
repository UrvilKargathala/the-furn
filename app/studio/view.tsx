import Link from "next/link";
import { SmoothScroll, Reveal, SplitText, ScrollWords, RollText, ease, Appear } from "../fx";
import { img, MEDIA } from "../content/site";
import { Label, Heading, Arrow, Nav, Footer } from "../ui";
import { Pic } from "../pic";
import { Numbers, Journey, FinalCta } from "./parts";

const principles = [
  { t: "Made to measure", d: "No catalogue sizes. Every module is drawn for your wall, your ceiling and your appliances." },
  { t: "Honest pricing", d: "An itemised quote you sign off before production, with no surprise add-ons at handover." },
  { t: "Built in-house", d: "Our own workshop cuts, edges and assembles every module, so quality never leaves our hands." },
  { t: "Here after handover", d: "A 10-year hardware warranty and a team that picks up the phone when you call." },
];

const team = [
  { n: "Arjun Mehta", r: "Founder & Design Lead", i: "1500648767791-00dcc994a43e" },
  { n: "Riya Shah", r: "Head of Interiors", i: "1494790108377-be9c29b29330" },
  { n: "Karan Patel", r: "Production Manager", i: "1506794778202-cad84cf45f1d" },
  { n: "Neha Desai", r: "Client Experience", i: "1544005313-94ddf0286df2" },
];

const awards = [
  { y: "2026", t: "Best Modular Kitchen Studio", o: "Gujarat Interior Awards" },
  { y: "2025", t: "Excellence in Residential Design", o: "Home & Design Trends" },
  { y: "2024", t: "Top 10 Interior Brands, Gujarat", o: "Interior Today" },
  { y: "2023", t: "Craftsmanship Award", o: "Indian Furniture Council" },
];

export function StudioView() {
  return (
    <main>
      <SmoothScroll />
      <Nav />

      {/* Full-screen hero: a film of our own studio behind the same heading and copy */}
      <section className="relative h-svh overflow-hidden bg-ink text-ivory">
        <Appear className="absolute inset-0" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }}>
          <video src={`${MEDIA}/hero/studio.mp4`} poster="/works/studio-furn/cover.webp" autoPlay muted loop playsInline preload="auto"
            className="absolute inset-0 h-full w-full object-cover" />
        </Appear>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/40" />
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-12 md:px-12 md:pb-16">
          
          <Label dark>Our Studio</Label>
          <h1 className="mt-6 text-[12vw] leading-[0.92] font-bold tracking-[-0.04em] md:text-[6.5vw]">
            <span className="block"><SplitText text="Crafting homes" /></span>
            <span className="block text-stone"><SplitText text="that fit your life" delay={0.2} /></span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <Appear initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.4 }}>
              <p className="max-w-md text-lg text-ivory/80">The Furn is a design-and-build studio for modular kitchens, wardrobes and complete interiors, with our own workshop and our own install teams.</p>
            </Appear>
            <Appear initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.55 }}>
              <Link href="/works" className="group inline-flex items-center gap-3 rounded-full bg-ivory py-2 pr-2 pl-6 font-semibold text-ink"><RollText>View our work</RollText><Arrow /></Link>
            </Appear>
          </div>
        </div>
      </section>

      {/* Who we are (primedecor) */}
      <section className="px-5 py-24 md:px-12 md:py-36">
        <div className="grid gap-10 md:grid-cols-[1fr_2.4fr]">
          <div className="space-y-6 text-sm">
            
            <Label>Who we are</Label>
            <Reveal><p className="text-ink/50">Based in</p><p className="font-semibold">Surat, India</p></Reveal>
            <Reveal delay={0.1}><p className="text-ink/50">Since</p><p className="font-semibold">2014 – Present</p></Reveal>
          </div>
          <div>
            <ScrollWords className="text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
              text="We believe a home should be felt, not just seen. For over a decade we've helped families build kitchens they love cooking in, wardrobes that hold everything, and rooms that balance beauty with real life. No showroom sizes, no shortcuts, no compromise." />
            <Reveal><Link href="/works" className="group mt-10 inline-flex items-center gap-2 font-semibold"><RollText>See all projects</RollText><span className="transition-transform duration-500 group-hover:translate-x-1">→</span></Link></Reveal>
          </div>
        </div>
      </section>

      <Numbers />

      {/* Mission & vision (lunarch / raumora) */}
      <section className="px-5 py-28 md:px-12">
        
        <Label>Our foundation</Label>
        <Heading text="What drives" accent="every project" />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { h: "Our mission", p: "To design and build furniture that fits each home perfectly, with honest pricing, in-house quality and a team that stays with you long after handover.", i: "1556911220-bff31c812dba" },
            { h: "Our vision", p: "To make made-to-measure interiors the norm, not a luxury, so every family can live in a home designed around them.", i: "1618221195710-dd6b41faaea6" },
          ].map((c, k) => (
            <Reveal key={c.h} delay={k * 0.15}>
              <article className="group overflow-hidden bg-sand">
                <div className="aspect-[16/10] overflow-hidden">
                  <Pic src={img(c.i, 1400)} alt="" sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                </div>
                <div className="p-8 md:p-10">
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

      {/* Journey timeline (lunarch) */}
      <section className="px-5 py-28 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div className="md:sticky md:top-32 md:self-start">
            
            <Label>Our journey</Label>
            <Heading text="Moments that" accent="shaped us" />
          </div>
          <Journey />
        </div>
      </section>

      {/* Team (stux / raumora): photos warm up from greyscale on hover */}
      <section className="px-5 pb-28 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label>The team</Label><Heading text="The people" accent="behind every space" /></div>
          <Reveal><p className="max-w-xs text-ink/70">Designers, makers and fitters who care about the last millimetre as much as you do.</p></Reveal>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {team.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.1} className={i % 2 ? "md:mt-16" : ""}>
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden bg-sand">
                  <Pic src={img(m.i, 800)} alt={m.n} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <h3 className="mt-4 text-lg font-semibold md:text-xl">{m.n}</h3>
                <p className="text-sm text-ink/60">{m.r}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Awards (stux): rows fill with colour on hover */}
      <section className="px-5 pb-28 md:px-12">
        
        <Label>Recognition</Label>
        <Heading text="Honoured for" accent="our craft" />
        <ul className="mt-14 border-t border-ink/15">
          {awards.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.06}>
              <li className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b border-ink/15 px-2 py-6 md:grid-cols-[8rem_1fr_1fr_3rem] md:gap-8 md:px-4 md:py-8">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-sand transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                <span className="relative w-fit rounded-full bg-brass px-3 py-1 text-xs font-semibold text-ivory">{a.y}</span>
                <span className="relative text-xl font-semibold tracking-tight md:text-3xl">{a.t}</span>
                <span className="relative hidden text-ink/60 md:block">{a.o}</span>
                <span className="relative text-sm text-ink/40">0{i + 1}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <FinalCta />
      <Footer />
    </main>
  );
}
