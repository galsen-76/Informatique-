---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
tags:
  - backend/sql/window
aliases:
  - "Window Functions SQL"
parent: "[[SQL]]"
related_theory:
  - "[[SQL-04-Agregation-GROUP-BY|Agrégation et GROUP BY]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/tutorial-window.html"
---

# Window Functions SQL

> [!abstract] En bref
> Une **fonction de fenêtre** calcule quelque chose **par rapport aux autres lignes** (un classement, un cumul, la valeur précédente) **sans regrouper** les lignes comme `GROUP BY`. Chaque ligne reste visible, avec en plus son rang ou son total. Idéal pour les classements et statistiques.

## La différence avec `GROUP BY`

- `GROUP BY` : **une ligne par groupe** (la moyenne de chaque film).
- Fenêtre : **toutes les lignes**, chacune avec une info calculée sur son groupe (chaque critique + la moyenne de son film à côté).

```sql
SELECT
  movie_id,
  user_id,
  rating,
  ROUND(AVG(rating) OVER (PARTITION BY movie_id), 1) AS moyenne_du_film
FROM reviews;
```

`OVER (PARTITION BY movie_id)` = « calcule sur les lignes du même film ».

## Classer : le top 3 par genre

```sql
WITH classement AS (
  SELECT
    title,
    genre,
    rating,
    ROW_NUMBER() OVER (PARTITION BY genre ORDER BY rating DESC) AS rang
  FROM movies
)
SELECT genre, rang, title, rating
FROM classement
WHERE rang <= 3
ORDER BY genre, rang;
```

| Fonction | En cas d'égalité |
|---|---|
| `ROW_NUMBER()` | 1, 2, 3, 4 (numéros uniques) |
| `RANK()` | 1, 2, 2, 4 (saute un rang) |
| `DENSE_RANK()` | 1, 2, 2, 3 (ne saute pas) |

## Cumul : le nombre de critiques au fil du temps

```sql
SELECT
  DATE_TRUNC('month', created_at) AS mois,
  COUNT(*) AS critiques_du_mois,
  SUM(COUNT(*)) OVER (ORDER BY DATE_TRUNC('month', created_at)) AS total_cumule
FROM reviews
GROUP BY mois
ORDER BY mois;
```

Parfait pour un graphique d'évolution.

## Comparer à la ligne précédente

```sql
SELECT
  mois,
  inscriptions,
  inscriptions - LAG(inscriptions) OVER (ORDER BY mois) AS evolution
FROM stats_mensuelles;
```

| Fonction | Donne |
|---|---|
| `LAG(x)` | la valeur de la ligne **précédente** |
| `LEAD(x)` | la valeur de la ligne **suivante** |
| `FIRST_VALUE(x)` | la première valeur de la fenêtre |

## Quand t'en servir

Tableaux de bord, classements, évolutions : les écrans de statistiques d'une application métier. Avec Prisma, ces requêtes s'écrivent en SQL brut (`$queryRaw`).

## Pièges

- **Filtrer sur le résultat d'une fonction de fenêtre dans le `WHERE`** : impossible (elle est calculée après). Passe par une CTE, comme dans l'exemple du top 3.
- **Oublier `ORDER BY` dans `OVER`** pour un classement ou un cumul : le résultat n'a pas de sens.
