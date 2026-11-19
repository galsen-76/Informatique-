---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Dépôt Git]]"
  - "[[Commit]]"
  - "[[Convention de commit]]"
  - "[[Index Git (staging)]]"
  - "[[Ignorer des fichiers (gitignore)]]"
tags:
  - exercice
---
# Exercice — Premier dépôt et commits propres

> [!info] Objectif
> Créer un dépôt et un historique lisible, en relisant chaque changement.
> Notions : [[Dépôt Git]] · [[Commit]] · [[Convention de commit]] · [[Index Git (staging)]] · [[Ignorer des fichiers (gitignore)]]

## Consignes
- [ ] Crée un dépôt `essai-zip` dans `~/projets` avec un `README.md` et un `.gitignore` (`.venv/`, `__pycache__/`)
- [ ] Fais au moins 4 commits, chacun ne faisant qu'une chose, avec un message au format `type: description`
- [ ] Avant chaque commit, relis `git diff --staged`
- [ ] Affiche l'historique sur une ligne par commit
- [ ] Explique pourquoi un commit qui mélange `fix` et `ci` est une mauvaise idée

> [!question]- Indice
> `git init`, `git add`, `git diff --staged`, `git commit -m`, `git log --oneline`. Types possibles : `feat`, `fix`, `docs`, `build`, `ci`, `test`.

> [!question]- Solution
> ```bash
> mkdir -p ~/projets/essai-zip && cd ~/projets/essai-zip && git init
> printf '.venv/\n__pycache__/\n' > .gitignore
> git add .gitignore && git diff --staged && git commit -m "chore: ignore venv et cache Python"
> echo "# essai-zip" > README.md && git add README.md && git commit -m "docs: ajoute le README"
> git log --oneline
> ```
> Mélanger deux changements empêche de savoir lequel casse la pipeline, et de n'en annuler qu'un.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
