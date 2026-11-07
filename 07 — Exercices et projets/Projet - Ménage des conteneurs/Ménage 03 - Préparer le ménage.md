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
# Ménage 03 - Préparer le ménage

> [!info] Où tu en es
> **Projet :** [[Projet - Faire le ménage dans ses conteneurs Docker]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Ménage 02 - Trier les conteneurs]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Liste et dictionnaire]]

## Le but
Que le script **prépare la commande** qui supprime tous les conteneurs qui ne tournent pas, et dise de quelles images ils viennent, pour savoir quelles vieilles versions traînent.

## Ce que tu fais
- [ ] Garde dans une **liste** le nom de chaque conteneur qui n'est pas en cours
- [ ] Affiche la commande toute prête : `docker rm gallant_hopper vibrant_curie …`, sur une seule ligne
- [ ] Compte, dans un **dictionnaire**, combien de ces conteneurs viennent de chaque image, et affiche-le trié par nom d'image
- [ ] Pour le dictionnaire, essaie d'abord le plus simple, `par_image[image] += 1`. Lis l'erreur, comprends-la, puis corrige
- [ ] Facultatif, mais concret : lance le script sur ta vraie liste et exécute la commande proposée. Vérifie ensuite avec `docker ps -a`

> [!success] Ça marche si…
> Sur `exemple.txt` : la commande liste les 5 conteneurs `gallant_hopper vibrant_curie eager_turing quirky_lamport test_python`, et `script-py:1.3` en compte 2.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi une liste pour les noms, et un dictionnaire pour les images ?
2. D'où venait l'erreur sur `par_image[image] += 1`, et comment l'as-tu corrigée ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Une liste garde des éléments **dans l'ordre**. Un dictionnaire associe une **clé** à une valeur. On ne peut pas augmenter une valeur qui n'existe pas encore : il faut soit vérifier que la clé existe, soit lire avec une valeur par défaut. Pour coller une liste de textes avec des espaces : `" ".join(...)`.

> [!question]- Solution
> ```python
> a_supprimer = []
> par_image = {}
>
> for ligne in lignes:
>     identifiant, image, statut, nom = ligne.split(";")
>     if not statut.startswith("Up"):
>         a_supprimer.append(nom)
>         par_image[image] = par_image.get(image, 0) + 1
>
> print("docker rm " + " ".join(a_supprimer))
> for image, nombre in sorted(par_image.items()):
>     print(f"  {image} : {nombre}")
> ```
> 1. Les noms : une suite à garder dans l'ordre, sans clé, donc une **liste**. Les images : il faut retrouver un compteur **par image**, donc une clé (l'image) et une valeur (le nombre) : un **dictionnaire**.
> 2. `KeyError: 'script-py:1.4'` : la première fois, la clé n'existe pas, et `+= 1` doit d'abord la lire. Correction : `par_image.get(image, 0) + 1`, ou `if image not in par_image: par_image[image] = 0` avant.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
