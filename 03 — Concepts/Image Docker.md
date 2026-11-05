---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Docker]]"
parents:
  - "[[Docker]]"
related:
  - "[[Conteneur]]"
next_review: 
method: []
tags:
  - concept
  - devops
---
# Image Docker

> [!info] En une phrase
> Le modèle figé d'une application : système minimal, dépendances et code, prêt à être lancé.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Une **image** est construite à partir d'un `Dockerfile`, couche par couche. Elle est en **lecture seule** et peut être partagée via un registre (Docker Hub, Nexus, GitLab Registry).

## 2 · Explorer

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Notion parente** : [[Docker]]
- **Donne naissance à** : [[Conteneur]]
- **Commande** : [[docker build]]

## 6 · Réviser
> [!question]- Pourquoi copier `package.json` avant le reste du code dans un Dockerfile ?
> Pour profiter du cache : `npm ci` n'est relancé que si les dépendances changent.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
