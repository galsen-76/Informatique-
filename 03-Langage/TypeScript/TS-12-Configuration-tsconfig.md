---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Configuration (tsconfig.json)"
tags:
  - frontend/typescript/configuration
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/tsconfig"
---

# Configuration (tsconfig.json)

> [!abstract] En bref
> `tsconfig.json` est le **fichier de réglages** de TypeScript : quels fichiers vérifier, à quel point être strict, vers quelle version de JavaScript convertir. Angular CLI et Vue le génèrent pour toi. Tu dois surtout savoir **lire** les options importantes et ne **jamais désactiver le mode strict**.

## Les options qui comptent

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

| Option | Ce qu'elle fait | Réglage conseillé |
|---|---|---|
| `strict` | active toutes les vérifications importantes (dont `null` / `undefined`) | **`true`, toujours** |
| `target` | version de JavaScript produite | laisse la valeur générée |
| `module` / `moduleResolution` | comment les `import` sont compris | laisse la valeur générée |
| `noUncheckedIndexedAccess` | `liste[0]` peut être `undefined` → t'oblige à vérifier | `true` (très utile) |
| `paths` | les alias `@/…` | selon ton projet |
| `include` / `exclude` | les fichiers vérifiés | laisse la valeur générée |

## Ce que `strict` t'apporte

```ts
function longueur(texte: string | null) {
  return texte.length;          // ❌ avec strict : texte peut être null
}

let x;                          // ❌ avec strict : type implicite any interdit
```

Sans `strict`, ces deux lignes passent… et plantent à l'exécution.

## Vérifier tout le projet

L'éditeur vérifie le fichier ouvert. Pour vérifier **tout le projet** d'un coup (et dans la CI) :

```bash
npx tsc --noEmit        # projet TypeScript / NestJS / Angular
npx vue-tsc --noEmit    # projet Vue (vérifie aussi les .vue)
```

`--noEmit` = vérifier seulement, sans produire de fichiers.

## Pièges

- **Mettre `strict: false`** pour faire disparaître des erreurs : tu caches des bugs.
- **Modifier `target` ou `module` au hasard** : ces réglages doivent correspondre à l'outil de build. Laisse ceux générés par Angular CLI, Vite ou Nest CLI.
- **Plusieurs `tsconfig`** (`tsconfig.app.json`, `tsconfig.spec.json`) : c'est normal, un pour l'app et un pour les tests. Ils héritent du principal avec `extends`.
