---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Git]]"
  - "[[Branche Git]]"
  - "[[Merge]]"
  - "[[Conflit de merge]]"
tags:
  - exercice
---
# Exercice — Branches et merge avec Git

> [!info] Objectif
> Pratiquer le cycle complet : branche → commits → fusion → conflit → résolution.
> Notions : [[Branche Git]] · [[Merge]] · [[Conflit de merge]] · Commandes : [[git switch]] · [[git merge]]

## Étape 1 — Préparer
- [ ] Créer un dossier `labo-git`, puis `git init -b main`
- [ ] Créer `menu.txt` avec trois lignes (`entrée`, `plat`, `dessert`) et le committer

## Étape 2 — Une fonctionnalité sans conflit
- [ ] Créer la branche `feature/boisson` et ajouter une ligne `boisson` à la fin
- [ ] Committer, revenir sur `main`, fusionner
- [ ] Observer le message : était-ce un *fast-forward* ? Pourquoi ?

## Étape 3 — Provoquer un conflit
- [ ] Créer `feature/plat` et remplacer `plat` par `plat du jour`, committer
- [ ] Revenir sur `main`, remplacer `plat` par `plat végétarien`, committer
- [ ] Fusionner `feature/plat` dans `main` → **conflit attendu**

## Étape 4 — Résoudre
- [ ] Ouvrir `menu.txt`, choisir une version, supprimer les marqueurs
- [ ] `git add menu.txt` puis `git commit`
- [ ] `git log --oneline --graph` : repérer le commit de fusion

> [!question]- Pourquoi l'étape 2 est-elle un fast-forward ?
> `main` n'avait pas avancé depuis la création de la branche : Git déplace simplement le pointeur `main`.

> [!question]- Solution de l'étape 3
> ```bash
> git switch -c feature/plat
> # modifier menu.txt
> git commit -am "Plat du jour"
> git switch main
> # modifier la même ligne autrement
> git commit -am "Plat végétarien"
> git merge feature/plat
> ```

## Validation
- [ ] Je sais expliquer pourquoi le conflit est apparu
- [ ] Je refais l'exercice de mémoire, sans regarder les solutions
