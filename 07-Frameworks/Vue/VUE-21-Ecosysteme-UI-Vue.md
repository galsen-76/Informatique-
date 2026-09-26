---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M06
tags:
  - frameworks/vue/ecosysteme
aliases:
  - "Écosystème UI Vue.js"
parent: "[[Vue]]"
related_theory:
  - "[[CSS-09-Architecture-BEM-Tailwind|Architecture CSS BEM et Tailwind]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/ecosystem/"
---

# Écosystème UI Vue.js

> [!abstract] En bref
> Les outils de l'écosystème Vue qui te feront gagner du temps en entreprise et dans tes projets. Pas besoin de tout connaître : voici **ce que je te conseille** d'utiliser, et ce qui existe à côté.

## Ta boîte à outils

| Besoin | Mon choix | Alternatives |
|---|---|---|
| Créer le projet | `npm create vue@latest` (Vite) | Nuxt si SEO important |
| Composants (boutons, tableaux, menus, formulaires) | **PrimeVue** (thème Aura) | Vuetify, Quasar, Naive UI |
| Mise en page, ajustements | **Tailwind CSS** | CSS du composant |
| Icônes | **Lucide** (`lucide-vue-next`) | PrimeIcons, Iconify |
| Utilitaires (mode sombre, localStorage, debounce…) | **VueUse** | |
| État partagé | **Pinia** | |
| Routes | **Vue Router** | |
| Formulaires | **VeeValidate + Zod** | FormKit |
| Appels API avec cache | TanStack Query (`@tanstack/vue-query`) | un composable maison |
| Graphiques | PrimeVue Chart (Chart.js) | ECharts (`vue-echarts`) |
| Tests | **Vitest** + Vue Test Utils, **Playwright** | Cypress |
| Débogage | **Vue DevTools** (extension navigateur) | |
| Éditeur | extension **Vue - Official** (VS Code) | WebStorm |

## La stack du Portfolio

```bash
npm create vue@latest portfolio        # TypeScript, Router, Vitest, ESLint, Prettier
npm i primevue @primeuix/themes primeicons lucide-vue-next @vueuse/core
npm i vee-validate zod @vee-validate/zod
npm i -D tailwindcss @tailwindcss/vite
```

Installation et configuration pas à pas : [[UI-Librairies-Interfaces-Rapides|Librairies UI pour interfaces rapides]].

## Pourquoi ces choix

- **PrimeVue** : existe aussi en version Angular (**PrimeNG**) avec les mêmes composants. Ce que tu apprends dans le Portfolio sert directement dans CinéTrack.
- **VueUse** : évite de réécrire 200 petites fonctions courantes.
- **Vitest** : même configuration que Vite, très rapide.

## Pièges

- **Empiler les librairies** de composants (PrimeVue + Vuetify) : incohérence visuelle et poids en plus. Une seule.
- **Installer une librairie pour 10 lignes de code** : vérifie qu'elle est maintenue (dernière mise à jour, nombre de téléchargements) et qu'elle en vaut la peine.
