import type { MetadataRoute } from "next";
import { projects, services } from "./data";

export const SITE = "https://www.thefurn.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") =>
    ({ url: `${SITE}${path}`, changeFrequency, priority });
  return [
    page("", 1, "weekly"),
    page("/works", 0.9, "weekly"),
    page("/services", 0.9),
    page("/studio", 0.7),
    page("/process", 0.7),
    page("/contact", 0.8),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    ...projects.map((p) => page(`/works/${p.slug}`, 0.7)),
  ];
}
