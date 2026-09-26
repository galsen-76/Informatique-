---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M04
tags:
  - frameworks/angular/template-architecture
aliases:
  - "Template d'Architecture Angular"
parent: "[[Angular]]"
related_theory:
  - "[[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]]"
  - "[[ARCH-14-Architecture-Frontend|Architecture Frontend]]"
  - "[[ARCH-11-SOLID|SOLID]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/style-guide"
---

# Template d'Architecture Angular

> [!abstract] En bref
> La [[ARCH-15-Structure-de-Projet|structure de projet générale]] appliquée à Angular, avec le code de chaque couche. Garde-la comme point de départ et **adapte-la** : un petit projet n'a pas besoin de tous les dossiers.

## L'arborescence

```text
src/
├── app/
│   ├── core/
│   │   ├── config/app-config.ts        # InjectionToken : URL de l'API…
│   │   ├── http/api.interceptor.ts     # ajoute l'URL de base et le token
│   │   ├── http/error.interceptor.ts   # gère les erreurs HTTP au même endroit
│   │   └── layout/                     # shell (header, menu, footer), page 404
│   ├── shared/
│   │   ├── ui/                         # loader, empty-state, button…
│   │   ├── types/                      # Page<T>, LoadState<T>
│   │   └── utils/
│   ├── features/
│   │   └── movies/
│   │       ├── data/
│   │       │   ├── movie.model.ts
│   │       │   ├── movie.dto.ts
│   │       │   ├── movie.mapper.ts
│   │       │   ├── movies.api.ts
│   │       │   └── movies.store.ts
│   │       ├── components/             # movie-card, movie-grid
│   │       ├── pages/                  # movies-list.page.ts, movie-detail.page.ts
│   │       └── movies.routes.ts
│   ├── app.config.ts                   # providers globaux
│   ├── app.routes.ts                   # routes racines, lazy par feature
│   └── app.component.ts
├── environments/
└── styles/
```

Les tests `*.spec.ts` sont posés **à côté** du fichier testé.

## Le code de chaque couche

**1. Le modèle, le DTO et le mapper** : le reste de l'app ne voit jamais la forme brute de l'API.

```ts
// movie.dto.ts : exactement ce que renvoie TMDB
export interface MovieDto { id: number; title: string; poster_path: string | null; release_date: string; vote_average: number }

// movie.model.ts : ce dont l'app a besoin
export interface Movie { id: number; title: string; poster: string | null; year: number | null; rating: number }

// movie.mapper.ts : une fonction pure, facile à tester
export const toMovie = (dto: MovieDto, imageUrl: string): Movie => ({
  id: dto.id,
  title: dto.title,
  poster: dto.poster_path ? imageUrl + dto.poster_path : null,
  year: dto.release_date ? Number(dto.release_date.slice(0, 4)) : null,
  rating: Math.round(dto.vote_average * 10) / 10,
});
```

**2. L'API** : uniquement les appels HTTP + la conversion.

```ts
@Injectable({ providedIn: 'root' })
export class MoviesApi {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  popular(page = 1): Observable<Movie[]> {
    return this.http
      .get<{ results: MovieDto[] }>(`${this.config.apiUrl}/movie/popular`, { params: { page } })
      .pipe(map(r => r.results.map(d => toMovie(d, this.config.imageUrl))));
  }
}
```

**3. Le store** : l'état de la feature, modifiable seulement par ses méthodes.

```ts
@Injectable({ providedIn: 'root' })
export class MoviesStore {
  private api = inject(MoviesApi);
  readonly movies = signal<Movie[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    this.loading.set(true);
    this.api.popular().subscribe({
      next: movies => { this.movies.set(movies); this.loading.set(false); },
      error: () => { this.error.set('Impossible de charger les films'); this.loading.set(false); },
    });
  }
}
```

**4. Un composant d'affichage** : reçoit des données, émet des événements, n'injecte aucun service.

```ts
@Component({
  selector: 'app-movie-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <h3>{{ movie().title }}</h3>
      <p>{{ movie().year ?? '—' }} · ★ {{ movie().rating }}</p>
      <button type="button" (click)="favorite.emit(movie().id)">♡</button>
    </article>`,
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  favorite = output<number>();
}
```

**5. La page** : branche le store sur les composants.

```ts
@Component({
  imports: [MovieGridComponent, LoaderComponent, EmptyStateComponent],
  template: `
    @if (store.loading()) { <app-loader /> }
    @else if (store.error(); as e) { <app-empty-state [message]="e" /> }
    @else { <app-movie-grid [movies]="store.movies()" /> }`,
})
export class MoviesListPage {
  protected store = inject(MoviesStore);
  constructor() { this.store.load(); }
}
```

**6. Les routes** : chaque feature se charge seulement quand on y va (lazy loading).

```ts
// features/movies/movies.routes.ts
export default [
  { path: '', loadComponent: () => import('./pages/movies-list.page').then(m => m.MoviesListPage) },
  { path: ':id', loadComponent: () => import('./pages/movie-detail.page').then(m => m.MovieDetailPage) },
] satisfies Routes;

// app.routes.ts
export const routes: Routes = [
  { path: 'movies', loadChildren: () => import('./features/movies/movies.routes') },
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { path: '**', loadComponent: () => import('./core/layout/not-found.page').then(m => m.NotFoundPage) },
];
```

## Les alias d'import

Dans `tsconfig.json`, pour écrire `@core/…` au lieu de `../../../core/…` :

```json
"paths": {
  "@core/*": ["src/app/core/*"],
  "@shared/*": ["src/app/shared/*"],
  "@features/*": ["src/app/features/*"]
}
```

## Pièges

- **Un composant d'affichage qui injecte un service HTTP** : il devient impossible à réutiliser et à tester simplement.
- **Deux features qui s'importent l'une l'autre** : déplace le code commun dans `shared/`.
- **Des dossiers vides « pour plus tard »** : crée-les le jour où tu en as besoin.
