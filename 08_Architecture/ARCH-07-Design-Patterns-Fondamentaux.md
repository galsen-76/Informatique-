---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
aliases:
  - "Design Patterns Fondamentaux"
tags:
  - cs/architecture/design-patterns
parent: "[[Architecture Logicielle]]"
related_theory:
  - "[[ARCH-03-Architecture-en-Couches|Architecture en Couches]]"
  - "[[PY-05-POO-Classes|POO Classes Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://refactoring.guru/design-patterns"
---

# Design Patterns Fondamentaux

> [!abstract] En bref
> Un **design pattern** est une **solution connue** à un problème qui revient souvent. Pas du code à copier, plutôt une recette avec un nom : quand tu dis « on met un Adapter devant l'API TMDB », toute l'équipe comprend. Bonne nouvelle : Angular, Vue et NestJS en utilisent déjà beaucoup pour toi.

## Ceux que tu utilises déjà sans le savoir

| Pattern | Idée | Où tu le croises |
|---|---|---|
| **Injection de dépendances** | on reçoit ses outils au lieu de les fabriquer | `inject()` Angular, constructeurs NestJS |
| **Singleton** | un seul exemplaire partagé | service `providedIn: 'root'`, store Pinia |
| **Observer** | on s'abonne pour être prévenu des changements | RxJS, signals, `watch` Vue, événements DOM |
| **Decorator** | ajouter un comportement sans modifier la classe | `@Component`, `@Get`, `@UseGuards` |
| **Middleware / Chain of responsibility** | une chaîne d'étapes qui peuvent arrêter la requête | middlewares Express, intercepteurs HTTP |
| **Repository** | isoler l'accès aux données | `movies.repository.ts`, Prisma |
| **Facade** | une interface simple devant un système complexe | un store qui cache API + cache + état |

## Ceux à connaître

### Adapter (ou mapper) : isoler une API externe

```ts
// Le reste de l'app ne connaît que Movie ; si TMDB change, seul ce fichier bouge
export const toMovie = (dto: TmdbMovieDto): Movie => ({
  id: dto.id,
  title: dto.title,
  year: dto.release_date ? Number(dto.release_date.slice(0, 4)) : null,
});
```

### Strategy : changer de comportement sans `if` en cascade

```ts
type SortStrategy = (a: Movie, b: Movie) => number;

const strategies: Record<'rating' | 'year' | 'title', SortStrategy> = {
  rating: (a, b) => b.rating - a.rating,
  year: (a, b) => (b.year ?? 0) - (a.year ?? 0),
  title: (a, b) => a.title.localeCompare(b.title),
};

const sorted = movies.toSorted(strategies[sortBy]);
```

Ajouter un tri = ajouter une ligne, sans toucher au reste.

### Factory : centraliser la création

```ts
function createNotification(type: 'email' | 'push'): Notifier {
  return type === 'email' ? new EmailNotifier() : new PushNotifier();
}
```

Utile quand créer un objet demande des choix ou de la configuration (les `useFactory` de NestJS).

## Comment les utiliser

1. **Pars du problème**, pas du pattern : « le code de tri devient un gros `switch` » → Strategy.
2. **Le plus simple d'abord** : une fonction suffit souvent là où un livre proposerait trois classes.
3. **Nomme-les** dans le code et les revues : c'est un vocabulaire commun.

## Pièges

- **Placer des patterns partout** pour « faire pro » : le code devient abstrait et difficile à suivre.
- **Le Singleton global modifiable** de partout : difficile à tester. Préfère l'injection de dépendances.
