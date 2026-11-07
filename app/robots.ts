import type { MetadataRoute } from "next";
import { SITE_URL as SITE } from "./content/site";

// Search engines and AI assistants (ChatGPT, Claude, Perplexity, Google AI) may read every public page.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiCrawlers, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
