---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/typescript/declarations
aliases:
  - "Fichiers de Déclaration et Types Tiers"
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-11-Modules|Modules TypeScript]]"
  - "[[TS-12-Configuration-tsconfig|Configuration (tsconfig.json)]]"
related_snippets:
  - "[[04_Snippets/ts-17-fichiers-declaration-types-tiers]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html"
---

# Fichiers de Déclaration et Types Tiers

> [!abstract] Introduction
> Les fichiers `.d.ts` décrivent les types d'un code JavaScript sans contenir d'implémentation ; c'est ainsi que TypeScript connaît les types des librairies npm (`@types/...`).

> [!warning]- Prérequis
> [[TS-11-Modules|Modules TypeScript]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> // env.d.ts
> declare global {
>   interface Window { analytics?: { track(evt: string): void } }
> }
> declare module "*.svg" { const url: string; export default url; }
> export {};
> ```

> [!example]- Analogie
> Un `.d.ts` est la notice d'un appareil : il explique quels boutons existent et ce qu'ils attendent, sans contenir le mécanisme.

> [!question]- Pourquoi l'utiliser ?
> Utiliser des librairies JS avec autocomplétion et vérification, typer des variables globales, des imports de fichiers (images, `.vue`), des variables d'environnement.

> [!question]- Comment ça marche ?
> - Librairies avec types intégrés : champ `types` dans leur package.json
> - Sinon : `npm i -D @types/nom` (DefinitelyTyped)
> - Sinon : écrire un `declare module "nom";` minimal
> - Vue/Vite : `env.d.ts` déclare `ImportMetaEnv` pour typer `import.meta.env.VITE_API_URL`
> - `skipLibCheck: true` : ne vérifie pas les `.d.ts` des dépendances (build plus rapide)

> [!question]- Quand l'utiliser ?
> Quand une lib n'a pas de types, pour typer des globales ou des variables d'environnement.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un `.d.ts` peut mentir : il n'est pas vérifié contre l'implémentation réelle.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `.d.ts` | Fichier de types sans code exécutable |
| `declare` | Déclare qu'une chose existe ailleurs |
| DefinitelyTyped | Dépôt communautaire des paquets `@types` |
| Module augmentation | Ajout de types à un module existant |

---

## Points clés

- Vérifier si la lib embarque ses types avant d'installer `@types`
- Typer `import.meta.env` dans les projets Vite
- `export {}` transforme un fichier en module (nécessaire pour `declare global`)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Version de `@types/x` différente de la version de `x`
> - `declare module "x";` qui rend tout `any` silencieusement

---

## Exemple minimal

```typescript
// src/env.d.ts (projet Vite / Vue)
/// <reference types="vite/client" />
interface ImportMetaEnv { readonly VITE_API_URL: string }
interface ImportMeta { readonly env: ImportMetaEnv }
```

> [!note] Ce que j'en retiens
> `import.meta.env.VITE_API_URL` devient typé et autocomplété.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Augmenter les types d'une lib (ex. ajouter une propriété à `ComponentCustomProperties` Vue ou au `Request` Express)
> - Publier une librairie avec ses déclarations (`declaration: true`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ts-17-fichiers-declaration-types-tiers]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que contient un `.d.ts` et que ne contient-il pas ?

---

## Tâches

- [ ] #task Typer les variables d'environnement du projet Vue
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
