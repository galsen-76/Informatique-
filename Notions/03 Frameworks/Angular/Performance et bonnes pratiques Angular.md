---
type: notion
statut: a apprendre
resume: "Une application Angular devient lente pour trois raisons principales : trop de code chargé au démarrage, trop de vérifications de l'écran, et des images ou listes trop lourdes."
revu:
sources:
  - "https://angular.dev/guide/performance"
---
# Performance et bonnes pratiques Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une application Angular devient lente pour trois raisons principales : **trop de code chargé au démarrage**, **trop de vérifications** de l'écran, et des **images ou listes trop lourdes**.

## Le problème

**Pourquoi c'est utile ?**
Pour garder une application Angular rapide au démarrage et à l'usage.

**Qu'est-ce qui se passait sans ça ?**
Tout le code chargé d'un coup, des listes énormes, des vérifications inutiles : une application lente sur mobile.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Les bonnes pratiques modernes règlent la plupart des cas d'avance. Toujours **mesurer avant d'optimiser**.

### Mesurer

1. `ng build` puis servir le dossier `dist/` : mesure la version de production.
2. **Lighthouse** (F12) : objectif 90+.
3. **Angular DevTools → Profiler** : quels composants sont revérifiés et combien de temps ça prend.
4. `ng build --stats-json` + un analyseur de bundle : quelles librairies pèsent le plus.

### La check-list

| Levier | Comment |
|---|---|
| **Routes chargées à la demande** | `loadComponent` / `loadChildren` |
| **Blocs chargés à la demande** | `@defer (on viewport) { <app-similar-movies /> }` (voir @defer) |
| **Moins de vérifications** | `OnPush` partout + signals (voir Détection de changement) |
| **`track` dans chaque `@for`** | `track movie.id` : pas de recréation inutile |
| **Pas de fonction dans le template** | `{{ total() }}` est un signal ✅ ; `{{ calculerTotal() }}` une méthode rappelée sans cesse ❌ → `computed` |
| **Images optimisées** | directive `NgOptimizedImage` : `<img [ngSrc]="poster" width="185" height="278">` |
| **Listes très longues** | pagination, ou `cdk-virtual-scroll-viewport` |
| **Petites librairies** | importer seulement les composants utilisés (PrimeNG composant par composant) |
| **Pas de fuites** | `toSignal`, `takeUntilDestroyed` (voir RxJS) |

## 🧪 Exemple

### Les bonnes pratiques qui évitent les problèmes

- **Composants petits et `OnPush`.**
- **État dans des signals**, dérivés dans des `computed`.
- **Logique dans les services**, pas dans les templates.
- **Budgets de taille** dans `angular.json` : le build prévient si le bundle grossit trop.

```json
"budgets": [{ "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" }]
```

## ⚠️ Limites et pièges

- **Optimiser sans avoir mesuré** : tu passes du temps sur ce qui ne compte pas.
- **Une librairie énorme importée entièrement** (`import * as _ from 'lodash'`) pour une seule fonction.
- **Des centaines d'abonnements** jamais fermés : la page ralentit au fil de la navigation.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Trouver les problèmes

Relève les 4 problèmes de performance de ce template.

```html
@for (movie of movies(); track $index) {
  <img [src]="'https://image.tmdb.org/t/p/original' + movie.poster" />
  <p>{{ formatRuntime(movie.runtime) }}</p>
}
```

Le composant n'a pas `OnPush`.

> [!success]- Solution
> 1. **`track $index`** : si la liste change d'ordre, Angular redessine tout. → `track movie.id`
> 2. **Image `original`** (plusieurs Mo) pour une vignette. → `w342` + `loading="lazy"` + `width` / `height` (ou `NgOptimizedImage`).
> 3. **Appel de méthode dans le template** : recalculé à chaque vérification. → un **pipe** pur ou un `computed`.
> 4. **Pas d'`OnPush`** : le composant est vérifié à chaque événement de l'application.

#### Exercice 2 · Mesurer

Comment mesures-tu la performance de CinéTrack, et quelles 2 métriques regardes-tu en premier ?

> [!success]- Solution
> - **Lighthouse** (DevTools → onglet Lighthouse) sur le build de production (`ng build` puis servir `dist/`), pas sur `ng serve`.
> - **Angular DevTools** (profiler) pour voir quels composants se redessinent.
>
> Métriques : **LCP** (temps d'affichage du plus gros élément, par exemple la grille d'affiches) et **CLS** (sauts de mise en page, souvent des images sans dimensions).

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/performance
