# Deploy en VPS Hostinger (Node + PM2 + Nginx)

Reemplaza al setup viejo de hosting compartido con LSAPI (que dormía el
worker Node). En el VPS tenés root: corrés `server.js` con **PM2** (vivo
24/7, auto-restart, arranca al boot) detrás de **Nginx** (dominio + SSL).

```
Internet :443 ──► Nginx (SSL) ──► 127.0.0.1:3000 (server.js / PM2) ──► build/ + proxy Connek
```

El stack del proyecto no cambia: SvelteKit `adapter-static` → `build/`,
servido por Express (`server.js`), que firma HMAC hacia `api.connek.ca`.

---

## 0. Antes de empezar

- IP del VPS (la ves en hPanel → VPS).
- Acceso SSH como `root` (Hostinger te da la contraseña; o subí tu clave).
- DNS: apuntá el dominio al VPS **antes** de sacar el SSL.
  En el panel DNS de `excavationserable.com`:
  - `A   @     <IP_DEL_VPS>`
  - `A   www   <IP_DEL_VPS>`
  Borrá registros A/CNAME viejos que apunten al hosting compartido.

---

## 1. Conectar y poner el VPS al día

```bash
ssh root@<IP_DEL_VPS>
apt update && apt upgrade -y
```

(Recomendado) crear un usuario no-root para correr la app:

```bash
adduser deploy
usermod -aG sudo deploy
# copiar tu clave SSH al nuevo usuario, luego:
su - deploy
```

> El resto de la guía funciona igual como `root` o como `deploy`. Si usás
> `deploy`, antepon `sudo` a los comandos de sistema (apt, nginx, certbot).

---

## 2. Node 22 + PM2

```bash
# Node 22 desde NodeSource (global, sin nvm — más simple para systemd/PM2)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git
node -v        # v22.x
npm i -g pm2
```

---

## 3. Traer el código

```bash
sudo mkdir -p /var/www && sudo chown $USER:$USER /var/www
cd /var/www
git clone <URL_DEL_REPO> excavationserable
cd excavationserable
```

> Si el repo es privado, configurá una deploy key o cloná por HTTPS con
> token. Si preferís no usar git, subí la carpeta por `scp`/`rsync`
> (excluí `node_modules` y `build`).

---

## 4. Variables de entorno

```bash
cp .env.example .env
nano .env
```

Rellená las 3 críticas (sin ellas el form devuelve 500 y el lead no llega):

```env
NODE_ENV=production
PORT=3000
HOST=127.0.0.1

CONNEK_API_BASE_URL=https://api.connek.ca
CONNEK_API_KEY_ID=ck_live_xxxxxxxxxxxxxxxxxxxxxx
CONNEK_API_KEY_SECRET=ck_sec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> `HOST=127.0.0.1`: el server solo escucha local; Nginx lo expone. Nunca
> expongas `CONNEK_API_KEY_SECRET` al browser.

---

## 5. Build + arrancar con PM2

```bash
npm ci
npm run build
ls build/index.html build/200.html    # ambos deben existir

pm2 start ecosystem.config.cjs
pm2 save                # guarda la lista de procesos
pm2 startup             # imprime un comando con sudo → copialo y ejecutalo
                        # (registra PM2 como servicio: revive al reiniciar el VPS)
pm2 logs excavationserable   # ver que arrancó OK
curl -s localhost:3000/api/health   # {"ok":true,...}
```

---

## 6. Nginx (reverse proxy)

```bash
sudo apt install -y nginx
sudo cp deploy/nginx-excavationserable.conf /etc/nginx/sites-available/excavationserable
sudo ln -s /etc/nginx/sites-available/excavationserable /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # quita la página por defecto
sudo nginx -t && sudo systemctl reload nginx
```

Probá `http://<IP_DEL_VPS>` o `http://excavationserable.com` → debe verse el sitio.

---

## 7. SSL (HTTPS gratis, auto-renovable)

Con el DNS ya apuntando al VPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d excavationserable.com -d www.excavationserable.com
```

Certbot edita el Nginx solo (agrega el bloque 443 y redirige 80→443) y
programa la renovación automática. Verificá: `sudo certbot renew --dry-run`.

---

## 8. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'   # 80 + 443
sudo ufw enable
sudo ufw status
```

