---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M06
tags:
  - frameworks/vue/nuxt
aliases:
  - "Nuxt et SSR Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[VUE-08-Vue-Router|Vue Router]]"
  - "[[VUE-15-Appels-API|Appels API Vue.js]]"
related_snippets:
  - "[[04_Snippets/vue-18-nuxt-ssr]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://nuxt.com/docs/getting-started/introduction"
---

# Nuxt et SSR Vue.js

> [!abstract] Introduction
> Nuxt est le méta-framework de Vue : routing par fichiers, SSR/SSG, auto-imports, data fetching serveur et même des routes API — l'équivalent de Next.js pour React ou d'Angular SSR.

> [!warning]- Prérequis
> [[VUE-08-Vue-Router|Vue Router]], [[VUE-09-Pinia-State-Management|Pinia (State Management Vue.js)]]

---

## Théorie

> [!question]- C'est quoi ?
> ```text
> pages/
> ├── index.vue            → /
> ├── films/
> │   ├── index.vue        → /films
> │   └── [id].vue         → /films/:id
> server/api/films.get.ts  → GET /api/films
> ```
> ```vue
> <script setup lang="ts">
> const route = useRoute();
> const { data: film, status, error } = await useFetch(`/api/films/${route.params.id}`);
> useSeoMeta({ title: () => film.value?.titre ?? 'Film' });
> </script>
> ```

> [!example]- Analogie
> Vue est un moteur ; Nuxt est la voiture complète autour (châssis, tableau de bord, GPS) avec des conventions qui évitent de tout assembler.

> [!question]- Pourquoi l'utiliser ?
> SEO, performance du premier affichage, conventions (routing, layouts, middleware), productivité (auto-imports).

> [!question]- Comment ça marche ?
> - Modes : SSR universel (défaut), SSG (`nuxi generate`), SPA, rendu hybride par route (`routeRules`)
> - `useFetch` / `useAsyncData` : données chargées côté serveur puis transférées au client (pas de double requête)
> - `layouts/`, `middleware/` (≈ guards), `plugins/`, `composables/` auto-importés
> - Serveur Nitro : routes API, déploiement sur Node, serverless ou edge

> [!question]- Quand l'utiliser ?
> Site public avec SEO, e-commerce, contenu. Pour une application métier derrière login, une SPA Vue + Vite suffit souvent.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Complexité SSR (code navigateur-only, hydratation), conventions magiques (auto-imports) qui surprennent au début.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Méta-framework | Framework construit au-dessus d'un framework UI |
| File-based routing | Routes déduites de l'arborescence de fichiers |
| Nitro | Moteur serveur de Nuxt |
| `routeRules` | Stratégie de rendu/cache par route |

---

## Points clés

- Routing par fichiers dans `pages/`
- `useFetch` pour les données SSR-safe
- `routeRules` pour mixer SSR, SSG, SPA
- Code navigateur dans `onMounted` ou `<ClientOnly>`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `fetch` classique dans le setup → requête exécutée deux fois (serveur puis client)
> - Accéder à `window` pendant le rendu serveur

---

## Exemple minimal

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/films/**': { swr: 3600 },       // SSR + cache 1 h
    '/compte/**': { ssr: false },     // SPA
  },
});
```

> [!note] Ce que j'en retiens
> Une seule application, trois stratégies de rendu selon la page.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comparer Nuxt et Angular SSR sur un même besoin (SEO, déploiement, coût)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-26-SSR-Hydratation|SSR et Hydratation Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-18-nuxt-ssr]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `useFetch` évite-t-il la double requête ?

---

## Tâches

- [ ] #task Créer un mini-projet Nuxt avec une page liste et une page détail
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
