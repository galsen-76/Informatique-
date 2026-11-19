---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: maitrise
level: debutant
prerequisites:
  - "[[Terminal]]"
parents: []
related:
  - "[[Git]]"
next_review:
method: []
tags:
  - concept
  - terminal
---
# Système de fichiers

> [!info] En une phrase
> La manière dont l'ordinateur organise les fichiers en dossiers imbriqués, avec des chemins pour les retrouver.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Les fichiers sont rangés dans une **arborescence** de dossiers. Un **chemin absolu** part de la racine (`C:\Users\oumar\projets`) ; un **chemin relatif** part du dossier courant (`./src/index.js`, `../README.md`).

### Pourquoi ça existe
Retrouver n'importe quel fichier sans ambiguïté, pour soi comme pour les programmes.

## 2 · Explorer
### Comment ça fonctionne
- `.` = dossier courant, `..` = dossier parent
- Sous Windows le séparateur est `\`, sous Linux/macOS `/` (PowerShell accepte les deux)
- Les fichiers commençant par `.` (`.git`, `.env`) sont souvent cachés

> [!warning] À ne pas confondre
> **Chemin relatif** et **chemin absolu** : un chemin relatif change de sens selon le dossier où tu te trouves.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine de mémoire l'arbre de ton dossier `~/projets/mes-depenses` avec api, front-vue et front-angular. Écris un chemin absolu et un chemin relatif vers `app/main.py`.

> [!example] 🛣️ Suis le trajet
> Suis le trajet de `cd ..` puis `cd api/app` en partant de `front-vue`. Marque où tu te trouves à chaque étape.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Système de fichiers » et je l'intègre ici avec `![[Schéma - Système de fichiers.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Terminal]]
- **Mène à** : [[Git]] (qui suit les changements d'une arborescence)
- **Commandes** : [[cd]] · [[ls]] · [[mkdir]]

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
