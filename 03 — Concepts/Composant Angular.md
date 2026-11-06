---
type: concept
domain: frontend
module: "[[Module 20 - Angular]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Angular]]"
  - "[[Type et interface TypeScript]]"
parents:
  - "[[Angular]]"
related:
  - "[[Template et liaison de données Angular]]"
  - "[[Composant React]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Composant Angular

> [!info] En une phrase
> Un composant Angular est une classe TypeScript décorée par @Component, associée à un template HTML et à un style ; il reçoit des entrées et émet des sorties.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```ts
import { Component, input, output } from "@angular/core";
@Component({
  selector: "app-carte-tache",       // la balise : <app-carte-tache>
  standalone: true,
  templateUrl: "./carte-tache.component.html",
  styleUrl: "./carte-tache.component.css",
})
export class CarteTacheComponent {
  tache = input.required<Tache>();    // entrée (équivalent des props)
  choisir = output<number>();         // sortie (événement vers le parent)
}
```
```html
<!-- carte-tache.component.html -->
<article (click)="choisir.emit(tache().id)">
  <h2>{{ tache().nom }}</h2>
</article>
```
Parent : `<app-carte-tache [tache]="t" (choisir)="ouvrir($event)" />`.
Anciennes écritures très répandues : `@Input() tache!: Tache;` et `@Output() choisir = new EventEmitter<number>();`.
**Cycle de vie** : `ngOnInit` (après la création, pour charger des données), `ngOnDestroy` (nettoyage).

### Pourquoi ça existe
Structurer l'interface en morceaux réutilisables, avec une séparation claire entre logique (classe) et affichage (template).

### Le problème résolu
Des composants typés, testables, générés tous de la même façon par le CLI.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
P[Parent] -->|entrée| E[Composant]
  E -->|sortie| P
  E --> T[Template]
  E --> S[Style]
```

### Exemple concret
```bash
ng generate component carte-tache     # crée les 4 fichiers (ts, html, css, spec.ts)
```
Le fichier `.spec.ts` contient un test du composant.

### Cas d'utilisation
- Chaque écran et chaque élément d'une application Angular

> [!warning] À ne pas confondre
> Le `selector` (`app-carte-tache`, utilisé dans les templates) n'est pas le nom de la classe (`CarteTacheComponent`). Et un composant autonome doit **importer** les composants qu'il utilise dans `imports: [...]`.

## 3 · Pratiquer
- Génère un composant avec le CLI, donne-lui une entrée et une sortie, et utilise-le dans `app.component`

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Angular]] · [[Type et interface TypeScript]]
- **Complémentaires** : [[Template et liaison de données Angular]] · [[Composant React]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
