"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion, ease, Reveal } from "../fx";
import { processDetail } from "../content/services";
import { Pic } from "../pic";

const pad = (n: number) => String(n).padStart(2, "0");

// Process steps as an accordion: one step open at a time, its photo on the right (inside the step on phones).
// Every step's text stays in the page, so search engines and AI assistants read all five.
// The step index above links to #step-N, which opens that step.
export function ProcessAccordion() {
  const [open, setOpen] = useState(0);
  useEffect(() => {
    const fromHash = () => {
      const m = location.hash.match(/^#step-(\d+)$/);
      if (m) setOpen(Math.min(processDetail.length, Math.max(1, Number(m[1]))) - 1);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);
  const st = processDetail[open];

  return (
    <section className="px-5 pb-24 md:px-12 md:pb-32">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <ol className="border-t border-ink/15">
          {processDetail.map((s, i) => {
            const on = i === open;
            return (
              <li key={s.t} id={`step-${i + 1}`} className="scroll-mt-28 border-b border-ink/15">
                <Reveal delay={Math.min(i, 4) * 0.05}>
                  <h2>
                    <button type="button" onClick={() => setOpen(i)} aria-expanded={on} aria-controls={`step-panel-${i + 1}`}
                      className="group flex w-full items-center gap-5 py-7 text-left md:gap-8 md:py-9">
                      <span className={`text-4xl leading-none font-bold tracking-tighter transition-colors duration-500 md:text-6xl ${on ? "text-brass" : "text-ink/25 group-hover:text-ink/45"}`}>{pad(i + 1)}</span>
                      <span className={`flex-1 text-2xl leading-tight font-semibold tracking-tight transition-colors duration-500 md:text-4xl ${on ? "text-ink" : "text-ink/60 group-hover:text-ink"}`}>{s.t}</span>
                      <span aria-hidden className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-xl transition-all duration-500 ${on ? "rotate-45 border-brass bg-brass text-ivory" : "border-ink/25"}`}>+</span>
                    </button>
                  </h2>
                </Reveal>
                {/* Height animates with a grid-rows trick, so closed steps keep their text in the page */}
                <div id={`step-panel-${i + 1}`} role="region" aria-hidden={!on}
                  className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className={`pb-9 pl-0 transition-opacity duration-500 md:pl-[5.5rem] ${on ? "opacity-100 delay-150" : "opacity-0"}`}>
                      <div className="mb-6 aspect-[4/3] overflow-hidden bg-ink lg:hidden">
                        <Pic src={s.i} alt={s.t} sizes="100vw" quality={85} className="h-full w-full object-cover" />
                      </div>
                      <p className="max-w-xl text-lg text-ink/75">{s.d}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {s.tags.map((t) => <li key={t} className="rounded-full bg-sand px-4 py-2 text-sm font-medium">{t}</li>)}
                      </ul>
                      <div className="mt-8 border-l-2 border-brass pl-5">
                        <p className="text-xs font-semibold tracking-[0.25em] text-ink/65 uppercase">You get</p>
                        <p className="mt-1 text-lg font-semibold">{s.out}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Photo of the open step: pins while you read, cross-fades when the step changes */}
        <div className="hidden lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-ink">
            <AnimatePresence initial={false}>
              <motion.div key={open} className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.5 } }}
                transition={{ duration: 0.9, ease }}>
                <Pic src={st.i} alt={st.t} sizes="40vw" quality={90} className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-5 left-5 z-10 rounded-full bg-ivory/90 px-4 py-2 text-sm font-semibold text-ink backdrop-blur">Step {pad(open + 1)} of {pad(processDetail.length)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
