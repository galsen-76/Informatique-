---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: compris
level: debutant
prerequisites:
  - "[[Git]]"
parents:
  - "[[Git]]"
related:
  - "[[Commit]]"
next_review: 2026-11-08
method:
  - Comprendre
  - Explorer
  - Pratiquer
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

## 2 · Explorer
### Comment ça fonctionne
- `git init` crée `.git` dans le dossier courant
- `git remote add origin <url>` relie à un dépôt distant
- `git push` / `git pull` synchronisent local et distant

> [!warning] À ne pas confondre
> Le **dossier du projet** et le **dépôt** : sans `.git`, ce n'est qu'un dossier.

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Git]]
- **Mène à** : [[Commit]]
- **Commandes** : [[git init]] · [[git status]]
- **Fiche** : [[Fiche - Publier un dépôt sur GitHub]]

## 6 · Réviser
> [!question]- Comment savoir si un dossier est un dépôt Git ?
> Il contient un dossier caché `.git` ; `git status` répond sans erreur.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
