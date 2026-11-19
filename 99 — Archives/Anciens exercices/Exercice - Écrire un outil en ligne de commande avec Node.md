---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Node.js]]"
  - "[[Fichiers et chemins avec Node (fs et path)]]"
  - "[[Gestionnaire de versions de Node (nvm)]]"
  - "[[Boucle d'événements]]"
tags:
  - exercice
---
# Exercice — Écrire un outil en ligne de commande avec Node

> [!info] Objectif
> Écrire en JavaScript l'équivalent d'un petit script Python : lire des arguments, parcourir un dossier, écrire un rapport, sortir avec le bon code.
> Notions : [[Node.js]] · [[Fichiers et chemins avec Node (fs et path)]] · [[Gestionnaire de versions de Node (nvm)]] · [[Boucle d'événements]]

## Consignes
- [ ] Dans WSL, installe nvm puis Node LTS ; crée un `.nvmrc` dans un nouveau dossier
- [ ] Écris `rapport.js` : `node rapport.js <dossier> [extension]`
- [ ] Il liste les fichiers (avec `fs/promises`), filtre par extension si donnée, et calcule nombre et taille totale
- [ ] Il écrit `rapport.json` (nom, taille, date de modification de chaque fichier) dans le dossier courant
- [ ] Si le dossier n'existe pas : message sur `stderr` (`console.error`) et `process.exit(1)` ; vérifie avec `echo $?`
- [ ] Remplace `readdir` par `readdirSync` puis explique pourquoi la version asynchrone est préférable dans un serveur

> [!question]- Indice
> `stat(chemin)` donne `size` et `mtime`. Construis chaque chemin avec `path.join(dossier, nom)`.

> [!question]- Solution
> ```js
> import { readdir, stat, writeFile } from "node:fs/promises";
> import path from "node:path";
>
> const [dossier, ext] = process.argv.slice(2);
> if (!dossier) { console.error("Usage : node rapport.js <dossier> [ext]"); process.exit(2); }
> try {
>   const noms = (await readdir(dossier)).filter((n) => !ext || path.extname(n) === ext);
>   const fichiers = [];
>   for (const nom of noms) {
>     const s = await stat(path.join(dossier, nom));
>     if (s.isFile()) fichiers.push({ nom, taille: s.size, modifie: s.mtime.toISOString() });
>   }
>   const total = fichiers.reduce((t, f) => t + f.taille, 0);
>   await writeFile("rapport.json", JSON.stringify({ total, fichiers }, null, 2));
>   console.log(`${fichiers.length} fichiers, ${total} octets`);
> } catch (e) {
>   console.error(`Impossible de lire ${dossier} : ${e.code}`);
>   process.exit(1);
> }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
