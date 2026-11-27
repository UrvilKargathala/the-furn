// Runs one incoming WhatsApp message: skips repeats, paused or opted-out chats, steps the menu,
// then sends the replies, saves bookings and alerts the team.
import { booking, config, TEAM_PAUSE_HOURS } from "./config.js";
import { addBooking, firstTime, saveChat, touchChat, type Turn } from "./db.js";
import { markRead, sendButtons, sendList, sendText, type Inbound } from "./meta.js";
import { step, type Reply } from "./menu.js";
import { prettyDay } from "./slots.js";
import { answer } from "./ai.js";

const HISTORY_TURNS = 20;

export async function handleInbound(m: Inbound): Promise<void> {
  if (!(await firstTime(m.id))) return;
  const chat = await touchChat(m.from, m.name);
  void markRead(m.id);

  // A team member is handling this chat, so stay quiet (STOP still works)
  const paused = chat.paused_until && new Date(chat.paused_until) > new Date();
  if (paused && !/^stop$/i.test(m.text?.trim() ?? "")) return;

  const result = step(chat.step, chat.draft ?? {}, { text: m.text, replyId: m.replyId, media: m.media });
  const history: Turn[] = [...(chat.history ?? [])];
  if (m.text) history.push({ role: "user", content: m.text });

  for (const r of result.replies) await run(m.from, chat.name || m.name, r, history);

  await saveChat(m.from, {
    step: result.step,
    draft: result.draft,
    history: history.slice(-HISTORY_TURNS),
    ...(result.optOut ? { opted_out: true } : {}),
  });
}

async function run(to: string, name: string, r: Reply, history: Turn[]): Promise<void> {
  switch (r.kind) {
    case "text":
      history.push({ role: "assistant", content: r.body });
      return sendText(to, r.body);
    case "buttons":
      return sendButtons(to, r.body, r.buttons);
    case "list":
      return sendList(to, r.body, r.button, r.rows);
    case "ai": {
      const reply = await answer(r.question, history.slice(0, -1), name);
      history.push({ role: "assistant", content: reply });
      return sendText(to, reply);
    }
    case "book": {
      const d = r.draft;
      const id = await addBooking({ phone: to, name: d.name, visitType: d.visitType, service: d.service, area: d.area, day: d.day, slot: d.slot });
      const svc = booking.services.find((s) => s.id === d.service)?.label ?? d.service;
      const slot = booking.slots.find((s) => s.id === d.slot)?.label ?? d.slot;
      await alertTeam(
        `NEW BOOKING #${id} - The Furn\nName: ${d.name}\nPhone: +${to}\nType: ${d.visitType} visit\nNeed: ${svc}\nArea: ${d.area || "-"}\nWhen: ${prettyDay(d.day)}, ${slot}\n\nPlease confirm with the customer.`,
      );
      return;
    }
    case "handover":
      return alertTeam(`The Furn WhatsApp: please reply to +${to}${name ? ` (${name})` : ""}.\nReason: ${r.reason}`);
  }
}

/**
 * Team alert to OWNER_PHONE. A free-form message only reaches the owner inside an open 24-hour window;
 * outside it Meta needs an approved template (added in the templates step). Failures are logged, never thrown,
 * so a customer's booking is never lost because an alert failed.
 */
async function alertTeam(body: string): Promise<void> {
  try {
    await sendText(config.ownerPhone, body);
  } catch (e) {
    console.error("team alert failed", (e as Error).message);
  }
}

export { TEAM_PAUSE_HOURS };
