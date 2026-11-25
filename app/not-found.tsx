import Link from "next/link";
import { Mark } from "./ui";
import { Pic } from "./pic";

export const metadata = { title: "Page not found | The Furn" };

export default function NotFound() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-ink px-6 text-center text-ivory">
      <Pic src="/works/globcon/11.jpg" alt="" preload className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="relative">
        <Link href="/" aria-label="The Furn home" className="inline-block"><Mark className="mx-auto h-8 w-auto" /></Link>
        <p className="mt-16 text-xs font-semibold uppercase tracking-[0.3em] text-brass">Error 404</p>
        <h1 className="mt-4 text-5xl leading-[1] font-bold tracking-tight md:text-8xl">This room<br /><span className="text-stone">isn&apos;t built yet.</span></h1>
        <p className="mx-auto mt-6 max-w-md text-ivory/75">The page you&apos;re looking for has moved or never existed. Let&apos;s get you back to something we have finished.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-fill btn-fill-ivory rounded-full bg-brass px-6 py-3 font-semibold">Back to home</Link>
          <Link href="/works" className="btn-fill btn-fill-ivory rounded-full border border-ivory/30 px-6 py-3 font-semibold backdrop-blur-md">See our works</Link>
        </div>
      </div>
    </main>
  );
}
