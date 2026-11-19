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
  - "[[Git]]"
parents:
  - "[[Git]]"
related:
  - "[[Commit]]"
next_review: 
tags:
  - concept
  - git
---
# Dépôt Git

> [!info] En une phrase
> Un projet suivi par Git : tes fichiers plus le dossier caché `.git` qui contient tout l'historique.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

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

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine ton dossier de projet et le dossier caché `.git` dedans. Range ce qui va dans chacun.

> [!example] ⚖️ Avant / après
> Avant / après : le dossier `mes-depenses` avant `git init`, puis après. Qu'est-ce qui est apparu ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Dépôt Git » et je l'intègre ici avec `![[Schéma - Dépôt Git.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 07 - Le projet dans Git]]

## 4 · Relier
- **Prérequis** : [[Git]]
- **Mène à** : [[Commit]]
- **Commandes** : [[git init]] · [[git status]]
- **Fiche** : [[Fiche - Publier un dépôt sur GitHub]]

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
