---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/typescript/declarations
aliases:
  - "Fichiers de Déclaration et Types Tiers"
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-11-Modules|Modules TypeScript]]"
  - "[[TS-12-Configuration-tsconfig|Configuration (tsconfig.json)]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html"
---

# Fichiers de Déclaration et Types Tiers

> [!abstract] En bref
> Comment TypeScript connaît-il les types d'une librairie écrite en JavaScript ? Grâce aux fichiers **`.d.ts`** : ils décrivent les types sans contenir de code. La plupart des librairies les fournissent déjà. Tu dois surtout savoir quoi faire quand l'éditeur te dit qu'il ne trouve pas les types d'un paquet.

## D'où viennent les types d'une librairie

| Cas | Ce que tu fais |
|---|---|
| La librairie est écrite en TypeScript ou fournit ses types (Vue, Angular, Zod, Prisma…) | rien, ça marche |
| Les types sont fournis à part par la communauté | `npm i -D @types/nom-du-paquet` |
| Aucun type n'existe | tu écris une petite déclaration toi-même |

L'erreur typique :

```
Could not find a declaration file for module 'vieille-lib'.
```

1. Essaie `npm i -D @types/vieille-lib`.
2. Si ça n'existe pas, crée `src/types/vieille-lib.d.ts` :

```ts
declare module 'vieille-lib' {
  export function formater(texte: string): string;
}
```

## Déclarer des variables d'environnement (Vite / Vue)

```ts
// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_TMDB_KEY: string;
}
```

Maintenant `import.meta.env.VITE_API_URL` est typé et autocomplété.

## Ajouter un champ à un type existant

```ts
// Ajouter une propriété globale à window
declare global {
  interface Window {
    analytics?: { track(evenement: string): void };
  }
}
export {};
```

## Pièges

- **`declare module 'x'` sans rien dedans** : tout devient `any`. C'est une rustine, pas une solution.
- **Une version de `@types/…` différente de la librairie** : les types ne correspondent plus au vrai code.
