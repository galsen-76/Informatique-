---
type: notion
statut: a apprendre
resume: "Le template est le HTML du composant."
revu:
sources:
  - "https://angular.dev/guide/templates"
---
# Templates et data binding Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le template est le HTML du composant.

## Le problème

**Pourquoi c'est utile ?**
Pour relier automatiquement le HTML aux données du composant, dans les deux sens.

**Qu'est-ce qui se passait sans ça ?**
On mettait à jour la page à la main avec querySelector à chaque changement de donnée, en oubliant des endroits.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Quatre écritures relient ce HTML à ta classe TypeScript : afficher une valeur, lier un attribut, écouter un événement, et lier dans les deux sens. Plus les blocs `@if` et `@for` pour afficher selon une condition ou répéter.

### Les 4 liaisons

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

### Le contrôle du flux : `@if`, `@for`, `@switch`

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

### Référence vers un élément : `#nom`

```html
<input #searchInput type="search">
<button type="button" (click)="searchInput.focus()">🔍</button>
```

## 🧪 Exemple

### Classes et styles dynamiques

```html
<article [class.favorite]="isFavorite()">…</article>
<article [class]="{ favorite: isFavorite(), seen: movie().seen }">…</article>
<div [style.width.%]="progress()">…</div>
<button [attr.aria-pressed]="isFavorite()">♡</button>   <!-- attribut HTML pur -->
```

## ⚠️ Limites et pièges

- **Oublier les `()` d'un signal** : `{{ movie.title }}` au lieu de `{{ movie().title }}`.
- **Des calculs lourds dans le template** (`{{ filterMovies() }}`) : la fonction est rappelée très souvent. Mets le calcul dans un `computed()`.
- **Anciennes écritures** `*ngIf`, `*ngFor` : fonctionnent encore, mais on écrit maintenant `@if`, `@for`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Les 4 liaisons

Dans ce template, écris : le titre (texte), l'image de l'affiche (propriété `src`), un bouton qui appelle `toggleFavorite()`, et un champ de recherche lié dans les deux sens à un signal `query`.

> [!success]- Solution
> ```html
> <h2>{{ movie().title }}</h2>
> <img [src]="posterUrl()" [alt]="'Affiche de ' + movie().title" />
> <button (click)="toggleFavorite()">♥</button>
> <input [(ngModel)]="query" />
> ```
>
> - `{{ }}` : afficher du texte
> - `[prop]` : donner une valeur à une propriété
> - `(event)` : réagir à un événement
> - `[( )]` : liaison dans les deux sens (`ngModel` accepte un signal ; importer `FormsModule`)

#### Exercice 2 · Le contrôle du flux

Affiche la liste `movies()` : un message « Chargement… » si `loading()` est vrai, sinon une carte par film, et « Aucun film » si la liste est vide.

> [!success]- Solution
> ```html
> @if (loading()) {
>   <p>Chargement…</p>
> } @else {
>   @for (movie of movies(); track movie.id) {
>     <app-movie-card [movie]="movie" />
>   } @empty {
>     <p>Aucun film</p>
>   }
> }
> ```
>
> `track movie.id` permet à Angular de ne redessiner que les cartes qui changent.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/templates
