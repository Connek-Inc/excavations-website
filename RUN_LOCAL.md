# Running excavations-website locally

SvelteKit con `@sveltejs/adapter-node`. La landing solo necesita arrancar
`vite dev` y apuntar al backend Connek. Toda la persistencia y los emails
los hace connek-ai detrás del gateway dev — esta app es solo el front + un
proxy HMAC server-side bajo `src/lib/server/connek/`.

## Setup

```bash
cd ~/Documentos/connek/excavations-website
npm install          # primera vez
npm run dev          # → http://localhost:5173
```

## Variables de entorno

`.env` ya viene con las keys de PE LABS (business_id 262) apuntando a
`https://api.dev.connek.ca` (gateway dev). Si querés pegarle a tu
uvicorn local en su lugar:

```env
CONNEK_API_BASE_URL=http://localhost:5001
```

Y arrancá connek-ai:

```bash
cd ~/Documentos/connek/connek-ai
source venv/bin/activate
uvicorn main:app --host 127.0.0.1 --port 5001
```

Las keys (`CONNEK_API_KEY_ID` / `CONNEK_API_KEY_SECRET`) tienen que existir
en la tabla `api_keys` del backend al que estés apuntando, con el scope
`quotes:write` mínimo. Si el gateway rechaza el HMAC vas a ver `401` en
el log del SK dev server.

## End-to-end smoke test

1. Abrí http://localhost:5173/soumission
2. Completá el form, dale enviar
3. El browser hace POST a `/api/connek/submission`
4. El server route SvelteKit firma HMAC y reenvía a `${CONNEK_API_BASE_URL}/api/v1/quotes/submission`
5. connek-ai inserta el `quote` (kind='submission', status='nouvelle'),
   mintea el magic-link token y dispara los dos emails Resend (cliente +
   business) con la referencia `cot-YYYY-NNNN`
6. El browser recibe `{ ok, token, tracking_url }` y redirige a
   `/soumission/<token>` para ver el seguimiento

## Build de producción local

```bash
npm run build        # → build/index.js
node build/index.js  # arranca el server adapter-node localmente
```

Eso es exactamente lo que corre Hostinger. Si funciona acá, funciona allá.
Ver [SSH_NODE_SETUP.md](SSH_NODE_SETUP.md) para el deploy.
