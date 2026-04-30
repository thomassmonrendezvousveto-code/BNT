# Architecture proposée

## Choix retenu
**Next.js full-stack avec package métier partagé**.

Pourquoi :
- un seul déploiement pour le MVP,
- même langage front/back,
- itération rapide avec Codex,
- moteur de scoring réutilisable côté API, tests et futurs outils internes.

## Flux principal
1. Le front charge le questionnaire depuis `@bnt/orientation-engine`.
2. L'utilisatrice répond au formulaire.
3. Le front envoie `POST /api/orientation`.
4. L'API appelle `calculeOrientationBNT(reponses)`.
5. Le résultat renvoie orientation principale, scores, modules et actions.

## Extensions prévues
- sauvegarde de brouillon,
- authentification,
- CRM / care manager,
- génération de kit PDF,
- prise de rendez-vous.
