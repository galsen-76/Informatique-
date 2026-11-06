---
type: concept
domain: backend
module: "[[Module 07 - Node.js]]"
status: compris
level: debutant
prerequisites:
  - "[[Node.js]]"
parents: []
related:
  - "[[Express]]"
next_review: 2026-11-12
method:
  - Comprendre
  - Explorer
  - Pratiquer
tags:
  - concept
  - backend
---
# npm

> [!info] En une phrase
> Le gestionnaire de paquets de Node.js : il installe les bibliothèques dont ton projet a besoin.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**npm** lit `package.json` (la carte d'identité du projet : nom, scripts, dépendances) et télécharge les paquets dans `node_modules`. `package-lock.json` fige les versions exactes.

## 2 · Explorer
### Comment ça fonctionne
- `dependencies` : nécessaires en production (`express`)
- `devDependencies` : utiles seulement en développement (`nodemon`)
- `scripts` : raccourcis lancés avec `npm run <nom>`

> [!warning] À ne pas confondre
> **npm** (l'outil) et **npx** (exécute un paquet sans l'installer globalement). Et on ne versionne **jamais** `node_modules` (il est dans `.gitignore`).

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Node.js]]
- **Utilisé par** : [[Express]]
- **Commandes** : [[npm init]] · [[npm install]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
