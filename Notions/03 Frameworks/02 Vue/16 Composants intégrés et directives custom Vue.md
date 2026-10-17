---
type: notion
statut: a apprendre
resume: "Vue fournit quelques composants spéciaux prêts à l'emploi : <Transition> pour animer, <Teleport> pour afficher une modale par-dessus tout, <KeepAlive> pour garder une page en mémoire, <component :is> pour changer de composant dynamiquement."
revu:
sources:
  - "https://vuejs.org/guide/built-ins/teleport.html"
---
# Composants intégrés et directives custom Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Vue fournit quelques composants spéciaux prêts à l'emploi : `<Transition>` pour animer, `<Teleport>` pour afficher une modale par-dessus tout, `<KeepAlive>` pour garder une page en mémoire, `<component :is>` pour changer de composant dynamiquement.

## Le problème

**Pourquoi c'est utile ?**
Pour animer, afficher une modale par-dessus tout, garder une page en mémoire ou changer de composant dynamiquement.

**Qu'est-ce qui se passait sans ça ?**
On recodait ces comportements à la main, avec des problèmes de z-index et d'état perdu.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Et tu peux créer tes propres directives (`v-focus`).

### Aide-mémoire

| Composant | Sert à | Exemple d'usage |
|---|---|---|
| `<Transition>` | animer l'apparition / disparition d'un élément | menu mobile, message de succès |
| `<TransitionGroup>` | animer une liste | cartes filtrées qui se réorganisent |
| `<Teleport to="body">` | afficher un élément **ailleurs** dans la page | modale, notification |
| `<KeepAlive>` | garder un composant en mémoire quand on le quitte | onglets qui gardent leur état |
| `<component :is>` | afficher un composant choisi dynamiquement | icône ou bloc selon un type |
| `<Suspense>` | attendre un composant asynchrone | rare, encore expérimental |

### `<Teleport>`

Une modale écrite dans un composant peut être coincée derrière d'autres éléments (voir le piège du z-index dans [[14 Positionnement et z-index CSS|Positionnement]]). `Teleport` l'affiche directement dans `<body>` :

```vue
<Teleport to="body">
  <div v-if="open" class="modal-backdrop">
    <div class="modal" role="dialog" aria-modal="true">…</div>
  </div>
</Teleport>
```

PrimeVue le fait déjà pour ses `Dialog`, `Toast`, menus.

### `<component :is>`

```vue
<script setup lang="ts">
const icons = { vue: IconVue, angular: IconAngular, nestjs: IconNest };
</script>

<template>
  <component :is="icons[project.mainTech]" />
</template>
```

### Une directive personnalisée

Pour une manipulation du DOM réutilisable :

```ts
// shared/directives/vFocus.ts
export const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
};
```

```vue
<script setup lang="ts">
import { vFocus } from '@/shared/directives/vFocus';   // les directives commencent par v
</script>

<template>
  <input v-focus type="search">
</template>
```

Crée une directive seulement pour une vraie manipulation du DOM (focus, clic en dehors d'un élément). Pour tout le reste, un composable ou un composant suffit. VueUse en fournit déjà beaucoup (`vOnClickOutside`).

## 🧪 Exemple

### `<Transition>`

```vue
<template>
  <Transition name="fade">
    <p v-if="sent" role="status">Message envoyé ✓</p>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

Vue ajoute et retire ces classes automatiquement quand le `v-if` change.

## ⚠️ Limites et pièges

- **`<Transition>` autour de plusieurs éléments** : elle n'accepte qu'un seul enfant (sinon `TransitionGroup`).
- **`KeepAlive` partout** : les pages gardées en mémoire consomment de la mémoire et ne rechargent pas leurs données.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** [[04 Directives et templates Vue|Directives et templates Vue]], [[14 Positionnement et z-index CSS|Positionnement et z-index CSS]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/built-ins/teleport.html
