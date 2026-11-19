---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Tag Git]]"
  - "[[Changelog]]"
tags:
  - exercice
---
# Exercice — Versions, tags et changelog

> [!info] Objectif
> Marquer des versions et documenter ce qui change entre elles.
> Notions : [[Tag Git]] · [[Changelog]]

## Consignes
- [ ] Dans `essai-zip`, crée un tag annoté `v0.1.0` et ajoute un `CHANGELOG.md`
- [ ] Fais deux nouveaux commits (une fonctionnalité, une correction) puis tague `v0.2.0`
- [ ] Complète le changelog pour `v0.2.0` (rubriques Added / Fixed)
- [ ] Affiche les différences entre les deux versions (`--stat`)
- [ ] Dans le dépôt CVAT, trouve le tag de la version utilisée par ton équipe et lis son changelog

> [!question]- Indice
> `git tag -a v0.1.0 -m "…"`, `git diff v0.1.0 v0.2.0 --stat`, `git tag -l "v2.*"`.

> [!question]- Solution
> ```bash
> git tag -a v0.1.0 -m "Première version"
> # … commits …
> git tag -a v0.2.0 -m "Option --dry-run et correction du nom d'archive"
> git diff v0.1.0 v0.2.0 --stat
> git push origin --tags
> ```
> ```markdown
> ## [0.2.0] - 2026-11-10
> ### Added
> - Option `--dry-run`
> ### Fixed
> - Nom d'archive avec des espaces
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
