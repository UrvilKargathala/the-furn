import type { Metadata } from "next";
import { StudioView } from "./view";

export const metadata: Metadata = {
  title: "Studio | The Furn",
  description: "The design-and-build studio behind The Furn: our story, team, principles and journey.",
};

export default function Page() {
  return <StudioView />;
}
