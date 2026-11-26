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
};

export type Project = {
  slug: string; n: string; c: string; cat: string; l: string; y: string; area: string; days: string; client: string;
  d: string; i: string; gallery: string[];
  service: string; credits: { n: string; r: string }[]; video: string; moreVideos?: string[]; insta: string;
  overview: string; challenge: string; solution: string; features: string[]; result: string;
  quote: { t: string; by: string };
};
