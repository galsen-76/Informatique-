---
type: howto
concepts:
  - "[[Node.js]]"
  - "[[npm]]"
tags:
  - fiche-pratique
---
# Fiche - Démarrer un projet Node.js

> [!info] Objectif
> Créer un projet Node propre, prêt à être versionné.

## Étapes
1. Vérifier l'installation : `node --version` et `npm --version`.
2. Créer le dossier et le `package.json` :
   ```bash
   mkdir mon-projet && cd mon-projet
   npm init -y
   ```
3. Créer `.gitignore` :
   ```text
   node_modules/
   .env
   ```
4. Ajouter un script de démarrage dans `package.json` :
   ```json
   "scripts": { "dev": "node --watch server.js" }
   ```
5. Lancer : `npm run dev`.

> [!success] Vérifier que ça marche
> `npm run dev` démarre sans erreur et redémarre quand tu modifies `server.js`.

## Liens
- [[Node.js]] · [[npm]] · [[npm init]] · [[npm install]] · [[node]]
