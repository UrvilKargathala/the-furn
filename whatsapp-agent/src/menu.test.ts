import { test } from "node:test";
import assert from "node:assert/strict";
import { step, parseNameArea } from "./menu.js";
import { bookableDays } from "./slots.js";

// Fixed "now": Wednesday 26 Nov 2026, 12:00 IST
const NOW = new Date("2026-11-26T06:30:00Z");

test("bookable days skip Sundays and start tomorrow", () => {
  const days = bookableDays(NOW);
  assert.equal(days[0], "2026-11-27");
  assert.ok(!days.includes("2026-11-29"), "Sunday excluded");
  assert.equal(days.length, 12); // 14 days minus 2 Sundays
});

test("full site-visit booking through the menu", () => {
  let r = step("idle", {}, { text: "Hi THE FURN, I'd like to book a site visit." }, NOW);
  assert.equal(r.step, "menu");
  r = step(r.step, r.draft, { replyId: "book_site" }, NOW);
  assert.equal(r.step, "service");
  r = step(r.step, r.draft, { replyId: "svc_kitchen" }, NOW);
  assert.equal(r.step, "details");
  r = step(r.step, r.draft, { text: "Rupal, Vesu" }, NOW);
  assert.equal(r.step, "day");
  assert.deepEqual([r.draft.name, r.draft.area], ["Rupal", "Vesu"]);
  r = step(r.step, r.draft, { replyId: "day_2026-11-28" }, NOW);
  assert.equal(r.step, "slot");
  r = step(r.step, r.draft, { replyId: "slot_s1" }, NOW);
  assert.equal(r.step, "confirm");
  r = step(r.step, r.draft, { replyId: "confirm_yes" }, NOW);
  assert.equal(r.step, "idle");
  assert.equal(r.replies[0].kind, "book");
});

test("Sunday or past days are refused", () => {
  const r = step("day", { visitType: "site", service: "kitchen", name: "A", area: "B" }, { replyId: "day_2026-11-29" }, NOW);
  assert.equal(r.step, "day");
});

test("typed question goes to the AI, then the menu continues", () => {
  const r = step("service", { visitType: "site" }, { text: "do you make pooja units?" }, NOW);
  assert.equal(r.replies[0].kind, "ai");
  assert.equal(r.replies[1].kind, "list");
  assert.equal(r.step, "service");
});

test("STOP opts out", () => {
  const r = step("menu", {}, { text: "STOP" }, NOW);
  assert.equal(r.optOut, true);
});

test("name and area parsing", () => {
  assert.deepEqual(parseNameArea("Trusha from Pal"), { name: "Trusha", area: "Pal" });
  assert.deepEqual(parseNameArea("Deepak Vesu"), { name: "Deepak", area: "Vesu" });
  assert.deepEqual(parseNameArea("Poonam"), { name: "Poonam", area: "" });
});
