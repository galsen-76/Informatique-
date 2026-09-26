---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/sql/group-by
aliases:
  - "Agrégation et GROUP BY"
parent: "[[SQL]]"
related_theory:
  - "[[SQL-03-Jointures|Jointures SQL]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/tutorial-agg.html"
---

# Agrégation et GROUP BY

> [!abstract] En bref
> **Agréger**, c'est résumer plusieurs lignes en une seule valeur : compter, faire une moyenne, trouver le maximum. Avec `GROUP BY`, on le fait **par groupe** : la note moyenne **de chaque film**, le nombre de critiques **par utilisateur**. C'est la base de toute page de statistiques.

## Les fonctions d'agrégation

| Fonction | Donne |
|---|---|
| `COUNT(*)` | le nombre de lignes |
| `COUNT(colonne)` | le nombre de valeurs non vides |
| `SUM(x)` | la somme |
| `AVG(x)` | la moyenne |
| `MIN(x)` / `MAX(x)` | le minimum / maximum |

```sql
SELECT COUNT(*) AS total, AVG(rating) AS moyenne, MAX(rating) AS meilleure
FROM reviews
WHERE movie_id = 27205;
```

## `GROUP BY` : un résultat par groupe

Image : trier des copies en **piles par classe**, puis calculer la moyenne de chaque pile.

```sql
SELECT movie_id, COUNT(*) AS nb, ROUND(AVG(rating), 1) AS moyenne
FROM reviews
GROUP BY movie_id
ORDER BY moyenne DESC;
```

| movie_id | nb | moyenne |
|---|---|---|
| 27205 | 48 | 8.6 |
| 438631 | 31 | 7.9 |

**Règle :** chaque colonne du `SELECT` doit être soit **dans le `GROUP BY`**, soit **dans une fonction d'agrégation**.

## `HAVING` : filtrer les groupes

`WHERE` filtre les **lignes** avant le regroupement, `HAVING` filtre les **groupes** après.

Les films qui ont **au moins 10 critiques**, classés par moyenne :

```sql
SELECT m.title, COUNT(r.id) AS nb, ROUND(AVG(r.rating), 1) AS moyenne
FROM movies m
JOIN reviews r ON r.movie_id = m.id
WHERE r.created_at >= NOW() - INTERVAL '1 year'   -- lignes : critiques de l'année
GROUP BY m.id, m.title
HAVING COUNT(r.id) >= 10                          -- groupes : au moins 10 critiques
ORDER BY moyenne DESC
LIMIT 10;
```

C'est le « top 10 de l'année » de CinéTrack.

## Compter selon une condition

```sql
SELECT
  movie_id,
  COUNT(*) FILTER (WHERE rating >= 8) AS avis_positifs,
  COUNT(*) FILTER (WHERE rating <= 4) AS avis_negatifs
FROM reviews
GROUP BY movie_id;
```

(`FILTER` est une écriture PostgreSQL ; ailleurs : `SUM(CASE WHEN rating >= 8 THEN 1 ELSE 0 END)`.)

## Pièges

- **Colonne dans le `SELECT` absente du `GROUP BY`** : erreur « must appear in the GROUP BY clause ».
- **Filtrer un résultat d'agrégation dans le `WHERE`** (`WHERE COUNT(*) > 10`) : impossible, c'est le rôle de `HAVING`.
- **`AVG` sur des entiers** peut donner beaucoup de décimales : arrondis avec `ROUND`.
