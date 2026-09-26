---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
tags:
  - outils/git/avance
aliases:
  - "Git Avancé"
parent: "[[Git]]"
related_theory:
  - "[[GIT-05-Annuler-Corriger|Annuler et Corriger dans Git]]"
related_projects: []
source: "https://git-scm.com/book/fr/v2/Utilitaires-Git-R%C3%A9%C3%A9crire-l%E2%80%99historique"
---

# Git Avancé

> [!abstract] En bref
> Des commandes moins fréquentes mais qui font gagner des heures : **nettoyer tes commits** avant une MR, **récupérer un seul commit** d'une autre branche, **trouver automatiquement** le commit qui a introduit un bug, **savoir qui a écrit** une ligne et pourquoi.

## Aide-mémoire

| Besoin | Commande |
|---|---|
| nettoyer / regrouper mes commits avant la MR | `git rebase -i main` |
| copier un commit d'une autre branche | `git cherry-pick <id>` |
| trouver le commit qui a cassé quelque chose | `git bisect` |
| qui a modifié cette ligne, et quand | `git blame fichier.ts` (ou l'annotation de l'éditeur) |
| chercher dans l'historique un texte ajouté ou supprimé | `git log -S "useProjectFilters"` |
| voir l'historique d'un fichier | `git log --follow -p fichier.ts` |
| travailler sur deux branches en même temps | `git worktree add ../hotfix main` |
| lancer une action avant chaque commit | hooks (husky) |

## Rebase interactif : nettoyer avant la MR

Tes commits : « wip », « fix typo », « encore un fix », « ajoute le filtre ». Avant de proposer la MR :

```bash
git rebase -i main
```

L'éditeur s'ouvre :

```text
pick a1b2c3 ajoute le filtre
fixup d4e5f6 fix typo            ← fusionné dans le précédent, message oublié
fixup g7h8i9 encore un fix
reword j1k2l3 wip                ← changer le message
```

| Mot | Effet |
|---|---|
| `pick` | garder |
| `reword` | garder, changer le message |
| `squash` | fusionner avec le précédent, en combinant les messages |
| `fixup` | fusionner avec le précédent, en gardant son message |
| `drop` | supprimer |

Seulement sur **ta** branche, jamais sur une branche partagée (voir [[GIT-02-Branches-Merge-Rebase|Rebase]]).

## Bisect : trouver le coupable automatiquement

« Le filtre marchait il y a 2 semaines, plus maintenant, et il y a 60 commits depuis. »

```bash
git bisect start
git bisect bad                 # la version actuelle est cassée
git bisect good v1.2.0         # cette version marchait
# Git se place au milieu : tu testes, puis tu dis
git bisect good                # ou : git bisect bad
# … 6 étapes plus tard, Git affiche le commit fautif
git bisect reset
```

Chaque étape coupe les possibilités en deux : 60 commits = environ 6 tests. Avec un test automatique : `git bisect run npm test`.

## Cherry-pick : un seul commit

Une correction faite sur ta branche doit partir tout de suite en production :

```bash
git switch main
git cherry-pick a1b2c3
```

## Blame : comprendre une ligne

`git blame` n'est pas fait pour accuser : il montre le **commit** derrière une ligne, donc son **message** et sa MR, c'est-à-dire le **pourquoi**. Dans IntelliJ : clic droit dans la marge → *Annotate with Git Blame*.

## Pièges

- **Rebase interactif sur une branche déjà relue** : les commentaires de revue peuvent se détacher des lignes. Nettoie **avant** de demander la revue.
- **Cherry-pick en série** : si tu en fais beaucoup, c'est souvent un signe que la stratégie de branches est à revoir.
