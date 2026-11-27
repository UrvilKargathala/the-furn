// The booking menu as a pure state machine: (current step + draft + incoming message) -> replies + next state.
// No WhatsApp or database calls here, so it can be tested on its own. Typed text the menu can't use
// becomes an "ai" reply, which the handler sends to Claude.
import { booking, business } from "./config.js";
import type { Draft } from "./db.js";
import { bookableDays, prettyDay } from "./slots.js";

export type Reply =
  | { kind: "text"; body: string }
  | { kind: "buttons"; body: string; buttons: { id: string; title: string }[] }
  | { kind: "list"; body: string; button: string; rows: { id: string; title: string; description?: string }[] }
  | { kind: "ai"; question: string }
  | { kind: "book"; draft: Required<Draft> }
  | { kind: "handover"; reason: string };

export type Result = { replies: Reply[]; step: string; draft: Draft; optOut?: boolean };
export type Incoming = { text?: string; replyId?: string; media?: boolean };

const RESTART = /^(hi|hii+|hello|hey|namaste|menu|start|book|kem cho|jai shree krishna)\b/i;

const mainMenu = (greet: boolean): Reply => ({
  kind: "buttons",
  body: greet
    ? `Hello, welcome to ${business.name}, Surat. We design, build and install modular kitchens, wardrobes and complete home interiors.\n\nHow can we help?`
    : "How can we help?",
  buttons: [
    { id: "book_site", title: "Book site visit" },
    { id: "book_studio", title: "Visit our studio" },
    { id: "talk_team", title: "Talk to our team" },
  ],
});

const serviceList = (): Reply => ({
  kind: "list",
  body: "What are you planning?",
  button: "Choose",
  rows: booking.services.map((s) => ({ id: `svc_${s.id}`, title: s.label })),
});

const dayList = (now?: Date): Reply => ({
  kind: "list",
  body: "Which day suits you? (Monday to Saturday)",
  button: "Pick a day",
  rows: bookableDays(now).slice(0, 10).map((d) => ({ id: `day_${d}`, title: prettyDay(d) })),
});

const slotButtons = (): Reply => ({
  kind: "buttons",
  body: "What time suits you?",
  buttons: booking.slots.map((s) => ({ id: `slot_${s.id}`, title: s.label })),
});

const askDetails = (d: Draft): Reply => ({
  kind: "text",
  body: d.visitType === "site"
    ? "Please type your name and area, for example: Rupal, Vesu"
    : "Please type your name, for example: Rupal",
});

function summary(d: Draft): string {
  const svc = booking.services.find((s) => s.id === d.service)?.label ?? d.service;
  const slot = booking.slots.find((s) => s.id === d.slot)?.label ?? d.slot;
  const where = d.visitType === "site" ? `Site visit, ${d.area}` : "Studio visit, Pal Gam";
  return `${where}\n${svc}\n${prettyDay(d.day!)}, ${slot}\nName: ${d.name}`;
}

const confirm = (d: Draft): Reply => ({
  kind: "buttons",
  body: `Please confirm:\n\n${summary(d)}`,
  buttons: [
    { id: "confirm_yes", title: "Confirm" },
    { id: "confirm_change", title: "Change" },
  ],
});

/** The reply that re-asks the current step (after an AI answer or an unclear message) */
export function reprompt(step: string, draft: Draft, now?: Date): Reply {
  switch (step) {
    case "service": return serviceList();
    case "details": return askDetails(draft);
    case "day": return dayList(now);
    case "slot": return slotButtons();
    case "confirm": return confirm(draft);
    default: return mainMenu(false);
  }
}

