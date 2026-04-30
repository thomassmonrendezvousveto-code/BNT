#!/bin/bash
# Build statique BNT pour drag-drop Netlify
# Usage : double-clic sur le fichier OU dans Terminal :
#   bash ~/Desktop/baby\ next\ time/Baby_Next_Time_Codex_Repo_Nextjs_FR/build-static-zip.sh

set -e
cd "$(dirname "$0")"

echo "→ Installation des dépendances (1ère fois ~2 min, ensuite instantané)..."
pnpm install --silent

echo "→ Build statique du site..."
pnpm --filter web build

echo "→ Création du zip sur le bureau..."
cd apps/web/out
ZIP_PATH="$HOME/Desktop/bnt-static-netlify.zip"
rm -f "$ZIP_PATH"
zip -rq "$ZIP_PATH" .

echo ""
echo "✅ Zip prêt : $ZIP_PATH"
echo ""
echo "PROCHAINE ÉTAPE :"
echo "  1. Va sur https://app.netlify.com/drop"
echo "  2. Glisse le fichier bnt-static-netlify.zip de ton bureau dans la zone de drop"
echo "  3. URL prête en ~30 s"
echo ""

# Ouvre le bureau pour repérer le zip
open "$HOME/Desktop"
