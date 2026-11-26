import type { MetadataRoute } from "next";
import { SITE_URL as SITE } from "./content/site";
import { projects } from "./content/projects";
import { services } from "./content/services";
import { guides } from "./content/guides";
import { getProject } from "./content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (src: string) => (src.startsWith("http") ? src : `${SITE}${src}`);
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly", images: string[] = []) =>
    ({ url: `${SITE}${path}`, changeFrequency, priority, ...(images.length && { images: images.map(abs) }) });
  return [
    page("", 1, "weekly"),
    page("/works", 0.9, "weekly"),
    page("/services", 0.9),
    page("/studio", 0.7),
    page("/process", 0.7),
    page("/contact", 0.8),
    page("/guides", 0.7, "monthly"),
    ...guides.map((g) => ({ ...page(`/guides/${g.slug}`, 0.7, "monthly", [getProject(g.photo)?.i].filter((x): x is string => !!x)), lastModified: g.updated })),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8, "monthly", s.i.startsWith("/") ? [s.i] : [])),
    ...projects.map((p) => page(`/works/${p.slug}`, 0.7, "monthly", [p.i, ...p.gallery].slice(0, 10))),
  ];
}
