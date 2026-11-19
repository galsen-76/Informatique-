---
type: course
order: 1
module: "[[Module 19 - Vue.js]]"
concepts:
  - "[[Vue.js]]"
  - "[[Composant d'interface]]"
  - "[[État et réactivité]]"
  - "[[Template et liaison de données]]"
tags:
  - cours
niveau: 2
---
# Cours - Vue.js, composants, réactivité et directives

> [!abstract] Objectifs
> - Créer un projet Vue 3 et écrire des composants .vue
> - Utiliser ref, computed, watch
> - Écrire des templates avec les directives

**Prérequis :** [[Cours - JavaScript dans la page, DOM et événements]] · [[Cours - Penser en composants]]

## 1. Vue en deux mots
[[Vue.js]] : des composants, un template HTML, une réactivité automatique. Si tu as fait React, compare à chaque étape.

| React | Vue |
| --- | --- |
| JSX | template avec directives |
| `useState` + `setX` | `ref` modifiée directement |
| valeur calculée au rendu | `computed` |
| `useEffect` | `onMounted`, `watch` |
| props + fonctions | props + `emit` |

## 2. Schéma
```mermaid
flowchart TD
  P[Parent .vue] -->|props| E[Enfant .vue]
  E -->|emit| P
  R[ref] --> T[Template]
```

## 3. Le fichier .vue
[[Composant d'interface]] : `<script setup>`, `<template>`, `<style scoped>`.

## 4. La réactivité
[[État et réactivité]] : `.value` dans le script, pas dans le template.

## 5. Les directives
[[Template et liaison de données]] : `v-if`, `v-for` avec `:key`, `v-model`, `:attr`, `@événement`.

## Mise en pratique
- Pour chaque notion du cours : les **exercices visuels** de sa fiche (section 3), puis le fil rouge de son niveau ([[Niveaux]]).

> [!warning] Erreurs fréquentes
> - Oublier `.value`
> - `v-if` et `v-for` sur le même élément
> - Suivre un tutoriel Vue 2 sans le savoir

## Résumé
Pas de résumé à écrire : si tu veux, fais un dessin Excalidraw qui relie les notions ci-dessous.

## Concepts du cours
[[Vue.js]] · [[Composant d'interface]] · [[État et réactivité]] · [[Template et liaison de données]]
