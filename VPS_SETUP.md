# Migrar excavationserable.com de Hostinger a un VPS

Esta guía pasa el sitio del hosting compartido de Hostinger (LSAPI + watchdog
`keepalive.sh`) a un **VPS Ubuntu** con un stack estándar y robusto:

```
 Internet ──► nginx (:443 TLS) ──► server.js / Express (:3000) ──► api.connek.ca
              (certbot)             (systemd lo mantiene vivo)        (HMAC server-side)
```

**Qué cambia respecto a Hostinger**

| Pieza                | Hostinger (antes)              | VPS (ahora)                          |
|----------------------|--------------------------------|--------------------------------------|
| Arranque de Node     | LSAPI levanta `server.js` solo | `systemd` (`excavationserable.service`) |
| Mantenerlo vivo      | cron + `scripts/keepalive.sh`  | `Restart=always` de systemd          |
| TLS / dominio        | Panel hPanel                   | nginx + certbot (Let's Encrypt)      |
| Servir la web        | LiteSpeed sirve `build/`       | nginx → Express sirve `build/`       |
| Deploy               | SSH + git pull + Restart hPanel| `./scripts/deploy.sh`                |

> **No hay base de datos.** Esta app es solo un cliente de `connek-api`: firma
> HMAC en `/api/connek/*` y reenvía. El `drizzle.config.ts` es legacy y no se
> usa — **no instales MySQL**.

---

## 0. Lo que necesitás antes de empezar

- Un VPS con **Ubuntu 22.04/24.04** y acceso root (o sudo).
- El dominio `excavationserable.com` apuntando (registro **A** / **AAAA**) a la
  IP pública del VPS. Verificá: `dig +short excavationserable.com`.
- Las credenciales `CONNEK_API_KEY_ID` y `CONNEK_API_KEY_SECRET` (las mismas
  que tenías en el `.env` de Hostinger). Sin ellas el formulario da 500.

---

## 1. Acceso y paquetes base

```bash
# Entrar al VPS
ssh root@TU_IP_DEL_VPS

# Actualizar e instalar utilidades
apt update && apt upgrade -y
apt install -y git curl ufw nginx
```

## 2. Usuario sin privilegios para la app

```bash
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy        # para que pueda hacer systemctl restart en deploy.sh
```

## 3. Node.js 22 (vía NodeSource — queda en /usr/bin/node)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
node -v        # → v22.x
npm -v
```

> Si preferís nvm (como en Hostinger), instalalo bajo el usuario `deploy` y
> ajustá la ruta `ExecStart` en `deploy/excavationserable.service` a
> `/home/deploy/.nvm/versions/node/v22.x.x/bin/node`.

## 4. Clonar el repo

```bash
sudo mkdir -p /var/www/excavationserable.com
sudo chown deploy:deploy /var/www/excavationserable.com

su - deploy
git clone https://github.com/connek-inc/excavations-website.git \
    /var/www/excavationserable.com
cd /var/www/excavationserable.com
```

## 5. Variables de entorno (.env)

```bash
cp .env.example .env
nano .env
```

Dejalo así (HOST en loopback porque nginx es el único que habla con Node):

```env
NODE_ENV=production
PORT=3000
HOST=127.0.0.1

PUBLIC_API_BASE=
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

CONNEK_API_BASE_URL=https://api.connek.ca
CONNEK_API_KEY_ID=ck_live_xxxxxxxxxxxxxxxxxxxxxx
CONNEK_API_KEY_SECRET=ck_sec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> Las 3 `CONNEK_API_*` son críticas. **Nunca** las pongas en variables
> `PUBLIC_*` ni las expongas al browser: solo `server.js` las usa.

## 6. Instalar dependencias y build inicial

```bash
npm ci
npm run build
ls build/index.html build/200.html    # ambos deben existir
```

## 7. Servicio systemd (mantiene Node vivo)

```bash
# (como root o con sudo)
sudo cp deploy/excavationserable.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now excavationserable

# Verificar
systemctl status excavationserable
curl -s http://127.0.0.1:3000/api/health     # → {"ok":true,"ts":...}
journalctl -u excavationserable -f            # logs en vivo
```

## 8. nginx como reverse proxy

```bash
sudo cp deploy/nginx-excavationserable.conf \
        /etc/nginx/sites-available/excavationserable.com
sudo ln -s /etc/nginx/sites-available/excavationserable.com \
           /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default     # quitar el sitio por defecto
sudo nginx -t && sudo systemctl reload nginx
```

Probá por HTTP (todavía sin TLS): `curl -I http://excavationserable.com`

## 9. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## 10. TLS con Let's Encrypt (certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d excavationserable.com -d www.excavationserable.com \
     --redirect --agree-tos -m dev@connek.ca --no-eff-email
```

Certbot reescribe el bloque nginx agregando `:443` + redirección de `:80`, e
instala un timer de renovación automática. Verificalo:

```bash
sudo certbot renew --dry-run
```

## 11. Verificación final (smoke test end-to-end)

```bash
# La home
curl -I https://excavationserable.com           # → 200

# El proxy firmado (debe devolver JSON de connek, no 500)
curl -s https://excavationserable.com/api/connek/services | head

# El form completo
curl -s -X POST https://excavationserable.com/api/connek/submission \
  -H 'Content-Type: application/json' \
  -d '{"client_first_name":"Test","client_email":"test@test.com",
       "client_phone":"4127262564","project_description":"smoke test vps"}'
# → {"quote_id":..., "reference":"cot-2026-XXXX", "token":"..."}
```

Si el `POST` devuelve 500 → revisá las `CONNEK_API_*` en `.env` y reiniciá:
`sudo systemctl restart excavationserable`.

---

## Deploys posteriores (cada cambio de código)

Ya **no** hace falta el watchdog cron ni reiniciar desde un panel:

```bash
ssh deploy@TU_IP_DEL_VPS
cd /var/www/excavationserable.com
./scripts/deploy.sh        # git pull → (npm ci si cambió lock) → build → restart → health
```

El script `scripts/deploy.sh` hace `git pull`, reinstala deps solo si cambió
`package-lock.json`, rebuildea, reinicia el servicio y chequea `/api/health`.

---

## Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| `502 Bad Gateway` en nginx | Node caído | `systemctl status excavationserable`, `journalctl -u excavationserable -n 50` |
| Form → 500 / cae al CTA telefónico | `CONNEK_API_*` mal o ausente | revisar `.env`, `systemctl restart excavationserable` |
| `build/index.html no existe` | build sin deps | `npm ci && npm run build` |
| `node: command not found` en systemd | ruta de node mal | ajustar `ExecStart` en el `.service` (`which node`) |
| TLS no renueva | timer de certbot | `systemctl status certbot.timer`, `certbot renew --dry-run` |

## Notas sobre el legacy de Hostinger

- `scripts/keepalive.sh` y los archivos `keepalive.log` / `.keepalive.lock`
  ya **no se usan** en el VPS — systemd cumple esa función. Podés borrar el
  cron que lo invocaba.
- El bloque LSAPI / hPanel del `SSH_NODE_SETUP.md` aplica solo a Hostinger;
  esta guía lo reemplaza para el VPS.
