---
type: concept
domain: frontend
module: "[[Module 19 - Vue.js]]"
status: a-decouvrir
level: debutant
niveau: 6
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Vue.js]]"
  - "[[CSS]]"
parents:
  - "[[Vue.js]]"
related:
  - "[[Template et liaison de données]]"
  - "[[Props React]]"
next_review: 
tags:
  - concept
  - frontend
---
# Composant d'interface

> [!info] En une phrase
> Un composant est un morceau d'interface autonome (sa logique, son HTML, son style) qu'on assemble avec d'autres comme des briques ; Vue, React et Angular reposent tous sur cette idée.

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

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Vue (fichier .vue)**
> ```html
> <script setup>
> const props = defineProps({ depense: Object });
> const emit = defineEmits(["supprimer"]);
> </script>
> <template>
>   <li>{{ props.depense.libelle }} <button @click="emit('supprimer')">x</button></li>
> </template>
> ```
>
> **React (fonction + JSX)**
> ```jsx
> function Ligne({ depense, onSupprimer }) {
>   return <li>{depense.libelle} <button onClick={onSupprimer}>x</button></li>;
> }
> ```
> Les données descendent par les props, les événements remontent par une fonction passée en prop.
>
> **Angular (classe + template)**
> ```ts
> @Component({ selector: "app-ligne", template: `<li>{{ depense.libelle }} <button (click)="supprimer.emit()">x</button></li>` })
> export class LigneComponent {
>   @Input() depense!: Depense;
>   @Output() supprimer = new EventEmitter<void>();
> }
> ```

### Cas d'utilisation
- Chaque morceau d'une interface Vue
- Bibliothèques de composants (Vuetify, PrimeVue)

> [!warning] À ne pas confondre
> `:nom="x"` (la valeur de la variable x) et `nom="x"` (la chaîne « x »). Le `:` est le raccourci de `v-bind`, le `@` celui de `v-on`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine un fichier `ListeDepenses.vue` en trois blocs (script, template, style). Écris ce qui va dans chacun pour afficher la liste.

> [!example] 🔄 Change de contexte
> Redessine le même composant en Angular : en combien de fichiers est-il réparti ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Composant d'interface » et je l'intègre ici avec `![[Schéma - Composant d'interface.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses Front 01 - Vue, afficher la liste]]
- [[MesDépenses Front 07 - Angular, afficher la liste]]

## 4 · Relier
- **Prérequis** : [[Vue.js]] · [[CSS]]
- **Complémentaires** : [[Template et liaison de données]] · [[Props React]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
