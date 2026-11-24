---
type: concept
module: "[[Module 19 - Vue.js]]"
related:
  - "[[État et réactivité]]"
tags:
  - concept
  - frontend
---
# Template et liaison de données

> [!info] En une phrase
> Le template est le HTML d'un composant, enrichi de liaisons : afficher une valeur, répéter, afficher sous condition, lier un champ, écouter un événement ; Vue et Angular ont chacun leur écriture pour les mêmes idées.

## 1 · Comprendre
### Définition
| Directive | Raccourci | Rôle |
| --- | --- | --- |
| `v-if` / `v-else-if` / `v-else` | | afficher ou non (l'élément est créé ou retiré) |
| `v-show` | | cacher en CSS (l'élément reste) |
| `v-for="t in taches" :key="t.id"` | | répéter |
| `v-bind:href="url"` | `:href` | lier un attribut à une valeur |
| `v-on:click="f"` | `@click` | écouter un événement (`@submit.prevent` fait `preventDefault`) |
| `v-model="texte"` | | liaison dans les deux sens avec un champ de formulaire |
| `v-html` | | insérer du HTML (danger [[XSS]]) |
`{{ expression }}` affiche une valeur en l'**échappant** (sans risque).

### Pourquoi ça existe
Un template doit pouvoir exprimer des conditions, des boucles et des liaisons sans devenir du JavaScript.

### Le problème résolu
Écrire des interfaces dynamiques en restant proche du HTML.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
D[Données] -->|v-bind, interpolation| T[Template]
  T -->|v-on| M[Méthodes]
  T <-->|v-model| D
```

### Exemple concret
```vue
<template>
  <form @submit.prevent="ajouter">
    <input v-model.trim="texte" placeholder="Nouvelle tâche" />
    <button :disabled="!texte">Ajouter</button>
  </form>
  <p v-if="taches.length === 0">Aucune tâche</p>
  <ul v-else>
    <li v-for="t in taches" :key="t.id" :class="{ fini: t.fini }" @click="t.fini = !t.fini">
      {{ t.nom }}
    </li>
  </ul>
</template>
```

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Vue**
> ```html
> <p>{{ total }}</p>
> <li v-for="d in depenses" :key="d.id">{{ d.libelle }}</li>
> <p v-if="!depenses.length">Aucune dépense</p>
> <input v-model="montant">
> <button @click="ajouter">Ajouter</button>
> <img :src="url">
> ```
>
> **Angular**
> ```html
> <p>{{ total }}</p>
> @for (d of depenses; track d.id) { <li>{{ d.libelle }}</li> }
> @if (!depenses.length) { <p>Aucune dépense</p> }
> <input [(ngModel)]="montant">
> <button (click)="ajouter()">Ajouter</button>
> <img [src]="url">
> ```
> Même idée, autre écriture : afficher `{{ }}`, lier une propriété `:x` / `[x]`, écouter `@click` / `(click)`, lier dans les deux sens `v-model` / `[(ngModel)]`.

### Cas d'utilisation
- Formulaires
- Listes
- Affichage conditionnel

> [!warning] À ne pas confondre
> `v-if` (retire l'élément du DOM) et `v-show` (le garde, masqué) : `v-show` pour un affichage qui bascule souvent. Et ne mets pas `v-if` et `v-for` sur le même élément : filtre avec un `computed`.

## 3 · Relier
- **Prérequis** : [[Composant d'interface]] · [[Formulaire HTML]]
- **Complémentaires** : [[État et réactivité]]
