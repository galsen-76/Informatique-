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
# Dépenses 02 - Classer les dépenses

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Dépenses 01 - Lire les dépenses]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Condition (if)]] · [[Boucle (for, while)]]

## Le but
Passer sur **toutes** les dépenses, dire pour chacune si elle est petite, moyenne ou grosse, et calculer le total.

## Ce que tu fais
- [ ] Parcours les lignes une par une, coupe chaque ligne, et convertis le montant
- [ ] Pour chaque dépense, affiche sa description et sa taille : `petite` sous 10 €, `grosse` au-dessus de 50 €, `moyenne` entre les deux
- [ ] Compte les dépenses de chaque taille, calcule le total de tout, et affiche le résumé à la fin
- [ ] Inverse l'ordre de tes conditions (teste « plus de 10 » avant « plus de 50 ») et regarde ce que devient le Loyer. Remets le bon ordre
- [ ] Ajoute une dépense de ton choix dans `TEXTE` et vérifie qu'elle est bien classée

> [!warning] Le piège de cette étape
> Si tu mets les compteurs ou le total à 0 **dans** la boucle, ils repartent de zéro à chaque dépense, et le résumé est faux.

> [!success] Ça marche si…
> Avec `TEXTE` tel qu'il est fourni : 2 petites, 2 moyennes, 3 grosses, et un total de `845.25 €`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Que devenait le Loyer quand tu testais « plus de 10 » en premier ? Pourquoi ?
2. Pourquoi trois branches (`if`, `elif`, `else`) et pas seulement `if` et `else` ?
3. Pourquoi une boucle `for` ici, et pas `while` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Dans une suite `if` / `elif` / `else`, Python s'arrête à la **première** condition vraie et ignore les suivantes. Les compteurs et le total se créent **avant** la boucle et augmentent dedans.

> [!question]- Solution
> ```python
> lignes = TEXTE.splitlines()
> petites = 0
> moyennes = 0
> grosses = 0
> total = 0.0
>
> for ligne in lignes:
>     date, categorie, montant, description = ligne.split(";")
>     montant = float(montant)
>     total += montant
>     if montant > 50:
>         taille = "grosse"
>         grosses += 1
>     elif montant >= 10:
>         taille = "moyenne"
>         moyennes += 1
>     else:
>         taille = "petite"
>         petites += 1
>     print(f"{description} : {taille}")
>
> print(f"{len(lignes)} dépenses : {petites} petites, {moyennes} moyennes, {grosses} grosses")
> print(f"Total : {total:.2f} €")
> ```
> 1. 650 est plus grand que 10 : la première condition est vraie, Python s'arrête là, et le Loyer est classé « moyenne ». Il faut tester le cas le plus **strict** en premier.
> 2. Il y a trois cas. Avec `if`/`else`, tout ce qui n'est pas gros serait classé dans une seule case. `elif` ajoute un cas, et `else` ramasse le reste.
> 3. On parcourt une liste dont on connaît tous les éléments : `for`. `while` sert quand on répète **jusqu'à** une condition, sans savoir combien de fois.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
