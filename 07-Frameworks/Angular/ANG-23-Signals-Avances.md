---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M05
tags:
  - frameworks/angular/signals-avances
aliases:
  - "Signals Avancés Angular"
parent: "[[Angular]]"
related_theory:
  - "[[ANG-10-Signals|Signals Angular]]"
  - "[[ANG-08-RxJS|Programmation Réactive RxJS Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/signals"
---

# Signals Avancés Angular

> [!abstract] En bref
> Au-delà de `signal`, `computed` et `effect` ([[ANG-10-Signals|Signals]]), Angular fournit des outils pour les cas courants d'une vraie application : charger des données selon un paramètre (`resource`, `httpResource`), une valeur qui se réinitialise quand une autre change (`linkedSignal`), et le passage entre signals et RxJS (`toSignal`, `toObservable`).

## `httpResource` : charger selon un paramètre

Le cas le plus fréquent : la fiche d'un film dépend de l'`id` de l'URL.

```ts
export class MovieDetailPage {
  id = input.required<string>();
  private config = inject(APP_CONFIG);

  movie = httpResource<MovieDto>(() => `${this.config.apiUrl}/movie/${this.id()}`);
}
```

```html
@if (movie.isLoading()) { <app-loader /> }
@else if (movie.error()) { <p>Film introuvable</p> }
@else if (movie.value(); as m) { <h1>{{ m.title }}</h1> }
```

- Quand `id()` change, la requête est **relancée automatiquement** (et l'ancienne annulée).
- `value()`, `isLoading()`, `error()`, `reload()` sont fournis.

`resource()` fait la même chose avec n'importe quelle fonction asynchrone (pas seulement HTTP).

## `linkedSignal` : une valeur qui se réinitialise

La page revient à 1 quand on change de genre, mais reste modifiable :

```ts
genre = signal('action');
page = linkedSignal(() => { this.genre(); return 1; });   // repart à 1 à chaque changement de genre

this.page.set(3);          // on peut quand même la changer à la main
this.genre.set('drame');   // → page() redevient 1
```

## Passer de RxJS aux signals et inversement

```ts
// Observable → signal (et désabonnement automatique)
movies = toSignal(this.api.popular(), { initialValue: [] });

// signal → Observable (pour utiliser des opérateurs RxJS)
results = toSignal(
  toObservable(this.search).pipe(
    debounceTime(300),
    switchMap(q => this.api.search(q)),
  ),
  { initialValue: [] },
);
```

**La règle :** les **états** en signals, les **flux d'événements** (recherche avec délai, websocket) en RxJS, et `toSignal` pour afficher le résultat.

## `untracked` : lire sans dépendre

Dans un `computed` ou un `effect`, lire un signal **sans** être relancé quand il change :

```ts
effect(() => {
  const query = this.search();                      // relance quand search change
  const user = untracked(() => this.user());        // ne relance PAS quand user change
  this.analytics.track('search', { query, user: user?.id });
});
```

## Récapitulatif

| Besoin | Outil |
|---|---|
| un état | `signal` |
| une valeur dérivée | `computed` |
| un effet de bord (sauvegarde, log) | `effect` |
| une valeur dérivée **mais modifiable** | `linkedSignal` |
| des données à charger selon un paramètre | `httpResource` / `resource` |
| afficher un Observable | `toSignal` |
| appliquer des opérateurs RxJS à un signal | `toObservable` |

Vérifie dans la documentation de ta version d'Angular si ces API sont stables ou encore expérimentales.

## Pièges

- **`toSignal` sans `initialValue`** : le type inclut `undefined`.
- **`effect` qui modifie les signals qu'il lit** : boucle infinie.
- **Tout convertir en RxJS** « par habitude » : une recherche avec délai oui, un simple compteur non.
