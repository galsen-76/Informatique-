---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M04
aliases:
  - "HTTP & Communication Serveur Angular"
tags:
  - frameworks/angular/http
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/http"
---

# HTTP & Communication Serveur Angular

> [!abstract] En bref
> `HttpClient` est l'outil intégré d'Angular pour appeler une API. Chaque appel renvoie un **Observable**. On range les appels dans un service `xxx.api.ts`, on convertit les réponses en modèles, et on gère chargement et erreurs. Cas concret : appeler l'API TMDB pour CinéTrack.

## Activer HttpClient

```ts
// app.config.ts
providers: [
  provideHttpClient(withFetch(), withInterceptors([apiInterceptor, errorInterceptor])),
]
```

## Le service API

```ts
// features/movies/data/movies.api.ts
@Injectable({ providedIn: 'root' })
export class MoviesApi {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  popular(page = 1): Observable<Movie[]> {
    return this.http
      .get<TmdbPage<MovieDto>>(`${this.config.apiUrl}/movie/popular`, { params: { page, language: 'fr-FR' } })
      .pipe(map(r => r.results.map(d => toMovie(d, this.config.imageUrl))));
  }

  details(id: number): Observable<Movie> {
    return this.http
      .get<MovieDto>(`${this.config.apiUrl}/movie/${id}`)
      .pipe(map(d => toMovie(d, this.config.imageUrl)));
  }
}
```

- `get<MovieDto>` : on indique à TypeScript la forme de la réponse (il ne la vérifie pas : voir [[TS-19-Validation-Runtime-Zod|Zod]]).
- `toMovie` : la conversion DTO → modèle (voir [[ANG-30-Template-Architecture-Angular|architecture]]).

| Méthode | Pour |
|---|---|
| `http.get<T>(url, { params })` | lire |
| `http.post<T>(url, body)` | créer |
| `http.put<T>` / `patch<T>` | modifier |
| `http.delete(url)` | supprimer |

## Utiliser la réponse dans une page

**Façon moderne : `httpResource`** (état de chargement et d'erreur inclus)

```ts
export class MovieDetailPage {
  id = input.required<string>();
  private config = inject(APP_CONFIG);
  movie = httpResource<MovieDto>(() => `${this.config.apiUrl}/movie/${this.id()}`);   // se recharge quand id change
}
```

```html
@if (movie.isLoading()) { <app-loader /> }
@else if (movie.error()) { <p>Film introuvable.</p> }
@else if (movie.value(); as m) { <h1>{{ m.title }}</h1> }
```

**Façon classique : un store qui s'abonne** (voir le store de [[ANG-30-Template-Architecture-Angular|l'architecture]]), ou `toSignal(this.api.popular())`.

## La clé d'API TMDB : les intercepteurs

Un **intercepteur** modifie **toutes** les requêtes au même endroit :

```ts
// core/http/api.interceptor.ts
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(APP_CONFIG);
  if (!req.url.startsWith(config.apiUrl)) return next(req);
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${config.tmdbToken}` } }));
};
```

> [!warning] Clé visible
> Tout ce qui est dans le front est **visible** par les utilisateurs. Pour un projet perso, la clé en lecture seule de TMDB est acceptable. Dans CinéTrack-API, les appels passeront par ton serveur pour la cacher.

Détails des intercepteurs : [[ANG-21-Guards-Resolvers-Intercepteurs|Guards et intercepteurs]].

## Gérer les erreurs

```ts
this.api.popular().pipe(
  catchError(() => {
    this.error.set('Impossible de charger les films');
    return of([]);                     // valeur de secours
  }),
);
```

| Code | Réaction |
|---|---|
| 401 | rediriger vers la connexion |
| 404 | afficher « introuvable » |
| 429 (TMDB) | trop de requêtes : attendre |
| 500 / réseau | message + bouton « réessayer » |

## Pièges

- **Pas de `subscribe`** (ni `toSignal`, ni `async`) : la requête n'est jamais envoyée.
- **L'URL de l'API en dur** dans chaque service : utilise la configuration (`environment` / `APP_CONFIG`).
- **Appeler l'API dans un composant d'affichage** : garde les appels dans `data/`.
