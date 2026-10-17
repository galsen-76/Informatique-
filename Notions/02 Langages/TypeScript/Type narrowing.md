---
type: notion
statut: a apprendre
resume: "Quand une variable peut être de plusieurs types (string | number, Film | null), TypeScript ne te laisse pas l'utiliser librement."
revu:
sources:
  - "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
---
# Type narrowing

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Quand une variable peut être de plusieurs types (`string | number`, `Film | null`), TypeScript ne te laisse pas l'utiliser librement.

## Le problème

**Pourquoi c'est utile ?**
Pour vérifier ce que contient une variable à plusieurs types avant de l'utiliser en toute sécurité.

**Qu'est-ce qui se passait sans ça ?**
On utilisait une valeur qui pouvait être null ou d'un autre type : « cannot read property of null » à l'exécution.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Il faut d'abord **vérifier** ce qu'elle contient. Après la vérification, TypeScript « rétrécit » (*narrow*) le type : il sait exactement ce qu'il y a dedans.

### L'idée

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

### Les façons de vérifier

| Vérification | Pour | Exemple |
|---|---|---|
| `typeof` | textes, nombres, booléens | `typeof x === 'string'` |
| `=== null`, `!x` | valeur vide | `if (!film) return;` |
| `instanceof` | instance d'une classe | `e instanceof HttpErrorResponse` |
| `in` | présence d'un champ | `'message' in erreur` |
| champ étiquette | unions avec un `status` / `type` | `etat.status === 'success'` |
| `Array.isArray` | tableau | `Array.isArray(x)` |

### Le cas des unions avec étiquette

```ts
type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; films: Film[] };

if (etat.status === 'success') {
  etat.films;     // ✅ TypeScript sait qu'on est dans le cas success
}
```

Voir [[Union et intersection|Unions]].

### Ta propre vérification réutilisable

```ts
function estFilm(x: unknown): x is Film {
  return typeof x === 'object' && x !== null && 'titre' in x;
}

if (estFilm(donnee)) {
  donnee.titre;   // ✅
}
```

`x is Film` dit à TypeScript : « si je renvoie `true`, considère que c'est un Film ». Attention, TypeScript te **croit sur parole** : une vérification bâclée donne une fausse sécurité. Pour des données d'API, [[Validation runtime avec Zod|Zod]] fait ce travail sérieusement.

### Ne rien oublier dans un `switch`

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

## 🧪 Exemple

### Le cas du quotidien : la valeur peut être vide

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

## ⚠️ Limites et pièges

- **Forcer avec `as Film`** au lieu de vérifier : TypeScript se tait, mais le bug reste.
- **`typeof x === 'object'`** est aussi vrai pour `null`. Ajoute `x !== null`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Gérer la valeur vide

`poster_path` est `string | null`. Écris `posterUrl(movie: Movie): string` qui renvoie l'URL de l'affiche, ou `'/assets/no-poster.png'` si elle est absente.

> [!success]- Solution
> ```ts
> function posterUrl(movie: Movie): string {
>   if (movie.poster_path === null) return '/assets/no-poster.png';
>   return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;   // ici c'est forcément un string
> }
> ```
>
> Après le `if … return`, TypeScript **rétrécit** le type à `string`.

#### Exercice 2 · Écrire une vérification réutilisable

Écris une fonction `isMovie(value: unknown): value is Movie` qui vérifie qu'un objet a un `id` (nombre) et un `title` (texte).

> [!success]- Solution
> ```ts
> function isMovie(value: unknown): value is Movie {
>   return (
>     typeof value === 'object' &&
>     value !== null &&
>     typeof (value as Movie).id === 'number' &&
>     typeof (value as Movie).title === 'string'
>   );
> }
>
> const data: unknown = JSON.parse(text);
> if (isMovie(data)) {
>   data.title;   // ✅ TypeScript sait que c'est un Movie
> }
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux TypeScript]]
- **Voir aussi :** [[Union et intersection]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/docs/handbook/2/narrowing.html
