---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related:
  - "[[Merge]]"
  - "[[Conflit de merge]]"
tags:
  - concept
  - git
---
# Rebase

> [!info] En une phrase
> Rejouer ses commits par-dessus la dernière version d'une autre branche, pour obtenir un historique linéaire.

## 1 · Comprendre
### Définition
`git rebase main` (depuis ta branche) prend tes commits, les met de côté, avance ta branche au bout de `main`, puis rejoue tes commits un par un. Résultat : comme si tu avais commencé ton travail **après** les derniers changements de `main`. Les commits rejoués ont de **nouveaux identifiants**.

### Pourquoi ça existe
Garder un historique lisible, sans commits de fusion à chaque mise à jour.

### Le problème résolu
Une branche en retard sur `main`, avec des « Merge branch main into… » à répétition.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  M[main avance] --> R[rebase]
  B[ta branche] --> R
  R --> L[Historique linéaire]
```

### Exemple concret
```bash
git switch feat/dry-run
git fetch
git rebase origin/main
# en cas de conflit : corriger, git add fichier, puis
git rebase --continue      # ou git rebase --abort pour tout annuler
git push --force-with-lease   # ta branche a été réécrite
git pull --rebase             # variante de pull qui rebase au lieu de fusionner
```

### Cas d'utilisation
- Mettre à jour sa branche avant une merge request
- `git pull --rebase` pour éviter des commits de fusion inutiles

> [!warning] À ne pas confondre
> **Rebase** (réécrit tes commits) et **merge** (ajoute un commit de fusion, ne réécrit rien). Ne rebase **jamais** une branche sur laquelle d'autres travaillent.

## 3 · Relier
- **Prérequis** : [[Merge]] · [[Dépôt distant (remote)]]
- **Complémentaires** : [[Annuler dans Git]] · [[Conflit de merge]]
- **Commandes** : [[git rebase]]
