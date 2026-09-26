---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/e2e
aliases:
  - "Tests End-to-End Playwright et Cypress"
parent: "[[Tests et Qualité]]"
related_theory:
  - "[[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]"
  - "[[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]"
related_projects: []
source: "https://playwright.dev/docs/intro"
---

# Tests E2E avec Playwright

> [!abstract] En bref
> Un test **end-to-end** (E2E) pilote un **vrai navigateur** comme le ferait un utilisateur : ouvrir la page, taper dans la recherche, cliquer sur un film, vérifier qu'il apparaît dans les favoris. **Playwright** est l'outil de référence. On en écrit **peu**, pour les parcours essentiels.

## Installer

```bash
npm init playwright@latest        # crée playwright.config.ts et un dossier e2e/
npx playwright test               # lancer (sans fenêtre)
npx playwright test --ui          # interface visuelle : très pratique pour écrire et déboguer
npx playwright codegen localhost:5173   # enregistre tes clics et génère le code
```

## Un test : le parcours principal de CinéTrack

```ts
// e2e/favorites.spec.ts
import { test, expect } from '@playwright/test';

test('un visiteur trouve un film et l\'ajoute en favori', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('searchbox', { name: 'Rechercher un film' }).fill('Inception');
  await page.getByRole('link', { name: /Inception/ }).first().click();

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Inception');

  await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
  await page.getByRole('link', { name: 'Favoris' }).click();

  await expect(page.getByText('Inception')).toBeVisible();
});
```

## Trouver les éléments comme un utilisateur

| Localisateur | Trouve | Priorité |
|---|---|---|
| `getByRole('button', { name: 'Envoyer' })` | par rôle et texte accessible | ⭐ à préférer |
| `getByLabel('E-mail')` | un champ par son label | ⭐ |
| `getByText('Aucun résultat')` | un texte | ⭐ |
| `getByTestId('movie-card')` | un `data-testid` | si rien d'autre |
| `locator('.card > h3')` | un sélecteur CSS | à éviter (fragile) |

Bonus : si `getByRole` et `getByLabel` trouvent tes éléments, ta page est probablement **accessible**.

## Les vérifications attendent toutes seules

```ts
await expect(page.getByText('Message envoyé')).toBeVisible();   // attend jusqu'à 5 s
```

Pas besoin de `sleep` : Playwright réessaie jusqu'à ce que la condition soit vraie ou que le délai expire.

## Maîtriser les appels API

Pour un test stable, on peut simuler l'API :

```ts
await page.route('**/movie/popular*', route =>
  route.fulfill({ json: { results: [{ id: 1, title: 'Dune', poster_path: null }] } }),
);
```

## Quels parcours tester

- Le Portfolio : l'accueil s'affiche, le filtre par techno fonctionne, le formulaire de contact valide et envoie.
- CinéTrack : recherche → fiche → favori ; connexion → écrire une critique.

**5 à 10 tests E2E bien choisis** valent mieux que 100 fragiles.

## Pièges

- **Des `waitForTimeout(2000)`** : lents et instables. Utilise les `expect` qui attendent.
- **Des sélecteurs CSS** qui cassent au moindre changement de style.
- **Des tests qui dépendent de données réelles** qui changent (films populaires de TMDB) : simule l'API ou utilise une base de test.
