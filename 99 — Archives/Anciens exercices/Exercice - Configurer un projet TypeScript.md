---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Générique TypeScript]]"
  - "[[Compilation TypeScript (tsc et tsconfig)]]"
tags:
  - exercice
---
# Exercice — Configurer un projet TypeScript

> [!info] Objectif
> Monter un projet TypeScript de zéro, écrire une fonction générique, compiler et vérifier comme le ferait une CI.
> Notions : [[Générique TypeScript]] · [[Compilation TypeScript (tsc et tsconfig)]]

## Consignes
- [ ] `npm init -y`, `npm install --save-dev typescript`, puis `npx tsc --init`
- [ ] Règle `rootDir: src`, `outDir: dist`, `strict: true`, `module: NodeNext`, et ajoute `"type": "module"` au `package.json`
- [ ] Dans `src/outils.ts`, écris `grouperPar<T>(liste: T[], cle: (x: T) => string): Record<string, T[]>`
- [ ] Dans `src/index.ts`, utilise-la sur une liste d'annotations typées
- [ ] Ajoute les scripts `build` (`tsc`), `check` (`tsc --noEmit`) et `start` (`node dist/index.js`), lance-les
- [ ] Introduis une erreur de type : `npm run check` doit échouer avec un code de sortie différent de 0 (`echo $?`)

> [!question]- Indice
> `Record<string, T[]>` est un type générique fourni : un objet dont les clés sont des chaînes et les valeurs des listes de T. Avec `NodeNext`, l'import d'un fichier local s'écrit avec `.js` : `import { grouperPar } from "./outils.js"`.

> [!question]- Solution
> ```ts
> // src/outils.ts
> export function grouperPar<T>(liste: T[], cle: (x: T) => string): Record<string, T[]> {
>   const res: Record<string, T[]> = {};
>   for (const x of liste) {
>     const k = cle(x);
>     (res[k] ??= []).push(x);
>   }
>   return res;
> }
> // src/index.ts
> import { grouperPar } from "./outils.js";
> interface A { label: string; x: number }
> const annotations: A[] = [{ label: "voiture", x: 1 }, { label: "vélo", x: 2 }, { label: "voiture", x: 3 }];
> console.log(grouperPar(annotations, (a) => a.label));
> ```
> ```json
> "scripts": { "build": "tsc", "check": "tsc --noEmit", "start": "node dist/index.js" }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
