#!/bin/bash
# Double-cliquer sur ce fichier ouvre Terminal et lance le build automatiquement.
# Résultat : un zip "bnt-static-netlify.zip" sur ton bureau.

set -e
cd "$(dirname "$0")"

clear
echo "════════════════════════════════════════════════════════════"
echo "  Build statique Baby Next Time pour Netlify"
echo "════════════════════════════════════════════════════════════"
echo ""

# Active corepack pour avoir pnpm
if ! command -v pnpm >/dev/null 2>&1; then
  echo "→ Activation de pnpm via corepack..."
  corepack enable >/dev/null 2>&1 || sudo corepack enable
fi

echo "→ Étape 1/3 : installation des dépendances (peut prendre 2 min la 1re fois)"
pnpm install --silent

echo "→ Étape 2/3 : build statique du site (1-2 min)"
pnpm --filter web build

echo "→ Étape 3/3 : création du zip sur le bureau"
cd apps/web/out
ZIP_PATH="$HOME/Desktop/bnt-static-netlify.zip"
rm -f "$ZIP_PATH"
zip -rq "$ZIP_PATH" .

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  ✅  TERMINÉ"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "  Zip créé : ~/Desktop/bnt-static-netlify.zip"
echo ""
echo "  PROCHAINE ÉTAPE :"
echo "  1. Va sur https://app.netlify.com/drop"
echo "  2. Glisse le zip 'bnt-static-netlify.zip' dans la page"
echo "  3. URL prête en 30 s → envoie-la à Chloé"
echo ""
echo "════════════════════════════════════════════════════════════"

# Ouvre la page Netlify Drop directement dans ton navigateur
open "https://app.netlify.com/drop"
# Ouvre le bureau pour repérer le zip
open "$HOME/Desktop"

echo ""
echo "(Tu peux fermer cette fenêtre Terminal)"
read -n 1 -s -r -p "Appuie sur une touche pour fermer..."
