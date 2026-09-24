---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Structures de Données Python"
tags:
  - backend/python/structures-donnees
parent: "[[Python]]"
children:
  - "[[PY-09-Comprehensions|Comprehensions]]"
related_theory:
  - "[[PY-01-Fondamentaux|Fondamentaux Python]]"
related_snippets:
  - "[[04_Snippets/py-structures-donnees]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/datastructures.html"
---

# Structures de Données Python

> [!abstract] Introduction
> Python propose 4 grandes façons de regrouper plusieurs valeurs ensemble : la liste (modifiable, ordonnée), le tuple (figé, ordonné), le dictionnaire (paires clé-valeur), et le set (valeurs uniques, non ordonnées).

---

## Théorie

> [!question]- C'est quoi ?
> **Liste (`list`)** : une collection ordonnée et modifiable, équivalent d'un tableau JavaScript.
> ```python
> films = ["Inception", "Interstellar"]
> ```
>
> **Tuple (`tuple`)** : comme une liste, mais **non modifiable** une fois créée.
> ```python
> coordonnees = (48.85, 2.35)
> ```
> > [!note] Pourquoi utiliser un tuple plutôt qu'une liste ?
> > Quand on veut garantir que les valeurs ne changeront jamais (ex : des coordonnées GPS fixes), le tuple protège contre les modifications accidentelles.
>
> **Dictionnaire (`dict`)** : des paires clé-valeur, équivalent d'un objet JavaScript.
> ```python
> film = {"titre": "Inception", "annee": 2010}
> ```
>
> **Set** : une collection de valeurs **uniques**, sans ordre garanti — équivalent du `Set` JavaScript.
> ```python
> genres = {"Sci-fi", "Action", "Sci-fi"}  # devient {"Sci-fi", "Action"}, le doublon disparaît
> ```

> [!question]- Pourquoi l'utiliser ?
> Chaque structure répond à un besoin différent :
> - Liste : garder un ordre et pouvoir modifier le contenu (ajouter, retirer, trier)
> - Tuple : garantir que les données ne changeront jamais
> - Dictionnaire : associer une donnée à un nom précis (accès rapide par clé)
> - Set : garantir l'unicité des valeurs, vérifier rapidement une présence

> [!question]- Comment ça marche ?
> **Accéder aux éléments d'une liste (index à partir de 0) :**
> ```python
> films = ["Inception", "Interstellar", "Dunkirk"]
> print(films[0])   # "Inception"
> print(films[-1])  # "Dunkirk" (le dernier, index négatif)
> ```
>
> **Modifier une liste :**
> ```python
> films.append("Tenet")       # ajoute à la fin
> films.remove("Dunkirk")     # retire un élément précis
> ```
>
> **Accéder à un dictionnaire :**
> ```python
> film = {"titre": "Inception", "annee": 2010}
> print(film["titre"])           # "Inception"
> print(film.get("realisateur")) # None si la clé n'existe pas (pas d'erreur)
> ```
> > [!note] `[ ]` vs `.get()`
> > `film["clé"]` provoque une **erreur** si la clé n'existe pas. `film.get("clé")` retourne `None` sans planter — plus sûr quand on n'est pas certain que la clé existe.

> [!question]- Quand l'utiliser ?
> - Liste : la grande majorité des cas où on manipule une collection ordonnée
> - Tuple : données fixes qui ne doivent jamais changer
> - Dictionnaire : représenter un objet avec des propriétés nommées
> - Set : besoin d'unicité ou de vérifier rapidement si une valeur existe déjà

---

## Points clés

- Les index Python commencent à 0, comme en JavaScript
- Les index négatifs comptent depuis la fin (`-1` = dernier élément)
- Un tuple est immuable (`immutable`) : impossible de modifier ses éléments après création
- `.get()` sur un dictionnaire évite les erreurs si la clé est absente
- Un set ne garde jamais de doublons et n'a pas d'ordre garanti

---

## Paramètres / Configuration

| Structure | Syntaxe | Modifiable | Ordonnée |
|-----------|---------|------------|----------|
| Liste | `[1, 2, 3]` | Oui | Oui |
| Tuple | `(1, 2, 3)` | Non | Oui |
| Dictionnaire | `{"clé": "valeur"}` | Oui | Oui (depuis Python 3.7) |
| Set | `{1, 2, 3}` | Oui | Non |

---

## Exemple minimal

```python
films = [
    {"titre": "Inception", "annee": 2010},
    {"titre": "Dunkirk", "annee": 2017}
]

for film in films:
    print(f"{film['titre']} ({film['annee']})")
```

> [!note] Ce que j'en retiens
> On combine ici une liste de dictionnaires — une structure très courante en Python, équivalente à un tableau d'objets en JavaScript, pour représenter plusieurs entités structurées.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → [[PY-09-Comprehensions|Comprehensions]]
- À comparer avec → [[JS-05-Objets-Tableaux-Methodes|JavaScript - Array et Object]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-structures-donnees]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand utiliser un tuple plutôt qu'une liste ?

---

## Tâches

- [ ] #task Manipuler une liste de dictionnaires représentant des films (ajout, suppression, recherche)
- [ ] #task Tester la différence entre `dict["clé"]` et `dict.get("clé")` sur une clé absente
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Depuis quelle version de Python les dictionnaires garantissent-ils l'ordre d'insertion ?
