---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M03
tags:
  - frontend/typescript/patterns
aliases:
  - "Patterns TypeScript Professionnels"
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-13-Types-Avances|Types Avancés TypeScript]]"
  - "[[TS-07-Union-Intersection|Union & Intersection Types]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking"
---

# Patterns TypeScript Professionnels

> [!abstract] En bref
> Quatre façons d'utiliser les types pour **rendre les bugs impossibles** plutôt que de les corriger après coup. Ce sont elles qui font la différence entre du TypeScript « qui compile » et du TypeScript qui protège vraiment.

## 1. Décrire les états avec une union étiquetée

Le pattern le plus utile de tous. Au lieu de :

```ts
// ❌ 8 combinaisons possibles, dont des absurdes (loading ET error)
let loading = false;
let error: string | null = null;
let data: Film[] | null = null;
```

On écrit :

```ts
// ✅ exactement 4 états, impossibles à mélanger
type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };
```

```html
<!-- Angular -->
@switch (state().status) {
  @case ('loading') { <app-loader /> }
  @case ('error') { <app-empty-state [message]="state().message" /> }
  @case ('success') { <app-movie-grid [movies]="state().data" /> }
}
```

## 2. Vérifier qu'on n'a oublié aucun cas

```ts
function libelle(s: LoadState<Film[]>): string {
  switch (s.status) {
    case 'idle': return '';
    case 'loading': return 'Chargement…';
    case 'error': return s.message;
    case 'success': return `${s.data.length} films`;
    default: {
      const oubli: never = s;   // erreur de compilation si un cas manque
      return oubli;
    }
  }
}
```

Le jour où tu ajoutes un état `'empty'`, TypeScript te montre tous les `switch` à compléter.

## 3. Une seule source de vérité

Déduire les types des valeurs plutôt que de les écrire deux fois :

```ts
export const TECHS = ['vue', 'angular', 'nestjs'] as const;
export type Tech = (typeof TECHS)[number];

// Avec Zod : le schéma valide ET donne le type
export const ProjectSchema = z.object({ slug: z.string(), techs: z.array(z.enum(TECHS)) });
export type Project = z.infer<typeof ProjectSchema>;
```

## 4. Ne pas confondre deux identifiants

Un `filmId` et un `userId` sont tous les deux des `number`. Rien n'empêche de les inverser… sauf un type « marqué » :

```ts
type FilmId = number & { readonly __marque: 'FilmId' };
type UserId = number & { readonly __marque: 'UserId' };

function ajouterFavori(user: UserId, film: FilmId) { /* … */ }

ajouterFavori(filmId, userId);   // ❌ erreur : ordre inversé détecté
```

Utile quand une erreur coûte cher (argent, droits). À ne pas mettre partout.

## Le principe derrière

> **Rendre les états impossibles… impossibles à écrire.**

Si le type autorise une situation absurde, un jour elle arrivera. Si le type l'interdit, elle ne peut pas arriver.
