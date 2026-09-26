---
created: 2026-09-21
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
aliases:
  - "Réactivité Vue.js"
  - "Réactivité Vue.js (ref, reactive)"
tags:
  - frameworks/vue/reactivite
parent: "[[Vue]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html"
---

# Réactivité Vue.js (ref, reactive)

> [!abstract] En bref
> Une donnée **réactive** est une donnée que Vue surveille : dès qu'elle change, tout ce qui l'affiche se met à jour. On la crée avec `ref()`. C'est la brique de base de tout ce que tu feras en Vue.

## `ref` : la boîte surveillée

Image : `ref` est une **boîte avec une alarme**. Tu ranges une valeur dedans (`.value`) ; dès que tu changes le contenu, l'alarme prévient Vue, qui redessine ce qu'il faut.

```ts
import { ref } from 'vue';

const titre = ref('Mon portfolio');         // Ref<string>
const projets = ref<Project[]>([]);        // on précise le type si la valeur de départ est vide
const chargement = ref(false);

titre.value = 'Portfolio 2026';            // ✅ l'écran se met à jour
projets.value.push(nouveauProjet);         // ✅ aussi : Vue surveille l'intérieur
projets.value = [...projets.value, autre]; // ✅ remplacer marche aussi
```

```vue
<template>
  <h1>{{ titre }}</h1>          <!-- pas de .value dans le template -->
  <p v-if="chargement">Chargement…</p>
</template>
```

**La règle du `.value` :**
- dans le `<script>` → `titre.value` ;
- dans le `<template>` → `titre` (Vue le déballe pour toi).

## `reactive` : pour un objet

```ts
import { reactive } from 'vue';

const filtres = reactive({ techno: 'vue', recherche: '' });
filtres.recherche = 'dune';   // pas de .value
```

**Mon conseil :** utilise `ref` partout. C'est plus simple d'avoir une seule règle, et `reactive` a des pièges (ci-dessous).

## Ce qui n'est PAS réactif

```ts
let compteur = 0;             // ❌ variable normale : l'écran ne bouge pas
compteur++;

const compteur = ref(0);      // ✅
compteur.value++;
```

## Pièges

- **Oublier `.value`** dans le script : `if (chargement)` est toujours vrai (c'est la boîte, pas son contenu). Écris `if (chargement.value)`.
- **Déstructurer un `reactive`** : les variables obtenues ne sont plus réactives.
  ```ts
  const { recherche } = filtres;     // ❌ copie figée
  const { recherche } = toRefs(filtres); // ✅ si vraiment nécessaire
  ```
- **Remplacer un `reactive` entier** (`filtres = {…}`) : impossible avec `const`, et casse le lien. Avec `ref`, `filtres.value = {…}` fonctionne.

Pour calculer une valeur à partir d'autres (liste filtrée, total) : [[VUE-06-Computed-Watchers|computed]].
