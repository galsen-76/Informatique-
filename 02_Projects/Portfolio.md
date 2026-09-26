---
created: 2026-09-24
modified: 2026-09-26
type: project
status: "🔴 Not Started"
tags:
  - projet
aliases:
  - "Portfolio"
---

## Prérequis

> [!warning] Avant de démarrer
> Bases JS/TS du M01, Git et l'installation de l'environnement. Les notes Vue s'apprennent PENDANT le projet.

**À maîtriser avant de commencer :**
- [[GIT-01-Fondamentaux|Git Fondamentaux]]
- [[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]]
- [[GIT-03-Depots-Distants|Dépôts Distants]]
- [[GIT-07-Conventions-Commits-SemVer|Conventions de Commits et SemVer]]
- [[OUT-01-Terminal-Bash|Terminal et Bash]]
- [[NODE-01-Node-npm|Node.js et npm]]
- [[JS-01-Fondamentaux|Fondamentaux JavaScript]]
- [[JS-02-Types-Coercition-Egalite|Types et Coercition JavaScript]]
- [[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]
- [[TS-01-Fondamentaux|Fondamentaux TypeScript]]
- [[TS-03-Interfaces-Types|Interfaces & Types (Type Aliases)]]

**À apprendre pendant le projet :**
- [[VUE-01-Fondamentaux|Fondamentaux Vue.js]]
- [[VUE-02-Reactivite|Réactivité Vue.js]]
- [[VUE-03-Composants-SFC|Composants & SFC Vue.js]]
- [[VUE-05-Props-Emits|Props & Emits Vue.js (Communication Parent-Enfant)]]
- [[VUE-06-Computed-Watchers|Computed & Watchers Vue.js]]
- [[VUE-07-Composition-API|Composition API & Composables Vue.js]]
- [[VUE-08-Vue-Router|Vue Router]]
- [[VUE-10-TypeScript-avec-Vue|TypeScript avec Vue.js]]
- [[JS-07-Promises-Async-Await|Promises et Async Await JavaScript]]
- [[JS-10-Fetch-JSON-HTTP|Fetch API et JSON]]
- [[TS-07-Union-Intersection|Union & Intersection Types]]
- [[VUE-14-Formulaires-Validation|Formulaires et Validation Vue.js]]
- [[VUE-16-Tests-Vitest|Tests Vue.js avec Vitest]]

**Architecture et UI :**
- [[ARCH-15-Structure-de-Projet|Structure de Projet (modèle général)]]
- [[VUE-22-Template-Architecture-Vue|Template d'Architecture Vue]]
- [[UI-Librairies-Interfaces-Rapides|Librairies UI pour Interfaces Rapides]]
- [[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]
- [[CSS-03-Flexbox|Flexbox CSS]]
- [[CSS-04-Grid|Grid CSS]]

---

# 🛠️ Portfolio

> [!abstract] Objectif
> Ton site personnel, construit **en Vue 3 + TypeScript** avec une librairie UI (PrimeVue, icônes Lucide, Tailwind). Le HTML/CSS de mise en page est assisté par l'IA : ton effort va au **TypeScript et à Vue** (composants typés, props/emits, composables, router, appels API, tests).

**Période :** M01 → M03 de la [[Roadmap-12-mois|Roadmap 12 mois]]  
**Stack :** Vue 3 (`<script setup lang="ts">`), TypeScript strict, Vite, Vue Router, PrimeVue + `@primeuix/themes`, lucide-vue-next, Tailwind, VueUse, Vitest, ESLint/Prettier, GitLab Pages

---

> [!success] Maquette validée
> Les 5 pages sont dessinées dans [[Portfolio-Maquette|Maquette du Portfolio]] (captures, maquette cliquable, charte graphique complète).

## Pages

| Page | Contenu | Concepts travaillés |
|---|---|---|
| Accueil | Hero + photo, Ce que je fais, projets à la une, expérience, stack, CTA | Composants, props typées |
| Projets | Grille de cartes + filtre par techno + recherche + tri | `v-for`/`:key`, `computed`, filtre typé |
| Détail projet | Étude de cas : contexte, architecture, choix, difficultés, sécurité, résultats | Vue Router, paramètre `:slug` |
| Contact | Formulaire validé | `v-model`, VeeValidate + Zod |
| (bonus) Activité | Derniers dépôts via l'API GitLab/GitHub | `fetch`, composable, états chargement/erreur |

---

## Jalons

### M01 — Mise en place (en parallèle des bases JS/TS)
- [ ] #task `npm create vue@latest portfolio` → TypeScript, Router, Vitest, ESLint, Prettier
- [ ] #task Lire la structure générée (`main.ts`, `App.vue`, `router/`, `env.d.ts`, `tsconfig`) et la documenter dans le README
- [ ] #task Créer le squelette `core/`, `shared/`, `features/` du [[VUE-22-Template-Architecture-Vue|template d'architecture Vue]] + alias `@/`
- [ ] #task Installer PrimeVue + thème Aura + PrimeIcons, lucide-vue-next, Tailwind (voir [[UI-Librairies-Interfaces-Rapides|Librairies UI]])
- [ ] #task Layout (en-tête, menu, pied de page) généré avec l'IA à partir des composants PrimeVue — relire et corriger la sémantique HTML
- [ ] #task Dépôt GitLab, commits conventionnels

### M02 — Composants et logique TypeScript
- [ ] #task Fichier `data/projets.ts` typé (`interface Projet`, union littérale pour les technos)
- [ ] #task Composant `ProjetCard.vue` : `defineProps<{ projet: Projet }>()` + emit `ouvrir`
- [ ] #task Page Projets : filtre par techno et recherche texte avec `computed` (fonctions pures testées)
- [ ] #task Mode sombre persisté (`useDark`/`useLocalStorage` de VueUse, ou composable maison)
- [ ] #task Composable `useDepots()` : appel API GitLab/GitHub avec `fetch`, `AbortController`, états chargement / vide / erreur en union discriminée
- [ ] #task Tests Vitest des fonctions de filtre et du composable

### M03 — TypeScript strict, routing, qualité, déploiement
- [ ] #task `strict: true`, zéro `any`, `vue-tsc --noEmit` sans erreur
- [ ] #task Route détail `/projets/:slug` + page 404 + titre de page par route
- [ ] #task Formulaire de contact : VeeValidate + Zod (schéma et type partagés)
- [ ] #task Réponses d'API validées avec Zod
- [ ] #task 15+ tests (fonctions, composables, un composant avec Vue Test Utils)
- [ ] #task Lighthouse ≥ 90 (performance, accessibilité, SEO)
- [ ] #task Déploiement GitLab Pages via pipeline (lint → tests → build → pages)

---

## Notes à mobiliser

- JS/TS : [[JS-05-Objets-Tableaux-Methodes|Objets et tableaux]] · [[JS-07-Promises-Async-Await|Promises]] · [[JS-10-Fetch-JSON-HTTP|Fetch]] · [[TS-03-Interfaces-Types|Interfaces & types]] · [[TS-07-Union-Intersection|Unions]] · [[TS-18-Patterns-TypeScript-Pro|Patterns pro]] · [[TS-19-Validation-Runtime-Zod|Zod]]
- Vue : [[VUE-01-Fondamentaux|Fondamentaux]] · [[VUE-02-Reactivite|Réactivité]] · [[VUE-03-Composants-SFC|Composants]] · [[VUE-04-Directives-Templates|Directives]] · [[VUE-05-Props-Emits|Props & emits]] · [[VUE-06-Computed-Watchers|Computed & watch]] · [[VUE-07-Composition-API|Composables]] · [[VUE-08-Vue-Router|Vue Router]] · [[VUE-10-TypeScript-avec-Vue|TypeScript avec Vue]] · [[VUE-14-Formulaires-Validation|Formulaires]] · [[VUE-15-Appels-API|Appels API]] · [[VUE-16-Tests-Vitest|Tests]]
- UI : [[UI-Librairies-Interfaces-Rapides|Librairies UI pour interfaces rapides]] · [[HTML-04-Aide-Memoire-Balises|Aide-mémoire des balises]] · [[HTML-03-Accessibilite-Web|Accessibilité]]

---

## Définition de « terminé »

- En ligne sur GitLab Pages, pipeline vert
- Aucun `any`, `vue-tsc` sans erreur
- README : objectif, captures, démarrage en 5 minutes, choix techniques
- Je sais expliquer chaque composant et composable sans le relire

---

## Journal

- 2026-09-24 : projet créé
- 2026-09-26 : passage en Vue 3 + TypeScript + PrimeVue (HTML/CSS assistés par l'IA)
- 2026-09-26 : maquette des 5 pages validée ([[Portfolio-Maquette|Maquette du Portfolio]])

## Notes libres

- ?
