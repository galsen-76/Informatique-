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
Un premier script qui **reçoit** la liste de tes conteneurs Docker et dit combien il y en a. Il ne lit pas de fichier lui-même : c'est le terminal qui lui envoie le texte, avec `<` ou avec un `|`, exactement comme pour n'importe quelle commande Linux.

## Ce que tu fais
- [ ] Crée le dossier `~/projets/conteneurs` et, dedans, `exemple.txt` avec le contenu donné dans [[Projet - Faire le ménage dans ses conteneurs Docker]]
- [ ] Fabrique aussi ta vraie liste : `docker ps -a --format "{{.ID}};{{.Image}};{{.Status}};{{.Names}}" > mes-conteneurs.txt`, et compare-la avec `docker ps -a`
- [ ] Écris `conteneurs.py` : il récupère **tout le texte** reçu sur l'entrée standard (`sys.stdin.read()`, avec `import sys` tout en haut : tu comprendras cette ligne à l'étape 05) et affiche la première ligne
- [ ] Fais-lui afficher le nombre de conteneurs (une ligne = un conteneur)
- [ ] Écris la phrase `Total : 7 conteneurs` en collant le texte et le nombre avec `+`. Lis l'erreur, comprends-la, puis corrige-la
- [ ] Lance le script des deux façons : en lui donnant `exemple.txt` avec `<`, puis en branchant directement la commande `docker ps -a --format …` dessus avec `|`

> [!warning] Le piège de cette étape
> Si tu lances `python3 conteneurs.py` **sans** `<` ni `|`, le script a l'air bloqué : il attend que tu tapes le texte au clavier. Ctrl+D termine la saisie, Ctrl+C arrête tout.

> [!success] Ça marche si…
> `exemple.txt` donne `Total : 7 conteneurs`, et le lancement avec `|` donne le même nombre que `docker ps -a` (sans compter sa ligne de titre).

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Quel est le type du texte reçu, et celui du nombre de conteneurs ? Pourquoi le `+` plantait-il ?
2. Avec `<` et avec `|`, d'où vient le texte que lit ton script ? Le script voit-il la différence ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le texte reçu est une seule grande chaîne. Une chaîne sait se couper en lignes, et une liste sait dire combien elle a d'éléments. Pour coller un nombre à du texte, il faut d'abord le transformer en texte, ou utiliser une f-string.

> [!question]- Solution
> ```python
> import sys
>
> texte = sys.stdin.read()
> lignes = texte.splitlines()
> nombre = len(lignes)
>
> print("Première ligne :", lignes[0])
> print(f"Total : {nombre} conteneurs")        # ou "Total : " + str(nombre) + " conteneurs"
> ```
> ```bash
> python3 conteneurs.py < exemple.txt
> docker ps -a --format "{{.ID}};{{.Image}};{{.Status}};{{.Names}}" | python3 conteneurs.py
> ```
> 1. `texte` est un `str`, `lignes` une `list` et `nombre` un `int`. `"Total : " + nombre` mélange `str` et `int` : Python refuse de deviner (`TypeError: can only concatenate str (not "int") to str`).
> 2. Avec `<`, le shell ouvre le fichier et le branche sur l'entrée standard du script ; avec `|`, c'est la sortie de `docker ps` qui y est branchée. Le script lit son entrée standard dans les deux cas : il ne voit **aucune** différence. C'est tout l'intérêt.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
