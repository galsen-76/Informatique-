---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
tags:
  - frameworks/vue/tests
aliases:
  - "Tests Vue.js avec Vitest"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[TEST-02-Tests-Unitaires-Vitest-Jest|Tests Unitaires avec Vitest et Jest]]"
  - "[[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]"
related_snippets:
  - "[[04_Snippets/vue-16-tests-vitest]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://test-utils.vuejs.org/guide/"
---

# Tests Vue.js avec Vitest

> [!abstract] Introduction
> On teste un projet Vue avec Vitest (runner compatible Vite) et Vue Test Utils ou Testing Library pour monter les composants, et Playwright/Cypress pour le bout-en-bout.

> [!warning]- Prérequis
> [[TEST-02-Tests-Unitaires-Vitest-Jest|Tests Unitaires avec Vitest et Jest]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> import { mount } from '@vue/test-utils';
> import FilmCard from './FilmCard.vue';
>
> it('émet favori au clic', async () => {
>   const wrapper = mount(FilmCard, { props: { film: { id: 1, titre: 'Dune' } } });
>   expect(wrapper.text()).toContain('Dune');
>   await wrapper.get('button').trigger('click');
>   expect(wrapper.emitted('favori')?.[0]).toEqual([1]);
> });
> ```

> [!example]- Analogie
> Monter un composant en test, c'est poser une pièce sur un banc d'essai : on l'alimente (props), on appuie sur ses boutons, on mesure ce qui sort (DOM, événements).

> [!question]- Pourquoi l'utiliser ?
> Refactorer sans peur, documenter le comportement attendu, éviter les régressions.

> [!question]- Comment ça marche ?
> - **Composables** : fonctions → test unitaire simple
> - **Stores Pinia** : `setActivePinia(createPinia())` puis appels directs ; `createTestingPinia()` pour les composants
> - **Composants** : `mount`, `props`, `trigger`, `await nextTick()`, `emitted()`
> - **Réseau** : mocker le service (`vi.mock`) ou MSW
> - Tester le comportement visible (texte, rôles), pas l'implémentation interne

> [!question]- Quand l'utiliser ?
> Composables et stores : toujours. Composants : ceux qui ont de la logique. E2E : parcours critiques (login, achat).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Tester des détails internes (noms de variables, appels de méthodes privées) rend les tests fragiles.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Vitest | Runner de tests rapide basé sur Vite |
| Vue Test Utils | Librairie officielle pour monter des composants |
| `nextTick` | Attendre la mise à jour du DOM |
| MSW | Mock Service Worker, simule l'API réseau |

---

## Points clés

- `await` sur `trigger` et `setValue`
- Tester par le texte et les rôles
- Stores et composables : tests unitaires purs

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `await` → DOM pas encore mis à jour
> - Snapshots géants qui cassent au moindre changement

---

## Exemple minimal

```typescript
import { setActivePinia, createPinia } from 'pinia';
beforeEach(() => setActivePinia(createPinia()));
it('ajoute un favori une seule fois', () => {
  const store = useFavorisStore();
  store.ajouter(1); store.ajouter(1);
  expect(store.favoris).toEqual([1]);
});
```

> [!note] Ce que j'en retiens
> Un store se teste comme une simple classe, sans rien monter.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mettre en place la couverture et un seuil minimal en CI
> - Tests de composants dans un vrai navigateur (Vitest browser mode)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-14-Tests|Tests Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-16-tests-vitest]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi faut-il `await` après `trigger('click')` ?

---

## Tâches

- [ ] #task Écrire 3 tests : un composable, un store, un composant
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
