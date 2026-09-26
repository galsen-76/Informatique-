---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M03
aliases:
  - "Types Avancés TypeScript"
  - "Types Avancés (Mapped, Conditional, Template Literal)"
tags:
  - frontend/typescript/types-avances
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-06-Generics|Generics]]"
  - "[[TS-10-Utility-Types|Utility Types]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html"
---

# Types Avancés (Mapped, Conditional, Template Literal)

> [!abstract] En bref
> Des outils pour **fabriquer des types automatiquement** à partir d'autres types. Tu en écriras rarement toi-même, mais tu dois savoir les **lire** : ils sont partout dans les librairies (Angular, Pinia, Prisma) et dans les messages d'erreur. Deux mots-clés suffisent pour commencer : `keyof` et `typeof`.

## `keyof` : la liste des clés

```ts
interface Film { id: number; titre: string; annee: number }

type CleFilm = keyof Film;   // 'id' | 'titre' | 'annee'

function trierPar(films: Film[], cle: keyof Film) {
  return films.toSorted((a, b) => (a[cle] > b[cle] ? 1 : -1));
}
trierPar(films, 'annee');   // ✅
trierPar(films, 'duree');   // ❌ pas une clé de Film
```

## `typeof` : le type d'une valeur existante

```ts
const config = { apiUrl: 'https://api.exemple.com', timeout: 5000 };
type Config = typeof config;   // { apiUrl: string; timeout: number }
```

Pratique pour ne pas écrire deux fois la même chose.

## Accéder au type d'un champ

```ts
type Annee = Film['annee'];                // number
type Element = Film[][number];             // Film : le type d'un élément du tableau
```

## Types « mappés » : transformer chaque champ

C'est comme ça que `Partial` est construit :

```ts
type MonPartial<T> = { [K in keyof T]?: T[K] };
//                     pour chaque clé K de T, rendre le champ optionnel
```

Exemple utile : les erreurs d'un formulaire, un message par champ :

```ts
type Erreurs<T> = { [K in keyof T]?: string };
const erreurs: Erreurs<Film> = { titre: 'Le titre est obligatoire' };
```

## Types conditionnels : « si… alors… »

```ts
type EstTexte<T> = T extends string ? 'oui' : 'non';
type A = EstTexte<'dune'>;   // 'oui'
type B = EstTexte<42>;       // 'non'
```

Se lit comme un ternaire. Tu les verras surtout dans les librairies.

## Template literal types : des types de texte composés

```ts
type Taille = 'sm' | 'md' | 'lg';
type ClasseBouton = `btn-${Taille}`;   // 'btn-sm' | 'btn-md' | 'btn-lg'

type Evenement = `on${Capitalize<'click' | 'focus'>}`;   // 'onClick' | 'onFocus'
```

## Quand t'en servir

- **`keyof` et `typeof`** : régulièrement.
- **Types mappés** : pour des utilitaires comme `Erreurs<T>`.
- **Conditionnels** : presque jamais dans une application. C'est l'outil des auteurs de librairies.

**Si un type devient illisible, simplifie.** Un type clair et un peu répétitif vaut mieux qu'une énigme.
