import type { Metadata } from "next";
import { ServicesView } from "./view";

export const metadata: Metadata = {
  title: "Services | The Furn",
  description: "Modular kitchens, wardrobes, living units, bedroom furniture and complete interiors, made to measure.",
};

export default function Page() {
  return <ServicesView />;
}
