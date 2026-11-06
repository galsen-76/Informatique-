---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: compris
level: debutant
prerequisites:
  - "[[Branche Git]]"
parents:
  - "[[Git]]"
related:
  - "[[Conflit de merge]]"
next_review: 2026-11-10
method:
  - Comprendre
  - Explorer
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

> [!warning] À ne pas confondre
> **merge** et **rebase** : le rebase réécrit l'historique pour le rendre linéaire, le merge le conserve tel quel.

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

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
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
