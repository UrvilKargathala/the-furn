import type { Metadata } from "next";
import { pageMeta, webPageLd, JsonLd } from "../seo";
import { projects } from "../content/projects";
import { WorksView } from "./view";

const page = {
  title: "Our Work: Kitchens, Wardrobes & Home Interiors",
  description: `${projects.length} real kitchens, wardrobes and full home interiors by The Furn, from Surat to Mumbai, Pune and Hyderabad, with photos and project films.`,
  path: "/works",
};
export const metadata: Metadata = pageMeta(page);

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ ...page, type: "CollectionPage", items: projects.map((p) => ({ name: `${p.n}: ${p.c}${p.l ? `, ${p.l}` : ""}`, path: `/works/${p.slug}` })) })} />
      <WorksView />
    </>
  );
}
