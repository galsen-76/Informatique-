---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M06
tags:
  - frameworks/vue/architecture
aliases:
  - "Architecture d'un Projet Vue.js"
parent: "[[Vue]]"
related_theory:
  - "[[ARCH-14-Architecture-Frontend|Architecture Frontend]]"
  - "[[VUE-09-Pinia-State-Management|Pinia (State Management Vue.js)]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/style-guide/"
---

# Architecture d'un Projet Vue.js

> [!abstract] En bref
> Vue ne t'impose aucune organisation : c'est à toi de choisir. Cette note explique **les principes** qui rendent un projet facile à faire évoluer. L'arborescence concrète à copier est dans [[VUE-22-Template-Architecture-Vue|Template d'architecture Vue]], et le modèle général dans [[ARCH-15-Structure-de-Projet|Structure de projet]].

## Les 5 principes

### 1. Ranger par fonctionnalité, pas par type de fichier

```text
❌ par type                     ✅ par fonctionnalité
components/ (80 fichiers)       features/projects/…
composables/ (30 fichiers)      features/contact/…
stores/ (15 fichiers)           features/activity/…
```

Quand tu travailles sur les projets, tout est au même endroit.

### 2. Séparer ce qui affiche de ce qui charge

| Type | Rôle | Fait des appels API ? |
|---|---|---|
| `pages/` | assemble l'écran, récupère les données | oui (via composable / store) |
| `components/` | affiche ce qu'on lui donne | **non** |
| `data/` | appels API, conversion, store | c'est son rôle |

### 3. Isoler l'API

Le reste de l'app ne connaît pas la forme brute des réponses : une fonction de conversion (`toProject`) transforme le DTO en modèle. Si l'API change, un seul fichier bouge.

### 4. Choisir le bon endroit pour l'état

| L'état sert à… | Il vit dans |
|---|---|
| un seul composant | le composant (`ref`) |
| une logique réutilisée | un composable |
| plusieurs pages | un store Pinia |
| l'URL (filtres partageables, page) | la route (`?tech=vue`) |

### 5. Nommer de façon prévisible

| Quoi | Convention |
|---|---|
| Composants | `PascalCase` en plusieurs mots : `ProjectCard.vue` |
| Génériques | `Base…` : `BaseButton.vue` |
| Uniques (layout) | `App…` : `AppHeader.vue` |
| Pages | `…Page.vue` : `ProjectsPage.vue` |
| Composables | `use…` : `useProjectFilters.ts` |
| Stores | `use…Store` : `useFavoritesStore` |

## Adapter à la taille

- **Portfolio** : quelques features, pas de store au début, un fichier de données.
- **CinéTrack-Vue** : structure complète, Pinia pour les favoris et l'utilisateur.

## Pièges

- **Tout dans `App.vue`** ou dans une page de 500 lignes : découpe dès que ça devient long.
- **Des dossiers vides « pour plus tard »** : crée-les le jour où tu en as besoin.
