import type { Metadata } from "next";
import { pageMeta, webPageLd, JsonLd } from "../seo";
import { ContactView } from "./view";

const page = {
  title: "Contact Us: Book a Site Visit in Surat",
  description: "Call +91 99256 18895 or send your details to book a site visit, measurement and fixed quote. Studio in Pal Gam, Surat, open Monday to Saturday.",
  path: "/contact",
};
export const metadata: Metadata = pageMeta(page);

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ ...page, type: "ContactPage" })} />
      <ContactView />
    </>
  );
}
