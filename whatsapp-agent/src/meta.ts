// WhatsApp Cloud API: verify webhook signatures and send messages (text, buttons, lists).
import { createHmac, timingSafeEqual } from "node:crypto";
import { config } from "./config.js";

/** Meta signs every webhook body with the app secret (X-Hub-Signature-256: sha256=<hex>) */
export function validSignature(rawBody: string, header: string | undefined): boolean {
  if (!header?.startsWith("sha256=") || !config.meta.appSecret) return false;
  const expected = createHmac("sha256", config.meta.appSecret).update(rawBody).digest("hex");
  const got = header.slice(7);
  return got.length === expected.length && timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}

type Button = { id: string; title: string };
type Row = { id: string; title: string; description?: string };

async function send(to: string, payload: Record<string, unknown>): Promise<void> {
  const url = `https://graph.facebook.com/${config.meta.graphVersion}/${config.meta.phoneNumberId}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.meta.accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", to, ...payload }),
  });
  if (!res.ok) throw new Error(`WhatsApp send failed ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export const sendText = (to: string, body: string) => send(to, { type: "text", text: { body, preview_url: false } });

/** Up to 3 reply buttons (titles max 20 characters) */
export const sendButtons = (to: string, body: string, buttons: Button[]) =>
  send(to, {
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: body },
      action: { buttons: buttons.slice(0, 3).map((b) => ({ type: "reply", reply: { id: b.id, title: b.title.slice(0, 20) } })) },
    },
  });

/** A list behind one button (up to 10 rows; titles max 24 characters) */
export const sendList = (to: string, body: string, button: string, rows: Row[]) =>
  send(to, {
    type: "interactive",
    interactive: {
      type: "list",
      body: { text: body },
      action: { button: button.slice(0, 20), sections: [{ title: "Options", rows: rows.slice(0, 10).map((r) => ({ id: r.id, title: r.title.slice(0, 24), description: r.description?.slice(0, 72) })) }] },
    },
  });

/** Blue ticks on the customer's message */
export async function markRead(messageId: string): Promise<void> {
  const url = `https://graph.facebook.com/${config.meta.graphVersion}/${config.meta.phoneNumberId}/messages`;
  await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.meta.accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", status: "read", message_id: messageId }),
  }).catch(() => {});
}

/** Inbound message, normalised from Meta's webhook payload */
export type Inbound = { id: string; from: string; name: string; text?: string; replyId?: string; media?: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseWebhook(body: any): Inbound[] {
  const out: Inbound[] = [];
  for (const entry of body?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      const v = change?.value;
      const names: Record<string, string> = {};
      for (const c of v?.contacts ?? []) names[c.wa_id] = c?.profile?.name ?? "";
      for (const m of v?.messages ?? []) {
        const msg: Inbound = { id: m.id, from: m.from, name: names[m.from] ?? "" };
        if (m.type === "text") msg.text = m.text?.body ?? "";
        else if (m.type === "interactive") msg.replyId = m.interactive?.button_reply?.id ?? m.interactive?.list_reply?.id;
        else if (m.type === "button") msg.text = m.button?.text ?? "";
        else msg.media = true;
        out.push(msg);
      }
    }
  }
  return out;
}
