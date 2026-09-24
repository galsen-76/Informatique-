---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/e2e
aliases:
  - "Tests End-to-End Playwright et Cypress"
parent: "[[Tests et Qualité]]"
children: []
related_theory:
  - "[[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]"
  - "[[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]"
related_snippets:
  - "[[04_Snippets/test-05-tests-e2e-playwright]]"
related_projects: []
source: "https://playwright.dev/docs/intro"
---

# Tests End-to-End Playwright et Cypress

> [!abstract] Introduction
> Les tests E2E pilotent un vrai navigateur pour vérifier des parcours utilisateur complets (front + API + BDD) ; Playwright est aujourd'hui la référence (multi-navigateurs, rapide, robuste), Cypress reste très répandu.

> [!warning]- Prérequis
> [[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> import { test, expect } from '@playwright/test';
> test('un utilisateur ajoute un film à ses favoris', async ({ page }) => {
>   await page.goto('/login');
>   await page.getByLabel('E-mail').fill('ali@test.fr');
>   await page.getByLabel('Mot de passe').fill('motdepasse-solide');
>   await page.getByRole('button', { name: 'Se connecter' }).click();
>   await page.goto('/films/1');
>   await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
>   await page.goto('/favoris');
>   await expect(page.getByRole('heading', { name: 'Dune' })).toBeVisible();
> });
> ```

> [!example]- Analogie
> Un client mystère qui fait réellement ses courses dans le magasin pour vérifier que tout le parcours fonctionne.

> [!question]- Pourquoi l'utiliser ?
> Seul niveau qui prouve que l'application marche vraiment du point de vue de l'utilisateur ; indispensable pour les parcours critiques.

> [!question]- Comment ça marche ?
> - Sélecteurs orientés utilisateur : `getByRole`, `getByLabel`, `getByText` (robustes et accessibles) plutôt que classes CSS
> - Attentes automatiques (auto-waiting) : pas de `sleep`
> - Authentification réutilisée (storageState) pour accélérer
> - Traces, vidéos et captures en cas d'échec ; mode UI pour déboguer
> - Accessibilité : `@axe-core/playwright`

> [!question]- Quand l'utiliser ?
> 5 à 20 parcours critiques (connexion, création, paiement), exécutés en CI sur la recette.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Lents et parfois instables (flaky) ; ne pas y tester chaque règle métier.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| E2E | Test de bout en bout |
| Flaky | Instable |
| Auto-waiting | Attente automatique qu'un élément soit prêt |
| Trace viewer | Relecture pas à pas d'un test Playwright |

---

## Points clés

- Sélecteurs par rôle et libellé
- Pas d'attente fixe
- Peu de tests, mais sur les parcours critiques
- Traces pour diagnostiquer

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `page.waitForTimeout(3000)` partout
> - Tests dépendant de données de recette modifiées par d'autres

---

## Exemple minimal

```bash
npm init playwright@latest
npx playwright test --ui
npx playwright codegen http://localhost:4200   # enregistre un parcours
```

> [!note] Ce que j'en retiens
> `codegen` génère un premier jet de test en cliquant dans l'application.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Paralléliser, isoler les données par test, intégrer à la CI avec rapports

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Tests et Qualité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/test-05-tests-e2e-playwright]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `getByRole` est-il plus robuste qu'un sélecteur CSS ?

---

## Tâches

- [ ] #task Écrire 3 tests E2E pour CinéTrack (connexion, recherche, favoris)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
