---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - outils/git/annuler
aliases:
  - "Annuler et Corriger dans Git"
parent: "[[Git]]"
children: []
related_theory:
  - "[[GIT-01-Fondamentaux|Git Fondamentaux]]"
  - "[[GIT-08-Git-Avance|Git Avancé]]"
related_snippets:
  - "[[04_Snippets/git-05-annuler-corriger]]"
related_projects: []
source: "https://git-scm.com/book/fr/v2/Les-bases-de-Git-Annuler-des-actions"
---

# Annuler et Corriger dans Git

> [!abstract] Introduction
> Git offre plusieurs façons de revenir en arrière — `restore`, `reset`, `revert`, `stash`, `commit --amend`, `reflog` — à choisir selon que le travail est local ou déjà partagé.

> [!warning]- Prérequis
> [[GIT-01-Fondamentaux|Git Fondamentaux]]

---

## Théorie

> [!question]- C'est quoi ?
> | Besoin | Commande | Réécrit l'historique ? |
> |---|---|---|
> | Annuler les modifs d'un fichier | `git restore fichier` | Non (perte des modifs) |
> | Retirer du staging | `git restore --staged fichier` | Non |
> | Corriger le dernier commit (local) | `git commit --amend` | Oui |
> | Défaire des commits locaux | `git reset --soft/--mixed/--hard HEAD~1` | Oui |
> | Annuler un commit déjà poussé | `git revert <sha>` | Non (nouveau commit inverse) |
> | Mettre de côté un travail | `git stash` / `git stash pop` | Non |
> | Retrouver un commit « perdu » | `git reflog` | — |

> [!example]- Analogie
> `revert` : publier un erratum dans le journal du lendemain. `reset` : arracher la page avant que le journal ne soit imprimé.

> [!question]- Pourquoi l'utiliser ?
> Les erreurs arrivent (mauvais fichier commité, commit sur la mauvaise branche) : savoir les corriger sans paniquer ni casser le travail des autres.

> [!question]- Comment ça marche ?
> - `--soft` : garde les modifs indexées ; `--mixed` (défaut) : garde les modifs non indexées ; `--hard` : supprime tout
> - Sur une branche partagée : **revert**, jamais reset
> - `reflog` garde ~90 jours d'historique des déplacements de HEAD : presque rien n'est vraiment perdu

> [!question]- Quand l'utiliser ?
> Local et non poussé : amend/reset. Poussé et partagé : revert.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `reset --hard` et `restore` suppriment des modifications NON commitées de façon définitive.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Revert | Commit qui annule un autre |
| Reset | Déplace la branche vers un autre commit |
| Stash | Pile de modifications mises de côté |
| Reflog | Journal des positions de HEAD |

---

## Points clés

- Partagé → revert ; local → reset/amend
- `stash` pour changer de branche rapidement
- `reflog` pour tout récupérer

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `git reset --hard` avec du travail non commité
> - `--amend` sur un commit déjà poussé

---

## Exemple minimal

```bash
# J'ai commité sur main au lieu d'une branche (pas encore poussé)
git switch -c feature/oups        # la branche garde le commit
git switch main
git reset --hard origin/main      # main revient à l'état distant
```

> [!note] Ce que j'en retiens
> Créer la branche d'abord, nettoyer ensuite : aucun travail perdu.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir récupérer après un rebase raté grâce au reflog

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Git]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/git-05-annuler-corriger]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi utiliser revert plutôt que reset sur une branche partagée ?

---

## Tâches

- [ ] #task S'entraîner : amend, reset --soft, revert, stash, reflog dans un dépôt de test
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
