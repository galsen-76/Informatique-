---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Dépôt upstream]]"
  - "[[Dépôt Git]]"
tags:
  - exercice
---
# Exercice — Suivre un dépôt upstream

> [!info] Objectif
> Garder une copie d'un projet tout en récupérant ses nouvelles versions.
> Notions : [[Dépôt upstream]] · [[Dépôt Git]]

## Consignes
- [ ] Clone un petit projet open source, puis ajoute un deuxième remote `upstream` pointant vers l'original
- [ ] Affiche tes remotes
- [ ] Récupère les tags de `upstream` sans rien modifier
- [ ] Crée une branche à partir d'un tag de `upstream`
- [ ] Explique la différence entre `origin` et `upstream` dans ton projet CVAT

> [!question]- Indice
> `git remote add upstream <url>`, `git remote -v`, `git fetch upstream --tags`, `git switch -c ma-branche v1.2.3`.

> [!question]- Solution
> ```bash
> git remote add upstream https://github.com/cvat-ai/cvat.git
> git remote -v
> git fetch upstream --tags
> git switch -c wp4-replication v2.20.0
> ```
> `origin` = ta copie (GitLab de l'entreprise) ; `upstream` = le projet d'origine (GitHub), qu'on lit sans y pousser.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
