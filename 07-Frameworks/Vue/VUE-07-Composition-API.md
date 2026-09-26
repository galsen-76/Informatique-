---
created: 2026-09-21
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
aliases:
  - "Composition API & Composables Vue.js"
tags:
  - frameworks/vue/composition-api
parent: "[[Vue]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/reusability/composables.html"
---

# Composition API & Composables Vue.js

> [!abstract] En bref
> Un **composable** est une fonction `useQuelqueChose()` qui regroupe de la logique réactive (`ref`, `computed`, `watch`) pour la **réutiliser** dans plusieurs composants. C'est la façon Vue de ne pas dupliquer du code. Techniquement, c'est une [[JS-03-Fonctions-Scope-Closures|closure]] avec des `ref`.

## Le principe

Un composant devient long ? Sa logique de filtre sert aussi ailleurs ? On la **sort** dans une fonction :

```ts
// features/projects/composables/useProjectFilters.ts
import { ref, computed, type Ref } from 'vue';

export function useProjectFilters(projects: Ref<Project[]>) {
  const tech = ref<Tech | null>(null);
  const search = ref('');

  const filtered = computed(() =>
    projects.value.filter(p =>
      (!tech.value || p.techs.includes(tech.value)) &&
      p.title.toLowerCase().includes(search.value.toLowerCase()),
    ),
  );

  const reset = () => { tech.value = null; search.value = ''; };

  return { tech, search, filtered, reset };
}
```

```vue
<!-- ProjectsPage.vue -->
<script setup lang="ts">
const { projects } = storeToRefs(useProjectsStore());
const { tech, search, filtered, reset } = useProjectFilters(projects);
</script>
```

Le composant ne garde que l'assemblage. La logique est **testable seule** (voir [[VUE-16-Tests-Vitest|Tests]]).

## Un composable pour les appels API

Le composable le plus utile : gérer chargement / erreur / données.

```ts
export function useAsync<T>(fn: () => Promise<T>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function run() {
    loading.value = true;
    error.value = null;
    try {
      data.value = await fn();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erreur inconnue';
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, run };
}

// usage
const { data: repos, loading, error, run } = useAsync(() => githubApi.lastRepos());
onMounted(run);
```

## Règles d'écriture

| Règle | Pourquoi |
|---|---|
| Nom en `useXxx` | on reconnaît un composable au premier coup d'œil |
| Renvoyer un objet de `ref` | l'appelant peut déstructurer sans perdre la réactivité |
| Appeler en haut du `<script setup>` | pas dans un `if` ni dans une fonction appelée plus tard |
| Nettoyer ce qu'on ouvre | `onUnmounted(() => clearInterval(timer))` |

## Avant d'écrire un composable, regarde VueUse

**VueUse** en contient plus de 200 tout faits : `useDark` (mode sombre), `useLocalStorage`, `useDebounceFn`, `useMediaQuery`, `useIntersectionObserver`… Le Portfolio utilise `useDark`.

## Composable ou store Pinia ?

| | Composable | [[VUE-09-Pinia-State-Management\|Store Pinia]] |
|---|---|---|
| État | **nouveau** à chaque appel | **partagé** par toute l'app |
| Exemple | les filtres d'une page | l'utilisateur connecté, les favoris |

## Pièges

- **Renvoyer `ref.value`** au lieu de la `ref` : l'appelant reçoit une valeur figée.
- **Appeler un composable dans un `setTimeout`** ou après un `await` : certaines fonctions (`onMounted`, `inject`) ne marchent plus.
