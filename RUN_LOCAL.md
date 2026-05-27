# Running excavations-website locally with connek-api

End-to-end local setup: SvelteKit landing → connek-api FastAPI backend →
Supabase Postgres + Resend. Everything stays on your machine except the
Supabase DB and (optionally) Resend.

## 1. Start connek-api (backend, port 5001)

```bash
cd ~/Documentos/connek/connek-ai
source venv/bin/activate
nohup uvicorn main:app --host 127.0.0.1 --port 5001 > /tmp/connek-ai.log 2>&1 &
disown
```

Wait ~12 seconds for startup. Verify:

```bash
curl http://127.0.0.1:5001/                       # → {"status":"ok",...}
curl http://127.0.0.1:5001/openapi.json | jq '.paths | keys | length'
```

If you see `WARNING: Backend is using 'SUPABASE_KEY' (likely Anon)` in the
log, RLS will block API key lookups. Copy a service-role key into
`.env`:

```bash
grep '^SUPABASE_SERVICE_ROLE_KEY=' ~/Documentos/connek/connek-api-client-public-key/.env \
  >> ~/Documentos/connek/connek-ai/.env
```

Restart uvicorn after editing `.env`.

To stop:

```bash
pkill -KILL -f "uvicorn main:app --host 127.0.0.1 --port 5001"
```

## 2. Start the SvelteKit landing

```bash
cd ~/Documentos/connek/excavations-website
npm install      # first time only
npm run dev      # → http://localhost:5173
```

## 3. Environment vars already configured

`excavations-website/.env` already has:

```
CONNEK_API_BASE_URL=http://localhost:5001
CONNEK_API_KEY_ID=ck_live_nw5KOBH_cAERiCPTEy-Zx7
CONNEK_API_KEY_SECRET=ck_sec_-CF22oWw8-Kkr5T7MSFU93SLfBJDV7POIiRsJDZHqnKuC6TZ
```

These point to PE LABS (business_id 225) in connek-ai. The secret is the
real AES-decrypted value of the row in `api_keys`. Both keys are
server-only — they never reach the browser.

## 4. End-to-end test

1. Open http://localhost:5173/soumission (or wherever your form lives).
2. Fill it in. Submit.
3. The browser POSTs to `/api/connek/submission`.
4. SvelteKit signs HMAC + forwards to `http://localhost:5001/api/v1/quotes/submission`.
5. connek-ai inserts a `quote` row (`quote_kind='submission'`,
   `status='nouvelle'`), mints a magic-link token, fires two emails
   (client confirmation + business alert) via Resend.
6. Browser receives `{ token, tracking_url }` and you can navigate to
   `/soumission/<token>` to see the tracking page.

## 5. Verify in DB

```bash
# From any client with the supabase credentials:
psql "$SUPABASE_DB_URL" -c "
  SELECT id, quote_kind, status, business_id, description, created_at
  FROM quote ORDER BY created_at DESC LIMIT 5
"
```

You should see the new row with `quote_kind='submission'`.

## 6. Known issues

- **Emails not landing** → the `RESEND` env var in `connek-ai/.env` may
  be invalid. Update to a fresh Resend API key from resend.com → API Keys.
- **Tracking page (`/soumission/<token>`) errors** → make sure connek-ai
  is still running on port 5001. SvelteKit will throw 500.
- **First request after editing connek-ai code** → uvicorn is *not* in
  `--reload` mode (it crashes on startup with reload). Manually
  pkill + restart.

## 7. cURL smoke test (bypasses the SvelteKit form)

```bash
python3 ~/Documentos/connek/connek-ai/scripts/local_submission_test.py
```

(See [scripts/local_submission_test.py](../connek-ai/scripts/local_submission_test.py))
