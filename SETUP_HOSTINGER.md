# Setup en Hostinger Node.js — Mini Excavations Érable Admin

Sigue estos pasos en orden para que el panel admin funcione en `https://excavationserable.com/mi/admin/login`.

## ⚙️ Pre-requisitos

- ✅ Cuenta Hostinger con plan que soporte **Node.js Hosting**
- ✅ Database MySQL creada en Hostinger (la del screenshot que ya tienes)
- ✅ SSH access habilitado (Hostinger panel → Advanced → SSH Access)

---

## 📋 PASO 1: Configurar el DB en Hostinger

### 1.1 Crear DB
En tu screenshot ya viste la pantalla. Llénala así (NO uses "root"):

| Campo | Valor |
|---|---|
| **MySQL database name** | `u274996454_excerable` |
| **MySQL username** | `u274996454_excerable` |
| **Password** | Genera una FUERTE — guárdala bien |

⚠️ **CAMBIA la password del screenshot** (`k1R;jU@h!`) — ya está expuesta públicamente.

### 1.2 Anota las credenciales
Vas a necesitar estas 4 cosas para el `.env`:
- **DB_HOST** — Hostinger lo dice en "Remote MySQL" o es `localhost` desde el servidor Node.js mismo
- **DB_NAME** — el que pusiste arriba
- **DB_USER** — el que pusiste arriba
- **DB_PASSWORD** — la nueva que generaste

---

## 📋 PASO 2: Crear app Node.js en Hostinger

1. Hostinger panel → tu sitio → **Advanced** o **Node.js**
2. **Create application** o **Node.js Setup**
3. Configura:
   - **Node version:** `22.x` (LTS, lo más reciente)
   - **Application mode:** `Production`
   - **Application root:** `excavationserable.com` (o donde estará tu app)
   - **Application URL:** `excavationserable.com`
   - **Application startup file:** `build/index.js`
4. Click **Create**

Hostinger te muestra:
- **Application URL** (donde se ejecuta)
- **Setup Node.js NPM script** (script que correrá)

---

## 📋 PASO 3: Conectar GitHub a Hostinger Deployments

1. Hostinger panel → tu sitio → **Deployments**
2. **Connect Git provider** → GitHub
3. Selecciona el repo `Connek-Inc/excavations-website`
4. Branch: `master`
5. Build configuration:
   - **Install command:** `npm install --production=false`
   - **Build command:** `npm run build`
   - **Start command:** `node build/index.js` (o usa `npm start`)
6. Save

---

## 📋 PASO 4: Variables de entorno

En el panel Node.js de Hostinger → **Environment Variables**, agrega:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u274996454_excerable
DB_USER=u274996454_excerable
DB_PASSWORD=YOUR_NEW_STRONG_PASSWORD
JWT_SECRET=<genera con openssl rand -base64 48>
WEB3FORMS_KEY=<tu key de web3forms.com>
SEED_ADMIN_EMAIL=admin@excavationserable.com
SEED_ADMIN_PASSWORD=YourStrongPassword2026!
SEED_ADMIN_NAME=Admin Mini Excavations Érable
NODE_ENV=production
ORIGIN=https://excavationserable.com
```

---

## 📋 PASO 5: Crear las tablas en MySQL

Por SSH:

```bash
ssh u274996454@your-server.hostinger.com
cd ~/domains/excavationserable.com/public_html
npm run db:push    # crea las 8 tablas
npm run db:seed    # crea admin inicial + 5 servicios + settings default
```

Verifica:
```bash
mysql -u u274996454_excerable -p u274996454_excerable -e "SHOW TABLES;"
```

Deberías ver:
```
admins
analytics
blogs
contacts
reviews
services
sessions
settings
```

---

## 📋 PASO 6: Iniciar la app

En Hostinger panel → Node.js → tu app → click **Start** (o ya está corriendo si lo configuraste con auto-start).

Verifica que está corriendo:
- Abre https://excavationserable.com/ → deberías ver el sitio público
- Abre https://excavationserable.com/mi/admin/login → deberías ver la página de login con el escudo dorado

---

## 📋 PASO 7: Login al admin

URL: **https://excavationserable.com/mi/admin/login**

Credenciales (las que pusiste en `SEED_ADMIN_EMAIL` y `SEED_ADMIN_PASSWORD`):
- **Email:** `admin@excavationserable.com`
- **Password:** `YourStrongPassword2026!` (la que tú pusiste)

⚠️ **Cambia la password después del primer login** (te la mostrará el seed en consola).

---

## 🔧 Troubleshooting

### Error 500 en `/mi/admin/login`
- ✅ Verifica que la app Node.js esté **Started** en Hostinger panel
- ✅ Verifica que las **environment variables** estén bien (DB_*, JWT_SECRET)
- ✅ Verifica que las **tablas existan** (`npm run db:push`)
- ✅ Mira los logs en Hostinger → Node.js → **Logs**

### "Access denied for user" (DB)
- DB credentials están mal en `.env` o environment variables
- O el usuario MySQL no tiene permisos sobre la DB

### "ECONNREFUSED" al MySQL
- DB_HOST no es correcto. En Hostinger Node.js Hosting, generalmente es `localhost`
- Verifica con: `mysql -u <user> -h localhost -p <db>`

### Sitio público no carga
- Verifica el startup file: `build/index.js`
- Verifica que el build se haya completado: ls `build/index.js`
- Verifica que `npm run build` corrió sin errores en logs

### Las páginas estáticas (home, /mini-excavation, etc.) cargan PERO el admin da 500
- El admin requiere DB. Si la DB no conecta, da 500
- Revisa logs y env vars

---

## 📦 Estructura final del proyecto

- **Sitio público** (estático prerendered): home, mini-excavation, services, urgences, blogs, etc.
- **Admin dinámico** (server-side): `/mi/admin/*` — protegido por JWT + cookies httpOnly
- **API endpoint:** `/send-contact-form` — guarda lead en DB + envía email

Todo corriendo en **un solo proceso Node.js**.

---

## 🎯 Lo que tendrás funcionando

- ✅ Login en `/mi/admin/login` (UI premium con dark mode)
- ✅ Dashboard con stats reales (leads/mes, conversiones, gráfico 30d)
- ✅ Gestión completa de **Leads/Contactos** (lista, detail, status, notas)
- ✅ CRUD de **Servicios** (con precios CAD)
- ✅ CRUD de **Reseñas** (multilenguaje)
- ✅ CRUD de **Blogs** (multilenguaje, SEO)
- ✅ Settings globales (RBQ, teléfono, redes)
- ✅ Formulario público guarda en DB **Y** envía email

URL: **`https://excavationserable.com/mi/admin/login`**

🎉 ¡Listo!
