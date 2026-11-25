// Site-wide settings: media host, contact details, nav links, headline stats and form options.
// Change contact details or stats here and every page updates.

// Production serves videos from media.thefurn.co; `next dev` plays the local copy in public/media (symlink to ~/the-furn-media)
export const MEDIA = process.env.NEXT_PUBLIC_MEDIA_BASE ?? (process.env.NODE_ENV === "development" ? "/media" : "https://media.thefurn.co");
// Unsplash placeholder ids still used in a few places; local paths pass straight through
export const img = (id: string, w = 1600) => id.startsWith("/") ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SITE_URL = "https://www.thefurn.co";

// Business facts used by page metadata, structured data (schema.org) and llms.txt
export const BUSINESS = {
  name: "The Furn",
  tagline: "Tailored modular furniture and interiors in Surat",
  description: "The Furn is a design-and-build studio in Surat, Gujarat. We design, precision-build on German machinery and install modular kitchens, wardrobes, TV units, bedroom furniture and complete home interiors, made to measure.",
  founded: "2021",
  street: "220, 219 Sumerru Business Corner, near Park Inn by Radisson Blue, Pal Gam",
  city: "Surat",
  region: "Gujarat",
  postalCode: "394510",
  country: "IN",
  social: ["https://www.instagram.com/thefurn.co/", "https://in.pinterest.com/thefurnprojects/", "https://www.linkedin.com/company/the-furn-projects/", "https://business.google.com/n/4210206919015963812/searchprofile?hl=en-GB"],
};

const ADDRESS = `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}`;

export const CONTACT = {
  phone: { label: "+91 99256 18895", href: "tel:+919925618895" },
  // Every WhatsApp button opens with this message
  whatsapp: "https://wa.me/919925618895?text=" + encodeURIComponent("Hi THE FURN, I'd like a free site visit."),
  email: "info@thefurn.co",
  address: ADDRESS,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
  instagram: { label: "@thefurn.co", href: "https://www.instagram.com/thefurn.co/" },
  hours: "Monday to Saturday, 10 am to 7 pm",
};

// Headline numbers shown on the Home, Services and Studio pages
export const STATS = {
  years: 20, // team experience; the studio itself was founded in 2021 (BUSINESS.founded)
  homes: 250,
  cities: ["Surat", "Mumbai", "Navi Mumbai", "Ahmedabad", "Hyderabad", "Pune"],
  warrantyYears: 15,
};

export const links = [["Home", "/"], ["Services", "/services"], ["Works", "/works"], ["Studio", "/studio"], ["Process", "/process"], ["Contact us", "/contact"]];

// Contact form: budget ranges (from 1 lakh up to unlimited). The tier tells us what kind of customer is enquiring.
export const budgets = [
  { v: "3-5", t: "₹3 – 5 lakh", tier: "Essential" },
  { v: "5-10", t: "₹5 – 10 lakh", tier: "Standard" },
  { v: "10-20", t: "₹10 – 20 lakh", tier: "Premium" },
  { v: "20-50", t: "₹20 – 50 lakh", tier: "Signature" },
  { v: "50-100", t: "₹50 lakh – 1 crore", tier: "Luxury" },
  { v: "100+", t: "₹1 crore and above", tier: "Ultra" },
  { v: "unlimited", t: "Unlimited / no fixed budget", tier: "Ultra" },
];
export const enquiryTypes = ["Modular kitchen", "Wardrobes", "Living room & TV unit", "Bedroom furniture", "Dining & crockery", "Complete interior", "Other"];
