---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
aliases:
  - "Pinia (State Management Vue.js)"
tags:
  - frameworks/vue/pinia
parent: "[[Vue]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/pinia-store-basique]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://pinia.vuejs.org/"
---

# Pinia (State Management Vue.js)

> [!abstract] Introduction
> Pinia est la librairie officielle de gestion d'état partagé pour Vue — l'équivalent d'un service Angular `providedIn: 'root'` combiné avec des signals, mais packagé comme solution dédiée.

> [!warning]- Prérequis
> [[VUE-07-Composition-API|Composition API et Composables Vue.js]], [[ANG-12-State-Management|State Management Angular]] (pour la comparaison directe).

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> // stores/favoris.js
> import { defineStore } from 'pinia';
> import { ref } from 'vue';

> export const useFavorisStore = defineStore('favoris', () => {
>   const favoris = ref([]);
>   function ajouter(id) { favoris.value.push(id); }
>   return { favoris, ajouter };
> });
> ```

> [!example]- Analogie
> Un composable (voir [[VUE-07-Composition-API|Composition API et Composables Vue.js]]) est une recette que chacun cuisine séparément dans sa cuisine. Un store Pinia est un plat commun posé sur une table centrale : tout le monde qui y accède voit et modifie le MÊME plat, exactement comme un service Angular `providedIn: 'root'`.

> [!question]- Pourquoi l'utiliser ?
> Contrairement à un composable classique (état indépendant à chaque appel), un store Pinia garantit un état RÉELLEMENT PARTAGÉ entre tous les composants qui l'utilisent.

> [!question]- Comment ça marche ?
> ```javascript
> // FilmCard.vue
> import { useFavorisStore } from '../stores/favoris';
> const favorisStore = useFavorisStore();
> favorisStore.ajouter(42);
> console.log(favorisStore.favoris);  // partagé partout où le store est utilisé
> ```
> Chaque appel à `useFavorisStore()` retourne la MÊME instance, quel que soit le composant qui l'appelle.

> [!question]- Quand l'utiliser ?
> Dès qu'un état doit être partagé entre plusieurs composants sans lien parent-enfant direct — panier, utilisateur connecté, favoris.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Mettre TOUT l'état de l'application dans Pinia, même des données purement locales à un seul composant, recrée artificiellement une complexité de state management global là où un simple `ref()` local suffirait.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Store | Unité d'état partagé définie avec `defineStore` |
| `defineStore` | Fonction créant un store Pinia réutilisable |

---

## Points clés

- Un store Pinia = état RÉELLEMENT partagé, contrairement à un composable classique
- `defineStore('nom', () => { ... })` avec la syntaxe Composition API, cohérente avec le reste de Vue moderne
- Chaque appel à `useXxxStore()` retourne la même instance partagée
- Ne pas globaliser un état qui devrait rester local à un composant

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre un store Pinia (partagé) et un composable classique (indépendant par appel)
> - Mettre un état purement local dans Pinia par réflexe, sur-complexifiant un besoin simple
> - Déstructurer le store (`const { favoris } = store`) perd la réactivité → utiliser `const { favoris } = storeToRefs(store)` (les actions, elles, peuvent être déstructurées directement)

---

## Paramètres / Configuration

| Concept | Description |
|-----------|-------------|
| `defineStore('nom', setup)` | Crée un store réutilisable |
| `useXxxStore()` | Accède au store, toujours la même instance |

---

## Exemple minimal

```javascript
// stores/favoris.js
export const useFavorisStore = defineStore('favoris', () => {
  const favoris = ref([]);
  function ajouter(id) { favoris.value.push(id); }
  return { favoris, ajouter };
});
```
```javascript
// N'importe quel composant
const store = useFavorisStore();
store.ajouter(1);
```

> [!note] Ce que j'en retiens
> N'importe quel composant appelant `useFavorisStore()` accède et modifie EXACTEMENT le même état partagé — le comportement recherché pour des favoris globaux à l'application.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Pinia s'intègre aux Vue DevTools (inspection de l'état, historique des actions) — réponse à la note brute
> - Getters = `computed`, actions = fonctions ; tester un store avec `setActivePinia(createPinia())`
> - Ne pas stocker de données serveur « cache » dans Pinia si TanStack Query est utilisé

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun)
- À comparer avec → [[ANG-12-State-Management|State Management Angular]], [[VUE-07-Composition-API|Composition API et Composables Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/pinia-store-basique]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer la différence essentielle entre un composable et un store Pinia à quelqu'un qui les confond ?

> [!faq]- Questions d'entretien
> - Différence entre un composable et un store Pinia ?

---

## Tâches

- [ ] #task Créer un store Pinia pour un état partagé simple (favoris, panier)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pinia propose-t-il un équivalent des DevTools Redux pour inspecter l'état en temps réel ?
