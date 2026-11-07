---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Exception]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 06 - Un script qui ne plante pas

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Dépenses 05 - Un module réutilisable]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Exception]]

## Le but
Des données ne sont jamais parfaitement propres : un montant écrit en lettres, une ligne incomplète, une ligne vide, ou rien du tout. Le script doit **le dire clairement** au lieu de planter, et indiquer qu'il a échoué avec son **code de sortie**.

## Ce que tu fais
- [ ] Ajoute `TEXTE_ABIME` (donné dans la note du projet) dans `donnees.py`, et lance le programme dessus. Lis le **traceback** en entier : quelle erreur, à quelle ligne, dans quelle fonction ?
- [ ] Fais en sorte qu'une ligne mal formée soit **ignorée** et signalée sur la sortie d'erreur, sans arrêter le traitement des autres. Il y a **deux** sortes de lignes cassées : vérifie que tu gères les deux. Les lignes vides sont ignorées sans rien dire
- [ ] Essaie avec un texte vide (`""`) : si aucune dépense n'a été lue, le script affiche un message clair sur la sortie d'erreur et se termine avec le code **1**. Sinon, code 0. Il te faut `sys`, un module livré avec Python
- [ ] Vérifie le code de sortie avec `echo $?` dans les trois cas : `TEXTE`, `TEXTE_ABIME` et le texte vide
- [ ] Fais exprès une faute de frappe dans le `try` (par exemple `ligne.splt`), et remplace ton `except ...` précis par un `except:` tout seul. Que voit-on ? Remets la version précise

> [!success] Ça marche si…
> Avec `TEXTE_ABIME` : 2 dépenses comptées (Supermarché et Loyer) et 2 lignes signalées. Avec un texte vide : un message, et `echo $?` affiche `1`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Dans un traceback, quelle ligne lis-tu en premier, et pourquoi ?
2. Quelles étaient les deux erreurs des lignes cassées ? Pourquoi `except ValueError` plutôt que `except:` tout seul ?
3. Pourquoi le message d'erreur va sur la sortie d'erreur, et à quoi sert le code 1 ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le traceback se lit **de bas en haut** : la dernière ligne dit l'erreur, celles au-dessus le chemin pour y arriver. Le `try` entoure **seulement** ce qui peut casser. `print(..., file=sys.stderr)` écrit sur la sortie d'erreur. Pour le code de sortie : `main()` renvoie 0 ou 1, et `sys.exit(main())`.

> [!question]- Solution
> Dans `budget.py` :
> ```python
> def lire_depenses(texte):
>     depenses = []
>     ignorees = []
>     for ligne in texte.splitlines():
>         if not ligne.strip():
>             continue
>         try:
>             date, categorie, montant, description = ligne.split(";")
>             montant = float(montant)
>         except ValueError:
>             ignorees.append(ligne)
>             continue
>         depenses.append({"date": date, "categorie": categorie,
>                          "montant": montant, "description": description})
>     return depenses, ignorees
> ```
> Dans `depenses.py` :
> ```python
> import sys
>
> from budget import lire_depenses, taille, totaux_par_categorie
> from donnees import TEXTE_ABIME
>
>
> def main():
>     depenses, ignorees = lire_depenses(TEXTE_ABIME)
>     for ligne in ignorees:
>         print(f"Ligne ignorée : {ligne!r}", file=sys.stderr)
>     if not depenses:
>         print("Aucune dépense lue.", file=sys.stderr)
>         return 1
>     afficher(depenses, totaux_par_categorie(depenses))
>     return 0
>
>
> if __name__ == "__main__":
>     sys.exit(main())
> ```
> 1. La **dernière** : elle dit ce qui s'est passé. Les lignes au-dessus disent où (fichier, ligne, fonction), de l'appel le plus lointain au plus proche.
> 2. `ValueError: could not convert string to float: 'deux euros'` et `ValueError: not enough values to unpack (expected 4, got 3)`. Ce sont deux `ValueError`, donc un seul `except` suffit. `except:` attraperait **tout**, même ta faute de frappe (`AttributeError`) : chaque ligne serait « ignorée » sans que tu saches pourquoi. On attrape seulement l'erreur qu'on sait traiter.
> 3. La sortie standard est le **résultat**, la sortie d'erreur les problèmes : on peut garder l'un sans l'autre (`> resultat.txt`). Le code 1 dit à celui qui a lancé le script (le shell, `&&`, une pipeline) que ça a raté, sans avoir à lire le texte.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
