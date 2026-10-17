---
type: notion
statut: a apprendre
resume: "Avant de créer tes tables, tu dessines tes données."
revu:
sources:
  - "https://fr.wikipedia.org/wiki/Merise_(informatique)"
---
# Modélisation des données MCD et MLD

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Avant de créer tes tables, tu dessines tes données.

## Le problème

**Pourquoi c'est utile ?**
Pour concevoir les données du métier, puis les traduire proprement en tables, avant de toucher à la base.

**Qu'est-ce qui se passait sans ça ?**
On créait les tables au fil de l'eau : données en double, relations bancales, et des migrations pénibles pour tout corriger ensuite.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

La méthode **Merise** (très utilisée en France, et demandée aux examens) le fait en deux temps : le **MCD** décrit les « choses » du métier et leurs liens, le **MLD** les traduit en **tables** avec leurs clés. Ensuite, ça devient ton schéma Prisma presque directement.

### MCD : le métier

On parle **entités** (Utilisateur, Film) et **associations** (un utilisateur NOTE un film), avec des **cardinalités**.

```text
UTILISATEUR (0,n) ──── NOTER ──── (0,n) FILM
                    (note, date)
```

Se lit : « un utilisateur note **0 ou plusieurs** films » et « un film est noté par **0 ou plusieurs** utilisateurs ». La note et la date appartiennent à l'**association**.

> ⚠️ En Merise, la cardinalité se lit **du côté de l'entité** : c'est l'inverse de l'UML. Source classique d'erreurs.

### MLD : les tables

Les 3 règles de passage :

| Association | Devient | Exemple |
|---|---|---|
| **1 — N** | une **clé étrangère** du côté N | `Review(id, content, #userId)` |
| **N — N** | une **table d'association** | `Rating(#userId, #movieId, rating, date)` |
| **1 — 1** | une clé étrangère **unique** | `Profile(id, bio, #userId unique)` |

(`#` = clé étrangère, souligné / `id` = clé primaire.)

### Et en Prisma

```prisma
model Favorite {
  userId    Int
  movieId   Int
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  movie     Movie    @relation(fields: [movieId], references: [id])

  @@id([userId, movieId])     // la paire est unique : pas deux fois le même favori
}
```

Voir [[01 Prisma schéma et migrations|Prisma : schéma et migrations]] et [[03 Normalisation|Modélisation et normalisation]].

### Les 3 niveaux Merise

| Niveau | Contient |
|---|---|
| **MCD** (conceptuel) | entités, associations, cardinalités : le **métier** |
| **MLD** (logique) | tables, clés primaires et étrangères |
| **MPD** (physique) | types exacts, index, SGBD choisi (le SQL de création) |

## 🧪 Exemple

### Le résultat pour CinéTrack

```mermaid
erDiagram
  USER ||--o{ FAVORITE : ajoute
  MOVIE ||--o{ FAVORITE : "est ajouté"
  USER ||--o{ REVIEW : écrit
  MOVIE ||--o{ REVIEW : reçoit
  FAVORITE {
    int userId FK
    int movieId FK
    date createdAt
  }
  REVIEW {
    int id PK
    int rating
    string content
    int userId FK
    int movieId FK
  }
```

## ⚠️ Limites et pièges

- **Lire les cardinalités dans le mauvais sens.**
- **Oublier la table d'association** pour un N — N (tu mets une liste d'identifiants dans une colonne : à éviter).
- **Mettre la note dans Film** alors qu'elle dépend de l'utilisateur **et** du film.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[03 Normalisation|Normalisation]], [[04 UML diagramme de classes|UML diagramme de classes]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://fr.wikipedia.org/wiki/Merise_(informatique)
