"use client"; // Error boundaries must be Client Components
import { useEffect } from "react";
import Link from "next/link";
import { Mark } from "./ui";
import { CONTACT } from "./content/site";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="grid min-h-svh place-items-center bg-ink px-6 text-center text-ivory">
      <div>
        <Link href="/" aria-label="The Furn home" className="inline-block"><Mark className="mx-auto h-8 w-auto" /></Link>
        <p className="mt-16 text-xs font-semibold uppercase tracking-[0.3em] text-brass">Something went wrong</p>
        <h1 className="mt-4 text-5xl leading-[1] font-bold tracking-tight md:text-7xl">A hinge came loose.<br /><span className="text-stone">We&apos;re on it.</span></h1>
        <p className="mx-auto mt-6 max-w-md text-ivory/75">This page didn&apos;t load properly. Try again, or reach us directly on WhatsApp.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button onClick={() => retry()} className="btn-fill btn-fill-ivory rounded-full bg-brass px-6 py-3 font-semibold">Try again</button>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-fill btn-fill-ivory rounded-full border border-ivory/30 px-6 py-3 font-semibold">WhatsApp us</a>
        </div>
      </div>
    </main>
  );
}
