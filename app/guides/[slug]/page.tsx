import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLoading } from "../../page-loading";
import { JsonLd, articleLd, breadcrumbLd, faqLd, pageMeta } from "../../seo";
import { guides, getGuide } from "../../content/guides";
import { getProject } from "../../content/projects";
import { GuideView } from "../view";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  return g ? pageMeta({ title: g.seo.title, description: g.seo.description, path: `/guides/${g.slug}`, image: getProject(g.photo)?.i }) : {};
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
  const g = getGuide((await params).slug);
  if (!g) notFound();
  return (
    <>
      <JsonLd data={articleLd(g)} />
      <JsonLd data={faqLd(g.faqs, `/guides/${g.slug}`)} />
      <JsonLd data={breadcrumbLd([["Guides", "/guides"], [g.t, `/guides/${g.slug}`]])} />
      <GuideView g={g} />
    </>
  );
}
