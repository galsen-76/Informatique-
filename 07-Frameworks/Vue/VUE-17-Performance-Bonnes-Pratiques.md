---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M06
tags:
  - frameworks/vue/performance
aliases:
  - "Performance et Bonnes Pratiques Vue.js"
parent: "[[Vue]]"
related_theory:
  - "[[VUE-02-Reactivite|Réactivité Vue.js]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/best-practices/performance.html"
---

# Performance et Bonnes Pratiques Vue.js

> [!abstract] En bref
> Vue est rapide par défaut. Les vrais problèmes de performance viennent presque toujours de **trop de choses chargées au démarrage**, d'**images lourdes** ou de **listes énormes**. Règle d'or : **mesurer d'abord** (Lighthouse), optimiser ensuite ce qui compte.

## Mesurer

1. `npm run build && npm run preview` : mesure la version de production, pas celle de développement.
2. F12 → **Lighthouse** → Performance. Objectif du Portfolio : **90+**.
3. **Vue DevTools** → onglet Performance : quels composants se redessinent trop souvent.

## Les leviers, du plus rentable au moins rentable

| Levier | Comment |
|---|---|
| **Pages chargées à la demande** | `component: () => import('./ProjectsPage.vue')` dans les routes |
| **Images légères** | WebP, dimensions, `loading="lazy"` (voir [[HTML-07-Images-Medias\|Images]]) |
| **Importer seulement ce qu'on utilise** | `import Button from 'primevue/button'`, pas toute la librairie |
| **Composants lourds à la demande** | `defineAsyncComponent(() => import('./Chart.vue'))` pour un graphique |
| **Listes longues** | pagination, ou liste virtualisée (seules les lignes visibles existent) |
| **`:key` stables** | `:key="p.slug"`, jamais l'index |
| **Grosses données non modifiées** | `shallowRef` : Vue ne surveille pas l'intérieur |

## Les bonnes pratiques qui évitent les problèmes

- **`computed` plutôt que des fonctions dans le template** : une fonction `{{ total() }}` est rappelée à chaque affichage, un `computed` est mis en cache.
- **Des composants petits** : quand une donnée change, seul le composant concerné se redessine.
- **Nettoyer** minuteurs et écouteurs (`onUnmounted`).
- **`v-show`** pour ce qui bascule souvent, **`v-if`** pour le reste.

## Pièges

- **Optimiser au hasard** avant d'avoir mesuré.
- **Tout mettre dans des `ref` profondes** : une liste de 10 000 objets surveillés en détail coûte cher. `shallowRef` si tu remplaces la liste en entier.
