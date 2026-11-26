# SEO & GEO measurement: The Furn

How we know whether the SEO and AI-visibility work (phases 0–4) is paying off. Fill in one column a month. Compare months with each other, not single days.

## Baseline: 26 Nov 2026 (the day the work went live)

| Area | Measure | Baseline | Source |
|---|---|---|---|
| Site health | Pages in sitemap | 31 | /sitemap.xml |
| | Pages blocked from Google (noindex) | 0 | live check |
| | Structured data blocks that fail to parse | 0 | live check (see below) |
| | Lighthouse SEO score (mobile) | 100 Home · 100 Modular Kitchens | Lighthouse 12, mobile |
| | Lighthouse speed (mobile) | 78 Home · 97 Modular Kitchens | Lighthouse 12, mobile |
| | Lighthouse accessibility | 96 · 96 | Lighthouse 12, mobile |
| | Largest paint, mobile | 4.0 s Home · 2.3 s Modular Kitchens | Lighthouse 12, mobile |
| Bing | Site added | Yes, 26 Nov 2026 (imported from Search Console; Claude has access) | Bing Webmaster Tools |
| | Sitemap | Submitted 26 Nov 2026, status Processing | Bing → Sitemaps |
| | Copilot / Bing AI citations | _starts after first crawl_ | Bing → AI Performance |
| Google profile | Rating | 5.0 (11 reviews) | Google Maps |
| | Profile views | 3,882 (as shown on the profile) | Google Maps |
| Off-site | Third-party listings/mentions found | 0 | Web search for "The Furn" Surat |
| Search Console | Data available | 23–24 Nov 2026 only (property newly verified) | Search Console → Performance |
| | Clicks / impressions | 4 / 65 | Search Console → Performance |
| | Average CTR / position | 6.2% / 6.1 | Search Console → Performance |
| | Top queries (impressions) | furn 13 · the furn 8 (1 click) · modular furniture manufacturers in surat 6 · modular furniture 2 · modular furniture surat 2 · furn studio 1 · modular kitchen surat 1 | Queries tab |
| | Top pages (impressions) | Home 61 (all 4 clicks) · Modular Kitchens 10 · Studio 10 · Services 5 · Works 3 · Complete Interiors 3 · Contact 3 · Bedroom 2 | Pages tab |
| | Indexed pages | Not reported yet ("processing data") | Search Console → Pages |
| | Sitemap submitted | Yes, 26 Nov 2026: read the same day, status Success, 31 pages discovered | Search Console → Sitemaps |
| | Structured data by type (31 pages) | Business 31 · WebSite 31 · Project 19 · Breadcrumb 25 · Service 6 · FAQ 6 · Collection 2 · About 1 · Contact 1 · WebPage 1 | live check |
| GA4 | Users / sessions (last 28 days) | _starts 26 Nov_ | GA4 → Reports |
| | Leads (`generate_lead`) | _starts 26 Nov_ | GA4 → Events |
| | WhatsApp / call taps | _starts 26 Nov_ | GA4 → Events |
| | Visits from AI assistants | _starts 26 Nov_ | GA4 → Traffic acquisition → AI assistants channel |
| AI answers | Test questions where The Furn is named (of 16) | _to fill_ | docs/ai-visibility-plan.md |

Claude's browser can read Search Console (access given 26 Nov 2026). For GA4, add the same account as a **Viewer** (Admin → Property access management → **+**) so Claude can fill in the GA4 rows too.

## Monthly routine (first week of each month, about 30 minutes)

**1. Search Console** (search.google.com/search-console, property thefurn.co)
- Performance → last 28 days, compared with the previous period: clicks, impressions, CTR, average position.
- Queries tab: note the top 10 queries, and any new ones containing "Surat", "modular kitchen", "wardrobe" or "interior".
- Pages tab: which service and project pages are getting impressions.
- Pages (indexing): indexed count, and any "Not indexed" reasons beyond redirects.
- Enhancements: confirm no structured data errors.

**2. GA4** (analytics.google.com, property THE FURN - thefurn.co)
- Reports → Engagement → Events: `generate_lead`, `contact_whatsapp`, `contact_call`, `contact_email`.
- Reports → Acquisition → Traffic acquisition: sessions by channel, including Organic Search and **AI assistants**.
- Landing pages: which pages lead people to get in touch.

**3. Bing Webmaster Tools** (bing.com/webmasters, site thefurn.co)
- Sitemaps: status Success and URLs discovered (should be 31).
- Search Performance: clicks and impressions on Bing.
- **AI Performance:** how often Copilot and Bing's AI summaries cite thefurn.co, and which pages. This is the most direct measure of the AI-visibility work.

**4. Google profile**
- Rating and review count, and replies to any new reviews.
- Profile performance: searches, calls, website clicks, direction requests.

**5. AI answers**
- Ask the 16 test questions in docs/ai-visibility-plan.md and fill in its tracking table.

**6. Site health** (Claude can run this part)
- Lighthouse on Home and one service page; structured data check on every sitemap page; any broken links.

## Monthly log

| Month | GSC clicks | GSC impressions | Avg position | Indexed pages | GA4 users | Leads | WhatsApp + call taps | AI visits | Reviews (rating) | AI questions named (/16) | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 2026 (baseline) | 4 (2 days) | 65 (2 days) | 6.1 | processing | | | | | 11 (5.0) | | SEO phases 0–4 live on 26 Nov; sitemap submitted 26 Nov (31 pages) |
| Dec 2026 | | | | | | | | | | | |
| Jan 2027 | | | | | | | | | | | |
| Feb 2027 | | | | | | | | | | | |

## What "working" looks like

- **Month 1:** all 31 pages indexed, impressions rising for "modular kitchen Surat"-type queries, leads and WhatsApp taps showing up in GA4.
- **Months 2–3:** more reviews, the first directory listings live, brand questions in AI tools answered correctly, and first visits from AI assistants.
- **Months 3–6:** clicks rising from Surat searches, The Furn named in some discovery questions ("best modular kitchen in Surat"), and leads traceable to organic search.

If impressions stay flat after two months, check the Pages report for indexing problems first, then look at which queries show the site on page 2, since those are the easiest to improve.
