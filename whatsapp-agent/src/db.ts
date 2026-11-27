// Postgres on the office server: chats (menu state, history, pauses, opt-outs), bookings, handled message IDs.
import pg from "pg";
import { config } from "./config.js";

export const pool = new pg.Pool({ connectionString: config.databaseUrl, max: 5 });

export async function migrate(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chats (
      phone        text PRIMARY KEY,
      name         text NOT NULL DEFAULT '',
      step         text NOT NULL DEFAULT 'idle',
      draft        jsonb NOT NULL DEFAULT '{}'::jsonb,
      history      jsonb NOT NULL DEFAULT '[]'::jsonb,
      window_start timestamptz,
      paused_until timestamptz,
      opted_out    boolean NOT NULL DEFAULT false,
      first_seen   timestamptz NOT NULL DEFAULT now(),
      updated_at   timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS bookings (
      id          bigserial PRIMARY KEY,
      phone       text NOT NULL,
      name        text NOT NULL,
      visit_type  text NOT NULL CHECK (visit_type IN ('site','studio')),
      service     text NOT NULL,
      area        text NOT NULL DEFAULT '',
      day         date NOT NULL,
      slot        text NOT NULL,
      notes       text NOT NULL DEFAULT '',
      status      text NOT NULL DEFAULT 'requested',
      reminded    boolean NOT NULL DEFAULT false,
      followed_up boolean NOT NULL DEFAULT false,
      created_at  timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS bookings_day ON bookings(day);
    CREATE TABLE IF NOT EXISTS handled (
      message_id text PRIMARY KEY,
      at         timestamptz NOT NULL DEFAULT now()
    );
  `);
}

export type Draft = { visitType?: "site" | "studio"; service?: string; name?: string; area?: string; day?: string; slot?: string };
export type Turn = { role: "user" | "assistant"; content: string };
export type Chat = { phone: string; name: string; step: string; draft: Draft; history: Turn[]; paused_until: Date | null; opted_out: boolean };

/** True the first time a message ID is seen (Meta can deliver the same message twice) */
export async function firstTime(messageId: string): Promise<boolean> {
  const r = await pool.query("INSERT INTO handled(message_id) VALUES ($1) ON CONFLICT DO NOTHING", [messageId]);
  return r.rowCount === 1;
}

/** Load (or create) the chat; every customer message reopens the 24-hour window */
export async function touchChat(phone: string, name: string): Promise<Chat> {
  const r = await pool.query(
    `INSERT INTO chats(phone, name, window_start) VALUES ($1, $2, now())
     ON CONFLICT (phone) DO UPDATE SET window_start = now(), updated_at = now(),
       name = CASE WHEN $2 <> '' THEN $2 ELSE chats.name END
     RETURNING phone, name, step, draft, history, paused_until, opted_out`,
    [phone, name],
  );
  return r.rows[0];
}

type Patch = { step?: string; draft?: Draft; history?: Turn[]; opted_out?: boolean; paused_until?: Date | null };

export async function saveChat(phone: string, patch: Patch): Promise<void> {
  const sets: string[] = [];
  const vals: unknown[] = [phone];
  for (const [k, v] of Object.entries(patch)) {
    vals.push(k === "draft" || k === "history" ? JSON.stringify(v) : v);
    sets.push(`${k} = $${vals.length}`);
  }
  if (!sets.length) return;
  await pool.query(`UPDATE chats SET ${sets.join(", ")}, updated_at = now() WHERE phone = $1`, vals);
}

/** A team member replied by hand: keep the bot quiet in this chat for a while */
export async function pauseChat(phone: string, hours: number): Promise<void> {
  await pool.query(
    `INSERT INTO chats(phone, paused_until) VALUES ($1, now() + make_interval(hours => $2::int))
     ON CONFLICT (phone) DO UPDATE SET paused_until = now() + make_interval(hours => $2::int), updated_at = now()`,
    [phone, hours],
  );
}

export type NewBooking = { phone: string; name: string; visitType: "site" | "studio"; service: string; area: string; day: string; slot: string; notes?: string };

export async function addBooking(b: NewBooking): Promise<number> {
  const r = await pool.query(
    `INSERT INTO bookings(phone, name, visit_type, service, area, day, slot, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    [b.phone, b.name, b.visitType, b.service, b.area, b.day, b.slot, b.notes ?? ""],
  );
  return Number(r.rows[0].id);
}
