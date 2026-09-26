---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
aliases:
  - "Réactivité Vue.js"
  - "Réactivité Vue.js (ref, reactive)"
tags:
  - frameworks/vue/reactivite
parent: "[[Vue]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/vue-ref-reactive]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html"
---

# Réactivité Vue.js (ref, reactive)

> [!abstract] Introduction
> `ref()` et `reactive()` sont les deux façons de créer une donnée réactive en Vue — l'équivalent conceptuel des `signal()` Angular, mais avec deux syntaxes distinctes selon le type de donnée.

> [!warning]- Prérequis
> [[VUE-01-Fondamentaux|Fondamentaux Vue.js]], [[ANG-10-Signals|Signals Angular]] (pour la comparaison directe).

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> import { ref, reactive } from 'vue';
> const compteur = ref(0);              // valeur primitive
> const film = reactive({ titre: 'Inception', annee: 2010 }); // objet
> ```

> [!example]- Analogie
> `ref()` est une télécommande à un seul bouton (une valeur simple à surveiller). `reactive()` est un tableau de bord complet avec plusieurs cadrans (un objet à plusieurs propriétés) — les deux préviennent Vue automatiquement dès qu'on les modifie, mais leur "forme" diffère.

> [!question]- Pourquoi l'utiliser ?
> Sans réactivité, modifier une variable ne mettrait jamais à jour l'affichage automatiquement — il faudrait manipuler le DOM manuellement à chaque changement.

> [!question]- Comment ça marche ?
> ```javascript
> compteur.value++;              // ref : accès via .value en JS
> film.titre = 'Dunkirk';        // reactive : accès direct, pas de .value
> ```
> Dans le `<template>`, Vue déballe automatiquement le `.value` d'un `ref` — on écrit `{{ compteur }}`, jamais `{{ compteur.value }}`.

> [!question]- Quand l'utiliser ?
> `ref()` pour une valeur primitive (nombre, texte, booléen) ou même un objet si on veut pouvoir le REMPLACER entièrement plus tard. `reactive()` pour un objet dont on modifie seulement des propriétés internes, jamais remplacé en bloc.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `reactive()` PERD sa réactivité si on le déstructure (`const { titre } = film`) — la variable extraite n'est plus liée à l'objet réactif d'origine. C'est un piège fréquent, contrairement à `ref()` qui reste toujours stable.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `.value` | Accesseur nécessaire en JavaScript pour lire/modifier un `ref` (pas dans le template) |
| Déballage automatique | Vue retire automatiquement `.value` dans le template |

---

## Points clés

- `ref()` pour les valeurs simples ou remplaçables entièrement, `reactive()` pour les objets modifiés en interne
- `.value` nécessaire en JavaScript, jamais dans le template
- `reactive()` perd sa réactivité si déstructuré — piège classique
- Équivalent conceptuel du `signal()` Angular, avec deux variantes syntaxiques

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `.value` en JavaScript sur un `ref` (`compteur++` au lieu de `compteur.value++`)
> - Déstructurer un objet `reactive()`, perdant silencieusement la réactivité sur les variables extraites
> - Écrire `{{ compteur.value }}` dans le template par réflexe, alors que Vue déballe déjà automatiquement

---

## Paramètres / Configuration

| Fonction | Type de donnée | Accès JS | Accès template |
|-----------|-------------|---------|---------|
| `ref(valeur)` | Primitive ou objet | `.value` | Direct |
| `reactive(objet)` | Objet uniquement | Direct | Direct |

---

## Exemple minimal

```vue
<script setup>
import { ref } from 'vue';
const compteur = ref(0);
function incrementer() { compteur.value++; }
</script>
<template>
  <button @click="incrementer">{{ compteur }}</button>
</template>
```

> [!note] Ce que j'en retiens
> `.value` est nécessaire dans la fonction `incrementer` (JavaScript), mais totalement absent dans le template où Vue le déballe automatiquement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `toRefs(obj)` / `toRef(obj, 'cle')` pour déstructurer un `reactive` sans perdre la réactivité (réponse à la note brute)
> - Beaucoup d'équipes utilisent uniquement `ref()` (même pour les objets) pour une règle simple et homogène
> - `shallowRef` pour de grosses données remplacées en bloc (voir [[VUE-17-Performance-Bonnes-Pratiques|Performance et Bonnes Pratiques Vue.js]])

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun)
- À comparer avec → [[ANG-10-Signals|Signals Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-ref-reactive]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi déstructurer un objet `reactive()` casse sa réactivité, avec le vocabulaire déjà connu de la gestion mémoire (références) ?

> [!faq]- Questions d'entretien
> - Différence entre `ref` et `reactive` ?

---

## Tâches

- [ ] #task Créer un compteur avec `ref` et un objet complexe avec `reactive`
- [ ] #task Reproduire volontairement le piège de la déstructuration d'un `reactive()`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Existe-t-il un outil (`toRefs`) pour déstructurer un `reactive()` sans perdre la réactivité ?
