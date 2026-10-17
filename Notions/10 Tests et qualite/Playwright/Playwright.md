---
type: notion
statut: a apprendre
resume: "Playwright est un outil (de Microsoft) qui pilote un vrai navigateur par du code pour tester une appli web comme un utilisateur."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Playwright est un outil (de Microsoft) qui **pilote un vrai navigateur** par du code pour tester une appli web comme un utilisateur.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour automatiser les tests end-to-end : ouvrir les pages, cliquer, remplir, et vérifier ce qui s'affiche, sur Chromium, Firefox et WebKit (Safari).

**Qu'est-ce qui se passait sans ça ?**
On utilisait Selenium : il fallait ajouter des attentes à la main partout (`sleep`), les tests étaient lents et cassaient au hasard dès qu'une page mettait un peu plus de temps à charger.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Playwright lance un navigateur, et ton test lui donne des ordres. Sa grande force : **il attend tout seul** (auto-wait). Avant de cliquer, il attend que le bouton soit visible, activé et stable. Tu n'écris (presque) jamais d'attente à la main.

Les briques :

| Brique | Rôle | Exemple |
|---|---|---|
| Navigation | ouvrir une page | `page.goto('/')` |
| [[Locators Playwright\|Locators]] | trouver un élément | `page.getByRole('button', { name: 'Valider' })` |
| Actions | agir | `.click()`, `.fill('texte')`, `.check()` |
| [[Assertions web-first\|Assertions]] | vérifier | `await expect(locator).toBeVisible()` |

Les commandes à connaître :

```bash
npx playwright test            # lance tous les tests
npx playwright test --ui       # interface visuelle, pas à pas
npx playwright codegen <url>   # enregistre tes clics et génère le code
npx playwright show-report     # ouvre le rapport HTML
npx playwright install         # télécharge les navigateurs
```

## ⚠️ Limites et pièges

- **La version de l'image Docker doit être la même que celle de `@playwright/test`** (ex. `mcr.microsoft.com/playwright:v1.63.0-noble` avec `@playwright/test@1.63.0`), sinon il ne trouve pas les navigateurs.
- **`npx playwright install` télécharge les navigateurs depuis Internet** : bloqué en entreprise si le pare-feu l'interdit → utiliser l'image officielle qui les contient déjà.
- **Il lit tous les `*.spec.ts`** : dans un projet Angular, il tombe sur les tests unitaires (`describe is not defined`) → régler `testDir` dans [[Configuration Playwright]].
- **`page.waitForTimeout(3000)`** = attente fixe : lent et fragile. Presque toujours, une assertion web-first fait mieux.
- **Le code généré par codegen est un brouillon** : il faut le nettoyer et ajouter les vérifications.

## 🔗 Liens

- **Prérequis :** [[Test automatisé]], [[npm]], [[Notions/13 Outils/npm/npx]]
- **Voir aussi :** [[Locators Playwright]], [[Assertions web-first]], [[Hooks Playwright]], [[Configuration Playwright]], [[Test flaky]]
- **Utilisé dans :** le dépôt `exploration-tests`, la CI GitLab, Squash Orchestrator

## 📚 Notes

- Doc : https://playwright.dev/docs/intro
