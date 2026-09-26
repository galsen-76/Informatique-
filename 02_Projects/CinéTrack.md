---
created: 2026-09-24
modified: 2026-09-24
type: project
status: "🔴 Not Started"
tags:
  - projet
aliases:
  - "CinéTrack"
---

## Prérequis

> [!warning] Avant de démarrer
> Le Portfolio terminé (tu sais déjà structurer un projet front typé) + les bases HTTP et asynchrones.

**À maîtriser avant de commencer :**
- [[Portfolio]]
- [[TS-06-Generics|Generics]]
- [[TS-09-Type-Narrowing|Type Narrowing]]
- [[TS-10-Utility-Types|Utility Types]]
- [[JS-06-Event-Loop|Event Loop JavaScript]]
- [[JS-07-Promises-Async-Await|Promises et Async Await JavaScript]]
- [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]
- [[NET-05-HTTP-Approfondi|HTTP Approfondi]]
- [[SEC-07-CORS-Same-Origin|CORS et Same-Origin Policy]]

**À apprendre pendant le projet :**
- [[ANG-01-Fondamentaux|Fondamentaux Angular]]
- [[ANG-02-Composants|Composants Angular]]
- [[ANG-03-Templates-Data-Binding|Templates & Data Binding Angular]]
- [[ANG-04-Directives|Directives Angular]]
- [[ANG-05-Services-DI|Services & Injection de Dépendances (DI) Angular]]
- [[ANG-06-Routing|Routing Angular]]
- [[ANG-07-Formulaires|Formulaires Angular]]
- [[ANG-08-RxJS|Programmation Réactive (RxJS) Angular]]
- [[ANG-09-HTTP-Communication-Serveur|HTTP & Communication Serveur Angular]]
- [[ANG-10-Signals|Signals Angular]]
- [[ANG-19-Communication-Composants|Communication parent-enfant Angular]]
- [[ANG-21-Guards-Resolvers-Intercepteurs|Guards Resolvers et Intercepteurs Angular]]
- [[ANG-20-Pipes|Pipes Angular]]

