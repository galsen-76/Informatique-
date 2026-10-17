---
type: notion
statut: a apprendre
resume: "computed crée une valeur calculée à partir d'autres données (la liste de projets filtrée), recalculée automatiquement quand elles changent. watch exécute une action quand une donnée change (sauvegarder, appeler une API)."
revu:
sources:
  - "https://vuejs.org/guide/essentials/computed.html"
---
# Computed et watchers Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : `computed` crée une valeur **calculée** à partir d'autres données (la liste de projets filtrée), recalculée automatiquement quand elles changent. `watch` **exécute une action** quand une donnée change (sauvegarder, appeler une API).

## Le problème

**Pourquoi c'est utile ?**
Pour calculer une valeur à partir d'autres, ou lancer une action quand une donnée change.

**Qu'est-ce qui se passait sans ça ?**
On recalculait à la main à chaque modification, en oubliant des cas, ou on stockait des valeurs dérivées qui devenaient fausses.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Règle : `computed` pour **calculer**, `watch` pour **agir**.

### `computed` : une formule de tableur

Image : une cellule Excel `=SOMME(A1:A10)`. Tu ne la mets jamais à jour à la main : elle se recalcule dès qu'une cellule change.

```ts
import { ref, computed } from 'vue';

const projects = ref<Project[]>([]);
const tech = ref<Tech | null>(null);
const search = ref('');

const filtered = computed(() =>
  projects.value
    .filter(p => !tech.value || p.techs.includes(tech.value))
    .filter(p => p.title.toLowerCase().includes(search.value.toLowerCase())),
);

const count = computed(() => filtered.value.length);
```

```vue
<template>
  <p>{{ count }} projets</p>
  <ProjectCard v-for="p in filtered" :key="p.slug" :project="p" />
</template>
```

C'est exactement la page Projets du Portfolio : filtre + recherche + compteur, sans une ligne de mise à jour manuelle.

**Avantages :** le calcul est mis en cache (refait seulement si `projects`, `tech` ou `search` changent), et le template reste simple.

## 🧪 Exemple

### `watch` : réagir à un changement

```ts
import { watch } from 'vue';

// Sauvegarder le thème à chaque changement
watch(theme, (nouveau) => {
  localStorage.setItem('theme', nouveau);
});

// Recharger quand le paramètre de l'URL change
watch(() => route.params.slug, (slug) => {
  chargerProjet(slug as string);
}, { immediate: true });   // immediate : exécuter aussi au démarrage
```

| Tu veux… | Utilise |
|---|---|
| une valeur dérivée (filtre, total, texte formaté) | `computed` |
| sauvegarder, appeler une API, lancer une animation | `watch` |
| réagir à tout ce qu'une fonction lit, sans préciser | `watchEffect` |

## ⚠️ Limites et pièges

- **`watch` pour recopier une valeur dans une autre** : c'est un `computed` qui s'ignore.
  ```ts
  // ❌
  watch(projects, () => { count.value = projects.value.length; });
  // ✅
  const count = computed(() => projects.value.length);
  ```
- **Modifier des données dans un `computed`** (ou trier avec `.sort()`, qui modifie l'original) : un `computed` doit seulement **lire et renvoyer**. Utilise `toSorted()`.
- **Surveiller une propriété d'un objet** : passe une fonction, `watch(() => filtres.value.tech, …)`.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Vue]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/essentials/computed.html
