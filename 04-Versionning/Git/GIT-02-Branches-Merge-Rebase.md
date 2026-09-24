---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/git/branches
aliases:
  - "Branches Merge et Rebase"
parent: "[[Git]]"
children: []
related_theory:
  - "[[GIT-01-Fondamentaux|Git Fondamentaux]]"
  - "[[GIT-04-Conflits|Résoudre les Conflits Git]]"
related_snippets:
  - "[[04_Snippets/git-02-branches-merge-rebase]]"
related_projects: []
source: "https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Rebaser-Rebasing"
---

# Branches Merge et Rebase

> [!abstract] Introduction
> Une branche est une ligne de travail isolée ; `merge` et `rebase` sont les deux façons de réintégrer ce travail — l'une conserve l'historique tel quel, l'autre le réécrit pour le rendre linéaire.

> [!warning]- Prérequis
> [[GIT-01-Fondamentaux|Git Fondamentaux]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> git switch -c feature/favoris      # créer une branche
> git merge feature/favoris          # fusionner dans la branche courante
> git rebase main                    # rejouer mes commits au-dessus de main
> ```

> [!example]- Analogie
> Merge : deux routes qui se rejoignent à un carrefour (on voit les deux routes sur la carte). Rebase : on reconstruit sa route comme si elle était partie plus tard, directement dans le prolongement de la principale.

> [!question]- Pourquoi l'utiliser ?
> Travailler sur plusieurs sujets en parallèle, garder `main` stable, avoir un historique lisible.

> [!question]- Comment ça marche ?
> ```mermaid
> gitGraph
>   commit id: "A"
>   commit id: "B"
>   branch feature
>   commit id: "F1"
>   commit id: "F2"
>   checkout main
>   commit id: "C"
>   merge feature id: "Merge"
> ```
> - **Fast-forward** : si `main` n'a pas bougé, le merge avance simplement le pointeur
> - **Merge commit** : commit à deux parents quand les deux branches ont avancé
> - **Rebase** : rejoue F1, F2 après C → historique linéaire, nouveaux hash
> - **Squash** : fusionne plusieurs commits en un seul (souvent à la fusion de la MR)
> Règle d'or : **ne jamais rebaser une branche partagée déjà poussée** (sauf accord d'équipe et `push --force-with-lease`).

> [!question]- Quand l'utiliser ?
> Rebase : mettre à jour SA branche de feature avec `main` avant la MR. Merge : intégrer une feature dans `main` (via MR).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Rebaser une branche utilisée par d'autres réécrit leur historique → conflits et travail perdu.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Fast-forward | Avance du pointeur sans commit de merge |
| Merge commit | Commit qui réunit deux historiques |
| Rebase | Réapplique des commits sur une autre base |
| Squash | Regroupe plusieurs commits en un |

---

## Points clés

- Une branche par sujet, courte durée de vie
- Rebase de sa propre branche OK, jamais d'une branche partagée
- `--force-with-lease` plutôt que `--force`
- Suivre la convention de l'équipe (merge, squash, rebase)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `git push --force` sur une branche partagée
> - Branches qui vivent des semaines → énormes conflits

---

## Exemple minimal

```bash
git switch feature/favoris
git fetch origin
git rebase origin/main          # résoudre les conflits éventuels, puis :
git push --force-with-lease
```

> [!note] Ce que j'en retiens
> Mettre à jour sa branche avec main avant la revue simplifie la MR et le merge.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `git rebase -i` pour nettoyer ses commits avant revue (réordonner, fusionner, renommer)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Git]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/git-02-branches-merge-rebase]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi ne jamais rebaser une branche partagée ?

> [!faq]- Questions d'entretien
> - Différence entre merge et rebase ?

---

## Tâches

- [ ] #task Faire la section « Montée en puissance » de learngitbranching
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
