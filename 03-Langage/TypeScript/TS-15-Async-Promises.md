---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Async/Await & Promises Typées"
tags:
  - frontend/typescript/async-promises
parent: "[[TypeScript]]"
related_theory:
  - "[[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]"
  - "[[TS-06-Generics|Generics]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/functions.html#promises"
---

# Async/Await & Promises Typées

> [!abstract] En bref
> Le fonctionnement d'`async` / `await` est expliqué dans [[JS-07-Promises-Async-Await|Promises et async/await]]. Ici : comment **typer** le code asynchrone, pour que TypeScript sache ce que contiendra la réponse une fois arrivée.

## Le type `Promise<T>`

`Promise<Film>` = « une Promise qui donnera un `Film` ».

```ts
async function chargerFilm(id: number): Promise<Film> {
  const r = await fetch(`/api/films/${id}`);
  if (!r.ok) throw new Error(`Erreur ${r.status}`);
  return r.json();   // ⚠️ r.json() renvoie any : TypeScript te croit sur parole
}

const film = await chargerFilm(42);   // film : Film
```

Une fonction `async` renvoie **toujours** une `Promise<…>`, même si tu écris `return 42` (→ `Promise<number>`).

## Le piège de `r.json()`

`r.json()` renvoie `any` : TypeScript accepte n'importe quoi. Si l'API renvoie autre chose que prévu, tu ne le sauras qu'au plantage. Deux niveaux de sécurité :

```ts
// 1. Minimum : typer la réponse (confiance aveugle)
const data = (await r.json()) as Film;

// 2. Sûr : valider la réponse avec Zod
const data = FilmSchema.parse(await r.json());   // plante proprement si la forme est fausse
```

Voir [[TS-19-Validation-Runtime-Zod|Zod]].

## Typer les erreurs

Dans un `catch`, l'erreur est de type `unknown` : il faut vérifier ce que c'est.

```ts
try {
  await chargerFilm(42);
} catch (e) {
  const message = e instanceof Error ? e.message : 'Erreur inconnue';
  console.error(message);
}
```

## Un type pratique pour les résultats

Plutôt que de lancer des erreurs, on peut renvoyer un résultat qui dit si ça a marché :

```ts
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

async function chargerFilmSur(id: number): Promise<Result<Film>> {
  try {
    return { ok: true, value: await chargerFilm(id) };
  } catch {
    return { ok: false, error: 'Film introuvable' };
  }
}

const res = await chargerFilmSur(42);
if (res.ok) console.log(res.value.titre);
else console.error(res.error);
```

## Pièges

- **Oublier `await`** : tu obtiens `Promise<Film>` au lieu de `Film`, et TypeScript te le signale dès que tu lis `.titre`.
- **Une fonction `async` passée à `forEach`** : rien n'est attendu. Utilise `for…of` ou `Promise.all`.
- **Promise « lâchée »** (appelée sans `await` ni `.catch`) : ses erreurs passent inaperçues. La règle ESLint `no-floating-promises` les repère.
