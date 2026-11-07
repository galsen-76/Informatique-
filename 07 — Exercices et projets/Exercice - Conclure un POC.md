---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Preuve de concept (POC)]]"
  - "[[Dette technique]]"
  - "[[Décision d'architecture (ADR)]]"
  - "[[MVP (produit minimum viable)]]"
tags:
  - exercice
---
# Exercice — Conclure un POC

> [!info] Objectif
> À la fin de ton POC CVAT, rédiger ce qu'on attend vraiment d'un POC : une réponse, un compte rendu, une décision et la liste des raccourcis à reprendre.
> Notions : [[Preuve de concept (POC)]] · [[Dette technique]] · [[Décision d'architecture (ADR)]] · [[MVP (produit minimum viable)]]

> [!note] À faire quand ton POC est terminé (ou à sa date de fin)
> Reprends ta note de l'[[Exercice - Cadrer son POC CVAT]].

## Consignes
- [ ] Pour chaque critère de succès du cadrage : atteint, partiellement ou non, avec la preuve (mesure, capture, lien vers la pipeline)
- [ ] Liste ce que tu as **découvert** et que tu n'avais pas prévu (limites, surprises)
- [ ] Liste la dette technique : chaque raccourci pris (cherche `# DETTE :` dans ton code) et ce qu'il faudrait faire à la place
- [ ] Écris ta recommandation : continuer, changer d'approche ou abandonner, en 3 phrases
- [ ] Écris l'ADR n°1 (contexte, décision, alternatives écartées, conséquences) et range-le dans `docs/adr/` de ton dépôt
- [ ] Si la recommandation est de continuer : liste ce qui doit être réécrit ou ajouté pour passer au MVP
- [ ] Présente le compte rendu à ton responsable en 5 minutes maximum

> [!question]- Indice
> Un compte rendu de POC se lit en deux minutes. Commence par la réponse (oui, non, oui mais), puis les preuves, puis les limites. La dette technique typique d'un POC : secrets en dur, pas de gestion d'erreur, pas de tests, adresses écrites dans le code, pas de journaux.

> [!question]- Solution
> Plan type : **1. Réponse** (« Oui, avec deux réserves ») · **2. Critères** (tableau critère, résultat, preuve) · **3. Découvertes** · **4. Dette à reprendre** · **5. Recommandation** · **6. Prochaines étapes vers le MVP** (ce qui va dans le backlog). L'ADR reprend la décision seule, en une page, avec les alternatives. Un exemple complet d'ADR est dans la fiche [[Décision d'architecture (ADR)]].

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
