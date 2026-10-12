import type { Metadata } from "next";
import { WorksView } from "./view";

export const metadata: Metadata = {
  title: "Works | The Furn",
  description: "Modular kitchens, wardrobes and complete interiors designed and built by The Furn.",
};

export default function Page() {
  return <WorksView />;
}
