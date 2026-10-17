---
type: notion
statut: a apprendre
resume: "Python a 4 façons de regrouper des valeurs : la liste (le tableau de JS), le dictionnaire (l'objet de JS), le set (le Set de JS) et le tuple (une liste qu'on ne peut plus modifier)."
revu:
sources:
  - "https://docs.python.org/3/tutorial/datastructures.html"
---
# Structures de données Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Python a 4 façons de regrouper des valeurs : la **liste** (le tableau de JS), le **dictionnaire** (l'objet de JS), le **set** (le `Set` de JS) et le **tuple** (une liste qu'on ne peut plus modifier).

## Le problème

**Pourquoi c'est utile ?**
Pour regrouper des valeurs avec la bonne structure : liste, dictionnaire, set ou tuple.

**Qu'est-ce qui se passait sans ça ?**
On utilisait toujours des listes, même pour retrouver une valeur par clé ou éviter les doublons : lent et compliqué.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Avec ces 4 structures, tu couvres presque tous les besoins.

### Les 4 structures

| Python | Exemple | Équivalent JS | Particularité |
|---|---|---|---|
| **list** | `["Dune", "Alien"]` | tableau | ordonnée, modifiable |
| **dict** | `{"title": "Dune", "year": 2021}` | objet / `Map` | clé → valeur |
| **set** | `{"SF", "Action"}` | `Set` | valeurs uniques |
| **tuple** | `(48.85, 2.35)` | tableau figé | **non modifiable** |

### Le dictionnaire

```python
movie = {"title": "Dune", "year": 2021}

movie["title"]                # "Dune" ; erreur si la clé n'existe pas
movie.get("director")         # None, sans erreur
movie.get("director", "?")    # valeur par défaut
movie["rating"] = 4.5         # ajouter ou modifier
"year" in movie               # True

for key, value in movie.items():
    print(key, value)
```

Les données JSON d'une API deviennent des dictionnaires et des listes.

### Le set et le tuple

```python
genres = {"SF", "Action", "SF"}     # {"SF", "Action"} : doublon supprimé
unique = set(["a", "b", "a"])       # dédoublonner une liste

point = (48.85, 2.35)               # tuple
lat, lng = point                    # déstructuration
```

Pour choisir entre liste et set, même logique qu'en JS : voir [[Tables de hachage Map et Set|Map et Set]].

## 🧪 Exemple

### La liste

```python
movies = ["Dune", "Alien", "Heat"]

movies[0]            # "Dune"
movies[-1]           # "Heat" : les index négatifs partent de la fin
movies[0:2]          # ["Dune", "Alien"] : une tranche (comme slice)
len(movies)          # 3 (pas de .length)

movies.append("Tenet")     # push
movies.remove("Alien")     # retire par valeur
movies.pop()               # retire le dernier
"Dune" in movies           # True (comme includes)
sorted(movies)             # nouvelle liste triée (comme toSorted)
```

## ⚠️ Limites et pièges

- **`movie["key"]` sur une clé absente** : `KeyError`. Utilise `.get()` si tu n'es pas sûr.
- **`{}` crée un dictionnaire vide**, pas un set : pour un set vide, `set()`.
- **Copier une liste avec `=`** : les deux variables pointent vers la même liste (comme en JS). Copie avec `movies.copy()` ou `list(movies)`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Manipuler une liste

À partir de `movies = ["Dune", "Alien", "Heat"]` : ajoute `"Tenet"`, affiche le dernier élément, les deux premiers, le nombre de films, et vérifie si `"Alien"` est présent.

> [!success]- Solution
> ```python
> movies = ["Dune", "Alien", "Heat"]
> movies.append("Tenet")
> print(movies[-1])        # Tenet
> print(movies[0:2])       # ['Dune', 'Alien']
> print(len(movies))       # 4
> print("Alien" in movies) # True
> ```

#### Exercice 2 · Lire un dictionnaire sans planter

Avec `movie = {"title": "Dune", "year": 2021}`, affiche le réalisateur, ou `"inconnu"` s'il n'existe pas. Pourquoi `movie["director"]` est-il risqué ?

> [!success]- Solution
> ```python
> print(movie.get("director", "inconnu"))   # inconnu
> ```
>
> `movie["director"]` lève une erreur **KeyError** si la clé n'existe pas. `.get()` renvoie une valeur par défaut.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Python]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/tutorial/datastructures.html
