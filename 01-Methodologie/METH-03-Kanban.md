---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - methodologie/kanban
aliases:
  - "Kanban"
parent: "[[Méthodologie]]"
related_theory:
  - "[[METH-01-Agile-Manifeste|Agile et Manifeste Agile]]"
  - "[[04-Issues-Boards|Issues et Boards GitLab]]"
related_projects: []
source: "https://www.atlassian.com/fr/agile/kanban"
---

# Kanban

> [!abstract] En bref
> **Kanban**, c'est un tableau en colonnes (« À faire », « En cours », « Fini ») où les tâches avancent de gauche à droite, avec une règle clé : **limiter le nombre de tâches en cours**. Principe : **finir avant de commencer**. Pas de sprints, le travail avance en continu. Idéal pour tes projets perso.

## Le tableau

```text
| À faire         | En cours (max 2)  | En relecture | Fini           |
|-----------------|-------------------|--------------|----------------|
| Page favoris    | Bouton favoris    | Recherche    | Fiche film     |
| Pagination      | Endpoint /favs    |              | Connexion      |
| Mode sombre     |                   |              |                |
```

Quand « En cours » est plein, on ne commence **rien de nouveau** : on termine ou on débloque ce qui est déjà commencé.

## Pourquoi limiter le travail en cours

Comme à une caisse de supermarché : scanner 5 clients en même temps ne fait pas avancer la file plus vite.

- Moins de **changements de contexte** (qui font perdre beaucoup de temps).
- Moins de tâches **à moitié faites**.
- Les **blocages** se voient tout de suite : une carte qui ne bouge plus.

## Les 5 principes

1. **Visualiser** tout le travail sur le tableau.
2. **Limiter** le travail en cours (*WIP limit*).
3. **Tirer** une nouvelle tâche seulement quand on a de la place.
4. Rendre les **règles explicites** (« Fini » = testé et poussé).
5. **Mesurer et améliorer** : combien de temps une tâche met-elle à traverser le tableau ?

## Scrum ou Kanban ?

| | [[METH-02-Scrum\|Scrum]] | Kanban |
|---|---|---|
| Rythme | sprints de durée fixe | flux continu |
| Changement de priorité | au sprint suivant | à tout moment |
| Idéal pour | développement de produit | support, maintenance, projets perso |

Beaucoup d'équipes mélangent : sprints Scrum **et** tableau Kanban.

## Pour tes projets

- Un **board GitLab** (voir [[04-Issues-Boards|Issues et Boards]]) ou le plugin Kanban du coffre (modèle `TPL_Kanban-Project`).
- **Maximum 2 tâches en cours** : une principale, une de secours si tu es bloqué.
- Pour l'apprentissage aussi : « À apprendre | En cours (max 2) | Utilisé dans un projet ».

## Pièges

- **Pas de limite** : le tableau devient une liste colorée avec 12 cartes « En cours ».
- **Des tâches trop grosses** qui restent des semaines dans la même colonne : découpe-les.
