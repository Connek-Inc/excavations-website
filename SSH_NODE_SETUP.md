# Hostinger Node.js — setup & deploy

The site runs as an **Express** server (no SvelteKit adapter-node). Express
serves the static SvelteKit build (`/build/*`) AND exposes the admin API at
`/api/*`. This matches the working pattern of `~/app/server.js` used by
elcarajoese on the same Hostinger plan (plain ESM, no top-level `await`,
LSAPI-compatible).

## Architecture

```
HTTPS request
     │
     ▼
[Hostinger LSAPI → lsnode.js]
     │   ⇣ require()s server.js (Express ESM, no TLA)
     ▼
[Express on PORT]
     ├── /api/auth/*        → JWT cookie session (bcrypt + jose)
     ├── /api/blogs         → CRUD (admin) + public reads
     ├── /api/services      → CRUD
     ├── /api/reviews       → CRUD
     ├── /api/settings      → KV store
     ├── /api/contacts      → leads from contact form
     ├── /api/soumissions   → quotes + offers + signatures + Resend email
     ├── /api/analytics     → page_views + dashboard summary
     ├── /api/ping          → health/diagnostics
     └── static fallback   → serves /build (SvelteKit static SPA)
                              MySQL ◀── Hostinger DB (u274996454_excerable)
                              Resend ◀── transactional emails
```

## One-time DB setup (5 min)

1. hPanel → **Databases** → **phpMyAdmin** → select `u274996454_excerable`.
2. Tab **SQL**, paste the contents of [`db/schema.sql`](db/schema.sql) → **Go**.
   Creates 11 tables. Idempotent — safe to re-run.
3. Paste [`db/seed.sql`](db/seed.sql) → **Go**.
   Inserts the initial admin user (`miniexcavationerable@gmail.com` /
   bcrypt hash of `escavar2026`), default services, blogs, reviews, and settings.

## One-time Node.js app setup

### 1. SSH into Hostinger

```bash
ssh -p 65002 u274996454@<HOST_FROM_HPANEL>
```

### 2. Clone the repo into the app root

The app root is the path shown in hPanel → **Advanced → Node.js → Application
root** (typically `~/domains/excavationserable.com/public_html`).

```bash
cd ~/domains/excavationserable.com/public_html

# If the directory has leftover files from earlier deploys, clear them:
rm -rf ./* ./.[!.]* 2>/dev/null || true

git clone https://github.com/Connek-Inc/excavations-website.git .
npm install --omit=dev
npm run build      # produces /build (static SvelteKit)
ls -la server.js build/200.html   # both should exist
```

### 3. Configure the Node.js app in hPanel

hPanel → **Advanced → Node.js → Edit**:

| Field | Value |
|---|---|
| Node version | **20.x** or **22.x** |
| Application mode | **Production** |
| Application root | `domains/excavationserable.com/public_html` |
| Application URL | `excavationserable.com` |
| Application startup file | **`server.js`** |

### 4. Environment variables

In the same screen → **Environment variables** → add (paste each row):

```
NODE_ENV                = production
HOST                    = 0.0.0.0
PORT                    = (leave to Hostinger default, usually 3000)

DB_HOST                 = localhost
DB_PORT                 = 3306
DB_NAME                 = u274996454_excerable
DB_USER                 = u274996454_excerable
DB_PASSWORD             = <strong-password-from-hPanel>

JWT_SECRET              = <openssl rand -base64 48>
ADMIN_EMAIL             = miniexcavationerable@gmail.com

RESEND                  = re_xxxxxxxxxxxxxxxxx
EMAIL_FROM              = Mini Excavations Érable <onboarding@resend.dev>

ALLOWED_ORIGINS         = https://excavationserable.com
PUBLIC_API_BASE         = (empty — same origin)
PUBLIC_GA4_MEASUREMENT_ID = G-XXXXXXXXXX   (optional — only if GA4 created)
```

### 5. Restart

Click **Restart** in the Node.js panel.

## Verify

Open in browser: **<https://excavationserable.com/api/ping>**

Expected response:

```json
{
  "ok": true,
  "runtime": "node",
  "node_version": "v20.x.x",
  "time": "...",
  "resend_configured": true,
  "jwt_configured": true,
  "db_configured": true,
  "db_ok": true,
  "db_error": null
}
```

The key field is `db_ok: true` — that proves MySQL is reachable. If it's
false, double-check `DB_USER` / `DB_PASSWORD` / `DB_NAME` in env vars.

Then log into **<https://excavationserable.com/mi/admin/login>** using
the seeded credentials.

## Disable static auto-deploy (one-time)

The static deploy that the repo originally used (`Deployments` panel) is
incompatible with the Node.js app — it would clobber `server.js` on every
push. Turn it off:

- hPanel → **Deployments** → **Settings** → toggle **Auto-deployment OFF**.

## Update workflow (every code change)

```bash
ssh -p 65002 u274996454@<HOST>
cd ~/domains/excavationserable.com/public_html
git pull
npm install --omit=dev    # only if package.json changed
npm run build
```

Then **Restart** in hPanel → Node.js panel (or alias `pm2 restart` if you
set that up — not required).

## Troubleshooting

- **`/api/ping` returns 502 or HTML** → app is not running. Check
  hPanel → Node.js → **Runtime logs**. Most common cause: missing env
  variable (will say in the log).
- **`db_ok: false`** with `ECONNREFUSED` → DB credentials wrong, or
  the database needs to be created in hPanel first.
- **`db_ok: false`** with `ER_ACCESS_DENIED` → wrong password.
- **Resend not sending** → check `/api/ping` for `resend_configured:true`.
  If true but no emails arrive, look at Resend dashboard → Logs.
- **Admin login says "Invalid credentials"** → the seed user wasn't
  inserted. Re-run `db/seed.sql` from phpMyAdmin.
