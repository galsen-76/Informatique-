---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Type Narrowing (Réduction de Type)"
tags:
  - frontend/typescript/type-narrowing
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-07-Union-Intersection|Union et Intersection Types]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
---

# Type Narrowing (Réduction de Type)

> [!abstract] En bref
> Quand une variable peut être de plusieurs types (`string | number`, `Film | null`), TypeScript ne te laisse pas l'utiliser librement. Il faut d'abord **vérifier** ce qu'elle contient. Après la vérification, TypeScript « rétrécit » (*narrow*) le type : il sait exactement ce qu'il y a dedans.

## L'idée

```ts
function afficher(valeur: string | number) {
  // ici : string ou number
  if (typeof valeur === 'string') {
    return valeur.toUpperCase();   // ici : forcément string
  }
  return valeur.toFixed(2);        // ici : forcément number
}
```

TypeScript suit ton raisonnement ligne par ligne. Chaque `if` réduit les possibilités.

## Les façons de vérifier

| Vérification | Pour | Exemple |
|---|---|---|
| `typeof` | textes, nombres, booléens | `typeof x === 'string'` |
| `=== null`, `!x` | valeur vide | `if (!film) return;` |
| `instanceof` | instance d'une classe | `e instanceof HttpErrorResponse` |
| `in` | présence d'un champ | `'message' in erreur` |
| champ étiquette | unions avec un `status` / `type` | `etat.status === 'success'` |
| `Array.isArray` | tableau | `Array.isArray(x)` |

## Le cas du quotidien : la valeur peut être vide

```ts
const film = films.find(f => f.id === 42);   // Film | undefined

film.titre;             // ❌ film peut être undefined

if (!film) {
  throw new Error('Film introuvable');
}
film.titre;             // ✅ après le if, film est forcément un Film

film?.titre;            // ou : undefined si film est vide
```

Ce schéma « on sort tôt si c'est vide » (*early return*) garde le code lisible.

## Le cas des unions avec étiquette

```ts
type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; films: Film[] };

if (etat.status === 'success') {
  etat.films;     // ✅ TypeScript sait qu'on est dans le cas success
}
```

Voir [[TS-07-Union-Intersection|Unions]].

## Ta propre vérification réutilisable

```ts
function estFilm(x: unknown): x is Film {
  return typeof x === 'object' && x !== null && 'titre' in x;
}

if (estFilm(donnee)) {
  donnee.titre;   // ✅
}
```

`x is Film` dit à TypeScript : « si je renvoie `true`, considère que c'est un Film ». Attention, TypeScript te **croit sur parole** : une vérification bâclée donne une fausse sécurité. Pour des données d'API, [[TS-19-Validation-Runtime-Zod|Zod]] fait ce travail sérieusement.

## Ne rien oublier dans un `switch`

```ts
switch (etat.status) {
  case 'loading': return '…';
  case 'error': return etat.message;
  case 'success': return etat.films.length;
  default: {
    const jamais: never = etat;   // ❌ erreur si tu ajoutes un cas sans le gérer
    return jamais;
  }
}
```

## Pièges

- **Forcer avec `as Film`** au lieu de vérifier : TypeScript se tait, mais le bug reste.
- **`typeof x === 'object'`** est aussi vrai pour `null`. Ajoute `x !== null`.
