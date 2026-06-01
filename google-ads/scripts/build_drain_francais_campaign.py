#!/usr/bin/env python3
"""
Crea la campaña "Drain Français" (Search) en Google Ads vía API.

- Crea TODO en estado PAUSADO para revisión manual antes de activar.
- Soporta --dry-run para imprimir el plan sin aplicar cambios.
- Datos alineados con los CSV de ../csv/.

Requisitos:
    pip install google-ads
    Configurar credenciales en google-ads.yaml (ver google-ads.yaml.example)

Uso:
    python build_drain_francais_campaign.py --customer-id 1234567890 --dry-run
    python build_drain_francais_campaign.py --customer-id 1234567890
"""
import argparse
import sys

from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

# ---------------------------------------------------------------------------
# CONFIG — editar aquí los datos de negocio
# ---------------------------------------------------------------------------
CAMPAIGN_NAME = "Drain Français"
DAILY_BUDGET_CAD = 60.00            # presupuesto diario
FINAL_URL = "https://excavationserable.com/services/drain-francais"
PHONE = "+15148309973"
PHONE_COUNTRY = "CA"

LANGUAGE_FR = "1002"               # languageConstants/1002 = French

# Ciudades núcleo (se resuelven a geo target constants vía API).
GEO_LOCATIONS = [
    "Montreal, Quebec, Canada",
    "Laval, Quebec, Canada",
    "Longueuil, Quebec, Canada",
    "Brossard, Quebec, Canada",
    "Terrebonne, Quebec, Canada",
    "Repentigny, Quebec, Canada",
    "Saint-Jerome, Quebec, Canada",
    "Blainville, Quebec, Canada",
]

# Ad groups -> keywords (texto, match_type)
AD_GROUPS = {
    "Installation": [
        ("installation drain français", "EXACT"),
        ("installation drain français", "PHRASE"),
        ("installer un drain français", "PHRASE"),
        ("poser un drain français", "PHRASE"),
        ("drain français maison", "PHRASE"),
        ("drain français neuf", "PHRASE"),
    ],
    "Réparation": [
        ("réparation drain français", "EXACT"),
        ("réparation drain français", "PHRASE"),
        ("remplacer drain français", "PHRASE"),
        ("drain français bouché", "PHRASE"),
        ("drain français défectueux", "PHRASE"),
        ("refaire drain français", "PHRASE"),
    ],
    "Prix-Soumission": [
        ("prix drain français", "PHRASE"),
        ("coût drain français", "PHRASE"),
        ("prix drain français 2026", "PHRASE"),
        ("soumission drain français", "PHRASE"),
        ("estimation drain français", "PHRASE"),
    ],
    "Local": [
        ("drain français près de moi", "PHRASE"),
        ("drain français Montréal", "PHRASE"),
        ("drain français Laval", "PHRASE"),
        ("drain français Longueuil", "PHRASE"),
        ("entrepreneur drain français", "PHRASE"),
        ("compagnie drain français", "PHRASE"),
    ],
}

NEGATIVE_KEYWORDS = [
    "emploi", "job", "carrière", "salaire", "formation", "cours",
    "définition", "wikipedia", "schéma", "plan", "pdf", "diy",
    "bricolage", "location", "louer", "pelle", "déneigement",
    "usagé", "pièces",
]

