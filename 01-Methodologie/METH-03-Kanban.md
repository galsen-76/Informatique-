---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - methodologie/kanban
aliases:
  - "Kanban"
parent: "[[Méthodologie]]"
children: []
related_theory:
  - "[[METH-01-Agile-Manifeste|Agile et Manifeste Agile]]"
  - "[[04-Issues-Boards|Issues et Boards GitLab]]"
related_snippets:
  - "[[04_Snippets/meth-03-kanban]]"
related_projects: []
source: "https://www.atlassian.com/fr/agile/kanban"
---

# Kanban

> [!abstract] Introduction
> Kanban visualise le flux de travail sur un tableau à colonnes et limite le travail en cours (WIP) pour livrer en continu, sans itérations fixes.

---

## Théorie

> [!question]- C'est quoi ?
> Principes : **visualiser** le flux, **limiter le WIP** (Work In Progress), gérer et mesurer le flux, rendre les règles explicites, s'améliorer en continu.
> Métriques : **lead time** (demande → livraison), **cycle time** (début → fin du travail), débit.

> [!example]- Analogie
> Une caisse de supermarché : on ne commence pas à scanner le client suivant tant que le précédent n'a pas payé ; limiter le travail en cours fait avancer la file plus vite.

> [!question]- Pourquoi l'utiliser ?
> Finir avant de commencer : moins de tâches à moitié faites, moins de changements de contexte, flux plus fluide.

> [!question]- Comment ça marche ?
> ```text
> | Backlog | À faire (5) | En cours (WIP 3) | Revue (2) | Done |
> ```
> Quand une colonne atteint sa limite, on aide à débloquer la suite plutôt que de commencer autre chose.
> Ton vault utilise déjà le plugin Kanban (modèle `TPL_Kanban-Project`) pour tes projets.

> [!question]- Quand l'utiliser ?
> Support, maintenance, flux continu de demandes, organisation personnelle.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sans limites WIP, un tableau Kanban n'est qu'une liste de tâches colorée.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| WIP | Travail en cours |
| Lead time | Délai total de la demande à la livraison |
| Cycle time | Délai du début du travail à la fin |
| Flux tiré | On tire une tâche quand on a de la capacité |

---

## Points clés

- Limiter le WIP
- Finir avant de commencer
- Mesurer lead time et cycle time

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Colonnes « En cours » avec 12 cartes

---

## Exemple minimal

```text
Kanban personnel d'apprentissage :
À apprendre | En cours (max 2 notes) | À réviser | Maîtrisé
```

> [!note] Ce que j'en retiens
> Deux sujets en cours maximum : on apprend plus vite en finissant.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser les métriques de flux pour améliorer l'équipe

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Méthodologie]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[METH-02-Scrum|Scrum]]

**Pratique :**
- Extrait de code → [[04_Snippets/meth-03-kanban]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi limiter le WIP accélère-t-il la livraison ?

---

## Tâches

- [ ] #task Créer le tableau Kanban d'apprentissage dans le vault (TPL_Kanban-Project)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
