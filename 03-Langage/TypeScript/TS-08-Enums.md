---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Enums"
tags:
  - frontend/typescript/enums
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/enums.html"
---

# Enums

> [!abstract] En bref
> Un `enum` donne des **noms** à une liste fixe de valeurs (`StatutFilm.Vu`). Tu en croiseras dans du code existant, mais aujourd'hui on préfère souvent une solution plus légère : le **type littéral** (`'a-voir' | 'vu'`).

## Un enum

```ts
enum StatutFilm {
  AVoir = 'A_VOIR',
  Vu = 'VU',
  Abandonne = 'ABANDONNE',
}

const statut = StatutFilm.Vu;   // 'VU'
if (statut === StatutFilm.Vu) { /* … */ }
```

Donne toujours une **valeur texte** à chaque membre. Sans valeur, TypeScript utilise 0, 1, 2… et tu verras des chiffres incompréhensibles dans les logs et la base de données.

## La solution plus simple : le type littéral

```ts
type StatutFilm = 'a-voir' | 'vu' | 'abandonne';

const statut: StatutFilm = 'vu';
```

| | `enum` | Type littéral |
|---|---|---|
| Autocomplétion | oui | oui |
| Code JavaScript généré | oui (un objet) | **aucun** |
| Valeur envoyée à l'API | `'VU'` | `'vu'` |
| Écriture | `StatutFilm.Vu` | `'vu'` |

**Mon conseil :** type littéral par défaut. Enum si ton équipe l'utilise déjà, ou si Prisma en génère un pour toi (les `enum` du schéma Prisma deviennent des types).

### Et si j'ai besoin de la liste des valeurs ?

Par exemple pour afficher les options d'un menu déroulant :

```ts
export const STATUTS = ['a-voir', 'vu', 'abandonne'] as const;
export type StatutFilm = (typeof STATUTS)[number];   // 'a-voir' | 'vu' | 'abandonne'

// dans le template : @for (s of STATUTS; track s) { <option>{{ s }}</option> }
```

Une seule source : le tableau sert à l'affichage, le type est calculé à partir de lui. `as const` est expliqué dans [[TS-16-Assertions-satisfies-unknown|Assertions, satisfies et unknown]].

## Pièges

- **Enum numérique** (sans valeurs) : `StatutFilm[1]` renvoie le nom `'Vu'`, un comportement surprenant.
- **`const enum`** pose problème avec certains outils de build (Vite, esbuild) : évite-le.
- **Une valeur venant de l'API** n'est pas forcément un membre valide de l'enum : valide-la (voir [[TS-19-Validation-Runtime-Zod|Zod]]).

## Exercices

### Exercice 1 · Remplacer un enum

Réécris cet enum avec un type littéral et une constante contenant la liste des valeurs (pour un menu déroulant).

```ts
enum SortBy {
  Popularity = 'popularity',
  Rating = 'rating',
  Date = 'date',
}
```

> [!success]- Solution
> ```ts
> const SORT_OPTIONS = ['popularity', 'rating', 'date'] as const;
> type SortBy = (typeof SORT_OPTIONS)[number];   // 'popularity' | 'rating' | 'date'
>
> let sort: SortBy = 'rating';   // ✅
> sort = 'title';                // ❌
> ```
>
> `SORT_OPTIONS` sert pour afficher les choix, `SortBy` pour typer.

### Exercice 2 · Le piège de l'enum numérique

Qu'affiche ce code ? Pourquoi est-ce risqué ?

```ts
enum Status { Draft, Published }
const s: Status = 42;
console.log(Status.Published);
```

> [!success]- Solution
> - `Status.Published` vaut **1** (les enums numériques commencent à 0).
> - `const s: Status = 42` est **accepté** par les anciennes versions de TypeScript, alors que 42 ne correspond à rien.
>
> Et si quelqu'un insère une valeur au début de l'enum, tous les numéros changent, y compris ceux déjà enregistrés en base. D'où la préférence pour les types littéraux en texte.
