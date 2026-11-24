---
type: concept
module: "[[Module 19 - Vue.js]]"
related:
  - "[[Application monopage et routage]]"
  - "[[Service et injection de dépendances]]"
tags:
  - concept
  - frontend
---
# Pinia

> [!info] En une phrase
> Pinia est le store officiel de Vue : un endroit central qui garde un état partagé par plusieurs composants (utilisateur connecté, panier, filtres), avec ses actions.

## 1 · Comprendre
### Définition
```ts
// stores/taches.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useTachesStore = defineStore("taches", () => {
  const taches = ref<Tache[]>([]);                         // state
  const restantes = computed(() => taches.value.filter((t) => !t.fini).length);   // getter
  async function charger() {                               // action
    const rep = await fetch("/api/taches");
    if (!rep.ok) throw new Error(String(rep.status));
    taches.value = await rep.json();
  }
  return { taches, restantes, charger };
});
```
Dans un composant : `const store = useTachesStore(); store.charger();` puis `{{ store.restantes }}`.
Les Vue DevTools montrent l'état du store et son historique.

### Pourquoi ça existe
Quand plusieurs écrans partagent les mêmes données, se les passer de parent en enfant devient ingérable.

### Le problème résolu
Un seul endroit pour l'état partagé et la logique qui le modifie, facile à suivre et à tester.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
S[Store Pinia] --> A[Composant A]
  S --> B[Composant B]
  A -->|action| S
```

### Exemple concret
```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTachesStore } from "@/stores/taches";
const store = useTachesStore();
const { taches, restantes } = storeToRefs(store);   // garde la réactivité
onMounted(store.charger);
</script>
<template><p>{{ restantes }} restantes</p><TacheItem v-for="t in taches" :key="t.id" :tache="t" /></template>
```
Équivalents : **Vuex** (ancien, Vue 2), **Redux** ou **Zustand** (React), **services** et **NgRx** (Angular).

### Cas d'utilisation
- Utilisateur connecté et son jeton
- Données utilisées par plusieurs pages
- Panier, préférences

> [!warning] À ne pas confondre
> Tout mettre dans le store : l'état propre à un seul composant (un champ saisi, une fenêtre ouverte) reste local. Et déstructurer le store sans `storeToRefs` casse la réactivité.

## 3 · Relier
- **Prérequis** : [[État et réactivité]]
- **Complémentaires** : [[Application monopage et routage]] · [[Service et injection de dépendances]]
