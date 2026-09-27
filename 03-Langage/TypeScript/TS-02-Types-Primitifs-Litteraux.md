---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Types Primitifs et Littéraux"
tags:
  - frontend/typescript/types-primitifs
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
---

# Types Primitifs et Littéraux

> [!abstract] En bref
> Les types de base (texte, nombre, booléen…) et une astuce très utile : les **types littéraux**, qui limitent une variable à une liste de valeurs exactes (`'a-voir' | 'vu'`). Fini les fautes de frappe dans les statuts.

## Les types de base

| Type | Exemple |
|---|---|
| `string` | `'Inception'` |
| `number` | `42`, `3.14` |
| `boolean` | `true`, `false` |
| `null` | vide, volontairement |
| `undefined` | pas encore de valeur |
| `string[]` ou `Array<string>` | liste de textes |

Toujours en **minuscules** : `string`, pas `String`.

## Les types littéraux : une liste de valeurs autorisées

```ts
type StatutFilm = 'a-voir' | 'vu' | 'abandonne';

let statut: StatutFilm = 'a-voir';
statut = 'vu';        // ✅
statut = 'terminé';   // ❌ pas dans la liste
```

- Le `|` se lit « **ou** ».
- L'éditeur te **propose** les valeurs possibles quand tu tapes.
- Si tu renommes une valeur, TypeScript te montre tous les endroits à corriger.

C'est parfait pour tout ce qui a un nombre fixe de valeurs : statuts, rôles, technos, thèmes.

```ts
type Theme = 'clair' | 'sombre';
type Techno = 'vue' | 'angular' | 'nestjs';
```

## Les types spéciaux

| Type | Sens | Quand |
|---|---|---|
| `any` | « n'importe quoi, ne vérifie rien » | **à éviter** : désactive TypeScript |
| `unknown` | « je ne sais pas encore, vérifie avant d'utiliser » | données venant de l'extérieur |
| `void` | « la fonction ne renvoie rien » | `function log(): void` |
| `never` | « ça n'arrive jamais » | fonction qui lance toujours une erreur |

```ts
function lire(donnee: unknown) {
  donnee.toUpperCase();                 // ❌ interdit : on ne sait pas ce que c'est
  if (typeof donnee === 'string') {
    donnee.toUpperCase();               // ✅ vérifié, c'est un texte
  }
}
```

## Pièges

- **`let` vs `const`** : `const x = 'vu'` a le type exact `'vu'`, alors que `let x = 'vu'` a le type large `string`.
- **`any` pour se débarrasser d'une erreur** : l'erreur reviendra à l'exécution. Préfère `unknown` et une vérification.

## Exercices

### Exercice 1 · Un type pour les tailles d'affiche

TMDB propose des tailles d'affiche `w185`, `w342` et `w500`. Crée un type `PosterSize` qui n'accepte que ces valeurs, et une fonction `posterUrl(path: string, size: PosterSize)` qui renvoie `https://image.tmdb.org/t/p/<size><path>`.

> [!success]- Solution
> ```ts
> type PosterSize = 'w185' | 'w342' | 'w500';
>
> function posterUrl(path: string, size: PosterSize): string {
>   return `https://image.tmdb.org/t/p/${size}${path}`;
> }
>
> posterUrl('/abc.jpg', 'w342');   // ✅
> posterUrl('/abc.jpg', 'w999');   // ❌ erreur de type
> ```

### Exercice 2 · `any` ou `unknown` ?

Quelle différence entre ces deux fonctions ? Laquelle protège et pourquoi ?

```ts
function logA(value: any) { console.log(value.toUpperCase()); }
function logB(value: unknown) { console.log(value.toUpperCase()); }
```

> [!success]- Solution
> - Avec `any`, TypeScript **n'affiche aucune erreur** : `logA(42)` plante à l'exécution.
> - Avec `unknown`, `value.toUpperCase()` est **refusé** tant qu'on n'a pas vérifié le type :
>
> ```ts
> function logB(value: unknown) {
>   if (typeof value === 'string') console.log(value.toUpperCase());
> }
> ```
>
> `unknown` oblige à vérifier, `any` désactive la protection.
