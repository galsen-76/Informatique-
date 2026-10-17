---
type: notion
statut: a apprendre
resume: "Une fonction de fenêtre calcule quelque chose par rapport aux autres lignes (un classement, un cumul, la valeur précédente) sans regrouper les lignes comme GROUP BY."
revu:
sources:
  - "https://www.postgresql.org/docs/current/tutorial-window.html"
---
# Window functions SQL

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **fonction de fenêtre** calcule quelque chose **par rapport aux autres lignes** (un classement, un cumul, la valeur précédente) **sans regrouper** les lignes comme `GROUP BY`.

## Le problème

**Pourquoi c'est utile ?**
Pour calculer un classement, un cumul ou une valeur précédente tout en gardant chaque ligne.

**Qu'est-ce qui se passait sans ça ?**
On faisait ces calculs dans le code, ou avec des sous-requêtes compliquées et lentes.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Chaque ligne reste visible, avec en plus son rang ou son total. Idéal pour les classements et statistiques.

### La différence avec `GROUP BY`

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

### Cumul : le nombre de critiques au fil du temps

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

### Comparer à la ligne précédente

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

### Quand t'en servir

Tableaux de bord, classements, évolutions : les écrans de statistiques d'une application métier. Avec Prisma, ces requêtes s'écrivent en SQL brut (`$queryRaw`).

## 🧪 Exemple

### Classer : le top 3 par genre

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

## ⚠️ Limites et pièges

- **Filtrer sur le résultat d'une fonction de fenêtre dans le `WHERE`** : impossible (elle est calculée après). Passe par une CTE, comme dans l'exemple du top 3.
- **Oublier `ORDER BY` dans `OVER`** pour un classement ou un cumul : le résultat n'a pas de sens.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Classer par genre

Affiche pour chaque film son titre, son genre, sa note et son **rang** dans son genre (le mieux noté = 1).

> [!success]- Solution
> ```sql
> SELECT title, genre, rating,
>        RANK() OVER (PARTITION BY genre ORDER BY rating DESC) AS rank_in_genre
> FROM movies;
> ```
>
> Contrairement à `GROUP BY`, chaque film reste une ligne.

#### Exercice 2 · Le top 3 de chaque genre

En réutilisant la requête précédente, garde seulement les 3 meilleurs films de chaque genre.

> [!success]- Solution
> ```sql
> WITH ranked AS (
>   SELECT title, genre, rating,
>          ROW_NUMBER() OVER (PARTITION BY genre ORDER BY rating DESC) AS rn
>   FROM movies
> )
> SELECT title, genre, rating
> FROM ranked
> WHERE rn <= 3;
> ```
>
> On ne peut pas filtrer une window function dans le `WHERE` de la même requête : il faut passer par une CTE ou une sous-requête.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux SQL et SELECT|Fondamentaux SQL et SELECT]]
- **Voir aussi :** [[04 Agrégation et GROUP BY|Agrégation et GROUP BY]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.postgresql.org/docs/current/tutorial-window.html
