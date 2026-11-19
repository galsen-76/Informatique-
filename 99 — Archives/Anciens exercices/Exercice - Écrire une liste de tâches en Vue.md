---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Vue.js]]"
  - "[[Composant monofichier Vue (SFC)]]"
  - "[[Réactivité Vue (ref et computed)]]"
  - "[[Directives Vue]]"
tags:
  - exercice
---
# Exercice — Écrire une liste de tâches en Vue

> [!info] Objectif
> Refaire en Vue la liste de tâches déjà faite avec le DOM et avec React, pour comparer les trois approches.
> Notions : [[Vue.js]] · [[Composant monofichier Vue (SFC)]] · [[Réactivité Vue (ref et computed)]] · [[Directives Vue]]

## Consignes
- [ ] Crée un projet avec `npm create vue@latest` (TypeScript oui, le reste non) et lance-le
- [ ] Crée `TacheItem.vue` (props : la tâche ; événements : `basculer`, `supprimer`) et `ListeTaches.vue`
- [ ] Formulaire d'ajout avec `v-model.trim` et `@submit.prevent` ; refuse une tâche vide
- [ ] Affiche « Aucune tâche » avec `v-if`, la liste avec `v-for` et `:key`
- [ ] Un `computed` pour le nombre de tâches restantes, un autre pour la liste filtrée par un champ de recherche
- [ ] Un `watch` qui enregistre les tâches dans localStorage ; recharge-les au montage
- [ ] Écris en trois lignes ce qui t'a paru plus simple ou plus compliqué qu'en React

> [!question]- Indice
> Dans `TacheItem.vue` : `const emit = defineEmits<{ basculer: [id: number]; supprimer: [id: number] }>()` puis `@click="emit('basculer', tache.id)"`.

> [!question]- Solution
> ```vue
> <!-- ListeTaches.vue -->
> <script setup lang="ts">
> import { ref, computed, watch, onMounted } from "vue";
> import TacheItem from "./TacheItem.vue";
> interface Tache { id: number; nom: string; fini: boolean }
> const taches = ref<Tache[]>([]);
> const texte = ref(""), recherche = ref("");
> const restantes = computed(() => taches.value.filter((t) => !t.fini).length);
> const visibles = computed(() => taches.value.filter((t) => t.nom.includes(recherche.value)));
> function ajouter() { if (!texte.value) return; taches.value.push({ id: Date.now(), nom: texte.value, fini: false }); texte.value = ""; }
> const basculer = (id: number) => { const t = taches.value.find((x) => x.id === id); if (t) t.fini = !t.fini; };
> const supprimer = (id: number) => { taches.value = taches.value.filter((t) => t.id !== id); };
> watch(taches, (v) => localStorage.setItem("taches", JSON.stringify(v)), { deep: true });
> onMounted(() => { taches.value = JSON.parse(localStorage.getItem("taches") ?? "[]"); });
> </script>
> <template>
>   <form @submit.prevent="ajouter"><input v-model.trim="texte" /><button :disabled="!texte">Ajouter</button></form>
>   <input v-model="recherche" placeholder="Rechercher" />
>   <p v-if="taches.length === 0">Aucune tâche</p>
>   <ul v-else><TacheItem v-for="t in visibles" :key="t.id" :tache="t" @basculer="basculer" @supprimer="supprimer" /></ul>
>   <p>{{ restantes }} restante(s)</p>
> </template>
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
