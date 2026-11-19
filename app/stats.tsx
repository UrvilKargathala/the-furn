import Link from "next/link";
import { Reveal, Counter } from "./fx";
import { ArrowIcon } from "./ui";

export type Stat = { n: number; s: string; t: string; href: string };

// Row of headline numbers used on Home and Services: centred, divided, brass symbol, each one a link
export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 border-t border-ink/15 md:grid-cols-4">
      {stats.map(({ n, s, t, href }, i) => (
        <Reveal key={t} delay={i * 0.08}
          className={`border-ink/15 ${i > 1 ? "border-t md:border-t-0" : ""} ${i % 2 ? "border-l" : i ? "md:border-l" : ""}`}>
          <Link href={href} className="group relative block px-3 py-8 text-center transition-colors duration-500 hover:bg-sand/60 md:py-12">
            <dt className="text-5xl font-semibold tracking-tight transition-transform duration-500 group-hover:-translate-y-1 md:text-7xl">
              <Counter to={n} /><span className="text-brass">{s}</span>
            </dt>
            <dd className="mx-auto mt-3 max-w-[18ch] text-sm text-ink/70 md:text-base">{t}</dd>
            <span aria-hidden className="absolute top-4 right-4 text-ink opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100"><ArrowIcon /></span>
          </Link>
        </Reveal>
      ))}
    </dl>
  );
}
