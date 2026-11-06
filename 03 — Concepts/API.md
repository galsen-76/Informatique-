---
type: concept
domain: backend
module: "[[Module 08 - Backend et API REST]]"
status: compris
level: debutant
prerequisites:
  - "[[HTTP]]"
parents:
  - "[[Client-serveur]]"
related:
  - "[[API REST]]"
next_review: 2026-11-11
method:
  - Comprendre
  - Explorer
  - Expliquer
tags:
  - concept
  - backend
---
# API

> [!info] En une phrase
> Une porte d'entrée documentée qu'un programme offre à d'autres programmes pour utiliser ses services.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**API** (Application Programming Interface) : un ensemble d'opérations qu'on peut appeler, avec des règles précises sur ce qu'on envoie et ce qu'on reçoit. Une API web s'appelle via [[HTTP]].

## 2 · Explorer
### Comment ça fonctionne
Comme un serveur de restaurant : tu ne vas pas en cuisine (le code interne), tu passes commande selon le menu (la documentation de l'API) et tu reçois le plat (la réponse).

> [!warning] À ne pas confondre
> **API** (le contrat d'échange) et **base de données** (où sont stockées les données). L'API se place devant la base et contrôle qui accède à quoi.

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[HTTP]]
- **Notion parente** : [[Client-serveur]]
- **Mène à** : [[API REST]] → [[Endpoint]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
