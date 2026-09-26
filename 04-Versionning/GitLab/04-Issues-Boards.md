---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/gitlab/issues
aliases:
  - "Issues et Boards GitLab"
parent: "[[GitLab]]"
related_theory:
  - "[[METH-03-Kanban|Kanban]]"
  - "[[METH-02-Scrum|Scrum]]"
  - "[[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]"
related_projects: []
source: "https://docs.gitlab.com/user/project/issues/"
---

# Issues et Boards

> [!abstract] En bref
> Une **issue** (ticket) décrit une tâche : un bug, une fonctionnalité, une amélioration. Un **board** (tableau) les affiche en colonnes (À faire, En cours, En revue, Fait), comme un tableau Kanban. Utilise-les aussi pour tes projets perso : c'est ta liste de tâches, et ça montre ta façon de t'organiser.

## Une bonne issue

**Fonctionnalité :**

```markdown
## En tant que visiteur
je veux filtrer les projets par techno
afin de voir seulement ceux qui m'intéressent.

## Critères d'acceptation
- [ ] Des boutons Tous / Vue / Angular / NestJS au-dessus de la grille
- [ ] Un clic filtre immédiatement, sans recharger
- [ ] Le compteur « N projets » se met à jour
- [ ] Le filtre est dans l'URL (?tech=vue)
```

Voir [[CONC-02-User-Stories-Criteres-Acceptation|User stories]].

**Bug :**

```markdown
## Ce qui se passe
Le menu mobile ne se ferme pas après un clic sur un lien.

## Ce qui devrait se passer
Le menu se ferme et la page s'affiche.

## Pour reproduire
1. Largeur < 900 px
2. Ouvrir le menu ☰, cliquer « Projets »

## Environnement
Chrome 130, Android
```

## Organiser

| Outil | Sert à |
|---|---|
| **Labels** | catégoriser : `bug`, `feature`, `priority::high`, `front`, `back` |
| **Milestones** | regrouper par version ou par mois (« Portfolio v1 », « M02 ») |
| **Assignee** | qui s'en occupe |
| **Board** | voir l'avancement en colonnes |
| **Weight** | estimer l'effort (voir [[CONC-09-Estimation-Planification\|Estimation]]) |

## Relier le code aux tickets

- Nom de branche : `feature/23-filtre-technos`.
- Dans une MR : `Closes #23` ferme le ticket à la fusion.
- Dans un commit : `Refs #23` crée un lien sans fermer.

## Pour tes projets perso

Crée une issue par tâche de la note projet (Portfolio, CinéTrack…), rangées dans un milestone par mois. Quand tu montreras le dépôt en entretien, on verra que tu sais **découper** un projet et **avancer** méthodiquement. Voir aussi [[METH-03-Kanban|Kanban]].

## Pièges

- **Des issues vagues** : « améliorer le site ». Une issue = une tâche vérifiable.
- **Une issue géante** : découpe en tâches d'un à deux jours maximum.
