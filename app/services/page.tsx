import type { Metadata } from "next";
import { pageMeta } from "../seo";
import { ServicesView } from "./view";

export const metadata: Metadata = pageMeta({
  title: "Modular Kitchens, Wardrobes & Interior Services in Surat",
  description: "Modular kitchens, wardrobes, TV units, bedroom and dining furniture and complete interiors in Surat. Designed in-house, built in our workshop, installed by our own team.",
  path: "/services",
});

export default function Page() {
  return <ServicesView />;
}
