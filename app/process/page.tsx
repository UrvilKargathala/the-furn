import type { Metadata } from "next";
import { pageMeta } from "../seo";
import { ProcessView } from "./view";

export const metadata: Metadata = pageMeta({
  title: "Our Process: From Site Visit to Handover",
  description: "How The Furn works in five steps: site visit, layout and 3D design, fixed itemised quote, precision production, and installation by our own team.",
  path: "/process",
});

export default function Page() {
  return <ProcessView />;
}
