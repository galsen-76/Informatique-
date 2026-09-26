---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Routing Angular"
tags:
  - frameworks/angular/routing
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/routing"
---

# Routing Angular

> [!abstract] En bref
> Le routeur affiche le bon écran selon l'URL : `/movies` montre la liste, `/movies/27205` la fiche d'Inception. Il est intégré à Angular. Tu déclares une liste de routes, tu places une zone d'affichage `<router-outlet>`, et tu navigues avec `routerLink`.

## Déclarer les routes

```ts
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  {
    path: 'movies',
    loadComponent: () => import('./features/movies/pages/movies-list.page').then(m => m.MoviesListPage),
    title: 'Films populaires',                  // titre de l'onglet
  },
  {
    path: 'movies/:id',                         // :id = partie variable
    loadComponent: () => import('./features/movies/pages/movie-detail.page').then(m => m.MovieDetailPage),
  },
  { path: '**', loadComponent: () => import('./core/layout/not-found.page').then(m => m.NotFoundPage) },
];
```

```ts
// app.config.ts
providers: [provideRouter(routes, withComponentInputBinding())]
```

`loadComponent` = la page est téléchargée **seulement quand on y va** (lazy loading).

## Afficher la page et naviguer

```ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/movies" routerLinkActive="active">Films</a>
      <a routerLink="/favorites" routerLinkActive="active">Favoris</a>
    </nav>
    <router-outlet />           <!-- la page de la route s'affiche ici -->
  `,
})
export class AppComponent {}
```

```html
<a [routerLink]="['/movies', movie().id]">Voir la fiche</a>
```

En TypeScript :

```ts
private router = inject(Router);
this.router.navigate(['/movies', id]);
```

## Lire le paramètre de l'URL

Grâce à `withComponentInputBinding()`, le paramètre arrive directement en **input** :

```ts
export class MovieDetailPage {
  id = input.required<string>();              // /movies/27205 → id() = '27205'
  private api = inject(MoviesApi);
  movie = httpResource<Movie>(() => `/api/movies/${this.id()}`);   // se recharge si l'id change
}
```

Les paramètres de recherche (`/movies?page=2`) arrivent aussi en input : `page = input<string>()`.

## Organiser les routes par feature

```ts
// features/movies/movies.routes.ts
export default [
  { path: '', loadComponent: () => import('./pages/movies-list.page').then(m => m.MoviesListPage) },
  { path: ':id', loadComponent: () => import('./pages/movie-detail.page').then(m => m.MovieDetailPage) },
] satisfies Routes;

// app.routes.ts
{ path: 'movies', loadChildren: () => import('./features/movies/movies.routes') }
```

Protéger une route (connexion obligatoire) : [[ANG-21-Guards-Resolvers-Intercepteurs|Guards]].

## Pièges

- **Oublier `pathMatch: 'full'`** sur la redirection de `''` : boucle ou redirection partout.
- **La route `**` pas en dernier** : elle attrape tout ce qui suit.
- **Page 404 du serveur** en rafraîchissant `/movies/12` : l'hébergeur doit renvoyer `index.html` pour toutes les URL.
- **Un `href` classique** au lieu de `routerLink` : toute l'application se recharge.
