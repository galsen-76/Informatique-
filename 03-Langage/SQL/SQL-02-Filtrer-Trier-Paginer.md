---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/sql/where
aliases:
  - "Filtrer Trier et Paginer en SQL"
parent: "[[SQL]]"
related_theory:
  - "[[SQL-01-Fondamentaux-SELECT|Fondamentaux SQL SELECT]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/functions-comparison.html"
---

# Filtrer Trier et Paginer

> [!abstract] En bref
> Trois besoins que tu retrouveras dans chaque écran de liste : **filtrer** (`WHERE`), **trier** (`ORDER BY`) et **paginer** (`LIMIT` / `OFFSET`). C'est ce que fait la page de CinéTrack quand on choisit un genre, trie par note et passe à la page 2.

## Filtrer : `WHERE`

| Opérateur | Exemple |
|---|---|
| `=`, `<>` (différent) | `release_year = 2021` |
| `<`, `<=`, `>`, `>=` | `rating >= 7` |
| `BETWEEN a AND b` | `release_year BETWEEN 2000 AND 2010` |
| `IN (…)` | `genre IN ('action', 'sf')` |
| `LIKE` / `ILIKE` | `title ILIKE '%dune%'` (ILIKE : sans tenir compte des majuscules, PostgreSQL) |
| `IS NULL` / `IS NOT NULL` | `poster_path IS NULL` |
| `AND`, `OR`, `NOT` | combiner |

```sql
SELECT title, rating
FROM movies
WHERE (genre = 'sf' OR genre = 'thriller')
  AND rating >= 7.5
  AND poster_path IS NOT NULL;
```

Dans `LIKE`, `%` = « n'importe quels caractères » : `'%dune%'` = contient « dune ».

## Trier : `ORDER BY`

```sql
ORDER BY rating DESC, title ASC     -- d'abord par note décroissante, puis par titre
ORDER BY release_year DESC NULLS LAST
```

`ASC` = croissant (par défaut), `DESC` = décroissant.

## Paginer : `LIMIT` et `OFFSET`

```sql
-- page 3, 20 films par page
SELECT id, title FROM movies
ORDER BY rating DESC, id          -- un ordre stable est obligatoire pour paginer
LIMIT 20 OFFSET 40;               -- sauter 2 pages de 20
```

Formule : `OFFSET = (page - 1) × taille`. C'est exactement `skip` / `take` en Prisma.

### Sur de très grandes tables : la pagination par curseur

Avec un `OFFSET` énorme, la base doit quand même parcourir toutes les lignes sautées. On reprend plutôt **après le dernier élément vu** :

```sql
SELECT id, title FROM reviews
WHERE id < 15230                  -- le dernier id de la page précédente
ORDER BY id DESC
LIMIT 20;
```

Idéal pour un défilement infini.

## Le piège de `NULL`

`NULL` veut dire « valeur inconnue ». On ne peut **pas** le comparer avec `=` :

```sql
WHERE poster_path = NULL        -- ❌ ne renvoie jamais rien
WHERE poster_path IS NULL       -- ✅
```

Et `rating <> 5` **exclut** les lignes où `rating` est `NULL`.

## Pièges

- **Paginer sans `ORDER BY`** : l'ordre n'est pas garanti, des lignes apparaissent sur deux pages ou jamais.
- **`LIKE '%texte%'` sur une grosse table** : ne peut pas utiliser un index classique, donc lent. Pour une vraie recherche : recherche plein texte de PostgreSQL.
- **Construire le `WHERE` en collant du texte venant de l'utilisateur** : injection SQL. Voir [[SEC-08-Injection-SQL-Validation|Injection SQL]].
