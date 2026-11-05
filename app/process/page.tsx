import type { Metadata } from "next";
import { ProcessView } from "./view";

export const metadata: Metadata = {
  title: "Our process | The Furn",
  description: "How we work, from the first site visit and 3D design to factory production, installation and handover.",
};

export default function Page() {
  return <ProcessView />;
}
