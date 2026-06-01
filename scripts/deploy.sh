#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — actualizar excavationserable.com en el VPS.
#
# Reemplaza el workflow manual de Hostinger (git pull && npm ci && npm run
# build + Restart en hPanel). Acá: pull → install si cambió package-lock →
# build → restart del servicio systemd. Idempotente; corrélo cada deploy.
#
# Uso (desde el root del repo en el VPS):
#   ./scripts/deploy.sh
#
# Requiere: el servicio systemd `excavationserable` ya instalado
# (ver deploy/excavationserable.service) y `.env` con las CONNEK_API_*.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE="${SERVICE:-excavationserable}"
BRANCH="${BRANCH:-master}"

cd "$APP_DIR"

echo "▶ Repo: $APP_DIR (rama $BRANCH)"

# 1. Traer el último código.
git fetch --prune origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

# 2. Reinstalar deps SOLO si cambió package-lock.json desde el último deploy.
if ! git diff --quiet "HEAD@{1}" HEAD -- package-lock.json 2>/dev/null; then
    echo "▶ package-lock.json cambió → npm ci"
    npm ci
else
    echo "▶ deps sin cambios → salteo npm ci"
fi

# 3. Verificar que el .env tenga las keys críticas (sin ellas el form da 500).
if [ ! -f .env ]; then
    echo "✖ Falta .env — copialo de .env.example y poné las CONNEK_API_*." >&2
    exit 1
fi
grep -q '^CONNEK_API_KEY_SECRET=ck_sec' .env \
    || echo "⚠ Aviso: CONNEK_API_KEY_SECRET no parece configurado en .env"

# 4. Build estático de SvelteKit (genera build/index.html + build/200.html).
echo "▶ npm run build"
npm run build
test -f build/index.html || { echo "✖ build/index.html no se generó" >&2; exit 1; }

# 5. Reiniciar el proceso Node (systemd). pkill/nohup ya NO hace falta.
echo "▶ Reiniciando servicio $SERVICE"
sudo systemctl restart "$SERVICE"
sleep 2

# 6. Health check local (la misma ruta que pinguea el viejo keepalive).
if curl -fsS -o /dev/null --max-time 5 "http://127.0.0.1:${PORT:-3000}/api/health"; then
    echo "✓ Deploy OK — /api/health responde."
else
    echo "✖ /api/health no respondió. Revisá: journalctl -u $SERVICE -n 50" >&2
    exit 1
fi
