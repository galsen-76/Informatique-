---
type: concept
domain: backend
module: "[[Module 08 - Backend et API REST]]"
status: compris
level: debutant
prerequisites:
  - "[[API REST]]"
parents:
  - "[[API REST]]"
related:
  - "[[Express]]"
next_review: 2026-11-09
method:
  - Comprendre
  - Explorer
  - Pratiquer
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
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[API REST]]
- **Mène à** : [[Express]] (qui permet de les déclarer)

## 6 · Réviser
> [!question]- `GET /notes` et `POST /notes` : un ou deux endpoints ?
> Deux : même route, méthodes différentes.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