# RSA por ad group: (headlines[], descriptions[], path1, path2)
RSA_BY_AD_GROUP = {
    "Installation": (
        [
            "Installation Drain Français", "Réparation Drain Français",
            "Certifié RBQ • 15 Ans", "Garantie Écrite 15 Ans",
            "Soumission Gratuite en 24h", "Prix Dès 4 000$ Tout Inclus",
            "Une Visite = Prix Exact", "4.9★ • 127 Avis Vérifiés",
            "Pleinement Assurés", "Évitez l'Eau au Sous-Sol",
            "Entreprise Familiale", "Service Grand Montréal",
            "Résidentiel & Commercial", "Appelez (514) 830-9973",
            "Demandez Votre Soumission",
        ],
        [
            "Installation de drain français. Garantie écrite 15 ans. Certifié RBQ.",
            "Soumission gratuite en 24h. 15+ ans, 4.9/5. Appelez le (514) 830-9973.",
            "Membrane drainante, raccordement. Pleinement assurés. Dès 4 000$ tout inclus.",
            "Eau au sous-sol? Service rapide et professionnel. Estimation sans engagement.",
        ],
        "drain-francais", "soumission-gratuite",
    ),
    "Réparation": (
        [
            "Réparation Drain Français", "Drain Français Bouché?",
            "Certifié RBQ • 15 Ans", "Garantie Écrite 15 Ans",
            "Soumission Gratuite en 24h", "Diagnostic par Caméra HD",
            "Une Visite = Prix Exact", "4.9★ • 127 Avis Vérifiés",
            "Pleinement Assurés", "Évitez l'Eau au Sous-Sol",
            "Remplacement & Réparation", "Service Grand Montréal",
            "Résidentiel & Commercial", "Appelez (514) 830-9973",
            "Demandez Votre Soumission",
        ],
        [
            "Drain français bouché? Réparation et remplacement garantis 15 ans. Certifié RBQ.",
            "Soumission gratuite en 24h. 15+ ans, 4.9/5. Appelez le (514) 830-9973.",
            "Diagnostic par caméra HD, raccordement. Pleinement assurés. Grand Montréal.",
            "Eau au sous-sol? Intervention rapide. Estimation sans engagement.",
        ],
        "drain-francais", "reparation",
    ),
    "Prix-Soumission": (
        [
            "Drain Français Dès 4 000$", "Prix Tout Inclus 2026",
            "Soumission Gratuite en 24h", "Certifié RBQ • 15 Ans",
            "Garantie Écrite 15 Ans", "Une Visite = Prix Exact",
            "4.9★ • 127 Avis Vérifiés", "Pleinement Assurés",
            "Sans Engagement", "Entreprise Familiale",
            "Service Grand Montréal", "Installation & Réparation",
            "Nos Machines = Meilleurs Prix", "Appelez (514) 830-9973",
            "Obtenez Votre Soumission",
        ],
        [
            "Drain français dès 4 000$ tout inclus. Soumission gratuite en 24h. Certifié RBQ.",
            "Une visite et vous saurez le coût exact. Garantie écrite 15 ans transférable.",
            "15+ ans, 500+ projets, 4.9/5. Nos machines = meilleurs prix. Pleinement assurés.",
            "Estimation gratuite sans engagement. Appelez le (514) 830-9973.",
        ],
        "drain-francais", "prix",
    ),
    "Local": (
        [
            "Drain Français Grand Montréal", "Entrepreneur Certifié RBQ",
            "Drain Français Près de Vous", "Soumission Gratuite en 24h",
            "Garantie Écrite 15 Ans", "15+ Ans d'Expertise",
            "Une Visite = Prix Exact", "4.9★ • 127 Avis Vérifiés",
            "Pleinement Assurés", "Installation & Réparation",
            "Service Rapide Local", "Prix Dès 4 000$",
            "Entreprise Familiale", "Appelez (514) 830-9973",
            "Demandez Votre Soumission",
        ],
        [
            "Entrepreneur drain français certifié RBQ, Grand Montréal. Garantie 15 ans.",
            "Soumission gratuite en 24h. 15+ ans, 4.9/5. Service local rapide.",
            "Installation et réparation, résidentiel et commercial. Dès 4 000$ tout inclus.",
            "Drain français près de chez vous. Estimation gratuite. (514) 830-9973.",
        ],
        "drain-francais", "soumission-gratuite",
    ),
}

SITELINKS = [
    ("Soumission Gratuite", "https://excavationserable.com/soumission-gratuite"),
    ("Inspection Caméra", "https://excavationserable.com/services/inspection-camera"),
    ("Réparation Fissures", "https://excavationserable.com/services/reparation-fissures"),
    ("Urgences 24/7", "https://excavationserable.com/urgences"),
]

