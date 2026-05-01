#!/bin/bash
# Teste l'API kit-email et affiche la vraie reponse Resend
# Double-clique pour l'executer

cd "$(dirname "$0")"

clear
echo ""
echo "=================================================="
echo "   TEST API KIT-EMAIL"
echo "=================================================="
echo ""
echo "  POST vers https://bnt-lac.vercel.app/api/kit-email"
echo "  Destinataire : thomas.s.monrendezvousveto@gmail.com"
echo ""
echo "=================================================="
echo ""

RESPONSE=$(curl -sS -X POST 'https://bnt-lac.vercel.app/api/kit-email' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "thomas.s.monrendezvousveto@gmail.com",
    "prenom": "Thomas",
    "orientation": "parcours_coordonne_standard",
    "reponses": {}
  }')

echo "REPONSE BRUTE :"
echo ""
echo "$RESPONSE"
echo ""
echo "=================================================="
echo ""

# Joliment formater si python est dispo
if command -v python3 &> /dev/null; then
  echo "REPONSE FORMATEE :"
  echo ""
  echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "(non-JSON ou erreur de parsing)"
  echo ""
fi

echo "=================================================="
echo "   FIN DU TEST"
echo "=================================================="
echo ""
read -p "Appuie sur Entree pour fermer... " -r
