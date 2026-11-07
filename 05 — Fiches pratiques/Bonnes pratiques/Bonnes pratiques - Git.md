---
type: bonnes-pratiques
sujet: "Git"
concepts:
  - "[[Git]]"
  - "[[Commit]]"
  - "[[Branche Git]]"
  - "[[Convention de commit]]"
  - "[[Merge request]]"
  - "[[Annuler dans Git]]"
  - "[[Ignorer des fichiers (gitignore)]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Git

> [!info] À quoi sert cette fiche
> Un historique propre, des collaborations sans conflit inutile, et aucune perte de travail.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Des petits commits qui font une seule chose
Faciles à relire, à annuler et à comprendre dans six mois.

### 2. Des messages qui disent quoi et pourquoi
Une ligne courte à l'impératif, puis le pourquoi si besoin. Voir [[Convention de commit]] et les [[Exemples de commits conventionnels]].

```bash
feat(export): ajoute l'export PNG des annotations

CVAT ne propose que des formats texte ; l'équipe a besoin d'images.
```

### 3. Regarder avant de commiter
`git status` puis `git diff --staged` : tu sais exactement ce qui part.

### 4. Une branche par sujet, partie de la branche principale à jour
Voir [[Branche Git]].

```bash
git switch main && git pull
git switch -c feat/bouton-export
```

### 5. Récupérer souvent les changements des autres
`git pull` (ou `fetch` puis `rebase`) régulièrement : petits conflits plutôt qu'un gros à la fin.

### 6. Un .gitignore dès le début
`node_modules/`, `.venv/`, `__pycache__/`, `.env`, `dist/`. Voir [[Ignorer des fichiers (gitignore)]].

### 7. Passer par une merge request et la relire soi-même d'abord
Relire son propre diff dans GitLab avant de demander une revue. Voir [[Merge request]].

### 8. Connaître ses filets de sécurité
`git stash`, `git restore`, `git revert`, `git reflog` : presque tout se récupère. Voir [[Annuler dans Git]].

## À éviter

### 1. Commiter un secret
**Pourquoi c'est un problème :** il reste dans l'historique même supprimé ensuite.
**À la place :** `.env` ignoré, variables de CI masquées ; si c'est arrivé, révoquer le secret.

### 2. `git push --force` sur une branche partagée
**Pourquoi c'est un problème :** efface le travail des autres.
**À la place :** `git push --force-with-lease`, et seulement sur sa propre branche.

### 3. Réécrire l'historique déjà poussé (rebase, amend)
**Pourquoi c'est un problème :** les autres ont une histoire différente : conflits et commits en double.
**À la place :** `git revert` pour annuler un commit publié.

### 4. Des commits « wip », « fix », « test »
**Pourquoi c'est un problème :** l'historique ne raconte rien.
**À la place :** des messages qui décrivent le changement ; regrouper avant la merge request si besoin.

### 5. `git add .` sans regarder
**Pourquoi c'est un problème :** fichiers temporaires, secrets ou gros fichiers commités par erreur.
**À la place :** `git status`, puis ajouter ce qu'il faut.

### 6. Travailler directement sur la branche principale d'un projet d'équipe
**Pourquoi c'est un problème :** pas de revue, pas de CI avant fusion.
**À la place :** une branche et une merge request.

## Avant de valider mon travail
- [ ] `git status` est propre et je sais ce que contient le commit
- [ ] Aucun secret, aucun fichier généré
- [ ] Le message explique le changement
- [ ] Ma branche est à jour avec la branche principale
- [ ] La pipeline est verte

## Notions liées
[[Git]] · [[Commit]] · [[Branche Git]] · [[Convention de commit]] · [[Merge request]] · [[Annuler dans Git]] · [[Ignorer des fichiers (gitignore)]]
