import type { Metadata } from "next";
import { pageMeta, webPageLd, JsonLd } from "../seo";
import { ProcessView } from "./view";

const page = {
  title: "Our Process: From Site Visit to Handover",
  description: "How The Furn works in five steps: site visit, layout and 3D design, fixed itemised quote, precision production, and installation by our own team.",
  path: "/process",
};
export const metadata: Metadata = pageMeta(page);

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ ...page, type: "WebPage" })} />
      <ProcessView />
    </>
  );
}
