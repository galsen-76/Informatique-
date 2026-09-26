---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Templates & Data Binding Angular"
tags:
  - frameworks/angular/templates
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/templates"
---

# Templates & Data Binding Angular

> [!abstract] En bref
> Le template est le HTML du composant. Quatre écritures relient ce HTML à ta classe TypeScript : afficher une valeur, lier un attribut, écouter un événement, et lier dans les deux sens. Plus les blocs `@if` et `@for` pour afficher selon une condition ou répéter.

## Les 4 liaisons

| Écriture | Sens | Exemple |
|---|---|---|
| `{{ valeur }}` | classe → écran (texte) | `{{ movie().title }}` |
| `[propriete]="valeur"` | classe → écran (attribut / propriété) | `[src]="movie().poster"` |
| `(evenement)="action()"` | écran → classe | `(click)="toggleFavorite()"` |
| `[(ngModel)]="valeur"` ou `[(x)]` | dans les deux sens | `[(ngModel)]="search"` |

Moyen mnémotechnique : les **crochets `[ ]`** font entrer la donnée dans le HTML, les **parenthèses `( )`** en font sortir un événement. `[( )]` = les deux, surnommé « la banane dans la boîte ».

```html
<img [src]="movie().poster" [alt]="movie().title">
<button type="button" [disabled]="loading()" (click)="reload()">Recharger</button>
<input [value]="search()" (input)="search.set($any($event.target).value)">
```

## Classes et styles dynamiques

```html
<article [class.favorite]="isFavorite()">…</article>
<article [class]="{ favorite: isFavorite(), seen: movie().seen }">…</article>
<div [style.width.%]="progress()">…</div>
<button [attr.aria-pressed]="isFavorite()">♡</button>   <!-- attribut HTML pur -->
```

## Le contrôle du flux : `@if`, `@for`, `@switch`

```html
@if (store.loading()) {
  <app-loader />
} @else if (store.error(); as error) {
  <p>{{ error }}</p>
} @else {
  @for (m of store.movies(); track m.id) {
    <app-movie-card [movie]="m" />
  } @empty {
    <p>Aucun film trouvé.</p>
  }
}

@switch (movie().status) {
  @case ('watched') { <span>Vu</span> }
  @case ('to-watch') { <span>À voir</span> }
  @default { <span>—</span> }
}
```

- `track m.id` est **obligatoire** : il permet à Angular de ne recréer que ce qui a changé. Utilise un identifiant stable.
- `@empty` s'affiche quand la liste est vide.
- `as error` donne un nom au résultat pour l'utiliser dans le bloc.

## Référence vers un élément : `#nom`

```html
<input #searchInput type="search">
<button type="button" (click)="searchInput.focus()">🔍</button>
```

## Pièges

- **Oublier les `()` d'un signal** : `{{ movie.title }}` au lieu de `{{ movie().title }}`.
- **Des calculs lourds dans le template** (`{{ filterMovies() }}`) : la fonction est rappelée très souvent. Mets le calcul dans un `computed()`.
- **Anciennes écritures** `*ngIf`, `*ngFor` : fonctionnent encore, mais on écrit maintenant `@if`, `@for`.
