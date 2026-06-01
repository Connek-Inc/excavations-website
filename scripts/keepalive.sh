#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# keepalive.sh — watchdog del Node (server.js) en Hostinger.
#
# Hostinger (hosting compartido / LSAPI) duerme o mata el proceso Node cuando
# está idle y NO siempre lo relevanta → /api/* cae en 502 y el formulario de
# /urgences deja de enviar. Este script, corrido por un cron cada minuto,
# revisa si Node responde en :3000 y, si está caído, lo rearranca en segundo
# plano (setsid + nohup) para que siga vivo sin intervención manual.
#
# Instalación (una vez, por SSH) — ver instrucciones al pie.
# ─────────────────────────────────────────────────────────────────────────────
set -u

# Raíz del proyecto = carpeta padre de este script. Así el cron funciona
# sin importar desde dónde se invoque, y `build/` + `.env` resuelven bien.
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-3000}"
HEALTH="http://127.0.0.1:${PORT}/api/health"
LOG="${APP_DIR}/keepalive.log"
LOCK="${APP_DIR}/.keepalive.lock"

# Evita que dos corridas del cron se solapen (si una se está reiniciando).
if command -v flock >/dev/null 2>&1; then
  exec 9>"$LOCK"
  flock -n 9 || exit 0
fi

# Si ya responde, no hay nada que hacer.
if curl -fsS -o /dev/null --max-time 5 "$HEALTH" 2>/dev/null; then
  exit 0
fi

# El cron arranca con un entorno mínimo: cargamos node vía nvm.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" >/dev/null 2>&1
nvm use 22 >/dev/null 2>&1 || true

# Mata cualquier server.js zombie/colgado antes de relanzar (evita duplicados
# y conflictos por el puerto 3000).
pkill -f "node .*server\.js" >/dev/null 2>&1 || true
sleep 1

cd "$APP_DIR" || exit 1
echo "[$(date -Is)] health caído → reiniciando node en :$PORT" >> "$LOG"
NODE_ENV=production PORT="$PORT" HOST=0.0.0.0 \
  setsid nohup node server.js >> "$LOG" 2>&1 &

# Damos un margen y dejamos constancia del resultado.
sleep 3
if curl -fsS -o /dev/null --max-time 5 "$HEALTH" 2>/dev/null; then
  echo "[$(date -Is)] OK — node arriba" >> "$LOG"
else
  echo "[$(date -Is)] AVISO — node no respondió tras reiniciar (revisar keepalive.log)" >> "$LOG"
fi
