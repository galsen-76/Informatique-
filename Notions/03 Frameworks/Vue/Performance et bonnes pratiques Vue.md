---
type: notion
statut: a apprendre
resume: "Vue est rapide par défaut."
revu:
sources:
  - "https://vuejs.org/guide/best-practices/performance.html"
---
# Performance et bonnes pratiques Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Vue est rapide par défaut.

## Le problème

**Pourquoi c'est utile ?**
Pour garder une application Vue rapide, en mesurant avant d'optimiser.

**Qu'est-ce qui se passait sans ça ?**
On optimisait au hasard, ou l'application était lente à cause d'images lourdes et de tout le code chargé au démarrage.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Les vrais problèmes de performance viennent presque toujours de **trop de choses chargées au démarrage**, d'**images lourdes** ou de **listes énormes**. Règle d'or : **mesurer d'abord** (Lighthouse), optimiser ensuite ce qui compte.

### Mesurer

1. `npm run build && npm run preview` : mesure la version de production, pas celle de développement.
2. F12 → **Lighthouse** → Performance. Objectif du Portfolio : **90+**.
3. **Vue DevTools** → onglet Performance : quels composants se redessinent trop souvent.

### Les leviers, du plus rentable au moins rentable

| Levier | Comment |
|---|---|
| **Pages chargées à la demande** | `component: () => import('./ProjectsPage.vue')` dans les routes |
| **Images légères** | WebP, dimensions, `loading="lazy"` (voir Images) |
| **Importer seulement ce qu'on utilise** | `import Button from 'primevue/button'`, pas toute la librairie |
| **Composants lourds à la demande** | `defineAsyncComponent(() => import('./Chart.vue'))` pour un graphique |
| **Listes longues** | pagination, ou liste virtualisée (seules les lignes visibles existent) |
| **`:key` stables** | `:key="p.slug"`, jamais l'index |
| **Grosses données non modifiées** | `shallowRef` : Vue ne surveille pas l'intérieur |

### Les bonnes pratiques qui évitent les problèmes

- **`computed` plutôt que des fonctions dans le template** : une fonction `{{ total() }}` est rappelée à chaque affichage, un `computed` est mis en cache.
- **Des composants petits** : quand une donnée change, seul le composant concerné se redessine.
- **Nettoyer** minuteurs et écouteurs (`onUnmounted`).
- **`v-show`** pour ce qui bascule souvent, **`v-if`** pour le reste.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Optimiser au hasard** avant d'avoir mesuré.
- **Tout mettre dans des `ref` profondes** : une liste de 10 000 objets surveillés en détail coûte cher. `shallowRef` si tu remplaces la liste en entier.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Vue]]
- **Voir aussi :** [[Réactivité Vue ref et reactive]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/best-practices/performance.html
