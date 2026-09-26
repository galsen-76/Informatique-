---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
aliases:
  - "Composition API & Composables Vue.js"
tags:
  - frameworks/vue/composition-api
parent: "[[Vue]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/vue-composable]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/reusability/composables.html"
---

# Composition API & Composables Vue.js

> [!abstract] Introduction
> Un "composable" est une fonction réutilisable qui encapsule de la logique réactive (avec `ref`, `computed`, `watch`), partageable entre plusieurs composants — l'équivalent Vue d'un service Angular pour de la logique réutilisable.

> [!warning]- Prérequis
> [[VUE-02-Reactivite|Reactivite Vue.js]], [[VUE-06-Computed-Watchers|Computed et Watchers Vue.js]], [[ANG-05-Services-DI|Services et DI Angular]] (pour la comparaison).

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> // useCompteur.js
> import { ref } from 'vue';
> export function useCompteur() {
>   const compteur = ref(0);
>   function incrementer() { compteur.value++; }
>   return { compteur, incrementer };
> }
> ```

> [!example]- Analogie
> Un composable est une recette réutilisable qu'on peut suivre dans plusieurs cuisines différentes (composants) : chaque cuisine qui l'utilise obtient SA PROPRE version du plat (état indépendant), contrairement à un service Angular `providedIn: 'root'` qui partage la MÊME instance partout.

> [!question]- Pourquoi l'utiliser ?
> Extraire une logique réactive répétée dans plusieurs composants, sans dupliquer le code — la convention de nommage `useXxx` (héritée de React) signale immédiatement qu'il s'agit d'un composable.

> [!question]- Comment ça marche ?
> ```javascript
> // FilmCard.vue
> import { useCompteur } from './useCompteur';
> const { compteur, incrementer } = useCompteur();
> ```
> Chaque appel à `useCompteur()` crée un NOUVEL état indépendant — contrairement à un service Angular Singleton qui partage toujours la même instance.

> [!question]- Quand l'utiliser ?
> Logique réactive réutilisable mais dont CHAQUE composant a besoin de sa PROPRE instance (pas partagée) — pour un état VRAIMENT partagé entre composants, Pinia est plus adapté (voir [[VUE-09-Pinia-State-Management|Pinia State Management]]).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Confondre un composable avec un état partagé est un piège fréquent : par défaut, chaque `useXxx()` crée une instance INDÉPENDANTE — pour un vrai partage, il faut soit un store Pinia, soit sortir la création du `ref` hors de la fonction (moins courant).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Composable | Fonction réutilisable encapsulant de la logique réactive |
| Convention `useXxx` | Nommage signalant qu'une fonction est un composable |

---

## Points clés

- Un composable est une simple fonction retournant des refs/computed/fonctions
- Convention de nommage `useXxx`, héritée de l'écosystème React
- Chaque appel crée un état INDÉPENDANT, contrairement à un service Angular Singleton
- Pour un état partagé entre composants, utiliser Pinia plutôt qu'un composable simple

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Croire qu'un composable partage automatiquement son état entre tous les composants qui l'utilisent (faux par défaut)
> - Oublier la convention `useXxx`, rendant le code moins reconnaissable pour d'autres développeurs Vue
> - Mettre trop de logique différente dans un seul composable géant, au lieu de le découper par responsabilité

---

## Paramètres / Configuration
> Bloc supprimé — sujet purement structurel, pas de configuration technique précise.

---

## Exemple minimal

```javascript
// useFilms.js
import { ref } from 'vue';

export function useFilms() {
  const films = ref([]);
  async function charger() {
    films.value = await fetch('/api/films').then(r => r.json());
  }
  return { films, charger };
}
```

> [!note] Ce que j'en retiens
> Ce composable encapsule la logique de chargement des films, réutilisable dans n'importe quel composant qui en a besoin — mais chaque composant qui l'appelle obtient SA PROPRE liste `films`, pas une liste partagée.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Partager un état entre composables en déclarant le `ref` au niveau du module (hors de la fonction) — mais préférer Pinia pour la traçabilité et le SSR
> - S'inspirer de VueUse avant d'écrire un composable utilitaire

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun)
- À comparer avec → [[ANG-05-Services-DI|Services et DI Angular]], [[VUE-09-Pinia-State-Management|Pinia State Management]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-composable]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi un composable N'EST PAS l'équivalent exact d'un service Angular `providedIn: 'root'` ?

> [!faq]- Questions d'entretien
> - Qu'est-ce qu'un composable et en quoi diffère-t-il d'un service Angular ?

---

## Tâches

- [ ] #task Créer un composable réutilisable pour charger des données depuis une API
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment forcer un composable à partager un état, sans passer par Pinia (état module-level) ?
