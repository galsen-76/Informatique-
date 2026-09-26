---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Programmation Orientée Objet (Classes) en Python"
tags:
  - backend/python/poo
parent: "[[Python]]"
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/classes.html"
---

# Programmation Orientée Objet (Classes) en Python

> [!abstract] En bref
> Les classes Python fonctionnent comme en TypeScript (voir [[TG-05-Paradigmes-POO|POO]]), avec trois différences à retenir : le constructeur s'appelle `__init__`, chaque méthode reçoit **`self`** en premier paramètre (l'équivalent de `this`), et il n'y a pas de vrai `private` (on préfixe par `_` par convention).

## TypeScript → Python

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

## L'héritage

```python
class User:
    def __init__(self, email):
        self.email = email

class Admin(User):
    def __init__(self, email, level):
        super().__init__(email)
        self.level = level
```

## Les dataclasses : la classe « données » en une ligne

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

## Les méthodes spéciales

Les méthodes entourées de `__` personnalisent le comportement : `__init__` (création), `__str__` (affichage avec `print`), `__eq__` (comparaison `==`), `__len__` (pour `len()`).

## Pièges

- **Oublier `self`** en premier paramètre : `TypeError: takes 0 positional arguments but 1 was given`.
- **Oublier `self.`** devant un attribut : tu crées une variable locale au lieu de l'attribut.
