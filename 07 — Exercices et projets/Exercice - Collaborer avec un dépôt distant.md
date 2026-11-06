---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Dépôt distant (remote)]]"
  - "[[Merge request]]"
tags:
  - exercice
---
# Exercice — Collaborer avec un dépôt distant

> [!info] Objectif
> Simuler le travail à deux sur un même dépôt GitLab.
> Notions : [[Dépôt distant (remote)]] · [[Merge request]]

## Consignes
- [ ] Crée un projet de test sur GitLab et clone-le deux fois dans `~/labo/alice` et `~/labo/bob`
- [ ] Dans `alice`, crée une branche, un commit, pousse, ouvre une merge request
- [ ] Dans `bob`, modifie `main` (un autre fichier), pousse
- [ ] Dans `alice`, fusionne la MR après avoir mis ta branche à jour, puis récupère `main`
- [ ] Dans `bob`, fais un commit puis un push sans avoir récupéré : lis le refus et résous-le
- [ ] Affiche l'historique graphique des deux côtés et compare

> [!question]- Indice
> `git push -u origin branche`, `git fetch`, `git log --oneline --graph --all`, `git pull --rebase`.

> [!question]- Solution
> ```bash
> cd ~/labo && git clone git@gitlab.com:oumar/test.git alice && git clone git@gitlab.com:oumar/test.git bob
> cd alice && git switch -c feat/readme && echo "Bonjour" >> README.md && git commit -am "docs: complète le README" && git push -u origin feat/readme
> cd ../bob && echo x > autre.txt && git add autre.txt && git commit -m "chore: ajoute autre.txt" && git push
> cd ../alice && git fetch && git rebase origin/main && git push --force-with-lease   # puis Merge dans GitLab
> git switch main && git pull
> cd ../bob && echo y >> autre.txt && git commit -am "chore: maj" && git push   # rejected
> git pull --rebase && git push
> git log --oneline --graph --all
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
