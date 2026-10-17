---
type: notion
statut: a apprendre
resume: "Un composable est une fonction useQuelqueChose() qui regroupe de la logique réactive (ref, computed, watch) pour la réutiliser dans plusieurs composants."
revu:
sources:
  - "https://vuejs.org/guide/reusability/composables.html"
---
# Composition API et composables Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **composable** est une fonction `useQuelqueChose()` qui regroupe de la logique réactive (`ref`, `computed`, `watch`) pour la **réutiliser** dans plusieurs composants.

## Le problème

**Pourquoi c'est utile ?**
Pour regrouper et réutiliser de la logique réactive dans plusieurs composants.

**Qu'est-ce qui se passait sans ça ?**
La même logique (chargement, filtre) était recopiée dans chaque composant.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

C'est la façon Vue de ne pas dupliquer du code. Techniquement, c'est une [[Fonctions portée et closures JavaScript|closure]] avec des `ref`.

### Le principe

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

Le composant ne garde que l'assemblage. La logique est **testable seule** (voir [[Tests Vue avec Vitest|Tests]]).

### Règles d'écriture

| Règle | Pourquoi |
|---|---|
| Nom en `useXxx` | on reconnaît un composable au premier coup d'œil |
| Renvoyer un objet de `ref` | l'appelant peut déstructurer sans perdre la réactivité |
| Appeler en haut du `<script setup>` | pas dans un `if` ni dans une fonction appelée plus tard |
| Nettoyer ce qu'on ouvre | `onUnmounted(() => clearInterval(timer))` |

### Avant d'écrire un composable, regarde VueUse

**VueUse** en contient plus de 200 tout faits : `useDark` (mode sombre), `useLocalStorage`, `useDebounceFn`, `useMediaQuery`, `useIntersectionObserver`… Le Portfolio utilise `useDark`.

### Composable ou store Pinia ?

| | Composable | Store Pinia |
|---|---|---|
| État | **nouveau** à chaque appel | **partagé** par toute l'app |
| Exemple | les filtres d'une page | l'utilisateur connecté, les favoris |

## 🧪 Exemple

### Un composable pour les appels API

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

## ⚠️ Limites et pièges

- **Renvoyer `ref.value`** au lieu de la `ref` : l'appelant reçoit une valeur figée.
- **Appeler un composable dans un `setTimeout`** ou après un `await` : certaines fonctions (`onMounted`, `inject`) ne marchent plus.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Vue]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/reusability/composables.html
