import { Reveal, ScrollWords, Counter } from "./fx";
import { Label, PageHero } from "./ui";
import { Chapters } from "./story-chapters";

const stats: [number, string, string][] = [
  [250, "+", "Homes delivered across the city"],
  [12, "+", "Years of design & build experience"],
  [98, "%", "Clients who refer us to friends"],
  [100, "%", "Built in our own workshop"],
];

export function OurStory() {
  return (
    <section id="about" className="pt-28 md:pt-40">
      <div className="px-5 md:px-12">
        <div className="flex items-center justify-between">
          <div className="shrink-0 whitespace-nowrap"><Label>Our Story</Label></div>
          <span className="text-right font-mono text-xs tracking-[0.2em] text-ink/50 uppercase">Surat, Gujarat · Est. 2014</span>
        </div>
        <div className="mt-8"><PageHero as="h2" large lines={["Furniture that", "fits your life."]} /></div>
        <div className="mt-16 md:mt-24 md:ml-[30%]">
          <ScrollWords className="text-3xl leading-[1.12] font-medium tracking-tight md:text-5xl"
            text="A home works best when its furniture is made for it. We design modular kitchens, wardrobes and interiors around your space, your routine and the way you live." />
        </div>
      </div>

      <div className="mt-24 md:mt-32"><Chapters /></div>

      <div className="px-5 md:px-12">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map(([n, s, t], i) => (
            <Reveal key={t} delay={i * 0.08} className="border-t border-ink/15 py-8 pr-4 md:py-10">
              <dt className="text-6xl font-semibold tracking-tight md:text-8xl"><Counter to={n} suffix={s} /></dt>
              <dd className="mt-3 max-w-[16ch] text-sm text-ink/60">{t}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
