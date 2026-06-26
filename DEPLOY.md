# Deploy — excavationserable.com (nuevo sitio React/Vite)

Sirve el build estático (`dist/`) + `POST /api/lead` (Express, firma HMAC server-side
+ envío de correos por Resend). **Reemplaza** al sitio SvelteKit anterior en el VPS
Hostinger (`2.25.160.207`, PM2 app `excavationserable`, puerto 3000, nginx ya proxea).

> ⚠️ Es un reemplazo de un sitio en vivo. Desplegá a una carpeta NUEVA y probá en un
> puerto temporal ANTES de cambiar el PM2 que está sirviendo. Guardá la carpeta vieja
> como respaldo.

## 1) Build local (ya validado)

```powershell
cd "d:\RESPALDO-PC-2026-06-04\proyectos\Documentos\Documentos\connek\excavationserable.com"
npm install      # solo la primera vez
npm run build    # genera dist/
```

## 2) Subir al VPS (carpeta nueva)

```powershell
$VPS = "root@2.25.160.207"
$DST = "/var/www/excavationserable-react"
$src = "d:\RESPALDO-PC-2026-06-04\proyectos\Documentos\Documentos\connek\excavationserable.com"
ssh $VPS "mkdir -p $DST"
scp -r "$src\dist" "$src\server.js" "$src\email-templates.js" "$src\ecosystem.config.cjs" "$src\package.json" "$src\.env.example" "${VPS}:$DST/"
```

## 3) En el VPS

```bash
cd /var/www/excavationserable-react
cp .env.example .env
nano .env            # rellenar CONNEK_API_KEY_SECRET y RESEND_API_KEY reales
npm install express dotenv --no-save   # solo runtime (dist ya trae react/etc.)

# Probar en puerto temporal ANTES de tocar el sitio vivo
PORT=3009 node server.js   # en otra terminal: curl -s localhost:3009/api/health
# Ctrl+C cuando confirmes que responde

# Cambiar el sitio vivo al nuevo (puerto 3000):
pm2 stop excavationserable        # detiene el SvelteKit viejo
pm2 start ecosystem.config.cjs    # arranca el nuevo en :3000
pm2 save
sleep 2; pm2 logs excavationserable --lines 8 --nostream
```

nginx ya proxea `excavationserable.com` → `127.0.0.1:3000`, así que no hay que tocarlo.

## Rollback

```bash
pm2 stop excavationserable
cd /ruta/al/sitio/sveltekit/viejo && pm2 start ecosystem.config.cjs   # o el comando original
```

## Notas

- El `.env` NO se commitea (está en `.gitignore`). Los secretos se ponen en el VPS.
- `BUSINESS_NOTIFY_EMAIL=miniexcavationerables@gmail.com` (negocio 262). Cambialo si los leads deben ir a otro correo.
- Falta vs el sitio SvelteKit viejo: panel admin y flujo de cotización con firma/PDF
  (este último depende de la API de Connek, hoy con 404). Los leads igual llegan por correo.
