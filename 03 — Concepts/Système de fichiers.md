---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: a-decouvrir
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
- [[Exercice - Naviguer dans le terminal]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Terminal]]
- **Mène à** : [[Git]] (qui suit les changements d'une arborescence)
- **Commandes** : [[cd]] · [[ls]] · [[mkdir]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
