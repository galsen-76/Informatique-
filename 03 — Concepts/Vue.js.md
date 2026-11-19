---
type: concept
domain: frontend
module: "[[Module 19 - Vue.js]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[JavaScript]]"
  - "[[HTML]]"
  - "[[Module JavaScript (import et export)]]"
parents: []
related:
  - "[[React]]"
  - "[[Angular]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Vue.js

> [!info] En une phrase
> Vue.js est un framework JavaScript progressif pour construire des interfaces en composants, avec des templates proches du HTML et une réactivité automatique.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Comme [[React]], Vue construit l'interface en composants et met le DOM à jour quand les données changent. Les différences principales :
- Les composants s'écrivent dans des **fichiers `.vue`** qui réunissent template HTML, script et style ([[Composant monofichier Vue (SFC)|SFC]]).
- Le template utilise des **directives** (`v-if`, `v-for`, `v-model`) plutôt que du JSX.
- La **réactivité** est automatique : on modifie une valeur (`compteur.value++`) et l'affichage suit, sans fonction `set…`.
- L'écosystème officiel fournit le routeur ([[Vue Router]]) et le store ([[Pinia]]).
Vue 3 avec la **Composition API** (`<script setup>`) est la façon actuelle d'écrire ; tu croiseras aussi l'ancienne **Options API** (`data()`, `methods`).

### Pourquoi ça existe
Avoir un outil d'interface facile à prendre en main, qu'on peut ajouter à une page existante ou utiliser pour une grosse application.

### Le problème résolu
Construire des interfaces réactives avec une syntaxe proche du HTML, souvent jugée plus accessible que React.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T[Template] --> R[Rendu]
  S[État réactif] --> R
  U[Action] --> S
```

### Exemple concret
```vue
<script setup lang="ts">
import { ref } from "vue";
const n = ref(0);
</script>

<template>
  <button @click="n++">Cliqué {{ n }} fois</button>
</template>
```
```bash
npm create vue@latest     # projet Vite + Vue, avec options TypeScript, Router, Pinia, tests
```

### Cas d'utilisation
- Frontends d'entreprise et tableaux de bord
- Ajouter de l'interactivité à une page serveur
- Nuxt (framework Vue avec rendu serveur)

> [!warning] À ne pas confondre
> **Vue 2** et **Vue 3** : beaucoup de tutoriels datent de Vue 2 (Options API, Vuex). Pour un nouveau projet : Vue 3, `<script setup>`, Pinia.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine le front Vue de MesDépenses : `main.js`, `App.vue`, les composants, l'appel à l'API. Relie qui lance qui.

> [!example] 🔄 Change de contexte
> Redessine le même front en Angular. Qu'est-ce qui reste identique (composants, appel à l'API), qu'est-ce qui change ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Vue.js » et je l'intègre ici avec `![[Schéma - Vue.js.excalidraw]]`._

### Appliquer dans le fil rouge
- [[MesDépenses 03 - Vue, afficher la liste]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[JavaScript]] · [[HTML]] · [[Module JavaScript (import et export)]]
- **Complémentaires** : [[React]] · [[Angular]]
- **Utilisé par** : [[Composant monofichier Vue (SFC)]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
