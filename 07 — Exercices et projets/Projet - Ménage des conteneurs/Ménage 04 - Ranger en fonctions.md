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
# Ménage 04 - Ranger en fonctions

> [!info] Où tu en es
> **Projet :** [[Projet - Faire le ménage dans ses conteneurs Docker]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Ménage 03 - Préparer le ménage]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Fonction]]

## Le but
Le script marche, mais tout est mélangé dans une seule suite de lignes. Le **découper en fonctions** qui ont chacune un seul travail, pour pouvoir les relire, les tester et les réutiliser.

## Ce que tu fais
- [ ] Découpe le script en 4 fonctions : `lire_conteneurs(texte)` (le texte → une liste de conteneurs, chaque conteneur étant un dictionnaire), `etat(statut)` (un statut → `en cours`, `arrêté` ou `autre`), `analyser(conteneurs)` (→ un dictionnaire avec les compteurs, la liste à supprimer et le compte par image), et `afficher(resultat)`
- [ ] Règle : seule `afficher` a le droit de faire `print`. Les autres **renvoient** leur résultat
- [ ] Ouvre `python3` dans le dossier, colle ta fonction `etat`, et essaie-la sur trois statuts différents
- [ ] Fais exprès d'oublier le `return` d'une fonction et observe ce qui casse, et où

> [!success] Ça marche si…
> Le script affiche exactement la même chose qu'à l'étape 03, et `etat("Exited (0) 1 hour ago")` renvoie `'arrêté'` dans `python3`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Quelle différence entre une fonction qui fait `print` et une fonction qui fait `return` ?
2. Qu'a renvoyé ta fonction sans `return`, et pourquoi l'erreur est-elle apparue plus loin ?
3. Pourquoi est-ce mieux que `analyser` ne fasse aucun `print` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Une fonction reçoit des **paramètres** et **renvoie** un résultat, que celui qui l'appelle range dans une variable. Une fonction sans `return` renvoie quand même quelque chose : `None`. Commence par `etat`, la plus petite.

> [!question]- Solution
> ```python
> import sys
>
>
> def lire_conteneurs(texte):
>     conteneurs = []
>     for ligne in texte.splitlines():
>         identifiant, image, statut, nom = ligne.split(";")
>         conteneurs.append({"id": identifiant, "image": image, "statut": statut, "nom": nom})
>     return conteneurs
>
>
> def etat(statut):
>     if statut.startswith("Up"):
>         return "en cours"
>     if statut.startswith("Exited"):
>         return "arrêté"
>     return "autre"
>
>
> def analyser(conteneurs):
>     resultat = {"en cours": 0, "arrêté": 0, "autre": 0, "a_supprimer": [], "par_image": {}}
>     for c in conteneurs:
>         e = etat(c["statut"])
>         resultat[e] += 1
>         if e != "en cours":
>             resultat["a_supprimer"].append(c["nom"])
>             resultat["par_image"][c["image"]] = resultat["par_image"].get(c["image"], 0) + 1
>     return resultat
>
>
> def afficher(resultat):
>     total = resultat["en cours"] + resultat["arrêté"] + resultat["autre"]
>     print(f"{total} conteneurs : {resultat['en cours']} en cours, "
>           f"{resultat['arrêté']} arrêtés, {resultat['autre']} autres")
>     print("docker rm " + " ".join(resultat["a_supprimer"]))
>     for image, nombre in sorted(resultat["par_image"].items()):
>         print(f"  {image} : {nombre}")
>
>
> afficher(analyser(lire_conteneurs(sys.stdin.read())))
> ```
> 1. `print` **montre** une valeur à l'écran, puis elle est perdue. `return` la **rend** à celui qui a appelé la fonction, qui peut la ranger et s'en servir.
> 2. Elle a renvoyé `None`. Python ne se plaint pas tout de suite : l'erreur arrive quand on essaie de **se servir** du résultat (`TypeError: 'NoneType' object is not subscriptable`), donc plus loin que la vraie cause.
> 3. On peut l'appeler n'importe où (dans un test, dans un autre script) sans qu'elle écrive à l'écran, et vérifier son résultat. Le calcul et l'affichage sont séparés.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
