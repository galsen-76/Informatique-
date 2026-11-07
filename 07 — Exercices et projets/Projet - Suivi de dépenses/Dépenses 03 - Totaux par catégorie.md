---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Liste et dictionnaire]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 03 - Totaux par catégorie

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Dépenses 02 - Classer les dépenses]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Liste et dictionnaire]]

## Le but
Savoir **combien part dans chaque catégorie** (courses, transport…), et garder la liste des grosses dépenses pour les regarder de près.

## Ce que tu fais
- [ ] Garde dans une **liste** la description de chaque grosse dépense, et affiche-la sur une ligne : `Grosses dépenses : Loyer, Pass Navigo, Concert`
- [ ] Calcule, dans un **dictionnaire**, le total de chaque catégorie, et affiche-le trié par nom de catégorie
- [ ] Pour le dictionnaire, essaie d'abord le plus simple, `totaux[categorie] += montant`. Lis l'erreur, comprends-la, puis corrige
- [ ] Trouve la catégorie qui coûte le plus cher, et affiche-la

> [!success] Ça marche si…
> `courses : 51.05`, `logement : 650.00`, `loisirs : 66.90`, `transport : 77.30`, et la catégorie la plus chère est `logement`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi une liste pour les grosses dépenses, et un dictionnaire pour les catégories ?
2. D'où venait l'erreur sur `totaux[categorie] += montant`, et comment l'as-tu corrigée ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Une liste garde des éléments **dans l'ordre**. Un dictionnaire associe une **clé** à une valeur. On ne peut pas augmenter une valeur qui n'existe pas encore : il faut soit vérifier que la clé existe, soit lire avec une valeur par défaut. Pour coller une liste de textes : `", ".join(...)`.

> [!question]- Solution
> ```python
> grosses = []
> totaux = {}
>
> for ligne in TEXTE.splitlines():
>     date, categorie, montant, description = ligne.split(";")
>     montant = float(montant)
>     if montant > 50:
>         grosses.append(description)
>     totaux[categorie] = totaux.get(categorie, 0) + montant
>
> print("Grosses dépenses : " + ", ".join(grosses))
> for categorie, somme in sorted(totaux.items()):
>     print(f"  {categorie} : {somme:.2f}")
>
> plus_chere = None
> for categorie, somme in totaux.items():
>     if plus_chere is None or somme > totaux[plus_chere]:
>         plus_chere = categorie
> print("La plus chère :", plus_chere)      # ou max(totaux, key=totaux.get)
> ```
> 1. Les grosses dépenses : une suite à garder dans l'ordre, sans clé, donc une **liste**. Les catégories : il faut retrouver un total **par catégorie**, donc une clé (la catégorie) et une valeur (la somme) : un **dictionnaire**.
> 2. `KeyError: 'courses'` : la première fois, la clé n'existe pas, et `+=` doit d'abord la lire. Correction : `totaux.get(categorie, 0) + montant`, ou `if categorie not in totaux: totaux[categorie] = 0` avant.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
