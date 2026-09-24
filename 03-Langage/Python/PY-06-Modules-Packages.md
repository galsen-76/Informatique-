---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Modules & Packages Python"
tags:
  - backend/python/modules
parent: "[[Python]]"
children:
  - "[[PY-13-Environnements-Virtuels-Pip|Environnements virtuels et pip]]"
related_theory:
  - "[[PY-01-Fondamentaux|Fondamentaux Python]]"
related_snippets:
  - "[[04_Snippets/py-modules]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/modules.html"
---

# Modules & Packages Python

> [!abstract] Introduction
> Un module est un fichier Python réutilisable dans un autre fichier, et un package est un dossier regroupant plusieurs modules liés entre eux — c'est ainsi qu'on organise et partage du code Python.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi un "module" en Python ?
> > Un module, c'est simplement un fichier `.py`. N'importe quel fichier Python peut être "importé" (réutilisé) dans un autre fichier.
>
> ```python
> # outils.py
> def additionner(a, b):
>     return a + b
> ```
> ```python
> # main.py
> import outils
> print(outils.additionner(2, 3))  # 5
> ```
>
> > [!note] C'est quoi un "package" ?
> > Un package est un DOSSIER contenant plusieurs modules (fichiers `.py`), organisés ensemble sous un même nom, souvent avec un fichier spécial `__init__.py` qui indique à Python "ce dossier est un package".

> [!question]- Pourquoi l'utiliser ?
> Sans modules, tout le code d'un projet devrait tenir dans un seul fichier géant — illisible et impossible à maintenir. Les modules et packages permettent d'organiser le code en unités logiques réutilisables, comme les fichiers séparés en JavaScript/TypeScript.

> [!question]- Comment ça marche ?
> **Différentes façons d'importer :**
> ```python
> import outils                      # importe tout le module
> from outils import additionner     # importe une seule fonction précise
> from outils import additionner as add  # importe en renommant
> import outils as o                 # importe tout le module en le renommant
> ```
>
> **Importer depuis un package (dossier) :**
> ```
> mon_projet/
>   films/
>     __init__.py
>     gestion.py
> ```
> ```python
> from films.gestion import ajouter_film
> ```
>
> **Librairies externes avec `pip` :**
> > [!note] C'est quoi `pip` ?
> > `pip` est l'outil qui télécharge et installe des librairies Python créées par d'autres développeurs, un peu comme `npm` en JavaScript/TypeScript.
> ```bash
> pip install requests
> ```
> ```python
> import requests
> reponse = requests.get("https://api.example.com/films")
> ```

> [!question]- Quand l'utiliser ?
> Dès qu'un fichier commence à devenir trop gros ou mélange plusieurs responsabilités différentes — séparer en modules distincts (ex : `gestion_films.py`, `gestion_utilisateurs.py`).

---

## Points clés

- Un module = un fichier `.py`, un package = un dossier de modules avec `__init__.py`
- `import module` importe tout, `from module import fonction` importe une partie précise
- `pip` = l'équivalent de `npm` pour installer des librairies externes
- Convention : les imports se placent tout en haut du fichier

---

## Paramètres / Configuration

| Syntaxe | Description | Notes |
|-----------|-------------|-------|
| `import module` | Importe le module entier | Accès via `module.fonction()` |
| `from module import x` | Importe uniquement `x` | Accès direct via `x()` |
| `import module as m` | Importe en renommant | Pratique pour raccourcir un nom long |
| `pip install nom` | Installe une librairie externe | Équivalent `npm install` |
| `pip freeze > requirements.txt` | Liste les librairies installées dans un fichier | Équivalent `package.json` |

---

## Exemple minimal

```python
# gestion_films.py
def ajouter_film(liste, titre):
    liste.append(titre)
    return liste
```

```python
# main.py
from gestion_films import ajouter_film

films = []
films = ajouter_film(films, "Inception")
print(films)  # ["Inception"]
```

> [!note] Ce que j'en retiens
> `main.py` n'a pas besoin de connaître le contenu complet de `gestion_films.py` — il importe juste la fonction dont il a besoin, comme un `import { ajouterFilm } from './gestion-films'` en TypeScript.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → [[PY-13-Environnements-Virtuels-Pip|Environnements virtuels et pip]]
- À comparer avec → [[TS-11-Modules|TypeScript - Modules]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-modules]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - À quoi sert `if __name__ == '__main__':` ?

---

## Tâches

- [ ] #task Découper un script Python existant en plusieurs modules organisés
- [ ] #task Installer une librairie externe avec `pip` et l'utiliser dans un script
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quelle est la différence exacte entre `requirements.txt` et les fichiers modernes comme `pyproject.toml` ?
