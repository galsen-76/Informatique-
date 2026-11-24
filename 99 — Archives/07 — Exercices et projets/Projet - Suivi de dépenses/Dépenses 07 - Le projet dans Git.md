---
type: exercise
status: a-faire
niveau: 0
difficulty: facile
concepts:
  - "[[Git]]"
  - "[[Dépôt Git]]"
  - "[[Index Git (staging)]]"
  - "[[Commit]]"
  - "[[Ignorer des fichiers (gitignore)]]"
  - "[[Dépôt distant (remote)]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 07 - Le projet dans Git

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Niveau :** 0
> **Étape précédente :** [[Dépenses 06 - Un script qui ne plante pas]]
> **Notions validées par cette étape :** [[Git]] · [[Dépôt Git]] · [[Index Git (staging)]] · [[Commit]] · [[Ignorer des fichiers (gitignore)]] · [[Dépôt distant (remote)]]

## Le but
Ton script marche. Maintenant, son historique doit être gardé : chaque étape du projet devient un commit lisible, les fichiers inutiles restent dehors, et le tout est en copie sur un dépôt distant (GitHub ou GitLab).

## Ce que tu fais
- [ ] Transforme le dossier `~/projets/depenses` en dépôt Git. Regarde ce qui est apparu dans le dossier (les fichiers cachés aussi)
- [ ] Lance le script une fois : Python crée un dossier `__pycache__`. Fais en sorte que Git ne le voie plus jamais, ni un futur `.venv`
- [ ] Fais un premier commit avec seulement `budget.py` et `donnees.py`, puis un second avec `depenses.py`. Vérifie avec l'historique qu'il y a bien deux commits, avec des messages qui disent ce qu'ils ajoutent
- [ ] Modifie une ligne de `depenses.py` et regarde ce que Git en dit **avant** et **après** l'avoir préparée pour le commit. Puis committe-la
- [ ] Crée un dépôt vide sur GitHub ou GitLab, relie-le à ton dépôt local et envoie tes commits. Vérifie sur le site que les trois commits y sont, et pas `__pycache__`
- [ ] Piège : fais un commit qui contient par erreur un fichier `notes-perso.txt`, puis ajoute-le au `.gitignore`. Est-il sorti de Git ? Trouve comment le retirer du dépôt sans le supprimer de ton disque

> [!success] Ça marche si…
> Le site du dépôt distant montre trois commits ou plus, `budget.py`, `donnees.py`, `depenses.py` et `.gitignore`, mais ni `__pycache__` ni `notes-perso.txt`. `git status` dit qu'il n'y a rien à committer.

## Est-ce que j'ai compris ?
Demande à Claude de t'interroger, ou réponds en dessous.
1. Où se trouve l'historique de ton projet sur ton disque ?
2. À quoi sert l'étape entre « fichier modifié » et « commit » ?
3. Pourquoi `.gitignore` n'a pas suffi pour `notes-perso.txt` ?

> [!question]- Indice
> Les fiches [[Dépôt Git]], [[Index Git (staging)]] et [[Ignorer des fichiers (gitignore)]] ont tout ce qu'il faut. `git status` est ton meilleur ami : lance-le après chaque commande. Pour le piège, `.gitignore` ne s'occupe que des fichiers que Git **ne suit pas encore**.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Les notions de l'étape ont leurs trois cases (schéma, exercices visuels, fil rouge)
- [ ] J'ai répondu aux questions et Claude les a vérifiées
