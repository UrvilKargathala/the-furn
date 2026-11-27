// Web server for Meta's webhook (reached through the Cloudflare tunnel at wa.thefurn.co).
//   GET  /webhook  Meta's one-time verification (hub.challenge)
//   POST /webhook  incoming messages, checked against Meta's signature
//   GET  /health   container health check
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "./config.js";
import { migrate } from "./db.js";
import { handleInbound } from "./handler.js";
import { parseWebhook, validSignature } from "./meta.js";

const app = new Hono();

app.get("/health", (c) => c.text("ok"));

app.get("/webhook", (c) => {
  const mode = c.req.query("hub.mode");
  const token = c.req.query("hub.verify_token");
  const challenge = c.req.query("hub.challenge") ?? "";
  if (mode === "subscribe" && config.meta.verifyToken && token === config.meta.verifyToken) return c.text(challenge);
  return c.text("forbidden", 403);
});

app.post("/webhook", async (c) => {
  const raw = await c.req.text();
  if (!validSignature(raw, c.req.header("x-hub-signature-256"))) return c.text("bad signature", 401);
  let body: unknown;
  try { body = JSON.parse(raw); } catch { return c.text("bad json", 400); }
  // Reply to Meta at once; process in the background (Meta retries slow or failed deliveries)
  for (const m of parseWebhook(body)) {
    handleInbound(m).catch((e) => console.error("handle failed", m.id, (e as Error).message));
  }
  return c.text("ok");
});

await migrate();
serve({ fetch: app.fetch, port: config.port }, (info) => console.log(`The Furn WhatsApp agent on :${info.port}`));
