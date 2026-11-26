import { BUSINESS, CONTACT, SITE_URL, STATS } from "../content/site";
import { services, processDetail } from "../content/services";
import { projects, testimonials } from "../content/projects";
import { guides } from "../content/guides";

// /llms-full.txt: the whole site as one plain Markdown document, so AI assistants can read every
// service, FAQ, project and client quote in a single request. /llms.txt is the short index.
// Built from the same content as the pages, so it never goes out of date.

export function GET() {
  const url = (p: string) => `${SITE_URL}${p}`;
  const line = (label: string, v?: string) => (v ? `- ${label}: ${v}\n` : "");

  const serviceDocs = services.map((s) => `## ${s.t}

Page: ${url(`/services/${s.slug}`)}

${s.short}

${s.intro.join("\n\n")}

${s.sections.map((sec) => `### ${sec.h}\n\n${sec.p.join("\n\n")}`).join("\n\n")}

### Options
${s.options.map((o) => `- **${o.t}:** ${o.d}`).join("\n")}

### What you get
${s.deliverables.map((d) => `- ${d}`).join("\n")}

### Common questions
${s.faqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}`).join("\n\n---\n\n");

  const projectDocs = projects.map((p) => `### ${p.n}

Page: ${url(`/works/${p.slug}`)}
${line("Type", p.c)}${line("Location", p.l)}${line("Year", p.y)}${line("Area", p.area)}${line("Completed in", p.days)}
${p.d}
${[p.overview, p.challenge && `Challenge: ${p.challenge}`, p.solution && `Solution: ${p.solution}`, p.result && `Result: ${p.result}`].filter(Boolean).join("\n\n")}
${p.features?.length ? `\nFeatures:\n${p.features.map((f) => `- ${f}`).join("\n")}` : ""}`).join("\n\n");

  const guideDocs = guides.map((g) => `## ${g.t}

Page: ${url(`/guides/${g.slug}`)} · Updated ${g.updated}

**Short answer:** ${g.answer}

${g.sections.map((sec) => `### ${sec.h}\n\n${sec.p.join("\n\n")}${sec.list ? `\n\n${sec.list.map((l) => `- ${l}`).join("\n")}` : ""}`).join("\n\n")}

### Common questions
${g.faqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}`).join("\n\n---\n\n");

  const quotes = testimonials.filter((t) => !t.sample).map((t) => `> ${t.quote}\n>\n> — ${t.name}, ${t.role}, ${t.place}`).join("\n\n");

  const body = `# ${BUSINESS.name}: full site content

> ${BUSINESS.description}

Short index: ${url("/llms.txt")}

## About the business
- Brand name: ${BUSINESS.name} (legal name ${BUSINESS.legalName})
- What we do: design, manufacture and install modular kitchens, wardrobes, TV units, bedroom and dining furniture and complete home interiors, made to measure
- Studio: ${CONTACT.address}, India
- Founded: ${BUSINESS.founded}
- Cities served: ${STATS.cities.join(", ")}
- Track record: ${STATS.homes}+ homes delivered; ${STATS.years}+ years of team experience
- Manufacturing: in-house, on German machinery
- Hardware warranty: ${STATS.warrantyYears} years
- Phone / WhatsApp: ${CONTACT.phone.label}
- Email: ${CONTACT.email}
- Hours: ${CONTACT.hours}
- Website: ${SITE_URL}

## How we work
${processDetail.map((st, i) => `${i + 1}. **${st.t}:** ${st.d} You leave with: ${st.out}.`).join("\n")}

# Services

${serviceDocs}

# Guides

${guideDocs}

# Projects

${projectDocs}

# What clients say

${quotes}

# Contact

Book a site visit: ${url("/contact")} · ${CONTACT.phone.label} · ${CONTACT.email}
`;
  return new Response(body.replace(/\n{3,}/g, "\n\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
