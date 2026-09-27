---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/typescript/assertions
aliases:
  - "Assertions satisfies et unknown"
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-09-Type-Narrowing|Type Narrowing]]"
  - "[[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html"
---

# Assertions satisfies et unknown

> [!abstract] En bref
> Trois outils qu'on confond souvent. `as` **force** TypeScript à te croire (dangereux). `satisfies` **vérifie** qu'une valeur respecte un type sans perdre sa précision (sûr). `unknown` veut dire « je ne sais pas encore, vérifie avant d'utiliser » (sûr). Et `as const` fige une valeur.

## `as` : « crois-moi »

```ts
const donnees = JSON.parse(texte) as Film;
donnees.titre.toUpperCase();   // compile… et plante si donnees n'a pas de titre
```

`as` ne vérifie **rien** : il fait taire TypeScript. À réserver aux cas où tu sais vraiment quelque chose que TypeScript ignore.

Encore pire : `x!` (« ce n'est pas null, promis ») et `as any`.

## `unknown` : « vérifie d'abord »

```ts
function afficher(valeur: unknown) {
  valeur.toUpperCase();                  // ❌ interdit
  if (typeof valeur === 'string') {
    valeur.toUpperCase();                // ✅ vérifié
  }
}
```

Utilise `unknown` pour tout ce qui vient de l'extérieur (API, `localStorage`, `JSON.parse`) : TypeScript t'oblige à vérifier avant d'utiliser.

## `satisfies` : « vérifie, mais garde les détails »

```ts
type Tech = 'vue' | 'angular' | 'nestjs';

const couleurs = {
  vue: '#42b883',
  angular: '#dd0031',
  nestjs: '#e0234e',
} satisfies Record<Tech, string>;
```

- Si tu oublies une techno ou fais une faute de frappe → **erreur**.
- `couleurs` garde son type précis : l'éditeur sait exactement quelles clés existent.

Avec `const couleurs: Record<Tech, string> = …`, tu aurais la vérification mais un type moins précis. Avec `as Record<Tech, string>`, tu n'aurais **même pas** la vérification.

## `as const` : figer une valeur

```ts
const ROLES = ['admin', 'editor', 'viewer'] as const;
type Role = (typeof ROLES)[number];   // 'admin' | 'editor' | 'viewer'
```

Sans `as const`, `ROLES` serait un simple `string[]`. Avec, TypeScript connaît chaque valeur exacte, et on en déduit un type. Une seule liste sert à l'affichage **et** au typage.

## Résumé

| Outil | Vérifie ? | Quand |
|---|---|---|
| `as Type` | non | rarement, en dernier recours |
| `x!` | non | presque jamais |
| `unknown` | oblige à vérifier | données externes |
| `satisfies Type` | oui | objets de configuration, tables de correspondance |
| `as const` | fige les valeurs | listes de valeurs fixes |

## Exercices

### Exercice 1 · `as` ou vérification ?

Quel est le risque de ce code ? Propose une version sûre.

```ts
const saved = JSON.parse(localStorage.getItem('user') ?? '{}') as { name: string };
saved.name.toUpperCase();
```

> [!success]- Solution
> `as` **ne vérifie rien** : si le stockage contient `{}`, `saved.name` vaut `undefined` et `toUpperCase()` plante.
>
> ```ts
> const saved: unknown = JSON.parse(localStorage.getItem('user') ?? '{}');
> if (typeof saved === 'object' && saved !== null && 'name' in saved && typeof saved.name === 'string') {
>   saved.name.toUpperCase();
> }
> ```
>
> (ou mieux : un schéma Zod.)

### Exercice 2 · Utiliser `satisfies`

Tu veux vérifier que cet objet associe bien chaque route à un titre (`Record<string, string>`) **sans perdre** l'autocomplétion des clés exactes. Que mets-tu ?

```ts
const pageTitles = {
  home: 'Accueil',
  movies: 'Films',
  favorites: 'Mes favoris',
};
```

> [!success]- Solution
> ```ts
> const pageTitles = {
>   home: 'Accueil',
>   movies: 'Films',
>   favorites: 'Mes favoris',
> } satisfies Record<string, string>;
>
> pageTitles.movies;   // ✅ autocomplétion
> pageTitles.foo;      // ❌ erreur : la clé n'existe pas
> ```
>
> Avec `: Record<string, string>`, `pageTitles.foo` serait accepté.
