---
type: bonnes-pratiques
sujet: "Python"
concepts:
  - "[[Python]]"
  - "[[Environnement virtuel Python]]"
  - "[[Chemin de fichier en Python (pathlib)]]"
  - "[[Exception]]"
  - "[[Journaliser avec logging]]"
  - "[[Lancer une commande (subprocess)]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Python

> [!info] À quoi sert cette fiche
> Écrire du Python clair et idiomatique, comme le font les développeurs Python expérimentés.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Suivre la PEP 8 et laisser un outil formater
`snake_case` pour variables et fonctions, `PascalCase` pour les classes, `MAJUSCULES` pour les constantes, 4 espaces. Lance `ruff format` et `ruff check` : tu n'as pas à y penser. Voir [[Linter et formateur]].

### 2. Isoler chaque projet dans un environnement virtuel
Un `.venv` par projet, les dépendances listées (`requirements.txt` ou `pyproject.toml`). Voir [[Environnement virtuel Python]].

```python
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Utiliser pathlib pour les chemins
Portable entre Windows et Linux, lisible. Voir [[Chemin de fichier en Python (pathlib)]].

```python
from pathlib import Path
sortie = Path("exports") / "rapport.csv"
for p in Path("images").glob("*.png"):
    print(p.name, p.stat().st_size)
```

### 4. Ouvrir les fichiers avec with et un encodage
`with` ferme le fichier même en cas d'erreur ; `encoding="utf-8"` évite les surprises sous Windows.

```python
with open(chemin, encoding="utf-8") as f:
    contenu = f.read()
```

### 5. Attraper les exceptions précises
`except FileNotFoundError:` plutôt que `except:` : tu traites le cas prévu et les vrais bugs restent visibles. Voir [[Exception]].

### 6. Écrire des fonctions avec des annotations de type
Elles documentent et l'éditeur détecte des erreurs.

```python
def nom_archive(dossier: str, jour: date) -> str:
    ...
```

### 7. Garder un point d'entrée main
Le code ne s'exécute pas quand on importe le fichier (par exemple dans un test).

```python
def main() -> None:
    ...

if __name__ == "__main__":
    main()
```

### 8. Utiliser logging plutôt que print pour un script qui dure
Niveaux, horodatage, fichier. Voir [[Journaliser avec logging]].

### 9. Utiliser les outils fournis
`enumerate`, `zip`, compréhensions, `sorted(key=…)`, `collections.Counter`, `defaultdict`, `any`, `all` : plus court et plus juste qu'une boucle écrite à la main.

```python
for i, nom in enumerate(noms, start=1):
    print(i, nom)
total = sum(f.stat().st_size for f in fichiers)
```

## À éviter

### 1. Une valeur par défaut modifiable
**Pourquoi c'est un problème :** `def f(liste=[])` : la même liste est partagée entre tous les appels.
**À la place :** `def f(liste=None):` puis `liste = liste or []`.

### 2. `except:` ou `except Exception: pass`
**Pourquoi c'est un problème :** avale aussi les bugs et même Ctrl+C.
**À la place :** attraper l'exception précise, et journaliser.

### 3. Construire des chemins avec `+` et des `/`
**Pourquoi c'est un problème :** casse sous Windows et oublie des séparateurs.
**À la place :** `Path(dossier) / nom`.

### 4. `from module import *`
**Pourquoi c'est un problème :** on ne sait plus d'où vient un nom, et des noms s'écrasent.
**À la place :** importer les noms utiles explicitement.

### 5. Installer des paquets avec `sudo pip` ou hors environnement virtuel
**Pourquoi c'est un problème :** conflits avec le système, projets qui cassent les uns les autres.
**À la place :** un `.venv` par projet.

### 6. Comparer à None avec `==`
**Pourquoi c'est un problème :** fonctionne mal avec certains objets.
**À la place :** `if x is None:`.

### 7. Modifier une liste pendant qu'on la parcourt
**Pourquoi c'est un problème :** des éléments sont sautés.
**À la place :** construire une nouvelle liste (compréhension).

### 8. `subprocess` avec `shell=True` et une chaîne construite
**Pourquoi c'est un problème :** injection de commande si une valeur vient de l'extérieur.
**À la place :** une liste d'arguments : `subprocess.run(["zip", "-r", nom, dossier], check=True)`.

## Avant de valider mon travail
- [ ] `ruff check` et `ruff format` ne signalent rien
- [ ] Le projet a son `.venv` et ses dépendances sont listées
- [ ] Les fichiers sont ouverts avec `with` et `encoding`
- [ ] Aucun `except` vide
- [ ] `pytest` passe

## Notions liées
[[Python]] · [[Environnement virtuel Python]] · [[Chemin de fichier en Python (pathlib)]] · [[Exception]] · [[Journaliser avec logging]] · [[Lancer une commande (subprocess)]]
