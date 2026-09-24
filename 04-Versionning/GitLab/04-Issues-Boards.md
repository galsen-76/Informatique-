---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/gitlab/issues
aliases:
  - "Issues et Boards GitLab"
parent: "[[GitLab]]"
children: []
related_theory:
  - "[[METH-03-Kanban|Kanban]]"
  - "[[METH-02-Scrum|Scrum]]"
  - "[[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]"
related_snippets:
  - "[[04_Snippets/04-issues-boards]]"
related_projects: []
source: "https://docs.gitlab.com/user/project/issues/"
---

# Issues et Boards GitLab

> [!abstract] Introduction
> Les issues servent à suivre les tâches (bug, feature) et les boards à visualiser leur avancement, façon Kanban, directement à côté du code.

> [!warning]- Prérequis
> [[01-GitLab|Fondamentaux GitLab]]

---

## Théorie

> [!question]- C'est quoi ?
> Une **issue** décrit un travail à faire (titre, description, labels, assignee, milestone, poids). Un **board** regroupe les issues par colonnes (To Do / In Progress / Review / Done), basées sur des labels.

> [!example]- Analogie
> Le tableau de post-it de l'équipe, mais numérique et relié au code : chaque post-it sait quelle MR l'a résolu.

> [!question]- Pourquoi l'utiliser ?
> - Documenter pourquoi un changement est nécessaire
> - Lier une issue à la MR qui la résout
> - Visualiser l'avancement d'un sprint ou d'un backlog

> [!question]- Comment ça marche ?
> ```text
> Issue créée (titre, label, assignee, milestone)
>        ↓
> Placée dans une colonne du board
>        ↓
> MR référence l'issue (`Closes #12`)
>        ↓
> Merge → issue fermée automatiquement
> ```
> Bon ticket de bug : étapes de reproduction, résultat attendu vs obtenu, environnement, captures/logs.

> [!question]- Quand l'utiliser ?
> Pour tout suivi de tâche lié au code : bug tracking, backlog, sprint planning.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Beaucoup d'entreprises utilisent Jira à la place ; les concepts sont identiques.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Label | Catégorie (`bug`, `feature`, `priority::high`) |
| Milestone | Échéance ou version regroupant des issues |
| Assignee | Responsable de l'issue |
| Board | Vue Kanban filtrée des issues |

---

## Points clés

- Board = simple vue sur les issues
- L'issue documente le « pourquoi », la MR le « comment »
- Un bug reproductible est un bug à moitié corrigé

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tickets vagues (« ça marche pas »)

---

## Exemple minimal

```text
Titre : [Bug] La recherche plante avec des accents
Étapes : 1. Aller sur /films  2. Taper « Amélie »
Attendu : résultats affichés   Obtenu : erreur 500
Env : recette, Chrome 140
Label : bug, priority::high   Milestone : Sprint 12
```

> [!note] Ce que j'en retiens
> Un ticket précis fait gagner du temps à toute l'équipe.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Rédiger des user stories avec critères d'acceptation (voir [[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]])

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[GitLab]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[Jira]]

**Pratique :**
- Extrait de code → [[04_Snippets/04-issues-boards]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelles informations doit contenir un bon ticket de bug ?

---

## Tâches

- [ ] #task Créer une issue de test et la lier à une MR
- [ ] #task Regarder l'organisation des labels/boards chez Assystem
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Assystem utilise-t-il les boards GitLab ou un outil externe type Jira ?
