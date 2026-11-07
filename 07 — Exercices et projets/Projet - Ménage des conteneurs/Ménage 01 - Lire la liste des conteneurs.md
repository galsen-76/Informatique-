---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Python]]"
  - "[[Variables et types en Python]]"
tags:
  - exercice
  - mini-projet
---
# Ménage 01 - Lire la liste des conteneurs

> [!info] Où tu en es
> **Projet :** [[Projet - Faire le ménage dans ses conteneurs Docker]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** rien, c'est le début
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Python]] · [[Variables et types en Python]]

## Le but
Un premier script qui part du texte `TEXTE` (déjà écrit dans le fichier de départ) et dit combien il y a de conteneurs, et lequel est le premier.

## Ce que tu fais
- [ ] Crée le dossier `~/projets/conteneurs` et, dedans, `conteneurs.py` avec le code de départ de [[Projet - Faire le ménage dans ses conteneurs Docker]]. Lance-le avec `python3 conteneurs.py` : il ne fait encore rien
- [ ] En dessous du texte, fais afficher la première ligne
- [ ] Fais afficher le nombre de conteneurs (une ligne = un conteneur)
- [ ] Écris la phrase `Total : 7 conteneurs` en collant le texte et le nombre avec `+`. Lis l'erreur, comprends-la, puis corrige-la
- [ ] Affiche le type de chacune de tes variables avec `type()`

> [!warning] Le piège de cette étape
> Si `TEXTE` commence par un saut de ligne (les trois guillemets suivis d'un retour à la ligne), la première ligne est vide. Le code de départ commence le texte juste après les guillemets pour l'éviter.

> [!success] Ça marche si…
> Le script affiche la ligne de `gallant_hopper`, puis `Total : 7 conteneurs`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Quel est le type de `TEXTE`, et celui du nombre de conteneurs ? Pourquoi le `+` plantait-il ?
2. Pour avoir la première ligne, quel numéro as-tu utilisé, et pourquoi pas 1 ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le texte est une seule grande chaîne. Une chaîne sait se couper en lignes, et ça donne une liste. Une liste sait dire combien elle a d'éléments. Pour coller un nombre à du texte, il faut d'abord le transformer en texte, ou utiliser une f-string.

> [!question]- Solution
> ```python
> lignes = TEXTE.splitlines()
> nombre = len(lignes)
>
> print("Première ligne :", lignes[0])
> print(f"Total : {nombre} conteneurs")        # ou "Total : " + str(nombre) + " conteneurs"
> print(type(TEXTE), type(lignes), type(nombre))
> ```
> 1. `TEXTE` est un `str`, `lignes` une `list` et `nombre` un `int`. `"Total : " + nombre` mélange `str` et `int` : Python refuse de deviner (`TypeError: can only concatenate str (not "int") to str`).
> 2. `lignes[0]` : les positions d'une liste commencent à **0**. `lignes[1]` est la **deuxième** ligne.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
