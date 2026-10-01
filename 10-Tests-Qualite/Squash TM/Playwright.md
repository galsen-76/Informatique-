---
created: 2026-10-01
modified: 2026-10-01
type: knowledge
status: "🟡 In Progress"
level: Intermédiaire
tags:
  - tests/squash
  - tests/e2e
aliases:
  - "Playwright avec Squash"
parent: "[[Squash TM]]"
related_theory:
  - "[[TEST-05-Tests-E2E-Playwright|Tests E2E avec Playwright]]"
source: "https://tm-fr.doc.squashtest.com/latest/user-guide/gestion-tests-automatises/techno/playwright.html"
---

# Playwright

## Introduction

Playwright écrit des **tests de bout en bout** (on teste l'application entière, comme un utilisateur) en **TypeScript** ou **JavaScript**. Le test pilote un vrai navigateur : il ouvre des pages, remplit des champs, clique, puis vérifie le résultat.

Il fait partie des technologies supportées par [[Squash Orchestrator]].

## 1. Installation

```bash
npm init playwright@latest
```

Cette commande :
- crée le dossier `tests/` ;
- crée le fichier de configuration `playwright.config.ts` ;
- installe les navigateurs.

## 2. Un premier test

Le test a la **même structure qu'un cas de test [[Squash TM]]** : des actions, puis le résultat attendu.

```ts
import { test, expect } from '@playwright/test';

test('connexion avec un compte valide', async ({ page }) => {
  await page.goto('https://mon-site.fr/login');
  await page.getByLabel('Identifiant').fill('admin');
  await page.getByLabel('Mot de passe').fill('1234');
  await page.getByRole('button', { name: 'Se connecter' }).click();

  await expect(page).toHaveURL(/accueil/);
  await expect(page.getByRole('img', { name: 'logo' })).toBeVisible();
});
```

```
Cas de test Squash                       -> Test Playwright
Action : saisir admin / 1234             -> fill('admin'), fill('1234')
Action : cliquer sur Se connecter        -> click()
Résultat : page d'accueil avec un logo   -> toHaveURL(/accueil/), toBeVisible()
```

## 3. Les briques

| Brique | Rôle | Exemples |
| --- | --- | --- |
| **Navigation** | ouvrir une page | `page.goto(...)` |
| **Locators** | trouver un élément de la page | `getByRole`, `getByLabel`, `getByText`, `getByTestId` |
| **Actions** | agir sur l'élément | `.click()`, `.fill()`, `.check()`, `.selectOption()` |
| **Vérifications** | contrôler le résultat | `toBeVisible()`, `toHaveText()`, `toHaveURL()`, `toBeChecked()` |

Privilégier `getByRole` et `getByLabel`. En Angular, ajouter des attributs `data-testid` aux éléments difficiles à trouver, puis utiliser `getByTestId`.

## 4. Codegen : enregistrer ses clics

```bash
npx playwright codegen https://mon-site.fr
```

Playwright **enregistre les clics** et **génère le code**. Il faut ensuite le nettoyer et ajouter les vérifications (`expect`).

## 5. Les commandes

| Commande | Rôle |
| --- | --- |
| `npx playwright test` | lancer les tests |
| `npx playwright test --ui` | lancer les tests dans une interface visuelle |
| `npx playwright show-report` | ouvrir le rapport des derniers tests |

## 6. Où ranger les tests

Deux possibilités :
- dans le **dépôt de l'application**, dans un dossier `e2e/` ;
- dans un **dépôt dédié** (courant avec l'Orchestrator).

Exemple de dépôt dédié :

```
tests-mon-app/
 |
 |-- tests/
 |    |-- connexion.spec.ts
 |    |-- paiement.spec.ts
 |
 |-- playwright.config.ts   -> URL de l'application, navigateurs
 |-- package.json
```

Créer une branche n'est pas obligatoire : c'est une habitude Git. Mais si les tests restent sur une branche **non fusionnée**, l'Orchestrator doit pointer vers **cette branche**.

## 7. Le lien avec Squash TM

#### Comment ça fonctionne ?

Dans le cas de test Squash, bloc **Automatisation**, champ **« Référence du test automatisé »**. Il a cette forme :

```
[dépôt]/[dossier]#[fichier_de_test]#[cas_de_test]
```

- **dossier** : optionnel ;
- **fichier de test** : un nom de fichier ou une expression régulière (un motif de recherche) ;
- **cas de test** : une expression régulière, optionnelle.

Exemple :

```
tests-mon-app/tests#connexion.spec.ts#connexion valide
```

À retenir :
- si la référence sélectionne **plusieurs tests**, **un seul échec** suffit pour mettre le cas de test en échec ;
- la référence doit correspondre **exactement**, sinon aucun résultat ne remonte.

Vérifier le format dans la documentation Squash « Automatisation avec Playwright » (supporté depuis Squash TM 7.0).

Guide : https://tm-fr.doc.squashtest.com/latest/user-guide/gestion-tests-automatises/techno/playwright.html
