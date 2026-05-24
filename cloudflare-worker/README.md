# Cloudflare Worker — Resend email proxy

This is the **only piece of server-side code** running outside Hostinger
static hosting. Its job: receive form submissions from the site, call
Resend with the API key, and reply with `{ ok: true }`. The Resend API
key never leaves Cloudflare.

## Setup (one-time, 5 min)

1. Open https://dash.cloudflare.com → sign in (free account).
2. **Workers & Pages** → **Create application** → **Hello World**
   - Worker name: `send-email` (or whatever)
   - Click **Deploy**
3. After deploy → **Edit code** → wipe the editor and paste the entire
   contents of [`send-email.js`](./send-email.js) → **Save and deploy**.
4. **Settings** tab → **Variables and Secrets** → **Add variable** for
   each (mark **Encrypt** for the API key):
   - `RESEND_API_KEY` = `re_G6rZbpRM_8hLbWCLk4C8LS8kfRgUfQ7ZM`
   - `EMAIL_FROM` = `Mini Excavations Érable <onboarding@resend.dev>`
   - `ADMIN_EMAIL` = `miniexcavationerable@gmail.com`
5. **Triggers** tab → copy the **`*.workers.dev`** URL (e.g.
   `https://send-email.your-account.workers.dev`).
6. Paste that URL in the chat — I wire it into the two forms.

## What it does

| Request | Behaviour |
|--|--|
| `OPTIONS /` | CORS preflight |
| `POST /` with form JSON | Sends 2 emails via Resend: one to admin, one to client |
| anything else | 405 |

CORS is locked to `https://excavationserable.com` — random domains can't
abuse the endpoint.

## Updating the Resend domain later

When you verify a custom sending domain in Resend (e.g.
`postmaster.excavationserable.com`), just update `EMAIL_FROM` in the
Worker Settings → Variables. No redeploy needed.
