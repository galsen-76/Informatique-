---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/git/fondamentaux
aliases:
  - "Git Fondamentaux"
parent: "[[Git]]"
children:
  - "[[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]]"
  - "[[GIT-03-Depots-Distants|Dépôts Distants]]"
related_theory:
  - "[[01-GitLab|Fondamentaux GitLab]]"
related_snippets:
  - "[[04_Snippets/git-01-fondamentaux]]"
related_projects: []
source: "https://git-scm.com/book/fr/v2"
---

# Git Fondamentaux

> [!abstract] Introduction
> Git sert à suivre l'historique d'un projet et à permettre à plusieurs personnes d'y travailler en parallèle sans s'écraser mutuellement.

---

## Théorie

> [!question]- C'est quoi ?
> **Git** est un système de contrôle de version **décentralisé** : chaque poste possède une copie complète de l'historique du projet. Il enregistre des **instantanés** (snapshots) successifs, pas des différences.

> [!example]- Analogie
> Git est un appareil photo pour ton projet : chaque commit est une photo datée et légendée de tout le projet ; on peut revenir à n'importe quelle photo, ou créer un « univers parallèle » (branche) pour essayer une idée.

> [!question]- Pourquoi l'utiliser ?
> - Revenir en arrière à tout moment
> - Isoler un travail en cours (branche) sans toucher au code stable
> - Fusionner plusieurs contributions proprement
> - Savoir qui a changé quoi, quand et pourquoi (`git log`, `git blame`)

> [!question]- Comment ça marche ?
> Les 3 zones :
> ```mermaid
> flowchart LR
>   WD["Working directory<br/>(fichiers modifiés)"] -->|"git add"| ST["Staging area<br/>(index)"]
>   ST -->|"git commit"| RE["Dépôt local<br/>(.git, historique)"]
>   RE -->|"git push"| RM["Dépôt distant<br/>(GitLab)"]
>   RM -->|"git pull / fetch"| RE
>   RE -->|"git switch / restore"| WD
> ```
> Configuration initiale :
> ```bash
> git config --global user.name "Prénom Nom"
> git config --global user.email "moi@entreprise.fr"
> git config --global init.defaultBranch main
> git config --global pull.rebase true      # optionnel, selon la convention d'équipe
> ```

> [!question]- Quand l'utiliser ?
> Sur tout projet de code, seul ou en équipe, dès la première ligne.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Git n'est pas fait pour les gros fichiers binaires (vidéos, datasets) → Git LFS. Il ne remplace pas une sauvegarde des secrets : un secret commité reste dans l'historique.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Commit | Instantané de l'état du projet avec un message |
| Staging area | Zone de préparation du prochain commit |
| HEAD | Pointeur vers le commit/branche courant |
| Branche | Pointeur mobile vers un commit |
| Remote | Dépôt distant (souvent `origin`) |

---

## Points clés

- Cycle de base : modifier → `add` → `commit` → `push`
- Un commit = un changement logique, avec un message clair
- `git status` et `git diff` avant chaque commit
- `.gitignore` pour exclure `node_modules`, `.env`, `dist`
- Un commit est identifié par un hash SHA

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `git add .` qui embarque `.env` ou des fichiers générés
> - Commits fourre-tout « fix » ou « wip » poussés sur la branche partagée
> - Travailler des jours sans pousser (risque de perte, gros conflits)

---

## Paramètres / Configuration

| Commande | Description | Notes |
|---|---|---|
| `git status` | État des fichiers | Le réflexe n°1 |
| `git add <f>` / `git add -p` | Prépare au commit | `-p` : par morceaux |
| `git commit -m ""` | Enregistre un instantané | Message clair et court |
| `git log --oneline --graph` | Historique visuel | — |
| `git diff` / `git diff --staged` | Changements non préparés / préparés | — |
| `git switch -c feature/x` | Crée et bascule sur une branche | Remplace `checkout -b` |
| `git restore <f>` | Annule les modifs d'un fichier | Remplace `checkout -- f` |

---

## Exemple minimal

```bash
git init
git add fichier.txt
git commit -m "feat: premier commit"
git switch -c feature/login
# ... modifications ...
git add -p
git commit -m "feat(auth): ajoute la page de connexion"
git switch main
git merge feature/login
```

> [!note] Ce que j'en retiens
> Le cycle de base reste toujours le même : modifier → add → commit. Les branches isolent le travail avant réintégration.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comprendre le modèle interne (objets blob/tree/commit, refs) pour ne jamais « perdre » de travail (reflog)
> - Soigner l'historique : commits atomiques, messages qui expliquent le POURQUOI

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Git]]
- Sous-sujets → [[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]], [[GIT-03-Depots-Distants|Dépôts Distants]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/git-01-fondamentaux]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle est la différence entre working directory, staging et dépôt local ?

> [!faq]- Questions d'entretien
> - Différence entre Git et GitLab ?

---

## Tâches

- [ ] #task Faire le tutoriel interactif learngitbranching.js.org (niveau « Introduction »)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Ressources : Gitflow (atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), Conventional Commits (conventionalcommits.org/fr), SemVer (semver.org/lang/fr)
