---
type: error
tool: Git
date: 2026-11-03
concepts:
  - "[[Conflit de merge]]"
  - "[[Merge]]"
tags:
  - erreur
---
# Erreur — CONFLICT lors d'un git merge

> [!bug] Message
> ```text
> Auto-merging config.js
> CONFLICT (content): Merge conflict in config.js
> Automatic merge failed; fix conflicts and then commit the result.
> ```

## Contexte
[[git merge]] de `feature/config` dans `main`, les deux branches ayant modifié la ligne du port.

## Cause
Les deux branches ont changé **les mêmes lignes** : Git ne peut pas deviner laquelle garder. Voir [[Conflit de merge]].

## Solution
1. `git status` liste les fichiers en conflit (*both modified*).
2. Ouvrir le fichier et choisir le bon contenu :
   ```text
   <<<<<<< HEAD
   const PORT = 3000;
   =======
   const PORT = 8080;
   >>>>>>> feature/config
   ```
   → garder une version (ou combiner), **supprimer les trois marqueurs**.
3. Finaliser :
   ```bash
   git add config.js
   git commit
   ```
4. Pour tout annuler à la place : `git merge --abort`.

## Ce que j'ai appris
Un conflit n'est pas une perte de données. Des branches courtes et des merges fréquents en réduisent le nombre.
