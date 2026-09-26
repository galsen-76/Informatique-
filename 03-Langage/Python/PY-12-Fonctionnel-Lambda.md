---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Lambda & Programmation Fonctionnelle Python"
tags:
  - backend/python/fonctionnel
parent: "[[Python]]"
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
  - "[[PY-09-Comprehensions|Comprehensions Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/howto/functional.html"
---

# Lambda & Programmation Fonctionnelle Python

> [!abstract] En bref
> Une **lambda** est une petite fonction anonyme d'une ligne, comme une fonction fléchée en JavaScript : `lambda n: n * 2` ≈ `n => n * 2`. Son usage principal en Python : donner une **clé de tri** ou de comparaison. Pour transformer des listes, on préfère les [[PY-09-Comprehensions|compréhensions]] à `map` / `filter`.

## Lambda

```python
double = lambda n: n * 2        # JS : const double = (n) => n * 2
double(4)                       # 8
```

Limite : une lambda ne contient qu'**une expression** (pas de bloc, pas de `return`). Dès que c'est plus long, écris un `def`.

## L'usage n°1 : trier

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

Plus simple qu'en JavaScript : on donne **la valeur à comparer**, pas une fonction `(a, b) => …` (voir [[ALGO-07-Tri|Tri]]).

## `map`, `filter` ou compréhension ?

```python
# Possible
list(map(lambda m: m["title"], movies))
list(filter(lambda m: m["year"] > 2000, movies))

# Préféré en Python : plus lisible
[m["title"] for m in movies]
[m for m in movies if m["year"] > 2000]
```

## Quelques outils utiles

```python
from functools import reduce, partial

reduce(lambda acc, m: acc + m["rating"], movies, 0)   # comme reduce en JS (sum() est plus simple ici)

def search(query, limit):
    ...
search_top5 = partial(search, limit=5)                # fixe un paramètre à l'avance
```

Les principes (fonctions pures, immutabilité) sont les mêmes qu'en JS : voir [[TG-06-Programmation-Fonctionnelle|Programmation fonctionnelle]].

## Pièges

- **Ranger une lambda dans une variable** (`double = lambda …`) : autant écrire un `def`, qui a un nom dans les erreurs.
- **Des `map(lambda …)` imbriqués** : une compréhension est plus lisible.
