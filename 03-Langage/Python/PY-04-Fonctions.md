---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Fonctions Python"
tags:
  - backend/python/fonctions
parent: "[[Python]]"
children:
  - "[[PY-12-Fonctionnel-Lambda|Lambda et programmation fonctionnelle]]"
related_theory:
  - "[[PY-03-Structures-de-controle|Structures de controle]]"
related_snippets:
  - "[[04_Snippets/py-fonctions]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
---

# Fonctions Python

> [!abstract] Introduction
> Une fonction est un bloc de code réutilisable, qui reçoit des valeurs en entrée (paramètres) et peut renvoyer un résultat, pour éviter de répéter le même code plusieurs fois.

---

## Théorie

> [!question]- C'est quoi ?
> ```python
> def saluer(prenom):
>     return f"Bonjour {prenom}"
> ```
> > [!note] `def` ?
> > Mot-clé Python pour "define" (définir) — c'est ainsi qu'on déclare une fonction, équivalent du `function` JavaScript.

> [!question]- Pourquoi l'utiliser ?
> Sans fonctions, il faudrait copier-coller le même code partout où on en a besoin — source d'erreurs et de code difficile à maintenir (une correction doit être répétée à chaque copie). Une fonction centralise la logique en un seul endroit.

> [!question]- Comment ça marche ?
> **Paramètres avec valeur par défaut :**
> ```python
> def saluer(prenom="quelqu'un"):
>     return f"Bonjour {prenom}"
>
> saluer()          # "Bonjour quelqu'un"
> saluer("Oumar")   # "Bonjour Oumar"
> ```
>
> **Paramètres nommés (keyword arguments) :**
> ```python
> def creer_film(titre, annee, genre="Inconnu"):
>     return {"titre": titre, "annee": annee, "genre": genre}
>
> creer_film(titre="Inception", annee=2010, genre="Sci-fi")
> # on peut aussi les passer dans le désordre grâce aux noms :
> creer_film(annee=2010, titre="Inception")
> ```
> > [!note] Pourquoi c'est utile
> > Nommer les arguments rend l'appel de fonction plus lisible, surtout quand il y a beaucoup de paramètres — on sait immédiatement à quoi correspond chaque valeur, sans se fier uniquement à l'ordre.
>
> **Nombre variable d'arguments (`*args`, `**kwargs`) :**
> ```python
> def additionner(*nombres):
>     return sum(nombres)
>
> additionner(1, 2, 3, 4)  # 10, fonctionne avec n'importe quel nombre d'arguments
> ```
> > [!note] C'est quoi `*args` ?
> > `*args` permet à une fonction d'accepter un nombre **variable** d'arguments, regroupés automatiquement dans un tuple. `**kwargs` fait la même chose mais pour des arguments nommés, regroupés dans un dictionnaire.
>
> **Fonction sans `return` explicite :**
> Si une fonction n'a pas de `return`, elle retourne automatiquement `None` (équivalent de `undefined`).

> [!question]- Quand l'utiliser ?
> Dès qu'un bloc de logique est utilisé plus d'une fois, ou dès qu'il mérite un nom clair pour rendre le code plus lisible — même utilisé une seule fois.

---

## Points clés

- `def nom(paramètres):` déclare une fonction
- Les valeurs par défaut évitent d'avoir à toujours fournir tous les arguments
- Les arguments nommés (`titre=..., annee=...`) rendent les appels plus lisibles
- `*args` = nombre variable d'arguments positionnels, `**kwargs` = nombre variable d'arguments nommés
- Sans `return`, une fonction retourne `None` par défaut

---

## Paramètres / Configuration

| Syntaxe | Description | Exemple |
|-----------|-------------|---------|
| `def nom(param):` | Déclare une fonction | — |
| `param=valeur` | Paramètre avec valeur par défaut | `def f(x=10):` |
| `*args` | Nombre variable d'arguments positionnels | Regroupés en tuple |
| `**kwargs` | Nombre variable d'arguments nommés | Regroupés en dictionnaire |
| `return` | Renvoie une valeur et arrête la fonction | Optionnel |

---

## Exemple minimal

```python
def creer_film(titre, annee, genre="Inconnu"):
    return {"titre": titre, "annee": annee, "genre": genre}

film1 = creer_film("Inception", 2010, "Sci-fi")
film2 = creer_film("Dunkirk", 2017)  # genre = "Inconnu" par défaut

print(film1)
print(film2)
```

> [!note] Ce que j'en retiens
> `film2` n'a pas fourni de `genre` : Python utilise automatiquement la valeur par défaut `"Inconnu"` définie dans la fonction, sans qu'on ait besoin de le préciser à chaque appel.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → [[PY-12-Fonctionnel-Lambda|Lambda et programmation fonctionnelle]]
- À comparer avec → [[TS-04-Fonctions|TypeScript - Fonctions]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-fonctions]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi ne jamais utiliser une liste comme valeur par défaut d'un paramètre ?

---

## Tâches

- [ ] #task Écrire une fonction avec `*args` pour additionner un nombre variable de notes de films
- [ ] #task Créer une fonction avec plusieurs valeurs par défaut et tester tous les cas d'appel
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Peut-on combiner `*args` ET `**kwargs` dans une même fonction, et dans quel ordre les écrire ?
