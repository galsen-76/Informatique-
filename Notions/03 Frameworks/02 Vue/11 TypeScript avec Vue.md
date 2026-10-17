---
type: notion
statut: a apprendre
resume: "Avec <script setup lang=\"ts\">, tout est typé : les props, les événements, les ref, les stores."
revu:
sources:
  - "https://vuejs.org/guide/typescript/composition-api.html"
---
# TypeScript avec Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Avec `<script setup lang="ts">`, tout est typé : les props, les événements, les `ref`, les stores.

## Le problème

**Pourquoi c'est utile ?**
Pour typer props, événements, ref et stores dans les composants Vue.

**Qu'est-ce qui se passait sans ça ?**
On passait une mauvaise prop ou on oubliait un champ sans aucune alerte de l'éditeur.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

L'éditeur t'avertit si tu passes une mauvaise prop ou oublies un champ. Voici **où** mettre les types dans un composant Vue.

### Aide-mémoire

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

### Réglages éditeur

- **WebStorm** : support Vue et TypeScript intégré, rien à installer.

## 🧪 Exemple

### Où ranger les types

Pas dans les composants : dans un fichier de modèle par fonctionnalité (voir [[04 Structure de projet|Structure de projet]]).

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

## ⚠️ Limites et pièges

- **`ref([])` sans type** : devient `Ref<never[]>`, tu ne peux rien y ajouter. Écris `ref<Project[]>([])`.
- **`defineProps` avec un type importé complexe** : fonctionne depuis Vue 3.3, mais garde des props simples et lisibles.
- **Les variables d'environnement** `import.meta.env.VITE_…` : déclare-les dans `env.d.ts` pour les typer (voir [[17 Fichiers de déclaration et types tiers|Fichiers de déclaration]]).

## 🏋️ S'entraîner

### Vérifier tout le projet

L'éditeur vérifie le fichier ouvert. Pour tout vérifier (et dans la CI) :

```bash
npx vue-tsc --noEmit
```

Objectif du Portfolio : **zéro erreur** et **zéro `any`**.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** [[05 Props et emits Vue|Props et emits Vue]], [[17 Fichiers de déclaration et types tiers|Fichiers de déclaration et types tiers]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/typescript/composition-api.html
