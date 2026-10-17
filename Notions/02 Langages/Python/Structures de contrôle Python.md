---
type: notion
statut: a apprendre
resume: "Conditions et boucles fonctionnent comme en JavaScript, avec une syntaxe plus courte : elif au lieu de else if, et une boucle for qui parcourt directement les éléments (comme for…of)."
revu:
sources:
  - "https://docs.python.org/3/tutorial/controlflow.html"
---
# Structures de contrôle Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Conditions et boucles fonctionnent comme en JavaScript, avec une syntaxe plus courte : `elif` au lieu de `else if`, et une boucle `for` qui parcourt **directement** les éléments (comme `for…of`).

## Le problème

**Pourquoi c'est utile ?**
Pour écrire des conditions et des boucles en Python, avec sa syntaxe propre.

**Qu'est-ce qui se passait sans ça ?**
En venant de JavaScript, on écrivait des boucles à index et des accolades qui n'existent pas en Python.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Pas de `for (let i = 0; …)` : on utilise `range()`.

### Les conditions

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

### Le `match` (Python 3.10+)

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

## 🧪 Exemple

### Les boucles

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

## ⚠️ Limites et pièges

- **Écrire `else if`** : c'est `elif`.
- **`i++`** n'existe pas : `i += 1`.
- **Oublier les `:`** en fin de `if`, `for`, `while`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Parcourir avec l'index

Affiche chaque film avec son numéro, en commençant à 1 : `1. Dune`, `2. Alien`…

> [!success]- Solution
> ```python
> movies = ["Dune", "Alien", "Heat"]
> for i, title in enumerate(movies, start=1):
>     print(f"{i}. {title}")
> ```

#### Exercice 2 · Classer une note

Écris une fonction `label(rating)` qui renvoie `"Excellent"` (≥ 4), `"Correct"` (≥ 2) ou `"À éviter"`, puis affiche le label de chaque note de `[5, 3, 1]`.

> [!success]- Solution
> ```python
> def label(rating):
>     if rating >= 4:
>         return "Excellent"
>     elif rating >= 2:
>         return "Correct"
>     else:
>         return "À éviter"
>
> for r in [5, 3, 1]:
>     print(r, label(r))
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Python]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/tutorial/controlflow.html
