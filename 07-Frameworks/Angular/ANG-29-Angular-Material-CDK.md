---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
tags:
  - frameworks/angular/material
aliases:
  - "Angular Material et CDK"
parent: "[[Angular]]"
children: []
related_theory:
  - "[[HTML-03-Accessibilite-Web|Accessibilité Web]]"
  - "[[CSS-09-Architecture-BEM-Tailwind|Architecture CSS BEM et Tailwind]]"
related_snippets:
  - "[[04_Snippets/ang-29-angular-material-cdk]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://material.angular.dev"
---

# Angular Material et CDK

> [!abstract] Introduction
> Angular Material fournit des composants UI prêts à l'emploi (boutons, tableaux, dialogues) conformes à Material Design ; le CDK (Component Dev Kit) fournit les briques comportementales sans style (overlay, drag & drop, a11y, virtual scroll).

> [!warning]- Prérequis
> [[ANG-02-Composants|Composants Angular]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> ng add @angular/material
> ```
> ```typescript
> @Component({
>   imports: [MatButtonModule, MatTableModule],
>   template: `<button mat-flat-button (click)="ouvrir()">Ajouter</button>`
> })
> ```
> CDK utiles même sans Material : `Overlay`, `DragDropModule`, `ScrollingModule` (`cdk-virtual-scroll-viewport`), `A11yModule` (`cdkTrapFocus`, `LiveAnnouncer`), `BreakpointObserver`, `Clipboard`.

> [!example]- Analogie
> Material est une cuisine équipée clé en main ; le CDK est la plomberie et l'électricité, sur lesquelles tu peux poser tes propres meubles.

> [!question]- Pourquoi l'utiliser ?
> Gagner des semaines sur des composants complexes et accessibles (datepicker, tableau triable/paginé, dialog avec focus trap).

> [!question]- Comment ça marche ?
> - Thème via Sass (`mat.theme(...)`) et design tokens (Material 3)
> - `MatDialog.open(Composant, { data })` pour les modales
> - `mat-table` + `MatSort` + `MatPaginator`
> - Beaucoup d'entreprises utilisent aussi PrimeNG ou un design system interne : les concepts restent identiques

> [!question]- Quand l'utiliser ?
> Back-offices, applications métier, prototypes. Pour une identité visuelle très spécifique : CDK + design system maison.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Personnaliser fortement Material est laborieux ; surcharger les classes internes (`.mdc-...`) casse aux mises à jour.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| CDK | Component Dev Kit, comportements sans style |
| Overlay | Couche flottante (menus, dialogues) |
| Virtual scroll | Ne rend que les éléments visibles d'une longue liste |
| Thème | Configuration des couleurs/typographie |

---

## Points clés

- Material = composants stylés, CDK = comportements
- Virtual scroll pour les listes de milliers d'éléments
- Personnaliser via l'API de thème, pas en surchargeant les classes internes

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `::ng-deep .mat-mdc-button` partout
> - Mettre à jour Angular sans mettre à jour Material (versions alignées)

---

## Exemple minimal

```html
<cdk-virtual-scroll-viewport itemSize="72" class="liste">
  <app-film-card *cdkVirtualFor="let f of films(); trackBy: parId" [film]="f" />
</cdk-virtual-scroll-viewport>
```

> [!note] Ce que j'en retiens
> 10 000 films mais seulement une vingtaine de cartes réellement dans le DOM.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Construire un composant accessible maison avec les primitives CDK

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[VUE-21-Ecosysteme-UI-Vue|Écosystème UI Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/ang-29-angular-material-cdk]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre Material et le CDK ?

---

## Tâches

- [ ] #task Identifier la librairie UI utilisée au travail et lire sa doc de thème
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
