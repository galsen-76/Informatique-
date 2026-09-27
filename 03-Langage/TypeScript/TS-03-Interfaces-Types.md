---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Interfaces & Types (Type Aliases)"
tags:
  - frontend/typescript/interfaces-types
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/objects.html"
---

# Interfaces & Types (Type Aliases)

> [!abstract] En bref
> Une **interface** décrit la forme d'un objet : quels champs il doit avoir et de quel type. C'est un **moule** : tout objet qui ne rentre pas dedans est refusé. Tu en écriras pour chaque donnée de tes projets (un film, un projet, un utilisateur).

## Décrire un objet

```ts
interface Film {
  readonly id: number;      // ne peut plus changer après création
  titre: string;
  annee: number;
  realisateur?: string;     // ? = optionnel
}

const film: Film = { id: 1, titre: 'Inception', annee: 2010 };   // ✅
const faux: Film = { id: 2, titre: 'Dune' };                     // ❌ annee manquante
film.id = 5;                                                     // ❌ readonly
```

| Syntaxe | Sens |
|---|---|
| `titre: string` | obligatoire |
| `realisateur?: string` | optionnel (peut être absent) |
| `readonly id: number` | ne peut pas être modifié |
| `genres: string[]` | une liste |
| `note: number \| null` | un nombre ou vide |

## Réutiliser et étendre

```ts
interface FilmDetaille extends Film {
  synopsis: string;
  duree: number;
}
```

`FilmDetaille` a tous les champs de `Film`, plus les siens.

## `interface` ou `type` ?

Les deux décrivent un objet de la même façon :

```ts
interface Film { titre: string }
type Film = { titre: string };
```

**Règle simple :**
- `interface` pour décrire un **objet**.
- `type` pour tout le reste : une liste de valeurs (`'vu' | 'a-voir'`), une combinaison, un alias.

```ts
type StatutFilm = 'a-voir' | 'vu';      // impossible avec interface
type Id = number | string;
```

## Dans tes projets

Tu créeras un fichier de modèle par donnée, par exemple `movie.model.ts` ou `project.model.ts` (voir [[ARCH-15-Structure-de-Projet|Structure de projet]]) :

```ts
export type Tech = 'vue' | 'angular' | 'nestjs';

export interface Project {
  slug: string;
  title: string;
  techs: Tech[];
  demoUrl?: string;
}
```

## Pièges

- **`readonly` ne protège que le premier niveau** : les objets imbriqués restent modifiables.
- **Préfixer par `I`** (`IFilm`) : habitude d'autres langages, pas utilisée en TypeScript / Angular.
- **Une propriété en trop** dans un objet écrit directement est refusée : c'est TypeScript qui te signale une probable faute de frappe.

## Exercices

### Exercice 1 · Décrire un film TMDB

Écris l'interface `Movie` pour cet objet. `overview` peut être absent, `poster_path` peut valoir `null`.

```json
{ "id": 438631, "title": "Dune", "release_date": "2021-09-15", "vote_average": 7.8, "poster_path": null, "genre_ids": [878, 12] }
```

> [!success]- Solution
> ```ts
> interface Movie {
>   id: number;
>   title: string;
>   release_date: string;
>   vote_average: number;
>   poster_path: string | null;
>   genre_ids: number[];
>   overview?: string;
> }
> ```
>
> `?` = le champ peut être absent ; `| null` = le champ est présent mais peut valoir `null`.

### Exercice 2 · Étendre un type

À partir de `Movie`, crée `MovieDetails` qui ajoute `runtime` (nombre) et `genres` (liste d'objets `{ id, name }`), sans recopier les champs de `Movie`.

> [!success]- Solution
> ```ts
> interface Genre {
>   id: number;
>   name: string;
> }
>
> interface MovieDetails extends Movie {
>   runtime: number;
>   genres: Genre[];
> }
>
> // ou avec type :
> type MovieDetails2 = Movie & { runtime: number; genres: Genre[] };
> ```
