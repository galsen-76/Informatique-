---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Annuler dans Git]]"
  - "[[Stash]]"
  - "[[Rebase]]"
  - "[[Index Git (staging)]]"
tags:
  - exercice
---
# Exercice — Réparer ses erreurs Git

> [!info] Objectif
> Provoquer volontairement les erreurs courantes et les réparer sans paniquer.
> Notions : [[Annuler dans Git]] · [[Stash]] · [[Rebase]] · [[Index Git (staging)]]

## Consignes
- [ ] Modifie un fichier puis annule la modification
- [ ] Indexe deux fichiers, retire-en un de l'index, commite l'autre
- [ ] Fais un commit avec une faute dans le message, corrige-le
- [ ] Fais un commit de trop, défais-le en gardant les changements
- [ ] Pousse un commit qui « casse » quelque chose et annule-le proprement
- [ ] Mets un travail en cours de côté, change de branche, reviens et récupère-le
- [ ] Fais un `reset --hard` sur un commit, puis retrouve-le avec `reflog`
- [ ] Rebase une branche sur `main` en provoquant un conflit, résous-le

> [!question]- Indice
> Commandes : `restore`, `restore --staged`, `commit --amend`, `reset --soft HEAD~1`, `revert`, `stash`, `reflog`, `rebase` + `--continue`.

> [!question]- Solution
> ```bash
> git restore f.txt
> git add a b && git restore --staged b && git commit -m "feat: a"
> git commit --amend -m "feat: ajoute a"
> git reset --soft HEAD~1
> git revert HEAD && git push
> git stash push -m "en cours" && git switch main && git switch - && git stash pop
> git reset --hard HEAD~1 && git reflog && git reset --hard HEAD@{1}
> git rebase main   # conflit → corriger, git add f, git rebase --continue
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
