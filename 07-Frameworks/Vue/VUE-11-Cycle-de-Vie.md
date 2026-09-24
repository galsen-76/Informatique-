---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M06
tags:
  - frameworks/vue/cycle-de-vie
aliases:
  - "Cycle de Vie Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[VUE-03-Composants-SFC|Composants & SFC Vue.js]]"
related_snippets:
  - "[[04_Snippets/vue-11-cycle-de-vie]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/essentials/lifecycle.html"
---

# Cycle de Vie Vue.js

> [!abstract] Introduction
> Les hooks de cycle de vie (`onMounted`, `onUnmounted`…) exécutent du code à la création, au montage dans le DOM, à la mise à jour et à la destruction d'un composant.

> [!warning]- Prérequis
> [[VUE-03-Composants-SFC|Composants & SFC Vue.js]]

---

## Théorie

> [!question]- C'est quoi ?
> | Hook (Composition API) | Moment | Équivalent Angular |
> |---|---|---|
> | `<script setup>` lui-même | création | constructor + ngOnInit |
> | `onBeforeMount` / `onMounted` | avant / après insertion dans le DOM | ngAfterViewInit |
> | `onBeforeUpdate` / `onUpdated` | autour d'un re-rendu | ngAfterViewChecked |
> | `onBeforeUnmount` / `onUnmounted` | avant / après destruction | ngOnDestroy |
> | `onActivated` / `onDeactivated` | composant en `<KeepAlive>` | — |
> | `onErrorCaptured` | erreur d'un descendant | ErrorHandler |

> [!example]- Analogie
> Emménager (setup), ouvrir les volets (mounted), réaménager (updated), rendre les clés (unmounted).

> [!question]- Pourquoi l'utiliser ?
> Accéder au DOM seulement quand il existe et nettoyer ce qu'on a démarré (timers, listeners, abonnements).

> [!question]- Comment ça marche ?
> ```vue
> <script setup lang="ts">
> import { onMounted, onUnmounted, ref } from 'vue';
> const largeur = ref(window.innerWidth);
> const maj = () => (largeur.value = window.innerWidth);
> onMounted(() => window.addEventListener('resize', maj));
> onUnmounted(() => window.removeEventListener('resize', maj));
> </script>
> ```
> Le code de `setup` s'exécute AVANT le montage : les refs de template sont encore `null`.

> [!question]- Quand l'utiliser ?
> `onMounted` : DOM, libs tierces. `onUnmounted` : nettoyage. Les chargements de données peuvent partir directement dans `setup`.

> [!danger]- Quand NE PAS l'utiliser / Limites
> En SSR (Nuxt), `onMounted` n'est pas exécuté côté serveur : parfait pour le code navigateur-only.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Montage | Insertion du composant dans le DOM |
| Démontage | Retrait et destruction du composant |
| KeepAlive | Garde un composant en cache au lieu de le détruire |

---

## Points clés

- Le setup = initialisation
- onMounted pour le DOM
- Toujours nettoyer dans onUnmounted (ou `onScopeDispose` dans un composable)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Lire une ref de template dans setup → null
> - Oublier de retirer un listener global

---

## Exemple minimal

```typescript
// composable réutilisable avec nettoyage automatique
export function useEvenementFenetre<K extends keyof WindowEventMap>(nom: K, fn: (e: WindowEventMap[K]) => void) {
  onMounted(() => window.addEventListener(nom, fn));
  onUnmounted(() => window.removeEventListener(nom, fn));
}
```

> [!note] Ce que j'en retiens
> Encapsuler écouteur + nettoyage dans un composable évite de l'oublier.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser VueUse (`useEventListener`, `useResizeObserver`) plutôt que réécrire ces utilitaires

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-18-Cycle-de-Vie|Cycle de vie des composants Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-11-cycle-de-vie]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi une ref de template est-elle null dans le setup ?

---

## Tâches

- [ ] #task Comparer l'ordre des hooks Angular et Vue sur un même composant
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
