---
type: notion
statut: a apprendre
resume: "La structure de projet générale appliquée à Vue 3 + TypeScript, avec le code de chaque couche."
revu:
sources:
  - "https://vuejs.org/style-guide/"
---
# Template d'architecture Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : La [[Structure de projet|structure de projet générale]] appliquée à Vue 3 + TypeScript, avec le code de chaque couche.

## Le problème

**Pourquoi c'est utile ?**
Pour démarrer un projet Vue avec une arborescence et des couches déjà pensées.

**Qu'est-ce qui se passait sans ça ?**
Chaque projet partait de zéro et les fichiers finissaient rangés au hasard.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Vue n'impose aucune organisation : ce modèle t'en donne une, **à adapter** à la taille du projet.

### L'arborescence

```text
src/
├── core/
│   ├── config/env.ts            # variables d'environnement (import.meta.env) validées
│   ├── http/http.ts             # client HTTP : URL de base, en-têtes, erreurs
│   └── layout/                  # AppHeader.vue, AppFooter.vue, NotFound.vue
├── shared/
│   ├── ui/                      # BaseLoader.vue, BaseEmptyState.vue…
│   ├── composables/             # composables génériques (useAsync…)
│   ├── types/                   # Page<T>, LoadState<T>
│   └── utils/
├── features/
│   └── projects/
│       ├── data/
│       │   ├── project.model.ts
│       │   ├── project.dto.ts
│       │   ├── project.mapper.ts
│       │   ├── projects.api.ts
│       │   └── projects.store.ts     # Pinia, seulement si l'état est partagé
│       ├── composables/              # useProjectFilters.ts
│       ├── components/               # ProjectCard.vue, ProjectGrid.vue
│       ├── pages/                    # ProjectsPage.vue, ProjectDetailPage.vue
│       └── projects.routes.ts
├── router/index.ts              # assemble les routes des features
├── styles/                      # variables CSS, thème
├── App.vue
└── main.ts
```

Les tests `*.spec.ts` sont posés **à côté** du fichier testé.

### L'alias `@/`

Déjà configuré par `npm create vue@latest` : `@/` pointe vers `src/`. Tu écris `import { toProject } from '@/features/projects/data/project.mapper'`.

## 🧪 Exemple

### Le code de chaque couche

**1. Le modèle et le mapper** : le reste de l'app ne dépend pas de la forme des données brutes.

```ts
// project.model.ts
export type Tech = 'vue' | 'angular' | 'nestjs';
export interface Project { slug: string; title: string; techs: Tech[]; summary: string }

// project.mapper.ts
export const toProject = (dto: ProjectDto): Project => ({
  slug: dto.slug,
  title: dto.name,
  techs: dto.stack,
  summary: dto.description ?? '',
});
```

**2. Un composable** : de la logique réutilisable avec de l'état réactif.

```ts
// composables/useProjectFilters.ts
export function useProjectFilters(projects: Ref<Project[]>) {
  const tech = ref<Tech | null>(null);
  const search = ref('');

  const filtered = computed(() =>
    projects.value.filter(p =>
      (!tech.value || p.techs.includes(tech.value)) &&
      p.title.toLowerCase().includes(search.value.toLowerCase()),
    ),
  );

  return { tech, search, filtered };
}
```

**3. Le store Pinia** : seulement pour un état partagé entre plusieurs pages.

```ts
// data/projects.store.ts
export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);
  const loading = ref(false);

  async function load() {
    loading.value = true;
    try { projects.value = await projectsApi.list(); }
    finally { loading.value = false; }
  }

  return { projects, loading, load };
});
```

**4. Un composant d'affichage** : props en entrée, événements en sortie.

```vue
<!-- components/ProjectCard.vue -->
<script setup lang="ts">
defineProps<{ project: Project }>();
defineEmits<{ open: [slug: string] }>();
</script>

<template>
  <article>
    <h3>{{ project.title }}</h3>
    <p>{{ project.summary }}</p>
    <button type="button" @click="$emit('open', project.slug)">Voir</button>
  </article>
</template>
```

**5. La page** : branche les données sur les composants.

```vue
<!-- pages/ProjectsPage.vue -->
<script setup lang="ts">
const store = useProjectsStore();
const { projects, loading } = storeToRefs(store);
const { tech, search, filtered } = useProjectFilters(projects);
onMounted(store.load);
</script>

<template>
  <BaseLoader v-if="loading" />
  <ProjectGrid v-else :projects="filtered" />
</template>
```

**6. Les routes** : chaque page se charge à la demande.

```ts
// features/projects/projects.routes.ts
export default [
  { path: '/projects', component: () => import('./pages/ProjectsPage.vue') },
  { path: '/projects/:slug', component: () => import('./pages/ProjectDetailPage.vue'), props: true },
] satisfies RouteRecordRaw[];

// router/index.ts
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...projectsRoutes,
    { path: '/:pathMatch(.*)*', component: () => import('@/core/layout/NotFound.vue') },
  ],
});
```

## ⚠️ Limites et pièges

- **Tout mettre dans Pinia** : un état utilisé par une seule page reste dans la page ou un composable.
- **Déstructurer un store sans `storeToRefs`** : tu perds la réactivité.
- **Un composant d'affichage qui fait des appels HTTP** : garde-les dans `data/`.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Vue]]
- **Voir aussi :** [[Architecture d'un projet Vue]], [[Architecture frontend]], [[Principes SOLID]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/style-guide/
