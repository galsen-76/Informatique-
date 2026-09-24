---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M06
tags:
  - frameworks/vue/performance
aliases:
  - "Performance et Bonnes Pratiques Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[VUE-02-Reactivite|Réactivité Vue.js]]"
related_snippets:
  - "[[04_Snippets/vue-17-performance-bonnes-pratiques]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/best-practices/performance.html"
---

# Performance et Bonnes Pratiques Vue.js

> [!abstract] Introduction
> Les leviers de performance d'une app Vue : lazy loading des routes et composants, réactivité maîtrisée (`shallowRef`, `v-memo`), listes virtualisées, et mesure avant optimisation.

> [!warning]- Prérequis
> [[VUE-08-Vue-Router|Vue Router]], [[VUE-02-Reactivite|Réactivité Vue.js]]

---

## Théorie

> [!question]- C'est quoi ?
> - Routes paresseuses : `component: () => import('./views/Films.vue')`
> - Composants asynchrones : `defineAsyncComponent(() => import('./Graphique.vue'))`
> - `shallowRef` / `shallowReactive` : réactivité uniquement au premier niveau (grosses données)
> - `markRaw` : exclure un objet (instance de lib) de la réactivité
> - `v-once`, `v-memo` : éviter des re-rendus
> - `KeepAlive` : garder en cache des vues coûteuses
> - Listes virtuelles (vue-virtual-scroller, TanStack Virtual)

> [!example]- Analogie
> Ne rendre réactif que ce qui doit l'être, c'est comme ne mettre des capteurs que sur les portes qu'on surveille vraiment, pas sur chaque brique du mur.

> [!question]- Pourquoi l'utiliser ?
> Vue est rapide par défaut, mais de grosses listes, des objets profonds réactifs ou un bundle monolithique finissent par se voir sur mobile.

> [!question]- Comment ça marche ?
> Mesurer d'abord : Vue DevTools (onglet Performance/Timeline), Lighthouse, `rollup-plugin-visualizer` pour le bundle.
> Règles de conception :
> - Props stables (éviter de recréer objets/fonctions à chaque rendu inutilement)
> - `computed` plutôt que méthodes dans le template
> - `:key` stable dans `v-for`
> - Découper les gros composants pour limiter la zone re-rendue

> [!question]- Quand l'utiliser ?
> Quand une mesure montre un problème : longues listes, graphiques, tableaux de milliers de lignes, bundle > quelques centaines de Ko.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Micro-optimiser sans mesure complique le code pour rien.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| shallowRef | Ref réactive seulement sur `.value`, pas en profondeur |
| markRaw | Marque un objet comme non réactif |
| v-memo | Mémoïse un sous-arbre de template |
| Code splitting | Découpage du bundle en morceaux |

---

## Points clés

- Lazy loading des routes par défaut
- `shallowRef` pour de grosses données remplacées en bloc
- `markRaw` pour les instances de librairies (carte, graphique)
- Mesurer avant d'optimiser

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre une instance de Leaflet/Chart.js dans un `reactive` → lenteurs et bugs
> - `v-if` + `v-for` sur le même élément
> - Index du tableau comme `:key` sur une liste modifiable

---

## Exemple minimal

```typescript
const films = shallowRef<Film[]>([]);
films.value = await api.liste();         // ✅ remplacement → réactif
// films.value.push(x);                  // ❌ non détecté avec shallowRef
films.value = [...films.value, x];       // ✅
const carte = markRaw(new L.Map('map'));
```

> [!note] Ce que j'en retiens
> Avec `shallowRef`, on remplace au lieu de muter : économique et prévisible.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Analyser le bundle et découper les dépendances lourdes
> - Comprendre le compilateur Vue (hoisting statique, patch flags) et le futur mode Vapor

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-15-Performance-Bonnes-Pratiques|Performance & Bonnes Pratiques Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-17-performance-bonnes-pratiques]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand utiliser `shallowRef` plutôt que `ref` ?

---

## Tâches

- [ ] #task Analyser le bundle de CinéTrack Vue avec rollup-plugin-visualizer
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
