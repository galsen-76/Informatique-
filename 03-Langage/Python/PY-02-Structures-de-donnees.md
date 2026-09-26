---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Structures de Données Python"
tags:
  - backend/python/structures-donnees
parent: "[[Python]]"
related_theory:
  - "[[PY-01-Fondamentaux|Fondamentaux Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/datastructures.html"
---

# Structures de Données Python

> [!abstract] En bref
> Python a 4 façons de regrouper des valeurs : la **liste** (le tableau de JS), le **dictionnaire** (l'objet de JS), le **set** (le `Set` de JS) et le **tuple** (une liste qu'on ne peut plus modifier). Avec ces 4 structures, tu couvres presque tous les besoins.

## Les 4 structures

| Python | Exemple | Équivalent JS | Particularité |
|---|---|---|---|
| **list** | `["Dune", "Alien"]` | tableau | ordonnée, modifiable |
| **dict** | `{"title": "Dune", "year": 2021}` | objet / `Map` | clé → valeur |
| **set** | `{"SF", "Action"}` | `Set` | valeurs uniques |
| **tuple** | `(48.85, 2.35)` | tableau figé | **non modifiable** |

## La liste

```python
movies = ["Dune", "Alien", "Heat"]

movies[0]            # "Dune"
movies[-1]           # "Heat" : les index négatifs partent de la fin
movies[0:2]          # ["Dune", "Alien"] : une tranche (comme slice)
len(movies)          # 3 (pas de .length)

movies.append("Tenet")     # push
movies.remove("Alien")     # retire par valeur
movies.pop()               # retire le dernier
"Dune" in movies           # True (comme includes)
sorted(movies)             # nouvelle liste triée (comme toSorted)
```

## Le dictionnaire

```python
movie = {"title": "Dune", "year": 2021}

movie["title"]                # "Dune" ; erreur si la clé n'existe pas
movie.get("director")         # None, sans erreur
movie.get("director", "?")    # valeur par défaut
movie["rating"] = 4.5         # ajouter ou modifier
"year" in movie               # True

for key, value in movie.items():
    print(key, value)
```

Les données JSON d'une API deviennent des dictionnaires et des listes.

## Le set et le tuple

```python
genres = {"SF", "Action", "SF"}     # {"SF", "Action"} : doublon supprimé
unique = set(["a", "b", "a"])       # dédoublonner une liste

point = (48.85, 2.35)               # tuple
lat, lng = point                    # déstructuration
```

Pour choisir entre liste et set, même logique qu'en JS : voir [[ALGO-04-Tables-de-Hachage-Map-Set|Map et Set]].

## Pièges

- **`movie["key"]` sur une clé absente** : `KeyError`. Utilise `.get()` si tu n'es pas sûr.
- **`{}` crée un dictionnaire vide**, pas un set : pour un set vide, `set()`.
- **Copier une liste avec `=`** : les deux variables pointent vers la même liste (comme en JS). Copie avec `movies.copy()` ou `list(movies)`.
