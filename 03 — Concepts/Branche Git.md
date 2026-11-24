---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related:
  - "[[Merge]]"
  - "[[Conflit de merge]]"
tags:
  - concept
  - git
---
# Branche Git

> [!info] En une phrase
> Une ligne de développement parallèle : tu travailles sur une fonctionnalité sans toucher à la version principale.

## 1 · Comprendre
### Définition
Une **branche** est simplement un **pointeur mobile vers un commit**. La branche principale s'appelle souvent `main`. `HEAD` indique la branche sur laquelle tu te trouves.

### Pourquoi ça existe
Pour isoler un travail en cours (une fonctionnalité, une correction) et ne l'intégrer qu'une fois prêt.

### Le problème résolu
Sans branches, tout le monde modifie la même ligne d'historique : un travail à moitié fini casse le projet de tous.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
gitGraph
  commit id: "A"
  commit id: "B"
  branch feature/login
  checkout feature/login
  commit id: "C"
  commit id: "D"
  checkout main
  commit id: "E"
  merge feature/login
```
- Créer une branche ne copie aucun fichier : c'est quasi instantané.
- Quand tu commits, seule la branche courante avance.

### Exemple concret
```bash
git switch -c feature/login   # créer et aller sur la branche
# ... modifications ...
git commit -am "Formulaire de login"
git switch main
git merge feature/login
```

### Cas d'utilisation
- Une branche par fonctionnalité (`feature/...`) ou correction (`fix/...`)
- Expérimenter sans risque
- Préparer une pull request / merge request

> [!warning] À ne pas confondre
> **Branche** et **copie du projet** : une branche ne duplique rien, elle pointe juste vers un commit.

## 3 · Relier
- **Prérequis** : [[Commit]]
- **Notion parente** : [[Git]]
- **Mène à** : [[Merge]] → [[Conflit de merge]]
- **Commandes** : [[git branch]] · [[git switch]] · [[git merge]]
- **Cours** : [[Cours - Branches et fusion]]
