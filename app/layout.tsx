import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { HoverCursor } from "./fx";
import { WhatsAppFab } from "./ui";
import { BUSINESS, SITE_URL } from "./content/site";
import { JsonLd, businessLd, websiteLd } from "./seo";
import { Analytics } from "./analytics";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Furn | Modular Kitchens, Wardrobes & Interiors in Surat",
    template: "%s | The Furn",
  },
  description: "Modular kitchens, wardrobes and complete home interiors in Surat, designed in-house, built on German machinery and installed by our team. Fixed, itemised quote.",
  applicationName: BUSINESS.name,
  keywords: ["modular kitchen Surat", "wardrobe Surat", "interior designer Surat", "modular furniture Surat", "TV unit design", "custom furniture Gujarat", "home interiors Surat"],
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Home & Interior Design",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
  formatDetection: { telephone: true, email: true, address: true },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": BUSINESS.city,
  },
};

export const viewport: Viewport = { themeColor: "#1b1915" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={manrope.variable}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <JsonLd data={businessLd} />
        <JsonLd data={websiteLd} />
        {children}<HoverCursor /><WhatsAppFab />
        <Analytics />
      </body>
    </html>
  );
}
