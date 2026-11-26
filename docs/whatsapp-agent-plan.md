# WhatsApp agent: final plan (menu + AI)

Replaces the CodeWords "THE FURN WhatsApp Agent" on **+91 99256 18895**.
Decided: **official WhatsApp Cloud API (Meta, direct)** + **menu with AI for typed questions**, built into the thefurn.co website.
Status: plan only, nothing built or changed yet (26 Nov 2026).

---

## 1. What customers get

1. Customer messages +91 99256 18895 (from the website's WhatsApp buttons or directly).
2. **Menu first** (free, instant):
   `[ Book site visit ] [ Visit our studio ] [ Talk to our team ]`, then a list of services, then name + area, day, time slot.
3. **Typed question?** ("do you make pooja units?", "kal aavi shako?") → **AI answers** from the website's own content (services, FAQs, guides, hours, address) in English, Hindi or Gujarati, then offers the buttons again. The AI can also take a booking in free text.
4. **Booking saved** → confirmation to the customer + alert to the team.
5. **Automatic:** day-before reminder, follow-up 2 days after a site visit, Monday summary.
6. **Team stays in control:** a team member replying by hand pauses the bot in that chat for 12 h; saved contacts and groups are ignored; STOP opts out.

Facts come from the website's content files, so WhatsApp and the website always say the same thing.

## 2. How it is built

```
Customer → WhatsApp → Meta Cloud API ──webhook──► thefurn.co /api/whatsapp
                                                   ├─ menu engine (buttons, lists) ......... free
                                                   ├─ Claude (only for typed questions) .... AI cost
                                                   ├─ bookings + chat memory (Redis) ....... free tier
                                                   └─ alerts (WhatsApp / Slack)
Vercel Cron, daily 7 PM IST ──► reminders, follow-ups, Monday summary (approved templates)
```

| Part | Choice |
|---|---|
| WhatsApp connection | Meta WhatsApp Cloud API, direct (no provider) |
| Agent code | Inside the existing Next.js site (`app/api/whatsapp`), hosted on Vercel |
| AI | Claude via Anthropic API, used only when a customer types instead of tapping |
| Knowledge | Built from `app/content/*` (site, services + FAQs, guides, projects) |
| Memory and bookings | Upstash Redis (Vercel Marketplace), free tier |
| Daily jobs | Vercel Cron, once a day |
| Secrets (Meta token, Anthropic key) | Vercel environment variables, never in code |

## 3. Costs

Assumptions: ₹88 = $1. "Enquiry" = one new customer chat. Each enquiry ≈ 8 bot replies; ~40% of replies need AI (typed questions); half of enquiries book a visit.

### 3a. Monthly running cost

| Item | Quiet month (60 enquiries) | Busy month (200 enquiries) | Notes |
|---|---|---|---|
| **Meta: customer → you** | ₹0 | ₹0 | Always free |
| **Meta: bot replies in 24 h window** | ₹0 (≈480 replies) | ≈₹70 (≈1,600 replies, 600 over the free 1,000) | First 1,000/month free per number, then the India service rate (≈₹0.1–0.2 each; confirm on Meta's INR rate card) |
| **Meta: reminder + follow-up templates** | ≈₹10 (≈60) | ≈₹25 (≈200) | India utility rate, ≈₹0.1–0.2 each (confirm on rate card) |
| **Meta: team alerts by WhatsApp** | ≈₹5 | ≈₹15 | Only if alerts go by WhatsApp template; **₹0 if alerts go to Slack** |
| **AI: Claude Opus 5.5** (recommended) | ≈₹300–450 | ≈₹1,000–1,500 | ≈₹1.5–2.5 per AI reply incl. caching |
| AI: Claude Sonnet 5.5 (alternative) | ≈₹150–250 | ≈₹500–800 | ≈₹0.8–1.2 per AI reply |
| AI: Claude Haiku 5.5 (cheapest) | ≈₹15–25 | ≈₹50–80 | ≈₹0.1 per AI reply; weaker in Gujarati/Hindi nuance |
| **Redis (chat memory, bookings)** | ₹0 | ₹0 | Free tier is far above this volume |
| **Hosting: Vercel** | ₹0 now / ≈₹1,760 on Pro | same | See 3c |
| **Total with Opus 5.5, Vercel as now** | **≈₹320–480** | **≈₹1,100–1,600** | |
| **Total with Opus 5.5 + Vercel Pro** | ≈₹2,080–2,240 | ≈₹2,860–3,360 | |

Meta's India rates are listed only in its INR rate card (not on the pricing page); the figures above are estimates to confirm at setup. AI costs scale with how often customers type rather than tap.

### 3b. One-time costs

| Item | Cost |
|---|---|
| Meta Business account, verification, display name, templates | ₹0 |
| Anthropic API account | ₹0 to open; prepaid credits (minimum ≈$5 ≈ ₹440) |
| Upstash Redis | ₹0 |
| Building, testing and switching over | Done in these sessions |

### 3c. Hosting note (Vercel)

The site runs on Vercel's **Hobby (free) plan**, which Vercel's terms limit to **non-commercial** use, and thefurn.co is a business site already. Hobby technically handles the agent (webhook + one daily cron), but moving to **Vercel Pro ($20 ≈ ₹1,760/month)** puts the business site and the agent on the right plan, with higher limits and support. Recommended, and your call.

### 3d. What you stop paying

- **CodeWords** plan/credits for the current agent (and its OpenAI usage), once the new agent is live.

## 4. Build plan and timeline

| Phase | What | Who | Time |
|---|---|---|---|
| **1. Meta setup** | Meta Business account → **business verification** (The Furn Projects LLP documents) → WhatsApp app in Meta's developer dashboard → display name "The Furn" | You (with step-by-step guide) | Verification: a few days |
| **2. Build on Meta's free test number** | Webhook, menu flows, AI for typed questions, booking store, alerts, human handover, opt-out, daily jobs, knowledge from website content | Me | 2–3 sessions, during phase 1 review |
| **3. Templates** | Booking confirmation, day-before reminder (site / studio), post-visit follow-up, team alert, Monday summary; written by me, submitted by you | Both | Approval minutes to a day |
| **4. Test together** | English, Hindi, Gujarati; booking end to end; handover; reminders | Both | 1 session |
| **5. Switch the real number** | Connect +91 99256 18895 to the Cloud API, **unlink the CodeWords device**, pause the CodeWords agent at the same moment (no double replies) | Both | 1 hour |
| **6. First week** | Watch every chat, fix wording; keep CodeWords paused (not deleted) as fallback; then add WhatsApp numbers to the monthly report | Me | 1 week |

## 5. Risks and how we handle them

| Risk | Handling |
|---|---|
| **Coexistence** (keeping the WhatsApp Business app on the phone for the same number) may need specific onboarding or be unavailable for this number | Check in phase 1 **before** switching. If unavailable, decide: move fully to API (team replies via a simple inbox page) or keep a second number for the team |
| Customers get two replies during switch-over | CodeWords device unlinked and agent paused in the same step |
| AI says something wrong | Knowledge only from website content; no prices, warranty terms or timelines beyond what the site states; unsure → "our team will confirm" |
| Number quality rating drops | No promotions or broadcasts; replies only; easy STOP |
| Costs higher than expected | Spend limit on the Anthropic account; monthly cost line in the report; model can be switched in one setting |

## 6. Decisions still needed

1. **Business facts for the agent:** hours (10 AM–7 PM like the site?), pincode (394510 like the site?), founded (2021 like the site?), "free site visit" wording on WhatsApp (yes/no), area served (6 cities like the site, or Surat + South Gujarat).
2. **Booking alerts go to:** Slack channel (free, recommended) and/or WhatsApp number (+91 99256 18889 or another).
3. **AI model:** Opus 5.5 (recommended) / Sonnet 5.5 / Haiku 5.5.
4. **Vercel:** stay on Hobby or move to Pro.
5. **Studio visit hours and site-visit slots** the bot may offer (e.g. Mon–Sat, 10–1 and 2–7).
