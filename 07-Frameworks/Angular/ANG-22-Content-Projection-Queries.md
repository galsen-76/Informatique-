---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
tags:
  - frameworks/angular/projection
aliases:
  - "Content Projection et View Queries Angular"
parent: "[[Angular]]"
related_theory:
  - "[[ANG-19-Communication-Composants|Communication parent-enfant Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/components/content-projection"
---

# Content Projection et View Queries Angular

> [!abstract] En bref
> **`<ng-content>`** laisse un **trou** dans un composant, que le parent remplit avec son propre contenu : parfait pour une carte, une modale, une mise en page (c'est le `<slot>` de Vue). **`viewChild()`** donne accès à un élément ou un composant du template (pour donner le focus, par exemple).

## `<ng-content>` : le cadre et le contenu

```ts
@Component({
  selector: 'app-card',
  template: `
    <article class="card">
      <header><ng-content select="[card-title]" /></header>   <!-- zone nommée -->
      <div class="body"><ng-content /></div>                  <!-- tout le reste -->
      <footer><ng-content select="[card-actions]" /></footer>
    </article>
  `,
})
export class CardComponent {}
```

```html
<app-card>
  <h3 card-title>Inception</h3>
  <p>Un voleur s'infiltre dans les rêves…</p>
  <button card-actions type="button">Voir la fiche</button>
</app-card>
```

Image : un **cadre photo** avec plusieurs emplacements. Le cadre est toujours le même, tu choisis ce que tu y mets.

## Contenu par défaut

```html
<ng-content select="[card-actions]">
  <button type="button">Fermer</button>   <!-- affiché si le parent ne fournit rien -->
</ng-content>
```

## Un modèle que l'enfant remplit avec ses données : `ng-template`

Quand l'enfant boucle sur une liste mais laisse le parent choisir l'affichage de chaque élément (comme les colonnes du tableau PrimeNG) :

```ts
@Component({
  selector: 'app-list',
  imports: [NgTemplateOutlet],
  template: `
    @for (item of items(); track $index) {
      <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }" />
    }
  `,
})
export class ListComponent<T> {
  items = input.required<T[]>();
  itemTemplate = contentChild.required<TemplateRef<{ $implicit: T }>>(TemplateRef);
}
```

```html
<app-list [items]="movies()">
  <ng-template let-movie><strong>{{ movie.title }}</strong> ({{ movie.year }})</ng-template>
</app-list>
```

Tu t'en serviras surtout en **lisant** du code de librairie. Dans tes projets, `ng-content` suffit presque toujours.

## `viewChild` : accéder à un élément

```ts
@Component({
  template: `<input #search type="search"> <button type="button" (click)="focus()">🔍</button>`,
})
export class SearchComponent {
  search = viewChild.required<ElementRef<HTMLInputElement>>('search');
  focus() { this.search().nativeElement.focus(); }
}
```

| Fonction | Cherche dans | Exemple |
|---|---|---|
| `viewChild` | **son propre** template | un champ, un composant enfant |
| `viewChildren` | son template (plusieurs) | toutes les cartes |
| `contentChild` | le contenu **projeté** par le parent | le `ng-template` ci-dessus |

## Pièges

- **Accéder à `viewChild` dans le constructeur** : pas encore disponible. Utilise-le dans une méthode ou dans `afterNextRender`.
- **Utiliser `viewChild` pour faire communiquer deux composants** : préfère `input` / `output`.
