---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Structures de Contrôle Python"
tags:
  - backend/python/controle
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-01-Fondamentaux|Fondamentaux Python]]"
related_snippets:
  - "[[04_Snippets/py-controle]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/controlflow.html"
---

# Structures de Contrôle Python

> [!abstract] Introduction
> Les structures de contrôle permettent de faire des choix (conditions) et de répéter des actions (boucles) dans un programme, en utilisant l'indentation pour délimiter chaque bloc.

---

## Théorie

> [!question]- C'est quoi ?
> Deux grandes familles :
> 1. **Conditions** (`if` / `elif` / `else`) : exécuter du code seulement si une condition est vraie
> 2. **Boucles** (`for` / `while`) : répéter du code plusieurs fois

> [!question]- Pourquoi l'utiliser ?
> Sans structures de contrôle, un programme exécuterait toujours exactement les mêmes instructions, dans le même ordre, sans jamais s'adapter aux données. Les conditions et boucles rendent le code capable de réagir et de traiter des quantités variables de données.

> [!question]- Comment ça marche ?
> **Condition :**
> ```python
> annee = 2010
>
> if annee > 2015:
>     print("Film récent")
> elif annee > 2000:
>     print("Film des années 2000")
> else:
>     print("Film ancien")
> ```
> > [!note] `elif` ?
> > Contraction de "else if" — permet d'enchaîner plusieurs conditions sans emboîter des `if` les uns dans les autres.
>
> **Boucle `for` — parcourir une collection :**
> ```python
> films = ["Inception", "Interstellar"]
> for film in films:
>     print(film)
> ```
> > [!note] Différence avec la boucle `for` en JavaScript
> > En Python, `for film in films` parcourt DIRECTEMENT les éléments (pas besoin d'index comme `for (let i = 0; i < films.length; i++)`). Si on a besoin de l'index en même temps, on utilise `enumerate()`.
> ```python
> for index, film in enumerate(films):
>     print(f"{index}: {film}")
> ```
>
> **Boucle `while` — répéter tant qu'une condition est vraie :**
> ```python
> compteur = 0
> while compteur < 3:
>     print(compteur)
>     compteur += 1
> ```
> > [!note] `+=` ?
> > `compteur += 1` est un raccourci pour `compteur = compteur + 1`. Fonctionne comme en JavaScript.
>
> **Sortir d'une boucle ou passer au tour suivant :**
> ```python
> for film in films:
>     if film == "Interstellar":
>         break     # arrête complètement la boucle
>     if film == "Inception":
>         continue  # passe directement au tour suivant
> ```

> [!question]- Quand l'utiliser ?
> - `if`/`elif`/`else` : dès qu'un comportement doit dépendre d'une condition
> - `for` : parcourir une collection connue (liste, dictionnaire, chaîne de caractères)
> - `while` : répéter tant qu'une condition reste vraie, sans connaître à l'avance le nombre de répétitions

---

## Points clés

- Pas d'accolades : l'indentation définit ce qui appartient au bloc `if`/`for`/`while`
- `elif` remplace la répétition de `else { if (...) }`
- `for ... in ...` parcourt directement les éléments, pas besoin d'index
- `enumerate()` donne à la fois l'index ET l'élément dans une boucle `for`
- `break` arrête la boucle, `continue` passe au tour suivant sans terminer la boucle

---

## Paramètres / Configuration

| Mot-clé | Description | Notes |
|-----------|-------------|-------|
| `if` / `elif` / `else` | Structure conditionnelle | `elif` = "else if" |
| `for x in collection` | Boucle sur chaque élément | Pas d'index par défaut |
| `while condition` | Boucle tant que la condition est vraie | Attention aux boucles infinies |
| `enumerate(collection)` | Donne index + élément dans une boucle `for` | — |
| `break` / `continue` | Sortir de la boucle / passer au tour suivant | — |

---

## Exemple minimal

```python
films = [
    {"titre": "Inception", "annee": 2010},
    {"titre": "Dunkirk", "annee": 2017},
    {"titre": "Interstellar", "annee": 2014}
]

for index, film in enumerate(films):
    if film["annee"] < 2015:
        print(f"{index}: {film['titre']} est sorti avant 2015")
    else:
        continue
```

> [!note] Ce que j'en retiens
> `enumerate()` donne à la fois la position (`index`) et le contenu (`film`) à chaque tour de boucle — pratique quand on a besoin des deux informations simultanément, sans gérer un compteur manuellement.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[JS-01-Fondamentaux|JavaScript - Boucles et conditions]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-controle]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment parcourir un dictionnaire avec clés et valeurs ?

---

## Tâches

- [ ] #task Écrire une boucle qui filtre une liste de films selon une condition
- [ ] #task Tester la différence entre `break` et `continue` avec des exemples concrets
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Existe-t-il un équivalent du `switch` JavaScript en Python ? (piste : `match` depuis Python 3.10)
