---
type: notion
statut: a apprendre
resume: "Une sous-requête est une requête à l'intérieur d'une autre."
revu:
sources:
  - "https://www.postgresql.org/docs/current/queries-with.html"
---
# Sous-requêtes et CTE

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **sous-requête** est une requête à l'intérieur d'une autre.

## Le problème

**Pourquoi c'est utile ?**
Pour découper une requête complexe en étapes nommées et lisibles.

**Qu'est-ce qui se passait sans ça ?**
Des requêtes géantes imbriquées, impossibles à relire, ou plusieurs allers-retours avec la base.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Une **CTE** (`WITH …`) fait la même chose, mais en donnant un **nom** à chaque étape, ce qui rend les requêtes complexes lisibles de haut en bas, comme des variables en TypeScript.

### La sous-requête

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

### Quand l'utiliser

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

## 🧪 Exemple

### La CTE : nommer les étapes

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

## ⚠️ Limites et pièges

- **`NOT IN (SELECT …)`** quand la sous-requête peut contenir `NULL` : ne renvoie rien. Préfère `NOT EXISTS`.
- **Une sous-requête exécutée pour chaque ligne** (qui dépend de la ligne courante) sur une grosse table : peut être lent. Vérifie avec `EXPLAIN` (voir [[Clés index et performance|Index]]).

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Au-dessus de la moyenne

Affiche les films dont la note est supérieure à la note moyenne de tous les films, avec une sous-requête.

> [!success]- Solution
> ```sql
> SELECT title, rating
> FROM movies
> WHERE rating > (SELECT AVG(rating) FROM movies);
> ```

#### Exercice 2 · Découper avec une CTE

Avec une CTE, calcule le nombre de critiques par utilisateur, puis affiche seulement les utilisateurs qui en ont écrit au moins 5, avec leur e-mail.

> [!success]- Solution
> ```sql
> WITH review_counts AS (
>   SELECT user_id, COUNT(*) AS nb
>   FROM reviews
>   GROUP BY user_id
> )
> SELECT u.email, rc.nb
> FROM review_counts rc
> JOIN users u ON u.id = rc.user_id
> WHERE rc.nb >= 5
> ORDER BY rc.nb DESC;
> ```
>
> La CTE donne un **nom** à une étape : la requête se lit de haut en bas.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux SQL et SELECT]]
- **Voir aussi :** [[Agrégation et GROUP BY]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.postgresql.org/docs/current/queries-with.html
