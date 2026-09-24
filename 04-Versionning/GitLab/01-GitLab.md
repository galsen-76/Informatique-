---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/gitlab/fondamentaux
aliases:
  - "Fondamentaux GitLab"
parent: "[[GitLab]]"
children:
  - "[[02-Merge-Requests|Merge Requests]]"
  - "[[03-CI-CD|CI/CD GitLab]]"
  - "[[04-Issues-Boards|Issues et Boards GitLab]]"
  - "[[05-GitLab-Avance|GitLab Avancé]]"
related_theory:
  - "[[GIT-01-Fondamentaux|Git Fondamentaux]]"
related_snippets:
  - "[[04_Snippets/01-gitlab]]"
related_projects: []
source: "https://docs.gitlab.com/"
---

# Fondamentaux GitLab

> [!abstract] Introduction
> GitLab sert à héberger le code versionné avec Git, et à organiser le travail d'équipe autour : revue de code, automatisation (CI/CD), suivi de tâches.

> [!warning]- Prérequis
> [[GIT-01-Fondamentaux|Git Fondamentaux]]

---

## Théorie

> [!question]- C'est quoi ?
> **GitLab** est une plateforme web qui héberge des dépôts Git et ajoute des outils de collaboration (Merge Requests, CI/CD, issues, registry, wiki). Il peut être utilisé en SaaS (gitlab.com) ou **auto-hébergé** (self-managed) sur les serveurs de l'entreprise.

> [!example]- Analogie
> Git est le moteur ; GitLab est l'usine autour : bureau d'études (issues), contrôle qualité (MR + pipelines), entrepôt (registry), expédition (déploiement).

> [!question]- Pourquoi l'utiliser ?
> - Protéger la branche principale contre les modifications directes
> - Imposer une revue avant tout changement
> - Automatiser tests et déploiements
> - Centraliser code, tickets et documentation

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   P["Push d'une branche"] --> MR["Merge Request<br/>(revue de code)"]
>   MR --> CI["Pipeline CI/CD<br/>(build / test)"]
>   CI -->|"vert + approbations"| M["Merge dans main"]
>   M --> D["Déploiement"]
> ```
> Organisation : **Groupes** (équipes/départements) → **Projets** (un dépôt chacun) ; permissions par rôle (Guest, Reporter, Developer, Maintainer, Owner).

> [!question]- Quand l'utiliser ?
> Dès qu'un projet est développé en équipe, ou dès qu'on veut un historique de code sécurisé et accessible en ligne.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Certaines fonctionnalités (règles d'approbation avancées, sécurité) dépendent de la licence (Free / Premium / Ultimate).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Projet | Dépôt GitLab avec ses issues, MR, pipelines |
| Groupe | Ensemble de projets et de membres |
| Merge Request | Demande d'intégration d'une branche après revue |
| Pipeline | Suite automatique de jobs CI/CD |
| Branche protégée | Branche modifiable uniquement via MR validée |

---

## Points clés

- GitLab = Git + collaboration + CI/CD
- Rôles et branches protégées contrôlent qui peut quoi
- Self-managed possible (choix d'Assystem : héberger ses propres serveurs)
- Tout passe par une MR

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre GitLab (plateforme) et Git (outil)
> - Travailler directement sur `main`

---

## Exemple minimal

```bash
git clone git@gitlab.entreprise.fr:equipe/mon-projet.git
git switch -c feature/ma-page
# ... code ...
git commit -am "feat: ajoute ma page"
git push -u origin feature/ma-page
# → GitLab affiche un lien pour créer la Merge Request
```

> [!note] Ce que j'en retiens
> GitLab n'est pas un remplaçant de Git, c'est la couche collaborative posée par-dessus : revue, automatisation, suivi.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Configurer un projet : branches protégées, règles d'approbation, templates de MR/issues, CODEOWNERS

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[GitLab]]
- Sous-sujets → [[02-Merge-Requests|Merge Requests]], [[03-CI-CD|CI/CD GitLab]], [[04-Issues-Boards|Issues et Boards GitLab]], [[05-GitLab-Avance|GitLab Avancé]]
- À comparer avec → [[GitHub]]

**Pratique :**
- Extrait de code → [[04_Snippets/01-gitlab]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quels rôles GitLab peuvent merger sur une branche protégée ?

---

## Tâches

- [ ] #task Faire une Merge Request complète de bout en bout
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? GitLab vs GitHub chez Assystem : GitLab car on peut héberger nos propres serveurs.
