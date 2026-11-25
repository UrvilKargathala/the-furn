import { createHmac, randomUUID } from "node:crypto";
import { budgets, enquiryTypes } from "../../content/site";

type Body = Record<string, unknown>;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Receives the contact form and delivers it two ways: the Modusys CRM (signed webhook) and email (Resend).
export async function POST(req: Request) {
  let b: Body;
  try { b = await req.json(); } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }

  // Hidden field that real visitors never fill in: quietly accept and drop bot posts
  if (str(b.company, 100)) return Response.json({ ok: true });

  const name = str(b.name, 120), phone = str(b.phone, 30), email = str(b.email, 160), city = str(b.city, 120), state = str(b.state, 80);
  const type = str(b.type, 60), message = str(b.message, 3000), budgetKey = str(b.budget, 20);
  const budget = budgets.find((x) => x.v === budgetKey);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name";
  if (!/^[+\d][\d\s()-]{8,}$/.test(phone)) errors.phone = "Please enter a valid phone number";
  // Email is optional, but must be valid when given
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email";
  if (state.length < 2) errors.state = "Please choose your state";
  if (city.length < 2) errors.city = "Please choose your city";
  if (!budget) errors.budget = "Please choose a budget";
  if (type && !enquiryTypes.includes(type)) errors.type = "Please choose from the list";
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const inquiry: Inquiry = { name, phone, email, state, city, type, message, budget: budget!, pageUrl: str(b.pageUrl, 500) || req.headers.get("referer") || "" };

  // The two channels run side by side and never depend on each other.
  // The visitor sees success if either one delivered; an error only if both failed.
  const [crm, mail] = await Promise.all([sendToModusys(inquiry), sendEmail(inquiry)]);
  if (crm === "ok" || mail === "ok") return Response.json({ ok: true });
  if (crm === "off" && mail === "off") {
    console.warn("Contact form: no delivery channel configured, enquiry not delivered");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }
  return Response.json({ error: "send_failed" }, { status: 502 });
}

type Inquiry = { name: string; phone: string; email: string; state: string; city: string; type: string; message: string; budget: (typeof budgets)[number]; pageUrl: string };
type Result = "ok" | "failed" | "off";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Signed webhook into the Modusys CRM (MODUSYS_WEBHOOK_URL + THEFURN_WEBHOOK_SECRET, server-only).
// Up to 3 attempts on network errors, 429 and 5xx, all with the same externalId so Modusys merges repeats.
// Logs status codes only: never the visitor's details or the secret.
async function sendToModusys(q: Inquiry): Promise<Result> {
  const url = process.env.MODUSYS_WEBHOOK_URL, secret = process.env.THEFURN_WEBHOOK_SECRET;
  if (!url || !secret) return "off";
  const opt = (v: string) => v || undefined;
  const body = JSON.stringify({
    externalId: randomUUID(),
    submittedAt: new Date().toISOString(),
    name: q.name, phone: q.phone,
    email: opt(q.email), state: opt(q.state), city: opt(q.city), inquiryType: opt(q.type),
    budgetLabel: q.budget.t, tier: q.budget.tier, message: opt(q.message), pageUrl: opt(q.pageUrl),
  });
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) await sleep(attempt * 600);
    // Fresh timestamp each attempt so a retry stays inside the 5-minute window
    const ts = String(Date.now());
    const sig = createHmac("sha256", secret).update(`${ts}.${body}`).digest("hex");
    try {
      const res = await fetch(url, {
        method: "POST", body, signal: AbortSignal.timeout(8000),
        headers: { "Content-Type": "application/json", "X-TheFurn-Timestamp": ts, "X-TheFurn-Signature": sig },
      });
      if (res.status === 200 || res.status === 201) return "ok";
      console.error("Contact form: Modusys webhook returned", res.status);
      if (res.status !== 429 && res.status < 500) return "failed"; // 401 / 422: retrying won't help
    } catch (e) {
      console.error("Contact form: Modusys webhook network error", e instanceof Error ? e.name : "unknown");
    }
  }
  return "failed";
}

// Email copy through Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set
async function sendEmail(q: Inquiry): Promise<Result> {
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return "off";
  const text = [
    `Customer category: ${q.budget.tier} (${q.budget.t})`,
    `Name: ${q.name}`, `Phone: ${q.phone}`, `Email: ${q.email || "Not given"}`, `City: ${q.city}, ${q.state}`,
    `Looking for: ${q.type || "Not specified"}`, "", q.message || "(no message)",
  ].join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(10000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "The Furn <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        ...(q.email && { reply_to: q.email }),
        subject: `[${q.budget.tier}] New enquiry from ${q.name}`,
        text,
      }),
    });
    if (res.ok) return "ok";
    console.error("Contact form: Resend error", res.status);
  } catch (e) {
    console.error("Contact form: Resend network error", e instanceof Error ? e.name : "unknown");
  }
  return "failed";
}
