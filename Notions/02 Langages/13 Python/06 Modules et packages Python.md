---
type: notion
statut: a apprendre
resume: "Comme en JavaScript avec import / export (voir Modules ESM), on découpe le code Python en fichiers."
revu:
sources:
  - "https://docs.python.org/3/tutorial/modules.html"
---
# Modules et packages Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Comme en JavaScript avec `import` / `export` (voir [[07 Modules ES JavaScript|Modules ESM]]), on découpe le code Python en fichiers.

## Le problème

**Pourquoi c'est utile ?**
Pour découper un projet Python en fichiers et dossiers réutilisables.

**Qu'est-ce qui se passait sans ça ?**
Un seul énorme script, ou des imports qui cassaient selon le dossier d'où on lançait le programme.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Un fichier `.py` est un **module**, un dossier de modules est un **package**. Différence : en Python, **tout est exportable** par défaut, pas besoin d'écrire `export`.

### Importer

```python
import math                          # tout le module
math.sqrt(16)

from math import sqrt, pi            # seulement certains éléments
sqrt(16)

from datetime import datetime as dt  # renommer (comme `as` en JS)
```

### Le bloc « si on lance ce fichier directement »

```python
def main():
    print("Lancement")

if __name__ == "__main__":
    main()
```

Ce code ne s'exécute que si on lance `python3 main.py`, **pas** si le fichier est importé ailleurs. On le voit dans presque tous les scripts.

### Les packages externes

Installés avec **pip** (le npm de Python) : voir [[07 Environnements virtuels et pip|Environnements virtuels et pip]].

| JS | Python |
|---|---|
| `npm install axios` | `pip install requests` |
| `package.json` | `requirements.txt` ou `pyproject.toml` |
| `node_modules/` | un environnement virtuel `.venv/` |

## 🧪 Exemple

### Ses propres modules

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

## ⚠️ Limites et pièges

- **Appeler ton fichier comme un module standard** (`random.py`, `json.py`) : il masque le vrai module.
- **Imports circulaires** : A importe B qui importe A. Réorganise le code.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Découper en modules

Déplace la fonction `format_year(year)` dans un fichier `utils.py` et utilise-la depuis `main.py`.

> [!success]- Solution
> ```python
> # utils.py
> def format_year(year):
>     return f"({year})" if year else ""
> ```
>
> ```python
> # main.py
> from utils import format_year
>
> print(format_year(2021))
> ```
>
> Pas besoin d'`export` : tout ce qui est défini dans un module est importable.

#### Exercice 2 · `if __name__ == "__main__"`

À quoi sert ce bloc ? Que se passe-t-il si on l'enlève et qu'un autre fichier importe `main.py` ?

```python
def main():
    print("Import des films…")

if __name__ == "__main__":
    main()
```

> [!success]- Solution
> Le bloc n'exécute `main()` que si on **lance** le fichier (`python3 main.py`).
>
> Sans lui, un simple `import main` depuis un autre fichier **lancerait** l'import des films : le code s'exécuterait à l'importation, sans qu'on le veuille.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Python|Fondamentaux Python]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/tutorial/modules.html
