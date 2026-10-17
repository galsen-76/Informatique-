---
type: notion
statut: a apprendre
resume: "Les classes Python fonctionnent comme en TypeScript (voir POO), avec trois différences à retenir : le constructeur s'appelle init, chaque méthode reçoit self en premier paramètre (l'équivalent de this), et il n'y a pas de vrai private (on préfixe par _ par convention)."
revu:
sources:
  - "https://docs.python.org/3/tutorial/classes.html"
---
# POO et classes Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les classes Python fonctionnent comme en TypeScript (voir [[05 Programmation orientée objet|POO]]), avec trois différences à retenir : le constructeur s'appelle `__init__`, chaque méthode reçoit **`self`** en premier paramètre (l'équivalent de `this`), et il n'y a pas de vrai `private` (on préfixe par `_` par convention).

## Le problème

**Pourquoi c'est utile ?**
Pour regrouper données et comportements dans des classes, avec les conventions de Python.

**Qu'est-ce qui se passait sans ça ?**
En venant de TypeScript, on oubliait self ou __init__, et on obtenait des erreurs déroutantes.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

### TypeScript → Python

```ts
// TypeScript
class Movie {
  constructor(public title: string, public year: number) {}

  label(): string {
    return `${this.title} (${this.year})`;
  }
}
const dune = new Movie('Dune', 2021);
```

```python
# Python
class Movie:
    def __init__(self, title, year):
        self.title = title
        self.year = year

    def label(self):
        return f"{self.title} ({self.year})"

dune = Movie("Dune", 2021)      # pas de new
dune.label()                    # "Dune (2021)"
```

| TypeScript | Python |
|---|---|
| `constructor` | `__init__` |
| `this` | `self` (à écrire en **premier paramètre** de chaque méthode) |
| `new Movie()` | `Movie()` |
| `private x` | `_x` (convention : « ne touche pas ») |
| `extends` | `class Admin(User):` |
| `super.method()` | `super().method()` |

### Les dataclasses : la classe « données » en une ligne

Pour une classe qui ne fait que porter des données (comme une `interface` + objet en TS) :

```python
from dataclasses import dataclass

@dataclass
class Movie:
    title: str
    year: int
    rating: float = 0.0

dune = Movie("Dune", 2021)
print(dune)       # Movie(title='Dune', year=2021, rating=0.0)
```

`__init__`, l'affichage et la comparaison sont générés automatiquement.

### Les méthodes spéciales

Les méthodes entourées de `__` personnalisent le comportement : `__init__` (création), `__str__` (affichage avec `print`), `__eq__` (comparaison `==`), `__len__` (pour `len()`).

## 🧪 Exemple

### L'héritage

```python
class User:
    def __init__(self, email):
        self.email = email

class Admin(User):
    def __init__(self, email, level):
        super().__init__(email)
        self.level = level
```

## ⚠️ Limites et pièges

- **Oublier `self`** en premier paramètre : `TypeError: takes 0 positional arguments but 1 was given`.
- **Oublier `self.`** devant un attribut : tu crées une variable locale au lieu de l'attribut.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Traduire une classe TypeScript

Traduis cette classe en Python :

```ts
class Movie {
  constructor(public title: string, public year: number) {}
  isRecent(): boolean { return this.year >= 2020; }
}
```

> [!success]- Solution
> ```python
> class Movie:
>     def __init__(self, title, year):
>         self.title = title
>         self.year = year
>
>     def is_recent(self):
>         return self.year >= 2020
>
> dune = Movie("Dune", 2021)
> dune.is_recent()   # True
> ```

#### Exercice 2 · Une dataclass

Réécris la classe précédente avec `@dataclass`, en ajoutant une note `rating` à `0.0` par défaut. Que t'apporte la dataclass ?

> [!success]- Solution
> ```python
> from dataclasses import dataclass
>
> @dataclass
> class Movie:
>     title: str
>     year: int
>     rating: float = 0.0
>
>     def is_recent(self):
>         return self.year >= 2020
>
> print(Movie("Dune", 2021))   # Movie(title='Dune', year=2021, rating=0.0)
> ```
>
> Le `__init__`, l'affichage lisible et la comparaison `==` sont générés automatiquement.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Python|Fondamentaux Python]]
- **Voir aussi :** [[04 Fonctions Python|Fonctions Python]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/tutorial/classes.html
