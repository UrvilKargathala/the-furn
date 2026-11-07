import { NextResponse, type NextRequest } from "next/server";
import { projects } from "./app/content/projects";
import { services } from "./app/content/services";

// Project and service pages stream (so navigation is instant), which means a missing slug can't
// change the status code mid-render. Catch unknown slugs here first so they get a real 404.
const known = {
  works: new Set(projects.map((p) => p.slug)),
  services: new Set(services.map((s) => s.slug)),
};

export function proxy(req: NextRequest) {
  const [, section, slug] = req.nextUrl.pathname.split("/") as [string, keyof typeof known, string];
  if (slug && !known[section]?.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/__not-found", req.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/works/:slug", "/services/:slug"] };
