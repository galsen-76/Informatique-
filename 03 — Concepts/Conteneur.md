---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Image Docker]]"
parents:
  - "[[Docker]]"
related: []
next_review: 
method: []
tags:
  - concept
  - devops
---
# Conteneur

> [!info] En une phrase
> Une instance isolée et jetable d'une image Docker, en cours d'exécution.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **conteneur** a son propre système de fichiers, ses processus et son réseau, mais partage le noyau de la machine hôte. On peut en lancer plusieurs à partir de la même image.

## 2 · Explorer

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Image Docker]]
- **Commandes** : [[docker run]] · [[docker ps]]

## 6 · Réviser
> [!question]- Que deviennent les fichiers écrits dans un conteneur supprimé ?
> Ils sont perdus, sauf s'ils sont dans un volume.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
