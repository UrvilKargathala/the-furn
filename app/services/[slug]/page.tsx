import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLoading } from "../../page-loading";
import { JsonLd, breadcrumbLd, pageMeta, serviceLd } from "../../seo";
import { services, getService } from "../../content/services";
import { ServiceDetailView } from "../view";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? pageMeta({ title: `${s.t} in Surat`, description: `${s.short} Designed and built to measure by The Furn in Surat, with a free site visit and fixed quote.`, path: `/services/${s.slug}`, image: s.i.startsWith("/") ? s.i : undefined }) : {};
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
  const s = getService((await params).slug);
  if (!s) notFound();
  return (
    <>
      <JsonLd data={serviceLd(s)} />
      <JsonLd data={breadcrumbLd([["Services", "/services"], [s.t, `/services/${s.slug}`]])} />
      <ServiceDetailView s={s} />
    </>
  );
}
