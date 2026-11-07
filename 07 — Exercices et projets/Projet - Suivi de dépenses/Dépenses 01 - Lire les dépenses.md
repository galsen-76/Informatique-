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
# Dépenses 01 - Lire les dépenses

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** rien, c'est le début
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Python]] · [[Variables et types en Python]]

## Le but
Partir du texte `TEXTE`, déjà écrit dans le fichier de départ, pour dire combien il y a de dépenses, et faire un premier calcul avec deux montants.

## Ce que tu fais
- [ ] Crée le dossier `~/projets/depenses` et, dedans, `depenses.py` avec le code de départ de [[Projet - Suivre ses dépenses en Python]]. Lance-le avec `python3 depenses.py` : il ne fait encore rien
- [ ] Fais afficher la première dépense, puis le nombre de dépenses (une ligne = une dépense)
- [ ] Coupe la première ligne en ses 4 morceaux (date, catégorie, montant, description) et affiche la description
- [ ] Additionne le montant de la 1re dépense et celui de la 2e, et affiche le résultat. Regarde-le bien : est-ce 44.40 ? Comprends pourquoi, puis corrige
- [ ] Écris la phrase `Total des deux : 44.40 €` en collant le texte et le nombre avec `+`. Lis l'erreur, puis corrige-la
- [ ] Affiche le type de chacune de tes variables avec `type()`

> [!warning] Le piège de cette étape
> `42.30` s'écrit avec un **point** en Python, jamais avec une virgule : `float("42,30")` plante.

> [!success] Ça marche si…
> Le script affiche `7 dépenses`, la description `Supermarché`, puis `Total des deux : 44.40 €`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi la première addition donnait-elle `42.302.10` ? Qu'as-tu changé ?
2. Pourquoi `"Total : " + total` plante-t-il, alors que `f"Total : {total}"` marche ?
3. Pour avoir la première ligne, quel numéro as-tu utilisé, et pourquoi pas 1 ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Tout ce qui sort d'un texte est du **texte**, même `42.30`. Le `+` entre deux textes les colle, entre deux nombres il les additionne. Il faut donc convertir le montant en nombre décimal avant de calculer. Une chaîne sait se couper en lignes, et sur un séparateur. Les positions commencent à 0.

> [!question]- Solution
> ```python
> lignes = TEXTE.splitlines()
> print("Première dépense :", lignes[0])
> print(len(lignes), "dépenses")
>
> date, categorie, montant, description = lignes[0].split(";")
> print(description)
>
> montant1 = float(lignes[0].split(";")[2])
> montant2 = float(lignes[1].split(";")[2])
> total = montant1 + montant2
> print(f"Total des deux : {total:.2f} €")      # ou "Total des deux : " + str(total)
> print(type(TEXTE), type(lignes), type(montant), type(total))
> ```
> 1. Les montants étaient encore des **textes** (`str`) : `"42.30" + "2.10"` les colle bout à bout. `float(...)` les transforme en nombres, et `+` additionne.
> 2. `"Total : " + total` mélange `str` et `float` : Python refuse de deviner (`TypeError: can only concatenate str (not "float") to str`). La f-string convertit elle-même le nombre en texte. `:.2f` affiche 2 chiffres après la virgule.
> 3. `lignes[0]` : les positions d'une liste commencent à **0**. `lignes[1]` est la **deuxième** ligne.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