**Architecture et UI :**
- [[ANG-30-Template-Architecture-Angular|Template d'Architecture Angular]]
- [[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]]
- [[UI-Librairies-Interfaces-Rapides|Librairies UI pour Interfaces Rapides]]
- [[Angular-vs-Vue|Angular vs Vue Correspondances]]

---

# 🎬 CinéTrack

> [!abstract] Objectif
> Application **Angular** de suivi de films basée sur l'**API TMDB** (The Movie Database) : films populaires, recherche, fiche détaillée avec casting et bande-annonce, favoris, notes et critiques. C'est le fil rouge qui sert d'exemple dans la plupart des notes.

**Période :** M04 → M05 de la [[Roadmap-12-mois|Roadmap 12 mois]]  
**Stack :** Angular (standalone, signals, contrôle de flux), RxJS, HttpClient + intercepteurs, Reactive Forms, PrimeNG + Lucide + Tailwind, Vitest, API TMDB

---

## Jalons

### M04
- [ ] #task Créer un compte TMDB et récupérer le **jeton d'accès en lecture** (API Read Access Token)
- [ ] #task `ng new cinetrack` + structure par features (`films`, `favoris`, `core`, `shared`) + PrimeNG
- [ ] #task Créer le squelette du [[ANG-30-Template-Architecture-Angular|template d'architecture Angular]] (core, shared, features/films, alias `@core`, `@shared`, `@features`)
- [ ] #task Interfaces TypeScript des réponses TMDB (DTO) + mapper vers le modèle `Film`, et (`FilmResume`, `FilmDetail`, `PageTmdb<T>` générique)
- [ ] #task `TmdbService` + intercepteur qui ajoute `Authorization: Bearer …` et `language=fr-FR`
- [ ] #task Page d'accueil : films populaires et tendances (grille de cartes, pagination)
- [ ] #task Recherche de films avec debounceTime + switchMap (ou `toObservable` + `toSignal`)
- [ ] #task Page détail `/films/:id` : infos, genres, casting (`append_to_response=credits,videos`), bande-annonce
- [ ] #task Filtre par genre (liste des genres TMDB)
- [ ] #task Favoris (service + signals, persistés en localStorage)
- [ ] #task Formulaire réactif « ajouter une critique » avec validation
- [ ] #task Pipes `duree` et `tronquer`

### M05
- [ ] #task OnPush partout, store signals (ou Signal Store)
- [ ] #task Lazy loading des features + `@defer` sur les blocs lourds
- [ ] #task Intercepteurs (erreurs globales, puis token en M09)
- [ ] #task 20+ tests (services, pipes, composants)
- [ ] #task Accessibilité : navigation clavier, contrastes, `aria-live`
- [ ] #task Audit Lighthouse et optimisation

---

## API TMDB — aide-mémoire

| Besoin | Endpoint (base `https://api.themoviedb.org/3`) |
|---|---|
| Films populaires | `GET /movie/popular?page=1` |
| Tendances | `GET /trending/movie/week` |
| Recherche | `GET /search/movie?query=dune&page=1` |
| Détail + casting + vidéos | `GET /movie/{id}?append_to_response=credits,videos` |
| Liste des genres | `GET /genre/movie/list` |
| Découvrir par genre | `GET /discover/movie?with_genres=878&sort_by=popularity.desc` |
| Films similaires | `GET /movie/{id}/similar` |

- **Authentification** : en-tête `Authorization: Bearer <jeton d'accès en lecture>` (ajouté par un intercepteur)
- **Langue** : paramètre `language=fr-FR`
- **Images** : `https://image.tmdb.org/t/p/w500{poster_path}` (tailles : `w185`, `w342`, `w500`, `original`) ; `poster_path` peut être `null` → image de remplacement
- **Pagination** : réponse `{ page, results, total_pages, total_results }` → type générique `PageTmdb<T>`
- **Attribution** : afficher le logo TMDB et la mention « This product uses the TMDB API but is not endorsed or certified by TMDB »

```typescript
export interface PageTmdb<T> { page: number; results: T[]; total_pages: number; total_results: number }
export interface FilmResume { id: number; title: string; poster_path: string | null; release_date: string; vote_average: number; genre_ids: number[] }

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private http = inject(HttpClient);
  private base = 'https://api.themoviedb.org/3';
  populaires(page = 1) {
    return this.http.get<PageTmdb<FilmResume>>(`${this.base}/movie/popular`, { params: { page } });
  }
  rechercher(query: string, page = 1) {
    return this.http.get<PageTmdb<FilmResume>>(`${this.base}/search/movie`, { params: { query, page } });
  }
}

export const tmdbInterceptor: HttpInterceptorFn = (req, next) =>
  req.url.startsWith('https://api.themoviedb.org')
    ? next(req.clone({ setHeaders: { Authorization: `Bearer ${environment.tmdbToken}` }, setParams: { language: 'fr-FR' } }))
    : next(req);
```

> [!warning] Le jeton dans le front
> Un jeton placé dans le code Angular est **visible par tous** dans le bundle. C'est acceptable pour ce projet d'apprentissage avec un jeton en lecture seule, mais pas pour une vraie application : en M08, l'API [[02_Projects/CinéTrack-API|CinéTrack-API]] servira de **proxy** vers TMDB et gardera le jeton côté serveur (voir [[SEC-10-Gestion-des-Secrets|Gestion des secrets]]).

---

## Notes à mobiliser

- [[ANG-01-Fondamentaux|Fondamentaux Angular]]
- [[ANG-10-Signals|Signals Angular]]
- [[ANG-24-RxJS-Avance|RxJS Avancé]]
- [[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]]
- [[ANG-14-Tests|Tests Angular]]
- [[ANG-09-HTTP-Communication-Serveur|HTTP Angular]] · [[ANG-21-Guards-Resolvers-Intercepteurs|Intercepteurs]] · [[UI-Librairies-Interfaces-Rapides|Librairies UI]]

---

## Définition de « terminé »

- Code sur GitLab, MR relues (par toi-même au minimum), pipeline vert
- README : objectif, captures, démarrage en 5 minutes, choix techniques
- Tests sur la logique importante
- Accessible et responsive (pour les fronts)

---

## Journal

- 2026-09-24 : projet créé

## Notes libres

- ?
