---
type: notion
statut: a apprendre
resume: "Une donnée réactive est une donnée que Vue surveille : dès qu'elle change, tout ce qui l'affiche se met à jour."
revu:
sources:
  - "https://vuejs.org/guide/essentials/reactivity-fundamentals.html"
---
# Réactivité Vue ref et reactive

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une donnée **réactive** est une donnée que Vue surveille : dès qu'elle change, tout ce qui l'affiche se met à jour.

## Le problème

**Pourquoi c'est utile ?**
Pour que Vue surveille une donnée et mette à jour tout ce qui l'affiche.

**Qu'est-ce qui se passait sans ça ?**
Il fallait penser à rafraîchir chaque endroit de la page après chaque changement.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

On la crée avec `ref()`. C'est la brique de base de tout ce que tu feras en Vue.

### `ref` : la boîte surveillée

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

### Ce qui n'est PAS réactif

```ts
let compteur = 0;             // ❌ variable normale : l'écran ne bouge pas
compteur++;

const compteur = ref(0);      // ✅
compteur.value++;
```

## 🧪 Exemple

### `reactive` : pour un objet

```ts
import { reactive } from 'vue';

const filtres = reactive({ techno: 'vue', recherche: '' });
filtres.recherche = 'dune';   // pas de .value
```

**Mon conseil :** utilise `ref` partout. C'est plus simple d'avoir une seule règle, et `reactive` a des pièges (ci-dessous).

## ⚠️ Limites et pièges

- **Oublier `.value`** dans le script : `if (chargement)` est toujours vrai (c'est la boîte, pas son contenu). Écris `if (chargement.value)`.
- **Déstructurer un `reactive`** : les variables obtenues ne sont plus réactives.
  ```ts
  const { recherche } = filtres;     // ❌ copie figée
  const { recherche } = toRefs(filtres); // ✅ si vraiment nécessaire
  ```
- **Remplacer un `reactive` entier** (`filtres = {…}`) : impossible avec `const`, et casse le lien. Avec `ref`, `filtres.value = {…}` fonctionne.

Pour calculer une valeur à partir d'autres (liste filtrée, total) : [[06 Computed et watchers Vue|computed]].

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/essentials/reactivity-fundamentals.html
