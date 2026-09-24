---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M06
aliases:
  - "Composants & SFC Vue.js"
tags:
  - frameworks/vue/composants
parent: "[[Vue]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/vue-composant-basique]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/essentials/component-basics.html"
---

# Composants & SFC Vue.js

> [!abstract] Introduction
> Un composant Vue est un fichier `.vue` (Single File Component) regroupant template, logique et style, importable et réutilisable ailleurs dans l'application.

> [!warning]- Prérequis
> [[VUE-01-Fondamentaux|Fondamentaux Vue.js]], [[ANG-02-Composants|Composants Angular]] (pour la comparaison).

---

## Théorie

> [!question]- C'est quoi ?
> ```vue
> <!-- FilmCard.vue -->
> <script setup>
> const props = defineProps(['titre']);
> </script>
> <template>
>   <h2>{{ titre }}</h2>
> </template>
> <style scoped>
> h2 { color: blue; }
> </style>
> ```

> [!example]- Analogie
> Un composant Vue est une carte à jouer complète, imprimée recto-verso avec ses illustrations (style) et son texte (template et logique) sur UNE SEULE carte physique — contrairement à Angular où l'illustration, le texte et les règles seraient sur trois cartes séparées à assembler mentalement.

> [!question]- Pourquoi l'utiliser ?
> Réutiliser un bloc d'interface à plusieurs endroits, avec tout son code au même endroit (moins de va-et-vient entre fichiers qu'en Angular).

> [!question]- Comment ça marche ?
> ```vue
> <!-- ListeFilms.vue -->
> <script setup>
> import FilmCard from './FilmCard.vue';
> </script>
> <template>
>   <FilmCard titre="Inception" />
> </template>
> ```
> `<style scoped>` isole automatiquement le CSS à CE composant uniquement, sans fuite vers le reste de l'application.

> [!question]- Quand l'utiliser ?
> Chaque fois qu'un morceau d'interface a une responsabilité claire et pourrait être réutilisé — même logique qu'en Angular.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Oublier `scoped` sur le `<style>` fait fuiter le CSS globalement dans toute l'application, risquant des conflits de style imprévus avec d'autres composants.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| SFC | Single File Component, fichier `.vue` tout-en-un |
| `scoped` | Isole le CSS d'un composant, sans fuite vers le reste de l'app |
| `defineProps` | Déclare les données reçues depuis un composant parent |

---

## Points clés

- Un composant `.vue` = template + script + style en un seul fichier
- `<style scoped>` isole le CSS, à ne jamais oublier
- Import direct d'un composant dans un autre (pas de déclaration dans un module comme Angular)
- Composant importable et réutilisable, comme en Angular

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `scoped` sur `<style>`, provoquant des fuites de CSS non désirées
> - Nommer un fichier composant en minuscules alors que la convention Vue recommande PascalCase (`FilmCard.vue`, pas `film-card.vue`)
> - Oublier d'importer explicitement un composant utilisé dans le template

---

## Paramètres / Configuration

| Section SFC | Rôle |
|-----------|-------|
| `<script setup>` | Logique du composant |
| `<template>` | Structure HTML affichée |
| `<style scoped>` | CSS isolé à ce composant |

---

## Exemple minimal

```vue
<!-- FilmCard.vue -->
<script setup>
defineProps(['titre']);
</script>
<template>
  <h2>{{ titre }}</h2>
</template>
<style scoped>
h2 { color: blue; }
</style>
```

> [!note] Ce que j'en retiens
> `scoped` garantit que `h2 { color: blue }` ne s'applique QU'À ce composant, jamais aux autres `<h2>` de l'application.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Version TypeScript : `defineProps<{ titre: string }>()` (voir [[VUE-10-TypeScript-avec-Vue|TypeScript avec Vue.js]])
> - Alternatives à `scoped` : CSS Modules (`<style module>`), Tailwind ; `:deep()` pour cibler un enfant avec parcimonie

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun)
- À comparer avec → [[ANG-02-Composants|Composants Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-composant-basique]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `scoped` est important, avec un exemple concret de conflit de style qu'il évite ?

> [!faq]- Questions d'entretien
> - À quoi sert `<style scoped>` et comment fonctionne-t-il ?

---

## Tâches

- [ ] #task Créer un composant réutilisable avec style scoped
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Existe-t-il une alternative à `scoped` (CSS Modules, ou autre) pour isoler le style en Vue ?
