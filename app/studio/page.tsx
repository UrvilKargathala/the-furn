import type { Metadata } from "next";
import { pageMeta } from "../seo";
import { StudioView } from "./view";

export const metadata: Metadata = pageMeta({
  title: "About Our Surat Interior Studio",
  description: "The Furn is a Surat design-and-build studio founded in 2021: our story, principles and the precision craft behind every kitchen and wardrobe.",
  path: "/studio",
});

export default function Page() {
  return <StudioView />;
}
