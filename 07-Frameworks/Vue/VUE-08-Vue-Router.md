---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Vue Router"
tags:
  - frameworks/vue/vue-router
parent: "[[Vue]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/vue-router-basique]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://router.vuejs.org/"
---

# Vue Router

> [!abstract] Introduction
> Vue Router est la librairie officielle (mais séparée, à installer) qui gère la navigation entre "pages" dans une application Vue — l'équivalent du Router intégré nativement dans Angular.

> [!warning]- Prérequis
> [[VUE-01-Fondamentaux|Fondamentaux Vue.js]], [[VUE-03-Composants-SFC|Composants et SFC Vue.js]], [[ANG-06-Routing|Routing Angular]] (pour la comparaison).

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> import { createRouter, createWebHistory } from 'vue-router';
> const routes = [
>   { path: '/films', component: ListeFilms },
>   { path: '/films/:id', component: DetailFilm }
> ];
> const router = createRouter({ history: createWebHistory(), routes });
> ```

> [!example]- Analogie
> Comme le Router Angular, Vue Router associe une URL à un composant — la seule différence notable est qu'il faut L'INSTALLER séparément (`npm install vue-router`), le routing n'étant pas inclus nativement dans le cœur de Vue.

> [!question]- Pourquoi l'utiliser ?
> Structurer la navigation avec des URLs propres, sans recharger la page à chaque changement de "vue".

> [!question]- Comment ça marche ?
> ```html
> <router-link to="/films">Voir les films</router-link>
> <router-view></router-view>
> ```
> `<router-view>` est l'équivalent EXACT du `<router-outlet>` Angular. `<router-link>` est l'équivalent de `routerLink`.
> ```javascript
> import { useRoute } from 'vue-router';
> const route = useRoute();
> const id = route.params.id;   // récupère le paramètre d'URL
> ```

> [!question]- Quand l'utiliser ?
> Dès qu'une application Vue a plusieurs écrans logiquement séparés — quasiment systématique au-delà d'un simple composant isolé.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Utiliser `<a href="">` classique au lieu de `<router-link>` recharge toute la page — perd l'intérêt même d'une application monopage, exactement le même piège qu'en Angular avec `href` au lieu de `routerLink`.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `<router-view>` | Emplacement où s'affiche le composant de la route active |
| `<router-link>` | Lien de navigation sans rechargement de page |
| `useRoute()` | Fonction pour accéder aux informations de la route active |

---

## Points clés

- `<router-view>` = `<router-outlet>` Angular, `<router-link>` = `routerLink` Angular
- Vue Router s'installe séparément, contrairement au routing intégré à Angular
- `useRoute()` donne accès aux paramètres d'URL depuis n'importe quel composant
- Toujours `<router-link>`, jamais `<a href="">` pour la navigation interne

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser `<a href="">` au lieu de `<router-link>`, provoquant un rechargement complet
> - Oublier `<router-view>` dans le composant racine, laissant l'application vide
> - Confondre `useRoute()` (lire l'URL actuelle) et `useRouter()` (naviguer PROGRAMMATIQUEMENT)

---

## Paramètres / Configuration

| Élément | Description |
|-----------|-------------|
| `path` | Segment d'URL |
| `component` | Composant affiché |
| `:param` | Paramètre dynamique, via `route.params` |
| `<router-view>` | Emplacement d'affichage |

---

## Exemple minimal

```javascript
const routes = [
  { path: '/', component: Accueil },
  { path: '/films/:id', component: DetailFilm }
];
```
```html
<router-link to="/films/1">Film 1</router-link>
<router-view></router-view>
```

> [!note] Ce que j'en retiens
> Cliquer sur le lien change l'URL en `/films/1` sans jamais recharger la page — seul le contenu de `<router-view>` change.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Gardes de navigation : `router.beforeEach((to) => ...)` global ou `beforeEnter` par route (équivalent des guards Angular) + `meta: { requiresAuth: true }`
> - Routes paresseuses `component: () => import('./views/Films.vue')`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun)
- À comparer avec → [[ANG-06-Routing|Routing Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-router-basique]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je établir la correspondance exacte entre chaque concept Vue Router et son équivalent Angular Router ?

> [!faq]- Questions d'entretien
> - Comment protéger une route en Vue ?

---

## Tâches

- [ ] #task Mettre en place un routing basique avec 2-3 routes dans un projet Vue
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Vue Router propose-t-il un équivalent des Guards Angular (`canActivate`) pour protéger une route ?
