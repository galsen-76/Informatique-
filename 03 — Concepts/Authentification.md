---
type: concept
domain: securite
module: "[[Module 10 - Authentification et sécurité]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[HTTP]]"
parents: []
related:
  - "[[Middleware]]"
  - "[[JWT]]"
next_review: 
method: []
tags:
  - concept
  - securite
---
# Authentification

> [!info] En une phrase
> Vérifier l'identité de celui qui fait une requête (« qui es-tu ? »).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
L'**authentification** prouve l'identité (mot de passe, jeton). L'**autorisation** décide ensuite ce que cette identité a le droit de faire. Comme [[HTTP]] est sans état, la preuve doit accompagner chaque requête : cookie de session ou jeton ([[JWT]]).

## 2 · Explorer

> [!warning] À ne pas confondre
> **Authentification** (qui es-tu ? → `401`) et **autorisation** (as-tu le droit ? → `403`).

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[HTTP]]
- **Mis en place avec** : [[Middleware]]
- **Mène à** : [[JWT]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
