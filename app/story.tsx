import { ScrollWords } from "./fx";
import { Label, PageHero } from "./ui";
import { Chapters } from "./story-chapters";
import { STATS } from "./content/site";
import { StatsRow, type Stat } from "./stats";

// Headline numbers. Values come from the shared STATS so every page agrees; each one links to the page that backs it up.
const stats: Stat[] = [
  { n: STATS.homes, s: "+", t: "Homes delivered across India", href: "/works" },
  { n: STATS.years, s: "+", t: "Years of design & build experience", href: "/studio" },
  { n: STATS.cities.length, s: "", t: "Cities served by our own install teams", href: "/contact" },
  { n: 100, s: "%", t: "Built with precision & expertise", href: "/process" },
];

export function OurStory() {
  return (
    <section id="about" className="pt-24 md:pt-32">
      <div className="px-5 md:px-12">
        <div className="flex items-center justify-between">
          <div className="shrink-0 whitespace-nowrap"><Label>Our Story</Label></div>
          <span className="text-right font-mono text-xs tracking-[0.2em] text-ink/65 uppercase">Surat, Gujarat · Est. 2021</span>
        </div>
        <div className="mt-8"><PageHero as="h2" large lines={["Furniture that", "fits your life."]} /></div>
        <div className="mt-16 md:mt-24 md:ml-[30%]">
          <ScrollWords blur className="text-3xl leading-[1.12] font-medium tracking-tight md:text-5xl"
            text="A home works best when its furniture is made for it. We design modular kitchens, wardrobes, beds, vanities, dressing tables and loose modular furniture around your space, your routine and the way you live." />
        </div>
      </div>

      <div className="mt-24 md:mt-32"><Chapters /></div>

      <div className="px-5 md:px-12">
        <StatsRow stats={stats} />
      </div>
    </section>
  );
}
