---
type: concept
domain: tests
module: "[[Module 12 - Tests]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Test d'intégration]]"
  - "[[DOM]]"
parents:
  - "[[Test automatisé]]"
related:
  - "[[Accessibilité web]]"
next_review: 
method: []
tags:
  - concept
  - tests
---
# Test de bout en bout

> [!info] En une phrase
> Un test de bout en bout (E2E) pilote un vrai navigateur sur l'application complète, comme un utilisateur : il clique, saisit et vérifie ce qui s'affiche.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

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
Pour le bouton CVAT : un test qui ouvre une tâche, clique sur « Exporter en PNG » et vérifie qu'un fichier est téléchargé (`page.waitForEvent("download")`).

### Cas d'utilisation
- Parcours de connexion
- Parcours critique (commande, export)
- Vérifier un déploiement en préproduction

> [!warning] À ne pas confondre
> Tout tester en bout en bout : la suite devient lente et fragile. Et les `waitForTimeout(3000)` : Playwright attend tout seul que l'élément apparaisse, utilise ses assertions `expect(...).toBeVisible()`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine un test Playwright qui ajoute une dépense : le navigateur, le front Vue, l'API, la base, la vérification à l'écran.

> [!example] 🔄 Change de contexte
> Redessine-le pour ton projet de mémoire : le scénario Gherkin, les étapes, le navigateur, les résultats envoyés à Squash.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Test de bout en bout » et je l'intègre ici avec `![[Schéma - Test de bout en bout.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Test d'intégration]] · [[DOM]]
- **Complémentaires** : [[Accessibilité web]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
