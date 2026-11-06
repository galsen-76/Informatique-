---
type: concept
domain: backend
module: "[[Module 08 - Backend et API REST]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[API REST]]"
parents:
  - "[[API REST]]"
related:
  - "[[Express]]"
next_review: 
method: []
tags:
  - concept
  - backend
---
# Endpoint

> [!info] En une phrase
> Un point d'entrée précis d'une API : une méthode HTTP + une route.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
`GET /notes` et `POST /notes` sont **deux endpoints différents** sur la même route. Chacun a son contrat : paramètres attendus, corps, réponses possibles.

## 2 · Explorer
### Comment ça fonctionne
- **Paramètre de route** : `/notes/:id` → `req.params.id`
- **Paramètre de requête** : `/notes?done=true` → `req.query.done`
- **Corps** : envoyé en JSON avec POST/PUT/PATCH → `req.body`

## 3 · Pratiquer
- Les exercices de cette notion sont listés en haut de la fiche et dans *Validation de la maîtrise*.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[API REST]]
- **Mène à** : [[Express]] (qui permet de les déclarer)

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
