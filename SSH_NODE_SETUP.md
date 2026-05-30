# Hostinger Node.js — setup & deploy

SvelteKit con `@sveltejs/adapter-node`. La build produce `build/index.js` —
un servidor Node nativo que sirve SSR + assets + las rutas `/api/connek/*`
(que firman HMAC y forwardean al gateway Connek en `api.dev.connek.ca`). **No hay Express,
no hay MySQL, no hay `/api/auth|blogs|services|reviews|settings|contacts|
soumissions|analytics|ping`.** Toda la persistencia y los emails los hace
connek-ai (vía Konnect) — esta app es solo el front + un proxy HMAC server-side.

## Setup inicial (una vez)

### 1. SSH into Hostinger

```bash
ssh -p 65002 u274996454@<HOST>
cd ~/domains/excavationserable.com/public_html
```

### 2. Configurar el panel Node.js de hPanel

- **Application root**: `~/domains/excavationserable.com/public_html`
- **Application URL**: `excavationserable.com`
- **Application startup file**: `build/index.js`  ← lo que genera adapter-node
- **Node.js version**: 20.x o más nueva

### 3. Variables de entorno

Copiar `.env.example` a `.env` y rellenar:

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

CONNEK_API_BASE_URL=https://api.dev.connek.ca
CONNEK_API_KEY_ID=ck_live_xxxxxxxxxxxxxxxxxxxxxx
CONNEK_API_KEY_SECRET=ck_sec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Estas tres últimas son lo único crítico — sin ellas el form de sumisión
devuelve 502/error y el lead no llega. **Nunca exponer `KEY_SECRET` al
browser** — sólo se usa en código bajo `src/lib/server/`.

### 4. Build + start

```bash
npm install
npm run build
```

Después en hPanel → **Node.js panel → Restart**.

### 5. Auto-deploy off

- hPanel → **Deployments** → **Settings** → toggle **Auto-deployment OFF**.
  El deploy estático viejo (que servía `build/` sin Node) ya no aplica.

## Update workflow (cada cambio de código)

```bash
ssh -p 65002 u274996454@<HOST>
cd ~/domains/excavationserable.com/public_html
git pull
npm install            # solo si package.json cambió
npm run build
```

Después **Restart** en el panel Node.js.

## Troubleshooting

- **`/api/connek/services` o `/api/connek/submission` devuelve 404 HTML** →
  el server no arrancó con adapter-node. Verificar que el startup file
  apunte a `build/index.js`, no a `server.js` (legacy borrado).
- **Form de sumisión cae en error → CTA telefónico** → el SK server
  respondió 5xx. Mirar Runtime logs del panel Node.js. Causa más común:
  `CONNEK_API_KEY_*` no seteado o el gateway Connek rechazando HMAC.
- **Stack: "ResendClient: API key invalid"** → eso es en connek-ai, no
  acá. Esta app no manda emails — los manda el backend.
