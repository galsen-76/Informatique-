---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: en-cours
level: debutant
niveau: 0
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Terminal]]"
parents: []
related:
  - "[[Git]]"
next_review:
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

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine de mémoire l'arbre de ton dossier `~/projets/mes-depenses` avec api, front-vue et front-angular. Écris un chemin absolu et un chemin relatif vers `app/main.py`.

> [!example] 🛣️ Suis le trajet
> Suis le trajet de `cd ..` puis `cd api/app` en partant de `front-vue`. Marque où tu te trouves à chaque étape.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Système de fichiers » et je l'intègre ici avec `![[Schéma - Système de fichiers.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 01 - Lire les dépenses]]

## 4 · Relier
- **Prérequis** : [[Terminal]]
- **Mène à** : [[Git]] (qui suit les changements d'une arborescence)
- **Commandes** : [[cd]] · [[ls]] · [[mkdir]]

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
