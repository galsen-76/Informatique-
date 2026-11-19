---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: debutant
niveau: 0
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Dépôt Git]]"
parents:
  - "[[Git]]"
related:
  - "[[Branche Git]]"
next_review: 
tags:
  - concept
  - git
---
# Commit

> [!info] En une phrase
> Une photo enregistrée de ton projet à un instant donné, avec un message qui explique ce qui a changé.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

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

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine un commit comme une photo : ce qu'elle contient, son message, son lien vers le commit parent.

> [!example] 🛣️ Suis le trajet
> Suis le trajet d'une modification de `main.py` : fichier modifié, `git add`, `git commit`. Dessine où elle se trouve à chaque étape.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Commit » et je l'intègre ici avec `![[Schéma - Commit.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 07 - Le projet dans Git]]

## 4 · Relier
- **Prérequis** : [[Dépôt Git]]
- **Mène à** : [[Branche Git]]
- **Commandes** : [[git add]] · [[git commit]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
