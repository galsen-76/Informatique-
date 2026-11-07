---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Module et import Python]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 05 - Un module réutilisable

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Dépenses 04 - Ranger en fonctions]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Module et import Python]]

## Le but
Ranger le projet en **plusieurs fichiers** : les données d'un côté, les calculs de l'autre, et le programme qui les assemble. Un autre script pourrait alors réutiliser les calculs sans lancer tout le programme.

## Ce que tu fais
- [ ] Déplace `TEXTE` dans un fichier `donnees.py`, et `lire_depenses`, `taille` et `totaux_par_categorie` dans `budget.py`. `depenses.py` garde `afficher` et le lancement, et **importe** ce dont il a besoin
- [ ] Ajoute un `print("budget.py chargé")` tout en haut de `budget.py`, lance le script, et observe. Puis enlève-le
- [ ] Ouvre `python3` dans le dossier du projet, importe `budget` et appelle `budget.taille(30)`
- [ ] Toujours dans `python3`, importe `depenses` : que se passe-t-il ? Protège le lancement de `depenses.py` pour qu'il ne se lance **que** quand on exécute le fichier
- [ ] Lance `python3 -c "import budget"` depuis ton dossier personnel `~` : lis l'erreur

> [!warning] Le piège de cette étape
> N'appelle jamais un de tes fichiers comme un module de Python (`sys.py`, `json.py`, `random.py`…) : ton fichier passe devant le vrai, et les imports cassent de façon très bizarre.

> [!success] Ça marche si…
> `python3 depenses.py` affiche la même chose qu'avant, et `import depenses` dans `python3` n'affiche rien.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Que fait Python, exactement, quand il rencontre `import budget` ? Combien de fois le code du module s'exécute-t-il ?
2. À quoi sert `if __name__ == "__main__":` ?
3. Pourquoi `import budget` échoue depuis `~` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Un module, c'est simplement un fichier `.py`. L'importer, c'est **exécuter** ce fichier une fois et récupérer ce qu'il définit. Python cherche les modules dans une liste de dossiers, comme le shell cherche les programmes dans le PATH. `__name__` vaut `"__main__"` seulement pour le fichier qu'on a lancé.

> [!question]- Solution
> `donnees.py` contient `TEXTE`, `budget.py` les trois fonctions. `depenses.py` :
> ```python
> from budget import lire_depenses, taille, totaux_par_categorie
> from donnees import TEXTE
>
>
> def afficher(depenses, totaux):
>     ...  # comme à l'étape 04
>
>
> if __name__ == "__main__":
>     depenses = lire_depenses(TEXTE)
>     afficher(depenses, totaux_par_categorie(depenses))
> ```
> 1. Il cherche `budget.py`, l'**exécute** de haut en bas (d'où le message), et range ce qu'il a défini dans un objet `budget`. Une seule fois : un second `import` réutilise le module déjà chargé.
> 2. Sans cette ligne, importer `depenses` lance tout le programme, qui affiche son résultat. Avec elle, le lancement n'a lieu que si on exécute **ce** fichier, pas quand on l'importe.
> 3. Python cherche d'abord dans le dossier du script lancé (ou le dossier courant pour `python3 -c`), puis dans ses propres dossiers. Depuis `~`, `budget.py` n'est dans aucun → `ModuleNotFoundError`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
