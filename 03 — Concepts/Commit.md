---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related:
  - "[[Branche Git]]"
tags:
  - concept
  - git
---
# Commit

> [!info] En une phrase
> Une photo enregistrée de ton projet à un instant donné, avec un message qui explique ce qui a changé.

## 1 · Comprendre
### Définition
Un **commit** enregistre le contenu de l'index, l'auteur, la date, un message et un lien vers le commit précédent. Il est identifié par un **hash** (`a1b2c3d…`).

### Pourquoi ça existe
Garder une trace de chaque étape du projet, pouvoir revenir en arrière et savoir qui a changé quoi, et pourquoi.

### Le problème résolu
Les copies `projet_v2_final_vraiment.zip` et l'impossibilité de savoir quelle modification a cassé le code.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
gitGraph
  commit id: "Init"
  commit id: "Ajout route GET"
  commit id: "Ajout route POST"
```

### Exemple concret
```bash
git add zipper.py
git commit -m "feat: ajoute l'option --dry-run"
git show --stat HEAD      # le dernier commit : auteur, date, message, fichiers
```
Un bon commit : **une seule** intention, un message qui dit *quoi* (et, dans le corps, *pourquoi*). Voir [[Convention de commit]].

### Cas d'utilisation
- Chaque étape cohérente d'un travail
- Le point de départ d'une pipeline de CI

> [!warning] À ne pas confondre
> **Enregistrer un fichier** (Ctrl+S, sur le disque) et **committer** (l'ajouter à l'historique Git). Un fichier enregistré n'est pas encore dans Git.

## 3 · Relier
- **Prérequis** : [[Dépôt Git]]
- **Mène à** : [[Branche Git]]
- **Commandes** : [[git add]] · [[git commit]]
