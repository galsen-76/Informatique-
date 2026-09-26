---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Compréhensions Python"
tags:
  - backend/python/comprehensions
parent: "[[Python]]"
related_theory:
  - "[[PY-02-Structures-de-donnees|Structures de donnees]]"
  - "[[PY-03-Structures-de-controle|Structures de controle]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
---

# Compréhensions Python

> [!abstract] En bref
> Une **compréhension** construit une liste (ou un dictionnaire, ou un set) en **une ligne**, à partir d'une autre. C'est l'équivalent Python de `map` + `filter` en JavaScript, et c'est la façon « pythonique » de transformer des données. On en voit partout.

## JavaScript → Python

```js
// JavaScript
const titles = movies.filter((m) => m.year >= 2020).map((m) => m.title.toUpperCase());
```

```python
# Python
titles = [m["title"].upper() for m in movies if m["year"] >= 2020]
```

Se lit comme une phrase : « **le titre en majuscules**, **pour chaque film**, **si** l'année est ≥ 2020 ».

## La structure

```text
[ résultat   for élément in collection   if condition ]
   ↑ map          ↑ la boucle                ↑ filter (optionnel)
```

## Les variantes

```python
numbers = [1, 2, 3, 4]

squares = [n * n for n in numbers]                 # liste : [1, 4, 9, 16]
evens = [n for n in numbers if n % 2 == 0]         # filtre : [2, 4]

by_id = {m["id"]: m for m in movies}               # dictionnaire id → film
genres = {m["genre"] for m in movies}              # set : genres uniques

labels = ["pair" if n % 2 == 0 else "impair" for n in numbers]   # condition dans le résultat
```

## Avec la somme, le max…

```python
total = sum(m["rating"] for m in movies)           # sans crochets : pas de liste intermédiaire
best = max(movies, key=lambda m: m["rating"])      # le film le mieux noté
has_old = any(m["year"] < 1980 for m in movies)    # comme some()
all_rated = all(m["rating"] > 0 for m in movies)   # comme every()
```

## Quand ne pas en faire

Si la compréhension ne tient plus sur une ligne lisible (plusieurs `for`, plusieurs `if`), écris une **boucle normale**. La lisibilité passe avant (voir [[TG-08-Lisibilite-Nommage|Lisibilité]]).

## Pièges

- **Une compréhension géante** illisible.
- **L'utiliser pour un effet de bord** (`[print(m) for m in movies]`) : fais une boucle `for`.
