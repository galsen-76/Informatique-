---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - tests/strategie
aliases:
  - "Pyramide des Tests"
parent: "[[Tests et Qualité]]"
children:
  - "[[TEST-02-Tests-Unitaires-Vitest-Jest|Tests Unitaires avec Vitest et Jest]]"
  - "[[TEST-04-Tests-Integration-API|Tests d'Intégration d'API]]"
  - "[[TEST-05-Tests-E2E-Playwright|Tests End-to-End Playwright et Cypress]]"
related_theory:
  - "[[TEST-06-TDD|TDD]]"
related_snippets:
  - "[[04_Snippets/test-01-pyramide-des-tests]]"
related_projects: []
source: "https://martinfowler.com/articles/practical-test-pyramid.html"
---

# Pyramide des Tests

> [!abstract] Introduction
> La pyramide des tests recommande beaucoup de tests unitaires (rapides, ciblés), moins de tests d'intégration et peu de tests end-to-end (lents, fragiles mais réalistes) — pour un filet de sécurité efficace et rapide.

---

## Théorie

> [!question]- C'est quoi ?
> ```mermaid
> flowchart TB
>   E2E["E2E (Playwright) — peu<br/>parcours critiques"]
>   INT["Intégration — moyen<br/>API + BDD, composant + service"]
>   UNIT["Unitaires — beaucoup<br/>fonctions, services, stores, pipes"]
>   E2E --- INT --- UNIT
> ```
> Autres tests : statiques (TypeScript, ESLint — la base), de contrat, de performance/charge (k6), d'accessibilité, de sécurité, visuels (snapshots d'écran).
> Variante front moderne : le « trophée des tests » (Kent C. Dodds) met l'accent sur l'intégration (composants testés avec leurs vrais enfants).

> [!example]- Analogie
> Contrôle qualité d'une voiture : chaque pièce testée sur banc (unitaire), les sous-ensembles assemblés (intégration), puis quelques essais sur route (E2E).

> [!question]- Pourquoi l'utiliser ?
> Détecter les régressions vite et tôt, refactorer sans peur, documenter le comportement ; un bug trouvé en production coûte 10 à 100 fois plus cher.

> [!question]- Comment ça marche ?
> Qualités d'un bon test (F.I.R.S.T.) : **F**ast, **I**ndépendant, **R**épétable, **S**elf-validating (vert/rouge), **T**imely (écrit tôt).
> Structure **AAA** : Arrange (préparer), Act (agir), Assert (vérifier).
> Tester le **comportement** observable, pas l'implémentation.

> [!question]- Quand l'utiliser ?
> Unitaires : logique métier, utilitaires, stores. Intégration : endpoints API, composants avec services. E2E : login, parcours d'achat/création.

> [!danger]- Quand NE PAS l'utiliser / Limites
> La couverture de code (%) mesure ce qui est exécuté, pas ce qui est vérifié : 100 % de couverture peut ne rien garantir.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Régression | Retour d'un bug ou d'un dysfonctionnement |
| Couverture | Proportion de code exécutée par les tests |
| Flaky test | Test instable (vert/rouge aléatoire) |
| AAA | Arrange, Act, Assert |

---

## Points clés

- Beaucoup d'unitaires, peu d'E2E
- Tests rapides = exécutés souvent
- Tester le comportement, pas les détails internes
- Un bug corrigé = un test ajouté

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Pyramide inversée (tout en E2E lents et fragiles)
> - Tests couplés à l'implémentation qui cassent au moindre refactoring

---

## Exemple minimal

```typescript
it('calcule la moyenne des notes', () => {
  // Arrange
  const notes = [4, 5, 3];
  // Act
  const moyenne = noteMoyenne(notes);
  // Assert
  expect(moyenne).toBe(4);
});
```

> [!note] Ce que j'en retiens
> AAA rend chaque test lisible comme une petite histoire.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Définir la stratégie de test d'un projet (quoi tester à quel niveau, temps de CI cible)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Tests et Qualité]]
- Sous-sujets → [[TEST-02-Tests-Unitaires-Vitest-Jest|Tests Unitaires avec Vitest et Jest]], [[TEST-04-Tests-Integration-API|Tests d'Intégration d'API]], [[TEST-05-Tests-E2E-Playwright|Tests End-to-End Playwright et Cypress]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/test-01-pyramide-des-tests]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi 100 % de couverture ne garantit-il pas l'absence de bugs ?

> [!faq]- Questions d'entretien
> - Quelle stratégie de tests mettez-vous en place sur un projet ?

---

## Tâches

- [ ] #task Définir la stratégie de tests de CinéTrack (1 page)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
