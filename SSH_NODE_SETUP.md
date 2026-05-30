# Hostinger Node.js — setup & deploy

Stack:
- **SvelteKit con `@sveltejs/adapter-static`** — produce un bundle estático
  bajo `build/` (HTML + JS + CSS, nada de SSR ni `+page.server.ts`).
- **`server.js` (Express, ESM)** — sirve la build estática Y aloja los
  proxies `/api/connek/*` que firman HMAC server-side hacia el gateway
  Connek en `api.dev.connek.ca`.

Hostinger LSAPI (LiteSpeed Server API) levanta `server.js` automáticamente
desde el root del proyecto. **No hay que registrar nada en el panel de
Node.js de hPanel** — esa fue la fuente de dolor que evitamos.

## Setup inicial (una vez)

### 1. SSH

```bash
ssh -p 65002 u274996454@<HOST>
cd ~/domains/excavationserable.com/public_html
```

### 2. Node + npm vía nvm

Si no lo tenés:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22 && nvm use 22
```

### 3. Variables de entorno

Copiar `.env.example` → `.env` y rellenar:

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

PUBLIC_API_BASE=
PUBLIC_GA4_MEASUREMENT_ID=G-NOOP

CONNEK_API_BASE_URL=https://api.dev.connek.ca
CONNEK_API_KEY_ID=ck_live_xxxxxxxxxxxxxxxxxxxxxx
CONNEK_API_KEY_SECRET=ck_sec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Las 3 `CONNEK_API_*` son críticas — sin ellas el form devuelve 500 y el
lead no llega. **Nunca exponer `KEY_SECRET`** al browser; solo Express
lo usa dentro de `server.js`.

### 4. Build inicial

```bash
npm install
npm run build
ls build/index.html       # debe existir
ls build/200.html          # SPA fallback (servido por Express)
```

Después en hPanel → **Restart** la app si ya estaba corriendo. Si es la
primera vez, abrí el dominio en el browser: LSAPI debería arrancar el
`server.js` al primer request.

## Update workflow (cada cambio de código)

```bash
ssh -p 65002 u274996454@<HOST>
cd ~/domains/excavationserable.com/public_html
nvm use 22
git pull
npm install         # solo si package.json cambió
npm run build
```

Y **Restart** en hPanel (o `pkill -HUP node` si querés vía shell).

## Troubleshooting

- **Page not found / placeholder de Hostinger** → LSAPI no levantó
  `server.js`. Probá `node server.js` a mano para ver si el bundle de
  Node carga sin error. Verificá que `server.js` esté en el root del
  proyecto (no en una subcarpeta).
- **Form de sumisión → CTA telefónico** → 5xx del proxy. Causa típica:
  `CONNEK_API_KEY_*` no seteado en `.env`, o el gateway dev rechazó el
  HMAC. Ver Runtime logs en hPanel.
- **`build/index.html` no existe** → corrió `npm run build` pero sin
  haber tirado `npm install` antes con todas las deps. Reinstall y
  rebuild.
- **`-bash: npm: command not found`** → reactivar nvm:
  `export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 22`.

## Arquitectura

```
 browser                      server.js (Express)              connek-ai
 ───────                      ──────────────────                ─────────
 GET /                  ───► serve build/index.html
 GET /soumission        ───► serve build/200.html (SPA)
 GET /api/connek/x      ───► HMAC-sign + forward ───► /api/v1/x
 POST /api/connek/y     ───► HMAC-sign + forward ───► /api/v1/y
```

Cualquier endpoint que termine en `.html` o sea asset estático lo sirve
Express directamente desde `build/`. Cualquier `/api/connek/*` se firma
con el secret del `.env` y se reenvía al gateway Connek. El secret nunca
sale del proceso Node.
