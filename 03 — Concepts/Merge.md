---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Branche Git]]"
parents:
  - "[[Git]]"
related:
  - "[[Conflit de merge]]"
next_review: 
method: []
tags:
  - concept
  - git
---
# Merge

> [!info] En une phrase
> Intégrer le travail d'une branche dans une autre.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Le **merge** (fusion) combine l'historique de deux branches. Deux cas : **fast-forward** (la branche cible n'a pas bougé, Git avance simplement le pointeur) ou **commit de fusion** (les deux ont avancé, Git crée un commit à deux parents).

### Pourquoi ça existe
Réunir le travail fait en parallèle sur des branches différentes.

### Le problème résolu
Recopier à la main les changements d'une branche dans une autre.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
gitGraph
  commit id: "A"
  branch feature
  checkout feature
  commit id: "B"
  checkout main
  commit id: "C"
  merge feature id: "Merge"
```

### Exemple concret
```bash
git switch main
git pull
git merge feat/dry-run        # fast-forward ou commit de fusion
git log --oneline --graph -n 10
```
En équipe, on fusionne surtout via une [[Merge request]] sur GitLab.

### Cas d'utilisation
- Intégrer une fonctionnalité terminée dans `main`
- Récupérer `main` dans sa branche (ou [[Rebase]])

> [!warning] À ne pas confondre
> **merge** et **rebase** : le rebase réécrit l'historique pour le rendre linéaire, le merge le conserve tel quel.

## 3 · Pratiquer
- Les exercices de cette notion sont listés en haut de la fiche et dans *Validation de la maîtrise*.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Branche Git]]
- **Mène à** : [[Conflit de merge]]
- **Commande** : [[git merge]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
