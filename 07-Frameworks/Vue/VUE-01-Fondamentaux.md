---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M06
aliases:
  - "Fondamentaux Vue.js"
tags:
  - frameworks/vue/fondamentaux
parent: "[[Vue]]"
children:
  - "[[VUE-02-Reactivite|Reactivite Vue]]"
  - "[[VUE-03-Composants-SFC|Composants et SFC Vue]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/vue-hello-world]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/introduction.html"
---

# Fondamentaux Vue.js

> [!abstract] Introduction
> Vue.js est un framework frontend progressif : contrairement à Angular qui impose une structure complète dès le départ, Vue peut s'adopter graduellement, d'une simple balise `<script>` dans une page HTML jusqu'à une application complète avec routing et state management.

> [!warning]- Prérequis
> [[TS-01-Fondamentaux|Fondamentaux TypeScript]] (Vue s'utilise très bien en TypeScript, quoique le JavaScript pur reste courant) ; connaître [[ANG-01-Fondamentaux|Fondamentaux Angular]] aide énormément par contraste.

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> <script setup>
> import { ref } from 'vue';
> const titre = ref('Inception');
> </script>
> <template>
>   <h1>{{ titre }}</h1>
> </template>
> ```

> [!example]- Analogie
> Angular est un appartement meublé livré clé en main, avec des règles strictes sur où va chaque meuble. Vue est un appartement vide que tu peux meubler progressivement — tu peux commencer avec juste une chaise (un composant isolé dans une page existante) et ajouter le reste (routing, state) seulement quand tu en as besoin.

> [!question]- Pourquoi l'utiliser ?
> Vue offre une courbe d'apprentissage plus douce qu'Angular pour démarrer, tout en restant capable de gérer des applications complexes une fois les briques additionnelles (Vue Router, Pinia) ajoutées.

> [!question]- Comment ça marche ?
> Un fichier Vue typique est un **SFC** (Single File Component, extension `.vue`) qui regroupe template, logique et style dans UN SEUL fichier — contrairement à Angular qui sépare systématiquement en 3 fichiers.
> ```bash
> npm create vue@latest
> npm run dev
> ```

> [!question]- Quand l'utiliser ?
> Projets où l'on veut une flexibilité d'adoption progressive, ou une équipe qui préfère une syntaxe plus proche du HTML/JS classique qu'Angular.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour une très grande équipe qui a besoin d'une structure IMPOSÉE et homogène entre tous les développeurs (l'argument principal en faveur d'Angular), la flexibilité de Vue peut devenir un inconvénient : chaque équipe organise son code différemment sans convention stricte imposée par le framework lui-même.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| SFC (Single File Component) | Fichier `.vue` regroupant template, script et style |
| `<script setup>` | Syntaxe moderne et concise pour écrire la logique d'un composant |
| Framework progressif | Peut être adopté petit à petit, pas tout ou rien |

---

## Points clés

- Un fichier `.vue` = template + logique + style, dans UN SEUL fichier (contrairement aux 3 fichiers Angular)
- Vue peut s'adopter progressivement, d'un simple script à une application complète
- `<script setup>` est la syntaxe moderne recommandée pour écrire la logique
- Vite (pas Webpack) est l'outil de build par défaut des projets Vue modernes

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Chercher instinctivement 3 fichiers séparés (habitude Angular) alors que tout est dans un seul `.vue`
> - Utiliser l'ancienne "Options API" par réflexe de tutoriels datés, alors que `<script setup>` (Composition API) est aujourd'hui recommandé
> - Oublier que Vue Router et Pinia (équivalents du Router et NgRx/signals Angular) ne sont PAS inclus par défaut — à ajouter séparément

---

## Paramètres / Configuration

| Commande | Description |
|-----------|-------------|
| `npm create vue@latest` | Crée un nouveau projet Vue |
| `npm run dev` | Serveur de développement (via Vite) |
| `npm run build` | Build de production |

---

## Exemple minimal

```vue
<script setup>
import { ref } from 'vue';
const compteur = ref(0);
</script>

<template>
  <button @click="compteur++">Compteur : {{ compteur }}</button>
</template>
```

> [!note] Ce que j'en retiens
> Tout est dans un seul fichier : la donnée réactive (`ref`), le template, et l'événement (`@click`) — pas besoin de trois fichiers séparés comme en Angular.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Toujours démarrer en TypeScript (`npm create vue@latest` → TypeScript, Router, Pinia, Vitest, ESLint)
> - Voir la table de correspondances [[Angular-vs-Vue|Angular vs Vue Correspondances]]

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → [[VUE-02-Reactivite|Reactivite Vue]], [[VUE-03-Composants-SFC|Composants et SFC Vue]]
- À comparer avec → [[ANG-01-Fondamentaux|Fondamentaux Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-hello-world]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer à un collègue Angular la différence fondamentale d'organisation de fichiers entre les deux frameworks ?

> [!faq]- Questions d'entretien
> - Qu'est-ce qu'un framework progressif ?

---

## Tâches

- [ ] #task Créer un premier projet Vue et comparer sa structure à un projet Angular
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Vue est-il aussi répandu qu'Angular/React sur le marché de l'emploi français, ou reste-t-il plus une alternative de niche ?
