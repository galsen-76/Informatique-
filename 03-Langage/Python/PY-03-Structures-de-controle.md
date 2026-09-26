---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Structures de Contrôle Python"
tags:
  - backend/python/controle
parent: "[[Python]]"
related_theory:
  - "[[PY-01-Fondamentaux|Fondamentaux Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/controlflow.html"
---

# Structures de Contrôle Python

> [!abstract] En bref
> Conditions et boucles fonctionnent comme en JavaScript, avec une syntaxe plus courte : `elif` au lieu de `else if`, et une boucle `for` qui parcourt **directement** les éléments (comme `for…of`). Pas de `for (let i = 0; …)` : on utilise `range()`.

## Les conditions

```python
rating = 4

if rating >= 4:
    print("Excellent")
elif rating >= 2:          # else if
    print("Correct")
else:
    print("À éviter")

# condition sur une ligne (le ternaire)
label = "Bon" if rating >= 3 else "Mauvais"      # JS : rating >= 3 ? 'Bon' : 'Mauvais'
```

Valeurs considérées comme fausses : `False`, `None`, `0`, `""`, `[]`, `{}`. Donc `if movies:` = « si la liste n'est pas vide ».

## Les boucles

```python
movies = ["Dune", "Alien", "Heat"]

for movie in movies:                    # JS : for (const movie of movies)
    print(movie)

for i, movie in enumerate(movies):      # avec l'index
    print(i, movie)

for i in range(5):                      # 0, 1, 2, 3, 4
    print(i)

for key, value in {"a": 1}.items():     # clé + valeur d'un dictionnaire
    print(key, value)

count = 0
while count < 3:
    count += 1                          # pas de count++ en Python
```

`break` (sortir de la boucle) et `continue` (passer au suivant) fonctionnent comme en JS.

## Le `match` (Python 3.10+)

L'équivalent d'un `switch`, en plus puissant :

```python
match status:
    case 200:
        print("OK")
    case 404:
        print("Introuvable")
    case _:                 # default
        print("Autre")
```

## Pièges

- **Écrire `else if`** : c'est `elif`.
- **`i++`** n'existe pas : `i += 1`.
- **Oublier les `:`** en fin de `if`, `for`, `while`.
