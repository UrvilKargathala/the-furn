import { BUSINESS, CONTACT, SITE_URL, STATS } from "../content/site";
import { services, processDetail } from "../content/services";
import { projects } from "../content/projects";

// /llms.txt: a plain-text summary of the business for AI assistants (ChatGPT, Claude, Perplexity...).
// Built from the same content as the pages, so it never goes out of date.
export function GET() {
  const url = (p: string) => `${SITE_URL}${p}`;
  const body = `# ${BUSINESS.name}

> ${BUSINESS.description}

## Key facts
- Business: design-and-build studio for modular furniture and home interiors
- Location: ${CONTACT.address}, India
- Founded: ${BUSINESS.founded}
- Cities served: ${STATS.cities.join(", ")} (India)
- Phone / WhatsApp: ${CONTACT.phone.label}
- Email: ${CONTACT.email}
- Hours: ${CONTACT.hours}
- Experience: ${STATS.years}+ years of team experience, ${STATS.homes}+ homes delivered
- Hardware warranty: ${STATS.warrantyYears} years
- Everything is designed in-house, precision-built on German machinery and installed by our own team
- Site visit and measurement; itemised, fixed quote before production

## Services
${services.map((s) => `- [${s.t}](${url(`/services/${s.slug}`)}): ${s.short} Options: ${s.options.map((o) => o.t).join(", ")}.`).join("\n")}

## How we work
${processDetail.map((st, i) => `${i + 1}. ${st.t}: ${st.d}`).join("\n")}

## Projects
${projects.map((p) => `- [${p.n}](${url(`/works/${p.slug}`)}): ${p.c}${p.l ? `, ${p.l}` : ""}${p.y ? `, ${p.y}` : ""}. ${p.d}`).join("\n")}

## Pages
- [Home](${url("/")})
- [Services](${url("/services")})
- [Our work](${url("/works")})
- [Our process](${url("/process")})
- [Studio / about](${url("/studio")})
- [Contact and site visits](${url("/contact")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
