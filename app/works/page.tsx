import type { Metadata } from "next";
import { pageMeta } from "../seo";
import { projects } from "../content/projects";
import { WorksView } from "./view";

export const metadata: Metadata = pageMeta({
  title: "Our Work: Kitchens, Wardrobes & Home Interiors",
  description: `${projects.length} real kitchens, wardrobes and full home interiors by The Furn, from Surat to Mumbai, Pune and Hyderabad, with photos and project films.`,
  path: "/works",
});

export default function Page() {
  return <WorksView />;
}
