---
type: notion
statut: a apprendre
resume: "Lire et écrire des fichiers (texte, CSV, JSON) est l'un des usages les plus fréquents de Python : scripts d'import de données, conversions, rapports."
revu:
sources:
  - "https://docs.python.org/3/tutorial/inputoutput.html"
---
# Fichiers et entrées sorties Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Lire et écrire des fichiers (texte, CSV, JSON) est l'un des usages les plus fréquents de Python : scripts d'import de données, conversions, rapports.

## Le problème

**Pourquoi c'est utile ?**
Pour lire et écrire des fichiers (texte, CSV, JSON) sans oublier de les refermer.

**Qu'est-ce qui se passait sans ça ?**
Des fichiers jamais refermés, des problèmes d'encodage sur les accents, et des données perdues en cas d'erreur.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

La règle d'or : ouvrir un fichier avec **`with`**, qui le referme automatiquement, même en cas d'erreur.

### Lire et écrire du texte

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

Toujours préciser `encoding="utf-8"` (voir [[07 Encodage Unicode et nombres|Encodage]]).

### CSV

```python
import csv

with open("movies.csv", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):         # chaque ligne devient un dictionnaire
        print(row["title"], row["year"])
```

### Les chemins : `pathlib`

```python
from pathlib import Path

data_dir = Path("data")
file = data_dir / "movies.json"           # construit le chemin, sous Windows comme sous Linux
file.exists()
file.read_text(encoding="utf-8")
for p in data_dir.glob("*.csv"):
    print(p.name)
```

## 🧪 Exemple

### JSON

```python
import json

with open("movies.json", encoding="utf-8") as f:
    movies = json.load(f)                 # JSON → listes et dictionnaires

with open("movies.json", "w", encoding="utf-8") as f:
    json.dump(movies, f, ensure_ascii=False, indent=2)   # garde les accents lisibles

json.loads('{"a": 1}')                    # depuis une chaîne (JSON.parse)
json.dumps({"a": 1})                      # vers une chaîne (JSON.stringify)
```

## ⚠️ Limites et pièges

- **Ouvrir sans `with`** et oublier de fermer le fichier.
- **Oublier `encoding="utf-8"`** : accents cassés, surtout sous Windows.
- **Le mode `"w"`** efface le fichier existant sans prévenir.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Lire un JSON

Le fichier `movies.json` contient une liste de films `{ "title", "year" }`. Écris le code qui le lit et affiche les titres des films sortis après 2000.

> [!success]- Solution
> ```python
> import json
>
> with open("movies.json", encoding="utf-8") as f:
>     movies = json.load(f)
>
> for m in movies:
>     if m["year"] > 2000:
>         print(m["title"])
> ```

#### Exercice 2 · Écrire un CSV

Écris ces films dans `movies.csv` avec une ligne d'en-tête `title,year`.

```python
movies = [{"title": "Dune", "year": 2021}, {"title": "Alien", "year": 1979}]
```

> [!success]- Solution
> ```python
> import csv
>
> with open("movies.csv", "w", encoding="utf-8", newline="") as f:
>     writer = csv.DictWriter(f, fieldnames=["title", "year"])
>     writer.writeheader()
>     writer.writerows(movies)
> ```

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Python|Fondamentaux Python]]
- **Voir aussi :** [[05 Exceptions Python|Exceptions Python]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/tutorial/inputoutput.html
