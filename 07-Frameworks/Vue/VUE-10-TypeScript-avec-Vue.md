---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
tags:
  - frameworks/vue/typescript
aliases:
  - "TypeScript avec Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[VUE-05-Props-Emits|Props & Emits Vue.js (Communication Parent-Enfant)]]"
  - "[[TS-17-Fichiers-Declaration-Types-Tiers|Fichiers de Déclaration et Types Tiers]]"
related_snippets:
  - "[[04_Snippets/vue-10-typescript-avec-vue]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/typescript/composition-api.html"
---

# TypeScript avec Vue.js

> [!abstract] Introduction
> Vue 3 est écrit en TypeScript ; avec `<script setup lang="ts">`, props, emits, refs et stores sont entièrement typés — indispensable en entreprise.

> [!warning]- Prérequis
> [[VUE-01-Fondamentaux|Fondamentaux Vue.js]], [[TS-06-Generics|Generics]]

---

## Théorie

> [!question]- C'est quoi ?
> ```vue
> <script setup lang="ts">
> interface Film { id: number; titre: string; note?: number }
> const props = withDefaults(defineProps<{ film: Film; compact?: boolean }>(), { compact: false });
> const emit = defineEmits<{ favori: [id: number]; noter: [id: number, note: number] }>();
> const note = defineModel<number>('note', { default: 0 });   // Vue 3.4+
> const films = ref<Film[]>([]);
> const input = useTemplateRef<HTMLInputElement>('champ');   // Vue 3.5+
> </script>
> ```

> [!example]- Analogie
> Les props non typées sont une prise électrique sans détrompeur : ça rentre, mais parfois à l'envers. Avec TS, seule la bonne prise rentre.

> [!question]- Pourquoi l'utiliser ?
> Autocomplétion dans les templates, erreurs détectées au build (`vue-tsc`), refactoring sûr, contrats clairs entre composants.

> [!question]- Comment ça marche ?
> - `defineProps<T>()` : props déclarées par un type (plus de `['titre']`)
> - Props déstructurées réactives depuis Vue 3.5 : `const { compact = false } = defineProps<...>()`
> - `defineEmits<{ evt: [args] }>()` : emits typés
> - `defineModel()` : v-model sur un composant
> - `ref<T>()`, `computed<T>()`, `reactive<T>()`
> - Composants génériques : `<script setup lang="ts" generic="T extends { id: number }">`
> - Vérification : `vue-tsc --noEmit` dans la CI ; extension VS Code « Vue - Official »

> [!question]- Quand l'utiliser ?
> Toujours sur un projet professionnel (choisir TypeScript dans `npm create vue@latest`).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les types des props passés au runtime ne sont PAS vérifiés : une API qui renvoie une mauvaise forme passe quand même → valider aux frontières.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `lang="ts"` | Active TypeScript dans le SFC |
| `defineModel` | Macro pour v-model de composant |
| `vue-tsc` | Vérificateur de types pour fichiers `.vue` |
| Macro de compilateur | Fonction (defineProps…) traitée à la compilation, sans import |

---

## Points clés

- `defineProps<T>()` et `defineEmits<T>()` typés
- `vue-tsc` dans la CI
- `defineModel` pour les composants de saisie
- Composants génériques avec l'attribut `generic`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Importer `defineProps` (c'est une macro globale, pas d'import)
> - Utiliser des types importés complexes dans defineProps sur de vieilles versions (supporté depuis 3.3)
> - Typer `ref(null)` sans générique → type `Ref<null>`

---

## Exemple minimal

```vue
<script setup lang="ts" generic="T extends { id: number }">
defineProps<{ items: T[] }>();
defineSlots<{ default(props: { item: T }): any }>();
</script>
<template>
  <ul><li v-for="item in items" :key="item.id"><slot :item="item" /></li></ul>
</template>
```

> [!note] Ce que j'en retiens
> Un composant liste générique : le slot reçoit un `item` correctement typé selon ce que le parent passe.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Typer `provide/inject` avec `InjectionKey<T>`
> - Typer les routes (unplugin-vue-router) et les stores Pinia

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-19-Communication-Composants|Communication parent-enfant Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-10-typescript-avec-vue]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `vue-tsc` est-il nécessaire alors que Vite compile déjà le TS ?

---

## Tâches

- [ ] #task Migrer les notes Vue existantes (props/emits en tableau) vers la syntaxe typée
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
