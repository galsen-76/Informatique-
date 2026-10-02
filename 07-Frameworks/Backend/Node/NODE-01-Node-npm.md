---
created: 2026-09-24
modified: 2026-10-02
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

Installer et changer de version de Node : **nvm** (voir plus bas). Prends toujours une version **LTS** (paire : 22, 24…).

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

## Une version de Node par projet : nvm

Un vieux projet peut exiger Node 18, un récent Node 22. **nvm** installe plusieurs versions et passe de l'une à l'autre.

```bash
nvm install --lts          # installer la dernière LTS
nvm install 18             # installer une version précise
nvm use 22                 # utiliser Node 22 dans ce terminal
nvm ls                     # les versions installées
```

Dans chaque projet, un fichier `.nvmrc` indique la bonne version :

```bash
echo "22" > .nvmrc
nvm use                    # lit .nvmrc et passe à la bonne version
```

## Les scripts npm

Les scripts de `package.json` sont des **raccourcis** de commandes. Ils utilisent les outils installés **dans le projet** (`node_modules/.bin`), donc la bonne version.

```json
"scripts": {
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "eslint .",
  "e2e": "playwright test"
}
```

```bash
npm start                  # raccourci pour « npm run start » (comme npm test)
npm run build
npm run e2e -- --ui        # tout ce qui suit -- est passé à la commande : playwright test --ui
```

## Global ou local ?

| | Local (dans le projet) | Global (`-g`) |
|---|---|---|
| Installation | `npm i -D outil` | `npm i -g outil` |
| Version | celle du projet, la même pour toute l'équipe | une seule pour toute la machine |
| Utilisation | `npx outil`, ou un script npm | `outil` directement |
| À utiliser pour | **presque tout** | un outil qui sert à créer des projets, rarement |

`npx` lance la version **du projet** si elle existe ; sinon, il la télécharge le temps d'une commande : `npx @angular/cli@latest new mon-projet`.

## Lire la configuration : `process.env`

Le code Node lit les **variables d'environnement** avec `process.env` : c'est comme ça qu'on passe une URL de base de données ou une clé secrète, sans l'écrire dans le code.

```js
const port = process.env.PORT ?? 3000;
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error('DATABASE_URL manquante');
```

```bash
PORT=4000 node server.js        # une variable pour cette commande
node --env-file=.env server.js  # charger un fichier .env (Node 20.6+)
```

Le fichier `.env` contient des secrets : il va dans le `.gitignore`. On commite un `.env.example` sans valeurs secrètes.

## Pourquoi ça marche

**Node** reprend le moteur JavaScript de Chrome (V8) et lui ajoute ce qu'un navigateur interdit pour des raisons de sécurité : lire et écrire des fichiers, ouvrir des connexions réseau, lire les variables d'environnement. Le même langage peut donc servir aux outils (Angular CLI, Vite, ESLint) et aux serveurs.

**npm** résout un problème simple : ton projet dépend de dizaines de librairies, qui dépendent elles-mêmes d'autres librairies. `package.json` dit **ce que tu veux** (avec des plages de versions comme `^1.4.2`), et `package-lock.json` enregistre **exactement ce qui a été installé**. Avec le lock commité, `npm ci` reproduit à l'identique la même installation sur n'importe quelle machine.

Les **scripts npm** utilisent les outils de `node_modules/.bin` : chaque projet garde **sa** version des outils, même si une autre version est installée ailleurs sur la machine.

## Contre-exemple

**Intuition fausse : « `^1.4.2` installe la version 1.4.2 ».**

```json
"dependencies": { "zod": "^3.22.0" }
```

`^` accepte toute version **compatible** : 3.22.0, 3.23.8, 3.25… mais pas 4.0.0. Sans `package-lock.json`, deux personnes qui font `npm install` à un mois d'écart peuvent obtenir **deux versions différentes**. C'est le lock qui fige la version exacte.

## Pièges

- **Supprimer `package-lock.json`** pour « réparer » : chacun aura des versions différentes.
- **Installer une librairie globale** (`-g`) pour un projet : utilise `npx` ou une dépendance du projet.
- **Une librairie inconnue** : vérifie qu'elle est maintenue (téléchargements, dernière version) avant de l'ajouter. Les fausses librairies malveillantes existent.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelle différence entre `dependencies` et `devDependencies` ?**

