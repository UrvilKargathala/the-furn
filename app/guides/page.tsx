import type { Metadata } from "next";
import { pageMeta, webPageLd, JsonLd } from "../seo";
import { guides } from "../content/guides";
import { GuidesView } from "./view";

const page = {
  title: "Guides: Modular Kitchens, Wardrobes & Interiors",
  description: "Straight answers from our Surat design-and-build team: kitchen layouts, shutter finishes, hardware, how a modular kitchen is made, and wardrobe planning.",
  path: "/guides",
};
export const metadata: Metadata = pageMeta(page);

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ ...page, type: "CollectionPage", items: guides.map((g) => ({ name: g.t, path: `/guides/${g.slug}` })) })} />
      <GuidesView />
    </>
  );
}
