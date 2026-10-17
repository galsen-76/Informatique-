---
type: notion
statut: a apprendre
resume: "Comment TypeScript connaît-il les types d'une librairie écrite en JavaScript ?"
revu:
sources:
  - "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html"
---
# Fichiers de déclaration et types tiers

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Comment TypeScript connaît-il les types d'une librairie écrite en JavaScript ?

## Le problème

**Pourquoi c'est utile ?**
Pour que TypeScript connaisse les types d'une librairie écrite en JavaScript.

**Qu'est-ce qui se passait sans ça ?**
Une librairie sans types était vue comme any : aucune autocomplétion, aucune vérification.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Grâce aux fichiers **`.d.ts`** : ils décrivent les types sans contenir de code. La plupart des librairies les fournissent déjà. Tu dois surtout savoir quoi faire quand l'éditeur te dit qu'il ne trouve pas les types d'un paquet.

### D'où viennent les types d'une librairie

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

### Ajouter un champ à un type existant

```ts
// Ajouter une propriété globale à window
declare global {
  interface Window {
    analytics?: { track(evenement: string): void };
  }
}
export {};
```

## 🧪 Exemple

### Déclarer des variables d'environnement (Vite / Vue)

```ts
// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_TMDB_KEY: string;
}
```

Maintenant `import.meta.env.VITE_API_URL` est typé et autocomplété.

## ⚠️ Limites et pièges

- **`declare module 'x'` sans rien dedans** : tout devient `any`. C'est une rustine, pas une solution.
- **Une version de `@types/…` différente de la librairie** : les types ne correspondent plus au vrai code.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Une librairie sans types

Tu installes une librairie JavaScript `tiny-slug` et TypeScript affiche « Could not find a declaration file for module ». Quelles sont les deux solutions ?

> [!success]- Solution
> 1. Installer les types s'ils existent : `npm install -D @types/tiny-slug`.
> 2. Sinon, les déclarer toi-même dans un fichier `src/types/tiny-slug.d.ts` :
>
> ```ts
> declare module 'tiny-slug' {
>   export default function slug(text: string): string;
> }
> ```

#### Exercice 2 · Typer les variables d'environnement de Vite

Dans un projet Vue (Vite), déclare la variable `VITE_TMDB_BASE_URL` pour que `import.meta.env.VITE_TMDB_BASE_URL` soit typée `string`.

> [!success]- Solution
> ```ts
> // src/env.d.ts
> interface ImportMetaEnv {
>   readonly VITE_TMDB_BASE_URL: string;
> }
>
> interface ImportMeta {
>   readonly env: ImportMetaEnv;
> }
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux TypeScript]]
- **Voir aussi :** [[Modules TypeScript]], [[Configuration tsconfig]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
