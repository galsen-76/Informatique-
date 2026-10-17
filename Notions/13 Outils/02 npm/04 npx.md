---
type: notion
statut: a apprendre
resume: "npx lance un outil installé dans le projet (ou le télécharge temporairement) sans avoir à l'installer en global."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** `npx` **lance un outil** installé dans le projet (ou le télécharge temporairement) sans avoir à l'installer en global.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour exécuter la commande d'un paquet (`playwright`, `ng`, `eslint`) dans la **version du projet**, sans polluer ta machine.

**Qu'est-ce qui se passait sans ça ?**
Il fallait installer chaque outil en global (`npm install -g`). Tous les projets partageaient alors la même version, et un projet qui avait besoin d'une autre version cassait.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Quand tu installes un paquet qui fournit une commande, npm met un raccourci dans `node_modules/.bin/`. `npx` va chercher la commande là :

```bash
npx playwright test   # lance node_modules/.bin/playwright, la version du projet
npx ng serve          # le CLI Angular du projet
```

Si la commande n'existe pas dans le projet, `npx` propose de télécharger le paquet temporairement :

```bash
npx create-vite@latest mon-projet
```

Dans les `scripts` de `package.json`, pas besoin de `npx` : `"test": "playwright test"` trouve déjà la commande.

## ⚠️ Limites et pièges

- **Sans `npm ci` avant**, `npx playwright` télécharge une version au hasard au lieu de celle du projet.
- **`npx` télécharge depuis le registre** : bloqué si le réseau ou le `.npmrc` ne sont pas bons.
- **Ne pas confondre** `npx playwright install` (télécharge les navigateurs) et `npm install` (installe les paquets).

## 🔗 Liens

- **Prérequis :** [[01 npm|npm]]
- **Voir aussi :** [[02 Playwright|Playwright]]
- **Utilisé dans :** `npx playwright test` en local et en CI

## 📚 Notes

- 
