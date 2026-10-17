---
type: notion
statut: a apprendre
resume: "Le diagramme de classes est le plan de tes données et de ton code : quelles « choses » existent (Utilisateur, Film, Critique), ce qu'elles contiennent, et comment elles sont liées."
revu:
sources:
  - "https://mermaid.js.org/syntax/classDiagram.html"
---
# UML diagramme de classes

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le **diagramme de classes** est le **plan** de tes données et de ton code : quelles « choses » existent (Utilisateur, Film, Critique), ce qu'elles contiennent, et comment elles sont liées.

## Le problème

**Pourquoi c'est utile ?**
Pour dessiner les « choses » de l'application, ce qu'elles contiennent et leurs liens, avant de créer les tables et les classes.

**Qu'est-ce qui se passait sans ça ?**
On découvrait les relations en codant (un film a plusieurs critiques ?), et on refaisait les tables et les classes plusieurs fois.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Sur tes projets, il sert surtout à réfléchir au **modèle métier** avant d'écrire le schéma Prisma.

### Lire une classe

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

### Les relations

| Relation | Mermaid | Sens | Exemple |
|---|---|---|---|
| **Association** | `--` ou `-->` | « est lié à » | un utilisateur écrit des critiques |
| **Composition** | `*--` | « fait partie de », meurt avec le tout | les critiques d'un film supprimé disparaissent |
| **Agrégation** | `o--` | « contient », mais la partie vit seule | une liste contient des films qui existent sans elle |
| **Héritage** | `<\|--` | « est un » | `Admin` est un `User` |
| **Implémente** | `..\|>` | respecte une interface | `EmailNotifier` implémente `Notifier` |

### Les multiplicités

| Notation | Sens |
|---|---|
| `1` | exactement un |
| `0..1` | zéro ou un |
| `0..*` | zéro ou plusieurs |
| `1..*` | au moins un |

Elles annoncent directement ta base de données :
- `User 1 — 0..* Review` → une clé étrangère `userId` dans `Review` ;
- `User 0..* — 0..* Movie` → une **table d'association** `Favorite(userId, movieId)`.

Voir [[Modélisation des données MCD et MLD|MCD / MLD]] et [[Prisma schéma et migrations|Prisma]].

### Quand en faire un

- ✅ Au début d'un projet, pour les **entités métier** (5 à 10 classes).
- ✅ Pour expliquer un module compliqué.
- ❌ Pour documenter chaque classe du code : c'est vite faux et personne ne le maintient.

## 🧪 Exemple

### Exemple : CinéTrack

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

## ⚠️ Limites et pièges

- **Confondre composition et agrégation** : demande-toi « si je supprime le tout, la partie disparaît-elle ? ».
- **Un diagramme qui contredit le code** : mieux vaut pas de diagramme qu'un diagramme faux.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Programmation orientée objet]], [[Modélisation des données MCD et MLD]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://mermaid.js.org/syntax/classDiagram.html
