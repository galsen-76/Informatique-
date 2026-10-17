---
type: notion
statut: a apprendre
resume: "Le fonctionnement d'async / await est expliqué dans Promises et async/await."
revu:
sources:
  - "https://www.typescriptlang.org/docs/handbook/2/functions.html#promises"
---
# Async await et promises typées

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le fonctionnement d'`async` / `await` est expliqué dans [[Promises et async await JavaScript|Promises et async/await]].

## Le problème

**Pourquoi c'est utile ?**
Pour que TypeScript sache ce que contiendra une réponse asynchrone une fois arrivée.

**Qu'est-ce qui se passait sans ça ?**
Le résultat d'un fetch était de type any : aucune aide de l'éditeur et des erreurs à l'exécution.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Ici : comment **typer** le code asynchrone, pour que TypeScript sache ce que contiendra la réponse une fois arrivée.

### Le type `Promise<T>`

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

### Typer les erreurs

Dans un `catch`, l'erreur est de type `unknown` : il faut vérifier ce que c'est.

```ts
try {
  await chargerFilm(42);
} catch (e) {
  const message = e instanceof Error ? e.message : 'Erreur inconnue';
  console.error(message);
}
```

### Un type pratique pour les résultats

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

## 🧪 Exemple

### Le piège de `r.json()`

`r.json()` renvoie `any` : TypeScript accepte n'importe quoi. Si l'API renvoie autre chose que prévu, tu ne le sauras qu'au plantage. Deux niveaux de sécurité :

```ts
// 1. Minimum : typer la réponse (confiance aveugle)
const data = (await r.json()) as Film;

// 2. Sûr : valider la réponse avec Zod
const data = FilmSchema.parse(await r.json());   // plante proprement si la forme est fausse
```

Voir [[Validation runtime avec Zod|Zod]].

## ⚠️ Limites et pièges

- **Oublier `await`** : tu obtiens `Promise<Film>` au lieu de `Film`, et TypeScript te le signale dès que tu lis `.titre`.
- **Une fonction `async` passée à `forEach`** : rien n'est attendu. Utilise `for…of` ou `Promise.all`.
- **Promise « lâchée »** (appelée sans `await` ni `.catch`) : ses erreurs passent inaperçues. La règle ESLint `no-floating-promises` les repère.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Typer une fonction asynchrone

Type cette fonction pour qu'elle renvoie une promesse de `Paginated<Movie>`, avec une erreur si la réponse n'est pas OK.

```ts
async function searchMovies(query) {
  const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  return res.json();
}
```

> [!success]- Solution
> ```ts
> async function searchMovies(query: string): Promise<Paginated<Movie>> {
>   const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
>   if (!res.ok) throw new Error(`Erreur ${res.status}`);
>   return res.json() as Promise<Paginated<Movie>>;
> }
> ```
>
> `res.json()` renvoie `Promise<any>` : le type annoncé est une promesse faite par toi, pas une vérification.

#### Exercice 2 · Le type de l'erreur

Pourquoi TypeScript refuse-t-il `err.message` ici ? Corrige.

```ts
try {
  await searchMovies('dune');
} catch (err) {
  console.error(err.message);
}
```

> [!success]- Solution
> Dans un `catch`, `err` est de type `unknown` : on peut lancer n'importe quoi (`throw 'texte'`), pas forcément une `Error`.
>
> ```ts
> catch (err) {
>   const message = err instanceof Error ? err.message : String(err);
>   console.error(message);
> }
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux TypeScript]]
- **Voir aussi :** [[Synchrone vs asynchrone]], [[Generics]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/docs/handbook/2/functions.html#promises
