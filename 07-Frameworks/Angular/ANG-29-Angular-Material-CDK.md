---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
tags:
  - frameworks/angular/material
aliases:
  - "Angular Material et CDK"
parent: "[[Angular]]"
related_theory:
  - "[[HTML-03-Accessibilite-Web|Accessibilité Web]]"
  - "[[CSS-09-Architecture-BEM-Tailwind|Architecture CSS BEM et Tailwind]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://material.angular.dev"
---

# Angular Material et CDK

> [!abstract] En bref
> **Angular Material** est la librairie de composants officielle d'Angular (style Material Design de Google). Le **CDK** (*Component Dev Kit*) fournit les **comportements** sans le style : fenêtres flottantes, glisser-déposer, listes virtuelles, gestion du focus. Même si tu utilises PrimeNG, le CDK te sera utile.

## Angular Material ou PrimeNG ?

| | Angular Material | PrimeNG |
|---|---|---|
| Éditeur | équipe Angular (Google) | PrimeTek |
| Style | Material Design (reconnaissable) | thèmes variés (Aura…) |
| Nombre de composants | moins | **beaucoup** (tableaux avancés, graphiques…) |
| Existe aussi pour Vue | non | **oui (PrimeVue)** |

Ton choix pour CinéTrack : **PrimeNG**, pour garder les mêmes composants qu'avec PrimeVue dans le Portfolio (voir [[UI-Librairies-Interfaces-Rapides|Librairies UI]]). Si l'équipe utilise Material, suis l'équipe.

```bash
ng add @angular/material     # si besoin : installe et configure le thème
```

## Le CDK : les comportements utiles

| Outil | Sert à | Exemple |
|---|---|---|
| **Overlay** | afficher un élément flottant par-dessus tout | menu, info-bulle, modale |
| **Dialog** | fenêtre modale accessible (focus piégé, Échap) | confirmation |
| **DragDrop** | glisser-déposer | réordonner une liste de favoris |
| **ScrollingModule** | liste virtuelle (seules les lignes visibles existent) | 10 000 films |
| **A11y** | `cdkTrapFocus`, `LiveAnnouncer`, `FocusMonitor` | accessibilité |
| **BreakpointObserver** | réagir à la taille d'écran en TypeScript | menu mobile |
| **Clipboard** | copier dans le presse-papier | bouton « copier le lien » |

## Exemples

**Réordonner les favoris :**

```ts
@Component({
  imports: [CdkDropList, CdkDrag],
  template: `
    <ul cdkDropList (cdkDropListDropped)="drop($event)">
      @for (m of favorites(); track m.id) {
        <li cdkDrag>{{ m.title }}</li>
      }
    </ul>
  `,
})
export class FavoritesListComponent {
  favorites = signal<Movie[]>([]);
  drop(e: CdkDragDrop<Movie[]>) {
    this.favorites.update(list => {
      const copy = [...list];
      moveItemInArray(copy, e.previousIndex, e.currentIndex);
      return copy;
    });
  }
}
```

**Liste de 10 000 éléments fluide :**

```html
<cdk-virtual-scroll-viewport itemSize="72" style="height: 600px">
  <app-movie-row *cdkVirtualFor="let m of movies(); trackBy: trackById" [movie]="m" />
</cdk-virtual-scroll-viewport>
```

**Réagir à la taille d'écran :**

```ts
isMobile = toSignal(
  inject(BreakpointObserver).observe('(max-width: 900px)').pipe(map(r => r.matches)),
  { initialValue: false },
);
```

## Pièges

- **Mélanger Material et PrimeNG** dans la même application : une seule librairie de composants.
- **Recoder une modale** avec un `div` : le focus, la touche Échap et le lecteur d'écran seront mal gérés. Utilise Dialog (CDK, Material ou PrimeNG).
