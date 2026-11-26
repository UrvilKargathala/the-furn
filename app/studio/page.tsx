import type { Metadata } from "next";
import { pageMeta, webPageLd, JsonLd } from "../seo";
import { StudioView } from "./view";

const page = {
  title: "About Our Surat Interior Studio",
  description: "The Furn is a Surat design-and-build studio founded in 2021: our story, principles and the precision craft behind every kitchen and wardrobe.",
  path: "/studio",
};
export const metadata: Metadata = pageMeta(page);

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ ...page, type: "AboutPage" })} />
      <StudioView />
    </>
  );
}
