import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "../../data";
import { ServiceDetailView } from "../view";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: `${s.t} | The Furn`, description: s.short } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  return <ServiceDetailView s={s} />;
}
