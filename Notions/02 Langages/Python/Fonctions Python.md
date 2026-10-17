---
type: notion
statut: a apprendre
resume: "Une fonction Python se déclare avec def, et son corps est indenté."
revu:
sources:
  - "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
---
# Fonctions Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une fonction Python se déclare avec `def`, et son corps est indenté.

## Le problème

**Pourquoi c'est utile ?**
Pour réutiliser du code avec des paramètres clairs, y compris nommés et optionnels.

**Qu'est-ce qui se passait sans ça ?**
Des appels à rallonge avec des paramètres positionnels dont on oubliait l'ordre, et des fonctions dupliquées.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Deux choses que JavaScript n'a pas aussi simplement : les **paramètres nommés** à l'appel (`search(title="Dune", year=2021)`) et les paramètres « tout le reste » `*args` / `**kwargs`.

### Déclarer et appeler

```python
def greet(name):
    return f"Bonjour {name}"

greet("Alice")      # "Bonjour Alice"
```

Sans `return`, une fonction renvoie `None`.

### `*args` et `**kwargs`

```python
def total(*numbers):              # tous les arguments positionnels dans un tuple
    return sum(numbers)
total(1, 2, 3)                    # 6        (JS : ...numbers)

def create_movie(**fields):       # tous les arguments nommés dans un dictionnaire
    return fields
create_movie(title="Dune", year=2021)   # {"title": "Dune", "year": 2021}
```

### Les fonctions sont des valeurs

Comme en JavaScript (voir [[Programmation fonctionnelle]]) :

```python
def double(n):
    return n * 2

numbers = [1, 2, 3]
list(map(double, numbers))        # [2, 4, 6]

square = lambda n: n * n          # petite fonction anonyme (comme n => n * n)
```

Voir aussi [[Lambda et programmation fonctionnelle Python|Lambda et fonctionnel]].

### Le piège classique : la valeur par défaut modifiable

```python
# ❌ la même liste est partagée entre tous les appels
def add_movie(movie, movies=[]):
    movies.append(movie)
    return movies

add_movie("Dune")    # ["Dune"]
add_movie("Alien")   # ["Dune", "Alien"] !

# ✅
def add_movie(movie, movies=None):
    if movies is None:
        movies = []
    movies.append(movie)
    return movies
```

## 🧪 Exemple

### Valeurs par défaut et paramètres nommés

```python
def search(title, year=None, limit=20):
    ...

search("Dune")                       # year=None, limit=20
search("Dune", limit=5)              # on nomme le paramètre voulu, dans n'importe quel ordre
search(title="Dune", year=2021)
```

Les paramètres nommés rendent les appels **lisibles** : `search("Dune", limit=5)` se comprend tout seul.

## ⚠️ Limites et pièges

- **Une liste ou un dict comme valeur par défaut** (voir ci-dessus).
- **Oublier le `return`** : la fonction renvoie `None`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Paramètres par défaut et nommés

Écris `search(title, year=None, limit=10)` qui renvoie un texte décrivant la recherche. Appelle-la avec seulement le titre, puis avec le titre et `limit=5` sans donner l'année.

> [!success]- Solution
> ```python
> def search(title, year=None, limit=10):
>     return f"Recherche '{title}', année={year}, limite={limit}"
>
> search("Dune")               # année=None, limite=10
> search("Dune", limit=5)      # on saute year grâce au paramètre nommé
> ```

#### Exercice 2 · Le piège de la liste par défaut

Qu'affiche ce code au deuxième appel ? Corrige-le.

```python
def add_favorite(movie, favorites=[]):
    favorites.append(movie)
    return favorites

add_favorite("Dune")
print(add_favorite("Alien"))
```

> [!success]- Solution
> Il affiche `['Dune', 'Alien']` : la liste par défaut est créée **une seule fois** et partagée entre les appels.
>
> ```python
> def add_favorite(movie, favorites=None):
>     if favorites is None:
>         favorites = []
>     favorites.append(movie)
>     return favorites
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Python]]
- **Voir aussi :** [[Structures de contrôle Python]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/tutorial/controlflow.html#defining-functions
