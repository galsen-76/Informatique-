---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related:
  - "[[Commit]]"
tags:
  - concept
  - git
---
# Dépôt Git

> [!info] En une phrase
> Un projet suivi par Git : tes fichiers plus le dossier caché `.git` qui contient tout l'historique.

## 1 · Comprendre
### Définition
Un **dépôt** (repository, « repo ») est créé par [[git init]] ou récupéré par `git clone`. Un dépôt **local** est sur ta machine ; un dépôt **distant** (remote, souvent appelé `origin`) est hébergé sur GitHub/GitLab.

### Pourquoi ça existe
Regrouper tout l'historique d'un projet au même endroit, sur chaque poste, sans dépendre d'un serveur.

### Le problème résolu
Ne pas savoir quelle version d'un fichier est la bonne, ni retrouver une version ancienne.

## 2 · Explorer
### Comment ça fonctionne
- `git init` crée `.git` dans le dossier courant
- `git remote add origin <url>` relie à un dépôt distant
- `git push` / `git pull` synchronisent local et distant

### Exemple concret
```bash
mkdir essai && cd essai && git init     # nouveau dépôt
ls -a                                   # le dossier caché .git contient tout l'historique
git clone git@gitlab.com:equipe/projet.git   # ou copier un dépôt existant
```

### Cas d'utilisation
- Tout projet de code, même seul
- Ton coffre Obsidian lui-même est un dépôt Git

> [!warning] À ne pas confondre
> Le **dossier du projet** et le **dépôt** : sans `.git`, ce n'est qu'un dossier.

## 3 · Relier
- **Prérequis** : [[Git]]
- **Mène à** : [[Commit]]
- **Commandes** : [[git init]] · [[git status]]
- **Fiche** : [[Fiche - Publier un dépôt sur GitHub]]
