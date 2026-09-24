---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - tests/unitaires
aliases:
  - "Tests Unitaires avec Vitest et Jest"
parent: "[[Tests et Qualité]]"
children: []
related_theory:
  - "[[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]"
  - "[[ANG-14-Tests|Tests Angular]]"
  - "[[VUE-16-Tests-Vitest|Tests Vue.js avec Vitest]]"
related_snippets:
  - "[[04_Snippets/test-02-tests-unitaires-vitest-jest]]"
related_projects: []
source: "https://vitest.dev/guide/"
---

# Tests Unitaires avec Vitest et Jest

> [!abstract] Introduction
> Vitest et Jest sont les runners de tests unitaires de l'écosystème JS/TS (API quasi identique : `describe`, `it`, `expect`, mocks) ; Vitest est le défaut pour Vite/Vue et désormais pour les nouveaux projets Angular, Jest reste le défaut de NestJS.

> [!warning]- Prérequis
> [[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> import { describe, it, expect } from 'vitest';
> import { formaterDuree } from './duree';
>
> describe('formaterDuree', () => {
>   it('formate les heures et minutes', () => expect(formaterDuree(148)).toBe('2 h 28'));
>   it('gère moins d\'une heure', () => expect(formaterDuree(45)).toBe('45 min'));
>   it.each([[0, '0 min'], [60, '1 h 00']])('formaterDuree(%i) = %s', (m, r) => expect(formaterDuree(m)).toBe(r));
> });
> ```

> [!example]- Analogie
> Un test unitaire est une question de quiz très précise posée à une seule fonction : « si je te donne 148, tu réponds quoi ? ».

> [!question]- Pourquoi l'utiliser ?
> Vérifier chaque brique isolément, en millisecondes, à chaque sauvegarde (mode watch).

> [!question]- Comment ça marche ?
> Matchers courants : `toBe` (===), `toEqual` (égalité profonde), `toContain`, `toThrow`, `toHaveBeenCalledWith`, `resolves/rejects`.
> Cycle : `beforeEach/afterEach`. Temps : `vi.useFakeTimers()`. Couverture : `vitest --coverage`.
> Angular : depuis les versions récentes, `ng test` peut utiliser Vitest (défaut des nouveaux projets) ; Karma/Jasmine subsiste dans les projets existants.

> [!question]- Quand l'utiliser ?
> Toute logique : fonctions pures, services, stores, pipes, validateurs, composables.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un test unitaire ne vérifie pas que les briques fonctionnent ENSEMBLE (→ intégration).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Runner | Outil qui exécute les tests |
| Matcher | Fonction de vérification (`toBe`) |
| Mode watch | Relance automatique à chaque modification |
| Test paramétré | Même test avec plusieurs jeux de données |

---

## Points clés

- Un comportement par test, nom explicite
- `toEqual` pour les objets, `toBe` pour les primitifs
- `it.each` pour les variantes
- Rapides et indépendants

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tests qui dépendent de l'ordre ou d'un état partagé
> - Tester des dates avec `new Date()` réel (utiliser fake timers)

---

## Exemple minimal

```typescript
it('débounce la recherche', () => {
  vi.useFakeTimers();
  const fn = vi.fn();
  const d = debounce(fn, 300);
  d('a'); d('ab'); d('abc');
  vi.advanceTimersByTime(300);
  expect(fn).toHaveBeenCalledOnce();
  expect(fn).toHaveBeenCalledWith('abc');
});
```

> [!note] Ce que j'en retiens
> Les fake timers testent le temps sans attendre réellement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Écrire des tests lisibles comme une spécification ; utiliser les tests de propriétés (fast-check) pour la logique critique

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Tests et Qualité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/test-02-tests-unitaires-vitest-jest]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre `toBe` et `toEqual` ?

---

## Tâches

- [ ] #task Écrire 10 tests unitaires sur les utilitaires de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
