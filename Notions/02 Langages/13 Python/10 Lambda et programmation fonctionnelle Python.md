---
type: notion
statut: a apprendre
resume: "Une lambda est une petite fonction anonyme d'une ligne, comme une fonction fléchée en JavaScript : lambda n: n  2 ≈ n => n  2."
revu:
sources:
  - "https://docs.python.org/3/howto/functional.html"
---
# Lambda et programmation fonctionnelle Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **lambda** est une petite fonction anonyme d'une ligne, comme une fonction fléchée en JavaScript : `lambda n: n * 2` ≈ `n => n * 2`.

## Le problème

**Pourquoi c'est utile ?**
Pour écrire de petites fonctions à la volée, surtout pour trier ou comparer.

**Qu'est-ce qui se passait sans ça ?**
Il fallait définir une fonction nommée complète juste pour une clé de tri d'une ligne.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Son usage principal en Python : donner une **clé de tri** ou de comparaison. Pour transformer des listes, on préfère les [[09 Compréhensions Python|compréhensions]] à `map` / `filter`.

### Lambda

```python
double = lambda n: n * 2        # JS : const double = (n) => n * 2
double(4)                       # 8
```

Limite : une lambda ne contient qu'**une expression** (pas de bloc, pas de `return`). Dès que c'est plus long, écris un `def`.

### `map`, `filter` ou compréhension ?

```python
# Possible
list(map(lambda m: m["title"], movies))
list(filter(lambda m: m["year"] > 2000, movies))

# Préféré en Python : plus lisible
[m["title"] for m in movies]
[m for m in movies if m["year"] > 2000]
```

### Quelques outils utiles

```python
from functools import reduce, partial

reduce(lambda acc, m: acc + m["rating"], movies, 0)   # comme reduce en JS (sum() est plus simple ici)

def search(query, limit):
    ...
search_top5 = partial(search, limit=5)                # fixe un paramètre à l'avance
```

Les principes (fonctions pures, immutabilité) sont les mêmes qu'en JS : voir [[06 Programmation fonctionnelle|Programmation fonctionnelle]].

## 🧪 Exemple

### L'usage n°1 : trier

```python
movies = [
    {"title": "Dune", "year": 2021, "rating": 4.5},
    {"title": "Alien", "year": 1979, "rating": 4.8},
]

sorted(movies, key=lambda m: m["year"])                     # par année
sorted(movies, key=lambda m: m["rating"], reverse=True)     # par note décroissante
sorted(movies, key=lambda m: (m["year"], -m["rating"]))     # année, puis note décroissante
max(movies, key=lambda m: m["rating"])                      # le mieux noté
```

Plus simple qu'en JavaScript : on donne **la valeur à comparer**, pas une fonction `(a, b) => …` (voir [[06 Algorithmes de tri|Tri]]).

## ⚠️ Limites et pièges

- **Ranger une lambda dans une variable** (`double = lambda …`) : autant écrire un `def`, qui a un nom dans les erreurs.
- **Des `map(lambda …)` imbriqués** : une compréhension est plus lisible.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Trier avec une clé

Avec une liste de films `{ "title", "year", "rating" }` :
1. trie par année croissante ;
2. trie par note décroissante ;
3. trouve le film le plus ancien.

> [!success]- Solution
> ```python
> by_year = sorted(movies, key=lambda m: m["year"])
> by_rating = sorted(movies, key=lambda m: m["rating"], reverse=True)
> oldest = min(movies, key=lambda m: m["year"])
> ```

#### Exercice 2 · Lambda ou def ?

Réécris ce code de façon plus lisible, en Python « idiomatique ».

```python
result = list(map(lambda m: m["title"], filter(lambda m: m["year"] > 2000, movies)))
```

> [!success]- Solution
> ```python
> result = [m["title"] for m in movies if m["year"] > 2000]
> ```
>
> En Python, une compréhension se lit plus facilement qu'un `map` + `filter` avec des lambdas.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Python|Fondamentaux Python]]
- **Voir aussi :** [[04 Fonctions Python|Fonctions Python]], [[09 Compréhensions Python|Compréhensions Python]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/howto/functional.html
