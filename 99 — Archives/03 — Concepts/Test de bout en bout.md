---
type: concept
module: "[[Module 12 - Tests]]"
related:
  - "[[Accessibilité web]]"
tags:
  - concept
  - tests
---
# Test de bout en bout

> [!info] En une phrase
> Un test de bout en bout (E2E) pilote un vrai navigateur sur l'application complète, comme un utilisateur : il clique, saisit et vérifie ce qui s'affiche.

## 1 · Comprendre
### Définition
Outils : **Playwright** (recommandé), Cypress, Selenium.
```ts
import { test, expect } from "@playwright/test";
test("ajouter une tâche", async ({ page }) => {
  await page.goto("http://localhost:5173/taches");
  await page.getByPlaceholder("Nouvelle tâche").fill("Lot 7");
  await page.getByRole("button", { name: "Ajouter" }).click();
  await expect(page.getByText("Lot 7")).toBeVisible();
});
```
- Cherche les éléments comme un humain (rôle, texte, label) plutôt que par classe CSS, qui change souvent.
- Lents et plus fragiles : on en garde **peu**, pour les parcours essentiels (connexion, création, export).
- `npx playwright test --ui` pour les voir s'exécuter ; une **trace** permet de rejouer un échec.

### Pourquoi ça existe
Seul un vrai navigateur sur la vraie application prouve que le parcours de l'utilisateur fonctionne entièrement.

### Le problème résolu
Vérifier les parcours critiques avant chaque mise en production, sans les refaire à la main.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T[Test Playwright] --> N[Navigateur]
  N --> F[Frontend]
  F --> A[API]
  A --> B[(Base)]
```

### Exemple concret
```bash
npm init playwright@latest
npx playwright test
npx playwright test --ui
npx playwright show-report
```
Pour un bouton d'export : un test qui ouvre une page, clique sur « Exporter en PDF » et vérifie qu'un fichier est téléchargé (`page.waitForEvent("download")`).

### Cas d'utilisation
- Parcours de connexion
- Parcours critique (commande, export)
- Vérifier un déploiement en préproduction

> [!warning] À ne pas confondre
> Tout tester en bout en bout : la suite devient lente et fragile. Et les `waitForTimeout(3000)` : Playwright attend tout seul que l'élément apparaisse, utilise ses assertions `expect(...).toBeVisible()`.

## 3 · Relier
- **Prérequis** : [[Test d'intégration]] · [[DOM]]
- **Complémentaires** : [[Accessibilité web]]
