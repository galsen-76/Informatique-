---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Node.js]]"
  - "[[npm]]"
tags:
  - exercice
---
# Exercice — Initialiser un projet Node

> [!info] Objectif
> Créer un projet Node, y ajouter une dépendance et lancer un script.
> Notions : [[Node.js]] · [[npm]]

## Consignes
- [ ] Crée un dossier, initialise un `package.json`
- [ ] Installe une dépendance (par exemple `dayjs`) et regarde ce qui change dans les fichiers
- [ ] Écris `index.js` qui affiche la date du jour avec cette dépendance
- [ ] Ajoute un script `start` dans `package.json` et lance-le avec npm
- [ ] Supprime `node_modules`, puis réinstalle tout avec une seule commande

> [!question]- Indice
> Voir [[npm init]] et [[npm install]]. Les scripts se lancent avec `npm run <nom>` (ou `npm start`).

> [!question]- Solution
> ```bash
> npm init -y
> npm install dayjs        # ajoute dependencies + node_modules + package-lock.json
> echo 'const d = require("dayjs"); console.log(d().format("DD/MM/YYYY"));' > index.js
> npm pkg set scripts.start="node index.js"
> npm start
> rm -rf node_modules && npm install
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
