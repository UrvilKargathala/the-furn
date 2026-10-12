import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "../../data";
import { WorkDetailView } from "../view";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.n} | The Furn`, description: p.d } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return <WorkDetailView p={p} />;
}
