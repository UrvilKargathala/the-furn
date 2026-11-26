import type { Metadata } from "next";
import { pageMeta, webPageLd, JsonLd } from "../seo";
import { services } from "../content/services";
import { ServicesView } from "./view";

const page = {
  title: "Modular Kitchens, Wardrobes & Interior Services in Surat",
  description: "Modular kitchens, wardrobes, TV units, bedroom and dining furniture and complete interiors in Surat, designed in-house and installed by our own team.",
  path: "/services",
};
export const metadata: Metadata = pageMeta(page);

export default function Page() {
  return (
    <>
      <JsonLd data={webPageLd({ ...page, type: "CollectionPage", items: services.map((s) => ({ name: s.t, path: `/services/${s.slug}` })) })} />
      <ServicesView />
    </>
  );
}
