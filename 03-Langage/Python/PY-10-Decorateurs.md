---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Décorateurs Python"
tags:
  - backend/python/decorateurs
parent: "[[Python]]"
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/glossary.html#term-decorator"
---

# Décorateurs Python

> [!abstract] En bref
> Un **décorateur** est une fonction qui **enveloppe** une autre fonction pour lui ajouter un comportement (mesurer le temps, vérifier un droit, mettre en cache) sans toucher à son code. Tu en as déjà vu en TypeScript (`@Component`, `@Injectable`, `@Get()` dans NestJS) : voir [[TS-14-Decorators|Décorateurs TS]]. En Python, on les **utilise** beaucoup (FastAPI, pytest, dataclasses) et on en **écrit** rarement.

## En utiliser (le plus courant)

```python
from functools import cache
from dataclasses import dataclass

@cache                          # garde en mémoire les résultats déjà calculés
def fibonacci(n):
    return n if n < 2 else fibonacci(n - 1) + fibonacci(n - 2)

@dataclass                      # génère __init__ et compagnie
class Movie:
    title: str
    year: int
```

Avec FastAPI, un décorateur transforme une fonction en route d'API, comme `@Get()` dans NestJS :

```python
@app.get("/movies/{movie_id}")
def get_movie(movie_id: int):
    return {"id": movie_id}
```

## Comprendre comment ça marche

`@decorator` au-dessus d'une fonction revient à écrire `fonction = decorator(fonction)` :

```python
import time
from functools import wraps

def timed(func):
    @wraps(func)                           # garde le nom et la doc de la fonction d'origine
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)     # appelle la vraie fonction
        print(f"{func.__name__} : {time.perf_counter() - start:.3f} s")
        return result
    return wrapper

@timed
def load_movies():
    time.sleep(0.5)
    return ["Dune"]

load_movies()     # affiche "load_movies : 0.500 s"
```

Le décorateur reçoit une fonction et renvoie une **nouvelle** fonction qui fait quelque chose **avant** et **après** l'appel. Cela repose sur les fonctions-valeurs et les [[JS-03-Fonctions-Scope-Closures|closures]].

## Pièges

- **Oublier `@wraps`** : la fonction décorée perd son nom (gênant en débogage).
- **Oublier `return result`** dans le wrapper : la fonction décorée renvoie `None`.