> [!check]- Réponse
> `dependencies` : ce dont l'application a besoin pour tourner ; `devDependencies` : ce qui sert seulement à développer (TypeScript, tests, linter).

**2. Quelle différence entre `npm install` et `npm ci` ?**

> [!check]- Réponse
> `npm install` installe selon `package.json` et peut mettre à jour le lock ; `npm ci` installe exactement les versions du `package-lock.json` (idéal en CI et pour reproduire une installation).

**3. Quels fichiers commiter, et que ne jamais commiter ?**

> [!check]- Réponse
> Commiter `package.json` et `package-lock.json` ; ne jamais commiter `node_modules` ni `.env`.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Démarrer un projet Node

Écris les commandes pour : créer un dossier `mini-api`, y créer un `package.json`, ajouter la librairie `zod` (pour l'application) et `vitest` (pour les tests seulement), puis indiquer que le projet utilise Node 22.

> [!tip]- Indice 1
> `npm init -y` crée un `package.json` avec les valeurs par défaut.

> [!tip]- Indice 2
> L'option `-D` range une librairie dans les `devDependencies` ; le fichier `.nvmrc` indique la version de Node.

> [!success]- Solution
> ```bash
> mkdir mini-api && cd mini-api
> npm init -y
> npm i zod
> npm i -D vitest
> echo "22" > .nvmrc
> nvm use
> ```

### Exercice 2 · Écrire les scripts

Dans `package.json`, ajoute 3 scripts : `dev` qui lance `node --watch src/index.js`, `test` qui lance `vitest`, et `check` qui lance d'abord les tests puis `node src/index.js`. Comment lances-tu `test` en lui passant l'option `--run` ?

> [!tip]- Indice 1
> Les scripts vont dans l'objet `"scripts"` : un nom, une commande.

> [!tip]- Indice 2
> Pour enchaîner deux commandes : `&&`. Pour passer une option à un script : `npm run <script> -- <option>`.

> [!success]- Solution
> ```json
> "scripts": {
>   "dev": "node --watch src/index.js",
>   "test": "vitest",
>   "check": "npm test -- --run && node src/index.js"
> }
> ```
>
> ```bash
> npm test -- --run
> ```

### Transfert · « Chez moi ça marche, en CI non »

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Ton projet passe sur ta machine, mais la CI échoue avec une erreur dans une librairie. Tu découvres que le `package-lock.json` est dans le `.gitignore`, et que ta machine a Node 22 alors que la CI utilise Node 18. Explique pourquoi les deux environnements diffèrent, et ce que tu changes.

> [!tip]- Indice 1
> Sans lock, quelles versions de librairies la CI installe-t-elle ?

> [!tip]- Indice 2
> Il y a deux différences à supprimer : les versions des librairies et la version de Node.

> [!success]- Solution
> - **Sans lock commité**, la CI installe les versions **les plus récentes** autorisées par les `^`, qui peuvent différer des tiennes.
> - **Node 18 en CI, Node 22 chez toi** : une librairie peut exiger une version plus récente de Node.
>
> Corrections :
> 1. Retirer `package-lock.json` du `.gitignore` et le commiter.
> 2. Utiliser `npm ci` en CI.
> 3. Fixer la version de Node : `.nvmrc` avec `22`, et la même version dans l'image de la CI (`node:22-alpine`). On peut aussi l'indiquer dans `package.json` avec `"engines": { "node": ">=22" }`.

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer ce qu'est Node et ce qu'il permet de plus que le navigateur
- [ ] **Rappeler** : Dire de mémoire le rôle de `package.json`, `package-lock.json`, `node_modules` et la différence `install` / `ci`
- [ ] **Utiliser** : Créer un projet, ajouter des dépendances et écrire des scripts sans modèle
- [ ] **Résoudre un problème nouveau** : Prévoir quelle version d'une librairie sera installée avec un `^` et avec ou sans lock
- [ ] **Repérer les erreurs** : Diagnostiquer une différence entre ta machine et la CI (lock, version de Node)
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand ne pas installer en global : presque toujours, préférer une dépendance du projet ou `npx`
