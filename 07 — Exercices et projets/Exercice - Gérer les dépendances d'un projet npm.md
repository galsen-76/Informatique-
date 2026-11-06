---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[npm]]"
  - "[[package.json]]"
  - "[[Version sémantique (semver)]]"
tags:
  - exercice
---
# Exercice — Gérer les dépendances d'un projet npm

> [!info] Objectif
> Manipuler un vrai package.json : dépendances, scripts, versions et installation reproductible.
> Notions : [[npm]] · [[package.json]] · [[Version sémantique (semver)]]

## Consignes
- [ ] Crée un projet (`npm init -y`), ajoute `dayjs` en dépendance et `vitest` en dépendance de développement
- [ ] Ajoute les scripts `start` et `test`, lance-les
- [ ] Installe une ancienne version : `npm install dayjs@1.11.0`, puis `npm outdated` ; explique *Current*, *Wanted*, *Latest*
- [ ] Écris dans un tableau ce qu'acceptent `^1.11.0`, `~1.11.0`, `1.11.0`, `^0.4.2`
- [ ] Supprime `node_modules`, réinstalle avec `npm ci` ; modifie `package.json` à la main sans mettre à jour le lock et relance `npm ci` : lis l'erreur
- [ ] Lance `npm audit` et explique ce qu'il affiche
- [ ] Vérifie que `node_modules` est bien dans `.gitignore`

> [!question]- Indice
> `npm ci` refuse de travailler si `package.json` et `package-lock.json` ne correspondent pas : c'est ce qui garantit la même installation partout.

> [!question]- Solution
> - `^1.11.0` : `>=1.11.0 <2.0.0` ; `~1.11.0` : `>=1.11.0 <1.12.0` ; `1.11.0` : exactement ; `^0.4.2` : `>=0.4.2 <0.5.0`.
> - *Current* : installée ; *Wanted* : la plus récente permise par la plage ; *Latest* : la dernière publiée.
> ```json
> "scripts": { "start": "node index.js", "test": "vitest run" },
> "dependencies": { "dayjs": "^1.11.0" },
> "devDependencies": { "vitest": "^2.1.0" }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
