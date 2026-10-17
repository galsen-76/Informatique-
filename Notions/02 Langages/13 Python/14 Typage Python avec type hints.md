---
type: notion
statut: a apprendre
resume: "Python peut recevoir des annotations de type, comme TypeScript : def average(ratings: list[float]) -> float."
revu:
sources:
  - "https://docs.python.org/3/library/typing.html"
---
# Typage Python avec type hints

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Python peut recevoir des **annotations de type**, comme TypeScript : `def average(ratings: list[float]) -> float`.

## Le problème

**Pourquoi c'est utile ?**
Pour documenter les types et laisser l'éditeur et les outils repérer les erreurs.

**Qu'est-ce qui se passait sans ça ?**
On découvrait les erreurs de type seulement à l'exécution, parfois en production.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Mais attention : Python **ne les vérifie pas** à l'exécution. Elles servent à l'éditeur (autocomplétion, erreurs soulignées) et à des outils comme **mypy**. Des bibliothèques comme **Pydantic** et **FastAPI** s'en servent pour valider les données, comme Zod.

### TypeScript → Python

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

### Les annotations ne protègent pas à l'exécution

```python
def double(n: int) -> int:
    return n * 2

double("ab")     # aucune erreur ! renvoie "abab"
```

Comme les types TypeScript, ce sont des **indications** (voir [[01 Compilé vs interprété|Comment fonctionne un programme]]). Pour vérifier le code avant de le lancer :

```bash
pip install mypy
mypy .           # signale : Argument 1 to "double" has incompatible type "str"
```

### Valider des données : Pydantic

Pydantic lit les annotations et **vérifie vraiment** les données, comme [[18 Validation runtime avec Zod|Zod]] :

```python
from pydantic import BaseModel

class MovieIn(BaseModel):
    title: str
    year: int

MovieIn(title="Dune", year="2021")    # ✅ convertit "2021" en 2021
MovieIn(title="Dune", year="abc")     # ❌ ValidationError
```

FastAPI l'utilise pour valider automatiquement le corps des requêtes, comme les DTO et `ValidationPipe` de NestJS.

## 🧪 Exemple

### Exemple

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

## ⚠️ Limites et pièges

- **Croire que les annotations empêchent les erreurs** : sans mypy ni Pydantic, rien n'est vérifié.
- **`list[str]` sur un vieux Python** (avant 3.9) : il faut `from typing import List`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Annoter une fonction

Ajoute les annotations de type : `movies` est une liste de dictionnaires, `min_year` un entier, et la fonction renvoie une liste de titres.

```python
def recent_titles(movies, min_year):
    return [m["title"] for m in movies if m["year"] >= min_year]
```

> [!success]- Solution
> ```python
> def recent_titles(movies: list[dict], min_year: int) -> list[str]:
>     return [m["title"] for m in movies if m["year"] >= min_year]
> ```

#### Exercice 2 · Annotation ou validation ?

Ce code affiche-t-il une erreur ? Comment obtenir une vraie vérification ?

```python
def double(n: int) -> int:
    return n * 2

print(double("ab"))
```

> [!success]- Solution
> Aucune erreur : il affiche `abab`. Python **ignore** les annotations à l'exécution.
>
> Pour vérifier :
> - **avant** d'exécuter : `mypy .` signale l'argument de mauvais type ;
> - **à l'exécution**, pour des données externes : un modèle **Pydantic**, qui valide vraiment les valeurs.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Python|Fondamentaux Python]]
- **Voir aussi :** [[01 Fondamentaux TypeScript|Fondamentaux TypeScript]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/library/typing.html
