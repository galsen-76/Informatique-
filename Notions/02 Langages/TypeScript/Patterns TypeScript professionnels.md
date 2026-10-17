---
type: notion
statut: a apprendre
resume: "Quatre façons d'utiliser les types pour rendre les bugs impossibles plutôt que de les corriger après coup."
revu:
sources:
  - "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking"
---
# Patterns TypeScript professionnels

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Quatre façons d'utiliser les types pour **rendre les bugs impossibles** plutôt que de les corriger après coup.

## Le problème

**Pourquoi c'est utile ?**
Pour utiliser les types de façon à rendre certains bugs impossibles.

**Qu'est-ce qui se passait sans ça ?**
Le code « compilait » mais laissait passer des états impossibles (chargé et en erreur en même temps).

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Ce sont elles qui font la différence entre du TypeScript « qui compile » et du TypeScript qui protège vraiment.

### 1. Décrire les états avec une union étiquetée

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

### 2. Vérifier qu'on n'a oublié aucun cas

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

### 3. Une seule source de vérité

Déduire les types des valeurs plutôt que de les écrire deux fois :

```ts
export const TECHS = ['vue', 'angular', 'nestjs'] as const;
export type Tech = (typeof TECHS)[number];

// Avec Zod : le schéma valide ET donne le type
export const ProjectSchema = z.object({ slug: z.string(), techs: z.array(z.enum(TECHS)) });
export type Project = z.infer<typeof ProjectSchema>;
```

### 4. Ne pas confondre deux identifiants

Un `filmId` et un `userId` sont tous les deux des `number`. Rien n'empêche de les inverser… sauf un type « marqué » :

```ts
type FilmId = number & { readonly __marque: 'FilmId' };
type UserId = number & { readonly __marque: 'UserId' };

function ajouterFavori(user: UserId, film: FilmId) { /* … */ }

ajouterFavori(filmId, userId);   // ❌ erreur : ordre inversé détecté
```

Utile quand une erreur coûte cher (argent, droits). À ne pas mettre partout.

### Le principe derrière

> **Rendre les états impossibles… impossibles à écrire.**

Si le type autorise une situation absurde, un jour elle arrivera. Si le type l'interdit, elle ne peut pas arriver.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- 

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Ne rien oublier

Ajoute un état `{ status: 'empty' }` à `LoadState`. Comment faire pour que TypeScript t'oblige à gérer ce nouveau cas dans tous les `switch` existants ?

> [!success]- Solution
> Ajouter un cas `default` qui assigne l'état à `never` :
>
> ```ts
> function render(state: LoadState): string {
>   switch (state.status) {
>     case 'loading': return 'Chargement…';
>     case 'success': return `${state.movies.length} films`;
>     case 'error': return state.message;
>     default: {
>       const unhandled: never = state;   // ❌ erreur tant que 'empty' n'est pas traité
>       return unhandled;
>     }
>   }
> }
> ```

#### Exercice 2 · Ne pas confondre deux ids

Un `movieId` et un `userId` sont tous les deux des `number` : on peut les inverser sans erreur. Crée deux types « marqués » pour que `addFavorite(userId, movieId)` refuse l'inversion.

> [!success]- Solution
> ```ts
> type MovieId = number & { readonly __brand: 'MovieId' };
> type UserId = number & { readonly __brand: 'UserId' };
>
> const asMovieId = (n: number) => n as MovieId;
> const asUserId = (n: number) => n as UserId;
>
> function addFavorite(userId: UserId, movieId: MovieId) {}
>
> const u = asUserId(1);
> const m = asMovieId(438631);
> addFavorite(u, m);   // ✅
> addFavorite(m, u);   // ❌ erreur
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux TypeScript]]
- **Voir aussi :** [[Types avancés]], [[Union et intersection]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
