---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Compréhensions Python"
tags:
  - backend/python/comprehensions
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-02-Structures-de-donnees|Structures de donnees]]"
  - "[[PY-03-Structures-de-controle|Structures de controle]]"
related_snippets:
  - "[[04_Snippets/py-comprehensions]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
---

# Compréhensions Python

> [!abstract] Introduction
> Une "compréhension" est une syntaxe compacte pour créer une nouvelle liste, dictionnaire ou set en une seule ligne, à partir d'une collection existante, souvent avec une condition ou une transformation.

---

## Théorie

> [!question]- C'est quoi ?
> ```python
> # Sans compréhension (façon classique)
> carres = []
> for x in range(5):
>     carres.append(x * x)
>
> # Avec compréhension (équivalent, en une ligne)
> carres = [x * x for x in range(5)]
> ```
>
> > [!note] Ce que fait cette ligne
> > `[x * x for x in range(5)]` se lit : "pour chaque `x` allant de 0 à 4, calcule `x * x`, et mets le résultat dans une nouvelle liste". C'est exactement l'équivalent de la boucle classique au-dessus, mais condensé.

> [!question]- Pourquoi l'utiliser ?
> Les compréhensions rendent le code plus court et souvent plus lisible pour des transformations simples de collections, une fois qu'on est habitué à la syntaxe — c'est un style très répandu en Python, à connaître pour lire du code écrit par d'autres.

> [!question]- Comment ça marche ?
> **Avec condition (filtrer) :**
> ```python
> films = [{"titre": "Inception", "annee": 2010}, {"titre": "Dunkirk", "annee": 2017}]
>
> recents = [f["titre"] for f in films if f["annee"] > 2015]
> # ["Dunkirk"]
> ```
> > [!note] Structure générale
> > `[expression for élément in collection if condition]` — la partie `if condition` est optionnelle.
>
> **Compréhension de dictionnaire :**
> ```python
> titres_par_annee = {f["annee"]: f["titre"] for f in films}
> # {2010: "Inception", 2017: "Dunkirk"}
> ```
>
> **Compréhension de set :**
> ```python
> genres = {"Sci-fi", "Action", "Sci-fi"}
> genres_majuscules = {g.upper() for g in genres}
> # {"SCI-FI", "ACTION"}
> ```

> [!question]- Quand l'utiliser ?
> - Pour des transformations SIMPLES (une ligne de logique) : filtrer, transformer, extraire une propriété
> - Éviter les compréhensions imbriquées ou trop complexes (plusieurs `for`/`if` empilés) — au-delà d'un certain niveau, une boucle classique reste plus lisible

---

## Points clés

- `[expr for x in collection]` = compréhension de liste
- `{expr for x in collection}` = compréhension de set
- `{clé: valeur for x in collection}` = compréhension de dictionnaire
- Ajouter `if condition` à la fin pour filtrer les éléments
- Ne pas abuser des compréhensions complexes — la lisibilité prime sur la concision à tout prix

---

## Paramètres / Configuration

| Syntaxe | Type produit | Exemple |
|-----------|-------------|---------|
| `[x for x in coll]` | Liste | `[x*2 for x in [1,2,3]]` → `[2,4,6]` |
| `{x for x in coll}` | Set | `{x%2 for x in [1,2,3,4]}` → `{0,1}` |
| `{k: v for x in coll}` | Dictionnaire | Voir exemple ci-dessus |
| `[x for x in coll if cond]` | Liste filtrée | `[x for x in [1,2,3] if x > 1]` → `[2,3]` |

---

## Exemple minimal

```python
films = [
    {"titre": "Inception", "annee": 2010, "note": 8.8},
    {"titre": "Dunkirk", "annee": 2017, "note": 7.9},
    {"titre": "Tenet", "annee": 2020, "note": 7.3}
]

bien_notes = [f["titre"] for f in films if f["note"] > 7.5]
print(bien_notes)  # ["Inception", "Dunkirk", "Tenet"]
```

> [!note] Ce que j'en retiens
> Cette seule ligne remplace une boucle `for` de 4 lignes avec un `if` et un `.append()` — même résultat, écrit de façon plus compacte une fois la syntaxe comprise.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[JS-05-Objets-Tableaux-Methodes|JavaScript - .map() et .filter()]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-comprehensions]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand une compréhension devient-elle moins lisible qu'une boucle ?

---

## Tâches

- [ ] #task Réécrire 3 boucles `for` classiques en compréhensions équivalentes
- [ ] #task Créer une compréhension de dictionnaire à partir d'une liste de films
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? À partir de quel niveau de complexité une compréhension devient-elle "trop dense" et illisible ?
