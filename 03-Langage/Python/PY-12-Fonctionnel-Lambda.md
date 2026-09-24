---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Lambda & Programmation Fonctionnelle Python"
tags:
  - backend/python/fonctionnel
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
  - "[[PY-09-Comprehensions|Comprehensions Python]]"
related_snippets:
  - "[[04_Snippets/py-fonctionnel]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/howto/functional.html"
---

# Lambda & Programmation Fonctionnelle Python

> [!abstract] Introduction
> Une fonction "lambda" est une petite fonction anonyme écrite en une seule ligne, souvent utilisée avec des outils comme `map`, `filter` ou `sorted` pour transformer ou trier des données rapidement.

---

## Théorie

> [!question]- C'est quoi ?
> ```python
> carre = lambda x: x * x
> print(carre(5))  # 25
> ```
>
> > [!note] C'est quoi une fonction "anonyme" ?
> > Anonyme = sans nom propre. `lambda x: x * x` fait la même chose qu'une fonction normale (`def carre(x): return x * x`), mais s'écrit en une seule ligne, souvent utilisée directement là où elle sert, sans lui donner de nom.

> [!question]- Pourquoi l'utiliser ?
> Pour des transformations très courtes et ponctuelles (souvent utilisées une seule fois, en argument d'une autre fonction), écrire une fonction complète avec `def` alourdirait le code inutilement. `lambda` permet d'écrire ça de façon compacte, directement à l'endroit où c'est utilisé.

> [!question]- Comment ça marche ?
> **`map()` — transformer chaque élément d'une collection :**
> ```python
> notes = [8.5, 7.2, 9.1]
> notes_arrondies = list(map(lambda x: round(x), notes))
> # [9, 7, 9]
> ```
> > [!note] Équivalent plus lisible
> > `[round(x) for x in notes]` (compréhension) fait exactement la même chose et est souvent préféré en Python pour sa lisibilité — `map`/`lambda` reste utile à connaître, notamment avec des fonctions déjà existantes.
>
> **`filter()` — garder seulement certains éléments :**
> ```python
> notes = [8.5, 4.2, 9.1, 3.0]
> bonnes_notes = list(filter(lambda x: x >= 7, notes))
> # [8.5, 9.1]
> ```
>
> **`sorted()` avec une clé personnalisée :**
> ```python
> films = [{"titre": "Inception", "annee": 2010}, {"titre": "Dunkirk", "annee": 2017}]
> films_tries = sorted(films, key=lambda f: f["annee"])
> ```
> > [!note] C'est quoi `key=` ?
> > `key` indique à `sorted()` SUR QUELLE VALEUR trier chaque élément — ici, on trie les films selon leur `annee`, pas leur ordre d'origine dans la liste.
>
> **`reduce()` — combiner tous les éléments en une seule valeur :**
> ```python
> from functools import reduce
>
> notes = [8, 7, 9]
> total = reduce(lambda acc, x: acc + x, notes)
> # 24
> ```
> > [!note] C'est quoi `reduce` ?
> > `reduce` applique une fonction de façon cumulative sur une collection, pour arriver à UNE SEULE valeur finale (ici, une somme). Moins utilisé que `map`/`filter` en Python, souvent remplacé par `sum()` pour les cas simples.

> [!question]- Quand l'utiliser ?
> - `lambda` : fonction très courte, utilisée une seule fois, souvent en argument (`sorted`, `key=`, `filter`)
> - Compréhensions : souvent préférées à `map`/`filter` en Python pour la lisibilité
> - `sorted(..., key=lambda...)` : cas d'usage le plus courant et le plus utile de `lambda` au quotidien

---

## Points clés

- `lambda arguments: expression` = fonction anonyme en une ligne, pas de `return` explicite (implicite)
- `map(fonction, collection)` applique la fonction à chaque élément
- `filter(fonction, collection)` garde uniquement les éléments où la fonction retourne `True`
- `sorted(collection, key=fonction)` trie selon une clé personnalisée
- En Python, les compréhensions sont souvent préférées à `map`/`filter` pour la lisibilité — mais `lambda` reste très utilisé avec `sorted`/`key`

---

## Paramètres / Configuration

| Outil | Description | Notes |
|-----------|-------------|-------|
| `lambda x: expr` | Fonction anonyme | Pas de `def`, pas de nom |
| `map(fn, coll)` | Transforme chaque élément | Retourne un itérateur, `list()` pour voir le résultat |
| `filter(fn, coll)` | Garde les éléments où `fn` retourne `True` | Idem, retourne un itérateur |
| `sorted(coll, key=fn)` | Trie selon une clé personnalisée | `reverse=True` pour l'ordre inverse |

---

## Exemple minimal

```python
films = [
    {"titre": "Inception", "annee": 2010, "note": 8.8},
    {"titre": "Dunkirk", "annee": 2017, "note": 7.9},
    {"titre": "Tenet", "annee": 2020, "note": 7.3}
]

# Trier par note, du meilleur au moins bon
films_tries = sorted(films, key=lambda f: f["note"], reverse=True)
for f in films_tries:
    print(f["titre"])
# Inception
# Dunkirk
# Tenet
```

> [!note] Ce que j'en retiens
> `lambda f: f["note"]` dit à `sorted()` "utilise la note de chaque film pour comparer et trier", sans avoir besoin de créer une fonction nommée séparée juste pour cet usage ponctuel.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[JS-05-Objets-Tableaux-Methodes|TypeScript - Arrow functions et map/filter]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-fonctionnel]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre `map` et une compréhension ?

---

## Tâches

- [ ] #task Trier une liste de films selon plusieurs critères différents avec `sorted` et `lambda`
- [ ] #task Réécrire un `map`/`filter` en compréhension équivalente, et comparer la lisibilité
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans quels cas réels `reduce` est-il vraiment plus pertinent qu'une boucle classique ou qu'une fonction native (`sum`, `max`) ?
