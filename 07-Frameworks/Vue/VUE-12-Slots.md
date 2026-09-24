---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
tags:
  - frameworks/vue/slots
aliases:
  - "Slots Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[VUE-03-Composants-SFC|Composants & SFC Vue.js]]"
related_snippets:
  - "[[04_Snippets/vue-12-slots]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/components/slots.html"
---

# Slots Vue.js

> [!abstract] Introduction
> Les slots permettent à un parent d'injecter du contenu dans un composant enfant (équivalent de `<ng-content>`) ; les scoped slots permettent en plus à l'enfant de passer des données au contenu injecté.

> [!warning]- Prérequis
> [[VUE-05-Props-Emits|Props & Emits Vue.js (Communication Parent-Enfant)]]

---

## Théorie

> [!question]- C'est quoi ?
> ```vue
> <!-- Carte.vue -->
> <template>
>   <article class="carte">
>     <header><slot name="titre" /></header>
>     <slot>Contenu par défaut</slot>
>     <footer><slot name="actions" /></footer>
>   </article>
> </template>
> <!-- Parent -->
> <Carte>
>   <template #titre><h2>Inception</h2></template>
>   <p>Un voleur de rêves…</p>
>   <template #actions><button>Voir</button></template>
> </Carte>
> ```

> [!example]- Analogie
> Un gâteau d'anniversaire avec des emplacements pour les bougies : le pâtissier (composant) fait le gâteau, le client (parent) choisit les bougies.

> [!question]- Pourquoi l'utiliser ?
> Des composants de mise en page génériques (cartes, modales, tableaux, layouts) sans multiplier les props.

> [!question]- Comment ça marche ?
> - Slot par défaut `<slot />`, slots nommés `<slot name="x" />` + `<template #x>`
> - **Scoped slot** : l'enfant expose des données : `<slot :item="film" />` → `<template #default="{ item }">`
> - Contenu de secours entre les balises `<slot>`
> - `$slots` / `useSlots()` pour savoir si un slot est fourni

> [!question]- Quand l'utiliser ?
> Design system, listes/tableaux dont le rendu des lignes est personnalisable.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trop de slots rend l'API du composant difficile à comprendre ; documenter chaque slot.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Slot | Emplacement de contenu fourni par le parent |
| Slot nommé | Emplacement identifié par un nom |
| Scoped slot | Slot recevant des données de l'enfant |
| `#` | Raccourci de `v-slot:` |

---

## Points clés

- `#nom` = `v-slot:nom`
- Scoped slots = rendu personnalisable avec données de l'enfant
- Équivalent Angular : `ng-content` + `ngTemplateOutlet`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `<template #nom>` pour un slot nommé
> - Confondre props du slot et props du composant

---

## Exemple minimal

```vue
<!-- TableFilms.vue -->
<template>
  <table><tr v-for="f in films" :key="f.id"><slot name="ligne" :film="f" /></tr></table>
</template>
<!-- Parent -->
<TableFilms :films="films">
  <template #ligne="{ film }"><td>{{ film.titre }}</td><td>{{ film.annee }}</td></template>
</TableFilms>
```

> [!note] Ce que j'en retiens
> La table gère la boucle, le parent choisit les colonnes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Composants « renderless » (logique pure exposée via scoped slot)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-22-Content-Projection-Queries|Content Projection et View Queries Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-12-slots]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle est la différence entre slot et scoped slot ?

---

## Tâches

- [ ] #task Créer une `Modale.vue` avec slots titre/contenu/actions
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
