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
