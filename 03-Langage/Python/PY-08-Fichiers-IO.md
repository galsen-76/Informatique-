---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Fichiers & I/O Python"
tags:
  - backend/python/fichiers
parent: "[[Python]]"
related_theory:
  - "[[PY-07-Exceptions|Gestion des erreurs Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/inputoutput.html"
---

# Fichiers & I/O Python

> [!abstract] En bref
> Lire et écrire des fichiers (texte, CSV, JSON) est l'un des usages les plus fréquents de Python : scripts d'import de données, conversions, rapports. La règle d'or : ouvrir un fichier avec **`with`**, qui le referme automatiquement, même en cas d'erreur.

## Lire et écrire du texte

```python
# Lire tout le fichier
with open("notes.txt", encoding="utf-8") as f:
    content = f.read()

# Lire ligne par ligne (économe en mémoire sur les gros fichiers)
with open("notes.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())

# Écrire (écrase le fichier)
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("Bonjour\n")
```

| Mode | Sens |
|---|---|
| `"r"` | lire (par défaut) |
| `"w"` | écrire, **écrase** le contenu |
| `"a"` | ajouter à la fin |

Toujours préciser `encoding="utf-8"` (voir [[TG-07-Encodage-Unicode-Nombres|Encodage]]).

## JSON

```python
import json

with open("movies.json", encoding="utf-8") as f:
    movies = json.load(f)                 # JSON → listes et dictionnaires

with open("movies.json", "w", encoding="utf-8") as f:
    json.dump(movies, f, ensure_ascii=False, indent=2)   # garde les accents lisibles

json.loads('{"a": 1}')                    # depuis une chaîne (JSON.parse)
json.dumps({"a": 1})                      # vers une chaîne (JSON.stringify)
```

## CSV

```python
import csv

with open("movies.csv", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):         # chaque ligne devient un dictionnaire
        print(row["title"], row["year"])
```

## Les chemins : `pathlib`

```python
from pathlib import Path

data_dir = Path("data")
file = data_dir / "movies.json"           # construit le chemin, sous Windows comme sous Linux
file.exists()
file.read_text(encoding="utf-8")
for p in data_dir.glob("*.csv"):
    print(p.name)
```

## Pièges

- **Ouvrir sans `with`** et oublier de fermer le fichier.
- **Oublier `encoding="utf-8"`** : accents cassés, surtout sous Windows.
- **Le mode `"w"`** efface le fichier existant sans prévenir.
