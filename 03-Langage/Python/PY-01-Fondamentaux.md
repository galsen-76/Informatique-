---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Fondamentaux Python"
tags:
  - backend/python/fondamentaux
parent: "[[Python]]"
related_theory:
  - "[[TS-01-Fondamentaux|TypeScript - Fondamentaux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/"
---

# Fondamentaux Python

> [!abstract] En bref
> Python est un langage très lisible, utilisé pour les scripts, la data, l'IA et les back-ends (FastAPI, Django). Tu connais déjà JavaScript : la logique est la même, seule la **syntaxe** change. Les deux grosses différences : **pas d'accolades** (c'est l'**indentation** qui délimite les blocs) et **pas de `let` / `const`**.

## JavaScript → Python

| JavaScript / TypeScript | Python |
|---|---|
| `let title = 'Dune';` | `title = "Dune"` |
| `const MAX = 10;` | `MAX = 10` (convention : majuscules = ne pas modifier) |
| `// commentaire` | `# commentaire` |
| `` `Film ${title}` `` | `f"Film {title}"` |
| `true` / `false` | `True` / `False` |
| `null` / `undefined` | `None` |
| `&&`, `\|\|`, `!` | `and`, `or`, `not` |
| `===` | `==` |
| `console.log(x)` | `print(x)` |
| `camelCase` | `snake_case` |

## Les types de base

| Type | Exemple | Équivalent JS |
|---|---|---|
| `str` | `"Inception"` | `string` |
| `int` | `2010` | `number` (entier) |
| `float` | `8.8` | `number` (à virgule) |
| `bool` | `True` | `boolean` |
| `None` | `None` | `null` |

Contrairement à JavaScript, Python refuse de mélanger les types : `"5" + 1` provoque une **erreur** (voir [[TG-03-Typage-Statique-Dynamique|Typage]]).

## L'indentation remplace les accolades

```python
year = 2010

if year > 2000:
    print("Film récent")      # 4 espaces = dans le if
else:
    print("Film ancien")

print("Fin")                  # plus d'espaces = sorti du if
```

Le `:` ouvre un bloc, les **4 espaces** disent ce qui est dedans. Une mauvaise indentation = une **erreur**, pas juste un problème de style.

## Lancer du Python

```bash
python3 --version          # vérifier l'installation
python3 script.py          # exécuter un fichier
python3                    # console interactive (quit() pour sortir)
```

## Pièges

- **Mélanger espaces et tabulations** : configure l'éditeur sur 4 espaces.
- **Oublier les `:`** après `if`, `for`, `def`, `class`.
- **Écrire `true`** en minuscules : c'est `True`.
