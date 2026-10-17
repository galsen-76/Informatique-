---
type: notion
statut: a apprendre
resume: "Les outils de l'écosystème Vue qui te feront gagner du temps en entreprise et dans tes projets."
revu:
sources:
  - "https://vuejs.org/ecosystem/"
---
# Écosystème UI Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les outils de l'écosystème Vue qui te feront gagner du temps en entreprise et dans tes projets.

## Le problème

**Pourquoi c'est utile ?**
Pour connaître les outils de l'écosystème Vue qui font gagner du temps.

**Qu'est-ce qui se passait sans ça ?**
On réinventait des composants et des outils qui existaient déjà.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Pas besoin de tout connaître : voici **ce que je te conseille** d'utiliser, et ce qui existe à côté.

### Ta boîte à outils

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
| Éditeur | **WebStorm** (support Vue intégré) | VS Code + extension Vue - Official |

### Pourquoi ces choix

- **PrimeVue** : existe aussi en version Angular (**PrimeNG**) avec les mêmes composants. Ce que tu apprends dans le Portfolio sert directement dans CinéTrack.
- **VueUse** : évite de réécrire 200 petites fonctions courantes.
- **Vitest** : même configuration que Vite, très rapide.

## 🧪 Exemple

### La stack du Portfolio

```bash
npm create vue@latest portfolio        # TypeScript, Router, Vitest, ESLint, Prettier
npm i primevue @primeuix/themes primeicons lucide-vue-next @vueuse/core
npm i vee-validate zod @vee-validate/zod
npm i -D tailwindcss @tailwindcss/vite
```

Installation et configuration pas à pas : [[04 Librairies UI pour interfaces rapides|Librairies UI pour interfaces rapides]].

## ⚠️ Limites et pièges

- **Empiler les librairies** de composants (PrimeVue + Vuetify) : incohérence visuelle et poids en plus. Une seule.
- **Installer une librairie pour 10 lignes de code** : vérifie qu'elle est maintenue (dernière mise à jour, nombre de téléchargements) et qu'elle en vaut la peine.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** [[19 Architecture CSS BEM et Tailwind|Architecture CSS BEM et Tailwind]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/ecosystem/
