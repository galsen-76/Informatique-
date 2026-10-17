---
type: notion
statut: a apprendre
resume: "playwright.config.ts est le fichier de réglages de Playwright : où sont les tests, quelle URL tester, combien de réessais, quel rapport produire."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** `playwright.config.ts` est le **fichier de réglages** de Playwright : où sont les tests, quelle URL tester, combien de réessais, quel rapport produire.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour régler le comportement de tous les tests à un seul endroit, et différemment en local et en CI.

**Qu'est-ce qui se passait sans ça ?**
Chaque test répétait l'URL complète, les délais et les options. Changer d'environnement (local → recette) voulait dire modifier tous les fichiers.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Les réglages qu'on touche vraiment :

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',                       // où sont les tests (évite les .spec.ts d'Angular)
  timeout: 30_000,                        // durée max d'UN test
  retries: process.env.CI ? 2 : 0,        // réessais en CI seulement
  workers: process.env.CI ? 1 : undefined,// tests en parallèle
  reporter: [['html'], ['junit', { outputFile: 'results.xml' }]],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:4200', // page.goto('/') part d'ici
    trace: 'retain-on-failure',           // garde la trace si ça échoue
  },
  webServer: {                            // démarre l'appli avant les tests
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI, // en local, réutilise l'appli déjà lancée
    timeout: 120_000,
  },
});
```

- `reporter: 'html'` crée un site à ouvrir avec `npx playwright show-report` ; `junit` crée un XML que GitLab sait afficher.
- `baseURL` te permet d'écrire `page.goto('/login')` au lieu de l'URL complète, et de changer d'environnement avec une seule variable.

## ⚠️ Limites et pièges

- **`testDir` mal réglé** → il lit les tests unitaires d'Angular et plante (`describe is not defined`).
- **Les chemins sont relatifs au fichier de config**, pas au dossier où tu lances la commande.
- **`retries` cache les tests instables** : un test qui passe au 2ᵉ essai est marqué *flaky* dans le rapport, il faut le corriger.
- **`webServer` en CI** : l'appli démarre dans le job ; si elle met plus que `timeout` à démarrer, tout échoue avant même le premier test.
- **Ne mets pas de mot de passe dedans** : passe par une variable d'environnement (`process.env`).

## 🔗 Liens

- **Prérequis :** [[02 Playwright|Playwright]], [[06 Variables d'environnement|Variables d'environnement]]
- **Voir aussi :** [[04 Artifacts GitLab|Artifacts GitLab]], [[02 Pipeline GitLab CI|Pipeline GitLab CI]]
- **Utilisé dans :** la racine du projet de tests

## 📚 Notes

- 
