---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Directives Angular"
tags:
  - frameworks/angular/directives
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/directives"
---

# Directives Angular

> [!abstract] En bref
> Une **directive** ajoute un comportement à un élément HTML existant, sans créer de composant. Tu en utilises déjà : `ngModel`, `routerLink`, `[class]`. Tu peux en créer pour un comportement réutilisable : donner le focus, détecter un clic en dehors d'un menu, afficher une image de secours.

## Composant ou directive ?

| | Composant | Directive |
|---|---|---|
| A son propre HTML | oui | **non** |
| S'utilise comme | une balise `<app-movie-card>` | un attribut `<img appFallback>` |
| Exemple | une carte, une page | « si l'image ne charge pas, en mettre une autre » |

## Les directives d'Angular que tu utiliseras

| Directive | Rôle |
|---|---|
| `[class.x]`, `[style.x]` | classes et styles dynamiques |
| `ngModel` | lier un champ (formulaires simples) |
| `formControlName` | lier un champ à un formulaire réactif |
| `routerLink`, `routerLinkActive` | liens de navigation, lien actif |
| `NgOptimizedImage` (`ngSrc`) | images optimisées (tailles, lazy loading) |

Les anciennes `*ngIf`, `*ngFor`, `[ngClass]` sont remplacées par `@if`, `@for` et `[class]`.

## Créer une directive utile

**Image de secours** quand une affiche TMDB est introuvable :

```ts
import { Directive, input } from '@angular/core';

@Directive({
  selector: 'img[appFallback]',
  host: { '(error)': 'onError($event)' },     // écoute l'événement error de l'image
})
export class FallbackImageDirective {
  appFallback = input('/assets/no-poster.webp');

  onError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith(this.appFallback())) return;   // éviter une boucle infinie
    img.src = this.appFallback();
  }
}
```

```html
<img [src]="movie().poster" appFallback alt="…">
```

**Focus automatique** :

```ts
@Directive({ selector: '[appAutofocus]' })
export class AutofocusDirective {
  private el = inject(ElementRef<HTMLElement>);
  constructor() {
    afterNextRender(() => this.el.nativeElement.focus());   // après l'affichage
  }
}
```

## Quand créer une directive ?

Quand le **même comportement** sur des éléments existants revient à plusieurs endroits. Si ça a du HTML propre, c'est un composant. Si c'est de la logique sans lien avec un élément, c'est un service ou une fonction.

## Pièges

- **Manipuler le DOM dans le constructeur** : l'élément n'est pas encore affiché. Utilise `afterNextRender`.
- **Oublier d'importer la directive** dans le composant qui l'utilise.
