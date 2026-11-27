# The Furn WhatsApp Agent: Final Plan

- **Number:** +91 99256 18895
- **Replaces:** the CodeWords "THE FURN WhatsApp Agent"
- **Status:** final plan, approved direction. Nothing has been built or changed yet (27 Nov 2026).

| Decision | Choice |
|---|---|
| WhatsApp connection | **Official Meta WhatsApp Cloud API, direct** (no provider, no unofficial linked device) |
| Bot style | **Menu + AI**: buttons for booking, Claude AI only when a customer types a question |
| Where it runs | **The Furn's own office server** (Coolify), new project "The Furn WhatsApp" |
| Public address | **wa.thefurn.co** through a Cloudflare tunnel (no ports opened) |
| Storage | Database on the same office server (chats, bookings, opt-outs) |
| Knowledge | Read from the website (`thefurn.co/llms-full.txt`), so WhatsApp always matches the site |

---

## 1. What customers experience

1. A customer messages **+91 99256 18895**, from the website's WhatsApp buttons or directly.
2. **Menu first** (free and instant):
   `[ Book site visit ]` `[ Visit our studio ]` `[ Talk to our team ]`
   then a list of services, then name and area, then the day and a time slot.
3. **If they type a question** ("do you make pooja units?", "kal aavi shako?"), the **AI answers** in English, Hindi or Gujarati using the website's content, then shows the buttons again. The AI can also take a booking from free text.
4. **When a visit is booked**, the customer gets a confirmation and the team gets an alert.
5. **Automatically:** a reminder the day before the visit, a follow-up 2 days after a site visit, and a summary for the owner every Monday.
6. **The team stays in control:**
   - a team member replying by hand pauses the bot in that chat for 12 hours
   - saved contacts and group chats are ignored
   - customers can reply STOP to stop reminders and follow-ups

## 2. How it is built

```
Customer → WhatsApp → Meta Cloud API ──webhook──► wa.thefurn.co
                                                     │  (Cloudflare tunnel, no open ports)
                                                     ▼
                        Office server · Coolify project "The Furn WhatsApp"
                          ├─ agent ........ menu engine + Claude for typed questions
                          ├─ database ..... chats, bookings, opt-outs, team pauses
                          ├─ scheduler .... daily 7 PM: reminders, follow-ups, Monday summary
                          └─ backups ...... daily database backup
                                                     │
                     knowledge ◄── thefurn.co/llms-full.txt (website content)
                     alerts ─────► team (Slack and/or WhatsApp)
```

| Part | Details |
|---|---|
| Server | The office Coolify server that already runs media.thefurn.co |
| Coolify project | New, separate project **"The Furn WhatsApp"** (next to "The Furn Media"). Modusys is never touched |
| Address | **wa.thefurn.co**, a new Cloudflare tunnel route; inbound ports 80/443 stay closed |
| Agent | Small web service: receives Meta webhooks, runs the menu, calls Claude when needed, replies through Meta |
| Database | Runs in the same Coolify project; data never leaves The Furn's server except for the message being answered (sent to Meta and, for typed questions, to Claude) |
| Scheduler | Built into the agent, runs daily at 7 PM IST |
| Secrets | Meta access token, Meta app secret and Anthropic key are stored only as Coolify environment variables, never in code or documents |
| Security | Every incoming request is checked against Meta's signature; fake or tampered requests are rejected |
| Backups | Daily database backup using Coolify's scheduled backups |

## 3. What the database stores

| Data | Why |
|---|---|
| Menu step per customer | Knows what to ask next during a booking |
| Last ~20 messages per chat | Lets the AI understand replies in context |
| Bookings | Confirmations, reminders, follow-ups, Monday summary |
| Team pauses | Bot stays quiet for 12 hours after a team member replies |
| Opt-outs (STOP) | Never sends reminders to people who opted out |
| Handled message IDs | Meta can send the same message twice; prevents double replies |
| 24-hour window start | Knows when a free reply is allowed and when a template is needed |

## 4. Costs

Assumptions: ₹88 = $1; each enquiry ≈ 8 bot replies; ≈40% of replies need AI; half of enquiries book a visit. Meta's India rates are listed only in its INR rate card, so Meta figures are estimates to confirm at setup.

### Monthly running cost

