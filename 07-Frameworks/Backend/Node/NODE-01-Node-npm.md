---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/node/fondamentaux
aliases:
  - "Node.js et npm"
parent: "[[Backend]]"
related_theory:
  - "[[JS-06-Event-Loop|Event Loop JavaScript]]"
  - "[[JS-09-Modules-ESM|Modules ES JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://nodejs.org/fr/learn"
---

# Node.js et npm

> [!abstract] En bref
> **Node.js** exécute du JavaScript **en dehors du navigateur** : sur un serveur, ou dans ton terminal (Angular CLI, Vite, ESLint sont des programmes Node). **npm** installe les librairies et lance les scripts du projet. Tu t'en sers depuis le premier jour, même pour un projet front.

## Node en 30 secondes

```js
// hello.js
console.log('Bonjour depuis Node', process.version);
```

```bash
node hello.js
```

Dans Node, il n'y a pas de `window` ni de `document` (pas de page), mais il y a l'accès aux **fichiers**, au **réseau** et aux **variables d'environnement** (`process.env`).

Installer et changer de version de Node : **fnm** (voir [[OUT-01-Terminal-Bash|Terminal]]). Prends toujours une version **LTS** (paire : 22, 24…).

## `package.json` : la carte d'identité du projet

```json
{
  "name": "cinetrack-api",
  "scripts": {
    "start:dev": "nest start --watch",
    "build": "nest build",
    "test": "vitest"
  },
  "dependencies": { "@nestjs/core": "^11.0.0" },
  "devDependencies": { "typescript": "^5.8.0" }
}
```

| Partie | Contient |
|---|---|
| `scripts` | les commandes du projet : `npm run build` |
| `dependencies` | ce dont l'application a besoin pour **tourner** |
| `devDependencies` | ce qui sert seulement à **développer** (TypeScript, tests, linter) |

## Les commandes npm

| Commande | Rôle |
|---|---|
| `npm install` (`npm i`) | installe tout ce qui est dans `package.json` |
| `npm ci` | installe **exactement** les versions du `package-lock.json` (pour la CI) |
| `npm i zod` | ajoute une librairie |
| `npm i -D vitest` | ajoute une librairie de développement |
| `npm uninstall zod` | retire |
| `npm run build` | lance un script |
| `npx prisma migrate dev` | lance un outil installé dans le projet |
| `npm outdated` | ce qui peut être mis à jour |
| `npm audit` | failles connues dans les dépendances |

## Les versions : `^1.4.2`

Format **MAJEUR.MINEUR.CORRECTIF** (voir [[GIT-07-Conventions-Commits-SemVer|SemVer]]) :
- `^1.4.2` accepte `1.5.0`, `1.9.9`, mais pas `2.0.0` (qui peut casser ton code) ;
- le **`package-lock.json`** fige les versions exactes installées. **Il se commite**, pour que tout le monde ait les mêmes.

## `node_modules`

Le dossier où sont installées les librairies. Énorme, **jamais commité** (dans `.gitignore`), recréé par `npm install`.

**Le remède universel** quand plus rien ne marche après une mise à jour :

```bash
rm -rf node_modules && npm install
```

## Pièges

- **Supprimer `package-lock.json`** pour « réparer » : chacun aura des versions différentes.
- **Installer une librairie globale** (`-g`) pour un projet : utilise `npx` ou une dépendance du projet.
- **Une librairie inconnue** : vérifie qu'elle est maintenue (téléchargements, dernière version) avant de l'ajouter. Les fausses librairies malveillantes existent.
