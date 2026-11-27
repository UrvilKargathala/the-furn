# The Furn WhatsApp agent

Official Meta WhatsApp Cloud API + booking menu + Claude for typed questions. Runs on The Furn's office server (Coolify project "The Furn WhatsApp"), reached at **wa.thefurn.co** through a Cloudflare tunnel. Plan: `../docs/whatsapp-agent-plan.md`.

## Status

| Part | State |
|---|---|
| Webhook (verify + Meta signature check) | Built |
| Booking menu (site/studio, service, name/area, day, slot, confirm) | Built and tested |
| Database (Postgres: chats, bookings, handled IDs) | Built |
| Team alerts to +91 99256 18889 | Built (free-form; template needed outside 24 h) |
| STOP opt-out, repeat-message protection, team pause | Built (team-reply detection comes with coexistence) |
| Claude answers (Sonnet 5.5, Opus 5.5 for harder chats) | Next |
| Daily 7 PM reminders, follow-ups, Monday summary | Next |
| Message templates | Next (needs Meta account) |
| Coolify deploy + wa.thefurn.co tunnel | Next (needs your Coolify save clicks) |

## Run checks

```bash
npm install
npm run typecheck
npm test
```

## Deploy (Coolify)

`docker-compose.yml` runs three containers: `agent`, `db` (Postgres 17, volume `wa-db`) and `cloudflared`. No host ports are published. Set the environment variables listed in `.env.example` in Coolify (never commit real values), including `DB_PASSWORD` and `CF_TUNNEL_TOKEN`.
