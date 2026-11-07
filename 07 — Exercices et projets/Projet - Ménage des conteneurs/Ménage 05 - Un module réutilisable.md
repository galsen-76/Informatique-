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
# Ménage 05 - Un module réutilisable

> [!info] Où tu en es
> **Projet :** [[Projet - Faire le ménage dans ses conteneurs Docker]] · **Étape du parcours :** 1 · Python, les bases
> **Étape précédente :** [[Ménage 04 - Ranger en fonctions]]
> **Cours à avoir lus :** [[Cours - Python, premiers pas]] · [[Cours - Fonctions, modules et erreurs]]
> **Notions validées par cette étape :** [[Module et import Python]]

## Le but
Mettre la partie « analyse » dans **son propre fichier**, pour qu'un autre script (ou un test) puisse s'en servir sans lancer tout le programme. Et comprendre enfin ce `import sys` du début.

## Ce que tu fais
- [ ] Déplace `lire_conteneurs`, `etat` et `analyser` dans un nouveau fichier `analyse.py`. `conteneurs.py` garde `afficher` et le lancement, et **importe** ce dont il a besoin
- [ ] Ajoute un `print("analyse.py chargé")` tout en haut de `analyse.py`, lance le script, et observe. Puis enlève-le
- [ ] Dans `python3`, lancé depuis le dossier du projet, importe `analyse` et appelle `analyse.etat("Up 3 days")`
- [ ] Importe aussi `conteneurs` dans `python3` : que se passe-t-il ? Protège le lancement de `conteneurs.py` pour qu'il ne se lance **que** quand on exécute le fichier
- [ ] Lance `python3 -c "import analyse"` depuis ton dossier personnel `~` : lis l'erreur

> [!warning] Le piège de cette étape
> N'appelle jamais un de tes fichiers comme un module de Python (`sys.py`, `json.py`, `random.py`…) : ton fichier passe devant le vrai, et les imports cassent de façon très bizarre.

> [!success] Ça marche si…
> `python3 conteneurs.py < exemple.txt` marche comme avant, et `import conteneurs` dans `python3` n'affiche rien et n'attend rien.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Que fait Python, exactement, quand il rencontre `import analyse` ? Combien de fois le code du module s'exécute-t-il ?
2. À quoi sert `if __name__ == "__main__":` ?
3. Pourquoi `import analyse` échoue depuis `~` ? Et d'où vient `sys`, que tu n'as jamais écrit ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Un module, c'est simplement un fichier `.py`. L'importer, c'est **exécuter** ce fichier une fois et récupérer ce qu'il définit. Python cherche les modules dans une liste de dossiers, comme le shell cherche les programmes dans le PATH. `__name__` vaut `"__main__"` seulement pour le fichier qu'on a lancé.

> [!question]- Solution
> `analyse.py` contient les trois fonctions. `conteneurs.py` :
> ```python
> import sys
>
> from analyse import analyser, lire_conteneurs
>
>
> def afficher(resultat):
>     ...  # comme à l'étape 04
>
>
> if __name__ == "__main__":
>     afficher(analyser(lire_conteneurs(sys.stdin.read())))
> ```
> 1. Il cherche `analyse.py`, l'**exécute** de haut en bas (d'où le message), et range ce qu'il a défini dans un objet `analyse`. Une seule fois : un second `import` réutilise le module déjà chargé.
> 2. Sans cette ligne, importer `conteneurs` lance le programme, qui attend du texte sur l'entrée standard (il a l'air bloqué). Avec elle, le lancement n'a lieu que si on exécute **ce** fichier, pas quand on l'importe.
> 3. Python cherche d'abord dans le dossier du script lancé (ou le dossier courant pour `python3 -c`), puis dans ses propres dossiers : depuis `~`, `analyse.py` n'est dans aucun → `ModuleNotFoundError`. `sys` est un module **livré avec Python** (la bibliothèque standard), rangé dans ces dossiers-là.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
