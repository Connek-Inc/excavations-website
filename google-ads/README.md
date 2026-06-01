# Google Ads — Campaña Drain Français (Mini Excavations Érable)

Dos vías para montar la campaña: **CSV** (manual, sin credenciales, listo hoy) y **API** (script Python, requiere acceso API).

```
google-ads/
├── csv/
│   ├── keywords.csv      # 23 keywords en 4 ad groups
│   ├── negatives.csv     # negativas de campaña
│   └── ads_rsa.csv       # 4 RSA (1 por ad group)
└── scripts/
    ├── build_drain_francais_campaign.py
    ├── google-ads.yaml.example
    └── requirements.txt
```

---

## Vía A — CSV en Google Ads Editor (recomendado para empezar HOY)

1. Descarga **Google Ads Editor** (gratis) y conéctalo a la cuenta.
2. Crea primero, manualmente en la UI o Editor, una **campaña de Búsqueda** llamada `Drain Français`:
   - Tipo: Search · solo Red de búsqueda · presupuesto ~60 CAD/día.
   - Puja: *Maximiser les conversions*.
   - Idioma: Francés · Geo: Montréal + Laval + Longueuil + Rive-Nord/Sud.
   - **Estado: PAUSADA** hasta revisar todo.
3. En Editor: **Account → Import → From file** y carga, en orden:
   - `csv/keywords.csv` (crea ad groups + keywords)
   - `csv/negatives.csv` (negativas de campaña)
   - `csv/ads_rsa.csv` (los RSA)
4. Revisa, **Post** los cambios, verifica en la UI y luego activa.

> Nota: el formato CSV de Editor lee los encabezados de columna. Si una columna no se mapea sola, usa el asistente de mapeo de Editor (te deja asignar "Match Type", "Headline 1", etc.).

---

## Vía B — Script API (cuando tengas acceso a la API)

### Qué necesitas conseguir (solo tienes la cuenta Ads)
1. **Developer token** → en la cuenta MCC/manager: *Tools → API Center*. Solicita nivel **Basic**.
2. **OAuth2** → en Google Cloud Console: crea proyecto, habilita *Google Ads API*, crea credenciales OAuth (Desktop app) → obtén `client_id` + `client_secret`.
3. **Refresh token** → genera con el flujo OAuth (script `generate_user_credentials.py` de los ejemplos oficiales de la librería).
4. **Customer ID** de la cuenta (sin guiones).

### Setup
```bash
cd scripts
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp google-ads.yaml.example google-ads.yaml   # y rellena credenciales
```

### Ejecutar
```bash
# 1) Ver el plan sin tocar nada:
python build_drain_francais_campaign.py --customer-id 1234567890 --dry-run

# 2) Crear todo EN PAUSADO:
python build_drain_francais_campaign.py --customer-id 1234567890
```

El script crea: presupuesto, campaña (PAUSADA, Search only), idioma FR, geo (resuelto por API),
4 ad groups + keywords, negativas, 4 RSA, y assets (1 call + 4 sitelinks + 6 callouts).
Todo queda **pausado** para revisión manual antes de activar.

---

## Antes de activar (checklist)
- [ ] Confirmar geo: Gran Montreal (no Bas-Saint-Laurent salvo que operen allí).
- [ ] Conversiones disparando con el tag **AW-18036493782** (form + click-to-call).
- [ ] Google Business Profile vinculado (extensión de ubicación).
- [ ] Email correcto en la landing (`miniexcavationerable@gmail.com`).
- [ ] Tel de los anuncios = tel de la landing (tracking de llamadas).
