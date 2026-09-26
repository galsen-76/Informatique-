---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/uml/classes
aliases:
  - "UML Diagramme de Classes"
parent: "[[Conception]]"
related_theory:
  - "[[TG-05-Paradigmes-POO|Programmation Orientée Objet]]"
  - "[[CONC-07-Modelisation-Donnees-MCD-MLD|Modélisation des Données MCD MLD]]"
related_projects: []
source: "https://mermaid.js.org/syntax/classDiagram.html"
---

# UML Diagramme de Classes

> [!abstract] En bref
> Le **diagramme de classes** est le **plan** de tes données et de ton code : quelles « choses » existent (Utilisateur, Film, Critique), ce qu'elles contiennent, et comment elles sont liées. Sur tes projets, il sert surtout à réfléchir au **modèle métier** avant d'écrire le schéma Prisma.

## Exemple : CinéTrack

```mermaid
classDiagram
  class User {
    +id: number
    +email: string
    -passwordHash: string
    +addFavorite(movie: Movie) void
  }
  class Movie {
    +id: number
    +title: string
    +year: number
    +averageRating() number
  }
  class Review {
    +rating: number
    +content: string
  }
  User "1" --> "0..*" Review : écrit
  Movie "1" *-- "0..*" Review : contient
  User "0..*" -- "0..*" Movie : favoris
```

## Lire une classe

```text
┌──────────────────────┐
│ User                 │  ← nom
├──────────────────────┤
│ +id: number          │  ← attributs (+ public, - privé, # protégé)
│ -passwordHash: string│
├──────────────────────┤
│ +addFavorite() void  │  ← méthodes
└──────────────────────┘
```

## Les relations

| Relation | Mermaid | Sens | Exemple |
|---|---|---|---|
| **Association** | `--` ou `-->` | « est lié à » | un utilisateur écrit des critiques |
| **Composition** | `*--` | « fait partie de », meurt avec le tout | les critiques d'un film supprimé disparaissent |
| **Agrégation** | `o--` | « contient », mais la partie vit seule | une liste contient des films qui existent sans elle |
| **Héritage** | `<\|--` | « est un » | `Admin` est un `User` |
| **Implémente** | `..\|>` | respecte une interface | `EmailNotifier` implémente `Notifier` |

## Les multiplicités

| Notation | Sens |
|---|---|
| `1` | exactement un |
| `0..1` | zéro ou un |
| `0..*` | zéro ou plusieurs |
| `1..*` | au moins un |

Elles annoncent directement ta base de données :
- `User 1 — 0..* Review` → une clé étrangère `userId` dans `Review` ;
- `User 0..* — 0..* Movie` → une **table d'association** `Favorite(userId, movieId)`.

Voir [[CONC-07-Modelisation-Donnees-MCD-MLD|MCD / MLD]] et [[ORM-01-Prisma-Schema-Migrations|Prisma]].

## Quand en faire un

- ✅ Au début d'un projet, pour les **entités métier** (5 à 10 classes).
- ✅ Pour expliquer un module compliqué.
- ❌ Pour documenter chaque classe du code : c'est vite faux et personne ne le maintient.

## Pièges

- **Confondre composition et agrégation** : demande-toi « si je supprime le tout, la partie disparaît-elle ? ».
- **Un diagramme qui contredit le code** : mieux vaut pas de diagramme qu'un diagramme faux.
