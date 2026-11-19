---
type: concept
domain: frontend
module: "[[Module 11 - React]]"
status: a-decouvrir
level: debutant
niveau: 2
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[npm]]"
  - "[[package.json]]"
  - "[[Module et import]]"
parents:
  - "[[React]]"
related:
  - "[[Compilation TypeScript (tsc et tsconfig)]]"
  - "[[Dockerfile]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Outil de build front (Vite)

> [!info] En une phrase
> Vite est l'outil qui lance un serveur de développement rapide et, pour la production, transforme ton code (JSX, TypeScript, imports) en quelques fichiers optimisés que le navigateur sait lire.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Le navigateur ne comprend ni JSX, ni TypeScript, ni `import React from "react"` (un paquet npm). Un **outil de build** (*bundler*) s'en charge :
- **`npm run dev`** : serveur de développement avec rechargement instantané à chaque sauvegarde.
- **`npm run build`** : produit le dossier **`dist/`** (HTML, JS et CSS minifiés, noms avec empreinte pour le cache).
- **`npm run preview`** : sert `dist/` pour tester le build.
- Variables : `import.meta.env.VITE_API_URL` (seules celles qui commencent par `VITE_` sont exposées, et elles sont **publiques**).
Autres outils du même rôle : **webpack** (plus ancien, utilisé par CVAT), esbuild, Rollup, le CLI d'Angular.

### Pourquoi ça existe
Le code moderne est écrit en centaines de fichiers et de paquets, dans des syntaxes que le navigateur ne lit pas directement.

### Le problème résolu
Développer vite, et livrer en production des fichiers petits et compatibles.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
S[src .tsx .css] --> V[Vite]
  N[node_modules] --> V
  V --> D[dist/]
  D --> W[Serveur web]
```

### Exemple concret
```bash
npm create vite@latest mon-app -- --template react-ts
cd mon-app && npm install
npm run dev          # http://localhost:5173
npm run build        # dist/index.html + dist/assets/index-3f9a1c.js
```
Dans un Dockerfile, on fait souvent un **multi-étapes** : une étape Node qui lance `npm ci && npm run build`, puis une image Nginx qui sert `dist/`.

### Cas d'utilisation
- Démarrer un projet React ou Vue
- Construire l'image Docker d'un frontend
- Comprendre le build du frontend de CVAT (webpack)

> [!warning] À ne pas confondre
> Une variable `VITE_…` est **écrite dans le JavaScript livré** : jamais de secret dedans. Et `npm run dev` n'est pas fait pour la production : on sert le résultat de `npm run build`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : `npm run dev` (serveur de développement) puis `npm run build` (dossier `dist`). Dessine ce qui sort de chaque commande.

> [!example] 🔄 Change de contexte
> Redessine le build dans le Dockerfile du front Vue : quel étage fait le build, quel étage sert le résultat ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Outil de build front (Vite) » et je l'intègre ici avec `![[Schéma - Outil de build front (Vite).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 06 - Le front Vue dans Docker]]

## 4 · Relier
- **Prérequis** : [[npm]] · [[package.json]] · [[Module et import]]
- **Complémentaires** : [[Compilation TypeScript (tsc et tsconfig)]] · [[Dockerfile]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
