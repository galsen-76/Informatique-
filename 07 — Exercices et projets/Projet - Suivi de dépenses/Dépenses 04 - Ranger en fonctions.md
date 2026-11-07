---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Fonction]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 04 - Ranger en fonctions

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Dépenses 03 - Totaux par catégorie]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Fonction]]

## Le but
Le script marche, mais tout est mélangé. Le **découper en fonctions** qui ont chacune un seul travail, pour pouvoir les relire, les tester et les réutiliser.

## Ce que tu fais
- [ ] Découpe le script en 4 fonctions : `lire_depenses(texte)` (le texte → une liste de dépenses, chacune étant un dictionnaire, avec le montant déjà en nombre), `taille(montant)` (→ `petite`, `moyenne` ou `grosse`), `totaux_par_categorie(depenses)` (→ un dictionnaire), et `afficher(depenses, totaux)`
- [ ] Règle : seule `afficher` a le droit de faire `print`. Les autres **renvoient** leur résultat
- [ ] Ouvre `python3` dans le dossier, colle ta fonction `taille`, et essaie-la avec 5, 30 et 100
- [ ] Fais exprès d'oublier le `return` d'une fonction et observe ce qui casse, et où

> [!success] Ça marche si…
> Le script affiche la même chose qu'aux étapes 02 et 03, et `taille(100)` renvoie `'grosse'` dans `python3`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Quelle différence entre une fonction qui fait `print` et une fonction qui fait `return` ?
2. Qu'a renvoyé ta fonction sans `return`, et pourquoi l'erreur est-elle apparue plus loin ?
3. Pourquoi est-ce mieux que `totaux_par_categorie` ne fasse aucun `print` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Une fonction reçoit des **paramètres** et **renvoie** un résultat, que celui qui l'appelle range dans une variable. Une fonction sans `return` renvoie quand même quelque chose : `None`. Commence par `taille`, la plus petite.

> [!question]- Solution
> ```python
> def lire_depenses(texte):
>     depenses = []
>     for ligne in texte.splitlines():
>         date, categorie, montant, description = ligne.split(";")
>         depenses.append({"date": date, "categorie": categorie,
>                          "montant": float(montant), "description": description})
>     return depenses
>
>
> def taille(montant):
>     if montant > 50:
>         return "grosse"
>     if montant >= 10:
>         return "moyenne"
>     return "petite"
>
>
> def totaux_par_categorie(depenses):
>     totaux = {}
>     for d in depenses:
>         totaux[d["categorie"]] = totaux.get(d["categorie"], 0) + d["montant"]
>     return totaux
>
>
> def afficher(depenses, totaux):
>     for d in depenses:
>         print(f"{d['description']} : {taille(d['montant'])}")
>     for categorie, somme in sorted(totaux.items()):
>         print(f"  {categorie} : {somme:.2f}")
>     print(f"Total : {sum(totaux.values()):.2f} €")
>
>
> depenses = lire_depenses(TEXTE)
> afficher(depenses, totaux_par_categorie(depenses))
> ```
> 1. `print` **montre** une valeur à l'écran, puis elle est perdue. `return` la **rend** à celui qui a appelé la fonction, qui peut la ranger et s'en servir.
> 2. Elle a renvoyé `None`. Python ne se plaint pas tout de suite : l'erreur arrive quand on essaie de **se servir** du résultat (par exemple `'NoneType' object is not iterable`), donc plus loin que la vraie cause.
> 3. On peut l'appeler n'importe où (dans un test, dans un autre script) sans qu'elle écrive à l'écran, et vérifier son résultat. Le calcul et l'affichage sont séparés.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
