---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Fonctions Python"
tags:
  - backend/python/fonctions
parent: "[[Python]]"
related_theory:
  - "[[PY-03-Structures-de-controle|Structures de controle]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
---

# Fonctions Python

> [!abstract] En bref
> Une fonction Python se déclare avec `def`, et son corps est indenté. Deux choses que JavaScript n'a pas aussi simplement : les **paramètres nommés** à l'appel (`search(title="Dune", year=2021)`) et les paramètres « tout le reste » `*args` / `**kwargs`.

## Déclarer et appeler

```python
def greet(name):
    return f"Bonjour {name}"

greet("Alice")      # "Bonjour Alice"
```

Sans `return`, une fonction renvoie `None`.

## Valeurs par défaut et paramètres nommés

```python
def search(title, year=None, limit=20):
    ...

search("Dune")                       # year=None, limit=20
search("Dune", limit=5)              # on nomme le paramètre voulu, dans n'importe quel ordre
search(title="Dune", year=2021)
```

Les paramètres nommés rendent les appels **lisibles** : `search("Dune", limit=5)` se comprend tout seul.

## `*args` et `**kwargs`

```python
def total(*numbers):              # tous les arguments positionnels dans un tuple
    return sum(numbers)
total(1, 2, 3)                    # 6        (JS : ...numbers)

def create_movie(**fields):       # tous les arguments nommés dans un dictionnaire
    return fields
create_movie(title="Dune", year=2021)   # {"title": "Dune", "year": 2021}
```

## Les fonctions sont des valeurs

Comme en JavaScript (voir [[TG-06-Programmation-Fonctionnelle|Programmation fonctionnelle]]) :

```python
def double(n):
    return n * 2

numbers = [1, 2, 3]
list(map(double, numbers))        # [2, 4, 6]

square = lambda n: n * n          # petite fonction anonyme (comme n => n * n)
```

Voir aussi [[PY-12-Fonctionnel-Lambda|Lambda et fonctionnel]].

## Le piège classique : la valeur par défaut modifiable

```python
# ❌ la même liste est partagée entre tous les appels
def add_movie(movie, movies=[]):
    movies.append(movie)
    return movies

add_movie("Dune")    # ["Dune"]
add_movie("Alien")   # ["Dune", "Alien"] !

# ✅
def add_movie(movie, movies=None):
    if movies is None:
        movies = []
    movies.append(movie)
    return movies
```

## Pièges

- **Une liste ou un dict comme valeur par défaut** (voir ci-dessus).
- **Oublier le `return`** : la fonction renvoie `None`.
