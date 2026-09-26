---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
aliases:
  - "Directives & Templates Vue.js"
tags:
  - frameworks/vue/directives
parent: "[[Vue]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/vue-directives]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/essentials/template-syntax.html"
---

# Directives & Templates Vue.js

> [!abstract] Introduction
> Vue utilise des directives préfixées `v-` (`v-if`, `v-for`, `v-bind`, `v-on`) directement dans le HTML pour gérer l'affichage conditionnel, les boucles, et les liaisons de données.

> [!warning]- Prérequis
> [[VUE-01-Fondamentaux|Fondamentaux Vue.js]], [[ANG-04-Directives|Directives Angular]] (pour la comparaison).

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> <p v-if="filmEstNote">Ce film a une note</p>
> <li v-for="film in films" :key="film.id">{{ film.titre }}</li>
> <img :src="urlAffiche">
> <button @click="ajouterFavori">Ajouter</button>
> ```

> [!example]- Analogie
> Les directives Vue (`v-if`, `v-for`) sont l'équivalent des `@if`/`@for` Angular, mais écrites comme des ATTRIBUTS HTML plutôt que comme des blocs de syntaxe à part — visuellement plus proche du HTML classique.

> [!question]- Pourquoi l'utiliser ?
> Manipuler l'affichage de façon déclarative, directement lisible dans le template, sans JavaScript manuel de manipulation du DOM.

> [!question]- Comment ça marche ?
> - `v-if` : affiche/retire un élément selon une condition
> - `v-for` : répète un élément pour chaque item d'une liste (nécessite toujours `:key`)
> - `v-bind` (raccourci `:`) : lie dynamiquement un attribut
> - `v-on` (raccourci `@`) : écoute un événement
> - `v-model` : liaison bidirectionnelle (équivalent `[(ngModel)]` Angular)

> [!question]- Quand l'utiliser ?
> `v-if` pour un affichage conditionnel, `v-for` pour des listes, `v-model` pour des champs de formulaire.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Oublier `:key` sur un `v-for` fonctionne quand même mais dégrade sérieusement la performance de mise à jour de la liste — Vue ne peut alors pas identifier précisément quel élément a changé (même piège que `track` en Angular `@for`).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `:` | Raccourci de `v-bind`, lie dynamiquement un attribut |
| `@` | Raccourci de `v-on`, écoute un événement |
| `v-model` | Liaison bidirectionnelle, équivalent `[(ngModel)]` Angular |

---

## Points clés

- `v-if`/`v-for` = directives structurelles, équivalent `@if`/`@for` Angular
- `:` et `@` sont des raccourcis pour `v-bind` et `v-on`
- `:key` obligatoire sur `v-for`, exactement comme `track` en Angular
- `v-model` gère la liaison bidirectionnelle sur les formulaires

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `:key` sur un `v-for`, dégradant la performance sans erreur visible immédiatement
> - Confondre `v-if` (retire l'élément du DOM) et `v-show` (cache visuellement avec CSS, garde dans le DOM)
> - Utiliser `v-if` et `v-for` sur le MÊME élément, ce que Vue déconseille (ordre de priorité ambigu)

---

## Paramètres / Configuration

| Directive | Raccourci | Description |
|-----------|-------------|---------|
| `v-bind:attr` | `:attr` | Lie un attribut dynamique |
| `v-on:event` | `@event` | Écoute un événement |
| `v-if` | — | Affichage conditionnel (retire du DOM) |
| `v-show` | — | Affichage conditionnel (CSS uniquement) |
| `v-for` | — | Boucle, nécessite `:key` |

---

## Exemple minimal

```html
<li v-for="film in films" :key="film.id" :class="{ favori: film.estFavori }">
  {{ film.titre }}
</li>
```

> [!note] Ce que j'en retiens
> `:key="film.id"` permet à Vue d'identifier précisément chaque élément de la liste, exactement comme `track film.id` en Angular `@for`.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Modificateurs d'événements (`@submit.prevent`, `@keyup.enter`) et de `v-model` (`.trim`, `.number`, `.lazy`)
> - `v-show` pour un basculement fréquent (garde le DOM), `v-if` pour un affichage rare ou coûteux

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun)
- À comparer avec → [[ANG-04-Directives|Directives Angular]], [[ANG-03-Templates-Data-Binding|Templates et Data Binding Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-directives]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer la différence entre `v-if` et `v-show`, avec un cas où choisir l'un plutôt que l'autre change vraiment quelque chose ?

> [!faq]- Questions d'entretien
> - Différence entre `v-if` et `v-show` ?

---

## Tâches

- [ ] #task Refaire une liste Angular connue en syntaxe Vue (`v-for`, `:key`)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans quels cas précis `v-show` est-il préférable à `v-if` pour la performance (basculement très fréquent) ?
