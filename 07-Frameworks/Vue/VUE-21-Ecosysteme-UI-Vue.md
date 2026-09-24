---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M06
tags:
  - frameworks/vue/ecosysteme
aliases:
  - "Écosystème UI Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[CSS-09-Architecture-BEM-Tailwind|Architecture CSS BEM et Tailwind]]"
related_snippets:
  - "[[04_Snippets/vue-21-ecosysteme-ui-vue]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/ecosystem/"
---

# Écosystème UI Vue.js

> [!abstract] Introduction
> Tour de l'écosystème Vue utile en entreprise : librairies de composants (PrimeVue, Vuetify, Quasar), utilitaires (VueUse), outils (Vite, Vitest, Vue DevTools) et méta-framework (Nuxt).

> [!warning]- Prérequis
> [[VUE-01-Fondamentaux|Fondamentaux Vue.js]]

---

## Théorie

> [!question]- C'est quoi ?
> | Besoin | Outils courants |
> |---|---|
> | Build | Vite |
> | Routing / état | Vue Router, Pinia |
> | Composants UI | PrimeVue, Vuetify (Material), Quasar, Naive UI, Element Plus, shadcn-vue |
> | Utilitaires | VueUse (>200 composables) |
> | Formulaires | VeeValidate, FormKit |
> | Données serveur | TanStack Query, axios |
> | i18n | vue-i18n |
> | Tests | Vitest, Vue Test Utils, Playwright |
> | SSR | Nuxt |

> [!example]- Analogie
> Vue est le cœur ; l'écosystème est la boîte à outils officielle et communautaire qu'on ajoute pièce par pièce selon le chantier.

> [!question]- Pourquoi l'utiliser ?
> Ne pas réinventer ce qui existe (useDebounce, useLocalStorage, datepicker accessible) et savoir lire le `package.json` d'un projet existant.

> [!question]- Comment ça marche ?
> Critères de choix d'une librairie : maintenance (dernière release, issues), compatibilité Vue 3 + TS, accessibilité, taille, thème, licence, usage par l'équipe.

> [!question]- Quand l'utiliser ?
> Au démarrage d'un projet (choix d'équipe) et en arrivant sur un projet (lire les dépendances).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Chaque dépendance est une dette (mises à jour, failles, abandon) : n'ajouter que ce qui apporte vraiment.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| VueUse | Collection de composables utilitaires |
| i18n | Internationalisation |
| Dépendance | Paquet externe utilisé par le projet |

---

## Points clés

- Vite + Pinia + Vue Router = socle officiel
- VueUse avant d'écrire un utilitaire maison
- Choisir une lib UI selon l'a11y et la maintenance

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mélanger deux librairies UI dans le même projet
> - Installer une lib pour une fonction de 5 lignes

---

## Exemple minimal

```typescript
import { useLocalStorage, useDebounce, useDark } from '@vueuse/core';
const favoris = useLocalStorage<number[]>('favoris', []);
const recherche = ref('');
const rechercheDebounce = useDebounce(recherche, 300);
const estSombre = useDark();
```

> [!note] Ce que j'en retiens
> Trois besoins courants, zéro code maison.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Auditer les dépendances (`npm audit`, Renovate/Dependabot)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-29-Angular-Material-CDK|Angular Material et CDK]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-21-ecosysteme-ui-vue]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quels critères pour choisir une librairie UI ?

---

## Tâches

- [ ] #task Lister les dépendances du projet Vue au travail et le rôle de chacune
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
