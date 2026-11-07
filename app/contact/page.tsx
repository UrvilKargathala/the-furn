import type { Metadata } from "next";
import { pageMeta } from "../seo";
import { ContactView } from "./view";

export const metadata: Metadata = pageMeta({
  title: "Contact Us: Free Site Visit in Surat",
  description: "Call +91 99256 18895 or send your details for a free site visit, measurement and fixed quote. Studio in Pal Gam, Surat, open Monday to Saturday.",
  path: "/contact",
});

export default function Page() {
  return <ContactView />;
}
