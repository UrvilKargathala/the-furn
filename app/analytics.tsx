"use client";
import Script from "next/script";
import { useEffect } from "react";

// Google tag (GTM-WF2SZ2MC → GA4 property "THE FURN - thefurn.co", measurement ID G-ZKVSD9PBRE).
// The container itself handles page views (including page changes inside the app), scrolls,
// outbound clicks and form starts. This file adds the business events: leads and contact taps.
// Only loads on the live site, so local testing never shows up in reports.
export const GTAG_ID = "GTM-WF2SZ2MC";
const ENABLED = process.env.NODE_ENV === "production";

type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag } }

// Send an event to GA4. Safe to call anywhere; does nothing when the tag isn't loaded.
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

// Which contact method a link opens, if any
function contactKind(href: string) {
  if (href.startsWith("tel:")) return "call";
  if (href.startsWith("mailto:")) return "email";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp";
  return null;
}

export function Analytics() {
  // One listener for every phone, email and WhatsApp link on the site, wherever it appears
  useEffect(() => {
    if (!ENABLED) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      const kind = a && contactKind(a.getAttribute("href") ?? "");
      if (!kind) return;
      track(`contact_${kind}`, { method: kind, page_path: location.pathname, link_text: a.textContent?.trim().slice(0, 80) });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!ENABLED) return null;
  return (
    <>
      <Script id="gtag-src" src={`https://www.googletagmanager.com/gtm.js?id=${GTAG_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());`}
      </Script>
    </>
  );
}
