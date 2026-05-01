# Panel de Control — Setup en Vercel

**Stack final:**
- Frontend + Backend: SvelteKit (todo en un solo proyecto)
- DB: **Turso (SQLite distribuida)** — disponible en Vercel Marketplace
- Auth: JWT + cookies httpOnly + bcrypt
- Email: Resend
- ORM: Drizzle

---

## 💰 ¿Por qué Turso (SQLite)?

| | Free tier | Notas |
|---|---|---|
| **Turso** ⭐ | **9 GB** storage, **1B** reads/mes, **25M** writes/mes | El más generoso del mercado |
| Neon Postgres | 500 MB | Postgres "real" |
| Supabase | 500 MB | Pausa a los 7 días sin uso |

Para tu negocio (formulario + blogs + servicios) Turso es **MUY** difícil de llenar — años de uso gratis.

---

## 🚀 Setup en 5 pasos

### 1. Crear DB Turso (gratis)

**Opción A — Vercel Marketplace (recomendado):**

1. Dashboard de Vercel → tu proyecto → **Storage** → **Create Database**
2. Buscar **Turso** → conectar
3. Las env vars `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN` se configuran automáticamente

**Opción B — CLI Turso (si prefieres):**

```bash
# Instalar Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Crear DB
turso auth signup
turso db create excavations-db
turso db show excavations-db --url
turso db tokens create excavations-db
```

Y pega los valores en `.env`:

```env
TURSO_DATABASE_URL="libsql://excavations-db-xxx.turso.io"
TURSO_AUTH_TOKEN="eyJhbGc..."
```

### 2. Generar `JWT_SECRET`

```bash
openssl rand -base64 48
```

Pégalo en `.env`:

```env
JWT_SECRET="<output del comando>"
RESEND="re_..."
SEED_ADMIN_EMAIL="tu@correo.com"
SEED_ADMIN_PASSWORD="UnaPasswordSegura2026!"
SEED_ADMIN_NAME="Tu Nombre"
```

### 3. Crear las tablas

```bash
npm run db:push
```

Aplica todo el schema en segundos.

### 4. Crear admin inicial + datos default

```bash
npm run db:seed
```

Crea tu usuario admin + 5 servicios + settings.

### 5. Subir env vars a Vercel y deployar

```bash
vercel env add TURSO_DATABASE_URL production
vercel env add TURSO_AUTH_TOKEN production
vercel env add JWT_SECRET production
vercel env add RESEND production

vercel --prod
```

---

## 🔐 Acceso al panel

```
https://tu-dominio.com/mi/admin/login
```

Credenciales = las que pusiste en `SEED_ADMIN_EMAIL` y `SEED_ADMIN_PASSWORD`.

> La ruta `/mi/admin/*` está bloqueada por hooks SvelteKit. Sin sesión válida, redirige a `/mi/admin/login`. La página tiene `noindex, nofollow` para que Google nunca la liste.

---

## 🧪 Desarrollo local

Para probar sin Turso (usando archivo SQLite local):

```env
TURSO_DATABASE_URL="file:local.db"
# TURSO_AUTH_TOKEN no se necesita
```

Luego:

```bash
npm run db:push   # crea local.db con todas las tablas
npm run db:seed   # crea admin
npm run dev
```

`local.db` está en `.gitignore` automáticamente (gracias a la regla `.env*`).

---

## 📦 Lo que incluye el panel

| Sección | Ruta | Funcionalidad |
|---------|------|---------------|
| Dashboard | `/mi/admin` | Métricas, gráfico 30 días, contactos recientes, breakdown por status |
| Contacts | `/mi/admin/contacts` | Lista paginada con búsqueda + filtros, gestión de status, notas |
| Blogs | `/mi/admin/blogs` | Editor multilingüe (FR/EN/ES), SEO, tags, publish toggle |
| Services | `/mi/admin/services` | CRUD con modal, multilenguaje, ordenamiento |
| Settings | `/mi/admin/settings` | Info empresa, redes sociales, SEO global |

---

## 🗃️ Tablas creadas

- `admins` — usuarios del panel
- `sessions` — sesiones JWT con expiración
- `contacts` — leads del formulario
- `blogs` — artículos multilenguaje + SEO
- `services` — servicios mostrados en home
- `settings` — config global key-value
- `analytics` — opcional, tracking interno

Ver [src/lib/server/db/schema.ts](src/lib/server/db/schema.ts).

---

## 🛠️ Comandos útiles

```bash
npm run db:generate    # genera SQL migrations desde schema
npm run db:push        # aplica schema directo (dev)
npm run db:migrate     # aplica migrations (prod)
npm run db:studio      # GUI para ver/editar la DB
npm run db:seed        # admin inicial + datos default

npm run dev            # dev server
npm run build          # build para Vercel
```

---

## 🔒 Seguridad

- Cookies `httpOnly` + `secure` + `sameSite: lax`
- Passwords con bcrypt (12 rounds)
- JWT firmados con HS256
- Sesiones server-side con expiración 7d
- Rate-limit suave en login
- `noindex` + `Disallow: /api/`
- IP y User-Agent registrados en cada contact

---

## ❓ Troubleshooting

**"TURSO_DATABASE_URL not configured"** → falta env var. Ejecuta `vercel env pull .env.local`.

**Login no funciona en local** → verifica `JWT_SECRET` en `.env` (mín. 32 caracteres).

**Formulario no guarda** → revisa logs Vercel; si DB falla, igual envía email (fallback).

**Quiero cambiar contraseña admin** → `npm run db:studio`, edita el campo `password_hash`. O agrega una página `/mi/admin/profile` (TODO futuro).
