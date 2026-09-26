---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Modules & Packages Python"
tags:
  - backend/python/modules
parent: "[[Python]]"
related_theory:
  - "[[PY-01-Fondamentaux|Fondamentaux Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/modules.html"
---

# Modules & Packages Python

> [!abstract] En bref
> Comme en JavaScript avec `import` / `export` (voir [[JS-09-Modules-ESM|Modules ESM]]), on découpe le code Python en fichiers. Un fichier `.py` est un **module**, un dossier de modules est un **package**. Différence : en Python, **tout est exportable** par défaut, pas besoin d'écrire `export`.

## Importer

```python
import math                          # tout le module
math.sqrt(16)

from math import sqrt, pi            # seulement certains éléments
sqrt(16)

from datetime import datetime as dt  # renommer (comme `as` en JS)
```

## Ses propres modules

```text
cinetrack/
├── main.py
└── movies/
    ├── __init__.py        ← fait du dossier un package (peut rester vide)
    ├── models.py
    └── service.py
```

```python
# movies/service.py
from movies.models import Movie

def find_all():
    return [Movie("Dune", 2021)]
```

```python
# main.py
from movies.service import find_all
print(find_all())
```

## Le bloc « si on lance ce fichier directement »

```python
def main():
    print("Lancement")

if __name__ == "__main__":
    main()
```

Ce code ne s'exécute que si on lance `python3 main.py`, **pas** si le fichier est importé ailleurs. On le voit dans presque tous les scripts.

## Les packages externes

Installés avec **pip** (le npm de Python) : voir [[PY-13-Environnements-Virtuels-Pip|Environnements virtuels et pip]].

| JS | Python |
|---|---|
| `npm install axios` | `pip install requests` |
| `package.json` | `requirements.txt` ou `pyproject.toml` |
| `node_modules/` | un environnement virtuel `.venv/` |

## Pièges

- **Appeler ton fichier comme un module standard** (`random.py`, `json.py`) : il masque le vrai module.
- **Imports circulaires** : A importe B qui importe A. Réorganise le code.
