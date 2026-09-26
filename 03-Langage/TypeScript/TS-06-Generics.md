---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Generics"
tags:
  - frontend/typescript/generics
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-04-Fonctions|Fonctions Typées]]"
  - "[[TS-03-Interfaces-Types|Interfaces et Types]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
---

# Generics

> [!abstract] En bref
> Un **generic** est un type « à trou », rempli au moment de l'utilisation. Il permet d'écrire **une seule** fonction ou interface qui marche pour des films, des utilisateurs ou des projets, sans perdre la vérification des types. Tu les utilises déjà : `Array<string>`, `Promise<Film>`, `signal<Movie[]>`.

## L'idée

Image : une **boîte avec une étiquette vide**. `Boite<T>` devient `Boite<Film>` ou `Boite<User>` selon ce que tu y mets, et TypeScript sait toujours ce qu'il y a dedans.

```ts
function premier<T>(liste: T[]): T | undefined {
  return liste[0];
}

premier([1, 2, 3]);           // T = number → renvoie number | undefined
premier(['a', 'b']);          // T = string
premier(films);               // T = Film
```

`<T>` (pour « Type ») est un **paramètre de type**, comme un paramètre de fonction mais pour un type. TypeScript le devine souvent tout seul.

Sans generic, il faudrait soit une fonction par type, soit `any` (et perdre toute vérification).

## Le cas le plus courant : les réponses d'API

```ts
interface Page<T> {
  items: T[];
  page: number;
  total: number;
}

const pageFilms: Page<Film> = { items: films, page: 1, total: 42 };
const pageUsers: Page<User> = { items: users, page: 1, total: 7 };
```

Et pour les états de chargement :

```ts
type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };

let etat: LoadState<Film[]> = { status: 'loading' };
```

## Contraindre le generic

Parfois, `T` doit avoir au moins certains champs :

```ts
function trouverParId<T extends { id: number }>(liste: T[], id: number): T | undefined {
  return liste.find(e => e.id === id);   // ✅ TypeScript sait que e.id existe
}
```

`T extends { id: number }` se lit : « n'importe quel type, **à condition** d'avoir un `id` numérique ».

## Où tu les croises

| Code | Le generic |
|---|---|
| `http.get<Movie[]>(url)` | Angular : la réponse sera un tableau de films |
| `signal<Movie[]>([])` | Angular : un signal qui contient des films |
| `ref<Project[]>([])` | Vue : une ref qui contient des projets |
| `Promise<Film>` | une Promise qui donnera un film |
| `Record<string, number>` | un objet dont les clés sont des textes et les valeurs des nombres |

## Pièges

- **Un `<T>` utilisé une seule fois** ne sert à rien : un type normal suffit.
- **`http.get<any>()`** : tu perds tout l'intérêt. Donne le vrai type.
- **Oublier la contrainte `extends`** puis lire `e.id` : TypeScript refuse, car rien ne garantit que `T` a un `id`.
