// Structured data (schema.org JSON-LD) for search engines and AI assistants.
// Everything is built from the site's own content, so it stays in sync with the pages.
import { BUSINESS, CONTACT, SITE_URL, STATS } from "./content/site";
import type { Project, Service } from "./content/types";

const ORG_ID = `${SITE_URL}/#business`;
const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

export function JsonLd({ data }: { data: object }) {
  // "<" is escaped so content can never close the script tag early
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

// The business itself: shown once, site-wide (layout)
export const businessLd = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "FurnitureStore"],
  "@id": ORG_ID,
  name: BUSINESS.name,
  slogan: BUSINESS.tagline,
  description: BUSINESS.description,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: abs("/works/globcon/11.jpg"),
  telephone: CONTACT.phone.href.replace("tel:", ""),
  email: CONTACT.email,
  foundingDate: BUSINESS.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.country,
  },
  hasMap: CONTACT.maps,
  areaServed: STATS.cities.map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "State", name: BUSINESS.region } })),
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  }],
  sameAs: BUSINESS.social,
  knowsAbout: ["Modular kitchens", "Wardrobes", "TV units", "Bedroom furniture", "Interior design", "Custom furniture manufacturing"],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BUSINESS.name,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

// Breadcrumb trail, e.g. Home › Works › Serene Art
export function breadcrumbLd(trail: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"], ...trail].map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}

export function serviceLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${s.slug}#service`,
    name: `${s.t} in ${BUSINESS.city}`,
    serviceType: s.t,
    description: [s.short, ...s.intro].join(" "),
    url: abs(`/services/${s.slug}`),
    image: abs(s.i.startsWith("/") ? s.i : `/works/globcon/11.jpg`),
    provider: { "@id": ORG_ID },
    areaServed: STATS.cities.map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.t} options`,
      itemListElement: s.options.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o.t, description: o.d } })),
    },
  };
}

export function projectLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/works/${p.slug}#project`,
    name: p.n,
    headline: `${p.n}: ${p.c}${p.l ? ` in ${p.l}` : ""}`,
    description: [p.d, p.overview].filter(Boolean).join(" "),
    url: abs(`/works/${p.slug}`),
    image: [p.i, ...p.gallery].slice(0, 6).map(abs),
    genre: p.c,
    ...(p.y && { dateCreated: p.y }),
    ...(p.l && { locationCreated: { "@type": "Place", name: `${p.l}, ${BUSINESS.region}, India` } }),
    creator: { "@id": ORG_ID },
    ...(p.video && { video: { "@type": "VideoObject", name: `${p.n} project film`, description: p.d, contentUrl: p.video, thumbnailUrl: abs(p.i), uploadDate: p.y ? `${p.y}-01-01` : undefined } }),
  };
}

// Per-page metadata: title, description, canonical URL and social preview.
// (A page's openGraph replaces the layout's, so the shared fields are repeated here.)
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }) {
  // Pages without their own photo use the branded preview from app/opengraph-image.tsx
  const images = image
    ? [{ url: image, width: 1600, height: 1067, alt: title }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${BUSINESS.name}: ${BUSINESS.tagline}` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, siteName: BUSINESS.name, locale: "en_IN", url: path, title: `${title} | ${BUSINESS.name}`, description, images },
    twitter: { card: "summary_large_image" as const, title: `${title} | ${BUSINESS.name}`, description, images: images.map((i) => i.url) },
  };
}
