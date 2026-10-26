import type { Metadata } from "next";
import { ContactView } from "./view";

export const metadata: Metadata = {
  title: "Contact us | The Furn",
  description: "Tell us about your space and budget. We'll measure, plan and quote with no obligation.",
};

export default function Page() {
  return <ContactView />;
}
