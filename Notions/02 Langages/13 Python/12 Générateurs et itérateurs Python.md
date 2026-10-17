---
type: notion
statut: a apprendre
resume: "Un générateur produit ses valeurs une par une, à la demande, au lieu de tout calculer et tout stocker d'un coup."
revu:
sources:
  - "https://docs.python.org/3/tutorial/classes.html#generators"
---
# Générateurs et itérateurs Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **générateur** produit ses valeurs **une par une, à la demande**, au lieu de tout calculer et tout stocker d'un coup.

## Le problème

**Pourquoi c'est utile ?**
Pour produire des valeurs une par une à la demande, sans tout charger en mémoire.

**Qu'est-ce qui se passait sans ça ?**
On chargeait tout un fichier ou toute une requête en mémoire d'un coup, et le programme plantait sur les gros volumes.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Comme un robinet plutôt qu'un seau : tu peux traiter un fichier de 10 Go ligne par ligne sans remplir la mémoire. Le mot-clé : **`yield`**.

### `return` ou `yield`

```python
# Liste : tout est calculé et stocké en mémoire
def squares_list(n):
    return [i * i for i in range(n)]

# Générateur : une valeur à la fois, au moment où on la demande
def squares_gen(n):
    for i in range(n):
        yield i * i            # « donne cette valeur, et mets-toi en pause »

for s in squares_gen(1_000_000):
    print(s)                   # la mémoire ne contient qu'une valeur à la fois
```

À chaque tour de boucle, la fonction reprend **là où elle s'était arrêtée**.

### L'expression génératrice

Une compréhension avec des **parenthèses** au lieu de crochets :

```python
total = sum(m["rating"] for m in movies)     # aucune liste intermédiaire créée
```

### Itérable, itérateur : le vocabulaire

- **Itérable** : tout ce qu'on peut parcourir avec `for` (liste, dict, chaîne, fichier, générateur).
- **Itérateur** : l'objet qui donne l'élément suivant avec `next()`.

`range()`, `enumerate()`, `zip()`, `open()` renvoient des objets paresseux du même genre. JavaScript a le même concept (`function*` et `yield`), plus rare côté front.

## 🧪 Exemple

### Le cas concret : un gros fichier

```python
def read_ratings(path):
    with open(path, encoding="utf-8") as f:
        for line in f:
            title, rating = line.strip().split(";")
            yield title, float(rating)

best = [t for t, r in read_ratings("ratings.csv") if r >= 4.5]
```

## ⚠️ Limites et pièges

- **Un générateur ne se parcourt qu'une fois** : après, il est vide. Recrée-le ou transforme-le en liste.
- **`len()` ne marche pas** sur un générateur : il ne connaît pas sa taille à l'avance.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Écrire un générateur

Écris un générateur `pages(total_pages)` qui donne les numéros de page de 1 à `total_pages`, puis utilise-le dans une boucle.

> [!success]- Solution
> ```python
> def pages(total_pages):
>     for page in range(1, total_pages + 1):
>         yield page
>
> for p in pages(3):
>     print(f"Chargement de la page {p}")
> ```

#### Exercice 2 · Le générateur vide

Pourquoi le deuxième `sum` renvoie-t-il 0 ?

```python
ratings = (m["rating"] for m in movies)
print(sum(ratings))
print(sum(ratings))
```

> [!success]- Solution
> Un générateur ne se parcourt **qu'une fois** : le premier `sum` l'a épuisé, il n'a plus rien à donner.
>
> Pour le réutiliser, crée une liste : `ratings = [m["rating"] for m in movies]`.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Python|Fondamentaux Python]]
- **Voir aussi :** [[03 Structures de contrôle Python|Structures de contrôle Python]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/tutorial/classes.html#generators
