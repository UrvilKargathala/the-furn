import Link from "next/link";
import { SmoothScroll, Reveal, RollText } from "./fx";

import { Label, Heading, Cta, Footer, ArrowIcon } from "./ui";
import { OurStory } from "./story";
import { Testimonials } from "./testimonials";
import { Services, FeaturedProjects, Process, HomeIntro } from "./home-parts";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <HomeIntro />

      <OurStory />

      {/* Services: click-to-open accordion */}
      <section id="services" className=" bg-sand px-5 py-28 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label>Services</Label><Heading text="Complete solutions" accent="for every room" /></div>
          <Reveal><p className="max-w-xs text-ink/70">Every module is designed in-house and built to your exact measurements.</p></Reveal>
        </div>
        <Services />
      </section>

      <Testimonials />

      {/* Projects: stacked pinned cards (prismae style) */}
      <section id="projects" className="py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 px-5 md:px-12">
          <div><Label>Our Works</Label><Heading text="Featured" accent="projects" /></div>
        </div>
        <FeaturedProjects />
        <Reveal className="mt-12 flex justify-center">
          <Link href="/works" className="group flex items-center gap-1 font-semibold text-ivory">
            <span className="rounded-full bg-ink px-7 py-4"><RollText>View All Projects</RollText></span>
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brass transition-transform duration-500 group-hover:rotate-45">
              <ArrowIcon size={14} />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* Process: steps scroll on the left, pinned photo swaps on the right (prismae style) */}
      <section id="process" className="px-5 pt-28 pb-24 md:px-12">
        <Label>How it Works</Label><Heading text="From first sketch" accent="to final handover" />
        <Process />
        <Reveal><Link href="/process" className="group mt-12 inline-flex items-center gap-2 font-semibold"><RollText>See the full process</RollText><span className="transition-transform duration-500 group-hover:translate-x-1">→</span></Link></Reveal>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