/** Split "Rupal, Vesu" / "Rupal from Vesu" / "Rupal Vesu" into name and area */
export function parseNameArea(text: string): { name: string; area: string } {
  const t = text.trim().replace(/\s+/g, " ");
  const parts = t.split(/\s*(?:,|-|\bfrom\b|\bin\b)\s*/i).filter(Boolean);
  if (parts.length >= 2) return { name: parts[0], area: parts.slice(1).join(", ") };
  const words = t.split(" ");
  return words.length >= 2 ? { name: words[0], area: words.slice(1).join(" ") } : { name: t, area: "" };
}

export function step(current: string, draft: Draft, msg: Incoming, now?: Date): Result {
  const text = msg.text?.trim() ?? "";
  const id = msg.replyId ?? "";

  if (/^stop$/i.test(text)) {
    return { replies: [{ kind: "text", body: "Understood. We won't send reminders or follow-ups. Message us any time if you need us." }], step: "idle", draft: {}, optOut: true };
  }
  if (msg.media) {
    return { replies: [{ kind: "text", body: "Thank you for sending this. Our team will take a look." }, { kind: "handover", reason: "Customer sent a photo, voice note or file" }, reprompt(current, draft, now)], step: current, draft };
  }
  if (RESTART.test(text) && text.split(/\s+/).length <= 4) return { replies: [mainMenu(true)], step: "menu", draft: {} };

  // Button and list taps
  if (id === "book_site" || id === "book_studio") {
    const d: Draft = { visitType: id === "book_site" ? "site" : "studio" };
    return { replies: [serviceList()], step: "service", draft: d };
  }
  if (id === "talk_team") {
    return { replies: [{ kind: "text", body: `Thank you. A member of our team will reply here shortly (${business.hours}).` }, { kind: "handover", reason: "Customer asked to talk to the team" }], step: "idle", draft: {} };
  }
  if (id.startsWith("svc_") && current === "service") {
    const d = { ...draft, service: id.slice(4) };
    return { replies: [askDetails(d)], step: "details", draft: d };
  }
  if (id.startsWith("day_") && current === "day") {
    const day = id.slice(4);
    if (!bookableDays(now).includes(day)) return { replies: [dayList(now)], step: "day", draft };
    return { replies: [slotButtons()], step: "slot", draft: { ...draft, day } };
  }
  if (id.startsWith("slot_") && current === "slot") {
    const d = { ...draft, slot: id.slice(5) };
    return { replies: [confirm(d)], step: "confirm", draft: d };
  }
  if (id === "confirm_yes" && current === "confirm") {
    const d = draft as Required<Draft>;
    return {
      replies: [
        { kind: "book", draft: d },
        { kind: "text", body: `Thank you, ${d.name}. Your request is noted:\n\n${summary(d)}\n\nOur team will confirm on WhatsApp shortly.${d.visitType === "studio" ? `\n\nStudio: ${business.studio}\n${business.maps}` : ""}` },
      ],
      step: "idle",
      draft: {},
    };
  }
  if (id === "confirm_change" && current === "confirm") {
    return { replies: [serviceList()], step: "service", draft: { visitType: draft.visitType } };
  }

  // Typed text the current step expects
  if (current === "details" && text) {
    const { name, area } = draft.visitType === "site" ? parseNameArea(text) : { name: text, area: "" };
    if (draft.visitType === "site" && !area) return { replies: [{ kind: "text", body: "Thanks! Which area is the site in? (for example: Vesu, Adajan, Pal)" }], step: "details_area", draft: { ...draft, name } };
    const d = { ...draft, name, area };
    return { replies: [dayList(now)], step: "day", draft: d };
  }
  if (current === "details_area" && text) {
    const d = { ...draft, area: text };
    return { replies: [dayList(now)], step: "day", draft: d };
  }

  // Anything else that was typed goes to the AI, then the menu continues where it was
  if (text) return { replies: [{ kind: "ai", question: text }, reprompt(current === "idle" ? "menu" : current, draft, now)], step: current === "idle" ? "menu" : current, draft };

  // A tap that doesn't fit the current step (an old message): show where we are
  return { replies: [reprompt(current, draft, now)], step: current, draft };
}
