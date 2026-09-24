---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
tags:
  - outils/git/avance
aliases:
  - "Git Avancé"
parent: "[[Git]]"
children: []
related_theory:
  - "[[GIT-05-Annuler-Corriger|Annuler et Corriger dans Git]]"
related_snippets:
  - "[[04_Snippets/git-08-git-avance]]"
related_projects: []
source: "https://git-scm.com/book/fr/v2/Utilitaires-Git-R%C3%A9%C3%A9crire-l%E2%80%99historique"
---

# Git Avancé

> [!abstract] Introduction
> Les outils qui font gagner des heures : rebase interactif, cherry-pick, bisect (trouver le commit fautif), blame, hooks, worktrees.

> [!warning]- Prérequis
> [[GIT-05-Annuler-Corriger|Annuler et Corriger dans Git]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> git rebase -i HEAD~4            # réordonner / fusionner (squash/fixup) / renommer des commits
> git cherry-pick <sha>           # appliquer un commit précis sur la branche courante
> git bisect start; git bisect bad; git bisect good v1.2   # recherche dichotomique du bug
> git blame -L 10,30 fichier.ts   # qui a modifié ces lignes
> git log -S "calculerTotal"      # commits qui ont ajouté/retiré ce texte
> git worktree add ../hotfix main # deuxième copie de travail sans re-cloner
> ```

> [!example]- Analogie
> `bisect` est un jeu du « plus ou moins » sur l'historique : en 10 questions on trouve le commit fautif parmi 1000.

> [!question]- Pourquoi l'utiliser ?
> Nettoyer son historique avant revue, porter un correctif sur une autre branche, trouver l'origine d'une régression rapidement.

> [!question]- Comment ça marche ?
> - Hooks (`.git/hooks` ou husky) : `pre-commit` (lint-staged), `commit-msg` (commitlint), `pre-push` (tests)
> - `git bisect run npm test` : automatise la recherche
> - `fixup!` + `rebase -i --autosquash` pour corriger un commit précédent proprement

> [!question]- Quand l'utiliser ?
> Rebase interactif : avant d'ouvrir une MR. Cherry-pick : hotfix à reporter. Bisect : « ça marchait la semaine dernière ».

> [!danger]- Quand NE PAS l'utiliser / Limites
> Rebase interactif = réécriture : seulement sur une branche non partagée.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Rebase interactif | Édition de la liste des commits |
| Cherry-pick | Copier un commit sur une autre branche |
| Bisect | Recherche dichotomique d'un commit |
| Hook | Script déclenché par une action Git |

---

## Points clés

- Nettoyer ses commits avant la MR
- Bisect pour les régressions
- Hooks pour automatiser la qualité

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Cherry-pick en série qui duplique des commits et crée des conflits futurs

---

## Exemple minimal

```bash
git bisect start
git bisect bad                 # la version actuelle est cassée
git bisect good v2.3.0         # cette version marchait
git bisect run npm test -- --run
git bisect reset
```

> [!note] Ce que j'en retiens
> Git trouve tout seul le premier commit qui fait échouer les tests.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Maîtriser l'historique pour des revues efficaces (commits atomiques racontant une histoire)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Git]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/git-08-git-avance]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Dans quel cas utiliser cherry-pick ?

---

## Tâches

- [ ] #task Utiliser bisect sur un dépôt d'entraînement avec un bug introduit volontairement
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
