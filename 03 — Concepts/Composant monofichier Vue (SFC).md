---
type: concept
domain: frontend
module: "[[Module 19 - Vue.js]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Vue.js]]"
  - "[[CSS]]"
parents:
  - "[[Vue.js]]"
related:
  - "[[Directives Vue]]"
  - "[[Props React]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Composant monofichier Vue (SFC)

> [!info] En une phrase
> Un composant Vue est un fichier .vue avec trois blocs : script (la logique), template (le HTML) et style (le CSS, qu'on peut limiter au composant).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```vue
<script setup lang="ts">
const props = defineProps<{ nom: string; statut: "a-faire" | "fini" }>();
const emit = defineEmits<{ (e: "choisir", nom: string): void }>();
</script>

<template>
  <article class="carte" @click="emit('choisir', props.nom)">
    <h2>{{ nom }}</h2>
    <span :class="['badge', statut]">{{ statut }}</span>
    <slot />   <!-- contenu passé entre les balises -->
  </article>
</template>

<style scoped>
.carte { padding: 1rem; border-radius: 8px; }
</style>
```
- **Props** (`defineProps`) : données reçues du parent, en lecture seule.
- **Événements** (`defineEmits` puis `emit`) : remonter une information au parent, écouté avec `@choisir="…"`.
- **Slot** : emplacement pour du contenu fourni par le parent.
- `scoped` : le CSS ne s'applique qu'à ce composant.

### Pourquoi ça existe
Garder ensemble tout ce qui concerne un morceau d'interface, tout en séparant clairement HTML, logique et style.

### Le problème résolu
Des composants lisibles et réutilisables, avec un style qui ne fuit pas sur le reste de la page.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
P[Parent] -->|props| E[Enfant .vue]
  E -->|emit| P
```

### Exemple concret
```vue
<!-- ListeTaches.vue -->
<script setup lang="ts">
import CarteTache from "./CarteTache.vue";
defineProps<{ taches: { id: number; nom: string; statut: "a-faire" | "fini" }[] }>();
</script>
<template>
  <CarteTache v-for="t in taches" :key="t.id" :nom="t.nom" :statut="t.statut"
              @choisir="(n) => console.log(n)" />
</template>
```

### Cas d'utilisation
- Chaque morceau d'une interface Vue
- Bibliothèques de composants (Vuetify, PrimeVue)

> [!warning] À ne pas confondre
> `:nom="x"` (la valeur de la variable x) et `nom="x"` (la chaîne « x »). Le `:` est le raccourci de `v-bind`, le `@` celui de `v-on`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine un fichier `ListeDepenses.vue` en trois blocs (script, template, style). Écris ce qui va dans chacun pour afficher la liste.

> [!example] 🔄 Change de contexte
> Redessine le même composant en Angular : en combien de fichiers est-il réparti ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Composant monofichier Vue (SFC) » et je l'intègre ici avec `![[Schéma - Composant monofichier Vue (SFC).excalidraw]]`._

### Appliquer dans le fil rouge
- [[MesDépenses 03 - Vue, afficher la liste]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Vue.js]] · [[CSS]]
- **Complémentaires** : [[Directives Vue]] · [[Props React]]

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
