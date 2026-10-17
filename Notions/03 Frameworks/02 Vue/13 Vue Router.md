---
type: notion
statut: a apprendre
resume: "Vue Router permet d'avoir plusieurs pages dans une application Vue : /, /projects, /projects/cinetrack, /contact."
revu:
sources:
  - "https://router.vuejs.org/"
---
# Vue Router

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Vue Router permet d'avoir **plusieurs pages** dans une application Vue : `/`, `/projects`, `/projects/cinetrack`, `/contact`.

## Le problème

**Pourquoi c'est utile ?**
Pour avoir plusieurs pages dans une application Vue sans recharger la page.

**Qu'est-ce qui se passait sans ça ?**
Chaque page était un fichier HTML séparé, et tout l'état était perdu à chaque navigation.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Quand l'URL change, il affiche le bon composant **sans recharger la page**. C'est ce qui fait tes 5 pages du Portfolio.

### Déclarer les routes

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/features/home/pages/HomePage.vue') },
    { path: '/projects', component: () => import('@/features/projects/pages/ProjectsPage.vue') },
    {
      path: '/projects/:slug',                 // :slug = partie variable de l'URL
      component: () => import('@/features/projects/pages/ProjectDetailPage.vue'),
      props: true,                             // le slug arrive en prop
    },
    { path: '/contact', component: () => import('@/features/contact/pages/ContactPage.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('@/core/layout/NotFound.vue') },  // 404
  ],
  scrollBehavior: () => ({ top: 0 }),          // remonter en haut à chaque page
});
```

`() => import(…)` = la page est téléchargée **seulement quand on y va** (lazy loading) : la première page s'affiche plus vite.

### Lire les paramètres de l'URL

```vue
<!-- ProjectDetailPage.vue -->
<script setup lang="ts">
const props = defineProps<{ slug: string }>();   // grâce à props: true
const project = computed(() => projects.find(p => p.slug === props.slug));
</script>
```

Ou avec `useRoute()` : `route.params.slug`, `route.query.page` (pour `?page=2`).

### Les gardes : contrôler l'accès

```ts
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.isLoggedIn) return '/login';
});

// et le titre de l'onglet par page
router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Portfolio'} — Ton Nom`;
});
```

## 🧪 Exemple

### Afficher la page et naviguer

```vue
<!-- App.vue -->
<template>
  <AppHeader />
  <RouterView />          <!-- ici s'affiche la page de la route actuelle -->
  <AppFooter />
</template>
```

```vue
<!-- Un lien -->
<RouterLink to="/projects">Projets</RouterLink>
<RouterLink :to="`/projects/${project.slug}`">Étude de cas</RouterLink>
```

`RouterLink` ajoute la classe `router-link-active` sur le lien de la page en cours : pratique pour surligner le menu.

Naviguer en TypeScript (après l'envoi d'un formulaire, par exemple) :

```ts
const router = useRouter();
router.push('/projects');
```

## ⚠️ Limites et pièges

- **Une page qui ne recharge pas ses données** quand on passe de `/projects/a` à `/projects/b` : c'est le même composant, réutilisé. Utilise un `computed` sur le slug, ou un `watch`.
- **Un vrai `<a href>`** au lieu de `RouterLink` : la page entière se recharge.
- **Page 404 sur le serveur** quand on rafraîchit `/projects` : le serveur doit renvoyer `index.html` pour toutes les URL (réglage de l'hébergeur).

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://router.vuejs.org/
