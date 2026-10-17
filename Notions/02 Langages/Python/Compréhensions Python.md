---
type: notion
statut: a apprendre
resume: "Une compréhension construit une liste (ou un dictionnaire, ou un set) en une ligne, à partir d'une autre."
revu:
sources:
  - "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
---
# Compréhensions Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **compréhension** construit une liste (ou un dictionnaire, ou un set) en **une ligne**, à partir d'une autre.

## Le problème

**Pourquoi c'est utile ?**
Pour construire une liste ou un dictionnaire à partir d'un autre en une ligne lisible.

**Qu'est-ce qui se passait sans ça ?**
On écrivait une boucle de 4 lignes avec append pour chaque transformation simple.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

C'est l'équivalent Python de `map` + `filter` en JavaScript, et c'est la façon « pythonique » de transformer des données. On en voit partout.

### JavaScript → Python

```js
// JavaScript
const titles = movies.filter((m) => m.year >= 2020).map((m) => m.title.toUpperCase());
```

```python
# Python
titles = [m["title"].upper() for m in movies if m["year"] >= 2020]
```

Se lit comme une phrase : « **le titre en majuscules**, **pour chaque film**, **si** l'année est ≥ 2020 ».

### Les variantes

```python
numbers = [1, 2, 3, 4]

squares = [n * n for n in numbers]                 # liste : [1, 4, 9, 16]
evens = [n for n in numbers if n % 2 == 0]         # filtre : [2, 4]

by_id = {m["id"]: m for m in movies}               # dictionnaire id → film
genres = {m["genre"] for m in movies}              # set : genres uniques

labels = ["pair" if n % 2 == 0 else "impair" for n in numbers]   # condition dans le résultat
```

### Avec la somme, le max…

```python
total = sum(m["rating"] for m in movies)           # sans crochets : pas de liste intermédiaire
best = max(movies, key=lambda m: m["rating"])      # le film le mieux noté
has_old = any(m["year"] < 1980 for m in movies)    # comme some()
all_rated = all(m["rating"] > 0 for m in movies)   # comme every()
```

### Quand ne pas en faire

Si la compréhension ne tient plus sur une ligne lisible (plusieurs `for`, plusieurs `if`), écris une **boucle normale**. La lisibilité passe avant (voir [[Lisibilité et nommage du code|Lisibilité]]).

## 🧪 Exemple

### La structure

```text
[ résultat   for élément in collection   if condition ]
   ↑ map          ↑ la boucle                ↑ filter (optionnel)
```

## ⚠️ Limites et pièges

- **Une compréhension géante** illisible.
- **L'utiliser pour un effet de bord** (`[print(m) for m in movies]`) : fais une boucle `for`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Traduire en compréhension

Traduis ce JavaScript en une compréhension Python :

```js
const titles = movies.filter((m) => m.rating >= 4).map((m) => m.title.toUpperCase());
```

> [!success]- Solution
> ```python
> titles = [m["title"].upper() for m in movies if m["rating"] >= 4]
> ```

#### Exercice 2 · Dictionnaire et set

Avec une liste de films `{ "id", "title", "genre" }` :
1. crée un dictionnaire `id → titre` ;
2. crée l'ensemble des genres, sans doublon.

> [!success]- Solution
> ```python
> titles_by_id = {m["id"]: m["title"] for m in movies}
> genres = {m["genre"] for m in movies}
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Python]]
- **Voir aussi :** [[Structures de données Python]], [[Structures de contrôle Python]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
