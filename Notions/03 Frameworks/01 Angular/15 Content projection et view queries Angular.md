---
type: notion
statut: a apprendre
resume: "<ng-content> laisse un trou dans un composant, que le parent remplit avec son propre contenu : parfait pour une carte, une modale, une mise en page (c'est le <slot> de Vue). viewChild() donne accès à un élément ou un composant du template (pour donner le focus, par exemple)."
revu:
sources:
  - "https://angular.dev/guide/components/content-projection"
---
# Content projection et view queries Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **`<ng-content>`** laisse un **trou** dans un composant, que le parent remplit avec son propre contenu : parfait pour une carte, une modale, une mise en page (c'est le `<slot>` de Vue). **`viewChild()`** donne accès à un élément ou un composant du template (pour donner le focus, par exemple).

## Le problème

**Pourquoi c'est utile ?**
Pour faire des composants « cadres » remplis par le parent, et accéder à un élément du template.

**Qu'est-ce qui se passait sans ça ?**
On créait une variante de composant pour chaque contenu différent (carte avec bouton, sans bouton…).

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

### `<ng-content>` : le cadre et le contenu

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

### Un modèle que l'enfant remplit avec ses données : `ng-template`

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

### `viewChild` : accéder à un élément

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

## 🧪 Exemple

### Contenu par défaut

```html
<ng-content select="[card-actions]">
  <button type="button">Fermer</button>   <!-- affiché si le parent ne fournit rien -->
</ng-content>
```

## ⚠️ Limites et pièges

- **Accéder à `viewChild` dans le constructeur** : pas encore disponible. Utilise-le dans une méthode ou dans `afterNextRender`.
- **Utiliser `viewChild` pour faire communiquer deux composants** : préfère `input` / `output`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Un cadre réutilisable

Crée un composant `Panel` avec un titre en input et un contenu libre fourni par le parent.

> [!success]- Solution
> ```ts
> @Component({
>   selector: 'app-panel',
>   template: `
>     <section class="panel">
>       <h2>{{ title() }}</h2>
>       <ng-content />
>     </section>
>   `,
> })
> export class Panel {
>   title = input.required<string>();
> }
> ```
>
> ```html
> <app-panel title="Casting">
>   <p>Timothée Chalamet, Zendaya…</p>
> </app-panel>
> ```

#### Exercice 2 · Donner le focus

Au chargement de la page de recherche, place le curseur dans le champ. Utilise `viewChild`.

> [!success]- Solution
> ```ts
> export class SearchPage {
>   searchInput = viewChild.required<ElementRef<HTMLInputElement>>('search');
>
>   constructor() {
>     afterNextRender(() => this.searchInput().nativeElement.focus());
>   }
> }
> ```
>
> ```html
> <input #search type="search" />
> ```

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Angular|Fondamentaux Angular]]
- **Voir aussi :** [[04 Communication parent-enfant Angular|Communication parent-enfant Angular]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/components/content-projection
