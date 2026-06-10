#!/bin/bash
# NaturoApp — script de déploiement (exécuté SUR le VPS par la GitHub Action).
# Rebuild l'image statique et (re)lance le conteneur derrière Traefik.
set -euo pipefail

REPO_DIR="${REPO_DIR:-/home/nova/naturoapp}"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  NaturoApp — déploiement"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd "$REPO_DIR"
echo "[1/3] Code à jour : $(git rev-parse --short HEAD)"

echo "[2/3] Build + (re)démarrage du conteneur…"
docker compose -f compose.yml up -d --build

echo "[3/3] Nettoyage des images inutilisées…"
docker image prune -f >/dev/null 2>&1 || true

echo "✅ Déployé : https://${NATURO_DOMAIN:-naturoapp.konect.xyz}"
