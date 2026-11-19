---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Git]]"
parents:
  - "[[Git]]"
related:
  - "[[Commit]]"
next_review: 
method: []
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

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine ton dossier de projet et le dossier caché `.git` dedans. Range ce qui va dans chacun.

> [!example] ⚖️ Avant / après
> Avant / après : le dossier `mes-depenses` avant `git init`, puis après. Qu'est-ce qui est apparu ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Dépôt Git » et je l'intègre ici avec `![[Schéma - Dépôt Git.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Git]]
- **Mène à** : [[Commit]]
- **Commandes** : [[git init]] · [[git status]]
- **Fiche** : [[Fiche - Publier un dépôt sur GitHub]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
