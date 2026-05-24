# Setup Hostinger Node.js App via SSH

El **auto-deploy de Deployments** (que vimos en pantalla) NO ejecuta
Node.js — solo sirve estático. La app Node.js que tenés bajo
**Advanced → Node.js** SÍ corre un proceso, pero requiere setup manual
por SSH la primera vez.

## Paso 0 — preparar el entorno

### a) Desactivar el auto-deploy estático (importante)

Sino, cada push tuyo va a triggerear un build que va a fallar con
`ERROR: No output directory found after build` (porque adapter-node
produce JS, no HTML, y ese sistema solo entiende HTML).

- hPanel → tu sitio → **Deployments** → **Settings and redeploy**
- Buscá la opción **"Disable auto-deployment"** o el toggle de
  "Auto-deployment" y apagalo. Si no podés desactivar, está OK que
  falle — los fallos no van a romper la app Node.js.

### b) Activar SSH (si no está)

- hPanel → tu sitio → **Advanced** → **SSH Access**
- Anota: **host**, **port** (suele ser 65002), **user** (`u274996454`),
  **password**

### c) Ver dónde está el app root de Node.js

- hPanel → tu sitio → **Advanced** → **Node.js** → tu app **"Started"**
- En la pantalla anotá el valor de **Application root** (algo tipo
  `domains/excavationserable.com/public_html` o similar)

## Paso 1 — conectar por SSH

Desde tu máquina local (Linux/Mac):

```bash
ssh -p 65002 u274996454@<HOST_QUE_HOSTINGER_TE_DIO>
# pegá la password cuando pida
```

## Paso 2 — clonar el repo en el app root

```bash
# REEMPLAZÁ con el path real que viste en "Application root"
cd ~/domains/excavationserable.com/public_html

# si la carpeta tiene archivos viejos del auto-deploy, podemos
# borrarlos sin miedo (vamos a regenerar todo):
rm -rf ./* ./.[!.]* 2>/dev/null || true

# clonar el repo
git clone https://github.com/Connek-Inc/excavations-website.git .

# instalar dependencias y buildear
npm install
npm run build

# verificá que se haya creado build/index.js
ls -la build/index.js
```

## Paso 3 — configurar la app Node.js

- hPanel → **Advanced** → **Node.js** → editar la app:

| Campo | Valor |
|---|---|
| Node version | **22.x** |
| Application mode | **Production** |
| Application root | `domains/excavationserable.com/public_html` (o el que ya tenías) |
| Application URL | `excavationserable.com` (sin barra final, sin path) |
| Application startup file | `build/index.js` |

- Guardar.

## Paso 4 — environment variables

En la misma pantalla, agregar/confirmar:

```
RESEND       = re_G6rZbpRM_8hLbWCLk4C8LS8kfRgUfQ7ZM
EMAIL_FROM   = Mini Excavations Érable <onboarding@resend.dev>
NODE_ENV     = production
ORIGIN       = https://excavationserable.com
PORT         = 3000     # o lo que Hostinger te asigne
HOST         = 0.0.0.0
```

## Paso 5 — restart

- Click **Restart** en la app Node.js.

## Paso 6 — verificar

Abrí: <https://excavationserable.com/api/ping>

Debería responder:

```json
{ "ok": true, "runtime": "node", "resend_configured": true, "time": "…" }
```

Si responde JSON → 🎉 Resend está activo.

Si responde 404 / 502 / HTML → mirá los **Runtime logs** en el panel y
pegámelos en el chat.

## Workflow futuro (cada vez que pushees al repo)

Como desactivamos el auto-deploy, los pushes a master ya no se aplican
solos. Para sincronizar la app Node.js con el último commit:

```bash
ssh -p 65002 u274996454@<HOST>
cd ~/domains/excavationserable.com/public_html
git pull
npm install   # solo si cambió package.json
npm run build
```

Luego en el panel → **Restart** (o configurar `nodemon` para auto-reload
si querés ir más fancy).
