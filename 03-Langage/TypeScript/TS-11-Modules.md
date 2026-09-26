---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Modules TypeScript"
tags:
  - frontend/typescript/modules
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/modules.html"
---

# Modules TypeScript

> [!abstract] En bref
> Les modules TypeScript fonctionnent comme ceux de JavaScript (`import` / `export`, voir [[JS-09-Modules-ESM|Modules ES]]). TypeScript ajoute deux choses utiles : l'**import de types seuls** et les **alias de chemins** pour éviter les `../../../`.

## Exporter et importer des types

```ts
// movie.model.ts
export interface Movie { id: number; title: string }
export type MovieStatus = 'to-watch' | 'watched';
```

```ts
// movies.api.ts
import type { Movie, MovieStatus } from './movie.model';
```

`import type` dit « je n'importe que des types ». Ils disparaissent à la compilation : aucun code n'est ajouté au fichier final. Utilise-le quand tu n'importes que des types (l'éditeur le fait souvent tout seul).

## Les alias de chemins

Au lieu de :

```ts
import { formatDate } from '../../../shared/utils/format-date';
```

On écrit :

```ts
import { formatDate } from '@shared/utils/format-date';   // Angular
import { formatDate } from '@/shared/utils/format-date';  // Vue
```

Configuration dans `tsconfig.json` :

```json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"]
    }
  }
}
```

Vue (`npm create vue@latest`) configure déjà `@/` → `src/`. Voir [[ARCH-15-Structure-de-Projet|Structure de projet]].

## Le fichier `index.ts` (barrel)

Un fichier qui ré-exporte le contenu d'un dossier :

```ts
// shared/ui/index.ts
export * from './loader.component';
export * from './empty-state.component';
```

Pratique pour un **petit** dossier. Évite les gros `index.ts` qui ré-exportent tout le projet : ils ralentissent les builds et créent des imports circulaires.

## Pièges

- **Un alias dans `tsconfig` mais pas dans l'outil de build** : l'éditeur est content, mais le build échoue. Angular CLI et Vite (avec la config générée) lisent bien `tsconfig`.
- **Import circulaire** (A importe B qui importe A) : valeurs `undefined` au démarrage. Déplace le code commun ailleurs.