| Item | Quiet month (60 enquiries) | Busy month (200 enquiries) |
|---|---|---|
| Meta: customer messages to you | ₹0 | ₹0 |
| Meta: bot replies (first 1,000 a month free) | ₹0 | ≈ ₹70 |
| Meta: reminder and follow-up templates | ≈ ₹10 | ≈ ₹25 |
| Team alerts (WhatsApp templates to +91 99256 18889) | ≈ ₹5 | ≈ ₹15 |
| AI: Sonnet 5.5, with Opus 5.5 for harder chats (typed questions only) | ≈ ₹180–300 | ≈ ₹600–1,000 |
| Office server, database, tunnel, backups | ₹0 (own server) | ₹0 |
| **Total** | **≈ ₹190–310** | **≈ ₹700–1,100** |

Model split: Sonnet 5.5 answers most typed questions; Opus 5.5 (about 2x the cost per reply) is used only for harder chats. Either model can be changed in one setting.

### One-time costs

| Item | Cost |
|---|---|
| Meta Business account, verification, display name, templates | ₹0 |
| Anthropic API account | ₹0 to open; prepaid credits (minimum ≈ $5 ≈ ₹440) |
| Coolify project, tunnel route, database | ₹0 |
| Build, testing, switch-over | Done in these sessions |

### Savings

- The CodeWords plan and its OpenAI usage, once the new agent is live.

The Vercel plan (Hobby or Pro) is now a separate decision about the **website only**; the agent does not run on Vercel.

## 5. Build plan

| Phase | What | Who | Time |
|---|---|---|---|
| **1. Meta setup** | Meta Business account → business verification (The Furn Projects LLP documents) → WhatsApp app in Meta's developer dashboard → display name "The Furn". Check **coexistence** (keeping the WhatsApp Business app on the phone) | You, with a step-by-step guide | Verification: a few days |
| **2. Server setup** | New Coolify project "The Furn WhatsApp", database, daily backups, Cloudflare tunnel route **wa.thefurn.co** | Me, with you saving in Coolify (Coolify saves need a manual click) | 1 session |
| **3. Build the agent** | Webhook + signature check, menu flows, AI for typed questions, bookings, alerts, team pause, STOP, scheduler, knowledge from the website. Tested on **Meta's free test number** | Me | 2–3 sessions, during phase 1 review |
| **4. Templates** | Booking confirmation, day-before reminder (site and studio), follow-up, team alert, Monday summary. I write them, you submit them in Meta | Both | Approval minutes to a day |
| **5. Test together** | English, Hindi, Gujarati; full booking; team takeover; reminders | Both | 1 session |
| **6. Switch the real number** | Connect +91 99256 18895 to the Cloud API, **unlink the CodeWords device and pause the CodeWords agent at the same moment** (no double replies) | Both | 1 hour |
| **7. First week** | Watch every chat and fix wording; keep CodeWords paused (not deleted) as a fallback; add WhatsApp numbers to the monthly report | Me | 1 week |

## 6. Risks and how they are handled

| Risk | Handling |
|---|---|
| **Coexistence** may need specific onboarding or not be available for this number | Checked in phase 1 **before** switching. If unavailable: move fully to the API with a simple team inbox page, or keep a second number for the team |
| **Office internet or power goes down** | Meta retries webhook delivery for a while; the team still sees messages in the WhatsApp Business app (with coexistence). UPS and stable internet recommended; the server restarts the agent automatically |
| **Shared server with Modusys** | Separate Coolify project, light resource use, Modusys never touched |
| Customers get two replies during switch-over | CodeWords device unlinked and agent paused in the same step |
| AI says something wrong | Knowledge only from the website; no prices, warranty terms or timelines beyond what the site says; when unsure: "our team will confirm" |
| Number quality rating drops | No promotions or broadcasts; replies only; easy STOP |
| Costs higher than expected | Spend limit on the Anthropic account; monthly cost line in the report; model can be changed in one setting |
| Data loss | Daily database backups on the server |

## 7. Decisions (confirmed 27 Nov 2026)

| Topic | Decision |
|---|---|
| Hours | Monday to Saturday, 10 AM to 7 PM; Sunday closed |
| Pincode | 394510 |
| Founded | 2021 |
| Site visit wording | "Site visit" only; never "free site visit" |
| Area served | Surat, Mumbai, Navi Mumbai, Ahmedabad, Hyderabad, Pune |
| Booking alerts | WhatsApp to +91 99256 18889 (template message) |
| AI models | Claude **Sonnet 5.5** for everyday typed questions; **Opus 5.5** takes over for harder chats (complex Gujarati/Hindi, unhappy customers, free-text bookings) |
| Visit slots | Monday to Saturday; 10 AM–1 PM, 2–5 PM, 5–7 PM; same for site and studio visits; bookable up to 14 days ahead; the team confirms each booking |
| Website hosting | Vercel Hobby (separate from the agent) |
