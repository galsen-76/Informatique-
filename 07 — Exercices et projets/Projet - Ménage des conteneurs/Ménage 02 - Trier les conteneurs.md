---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Condition (if)]]"
  - "[[Boucle (for, while)]]"
tags:
  - exercice
  - mini-projet
---
# Ménage 02 - Trier les conteneurs

> [!info] Où tu en es
> **Projet :** [[Projet - Faire le ménage dans ses conteneurs Docker]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Ménage 01 - Lire la liste des conteneurs]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Condition (if)]] · [[Boucle (for, while)]]

## Le but
Pour chaque conteneur, savoir s'il **tourne**, s'il est **arrêté**, ou autre chose, et compter chaque cas.

## Ce que tu fais
- [ ] Parcours les lignes une par une, et coupe chaque ligne en ses 4 morceaux : identifiant, image, statut, nom
- [ ] Pour chaque conteneur, affiche son nom et son état : `en cours`, `arrêté` ou `autre`. Regarde bien à quoi ressemble un statut dans `exemple.txt` avant d'écrire ta condition
- [ ] Compte les conteneurs de chaque état, et affiche le résumé à la fin : `7 conteneurs : 2 en cours, 4 arrêtés, 1 autres`
- [ ] Vérifie sur `exemple.txt` **et** sur ta vraie liste

> [!warning] Le piège de cette étape
> Si tu mets les compteurs à 0 **dans** la boucle, ils repartent de zéro à chaque conteneur, et le résumé est faux.

> [!success] Ça marche si…
> `exemple.txt` donne exactement 2 en cours, 4 arrêtés et 1 autre (`quirky_lamport`, qui est `Created`).

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi `statut == "Up"` ne marche pas ? Qu'as-tu utilisé à la place ?
2. Que devient `quirky_lamport` si tu n'écris qu'un `if` et un `else` ? Pourquoi un `elif` ?
3. Pourquoi une boucle `for` ici, et pas `while` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Une chaîne se coupe sur un séparateur. Un statut ne vaut jamais exactement `Up` : il **commence** par `Up`, suivi de la durée. Trois cas possibles, donc trois branches. Les compteurs se créent **avant** la boucle et augmentent dedans.

> [!question]- Solution
> ```python
> import sys
>
> lignes = sys.stdin.read().splitlines()
> en_cours = 0
> arretes = 0
> autres = 0
>
> for ligne in lignes:
>     identifiant, image, statut, nom = ligne.split(";")
>     if statut.startswith("Up"):
>         etat = "en cours"
>         en_cours += 1
>     elif statut.startswith("Exited"):
>         etat = "arrêté"
>         arretes += 1
>     else:
>         etat = "autre"
>         autres += 1
>     print(f"{nom} : {etat}")
>
> print(f"{len(lignes)} conteneurs : {en_cours} en cours, {arretes} arrêtés, {autres} autres")
> ```
> 1. Le statut vaut `Up 25 minutes`, pas `Up` : l'égalité est fausse. `statut.startswith("Up")` teste seulement le début.
> 2. Avec `if`/`else`, tout ce qui n'est pas `Up` serait « arrêté », `Created` compris : faux. `elif` ajoute un cas, et `else` ramasse le reste.
> 3. On parcourt une liste dont on connaît tous les éléments : `for`. `while` sert quand on répète **jusqu'à** une condition, sans savoir combien de fois.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
