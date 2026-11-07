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
# Ménage 06 - Un script qui ne plante pas

> [!info] Où tu en es
> **Projet :** [[Projet - Faire le ménage dans ses conteneurs Docker]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Ménage 05 - Un module réutilisable]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Exception]]

## Le but
Dans la vraie vie, le texte reçu n'est pas toujours propre : une ligne coupée, une ligne vide, ou rien du tout parce que la commande avant le `|` a raté. Le script doit **le dire clairement** au lieu de planter, et indiquer qu'il a échoué avec son **code de sortie**.

## Ce que tu fais
- [ ] Crée `exemple-abime.txt` (contenu dans la note du projet) et lance le script dessus. Lis le **traceback** en entier : quelle erreur, à quelle ligne, dans quelle fonction ?
- [ ] Fais en sorte qu'une ligne mal formée soit **ignorée** et signalée (sur la sortie d'erreur), sans arrêter le traitement des autres. Les lignes vides sont ignorées sans rien dire
- [ ] Si aucun conteneur n'a été lu, le script affiche un message clair sur la sortie d'erreur et se termine avec le code **1**. Sinon, code 0
- [ ] Vérifie le code de sortie dans les trois cas : `exemple.txt`, `exemple-abime.txt`, et une entrée vide (`< /dev/null`)
- [ ] Essaie de remplacer ton `except ...` précis par un `except:` tout seul, puis tape Ctrl+C pendant que le script attend une saisie au clavier. Remets la version précise

> [!success] Ça marche si…
> `exemple-abime.txt` → 2 conteneurs analysés et `Ligne ignorée : 'ligne cassée sans séparateur'` ; une entrée vide → un message et `echo $?` affiche `1`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Dans un traceback, quelle ligne lis-tu en premier, et pourquoi ?
2. Pourquoi `except ValueError` plutôt que `except:` tout seul ? Qu'as-tu vu avec Ctrl+C ?
3. Pourquoi le message d'erreur va sur la sortie d'erreur, et pourquoi le code 1 compte, par exemple dans une CI ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le traceback se lit **de bas en haut** : la dernière ligne dit l'erreur, celles au-dessus le chemin pour y arriver. Le `try` entoure **seulement** la ligne qui peut casser. `print(..., file=sys.stderr)` écrit sur la sortie d'erreur. Pour le code de sortie : `main()` renvoie 0 ou 1, et `sys.exit(main())`.

> [!question]- Solution
> Dans `analyse.py` :
> ```python
> def lire_conteneurs(texte):
>     conteneurs = []
>     ignorees = []
>     for ligne in texte.splitlines():
>         if not ligne.strip():
>             continue
>         try:
>             identifiant, image, statut, nom = ligne.split(";")
>         except ValueError:
>             ignorees.append(ligne)
>             continue
>         conteneurs.append({"id": identifiant, "image": image, "statut": statut, "nom": nom})
>     return conteneurs, ignorees
> ```
> Dans `conteneurs.py` :
> ```python
> def main():
>     conteneurs, ignorees = lire_conteneurs(sys.stdin.read())
>     for ligne in ignorees:
>         print(f"Ligne ignorée : {ligne!r}", file=sys.stderr)
>     if not conteneurs:
>         print("Aucun conteneur lu. As-tu bien utilisé --format ?", file=sys.stderr)
>         return 1
>     afficher(analyser(conteneurs))
>     return 0
>
>
> if __name__ == "__main__":
>     sys.exit(main())
> ```
> 1. La **dernière** : `ValueError: not enough values to unpack (expected 4, got 1)` dit ce qui s'est passé. Les lignes au-dessus disent où (fichier, ligne, fonction), de l'appel le plus lointain au plus proche.
> 2. `except:` attrape **tout**, même les erreurs que tu n'avais pas prévues (une faute de frappe, un `KeyboardInterrupt` quand tu fais Ctrl+C) : elles sont cachées, et le script ne s'arrête même plus proprement. On attrape seulement l'erreur qu'on sait traiter.
> 3. La sortie standard est le **résultat** : on peut la rediriger dans un fichier ou un `|` sans y mélanger les messages d'erreur. Le code 1 dit à celui qui a lancé le script (le shell, `&&`, une pipeline GitLab) que ça a raté, sans avoir à lire le texte.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
