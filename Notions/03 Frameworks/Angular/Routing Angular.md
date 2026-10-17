---
type: notion
statut: a apprendre
resume: "Le routeur affiche le bon écran selon l'URL : /movies montre la liste, /movies/27205 la fiche d'Inception."
revu:
sources:
  - "https://angular.dev/guide/routing"
---
# Routing Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le routeur affiche le bon écran selon l'URL : `/movies` montre la liste, `/movies/27205` la fiche d'Inception.

## Le problème

**Pourquoi c'est utile ?**
Pour afficher le bon écran selon l'URL, sans recharger la page.

**Qu'est-ce qui se passait sans ça ?**
Chaque page était un fichier HTML séparé, avec un rechargement complet à chaque clic et un état perdu.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Il est intégré à Angular. Tu déclares une liste de routes, tu places une zone d'affichage `<router-outlet>`, et tu navigues avec `routerLink`.

### Déclarer les routes

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

### Lire le paramètre de l'URL

Grâce à `withComponentInputBinding()`, le paramètre arrive directement en **input** :

```ts
export class MovieDetailPage {
  id = input.required<string>();              // /movies/27205 → id() = '27205'
  private api = inject(MoviesApi);
  movie = httpResource<Movie>(() => `/api/movies/${this.id()}`);   // se recharge si l'id change
}
```

Les paramètres de recherche (`/movies?page=2`) arrivent aussi en input : `page = input<string>()`.

### Organiser les routes par feature

```ts
// features/movies/movies.routes.ts
export default [
  { path: '', loadComponent: () => import('./pages/movies-list.page').then(m => m.MoviesListPage) },
  { path: ':id', loadComponent: () => import('./pages/movie-detail.page').then(m => m.MovieDetailPage) },
] satisfies Routes;

// app.routes.ts
{ path: 'movies', loadChildren: () => import('./features/movies/movies.routes') }
```

Protéger une route (connexion obligatoire) : [[Guards resolvers et intercepteurs Angular|Guards]].

## 🧪 Exemple

### Afficher la page et naviguer

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

## ⚠️ Limites et pièges

- **Oublier `pathMatch: 'full'`** sur la redirection de `''` : boucle ou redirection partout.
- **La route `**` pas en dernier** : elle attrape tout ce qui suit.
- **Page 404 du serveur** en rafraîchissant `/movies/12` : l'hébergeur doit renvoyer `index.html` pour toutes les URL.
- **Un `href` classique** au lieu de `routerLink` : toute l'application se recharge.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Déclarer les routes

Écris les routes : `/` (films populaires), `/movies/:id` (fiche), `/favorites`, et une page 404 pour tout le reste. Les pages sont chargées à la demande.

> [!success]- Solution
> ```ts
> export const routes: Routes = [
>   { path: '', loadComponent: () => import('./features/movies/pages/movies-page').then((m) => m.MoviesPage) },
>   { path: 'movies/:id', loadComponent: () => import('./features/movies/pages/movie-details-page').then((m) => m.MovieDetailsPage) },
>   { path: 'favorites', loadComponent: () => import('./features/account/pages/favorites-page').then((m) => m.FavoritesPage) },
>   { path: '**', loadComponent: () => import('./core/layout/not-found').then((m) => m.NotFound) },
> ];
> ```
>
> La route `**` doit être **la dernière** : elle attrape tout.

#### Exercice 2 · Lire l'id de l'URL

Sur la page `/movies/:id`, récupère l'`id` sous forme d'input du composant. Que faut-il activer dans la configuration ? Et comment faire un lien vers une fiche depuis une carte ?

> [!success]- Solution
> ```ts
> // app.config.ts
> provideRouter(routes, withComponentInputBinding())
> ```
>
> ```ts
> export class MovieDetailsPage {
>   id = input.required<string>();   // rempli automatiquement depuis :id
> }
> ```
>
> ```html
> <a [routerLink]="['/movies', movie().id]">{{ movie().title }}</a>
> ```
>
> (`RouterLink` à importer dans le composant.)

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/routing
