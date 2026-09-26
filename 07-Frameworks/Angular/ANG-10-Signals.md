---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🟡 In Progress"
level: Intermédiaire
month: M04
aliases:
  - "Signals Angular"
tags:
  - frameworks/angular/signals
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/signals"
---

# Signals Angular

> [!abstract] En bref
> Un **signal** est une boîte qui contient une valeur et **prévient Angular** dès qu'elle change, pour qu'il mette à jour seulement ce qui en dépend. C'est l'équivalent de `ref` en Vue. Trois fonctions à connaître : `signal`, `computed`, `effect`.

## `signal` : la donnée

```ts
import { signal } from '@angular/core';

count = signal(0);
movies = signal<Movie[]>([]);

this.count();                        // lire → 0 (avec des parenthèses)
this.count.set(5);                   // remplacer
this.count.update(v => v + 1);       // modifier à partir de l'ancienne valeur
this.movies.update(list => [...list, newMovie]);
```

```html
<p>{{ count() }}</p>
```

On **lit** un signal en l'appelant comme une fonction : `count()`. C'est ce qui permet à Angular de savoir qui l'utilise.

## `computed` : une valeur calculée

```ts
search = signal('');
genre = signal<string | null>(null);

filtered = computed(() =>
  this.movies()
    .filter(m => !this.genre() || m.genres.includes(this.genre()!))
    .filter(m => m.title.toLowerCase().includes(this.search().toLowerCase())),
);

count = computed(() => this.filtered().length);
```

Comme une formule Excel : recalculée automatiquement, et **seulement** quand `movies`, `search` ou `genre` changent. Un `computed` est en lecture seule.

## `effect` : agir quand quelque chose change

```ts
constructor() {
  effect(() => {
    localStorage.setItem('favorites', JSON.stringify(this.favoriteIds()));
  });
}
```

S'exécute au départ, puis à chaque changement des signals lus à l'intérieur.

| Tu veux… | Utilise |
|---|---|
| une valeur dérivée | `computed` |
| sauvegarder, écrire dans le `localStorage`, appeler une librairie externe | `effect` |

## Exposer un signal en lecture seule

Dans un service, on garde la modification à l'intérieur :

```ts
@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly _ids = signal<number[]>([]);
  readonly ids = this._ids.asReadonly();     // les composants peuvent lire, pas écrire

  toggle(id: number) { /* seul le store modifie */ }
}
```

## Les inputs sont des signals

```ts
movie = input.required<Movie>();          // lire : this.movie()
title = computed(() => this.movie().title.toUpperCase());
```

## Pièges

- **Oublier les `()`** : `this.count + 1` ou `{{ count }}` ne donnent pas la valeur.
- **Modifier un tableau sans le remplacer** : `this.movies().push(m)` ne prévient pas Angular. Écris `this.movies.update(l => [...l, m])`.
- **Utiliser `effect` pour recopier un signal dans un autre** : c'est un `computed`.
- **Modifier un signal dans un `computed`** : interdit, un `computed` ne fait que calculer.

Pour aller plus loin (`linkedSignal`, `resource`, conversion RxJS) : [[ANG-23-Signals-Avances|Signals avancés]].
