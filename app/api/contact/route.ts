import { budgets, enquiryTypes } from "../../data";

type Body = Record<string, unknown>;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Receives the contact form. Mail goes out through Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set.
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email";
  if (state.length < 2) errors.state = "Please choose your state";
  if (city.length < 2) errors.city = "Please choose your city";
  if (!budget) errors.budget = "Please choose a budget";
  if (type && !enquiryTypes.includes(type)) errors.type = "Please choose from the list";
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.warn("Contact form: RESEND_API_KEY / CONTACT_TO_EMAIL not set, enquiry not delivered");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const text = [
    `Customer category: ${budget!.tier} (${budget!.t})`,
    `Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`, `City: ${city}, ${state}`,
    `Looking for: ${type || "Not specified"}`, "", message || "(no message)",
  ].join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "The Furn <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject: `[${budget!.tier}] New enquiry from ${name}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error("Contact form: Resend error", res.status);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
