---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Typage (Type Hints) Python"
tags:
  - backend/python/typage
parent: "[[Python]]"
related_theory:
  - "[[PY-01-Fondamentaux|Fondamentaux Python]]"
  - "[[TS-01-Fondamentaux|TypeScript - Fondamentaux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/library/typing.html"
---

# Typage (Type Hints) Python

> [!abstract] En bref
> Python peut recevoir des **annotations de type**, comme TypeScript : `def average(ratings: list[float]) -> float`. Mais attention : Python **ne les vérifie pas** à l'exécution. Elles servent à l'éditeur (autocomplétion, erreurs soulignées) et à des outils comme **mypy**. Des bibliothèques comme **Pydantic** et **FastAPI** s'en servent pour valider les données, comme Zod.

## TypeScript → Python

| TypeScript | Python |
|---|---|
| `title: string` | `title: str` |
| `year: number` | `year: int` ou `float` |
| `string[]` | `list[str]` |
| `Record<string, number>` | `dict[str, int]` |
| `string \| null` | `str \| None` |
| `(): void` | `-> None` |
| `interface Movie { … }` | une `@dataclass`, une `TypedDict` ou un modèle Pydantic |
| `any` | `Any` |

## Exemple

```python
from dataclasses import dataclass

@dataclass
class Movie:
    title: str
    year: int
    rating: float | None = None

def best(movies: list[Movie]) -> Movie | None:
    rated = [m for m in movies if m.rating is not None]
    return max(rated, key=lambda m: m.rating) if rated else None
```

## Les annotations ne protègent pas à l'exécution

```python
def double(n: int) -> int:
    return n * 2

double("ab")     # aucune erreur ! renvoie "abab"
```

Comme les types TypeScript, ce sont des **indications** (voir [[TG-01-Comment-fonctionne-un-programme|Comment fonctionne un programme]]). Pour vérifier le code avant de le lancer :

```bash
pip install mypy
mypy .           # signale : Argument 1 to "double" has incompatible type "str"
```

## Valider des données : Pydantic

Pydantic lit les annotations et **vérifie vraiment** les données, comme [[TS-19-Validation-Runtime-Zod|Zod]] :

```python
from pydantic import BaseModel

class MovieIn(BaseModel):
    title: str
    year: int

MovieIn(title="Dune", year="2021")    # ✅ convertit "2021" en 2021
MovieIn(title="Dune", year="abc")     # ❌ ValidationError
```

FastAPI l'utilise pour valider automatiquement le corps des requêtes, comme les DTO et `ValidationPipe` de NestJS.

## Pièges

- **Croire que les annotations empêchent les erreurs** : sans mypy ni Pydantic, rien n'est vérifié.
- **`list[str]` sur un vieux Python** (avant 3.9) : il faut `from typing import List`.
