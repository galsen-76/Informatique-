---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
tags:
  - backend/sql/cte
aliases:
  - "Sous-requêtes et CTE"
parent: "[[SQL]]"
related_theory:
  - "[[SQL-04-Agregation-GROUP-BY|Agrégation et GROUP BY]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/queries-with.html"
---

# Sous-requêtes et CTE

> [!abstract] En bref
> Une **sous-requête** est une requête à l'intérieur d'une autre. Une **CTE** (`WITH …`) fait la même chose, mais en donnant un **nom** à chaque étape, ce qui rend les requêtes complexes lisibles de haut en bas, comme des variables en TypeScript.

## La sous-requête

Les films mieux notés que la moyenne générale :

```sql
SELECT title, rating
FROM movies
WHERE rating > (SELECT AVG(rating) FROM movies);   -- calculée d'abord
```

Les utilisateurs qui ont écrit au moins une critique :

```sql
SELECT email FROM users u
WHERE EXISTS (SELECT 1 FROM reviews r WHERE r.user_id = u.id);
```

| Écriture | Usage |
|---|---|
| `x > (SELECT …)` | comparer à une valeur calculée |
| `x IN (SELECT …)` | appartenir à une liste calculée |
| `EXISTS (SELECT …)` | « il en existe au moins un » (souvent le plus rapide) |
| `FROM (SELECT …) AS t` | utiliser un résultat comme une table |

## La CTE : nommer les étapes

Les 5 utilisateurs les plus actifs, avec leur note moyenne :

```sql
WITH stats AS (                                  -- étape 1 : statistiques par utilisateur
  SELECT user_id, COUNT(*) AS nb, AVG(rating) AS moyenne
  FROM reviews
  GROUP BY user_id
),
top AS (                                         -- étape 2 : les 5 plus actifs
  SELECT * FROM stats ORDER BY nb DESC LIMIT 5
)
SELECT u.email, top.nb, ROUND(top.moyenne, 1) AS moyenne   -- étape 3 : avec leur e-mail
FROM top
JOIN users u ON u.id = top.user_id;
```

Image : une **recette en étapes** (« préparer la pâte », « préparer la garniture », « assembler ») plutôt qu'une seule phrase interminable.

## Quand l'utiliser

- Une requête devient longue et imbriquée → découpe-la en CTE.
- Tu calcules la même chose deux fois → une CTE, utilisée deux fois.
- Données hiérarchiques (catégories et sous-catégories, commentaires et réponses) → `WITH RECURSIVE`.

Avec Prisma, ce genre de requête s'écrit en SQL brut :

```ts
const top = await prisma.$queryRaw<{ email: string; nb: bigint }[]>`
  WITH stats AS (SELECT user_id, COUNT(*) AS nb FROM "Review" GROUP BY user_id)
  SELECT u.email, s.nb FROM stats s JOIN "User" u ON u.id = s.user_id
  ORDER BY s.nb DESC LIMIT ${limit}
`;
```

Les valeurs passées avec `${…}` dans `$queryRaw` sont **protégées** contre l'injection SQL.

## Pièges

- **`NOT IN (SELECT …)`** quand la sous-requête peut contenir `NULL` : ne renvoie rien. Préfère `NOT EXISTS`.
- **Une sous-requête exécutée pour chaque ligne** (qui dépend de la ligne courante) sur une grosse table : peut être lent. Vérifie avec `EXPLAIN` (voir [[BDD-04-Indexation-Performance|Index]]).
