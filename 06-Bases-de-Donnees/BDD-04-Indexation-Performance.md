---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/index
aliases:
  - "Indexation et Performance SQL"
parent: "[[Bases de Données]]"
related_theory:
  - "[[ARCH-09-Cache-Performance|Cache et Performance]]"
  - "[[SQL-02-Filtrer-Trier-Paginer|Filtrer Trier et Paginer en SQL]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://use-the-index-luke.com/fr"
---

# Indexation et Performance

> [!abstract] En bref
> Un **index** est le **sommaire** d'une table : au lieu de lire toutes les lignes pour trouver les critiques du film 27205, la base va directement au bon endroit. C'est le levier n°1 pour accélérer une application. Et `EXPLAIN` te dit si la base utilise un index ou lit tout.

## L'image

Chercher « Inception » dans un livre de 1 000 pages :
- **sans index** : tu lis toutes les pages (*Seq Scan*, parcours complet) ;
- **avec index** : tu ouvres le sommaire à la lettre I et vas à la bonne page (*Index Scan*).

## Créer un index

```sql
CREATE INDEX idx_reviews_movie_id ON reviews (movie_id);
```

En Prisma :

```prisma
model Review {
  …
  @@index([movieId])
  @@index([userId, createdAt])
}
```

## Où mettre des index

| Colonne | Index ? |
|---|---|
| clé primaire, colonne `UNIQUE` | déjà indexée automatiquement |
| **clé étrangère** (`movie_id`, `user_id`) | **oui** (PostgreSQL ne le fait pas tout seul) |
| colonnes souvent dans `WHERE` ou `ORDER BY` | oui |
| colonnes rarement utilisées pour chercher | non |
| colonne avec 2 valeurs (`spoiler` vrai / faux) | rarement utile |

### Index sur plusieurs colonnes

```sql
CREATE INDEX idx_reviews_user_date ON reviews (user_id, created_at DESC);
```

Sert pour `WHERE user_id = 42 ORDER BY created_at DESC`. L'**ordre des colonnes compte** : il sert aussi pour `WHERE user_id = 42` seul, mais pas pour `WHERE created_at > …` seul.

## Diagnostiquer : `EXPLAIN ANALYZE`

```sql
EXPLAIN ANALYZE
SELECT * FROM reviews WHERE movie_id = 27205;
```

```text
Seq Scan on reviews  (… rows=48) (actual time=0.02..35.1 ms)        ← lit toute la table 😬
```

Après l'index :

```text
Index Scan using idx_reviews_movie_id on reviews (actual time=0.03..0.09 ms)   ← ✅
```

| Ce que tu vois | Signification |
|---|---|
| `Seq Scan` sur une grosse table | pas d'index utilisable |
| `Index Scan` / `Index Only Scan` | l'index est utilisé |
| `actual time` | le temps réel |

## Le prix d'un index

Chaque index **accélère les lectures** mais **ralentit un peu les écritures** (il faut mettre le sommaire à jour) et prend de la place. N'en crée pas « au cas où » : crée-le quand une requête est lente.

## Les autres causes de lenteur

- **Le problème N+1** : une requête par élément d'une liste → voir [[BDD-08-ORM-Concepts-N-plus-1|N+1]].
- **Ramener trop de données** : `SELECT *` et pas de pagination.
- **`LIKE '%texte%'`** : ne peut pas utiliser un index classique.
- **Une fonction sur la colonne** (`WHERE LOWER(email) = …`) : l'index sur `email` n'est pas utilisé (sauf index sur `LOWER(email)`).

## Pièges

- **Optimiser sans mesurer** : lance `EXPLAIN ANALYZE` d'abord.
- **Tester sur 10 lignes** : tout est rapide. Les problèmes apparaissent avec des milliers de lignes ; génère des données de test (seed).
