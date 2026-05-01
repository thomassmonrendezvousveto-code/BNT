#!/bin/bash
# Push d'une mise a jour vers GitHub - Baby Next Time
# Double-clique ce fichier pour nettoyer, commit et pousser sur GitHub

cd "$(dirname "$0")"

clear
echo ""
echo "=================================================="
echo "   PUSH MISE A JOUR -> GITHUB"
echo "=================================================="
echo ""

# Nettoyer les fichiers de lock potentiellement laisses par des processus interrompus
echo "Nettoyage des locks git..."
rm -f .git/HEAD.lock .git/index.lock .git/objects/maintenance.lock 2>/dev/null
echo "  OK"
echo ""

# Verifier si un commit est deja prêt
if git diff --cached --quiet && git diff --quiet; then
  echo "Pas de modifications locales - on ne fait que pousser le dernier commit."
else
  echo "Modifications detectees - creation d'un commit..."
  git add .
  git commit -m "Mise a jour - $(date '+%d/%m/%Y %H:%M')" 2>&1 | tail -3
fi

echo ""
echo "Dernier commit a pousser :"
git log -1 --oneline
echo ""

echo "=================================================="
echo "   ENVOI VERS GITHUB"
echo "=================================================="
echo ""
echo "  Si on te demande des identifiants :"
echo "  - Username : thomassmonrendezvousveto-code"
echo "  - Password : ton Personal Access Token"
echo "    (le meme que la derniere fois)"
echo ""

git push

PUSH_EXIT=$?

echo ""
if [ $PUSH_EXIT -eq 0 ]; then
  echo "=================================================="
  echo "   ✅ PUSH TERMINE"
  echo "=================================================="
  echo ""
  echo "  Vercel va detecter le push et redeployer"
  echo "  automatiquement. Compte ~1-2 min."
  echo ""
  echo "  Vois le deploiement ici :"
  echo "  https://vercel.com/thomassmonrendezvousveto-codes-projects/bnt"
else
  echo "=================================================="
  echo "   ❌ PUSH EN ECHEC"
  echo "=================================================="
  echo ""
  echo "  Verifie tes identifiants et reessaie en"
  echo "  redemarrant ce script."
fi
echo ""
read -p "Appuie sur Entree pour fermer... " -r
