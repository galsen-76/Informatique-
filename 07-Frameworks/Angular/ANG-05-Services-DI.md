---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Services & Injection de Dépendances (DI) Angular"
tags:
  - frameworks/angular/services-di
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/di"
---

# Services & Injection de Dépendances (DI) Angular

> [!abstract] En bref
> Un **service** est une classe qui contient une logique partagée : les appels à TMDB, la liste des favoris, l'utilisateur connecté. L'**injection de dépendances** (DI), c'est Angular qui **te fournit** le service quand tu le demandes avec `inject()`, au lieu que tu le crées toi-même.

## L'image

Au restaurant, tu ne vas pas en cuisine chercher ton plat : tu **demandes**, et on te l'apporte. Avec la DI, un composant dit « j'ai besoin de `MoviesApi` », et Angular le lui apporte, déjà prêt.

## Créer et utiliser un service

```ts
// features/favorites/data/favorites.store.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })        // un seul exemplaire pour toute l'app
export class FavoritesStore {
  private readonly ids = signal<number[]>([]);

  readonly count = computed(() => this.ids().length);
  has = (id: number) => this.ids().includes(id);

  toggle(id: number) {
    this.ids.update(list => list.includes(id) ? list.filter(x => x !== id) : [...list, id]);
  }
}
```

```ts
// n'importe quel composant
export class MovieCardComponent {
  protected favorites = inject(FavoritesStore);   // Angular le fournit
}
```

```html
<button type="button" (click)="favorites.toggle(movie().id)">
  {{ favorites.has(movie().id) ? '♥' : '♡' }}
</button>
```

**`providedIn: 'root'`** = un seul exemplaire partagé par toute l'application. Le compteur de favoris de l'en-tête et le bouton de la carte voient **les mêmes données**.

## Pourquoi c'est utile

- **Partager** : une seule source de données pour plusieurs composants.
- **Séparer** : le composant affiche, le service fait le travail.
- **Tester** : dans un test, on remplace facilement le vrai service par un faux (voir [[ANG-14-Tests|Tests]]).

## `inject()` ou le constructeur ?

```ts
// Moderne (recommandé)
private api = inject(MoviesApi);

// Ancien (tu le verras dans du code existant)
constructor(private api: MoviesApi) {}
```

Les deux font la même chose.

## Fournir une configuration

```ts
// core/config/app-config.ts
export interface AppConfig { apiUrl: string; imageUrl: string }
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// app.config.ts
providers: [{ provide: APP_CONFIG, useValue: environment }]

// dans un service
private config = inject(APP_CONFIG);
```

Aucune URL en dur dans les services.

## Un service par exemplaire de composant

Rarement, on veut un service **propre à un composant** (et à ses enfants) :

```ts
@Component({ providers: [MovieFormState] })   // un nouvel exemplaire pour chaque formulaire
```

## Pièges

- **`inject()` en dehors d'un constructeur ou d'une propriété** (dans une méthode appelée plus tard) : erreur. Appelle-le au moment de la création.
- **Un service qui fait tout** (API + état + formatage) : sépare en `movies.api.ts` et `movies.store.ts` (voir [[ANG-30-Template-Architecture-Angular|architecture]]).
- **Oublier `providedIn: 'root'`** : erreur « No provider for… ».
