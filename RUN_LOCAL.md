# Running excavations-website locally

Esta app es puramente **un cliente de connek-api**. No tiene DB, no tiene
auth propia, no manda emails. Su único trabajo es:

1. Servir la landing estática (`SvelteKit` con `@sveltejs/adapter-static`)
2. Firmar HMAC server-side en `/api/connek/*` y reenviar a `connek-ai`
   (esa es la única razón por la que sigue existiendo Node aquí)

## Modo dev (SvelteKit + Vite, hot reload)

```bash
cd ~/Documentos/connek/excavations-website
npm install
npm run dev      # → http://localhost:5173
```

En dev, las rutas `/api/connek/*` **no existen** (las sirve Express en
prod, no Vite en dev). Si querés probar el form contra el backend real
en dev, podés levantar `server.js` paralelamente:

```bash
npm run build
npm run dev:server  # → http://localhost:3000 (Express + build/)
```

Y abrir `http://localhost:3000` en vez de `:5173`.

## Variables de entorno

`.env` solo necesita 3 vars críticas para que el proxy funcione:

```env
CONNEK_API_BASE_URL=https://api.dev.connek.ca
CONNEK_API_KEY_ID=ck_live_xxx
CONNEK_API_KEY_SECRET=ck_sec_xxx
```

Las keys tienen que existir en la tabla `api_keys` del backend al que
apuntás (Konnect dev, prod, o tu uvicorn local si seteás
`CONNEK_API_BASE_URL=http://localhost:5001`). Scope mínimo: `quotes:write`
y `services:read`.

Las `PUBLIC_*` son del browser (analytics + opcional `PUBLIC_API_BASE`)
y van expuestas al cliente — nunca poner secrets ahí.

## Smoke test end-to-end

1. Abrí `http://localhost:3000/soumission`
2. Llená el form
3. El browser hace `POST /api/connek/submission` → Express firma HMAC y
   reenvía a `${CONNEK_API_BASE_URL}/api/v1/quotes/submission`
4. connek-ai persiste el quote, mintea token, dispara emails (cliente +
   business) con la referencia `cot-YYYY-NNNN`
5. El browser recibe `{ok, token, tracking_url}` y muestra la pantalla
   de éxito + link a `/soumission/<token>` (página de seguimiento CSR
   que vuelve a llamar al proxy para mostrar la cotización)

Si querés probar sin browser:

```bash
curl -X POST http://localhost:3000/api/connek/submission \
  -H 'Content-Type: application/json' \
  -d '{
    "client_first_name":"Test","client_email":"test@test.com",
    "client_phone":"4127262564",
    "project_description":"smoke test"
  }'
```

Debe devolver `{"quote_id":..., "reference":"cot-2026-XXXX", "token":"..."}`.

## Deploy

Ver [SSH_NODE_SETUP.md](SSH_NODE_SETUP.md). TL;DR: `git pull && npm ci && npm run build`
en Hostinger por SSH (nvm activado), después restart.
