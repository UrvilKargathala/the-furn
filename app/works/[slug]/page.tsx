import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLoading } from "../../page-loading";
import { JsonLd, breadcrumbLd, pageMeta, projectLd } from "../../seo";
import { projects, getProject } from "../../content/projects";
import { WorkDetailView } from "../view";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? pageMeta({ title: `${p.n}: ${p.c}${p.l ? ` in ${p.l}` : ""}`, description: p.d.length < 120 ? `${p.d} Designed and built by The Furn in ${p.l || "Surat"}.` : p.d, path: `/works/${p.slug}`, image: p.i }) : {};
}

// The slug is read inside Suspense so the page shell (and the streamed metadata) never blocks navigation
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Detail params={params} />
    </Suspense>
  );
}

async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={projectLd(p)} />
      <JsonLd data={breadcrumbLd([["Works", "/works"], [p.n, `/works/${p.slug}`]])} />
      <WorkDetailView p={p} />
    </>
  );
}
