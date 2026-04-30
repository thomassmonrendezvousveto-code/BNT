# Baby Next Time — squelette repo recommandé pour Codex

Ce repo est la meilleure base pour faire travailler Codex sur Baby Next Time :
- une vraie structure de projet,
- le moteur d'orientation déjà branchable,
- le questionnaire en JSON,
- les docs métier de contexte,
- un `AGENTS.md` pour guider les itérations.

## Pourquoi cette option
Le ZIP de specs seul suffit pour la compréhension. Ce squelette est préférable pour la construction rapide du produit : Codex voit où coder le front, l'API et le moteur métier.

## Structure
- `apps/web` : interface Next.js + route API `POST /api/orientation`
- `packages/orientation-engine` : logique métier partagée
- `docs/context` : PDFs et contrat API issus des livrables précédents
- `AGENTS.md` : règles projet pour Codex

## Démarrage
```bash
pnpm install
pnpm dev
```

## Premiers objectifs pour Codex
1. Rendre le questionnaire conditionnel et sauvegardable.
2. Couvrir le moteur métier par des tests.
3. Afficher une vraie timeline et les modules secondaires.
4. Brancher un annuaire de professionnels labellisés.

## API MVP
`POST /api/orientation`

Payload minimal :
```json
{
  "reponses": {
    "A1": "j_ai_vecu_une_fausse_couche_recemment",
    "A4": "moins_de_15_jours",
    "A5": "moi_et_mon_partenaire"
  }
}
```

## Notes
Le contenu métier doit rester en français. Les documents de `docs/context` sont à garder comme référence fonctionnelle.
