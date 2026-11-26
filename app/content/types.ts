// Shared content types

export type Service = {
  slug: string;
  t: string;
  short: string;
  i: string;
  tags: string[];
  intro: string[];
  sections: { h: string; p: string[] }[];
  deliverables: string[];
  options: { t: string; d: string; i: string }[];
  process: { t: string; d: string }[];
  // Search result title (before " | The Furn", keep under ~50 characters) and description (140-160 characters)
  seo: { title: string; description: string };
  // Common questions, shown on the page and sent to search engines and AI assistants as FAQ data
  faqs: { q: string; a: string }[];
};

export type Project = {
  slug: string; n: string; c: string; cat: string; l: string; y: string; area: string; days: string; client: string;
  d: string; i: string; gallery: string[];
  service: string; credits: { n: string; r: string }[]; video: string; moreVideos?: string[]; insta: string;
  overview: string; challenge: string; solution: string; features: string[]; result: string;
  quote: { t: string; by: string };
};

// A guide article (content/guides.ts). `photo` and `projects` are project slugs; `services` are service slugs.
export type Guide = {
  slug: string;
  t: string;
  // Search result title (before " | The Furn") and description (140-160 characters)
  seo: { title: string; description: string };
  short: string;
  // The direct answer, shown first: what search engines and AI assistants quote
  answer: string;
  photo: string;
  read: number;
  updated: string;
  sections: { h: string; p: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
  services: string[];
  projects: string[];
};
