import { ImageResponse } from "next/og";
import { BUSINESS } from "./content/site";

// Default social preview (WhatsApp, LinkedIn, X...) for pages without their own photo
export const alt = `${BUSINESS.name}: modular kitchens, wardrobes and interiors in ${BUSINESS.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1b1915", color: "#f3f1ed", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#c7843f", fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>
          <div style={{ width: 56, height: 3, background: "#c7843f" }} />
          The Furn · Surat
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>Modular kitchens,</span>
          <span>wardrobes & interiors</span>
          <span style={{ color: "#b9a88f" }}>made to measure.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#f3f1edb0" }}>
          <span>Designed in-house · Built in our workshop · Installed by our team</span>
          <span>thefurn.co</span>
        </div>
      </div>
    ),
    size,
  );
}
