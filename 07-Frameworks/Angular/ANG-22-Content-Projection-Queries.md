---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
tags:
  - frameworks/angular/projection
aliases:
  - "Content Projection et View Queries Angular"
parent: "[[Angular]]"
children: []
related_theory:
  - "[[ANG-19-Communication-Composants|Communication parent-enfant Angular]]"
related_snippets:
  - "[[04_Snippets/ang-22-content-projection-queries]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/components/content-projection"
---

# Content Projection et View Queries Angular

> [!abstract] Introduction
> `<ng-content>` permet à un composant d'afficher du contenu fourni par son parent (cartes, modales, layouts) ; `viewChild`/`contentChild` donnent accès à des éléments ou composants du template.

> [!warning]- Prérequis
> [[ANG-02-Composants|Composants Angular]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Component({
>   selector: 'app-carte',
>   template: `
>     <header><ng-content select="[titre]" /></header>
>     <section><ng-content /></section>
>     <footer><ng-content select="[actions]" /></footer>`
> })
> export class CarteComponent {}
> ```
> ```html
> <app-carte>
>   <h2 titre>Inception</h2>
>   <p>Un voleur de rêves…</p>
>   <button actions>Voir</button>
> </app-carte>
> ```

> [!example]- Analogie
> Un cadre photo avec plusieurs emplacements (titre, photo, légende) : le cadre définit la structure, le parent fournit les photos.

> [!question]- Pourquoi l'utiliser ?
> Créer des composants de mise en forme génériques (carte, modale, onglets, layout) sans multiplier les inputs.

> [!question]- Comment ça marche ?
> - `<ng-content select="...">` : emplacements nommés par sélecteur CSS
> - `ng-template` + `ngTemplateOutlet` : projection conditionnelle ou répétée avec contexte (« render props »)
> - Requêtes signal : `viewChild('ref')`, `viewChildren(Comp)`, `contentChild(Comp)` (API décorateurs `@ViewChild` encore courante)

> [!question]- Quand l'utiliser ?
> Composants UI génériques d'un design system. `viewChild` pour focus, scroll, instance d'un composant enfant.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `<ng-content>` ne peut pas être rendu conditionnellement plusieurs fois (le contenu est toujours instancié) → utiliser `ng-template` pour du contenu paresseux.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Content projection | Afficher le contenu fourni par le parent |
| Slot | Emplacement de projection |
| `ng-template` | Bloc de template non rendu par défaut |
| `viewChild` | Référence à un élément du propre template |
| `contentChild` | Référence à un élément projeté |

---

## Points clés

- `select` pour plusieurs emplacements
- `ng-template` pour du contenu paresseux ou avec contexte
- Requêtes signal (`viewChild()`) = lisibles dans un `computed`/`effect`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Lire un `viewChild` dans le constructor ou ngOnInit (encore undefined, sauf static)
> - Croire que `@if` autour de `<ng-content>` empêche l'instanciation du contenu projeté

---

## Exemple minimal

```typescript
@Component({
  selector: 'app-liste',
  imports: [NgTemplateOutlet],
  template: `@for (item of items(); track $index) {
     <ng-container *ngTemplateOutlet="ligne(); context: { $implicit: item }" />
  }`
})
export class ListeComponent<T> {
  items = input.required<T[]>();
  ligne = contentChild.required(TemplateRef);
}
// <app-liste [items]="films"><ng-template let-f>{{ f.titre }}</ng-template></app-liste>
```

> [!note] Ce que j'en retiens
> Le parent décide du rendu de chaque ligne, le composant gère la boucle : équivalent des scoped slots Vue.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Concevoir des composants « headless » (logique sans style) avec projection

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[VUE-12-Slots|Slots Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/ang-22-content-projection-queries]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand préférer `ng-template` à `ng-content` ?

---

## Tâches

- [ ] #task Créer un composant `Carte` à 3 emplacements et une `Modale` projetée
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
