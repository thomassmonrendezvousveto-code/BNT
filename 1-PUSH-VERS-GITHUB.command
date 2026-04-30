#!/bin/bash
# Push automatique vers GitHub — Baby Next Time
# Double-clique ce fichier pour envoyer le code sur GitHub

set -e
cd "$(dirname "$0")"

clear
echo ""
echo "=================================================="
echo "   PUSH BABY NEXT TIME → GITHUB"
echo "=================================================="
echo ""
echo "  Dossier : $(pwd)"
echo "  Repo    : github.com/thomassmonrendezvousveto-code/BNT"
echo ""
echo "=================================================="
echo ""

# 1. Nettoyer toute trace d'init git précédent
if [ -d ".git" ]; then
  echo "▸ Nettoyage de l'ancien état git..."
  rm -rf .git
  echo "  OK"
  echo ""
fi

# 2. Initialiser le dépôt
echo "▸ Initialisation du dépôt git..."
git init -q
git config user.email "thomas.s.monrendezvousveto@gmail.com"
git config user.name "Thomas Savey"
git branch -M main
echo "  OK"
echo ""

# 3. Ajouter tous les fichiers (le .gitignore exclut node_modules, .next, etc.)
echo "▸ Ajout des fichiers..."
git add .
NB_FILES=$(git diff --cached --name-only | wc -l | tr -d ' ')
echo "  $NB_FILES fichiers prêts"
echo ""

# 4. Créer le commit
echo "▸ Création du commit..."
git commit -q -m "Initial commit — Baby Next Time post-diagnostic refonte"
echo "  OK"
echo ""

# 5. Configurer le remote GitHub
echo "▸ Configuration du dépôt distant..."
git remote add origin https://github.com/thomassmonrendezvousveto-code/BNT.git
echo "  OK"
echo ""

# 6. Push
echo "=================================================="
echo "   ENVOI VERS GITHUB"
echo "=================================================="
echo ""
echo "  Si on te demande des identifiants :"
echo "  - Username : ton nom d'utilisateur GitHub"
echo "  - Password : ton 'Personal Access Token'"
echo "    (pas le mot de passe — un token créé sur"
echo "     github.com/settings/tokens)"
echo ""
echo "=================================================="
echo ""

git push -u origin main

echo ""
echo "=================================================="
echo "   ✅ TERMINÉ — Code envoyé sur GitHub"
echo "=================================================="
echo ""
echo "  Vérifie ici :"
echo "  https://github.com/thomassmonrendezvousveto-code/BNT"
echo ""
echo "  Tu peux fermer cette fenêtre."
echo ""
read -p "Appuie sur Entrée pour fermer... " -r
