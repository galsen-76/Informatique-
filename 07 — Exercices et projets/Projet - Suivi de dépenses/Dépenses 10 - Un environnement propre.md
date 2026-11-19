---
type: exercise
status: a-faire
niveau: 0
difficulty: facile
concepts:
  - "[[Environnement virtuel Python]]"
  - "[[Gestionnaire de paquets]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 10 - Un environnement propre

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Niveau :** 0
> **Étape précédente :** [[Dépenses 09 - Un vrai outil en ligne de commande]]
> **Notions appliquées ici :** [[Environnement virtuel Python]] · [[Gestionnaire de paquets]] · [[Gestionnaire de paquets]]
> **Ordre :** pour chaque notion, je lis la fiche, je fais son dessin et ses exercices visuels, puis je fais le morceau de cette étape qui l'utilise.

## Le but
Tu veux afficher les totaux dans un joli tableau avec une bibliothèque externe (par exemple `rich` ou `tabulate`), sans rien installer dans le Python du système, et de façon qu'un autre puisse refaire la même installation.

## Ce que tu fais
- [ ] Vérifie avec le gestionnaire de paquets de ta distribution que Python et le module des environnements virtuels sont installés
- [ ] Crée un environnement virtuel dans le projet, active-le, et vérifie quel `python` est utilisé
- [ ] Installe la bibliothèque avec pip et affiche les totaux en tableau
- [ ] Écris `requirements.txt`, puis recrée l'environnement de zéro à partir de ce fichier. Le `.venv` ne doit pas partir dans Git
- [ ] Piège : désactive l'environnement et relance le script. Lis l'erreur et explique-la
- [ ] Commit

> [!success] Ça marche si…
> Avec l'environnement activé, le script affiche un tableau. `requirements.txt` est dans Git, `.venv` non. Un `pip install -r requirements.txt` dans un environnement neuf suffit à tout refaire.

## Est-ce que j'ai compris ?
Demande à Claude de t'interroger, ou réponds en dessous.
1. Quelle différence entre `apt` et `pip` ?
2. Où est installée la bibliothèque quand l'environnement est activé ?
3. Pourquoi ne pas mettre `.venv` dans Git ?

> [!question]- Indice
> La fiche [[Environnement virtuel Python]] a les commandes. `which python` montre lequel est utilisé.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Les notions de l'étape ont leurs trois cases (schéma, exercices visuels, fil rouge)
- [ ] J'ai répondu aux questions et Claude les a vérifiées