> El puerto 3000 NO se abre: solo Nginx (local) habla con el server.

---

## Listo ✅

Sitio en `https://excavationserable.com`, Node siempre vivo, SSL automático.

---

## Update workflow (cada cambio de código)

```bash
ssh deploy@<IP_DEL_VPS>
cd /var/www/excavationserable
git pull
npm ci            # solo si package.json cambió
npm run build
pm2 reload excavationserable   # reload = zero-downtime
```

## Varios sitios en el mismo VPS (multi-tenant)

El VPS aguanta cuantos sitios quieras sin que se pisen. La regla de oro:

> **Cada sitio = puerto propio + proceso PM2 propio + bloque `server` propio
> en Nginx.** Nginx enruta por dominio (`server_name`), así que las peticiones
> de `sitioA.com` y `sitioB.com` van cada una a su Node, aunque compartan IP.

```
                                  ┌─► 127.0.0.1:3000  excavationserable (PM2)
Internet :443 ─► Nginx ─ por dominio ─┼─► 127.0.0.1:3001  otro-sitio-node (PM2)
                                  └─► sirve build/ directo  (sitio 100% estático, sin Node)
```

### Reglas para que NO haya errores

1. **Puerto único por app.** El error más común es dos apps en el `PORT`
   3000 → la segunda crashea con `EADDRINUSE`. Asigná 3000, 3001, 3002…
   En cada proyecto, cambiá `PORT` en su `.env` **y** en su
   `ecosystem.config.cjs` (el campo `env.PORT`).

2. **Nombre PM2 único.** `name: 'excavationserable'`, `name: 'sitio-b'`, etc.
   Mirá todo con `pm2 list`.

3. **Carpeta propia.** `/var/www/excavationserable`, `/var/www/sitio-b`…

4. **Un `server { }` por dominio en Nginx**, cada uno apuntando a su puerto:

   ```nginx
   # /etc/nginx/sites-available/sitio-b
   server {
       listen 80;
       server_name sitio-b.com www.sitio-b.com;
       location / { proxy_pass http://127.0.0.1:3001; /* ...mismos headers... */ }
   }
   ```
   `sudo ln -s` a `sites-enabled/`, `sudo nginx -t && sudo systemctl reload nginx`,
   y `sudo certbot --nginx -d sitio-b.com -d www.sitio-b.com` para su SSL.

5. **Sitio 100% estático (sin Node)** → ni puerto ni PM2: que Nginx sirva la
   carpeta directo. Es más liviano:

   ```nginx
   server {
       listen 80;
       server_name landing.com;
       root /var/www/landing/build;
       index index.html;
       location / { try_files $uri $uri/ /200.html; }
   }
   ```

### Checklist al sumar un sitio nuevo

- [ ] Carpeta nueva en `/var/www/`
- [ ] `PORT` libre y distinto (confirmá con `sudo ss -ltnp | grep :300`)
- [ ] `name` de PM2 distinto → `pm2 start ... && pm2 save`
- [ ] Bloque Nginx nuevo con su `server_name` → `nginx -t` → reload
- [ ] DNS del nuevo dominio → IP del VPS
- [ ] `certbot --nginx -d ...` para su HTTPS

Mientras cada sitio respete **puerto único + nombre PM2 único + server_name
único**, conviven sin conflictos. Lo único compartido es la IP, la RAM/CPU
del VPS y el mismo Nginx.

## Troubleshooting

- **502 Bad Gateway** → el server no está arriba. `pm2 status`,
  `pm2 logs excavationserable`. Rearrancá con `pm2 restart excavationserable`.
- **Form → CTA telefónico (5xx del proxy)** → `CONNEK_API_KEY_*` mal o
  faltante en `.env`. Mirá `pm2 logs` (ahí salen los `[connek proxy]`).
  Tras editar `.env`: `pm2 restart excavationserable --update-env`.
- **Sitio no carga tras reiniciar el VPS** → no corriste `pm2 save` +
  `pm2 startup`. Repetí ambos.
- **SSL falla** → el DNS todavía no propagó al VPS. Esperá y reintentá
  `sudo certbot --nginx ...`. Confirmá con `dig +short excavationserable.com`.
- **`build/index.html` no existe** → corré `npm ci` antes de `npm run build`.
```
