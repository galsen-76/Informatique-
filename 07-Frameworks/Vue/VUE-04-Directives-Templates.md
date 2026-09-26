---
created: 2026-09-21
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
aliases:
  - "Directives & Templates Vue.js"
tags:
  - frameworks/vue/directives
parent: "[[Vue]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/essentials/template-syntax.html"
---

# Directives & Templates Vue.js

> [!abstract] En bref
> Le template d'un composant, c'est du HTML avec quelques mots spéciaux : les **directives** (qui commencent par `v-`). Elles permettent d'afficher une donnée, de répéter un élément, d'en cacher un autre ou de réagir à un clic. Avec ces 6 directives, tu fais 95 % de tes écrans.

## Aide-mémoire

| Directive | Rôle | Exemple |
|---|---|---|
| `{{ }}` | afficher une valeur | `{{ project.title }}` |
| `v-if` / `v-else-if` / `v-else` | afficher ou non | `<p v-if="loading">Chargement…</p>` |
| `v-show` | cacher en CSS (reste dans la page) | `<div v-show="menuOuvert">` |
| `v-for` | répéter | `<li v-for="p in projects" :key="p.slug">` |
| `:attribut` (= `v-bind`) | lier un attribut à une donnée | `:src="project.image"` |
| `@evenement` (= `v-on`) | réagir à un événement | `@click="ouvrir"` |
| `v-model` | lier un champ de formulaire | `<input v-model="recherche">` |

## Les exemples du Portfolio

```vue
<template>
  <!-- Afficher selon l'état -->
  <BaseLoader v-if="loading" />
  <p v-else-if="error">{{ error }}</p>
  <p v-else-if="projects.length === 0">Aucun projet</p>

  <!-- Répéter -->
  <ProjectCard v-else v-for="p in projects" :key="p.slug" :project="p" />

  <!-- Classes et attributs dynamiques -->
  <button
    type="button"
    :class="{ active: tech === 'vue' }"
    :aria-pressed="tech === 'vue'"
    @click="tech = 'vue'"
  >
    Vue
  </button>

  <!-- Champ lié à une donnée -->
  <input v-model="search" type="search" placeholder="Rechercher…">
</template>
```

## `v-for` et `:key`

La `:key` doit être un **identifiant unique et stable** (un `id`, un `slug`). Grâce à elle, Vue sait quel élément est lequel quand la liste change, et ne recrée que ce qui a changé.

```vue
<li v-for="p in projects" :key="p.slug">   <!-- ✅ -->
<li v-for="(p, i) in projects" :key="i">   <!-- ❌ l'index change quand on trie ou supprime -->
```

## Les modificateurs d'événements

```vue
<form @submit.prevent="envoyer">     <!-- .prevent = event.preventDefault() -->
<input @keyup.enter="rechercher">     <!-- seulement sur la touche Entrée -->
<input v-model.trim="nom">            <!-- enlève les espaces autour -->
<input v-model.number="age">          <!-- convertit en nombre -->
```

## `v-if` ou `v-show` ?

| | `v-if` | `v-show` |
|---|---|---|
| Faux → | l'élément est **retiré** de la page | l'élément est **caché** (`display: none`) |
| Idéal pour | ce qui change rarement | ce qui bascule souvent (un menu) |

## Pièges

- **`v-if` et `v-for` sur le même élément** : ambigu. Filtre d'abord la liste avec un `computed`, ou mets le `v-if` sur un `<template>` englobant.
- **Oublier les `:`** : `src="project.image"` affiche le texte « project.image ». Avec `:src`, c'est la valeur.
- **Mettre de la logique compliquée dans le template** : déplace-la dans un `computed`.
