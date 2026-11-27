---
type: howto
concepts:
  - "[[Pipeline GitLab CI]]"
  - "[[Code de sortie]]"
  - "[[Tester l'image, pas le dépôt]]"
  - "[[Convention de commit]]"
  - "[[Tag Git]]"
tags:
  - fiche-pratique
---
# Fiche - Réflexes pour déboguer une pipeline

> [!info] Objectif
> Quand un job échoue, trouver la vraie cause vite, sans modifier trois choses à la fois.

## Étapes
1. **Lire le log à partir de la première erreur.** Remonte jusqu'à la **première** ligne en erreur (ou le premier traceback), pas la dernière : les suivantes en sont souvent les conséquences. Repère la commande qui a renvoyé un [[Code de sortie]] non nul.
2. **Partir des fichiers de ta version.** Lis le Dockerfile, le `.gitlab-ci.yml` et la doc **du tag que tu utilises** ([[Tag Git]]), pas ceux de la dernière version sur GitHub. `git grep -n "texte" v2.20.0` cherche dans cette version.
3. **Reproduire en local si possible.** Même image (`docker run -it --rm <image du job> sh`), même commande.
4. **Faire une seule modification.** Un changement = un commit ([[Convention de commit]], `ci:` ou `fix:`) = un pipeline. Si ça repasse au vert, tu sais pourquoi.
5. **Relire avant de pousser.** `git diff --staged` : seulement le changement voulu.
6. **Avant de débloquer un test, lire ce qu'il teste.** Un test qui échoue signale peut-être un vrai problème. Rappel : il tourne **dans l'image** ([[Tester l'image, pas le dépôt]]), donc il faut reconstruire l'image pour qu'il voie ta correction.
7. **Ne pas masquer.** `allow_failure: true`, `|| true` ou un test désactivé font disparaître le symptôme, pas la cause.

> [!success] Vérifier que ça marche
> Tu sais expliquer en une phrase **quelle ligne** échouait, **pourquoi**, et **quel commit** l'a corrigée.

## Liens
[[Pipeline GitLab CI]] · [[Code de sortie]] · [[Tester l'image, pas le dépôt]] · [[Convention de commit]] · [[Tag Git]] · [[git diff]] · [[git grep]]
