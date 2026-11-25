import Link from "next/link";
import { SmoothScroll, Reveal, RollText } from "./fx";

import { Label, Heading, Cta, Footer, ArrowIcon } from "./ui";
import { OurStory } from "./story";
import { Testimonials } from "./testimonials";
import { ServicesSection, FeaturedProjects, Process, HomeIntro } from "./home-parts";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <HomeIntro />

      <OurStory />

      {/* Services: the made-to-measure switch, then one row of photo cards */}
      <ServicesSection />

      <Testimonials />

      {/* Projects: stacked pinned cards (prismae style) */}
      <section id="projects" className="pt-20 pb-28 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6 px-5 md:px-12">
          <div><Label>Selected work</Label><Heading text="Rooms that tell" accent="our story" /></div>
        </div>
        <FeaturedProjects />
        <Reveal className="mt-12 flex justify-center">
          <Link href="/works" className="group flex items-center gap-1 font-semibold text-ivory">
            <span className="btn-fill btn-fill-brass rounded-full bg-ink px-7 py-4"><RollText>View All Projects</RollText></span>
            {/* Circle fills dark while the arrow flies out and a fresh one slides in, like the other buttons */}
            <span className="btn-fill btn-fill-ink relative grid h-14 w-14 place-items-center rounded-full bg-brass text-ink">
              <span className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[220%] group-hover:-translate-y-[220%]"><ArrowIcon size={14} /></span>
              <span aria-hidden className="absolute -translate-x-[220%] translate-y-[220%] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-hover:translate-y-0"><ArrowIcon size={14} /></span>
            </span>
          </Link>
        </Reveal>
      </section>

      {/* Process: steps scroll on the left, pinned photo swaps on the right (prismae style) */}
      <section id="process" className="px-5 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
        <Label>How it Works</Label><Heading text="From first sketch" accent="to final handover" />
        <Process />
        <Reveal><Link href="/process" className="group mt-12 inline-flex items-center gap-2 font-semibold"><RollText>See the full process</RollText><span className="transition-transform duration-500 group-hover:translate-x-1">→</span></Link></Reveal>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
