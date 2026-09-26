---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frameworks/vue/typescript
aliases:
  - "TypeScript avec Vue.js"
parent: "[[Vue]]"
related_theory:
  - "[[VUE-05-Props-Emits|Props & Emits Vue.js (Communication Parent-Enfant)]]"
  - "[[TS-17-Fichiers-Declaration-Types-Tiers|Fichiers de Déclaration et Types Tiers]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/typescript/composition-api.html"
---

# TypeScript avec Vue.js

> [!abstract] En bref
> Avec `<script setup lang="ts">`, tout est typé : les props, les événements, les `ref`, les stores. L'éditeur t'avertit si tu passes une mauvaise prop ou oublies un champ. Voici **où** mettre les types dans un composant Vue.

## Aide-mémoire

```vue
<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import type { Project, Tech } from '@/features/projects/data/project.model';

// Props
const props = defineProps<{
  project: Project;
  size?: 'sm' | 'md';
}>();

// Événements
const emit = defineEmits<{
  open: [slug: string];
  favorite: [id: number, value: boolean];
}>();

// v-model du composant
const selected = defineModel<Tech | null>({ default: null });

// ref : le type est deviné…
const count = ref(0);                         // Ref<number>
// …sauf si la valeur de départ est vide ou null
const projects = ref<Project[]>([]);
const error = ref<string | null>(null);

// computed : type deviné
const title = computed(() => props.project.title.toUpperCase());   // ComputedRef<string>

// Référence vers un élément du template
const input = useTemplateRef<HTMLInputElement>('search');

// Événement du DOM
function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <input ref="search" @input="onInput">
</template>
```

## Où ranger les types

Pas dans les composants : dans un fichier de modèle par fonctionnalité (voir [[ARCH-15-Structure-de-Projet|Structure de projet]]).

```ts
// features/projects/data/project.model.ts
export type Tech = 'vue' | 'angular' | 'nestjs';
export interface Project {
  slug: string;
  title: string;
  techs: Tech[];
  summary: string;
}
```

Et `import type { … }` pour les importer.

## Vérifier tout le projet

L'éditeur vérifie le fichier ouvert. Pour tout vérifier (et dans la CI) :

```bash
npx vue-tsc --noEmit
```

Objectif du Portfolio : **zéro erreur** et **zéro `any`**.

## Réglages éditeur

- **VS Code** : extension officielle **Vue - Official** (anciennement Volar).
- **IntelliJ / WebStorm** : support Vue intégré.

## Pièges

- **`ref([])` sans type** : devient `Ref<never[]>`, tu ne peux rien y ajouter. Écris `ref<Project[]>([])`.
- **`defineProps` avec un type importé complexe** : fonctionne depuis Vue 3.3, mais garde des props simples et lisibles.
- **Les variables d'environnement** `import.meta.env.VITE_…` : déclare-les dans `env.d.ts` pour les typer (voir [[TS-17-Fichiers-Declaration-Types-Tiers|Fichiers de déclaration]]).