CALLOUTS = [
    "Certifié RBQ", "Garantie 15 ans transférable", "Soumission gratuite 24h",
    "Pleinement assurés", "15+ ans d'expérience", "Membre APCHQ",
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def micros(amount):
    return int(round(amount * 1_000_000))


def resolve_geo_targets(client, customer_id, location_names):
    """Resuelve nombres de ciudad a geo target constants."""
    gtc_service = client.get_service("GeoTargetConstantService")
    request = client.get_type("SuggestGeoTargetConstantsRequest")
    request.locale = "fr"
    request.country_code = "CA"
    request.location_names.names.extend(location_names)
    response = gtc_service.suggest_geo_target_constants(request)
    resolved = {}
    for s in response.geo_target_constant_suggestions:
        c = s.geo_target_constant
        # quedarse con el primer match por nombre buscado
        key = s.search_term
        if key not in resolved:
            resolved[key] = c.resource_name
    return list(resolved.values())


# ---------------------------------------------------------------------------
# Main build
# ---------------------------------------------------------------------------
def build(client, customer_id, dry_run):
    ga_service = client.get_service("GoogleAdsService")

    if dry_run:
        print("=== DRY RUN — no se aplicará ningún cambio ===\n")
        print(f"Campaña: {CAMPAIGN_NAME} (PAUSED) — budget {DAILY_BUDGET_CAD} CAD/día")
        print(f"Geo: {len(GEO_LOCATIONS)} ciudades · Idioma: FR · Search only")
        for ag, kws in AD_GROUPS.items():
            print(f"\n  Ad group: {ag} ({len(kws)} keywords)")
            for txt, mt in kws:
                print(f"    [{mt:6}] {txt}")
        print(f"\n  Negativas (campaña): {len(NEGATIVE_KEYWORDS)}")
        print(f"  RSA: {len(RSA_BY_AD_GROUP)} (1 por ad group)")
        print(f"  Sitelinks: {len(SITELINKS)} · Callouts: {len(CALLOUTS)} · Call asset: 1")
        print("\nEjecuta sin --dry-run para crear todo en estado PAUSADO.")
        return

    # 1) Budget
    budget_op = client.get_type("CampaignBudgetOperation")
    b = budget_op.create
    b.name = f"{CAMPAIGN_NAME} - Budget"
    b.amount_micros = micros(DAILY_BUDGET_CAD)
    b.delivery_method = client.enums.BudgetDeliveryMethodEnum.STANDARD
    b.explicitly_shared = False
    budget_res = client.get_service("CampaignBudgetService").mutate_campaign_budgets(
        customer_id=customer_id, operations=[budget_op]
    )
    budget_rn = budget_res.results[0].resource_name
    print(f"✓ Budget: {budget_rn}")

    # 2) Campaign (PAUSED, Search only, MaximizeConversions)
    camp_op = client.get_type("CampaignOperation")
    c = camp_op.create
    c.name = CAMPAIGN_NAME
    c.status = client.enums.CampaignStatusEnum.PAUSED
    c.advertising_channel_type = client.enums.AdvertisingChannelTypeEnum.SEARCH
    c.campaign_budget = budget_rn
    c.maximize_conversions.CopyFrom(client.get_type("MaximizeConversions"))
    c.network_settings.target_google_search = True
    c.network_settings.target_search_network = False
    c.network_settings.target_content_network = False
    c.network_settings.target_partner_search_network = False
    camp_res = client.get_service("CampaignService").mutate_campaigns(
        customer_id=customer_id, operations=[camp_op]
    )
    campaign_rn = camp_res.results[0].resource_name
    print(f"✓ Campaña: {campaign_rn}")

    # 3) Criterios de campaña: idioma + geo + negativas
    cc_service = client.get_service("CampaignCriterionService")
    crit_ops = []

    # idioma FR
    lang_op = client.get_type("CampaignCriterionOperation")
    lc = lang_op.create
    lc.campaign = campaign_rn
    lc.language.language_constant = f"languageConstants/{LANGUAGE_FR}"
    crit_ops.append(lang_op)

    # geo (resueltos por API)
    geo_targets = resolve_geo_targets(client, customer_id, GEO_LOCATIONS)
    for rn in geo_targets:
        geo_op = client.get_type("CampaignCriterionOperation")
        gc = geo_op.create
        gc.campaign = campaign_rn
        gc.location.geo_target_constant = rn
        crit_ops.append(geo_op)

    # negativas de campaña
    for neg in NEGATIVE_KEYWORDS:
        neg_op = client.get_type("CampaignCriterionOperation")
        nc = neg_op.create
        nc.campaign = campaign_rn
        nc.negative = True
        nc.keyword.text = neg
        nc.keyword.match_type = client.enums.KeywordMatchTypeEnum.BROAD
        crit_ops.append(neg_op)

    cc_service.mutate_campaign_criteria(customer_id=customer_id, operations=crit_ops)
    print(f"✓ Criterios: 1 idioma + {len(geo_targets)} geo + {len(NEGATIVE_KEYWORDS)} negativas")

    # 4) Ad groups + keywords + RSA
    ag_service = client.get_service("AdGroupService")
    agc_service = client.get_service("AdGroupCriterionService")
    aga_service = client.get_service("AdGroupAdService")

    for ag_name, keywords in AD_GROUPS.items():
        ag_op = client.get_type("AdGroupOperation")
        ag = ag_op.create
        ag.name = ag_name
        ag.campaign = campaign_rn
        ag.status = client.enums.AdGroupStatusEnum.ENABLED
        ag.type_ = client.enums.AdGroupTypeEnum.SEARCH_STANDARD
        ag_res = ag_service.mutate_ad_groups(customer_id=customer_id, operations=[ag_op])
        ag_rn = ag_res.results[0].resource_name
        print(f"✓ Ad group: {ag_name}")

        # keywords
        kw_ops = []
        for text, match in keywords:
            kop = client.get_type("AdGroupCriterionOperation")
            k = kop.create
            k.ad_group = ag_rn
            k.status = client.enums.AdGroupCriterionStatusEnum.ENABLED
            k.keyword.text = text
            k.keyword.match_type = getattr(client.enums.KeywordMatchTypeEnum, match)
            kw_ops.append(kop)
        agc_service.mutate_ad_group_criteria(customer_id=customer_id, operations=kw_ops)
        print(f"    + {len(kw_ops)} keywords")

        # RSA
        headlines, descriptions, p1, p2 = RSA_BY_AD_GROUP[ag_name]
        ad_op = client.get_type("AdGroupAdOperation")
        aga = ad_op.create
        aga.ad_group = ag_rn
        aga.status = client.enums.AdGroupAdStatusEnum.ENABLED
        ad = aga.ad
        ad.final_urls.append(FINAL_URL)
        rsa = ad.responsive_search_ad
        for h in headlines:
            asset = client.get_type("AdTextAsset")
            asset.text = h
            rsa.headlines.append(asset)
        for d in descriptions:
            asset = client.get_type("AdTextAsset")
            asset.text = d
            rsa.descriptions.append(asset)
        rsa.path1 = p1
        rsa.path2 = p2
        aga_service.mutate_ad_group_ads(customer_id=customer_id, operations=[ad_op])
        print(f"    + 1 RSA")

    # 5) Assets de campaña (call, sitelinks, callouts)
    create_assets(client, customer_id, campaign_rn)

    print("\n✅ Listo. Todo creado en estado PAUSADO. Revisa en la UI antes de activar.")


def create_assets(client, customer_id, campaign_rn):
    asset_service = client.get_service("AssetService")
    ca_service = client.get_service("CampaignAssetService")

    def new_asset_op():
        return client.get_type("AssetOperation")

    asset_ops = []
    field_types = []  # paralelo a los resource names creados

    # Call asset
    op = new_asset_op()
    call = op.create.call_asset
    call.country_code = PHONE_COUNTRY
    call.phone_number = PHONE
    asset_ops.append(op)
    field_types.append("CALL")

    # Sitelinks
    for text, url in SITELINKS:
        op = new_asset_op()
        sl = op.create.sitelink_asset
        sl.link_text = text
        op.create.final_urls.append(url)
        asset_ops.append(op)
        field_types.append("SITELINK")

    # Callouts
    for text in CALLOUTS:
        op = new_asset_op()
        op.create.callout_asset.callout_text = text
        asset_ops.append(op)
        field_types.append("CALLOUT")

    asset_res = asset_service.mutate_assets(customer_id=customer_id, operations=asset_ops)

    # vincular cada asset a la campaña con su field type
    link_ops = []
    enum = client.enums.AssetFieldTypeEnum
    for res, ftype in zip(asset_res.results, field_types):
        lop = client.get_type("CampaignAssetOperation")
        la = lop.create
        la.campaign = campaign_rn
        la.asset = res.resource_name
        la.field_type = getattr(enum, ftype)
        link_ops.append(lop)
    ca_service.mutate_campaign_assets(customer_id=customer_id, operations=link_ops)
    print(f"✓ Assets: 1 call + {len(SITELINKS)} sitelinks + {len(CALLOUTS)} callouts")


def main():
    parser = argparse.ArgumentParser(description="Crear campaña Drain Français en Google Ads")
    parser.add_argument("--customer-id", required=True, help="Customer ID sin guiones, ej. 1234567890")
    parser.add_argument("--config", default="google-ads.yaml", help="Ruta a google-ads.yaml")
    parser.add_argument("--dry-run", action="store_true", help="Imprime el plan sin aplicar cambios")
    args = parser.parse_args()

    customer_id = args.customer_id.replace("-", "")

    if args.dry_run:
        build(None, customer_id, dry_run=True)
        return

    try:
        client = GoogleAdsClient.load_from_storage(args.config)
        build(client, customer_id, dry_run=False)
    except GoogleAdsException as ex:
        print(f"\n❌ Error de la API (request_id={ex.request_id}):", file=sys.stderr)
        for error in ex.failure.errors:
            print(f"   {error.error_code}: {error.message}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
