---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
aliases:
  - "Computed & Watchers Vue.js"
tags:
  - frameworks/vue/computed-watchers
parent: "[[Vue]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/vue-computed-watch]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/essentials/computed.html"
---

# Computed & Watchers Vue.js

> [!abstract] Introduction
> `computed()` calcule automatiquement une valeur dérivée d'autres données réactives ; `watch()` exécute du code en réaction à un changement — l'équivalent exact des `computed()` et `effect()` Angular.

> [!warning]- Prérequis
> [[VUE-02-Reactivite|Reactivite Vue.js]], [[ANG-10-Signals|computed() et effect() en Angular]] (pour la comparaison directe).

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> import { ref, computed, watch } from 'vue';
> const compteur = ref(0);
> const double = computed(() => compteur.value * 2);
> watch(compteur, (nouvelle, ancienne) => {
>   console.log(`Changé de ${ancienne} à ${nouvelle}`);
> });
> ```

> [!example]- Analogie
> `computed()` est un panneau d'affichage qui recalcule automatiquement un total dès qu'un prix change — jamais besoin de le rafraîchir manuellement. `watch()` est un veilleur de nuit qui déclenche une alarme précise dès qu'un capteur change, sans forcément afficher un résultat visuel.

> [!question]- Pourquoi l'utiliser ?
> `computed()` évite de recalculer manuellement une valeur dérivée à chaque changement. `watch()` permet de déclencher un EFFET DE BORD (appel API, log) en réaction à un changement, ce qu'un `computed()` ne devrait jamais faire.

> [!question]- Comment ça marche ?
> `computed()` est **mis en cache** : il ne se recalcule QUE si l'une de ses dépendances change, et retourne la valeur en cache sinon. `watch()` s'exécute à chaque changement, sans jamais retourner de valeur affichable directement.

> [!question]- Quand l'utiliser ?
> `computed()` pour une valeur dérivée à afficher ; `watch()` pour un effet de bord (requête réseau, log, notification) déclenché par un changement.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Utiliser `computed()` pour déclencher un effet de bord (appel API) à l'intérieur est un anti-pattern — un `computed()` doit rester une PURE fonction de calcul, sans effet de bord ; `watch()` est fait pour ça.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `computed()` | Valeur dérivée, recalculée automatiquement, mise en cache |
| `watch()` | Exécute du code en réaction à un changement, pour un effet de bord |
| Effet de bord | Action extérieure au calcul pur (requête réseau, log, notification) |

---

## Points clés

- `computed()` = valeur dérivée pure et mise en cache, `watch()` = effet de bord réactif
- `computed()` ne se recalcule QUE si une dépendance change réellement
- Ne jamais mettre d'effet de bord dans un `computed()`
- Équivalent direct de `computed()`/`effect()` en Angular

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre un appel réseau ou un `console.log` dans un `computed()`, brisant sa pureté attendue
> - Oublier que `watch()` reçoit la NOUVELLE et l'ANCIENNE valeur en paramètres, dans cet ordre
> - Recréer manuellement avec `watch()` ce qu'un simple `computed()` ferait plus simplement

---

## Paramètres / Configuration

| Fonction | Retourne une valeur ? | Usage |
|-----------|:---:|-------|
| `computed(fn)` | Oui, mise en cache | Valeur dérivée pure |
| `watch(source, fn)` | Non | Effet de bord sur changement |

---

## Exemple minimal

```javascript
const prix = ref(100);
const quantite = ref(2);
const total = computed(() => prix.value * quantite.value);

watch(total, (nouveauTotal) => {
  console.log(`Nouveau total : ${nouveauTotal}€`);
});
```

> [!note] Ce que j'en retiens
> `total` se recalcule automatiquement dès que `prix` OU `quantite` change, et `watch` réagit à ce changement pour un simple log — deux responsabilités bien distinctes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `watchEffect` suit automatiquement tout ce qu'il lit (≈ `effect()` Angular) ; `watch` cible une source précise et donne ancienne/nouvelle valeur (réponse à la note brute)
> - Options de `watch` : `immediate`, `deep`, `once`, et nettoyage avec `onWatcherCleanup` (Vue 3.5)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun)
- À comparer avec → [[ANG-10-Signals|Signals Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-computed-watch]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi mettre un appel réseau dans un `computed()` est un anti-pattern ?

> [!faq]- Questions d'entretien
> - Différence entre `computed` et `watch` ?

---

## Tâches

- [ ] #task Créer un computed dérivé de deux refs, et un watch réagissant à son changement
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Différence pratique entre `watch()` et `watchEffect()` en Vue ?
